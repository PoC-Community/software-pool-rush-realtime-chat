package realtime

import (
	"io"
	"katsapp_backend/controllers"
	"katsapp_backend/database"
	"katsapp_backend/middlewares"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var roomManager *Manager

func ApplyRealtime(r *gin.Engine) {
	r.GET("/room/:roomid", middlewares.AuthRequired(), middlewares.IsUserInRoom(), getRoom)
	r.POST("/room/:roomid", middlewares.AuthRequired(), sendRoom)
	r.PUT("/room/:roomid", middlewares.AuthRequired(), middlewares.IsUserInRoom(), addFriendToRoom)
	r.DELETE("/room/:roomid", middlewares.AuthRequired(), middlewares.IsUserInRoom(), deleteRoom)
	r.GET("/stream/:roomid", middlewares.AuthRequired(), middlewares.IsUserInRoom(), stream)
	r.DELETE("/message/:messageid", middlewares.AuthRequired(), middlewares.IsUserInRoom(), deleteMessage)
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

func deleteMessage(c *gin.Context) {
	messageid := c.Param("messageid")

	if messageid == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	messageID, err := uuid.Parse(messageid)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	err = database.DB.DeleteMessage(messageID)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	c.Status(http.StatusOK)
}

func addFriendToRoom(c *gin.Context) {
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
		FriendID string `json:"friendId"`
	}{}

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	friendid, err := uuid.Parse(data.FriendID)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	_, err = database.DB.AddUserToRoom(friendid, roomid)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	c.Status(http.StatusOK)
}

func getRoom(c *gin.Context) {
	roomid, err := uuid.Parse(c.Param("roomid"))

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	start, err := strconv.Atoi(c.Query("start"))
	end, err := strconv.Atoi(c.Query("end"))

	if start < 0 || end < 0 || start > end || err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	messages, err := controllers.GetMessagesByRoomWithRange(roomid, start, end)

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

	message, err := controllers.SendMessageToRoom(data.Message, user.ID, roomid)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Bad request"})
		return
	}

	roomManager.Submit(message)
	c.Status(http.StatusOK)
}

func deleteRoom(c *gin.Context) {
	roomid := c.Param("roomid")

	roomManager.DeleteBroadcast(roomid)

	c.Status(http.StatusOK)
}
