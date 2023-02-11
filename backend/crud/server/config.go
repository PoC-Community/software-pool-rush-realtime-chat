package server

import (
	"os"

	"github.com/joho/godotenv"
)

type config struct {
	Port   string
	Host   string
	Secret string
}

var Config config

func init() {
	godotenv.Load()

	Config = config{
		Port:   os.Getenv("SERVER_PORT"),
		Host:   os.Getenv("SERVER_HOST"),
		Secret: os.Getenv("SERVER_SECRET"),
	}
}
