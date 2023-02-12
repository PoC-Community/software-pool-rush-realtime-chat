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

func RemoveUser(userId, roomId uuid.UUID) error {
	room, err := database.DB.RemoveUserFromRoom(userId, roomId)

	if err != nil {
		return err
	}

	if room.QueryUsers().CountX(database.DB.CTX) == 0 {
		err = DeleteRoom(room.ID)
	}

	return err
}

func GetRooms(userId uuid.UUID) ([]*ent.Room, error) {
	return database.DB.GetRoomsFromUser(userId)
}
