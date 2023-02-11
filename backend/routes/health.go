package routes

import (
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
)

func health(c *gin.Context) {
	c.AbortWithStatus(http.StatusOK)
}

func applyHealth(r *gin.Engine) {
	r.GET("/ping", health)
	r.GET("/ping/authed", middlewares.AuthRequired(), health)
}
