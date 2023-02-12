package controllers

import (
	"errors"
	"katsapp_backend/database"
	"katsapp_backend/ent"
	"net/mail"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(username, email, password string) (*ent.User, error) {
	user, _ := database.DB.GetUserByEmail(email)
	if user != nil {
		return nil, errors.New("Email already exists")
	}

	user, _ = database.DB.GetUserByUsername(username)
	if user != nil {
		return nil, errors.New("Username already exists")
	}

	if len(password) < 6 {
		return nil, errors.New("Password is too short (minimum is 6 characters)")
	}

	if len(username) < 6 {
		return nil, errors.New("Username is too short (minimum is 6 characters)")
	}

	if _, err := mail.ParseAddress(email); err != nil {
		return nil, errors.New("Invalid email address")
	}

	hash, err := HashPassword(password)

	if err != nil {
		return nil, err
	}

	return database.DB.CreateUser(username, email, hash)
}

func LoginUser(login, password string) (*ent.User, error) {
	if user, _ := database.DB.GetUserByEmail(login); user != nil {
		if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
			return nil, errors.New("Invalid username or password")
		}
		return user, nil
	}

	if user, _ := database.DB.GetUserByUsername(login); user != nil {
		if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
			return nil, errors.New("Invalid username or password")
		}
		return user, nil
	}

	return nil, errors.New("Invalid username or password")
}

func IsUserRegistered(email string) bool {
	user, err := database.DB.GetUserByEmail(email)

	if err != nil || user == nil {
		return false
	}

	return true
}

func UpdateUser(id uuid.UUID, username string) (*ent.User, error) {
	if len(username) < 6 {
		return nil, errors.New("Username is too short (minimum is 6 characters)")
	}

	if user, err := database.DB.GetUserByUsername(username); err != nil || user != nil {
		return nil, errors.New("Username already exists")
	}

	return database.DB.UpdateUser(id, username)
}

func IsUserInRoom(userId, roomId uuid.UUID) (bool, error) {
	return database.DB.IsUserInRoom(userId, roomId)
}
