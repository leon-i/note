package util

import (
	"fmt"

	"github.com/jackc/pgconn"
)

const (
	UniqueConstraintUsername = "users_username_key"
	UniqueConstraintEmail    = "users_email_key"
	UniqueConstraintNotepad  = "notepads_name_key"
)

type UsernameDuplicateError struct {
	Username string
}

type EmailDuplicateError struct {
	Email string
}

type NotepadDuplicateError struct {
	Name string
}

func (e *UsernameDuplicateError) Error() string {
	return fmt.Sprintf("Username '%s' already exists", e.Username)
}

func (e *EmailDuplicateError) Error() string {
	return fmt.Sprintf("Email '%s' already exists", e.Email)
}

func (e *NotepadDuplicateError) Error() string {
	return fmt.Sprintf("Notepad '%s' already exists", e.Name)
}

func IsUniqueConstraintError(err error, constraintName string) bool {
	if pgErr, ok := err.(*pgconn.PgError); ok {
		return pgErr.Code == "23505" && pgErr.ConstraintName == constraintName
	}

	return false
}
