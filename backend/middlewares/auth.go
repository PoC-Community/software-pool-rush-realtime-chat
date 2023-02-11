package middlewares

import (
	"katsapp_backend/database"
	"katsapp_backend/ent"
	"katsapp_backend/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})
			return
		}

		claims, err := jwt.VerifyToken(token)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})
		}

		user, err := database.DB.GetUserByEmail(claims.Email)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})
		}

		c.Set("user", user)
		c.Next()
	}
}

func NotAuthed() gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			c.Next()
			return
		}

		_, err := jwt.VerifyToken(token)

		if err != nil {
			c.Next()
			return
		}

		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"message": "Unauthorized",
		})
	}
}

func GetUser(c *gin.Context) *ent.User {
	temp, ok := c.Get("user")

	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return nil
	}

	user := temp.(*ent.User)

	return user
}
