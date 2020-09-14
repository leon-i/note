package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Content string `gorm:"size:500;not null;" json:"content"`
	UserID  uint   `gorm:"index;" json:"author_id"`
	User    User   `json:"author"`
	PostID  uint   `gorm:"index;" json:"post_id"`
	Post    Post   `json:"post"`
}
