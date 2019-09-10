package main

import (
	"crypto/rand"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func tokenGenerator(len int) string {
	b := make([]byte, len)
	if _,err := rand.Read(b); err != nil {
		log.Println(err)
	}
	return fmt.Sprintf("%x", b)
}

func throwStatusOkWithMessage(msg string, c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  http.StatusOK,
		"message": msg,
	})
}

func throwStatusNotFound(c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusNotFound, gin.H {
		"err" : "Not found",
	})
}

func throwStatusBadRequest(msg string, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		"message": msg,
	})
}

func throwStatusInternalServerError(msg string, c *gin.Context) {
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
		"message": msg,
	})
}