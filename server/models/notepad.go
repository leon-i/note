package models

import (
	"gorm.io/gorm"
)

type Notepad struct {
	gorm.Model
	Name        string `gorm:"size:100;unique;not null;" json:"name"`
	Description string `gorm:"size:400;not null;" json:"description"`
	Posts       []Post `json:"posts"`
}
