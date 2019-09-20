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

	db, dbErr = gorm.Open(os.Getenv("DB_CONNECTION"), os.Getenv("DB_USERNAME")+":"+os.Getenv("DB_PASSWORD")+"@tcp(0.0.0.0:3306)/"+os.Getenv("DB_DATABASE")+
		"?charset=utf8&parseTime=True&loc=Local")
	if dbErr != nil {
		log.Fatal(dbErr)
	}

	db.AutoMigrate(&User{})
	db.AutoMigrate(&Room{})
	db.AutoMigrate(&Waspmote{})
}
