package controllers

import (
	"katsapp_backend/database"
	"katsapp_backend/ent"
)

func SearchUser(username string) ([]*ent.User, error) {
	return database.DB.SearchUser(username)
}
