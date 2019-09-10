package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

func main() {
	connectToDatabase()

	router := gin.Default()

	v1 := router.Group("/user")
	{
		v1.POST("/login", Login)
		v1.POST("/logout", Logout)
		v1.POST("/renew", Renew)
		v1.POST("/updateProfile", UpdateProfile)
	}

	router.Run(":8888")
}
