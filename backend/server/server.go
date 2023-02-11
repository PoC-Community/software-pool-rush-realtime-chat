package server

import (
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
)

type Server struct {
	Router *gin.Engine
	Config config
}

func NewServer() *Server {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"POST", "GET", "DELETE", "PUT", "PATCH"},
		AllowHeaders: []string{"*"},
	}))

	return &Server{
		Router: router,
		Config: Config,
	}
}
