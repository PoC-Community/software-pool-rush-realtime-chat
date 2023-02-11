package routes

import (
	"github.com/gin-gonic/gin"
)

func ApplyRoutes(r *gin.Engine) {
	applyHealth(r)
	applyAuth(r)
}
