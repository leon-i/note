package handlers

import (
	"github.com/gofiber/fiber"
	"github.com/leon-i/note/db"
	"github.com/leon-i/note/models"
	"github.com/leon-i/note/util"
)

type LoginInput struct {
	Identity string `json:"identity"`
	Password string `json:"password"`
}

func GetUser(c *fiber.Ctx) {
	id := c.Params("id")
	var user models.User

	if err := db.DBConn.Find(&user, id).Error; err != nil {
		c.Status(404).Send("User not found.")
		return
	}

	c.JSON(user)
}

func Register(c *fiber.Ctx) {
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		c.Status(500).JSON(fiber.Map{"status": "error",
			"message": "Review your input",
			"data":    err})
		return
	}

	if err := models.ValidateUser(user); err != nil {
		c.Status(500).JSON(fiber.Map{"status": "error",
			"message": "Review your input",
			"data":    err})
		return
	}

	hash, err := util.HashPassword(user.Password)
	if err != nil {
		c.Status(500).JSON(fiber.Map{"status": "error",
			"message": "Couldn't hash password",
			"data":    err})
		return
	}

	user.Password = hash
	if err := db.DBConn.Create(&user).Error; err != nil {
		if util.IsUniqueConstraintError(err, util.UniqueConstraintUsername) {
			err := &util.UsernameDuplicateError{Username: user.Username}
			errMap := make(map[string]string)
			errMap["User.Username"] = err.Error()
			c.Status(500).JSON(fiber.Map{"status": "error",
				"message": "User with that username already exists",
				"data":    errMap})
			return
		}

		if util.IsUniqueConstraintError(err, util.UniqueConstraintEmail) {
			err := &util.EmailDuplicateError{Email: user.Email}
			errMap := make(map[string]string)
			errMap["User.Email"] = err.Error()
			c.Status(500).JSON(fiber.Map{"status": "error",
				"message": "User with that email already exists",
				"data":    errMap})
			return
		}

		c.Status(500).JSON(fiber.Map{"status": "error",
			"message": "Couldn't create user",
			"data":    err})
		return
	}

	token, err := util.GenerateToken(user.ID, user.Username)

	if err != nil {
		c.SendStatus(fiber.StatusInternalServerError)
		return
	}

	c.JSON(fiber.Map{"status": "success",
		"message": "Registration successful", "data": token})
}

func Login(c *fiber.Ctx) {
	var input LoginInput
	var user models.User

	if err := c.BodyParser(&input); err != nil {
		c.SendStatus(fiber.StatusUnauthorized)
		return
	}

	err := db.DBConn.Where(&models.User{Email: input.Identity}).
		Or(&models.User{Username: input.Identity}).
		Find(&user).
		Error

	if err != nil {
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error",
			"message": "Error loggin in", "data": err})
		return
	}

	if user.Username == "" {
		errMap := make(map[string]string)
		errMap["User.Identity"] = "User with that username/email does not exist"
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error",
			"message": "Incorrect username/email", "data": errMap})
		return
	}

	if !util.IsPassword(input.Password, user.Password) {
		errMap := make(map[string]string)
		errMap["User.Password"] = "Incorrect password, please try again"
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error",
			"message": "Invalid password", "data": errMap})
		return
	}

	token, err := util.GenerateToken(user.ID, user.Username)

	if err != nil {
		c.SendStatus(fiber.StatusInternalServerError)
		return
	}

	c.JSON(fiber.Map{"status": "success",
		"message": "Success login", "data": token})
}
