package handlers

import (
	"fmt"
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
	"gorm.io/gorm"
)

func GetNotepads(c *fiber.Ctx) {
	var notepads []models.Notepad

	err := db.DBConn.Table("notepads").
		Select("notepads.*").
		Joins("left join posts on notepads.id = posts.notepad_id").
		Group("notepads.id").
		Order("COUNT(posts.notepad_id) DESC").
		Limit(8).
		Scan(&notepads).
		Error

	if err != nil {
		c.Status(404).Send(err)
		return
	}

	c.JSON(notepads)
}

func GetNotepad(c *fiber.Ctx) {
	var notepad models.Notepad
	var posts []models.Post
	id := c.Params("id")

	err := db.DBConn.Preload("Posts", func(db *gorm.DB) *gorm.DB {
		return db.Order("posts.updated_at DESC").
			Limit(8)
	}).
		Preload("Posts.User", func(db *gorm.DB) *gorm.DB {
			return db.Select("users.ID, users.Username")
		}).
		Preload("Posts.Comments").
		Preload("Posts.Comments.User", func(db *gorm.DB) *gorm.DB {
			return db.Select("users.ID, users.Username")
		}).
		Find(&notepad, id).
		Error

	if err != nil {
		c.Status(404).Send(err)
		return
	}

	if notepad.Name == "" {
		c.Status(404).JSON(fiber.Map{"status": "error",
			"message": "Notepad not found", "data": nil})
		return
	}

	posts = notepad.Posts
	notepad.Posts = nil

	c.JSON(fiber.Map{
		"notepad": notepad,
		"posts":   posts,
	})
}

func CreateNotepad(c *fiber.Ctx) {
	notepad := new(models.Notepad)

	if err := c.BodyParser(notepad); err != nil {
		c.Status(503).Send(err)
		return
	}

	if err := db.DBConn.Create(&notepad).Error; err != nil {
		if util.IsUniqueConstraintError(err, util.UniqueConstraintNotepad) {
			err := &util.NotepadDuplicateError{Name: notepad.Name}
			c.Status(500).JSON(fiber.Map{"status": "error",
				"message": "Note with that name already exists",
				"data":    err.Error()})
			return
		}

		c.Status(500).Send(err)
		return
	}

	c.JSON(notepad)
}

func DeleteNotepad(c *fiber.Ctx) {
	var notepad models.Notepad
	id := c.Params("id")

	db.DBConn.First(&notepad, id)

	if notepad.Name == "" {
		c.Status(404).Send("No notepad found with that id.")
		return
	}

	if err := db.DBConn.Delete(&notepad).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.Send("Notepad successfully deleted.")
}

func SearchNotepads(c *fiber.Ctx) {
	var notepads []models.Notepad
	query := "%" + c.Params("query") + "%"
	fmt.Println(query)

	if err := db.DBConn.Where("LOWER(name) LIKE ?", query).Find(&notepads).Error; err != nil {
		fmt.Println(err.Error())
		c.Status(500).Send(err)
		return
	}

	c.JSON(notepads)
}
