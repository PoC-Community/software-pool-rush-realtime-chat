package jwt

import (
	"errors"
	"katsapp_backend/controllers"
	"katsapp_backend/server"
	"strings"
	"time"

	go_jwt "github.com/golang-jwt/jwt"
)

func CreateToken(email string) (string, error) {
	expirationTime := time.Now().Add(4 * time.Hour)

	claims := &CLaims{
		Email: email,
		StandardClaims: go_jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := go_jwt.NewWithClaims(go_jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(server.Config.Secret))

	return tokenString, err
}

func VerifyToken(tokenString string) (*CLaims, error) {
	arr := strings.Split(tokenString, "Bearer ")

	if len(arr) != 2 {
		return nil, errors.New("Unauthorized")
	}

	rawToken, err := go_jwt.ParseWithClaims(
		arr[1],
		&CLaims{},
		func(token *go_jwt.Token) (interface{}, error) {
			return []byte(server.Config.Secret), nil
		},
	)

	if err != nil {
		return nil, errors.New("Unauthorized")
	}

	claims, ok := rawToken.Claims.(*CLaims)

	if !ok || !rawToken.Valid {
		return nil, errors.New("Unauthorized")
	}

	if !controllers.IsUserRegistered(claims.Email) {
		return nil, errors.New("Unauthorized")
	}

	return claims, nil
}
