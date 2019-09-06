package SensorsIO

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	ID int `gorm:"primary_key" json:"id"`
	Username int `json:"username"`
	Password int `json:"password"`
	Email string `json:"email"`
	Name string `json:"name"`
	Surname string `json:"surname"`
}

func login (c *gin.Context) {
	c.JSON(200, nil)
}