package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"log"
	"net/http"
)

type Waspmote struct {
	gorm.Model
	Name   string `json:"name"`
	IdRoom int    `json:"id_room"`
}

func GetWaspmotes(c *gin.Context) {
	var waspmotes []Waspmote

	db.Find(&waspmotes)

	c.JSON(http.StatusOK, waspmotes)
}

func AddWaspmoteToRoom(c *gin.Context) {
	waspmote := &Waspmote{}
	if err := c.BindJSON(&waspmote); err != nil {
		throwStatusNotFound(c)
	}
	updateWaspmote(*waspmote)
	c.JSON(http.StatusOK, waspmote)
}

func updateWaspmote(waspmote Waspmote) {
	updateWaspmotesQuery := "UPDATE waspmotes SET id_room = ?  WHERE id = ?"
	if err := db.Exec(updateWaspmotesQuery, waspmote.IdRoom, waspmote.ID).Error; err != nil {
		log.Println(err)
	}
}
