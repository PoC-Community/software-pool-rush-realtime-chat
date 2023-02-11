package controllers

import (
	"katsapp_backend/database"
	"katsapp_backend/ent"

	"github.com/google/uuid"
)

func SendMessageToRoom(message string, userId, roomId uuid.UUID) (*ent.Message, error) {
	return database.DB.AddMessage(message, userId, roomId)
}

func GetMessagesByRoomWithRange(roomId uuid.UUID, start, end int) ([]*ent.Message, error) {
	return database.DB.GetMessageFromRoomWithRange(roomId, start, end)
}
