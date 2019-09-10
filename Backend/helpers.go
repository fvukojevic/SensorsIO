package main

import (
	"crypto/rand"
	"fmt"
	"log"
)

func tokenGenerator(len int) string {
	b := make([]byte, len)
	if _,err := rand.Read(b); err != nil {
		log.Println(err)
	}
	return fmt.Sprintf("%x", b)
}