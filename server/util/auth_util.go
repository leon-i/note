package util

import (
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"time"
	"strconv"
	"github.com/leon-i/note/config"
)

func HashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(hashed), err
}

func IsPassword(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func GenerateToken(userId uint, username string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	claims["user_id"] = userId
	claims["exp"] = time.Now().Add(time.Hour * 72).Unix()

	t, err := token.SignedString([]byte(config.Setup("SECRET")))

	return t, err
}

func IsValidToken(t *jwt.Token, id string) bool {
	n, err := strconv.Atoi(id)

	if err != nil {
		return false
	}

	claims := t.Claims.(jwt.MapClaims)
	userId := int(claims["user_id"].(float64))

	if userId != n {
		return false
	}

	return true
}