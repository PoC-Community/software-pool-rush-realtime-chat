package routes

import (
	"katsapp_backend/realtime"

	"github.com/gin-gonic/gin"
)

func ApplyRoutes(r *gin.Engine) {
	applyHealth(r)
	applyAuth(r)
	applyUser(r)
	ApplyFriends(r)
	ApplyRooms(r)
	realtime.ApplyRealtime(r)
}
