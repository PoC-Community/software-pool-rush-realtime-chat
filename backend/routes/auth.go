package routes

import (
	"katsapp_backend/controllers"
	"katsapp_backend/ent"
	"katsapp_backend/jwt"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func registerUser(c *gin.Context) {
	var data jwt.AuthRegister

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	user, err := controllers.RegisterUser(data.Username, data.Email, data.Password)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	accessToken, err := jwt.CreateToken(user.Email)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.AbortWithStatusJSON(http.StatusOK, gin.H{
		"accessToken": accessToken,
		"user":        user,
	})
}

func loginUser(c *gin.Context) {
	var data jwt.AuthLogin

	if err := c.ShouldBindJSON(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	user, err := controllers.LoginUser(data.Login, data.Password)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	accessToken, err := jwt.CreateToken(user.Email)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.AbortWithStatusJSON(http.StatusOK, gin.H{
		"accessToken": accessToken,
		"user":        user,
	})
}

func userInfo(c *gin.Context) {
	temp, ok := c.Get("user")

	if !ok {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	user := temp.(*ent.User)

	c.AbortWithStatusJSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func applyAuth(r *gin.Engine) {
	r.POST("/auth/register", middlewares.NotAuthed(), registerUser)
	r.POST("/auth/login", middlewares.NotAuthed(), loginUser)
	r.GET("/auth/user", middlewares.AuthRequired(), userInfo)
}
