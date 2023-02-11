package routes

import (
	"katsapp_backend/controllers"
	"katsapp_backend/database"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getFriends(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	friends, err := controllers.GetFriends(user.ID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"friends": friends})
}

func addFriend(c *gin.Context) {
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

	friend, err := database.DB.GetUserByUsername(data.Username)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := controllers.AddFriend(user, friend.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Friend added"})
}

func deleteFriend(c *gin.Context) {
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

	friend, err := database.DB.GetUserByUsername(data.Username)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := controllers.DeleteFriend(user, friend.ID); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Friend deleted"})
}

func ApplyFriends(r *gin.Engine) {
	r.GET("/friends", middlewares.AuthRequired(), getFriends)
	r.POST("/friends", middlewares.AuthRequired(), addFriend)
	r.DELETE("/friends", middlewares.AuthRequired(), deleteFriend)
}
