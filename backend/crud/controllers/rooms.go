package controllers

import (
	"katsapp_backend/database"
	"katsapp_backend/ent"

	"github.com/google/uuid"
)

func CreateRoom(name string, userId uuid.UUID) (*ent.Room, error) {
	return database.DB.CreateRoom(name, userId)
}

func DeleteRoom(id uuid.UUID) error {
	return database.DB.DeleteRoom(id)
}

func GetRooms(userId uuid.UUID) ([]*ent.Room, error) {
	return database.DB.GetRoomsFromUser(userId)
}
