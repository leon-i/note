package handlers

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
	"gorm.io/gorm"
)

type NewPost struct {
	Title     string `form:"title"`
	Content   string `form:"content"`
	UserID    uint   `form:"UserID"`
	NotepadID uint   `form:"NotepadID"`
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
	}).Preload("Notepad").
		Preload("Comments").
		Preload("Comments.Replies").
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

	comments := post.Comments
	post.Comments = nil

	c.JSON(fiber.Map{
		"post":     post,
		"comments": comments,
	})
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
		c.Status(500).JSON(fiber.Map{
			"status":  "error",
			"message": "Log in to create a post",
			"data":    nil,
		})
		return
	}

	fileHeader, err := c.FormFile("image")

	if err == nil {
		file, err := fileHeader.Open()

		if err != nil {
			c.Status(500).Send(err)
			return
		}

		imageURL, err := util.HandleFileUpload(file, fileHeader)

		if err != nil {
			c.Status(500).Send(err)
			return
		}

		if err := db.DBConn.Model(&post).Update("ImageURL", imageURL).Error; err != nil {
			c.Status(500).Send(err)
			return
		}
	}

	var res models.Post

	if err := db.DBConn.Preload("User").Find(&res, post.ID).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.JSON(res)
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
