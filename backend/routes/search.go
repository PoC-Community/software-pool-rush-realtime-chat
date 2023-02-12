package routes

import (
	"katsapp_backend/controllers"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func search(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	data := struct {
		Username string `json:"username"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.Username == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	users, err := controllers.SearchUser(user.ID, data.Username)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"users": users})
}

func applySearch(r *gin.Engine) {
	r.POST("/search", middlewares.AuthRequired(), search)
}
