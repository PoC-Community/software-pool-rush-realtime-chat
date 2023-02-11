package database

import (
	"context"
	"database/sql"
	"katsapp_backend/ent"
	"log"
	"os"

	"entgo.io/ent/dialect"
	entsql "entgo.io/ent/dialect/sql"
	_ "github.com/jackc/pgx/v4/stdlib"
	"github.com/joho/godotenv"
)

type Database struct {
	Client *ent.Client
	URL    string
	CTX    context.Context
}

var DB *Database

func init() {
	godotenv.Load()
	url := os.Getenv("DB_URL")
	db, err := sql.Open("pgx", url)

	if err != nil {
		log.Fatal("Failed to init database driver")
		return
	}

	client := ent.NewClient(ent.Driver(entsql.OpenDB(dialect.Postgres, db)))

	if err = client.Schema.Create(context.Background()); err != nil {
		log.Fatal("Failed to load the schema")
		return
	}

	DB = &Database{
		Client: client,
		URL:    url,
		CTX:    context.Background(),
	}
}
