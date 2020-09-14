package handlers

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"gorm.io/gorm"
)

type NewPost struct {
	Title     string
	Content   string
	UserID    uint
	NotepadID uint
}

func GetPosts(c *fiber.Ctx) {
	var posts []models.Post

	if err := db.DBConn.Preload("Comments").Find(&posts).Error; err != nil {
		c.Status(404).Send(err)
		return
	}

	c.JSON(posts)
}

func GetPost(c *fiber.Ctx) {
	var post models.Post
	id := c.Params("id")

	if err := db.DBConn.Preload("User", func(db *gorm.DB) *gorm.DB {
		return db.Select("users.ID, users.username")
	}).Preload("Comments").
		Preload("Comments.User", func(db *gorm.DB) *gorm.DB {
			return db.Select("users.ID, users.username")
		}).
		Find(&post, id).Error; err != nil {
		c.Status(404).Send(err)
		return
	}

	if post.Title == "" || post.Content == "" {
		c.Status(404).JSON(fiber.Map{"status": "error",
			"message": "Post not found", "data": nil})
		return
	}

	c.JSON(post)
}

func CreatePost(c *fiber.Ctx) {
	newPost := new(NewPost)
	notepad := new(models.Notepad)

	if err := c.BodyParser(newPost); err != nil {
		c.Status(503).Send(err)
		return
	}

	if err := db.DBConn.Find(&notepad, newPost.NotepadID).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	if notepad.Name == "" {
		c.Status(404).JSON(fiber.Map{"status": "error",
			"message": "Notepad not found", "data": nil})
		return
	}

	post := models.Post{
		Title:     newPost.Title,
		Content:   newPost.Content,
		UserID:    newPost.UserID,
		NotepadID: notepad.ID,
	}

	if err := db.DBConn.Create(&post).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.JSON(post)
}

func DeletePost(c *fiber.Ctx) {
	var post models.Post
	id := c.Params("id")

	db.DBConn.First(&post, id)

	if post.Title == "" {
		c.Status(404).Send("No post found with that id.")
		return
	}

	if err := db.DBConn.Delete(&post).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.Send("Post successfully deleted.")
}
