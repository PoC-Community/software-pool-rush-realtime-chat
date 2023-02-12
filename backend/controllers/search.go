package controllers

import (
	"katsapp_backend/database"
	"katsapp_backend/ent"

	"github.com/google/uuid"
)

func SearchUser(userId uuid.UUID, username string) ([]*ent.User, error) {
	return database.DB.SearchUser(userId, username)
}
