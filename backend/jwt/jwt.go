package jwt

import (
	go_jwt "github.com/golang-jwt/jwt"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CLaims struct {
	Email string `json:"email"`
	go_jwt.StandardClaims
}

type AuthLogin struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type UpdateUser struct {
	Username string `json:"username"`
}

type AuthRegister struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	AccessToken string `json:"accessToken"`
	User        `json:"user"`
}
