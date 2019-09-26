package main

import (
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var db *gorm.DB
var dbErr error

func connectToDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	db, dbErr = gorm.Open("mysql", os.Getenv("MYSQL_USER")+":"+os.Getenv("MYSQL_PASSWORD")+"@tcp(db:3306)/"+os.Getenv("MYSQL_DATABASE")+
		"?charset=utf8&parseTime=True&loc=Local")
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Room{})
	db.AutoMigrate(&Waspmote{})
}
