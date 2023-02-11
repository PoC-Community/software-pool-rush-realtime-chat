package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Message holds the schema definition for the Message entity.
type Message struct {
	ent.Schema
}

// Fields of the Message.
func (Message) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).Default(uuid.New),
		field.String("content").NotEmpty(),
		field.Time("created_at").Default(time.Now),
		field.UUID("room_id", uuid.UUID{}).Optional(),
		field.UUID("user_id", uuid.UUID{}).Optional(),
	}
}

// Edges of the Message.
func (Message) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("room", Room.Type).
			Ref("messages").
			Field("room_id").
			Unique(),
		edge.To("user", User.Type).
			Field("user_id").
			Unique(),
	}
}
