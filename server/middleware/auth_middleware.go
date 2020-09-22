package middleware

import (
	"fmt"

	"github.com/gofiber/fiber"
	jwtware "github.com/gofiber/jwt"
	"github.com/leon-i/note/config"
)

// Protected route
func ProtectedRoute() func(*fiber.Ctx) {
	return jwtware.New(jwtware.Config{
		SigningKey:   []byte(config.Setup("SECRET")),
		ErrorHandler: jwtError,
	})
}

func jwtError(c *fiber.Ctx, err error) {
	token := c.Fasthttp.Request.Header.Peek("Authorization")
	fmt.Println(token)
	if err.Error() == "Missing or malformed JWT" {
		c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "error",
			"message": "Log in to perform this action", "data": nil})
	} else {
		c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"status": "error",
			"message": "Your session has expired", "data": nil})
	}
}
