package routes

import (
	"fmt"
	"katsapp_backend/controllers"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func updateUser(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	data := struct {
		NewUsername string `json:"newUsername"`
	}{}

	fmt.Println("data", data)

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	fmt.Println("data", data)

	if data.NewUsername == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	fmt.Println("data", data)

	user, err := controllers.UpdateUser(user.ID, data.NewUsername)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	fmt.Println("data", data)

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func applyUser(r *gin.Engine) {
	r.PUT("/user", middlewares.AuthRequired(), updateUser)
}
