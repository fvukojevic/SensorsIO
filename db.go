package main

import (
	"github.com/jinzhu/gorm"
	"log"
)

var db *gorm.DB
var dbErr error

func connectToDatabase() {
	db, dbErr = gorm.Open("mysql", "root:root@tcp(0.0.0.0:8082)/pis_project?charset=utf8&parseTime=True&loc=Local")

	if dbErr!=nil{
		log.Fatal(dbErr)
	}

	db.AutoMigrate(&User{})
}