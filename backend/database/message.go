package database

import (
	"katsapp_backend/ent"
	"katsapp_backend/ent/message"
	"katsapp_backend/ent/room"
	"katsapp_backend/ent/user"

	"github.com/google/uuid"
)

func (d Database) GetMessages() ([]*ent.Message, error) {
	return d.Client.Message.
		Query().
		All(d.CTX)
}

func (d Database) GetMessageById(id uuid.UUID) (*ent.Message, error) {
	return d.Client.Message.
		Query().
		Where(message.ID(id)).
		Only(d.CTX)
}

func (d Database) AddMessage(content string, userId, roomId uuid.UUID) (*ent.Message, error) {
	return d.Client.Message.
		Create().
		SetContent(content).
		SetUserID(userId).
		SetRoomID(roomId).
		Save(d.CTX)
}

func (d Database) DeleteMessage(id uuid.UUID) error {
	return d.Client.Message.
		DeleteOneID(id).
		Exec(d.CTX)
}

func (d Database) GetMessageFromUser(userId uuid.UUID) ([]*ent.Message, error) {
	return d.Client.Message.
		Query().
		Where(message.HasUserWith(user.ID(userId))).
		All(d.CTX)
}

func (d Database) GetMessageFromRoom(roomId uuid.UUID) ([]*ent.Message, error) {
	return d.Client.Message.
		Query().
		Where(message.HasRoomWith(room.ID(roomId))).
		All(d.CTX)
}

func (d Database) GetMessageFromRoomWithRange(roomId uuid.UUID, start, end int) ([]*ent.Message, error) {
	return d.Client.Message.
		Query().
		Where(message.HasRoomWith(room.ID(roomId))).
		Order(ent.Desc(message.FieldCreatedAt)).
		Offset(start).
		Limit(end - start).
		All(d.CTX)
}
