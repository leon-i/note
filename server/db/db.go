package db

import (
	"fmt"
	"strconv"

	"github.com/leon-i/note/config"
	"github.com/leon-i/note/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DBConn *gorm.DB

func Connect() {
	p := config.Setup("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)

	if err != nil {
		fmt.Println("Error parsing str to int")
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		config.Setup("DB_HOST"), port, config.Setup("DB_USER"), config.Setup("DB_PASSWORD"), config.Setup("DB_NAME"))

	DBConn, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	DBConn.Migrator().DropTable(&models.User{})
	DBConn.Migrator().DropTable(&models.Notepad{})
	DBConn.Migrator().DropTable(&models.Post{})
	DBConn.Migrator().DropTable(&models.Comment{})

	DBConn.AutoMigrate(&models.User{},
		&models.Notepad{},
		&models.Post{},
		&models.Comment{})

	fmt.Println("Connection Opened to Database")
	fmt.Println("Database Migrated")
}

func Close() {
	gen, err := DBConn.DB()

	if err != nil {
		fmt.Println("Database failed to close")
		return
	}

	fmt.Println("Database closing")
	gen.Close()
}
