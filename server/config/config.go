package config

import (
	"github.com/joho/godotenv"
    "os"
    "fmt"
)

func Setup(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		fmt.Println("Error loading .env file")
	}

	return os.Getenv(key)
}