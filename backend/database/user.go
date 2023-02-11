package database

import (
	"katsapp_backend/ent"
	"katsapp_backend/ent/user"

	"github.com/google/uuid"
)

func (d Database) GetUsers() ([]*ent.User, error) {
	return d.Client.User.
		Query().
		All(d.CTX)
}

func (d Database) GetUserById(id uuid.UUID) (*ent.User, error) {
	return d.Client.User.
		Query().
		Where(user.ID(id)).
		Only(d.CTX)
}

func (d Database) GetUserByUsername(username string) (*ent.User, error) {
	return d.Client.User.
		Query().
		Where(user.Username(username)).
		Only(d.CTX)
}

func (d Database) GetUserByEmail(email string) (*ent.User, error) {
	return d.Client.User.
		Query().
		Where(user.Email(email)).
		Only(d.CTX)
}

func (d Database) CreateUser(username string, email string, password string) (*ent.User, error) {
	return d.Client.User.
		Create().
		SetUsername(username).
		SetEmail(email).
		SetPassword(password).
		Save(d.CTX)
}

func (d Database) DeleteUser(id uuid.UUID) error {
	return d.Client.User.
		DeleteOneID(id).
		Exec(d.CTX)
}

func (d Database) UpdateUser(id uuid.UUID, username string) (*ent.User, error) {
	return d.Client.User.
		UpdateOneID(id).
		SetUsername(username).
		Save(d.CTX)
}

func (d Database) AddFriend(userId uuid.UUID, friendId uuid.UUID) (*ent.User, error) {
	return d.Client.User.
		UpdateOneID(userId).
		AddFriendIDs(friendId).
		Save(d.CTX)
}

func (d Database) RemoveFriend(userId uuid.UUID, friendId uuid.UUID) (*ent.User, error) {
	return d.Client.User.
		UpdateOneID(userId).
		RemoveFriendIDs(friendId).
		Save(d.CTX)
}

func (d Database) SearchUser(username string) ([]*ent.User, error) {
	return d.Client.User.
		Query().
		Where(user.UsernameContains(username)).
		All(d.CTX)
}

func (d Database) GetFriends(userId uuid.UUID) ([]*ent.User, error) {
	return d.Client.User.
		Query().
		Where(user.HasFriendsWith(user.ID(userId))).
		All(d.CTX)
}

func (d Database) HasFriend(userId uuid.UUID, friendId uuid.UUID) (bool, error) {
	return d.Client.User.
		Query().
		Where(user.ID(userId)).
		QueryFriends().
		Where(user.ID(friendId)).
		Exist(d.CTX)
}
