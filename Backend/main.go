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
	}

	router.Run(":8888")
}
