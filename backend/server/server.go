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
		AllowMethods:           []string{"*"},
		AllowHeaders:           []string{"*"},
		AllowAllOrigins:        true,
		AllowCredentials:       true,
		AllowWildcard:          true,
		AllowBrowserExtensions: true,
	}))

	return &Server{
		Router: router,
		Config: Config,
	}
}
