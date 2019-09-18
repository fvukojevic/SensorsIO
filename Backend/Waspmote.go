package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"net/http"
)

type Waspmote struct {
	gorm.Model
	Name   string `json:"name"`
	IdRoom int    `json:"id_room"`
}

func GetWaspmotes(c *gin.Context) {
	var waspmotes []Waspmote

	query := "SELECT * FROM waspmotes WHERE id_room is null"

	if err := db.Debug().Raw(query).Scan(&waspmotes).Error; err != nil {
		throwStatusNotFound(c)
	}

	c.JSON(http.StatusOK, waspmotes)
}
