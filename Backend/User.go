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
	Username string `json:"username"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Name     string `json:"name"`
	Surname  string `json:"surname"`
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

	user := findUserWithToken(token)
	deleteTokenFromUser(user.ID)
}

func LogoutTimeout(token string) {
	time.Sleep(1 * time.Hour)

	user := findUserWithToken(token)

	if user.ID != 0 {
		deleteTokenFromUser(user.ID)
	}
}

func Renew(c *gin.Context) {
	token := &UserToken{}
	if err := c.BindJSON(&token); err != nil {
		throwStatusNotFound(c)
	}

	newToken := tokenGenerator(64)
	tokenQuery := "UPDATE users SET token = ? WHERE token = ?"
	if err := db.Exec(tokenQuery, newToken, token.Token).Error; err != nil {
		throwStatusBadRequest(err.Error(), c)
		return
	}

	throwStatusOkWithMessage(newToken, c)
}

func UpdateProfile(c *gin.Context) {
	user := &User{}
	if err := c.BindJSON(&user); err != nil {
		throwStatusNotFound(c)
	}

	updateProfile(*user)

	throwStatusOkWithMessage("profile updated successfully", c)
}

func findUserWithToken(token string) *UserToken {
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
		return
	}
}
