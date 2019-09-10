package main

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"fmt"
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
	Email string `json:"email"`
	Name string `json:"name"`
	Surname string `json:"surname"`
	Token string `json:"token"`
}

type UserToken struct {
	ID int `json:"id"`
	Token string `json:"token"`

}

type LoginCredentials struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

func Login (c *gin.Context) {
	hash := md5.New()

	credentials := &LoginCredentials{}
	user := &UserToken{}

	if err := c.BindJSON(&credentials); err != nil {
		log.Println(&err)
	}

	hash.Write([]byte(credentials.Password))
	credentials.Password = hex.EncodeToString(hash.Sum(nil))

	findQuery := "SELECT u.id FROM users u WHERE email = ? AND password = ?"

	if err := db.Debug().Raw(findQuery, credentials.Email, credentials.Password).Scan(&user).Error; err != nil {
		log.Println(err)
	}

	token := tokenGenerator(64)
	tokenQuery := "UPDATE users SET token = ? WHERE id = ?"
	if err := db.Exec(tokenQuery, token, user.ID).Error; err != nil {
		log.Println(err)
		return
	}

	user.ID = 0
	user.Token = token

	c.JSON(200, user)
	go LogoutTimeout(user.Token)
}

func Renew(c *gin.Context) {
    var token string
    if err := c.BindJSON(&token); err != nil {
    	log.Println(&err)
    }

    newToken := tokenGenerator(64)
    tokenQuery := "UPDATE users SET token = ? WHERE token = ?"
    if err := db.Exec(tokenQuery, newToken, token).Error; err != nil {
    		log.Println(err)
    		return
    }

    c.JSON(200, gin.H{
                     "token" : newToken,
     })
}

func UpdateProfile(c *gin.Context){
    user := &User{}
    	if err := c.BindJSON(&user); err != nil {
    		log.Println(&err)
    	}

    	updateProfile(*user)

	c.JSON(http.StatusOK, gin.H{
		"code" : http.StatusOK,
		"message": "profile updated successfully",// cast it to string before showing
	})
}

func Logout(c *gin.Context) {
	userToken := &UserToken{}

	if err := c.BindJSON(&userToken); err != nil {
		log.Println(&err)
	}

	user := findUserWithToken(userToken.Token)
	deleteTokenFromUser(user.ID)
}

func LogoutTimeout(token string){
	time.Sleep(1 * time.Hour)

	user := findUserWithToken(token)

	if user.ID != 0 {
		deleteTokenFromUser(user.ID)
	}
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

func updateProfile(user User){
   updateProfileQuery:= "UPDATE users SET username = ?, email = ?, name = ?, surname=? WHERE token = ?"
    if err := db.Exec(updateProfileQuery, user.Username, user.Email, user.Name, user.Surname, user.Token).Error; err != nil {
       		log.Println(err)
       		return
       }
}

func tokenGenerator(len int) string {
	b := make([]byte, len)
	if _,err := rand.Read(b); err != nil {
		log.Println(err)
	}
	return fmt.Sprintf("%x", b)
}