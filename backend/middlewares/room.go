package middlewares

import (
	"katsapp_backend/controllers"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func IsUserInRoom() gin.HandlerFunc {
	return func(c *gin.Context) {
		user := GetUser(c)

		if user == nil {
			return
		}

		roomid, err := uuid.Parse(c.Param("roomid"))

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
			return
		}

		if ok, err := controllers.IsUserInRoom(user.ID, roomid); !ok || err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
			return
		}

		c.Next()
	}
}
