package main

import (
	"github.com/gofiber/cors"
	"github.com/gofiber/fiber"
	"github.com/gofiber/fiber/middleware"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/router"
	_ "github.com/lib/pq"
)

func main() {
	server := fiber.New()
	server.Use(middleware.Logger(), cors.New())

	db.Connect()

	router.SetupRoutes(server)

	server.Get("/", func(c *fiber.Ctx) {
		c.Send("Hello, World 👋!")
	})

	server.Listen(5000)

	defer db.Close()
}
