package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Content		string		`gorm:"size:500;not null;" json:"content"`
	UserID		uint		`gorm:"index;" json:"author"`
	PostID		uint		`gorm:"index;" json:"post"`
}