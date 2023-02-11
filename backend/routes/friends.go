package routes

import "github.com/gin-gonic/gin"

func getFriends(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func ApplyFriends(r *gin.Engine) {
	r.GET("/friends", getFriends)
}
