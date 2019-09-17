package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"net/http"
)

type Room struct {
	gorm.Model
	Name string `json:"name"`
}

func GetRooms(c *gin.Context) {
	var rooms []Room

	db.Find(&rooms)
	c.JSON(http.StatusOK, rooms)
}
