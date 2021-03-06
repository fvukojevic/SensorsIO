package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"os"
)

func main() {
	connectToDatabase()

	router := gin.Default()
	router.Use(CORSMiddleware())

	v1 := router.Group("/user")
	{
		v1.POST("/login", Login)
		v1.POST("/logout", Logout)
		v1.POST("/renew", Renew)
		v1.POST("/getUser", GetUser)
		v1.POST("/updateUser", UpdateUser)
		v1.POST("/updatePassword", UpdatePassword)
	}

	v2 := router.Group("/room")
	{
		v2.GET("/getRooms", GetRooms)
		v2.POST("/addRoom", AddRoom)
		v2.POST("/deleteRoom", DeleteRoom)
	}

	v3 := router.Group("/waspmote")
	{
		v3.GET("/getWaspmotes", GetWaspmotes)
		v3.POST("/addWaspmoteToRoom", AddWaspmoteToRoom)
	}

	v4 := router.Group("/sensor")
	{
		v4.GET("/getSensors", GetSensors)
	}

	_ = router.Run(":" + os.Getenv("GO_PORT"))
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		fmt.Println(c.Request.Method)

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}
