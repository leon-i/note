package models

import (
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title     string    `gorm:"size:256;not null;" json:"title"`
	Content   string    `gorm:"size:500;not null;" json:"content"`
	UserID    uint      `gorm:"index;" json:"author"`
	NotepadID uint      `gorm:"index" json:"notepad"`
	Comments  []Comment `json:"comments"`
}
