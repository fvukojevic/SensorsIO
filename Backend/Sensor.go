package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"net/http"
	"time"
)

type Sensor struct {
	gorm.Model
	Name        string `json:"name"`
	MeasureUnit string `json:"measure_unit"`
}

type SensorWaspmote struct {
	gorm.Model
	IdSensor     int        `json:"id_sensor"`
	IdWaspmote   int        `json:"id_waspmote"`
	ReadingCount int        `json:"reading_count"`
	ReadingValue float64    `json:"reading_value"`
	ReadingTime  *time.Time `json:"reading_time"`
}

func GetSensors(c *gin.Context) {
	var sensors []Sensor

	db.Find(&sensors)

	c.JSON(http.StatusOK, sensors)
}
