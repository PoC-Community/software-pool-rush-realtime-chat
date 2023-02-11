package main

import (
	"fmt"
	"katsapp_backend/routes"
	"katsapp_backend/server"
)

func main() {
	serv := server.NewServer()

	routes.ApplyRoutes(serv.Router)

	serv.Router.Run(fmt.Sprintf("%v:%v", serv.Config.Host, serv.Config.Port))
}
