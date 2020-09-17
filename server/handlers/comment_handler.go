package handlers

import (
	"fmt"
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
)

type NewComment struct {
	Content   	string	`form:"content"`
	UserID    	uint	`form:"UserID"`
	PostID 		uint	`form:"PostID"`
	ReplyID		uint	`form:"ReplyID"`
}

func CreateComment(c *fiber.Ctx) {
	newComment := new(NewComment)
	parent := new(models.Comment)

	if err := c.BodyParser(newComment); err != nil {
		c.Status(503).Send(err)
		return
	}

	comment := &models.Comment{
		Content: newComment.Content,
		UserID: newComment.UserID,
		PostID: newComment.PostID,
	}

	if err := db.DBConn.Create(&comment).Error; err != nil {
		fmt.Println(err.Error())
		fmt.Println("--Create comment error--")
		c.Status(500).Send(err)
		return
	}

	if err := db.DBConn.Find(&parent, newComment.ReplyID).Error; err != nil {
		fmt.Println(err.Error())
		fmt.Println("--Find parent error--")
		c.Status(500).Send(err)
	}

	if parent.Content != "" {
		err := db.DBConn.Model(&parent).
			Association("Replies").
			Append([]models.Comment{*parent})

		if err != nil {
			fmt.Println(err.Error())
			fmt.Println("--Attach reply error--")
			return
		}
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

		if err := db.DBConn.Model(&comment).Update("ImageURL", imageURL).Error; err != nil {
			c.Status(500).Send(err)
			return
		}
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