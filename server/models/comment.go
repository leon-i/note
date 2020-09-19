package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Content 	string 		`gorm:"size:800;not null;" json:"content"`
	ImageURL  	string		`json:"imageURL" form:"image"`
	ReplyTo		uint		`json:"replyTo"`
	UserID  	uint   		`gorm:"index;" json:"author_id"`
	User    	User   		`json:"author"`
	PostID  	uint   		`gorm:"index;" json:"post_id"`
	Post    	Post   		`json:"post"`
	Replies 	[]*Comment 	`gorm:"many2many:comment_replies;" json:"replies"`
}
