package controllers

import (
	"errors"
	"katsapp_backend/database"
	"katsapp_backend/ent"

	"github.com/google/uuid"
)

func AddFriend(user *ent.User, friendID uuid.UUID) error {
	if user.ID == friendID {
		return errors.New("You can't add yourself as a friend")
	}

	if ok, _ := HasFriend(user.ID, friendID); ok {
		return errors.New("You are already friend with this user")
	}

	_, err := database.DB.AddFriend(user.ID, friendID)

	return err
}

func DeleteFriend(user *ent.User, friendID uuid.UUID) error {
	if user.ID == friendID {
		return errors.New("You can't delete yourself as a friend")
	}

	_, err := database.DB.RemoveFriend(user.ID, friendID)

	return err
}

func GetFriends(userID uuid.UUID) ([]*ent.User, error) {
	return database.DB.GetFriends(userID)
}

func HasFriend(userID, friendID uuid.UUID) (bool, error) {
	return database.DB.HasFriend(userID, friendID)
}
