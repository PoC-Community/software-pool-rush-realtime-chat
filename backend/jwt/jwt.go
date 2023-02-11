package jwt

import (
	go_jwt "github.com/golang-jwt/jwt"
)

type CLaims struct {
	Email string `json:"email"`
	go_jwt.StandardClaims
}
