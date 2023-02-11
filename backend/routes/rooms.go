package routes

import (
	"katsapp_backend/controllers"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func getRooms(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	rooms, err := controllers.GetRooms(user.ID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"rooms": rooms})
}

func createRoom(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	data := struct {
		Name string `json:"name"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.Name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.Name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	room, err := controllers.CreateRoom(data.Name, user.ID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room created", "room": room})
}

func deleteRoom(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	data := struct {
		ID uuid.UUID `json:"id"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.ID == uuid.Nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if err := controllers.DeleteRoom(data.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Room deleted"})
}

func ApplyRooms(r *gin.Engine) {
	r.GET("/rooms", middlewares.AuthRequired(), getRooms)
	r.POST("/rooms", middlewares.AuthRequired(), createRoom)
	r.DELETE("/rooms", middlewares.AuthRequired(), deleteRoom)
	// r.GET("/rooms/:id", middlewares.AuthRequired(), room)
	// r.POST("/rooms/:id", middlewares.AuthRequired(), joinRoom)
}
