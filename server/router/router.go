package router

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/handlers"
	"github.com/leon-i/note/middleware"
)

func SetupRoutes(server *fiber.App) {
	api := server.Group("/api")

	// Users
	users := api.Group("/users")
	// users.Get("/")
	users.Get("/:id", handlers.GetUser)
	users.Get("/:id/favorite", handlers.GetFavorites)
	users.Post("/register", handlers.Register)
	users.Post("/login", handlers.Login)
	users.Post("/:id/favorite", middleware.ProtectedRoute(), handlers.AddFavorite)
	users.Delete("/:id/favorite/:notepadId", middleware.ProtectedRoute(), handlers.RemoveFavorite)
	// api.Delete("/users/:id")

	// Notepads
	notepads := api.Group("/notepads")
	notepads.Get("/", handlers.GetNotepads)
	notepads.Get("/:id", handlers.GetNotepad)
	notepads.Get("/search/:query", handlers.SearchNotepads)
	notepads.Post("/", middleware.ProtectedRoute(), handlers.CreateNotepad)
	notepads.Delete("/:id", middleware.ProtectedRoute(), handlers.DeleteNotepad)

	// Posts
	posts := api.Group("/posts")
	posts.Get("/", handlers.GetPosts)
	posts.Get("/:id", handlers.GetPost)
	posts.Post("/", middleware.ProtectedRoute(), handlers.CreatePost)
	posts.Delete("/:id", middleware.ProtectedRoute(), handlers.DeletePost)

	//Comments
	comments := api.Group("/comments")
	comments.Use(middleware.ProtectedRoute())
	comments.Post("/", handlers.CreateComment)
	comments.Delete("/:id", handlers.DeleteComment)
}
