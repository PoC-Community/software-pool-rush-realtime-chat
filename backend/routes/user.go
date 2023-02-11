package routes

import (
	"katsapp_backend/controllers"
	"katsapp_backend/ent"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func updateUser(c *gin.Context) {
	temp, ok := c.Get("user")

	if !ok {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "Unauthorized"})
		return
	}
	user := temp.(*ent.User)

	data := struct {
		NewUsername string `json:"newUsername"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	user, err := controllers.UpdateUser(user.ID, data.NewUsername)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}

func applyUser(r *gin.Engine) {
	r.PUT("/user", middlewares.AuthRequired(), updateUser)
}
