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

func AddRoom(c *gin.Context) {
	room := &Room{}

	if err := c.BindJSON(&room); err != nil {
		throwStatusNotFound(c)
	}

	if room.Name != "" {
		if err := db.Create(&room).Error; err != nil {
			throwStatusInternalServerError("wasn't able to  create a room", c)
		}
	}

	throwStatusOkWithMessage("Room created successfully", c)
}
