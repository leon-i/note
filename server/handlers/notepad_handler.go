package handlers

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
)

func GetNotepads(c *fiber.Ctx) {
	var notepads []models.Notepad

	// if err := db.DBConn.Find(&notepads).Error; err != nil {
	// 	c.Status(404).Send(err)
	// 	return
	// }

	err := db.DBConn.Table("notepads").
		Select("notepads.*").
		Joins("left join posts on notepads.id = posts.notepad_id").
		Group("notepads.id").
		Order("COUNT(posts.notepad_id)").
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
	id := c.Params("id")

	// if err := db.DBConn.Preload("Posts.Comments").Preload("Comments").Find(&notepad, id).Error; err != nil {
	// 	c.Status(404).Send(err)
	// 	return
	// }

	err := db.DBConn.Preload("Posts").
		Preload("Posts.Comments").
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

	c.JSON(notepad)
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
