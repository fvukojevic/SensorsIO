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

	db.Find(&waspmotes)

	c.JSON(http.StatusOK, waspmotes)
}
