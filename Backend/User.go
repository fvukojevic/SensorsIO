package main

import (
	"crypto/md5"
	"encoding/hex"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"log"
	"net/http"
	"time"
)

type User struct {
	gorm.Model
	Username string `json:"username;not null"`
	Password string `json:"password;not null"`
	Email    string `json:"email;not null"`
	Name     string `json:"name;not null"`
	Surname  string `json:"surname;not null"`
	Token    string `json:"token"`
}

type UserToken struct {
	ID    int    `json:"-"`
	Token string `json:"token"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *gin.Context) {
	hash := md5.New()

	credentials := &LoginCredentials{}
	user := &UserToken{}

	if err := c.BindJSON(&credentials); err != nil {
		throwStatusNotFound(c)
	}

	hash.Write([]byte(credentials.Password))
	credentials.Password = hex.EncodeToString(hash.Sum(nil))

	findQuery := "SELECT u.id FROM users u WHERE email = ? AND password = ?"

	if err := db.Debug().Raw(findQuery, credentials.Email, credentials.Password).Scan(&user).Error; err != nil {
		throwStatusBadRequest(err.Error(), c)
	}

	token := tokenGenerator(64)
	tokenQuery := "UPDATE users SET token = ? WHERE id = ?"
	if err := db.Exec(tokenQuery, token, user.ID).Error; err != nil {
		throwStatusInternalServerError(err.Error(), c)
	}

	user.Token = token

	c.JSON(http.StatusOK, user)
	go LogoutTimeout(user.Token)
}

func Logout(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")

	if token == "" {
		throwStatusNotFound(c)
	}

	user := findUserIdWithToken(token)
	deleteTokenFromUser(user.ID)
}

func LogoutTimeout(token string) {
	time.Sleep(1 * time.Hour)

	user := findUserIdWithToken(token)

	if user.ID != 0 {
		deleteTokenFromUser(user.ID)
	}
}

func Renew(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		throwStatusNotFound(c)
	}

	newToken := tokenGenerator(64)
	tokenQuery := "UPDATE users SET token = ? WHERE token = ?"
	if err := db.Exec(tokenQuery, newToken, token).Error; err != nil {
		throwStatusBadRequest(err.Error(), c)
		return
	}

	throwStatusOkWithMessage(newToken, c)
}

func getUser(c *gin.Context) {
	user := &User{}
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		throwStatusNotFound(c)
	}

	query := "SELECT * FROM users WHERE token = ?"
	if err := db.Debug().Raw(query, token).Scan(&user).Error; err != nil {
		throwStatusNotFound(c)
	}

	c.JSON(http.StatusOK, user)
}

func updateUser(c *gin.Context) {
	token := c.Request.Header.Get("Authorization")
	user := &User{}
	if err := c.BindJSON(&user); err != nil {
		throwStatusNotFound(c)
	}

	user.Token = token
	updateProfile(*user)
	c.JSON(http.StatusOK, user)
}

func findUserIdWithToken(token string) *UserToken {
	user := &UserToken{}
	findQuery := "SELECT u.id FROM users u WHERE token = ?"

	if err := db.Debug().Raw(findQuery, token).Scan(&user).Error; err != nil {
		log.Println(err)
	}

	return user
}

func deleteTokenFromUser(id int) {
	deleteQuery := "UPDATE users SET token = null WHERE id = ?"

	if err := db.Exec(deleteQuery, id).Error; err != nil {
		log.Println(err)
	}
}

func updateProfile(user User) {
	updateProfileQuery := "UPDATE users SET username = ?, email = ?, name = ?, surname=? WHERE token = ?"
	if err := db.Exec(updateProfileQuery, user.Username, user.Email, user.Name, user.Surname, user.Token).Error; err != nil {
		log.Println(err)
	}
}
