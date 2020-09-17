package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title     string    `gorm:"size:256;not null;" json:"title"`
	Content   string    `gorm:"size:500;not null;" json:"content"`
	ImageURL  string	`json:"imageURL" form:"image"`
	UserID    uint      `gorm:"index;" json:"author_id"`
	User      User      `json:"author"`
	NotepadID uint      `gorm:"index" json:"notepad_id"`
	Notepad   Notepad   `json:"notepad"`
	Comments  []Comment `json:"comments"`
}
