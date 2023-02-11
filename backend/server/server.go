package server

import (
	"github.com/gin-gonic/gin"
)

type Server struct {
	Router *gin.Engine
	Config config
}

func NewServer() *Server {
	return &Server{
		Router: gin.Default(),
		Config: Config,
	}
}
