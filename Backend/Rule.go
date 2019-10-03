package main

import "github.com/jinzhu/gorm"

type Rule struct {
	gorm.Model
	IdSensor   int     `json:"id_sensor"`
	IdWaspmote int     `json:"id_waspmote"`
	Value      float64 `json:"value"`
}
