package handlers

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
)


func CreateComment(c *fiber.Ctx) {
	comment := new(models.Comment)

	if err := c.BodyParser(comment); err != nil {
		c.Status(503).Send(err)
		return
	}

	if err := db.DBConn.Create(&comment).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.JSON(comment)
}

func DeleteComment(c *fiber.Ctx) {
	var comment models.Comment
	id := c.Params("id")

	db.DBConn.First(&comment, id)

	if comment.Content == "" {
		c.Status(404).Send("No comment found with that id.")
		return
	}

	if err := db.DBConn.Delete(&comment).Error; err != nil {
		c.Status(500).Send(err)
		return
	}

	c.Send("Comment successfully deleted.")
}