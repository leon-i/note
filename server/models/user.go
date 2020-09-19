package models

import (
	"github.com/go-playground/locales/en"
	ut "github.com/go-playground/universal-translator"
	"github.com/go-playground/validator/v10"
	en_translations "github.com/go-playground/validator/v10/translations/en"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username 	string    	`gorm:"unique_index;unique;not null" validate:"required,max=20,min=4" json:"username"`
	Email    	string    	`gorm:"unique_index;unique;not null" validate:"required,email" json:"email"`
	Password 	string    	`gorm:"not null" validate:"required,min=6" json:"password"`
	Favorites	[]Notepad	`gorm:"many2many:user_favorites;" json:"favorites"`
	Posts    	[]Post    	`json:"posts"`
	Comments 	[]Comment 	`json:"comments"`
}

func ValidateUser(user *User) map[string]string {
	v := validator.New()
	en := en.New()
	uni := ut.New(en, en)
	trans, _ := uni.GetTranslator("en")
	en_translations.RegisterDefaultTranslations(v, trans)

	err := v.Struct(user)

	if err != nil {
		errs := err.(validator.ValidationErrors)
		return errs.Translate(trans)
	}

	return nil
}
