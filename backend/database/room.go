package database

import (
	"katsapp_backend/ent"
	"katsapp_backend/ent/room"
	"katsapp_backend/ent/user"

	"github.com/google/uuid"
)

func (d Database) GetRooms() ([]*ent.Room, error) {
	return d.Client.Room.
		Query().
		All(d.CTX)
}

func (d Database) GetRoomById(id uuid.UUID) (*ent.Room, error) {
	return d.Client.Room.
		Query().
		Where(room.ID(id)).
		Only(d.CTX)
}

func (d Database) CreateRoom(name string, userId uuid.UUID) (*ent.Room, error) {
	return d.Client.Room.
		Create().
		SetName(name).
		AddUserIDs(userId).
		Save(d.CTX)
}

func (d Database) DeleteRoom(id uuid.UUID) error {
	return d.Client.Room.
		DeleteOneID(id).
		Exec(d.CTX)
}

func (d Database) UpdateRoom(id uuid.UUID, name string) (*ent.Room, error) {
	return d.Client.Room.
		UpdateOneID(id).
		SetName(name).
		Save(d.CTX)
}

func (d Database) GetRoomsFromUser(userId uuid.UUID) ([]*ent.Room, error) {
	return d.Client.Room.
		Query().
		Where(room.HasUsersWith(user.ID(userId))).
		All(d.CTX)
}
