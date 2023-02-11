package realtime

import (
	"io"
	"katsapp_backend/controllers"
	"katsapp_backend/middlewares"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var roomManager *Manager

func ApplyRealtime(r *gin.Engine) {
	r.GET("/room/:roomid", middlewares.AuthRequired(), getRoom)
	r.POST("/room/:roomid", middlewares.AuthRequired(), sendRoom)
	r.DELETE("/room/:roomid", middlewares.AuthRequired(), deleteRoom)
	r.GET("/stream/:roomid", middlewares.AuthRequired(), stream)
}

func stream(c *gin.Context) {
	roomid := c.Param("roomid")
	listener := roomManager.OpenListener(roomid)
	defer roomManager.CloseListener(roomid, listener)

	clientGone := c.Request.Context().Done()
	c.Stream(func(w io.Writer) bool {
		select {
		case <-clientGone:
			return false
		case message := <-listener:
			c.SSEvent("message", message)
			return true
		}
	})
}

func getRoom(c *gin.Context) {
	roomid, err := uuid.Parse(c.Param("roomid"))

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	data := struct {
		start int
		end   int
	}{}

	if err := c.ShouldBindQuery(&data); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.start < 0 || data.end < 0 || data.start > data.end {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	messages, err := controllers.GetMessagesByRoomWithRange(roomid, data.start, data.end)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"messages": messages})
}

func sendRoom(c *gin.Context) {
	user := middlewares.GetUser(c)

	if user == nil {
		return
	}

	roomid, err := uuid.Parse(c.Param("roomid"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	data := struct {
		Message string `json:"message"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	if data.Message == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Message is empty"})
		return
	}

	controllers.SendMessageToRoom(data.Message, user.ID, roomid)
	roomManager.Submit(user.ID.String(), roomid.String(), data.Message)

	c.Status(http.StatusOK)
}

func deleteRoom(c *gin.Context) {
	roomid := c.Param("roomid")

	roomManager.DeleteBroadcast(roomid)

	c.Status(http.StatusOK)
}
