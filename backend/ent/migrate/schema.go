// Code generated by ent, DO NOT EDIT.

package migrate

import (
	"entgo.io/ent/dialect/sql/schema"
	"entgo.io/ent/schema/field"
)

var (
	// MessagesColumns holds the columns for the "messages" table.
	MessagesColumns = []*schema.Column{
		{Name: "id", Type: field.TypeUUID},
		{Name: "content", Type: field.TypeString},
		{Name: "created_at", Type: field.TypeTime},
		{Name: "user_id", Type: field.TypeUUID, Nullable: true},
		{Name: "room_id", Type: field.TypeUUID, Nullable: true},
	}
	// MessagesTable holds the schema information for the "messages" table.
	MessagesTable = &schema.Table{
		Name:       "messages",
		Columns:    MessagesColumns,
		PrimaryKey: []*schema.Column{MessagesColumns[0]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "messages_users_user",
				Columns:    []*schema.Column{MessagesColumns[3]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.SetNull,
			},
			{
				Symbol:     "messages_rooms_messages",
				Columns:    []*schema.Column{MessagesColumns[4]},
				RefColumns: []*schema.Column{RoomsColumns[0]},
				OnDelete:   schema.SetNull,
			},
		},
	}
	// RoomsColumns holds the columns for the "rooms" table.
	RoomsColumns = []*schema.Column{
		{Name: "id", Type: field.TypeUUID},
		{Name: "name", Type: field.TypeString},
	}
	// RoomsTable holds the schema information for the "rooms" table.
	RoomsTable = &schema.Table{
		Name:       "rooms",
		Columns:    RoomsColumns,
		PrimaryKey: []*schema.Column{RoomsColumns[0]},
	}
	// UsersColumns holds the columns for the "users" table.
	UsersColumns = []*schema.Column{
		{Name: "id", Type: field.TypeUUID},
		{Name: "username", Type: field.TypeString, Unique: true},
		{Name: "email", Type: field.TypeString, Unique: true},
		{Name: "password", Type: field.TypeString},
	}
	// UsersTable holds the schema information for the "users" table.
	UsersTable = &schema.Table{
		Name:       "users",
		Columns:    UsersColumns,
		PrimaryKey: []*schema.Column{UsersColumns[0]},
	}
	// RoomUsersColumns holds the columns for the "room_users" table.
	RoomUsersColumns = []*schema.Column{
		{Name: "room_id", Type: field.TypeUUID},
		{Name: "user_id", Type: field.TypeUUID},
	}
	// RoomUsersTable holds the schema information for the "room_users" table.
	RoomUsersTable = &schema.Table{
		Name:       "room_users",
		Columns:    RoomUsersColumns,
		PrimaryKey: []*schema.Column{RoomUsersColumns[0], RoomUsersColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "room_users_room_id",
				Columns:    []*schema.Column{RoomUsersColumns[0]},
				RefColumns: []*schema.Column{RoomsColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "room_users_user_id",
				Columns:    []*schema.Column{RoomUsersColumns[1]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// UserFriendsColumns holds the columns for the "user_friends" table.
	UserFriendsColumns = []*schema.Column{
		{Name: "user_id", Type: field.TypeUUID},
		{Name: "friend_id", Type: field.TypeUUID},
	}
	// UserFriendsTable holds the schema information for the "user_friends" table.
	UserFriendsTable = &schema.Table{
		Name:       "user_friends",
		Columns:    UserFriendsColumns,
		PrimaryKey: []*schema.Column{UserFriendsColumns[0], UserFriendsColumns[1]},
		ForeignKeys: []*schema.ForeignKey{
			{
				Symbol:     "user_friends_user_id",
				Columns:    []*schema.Column{UserFriendsColumns[0]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
			{
				Symbol:     "user_friends_friend_id",
				Columns:    []*schema.Column{UserFriendsColumns[1]},
				RefColumns: []*schema.Column{UsersColumns[0]},
				OnDelete:   schema.Cascade,
			},
		},
	}
	// Tables holds all the tables in the schema.
	Tables = []*schema.Table{
		MessagesTable,
		RoomsTable,
		UsersTable,
		RoomUsersTable,
		UserFriendsTable,
	}
)

func init() {
	MessagesTable.ForeignKeys[0].RefTable = UsersTable
	MessagesTable.ForeignKeys[1].RefTable = RoomsTable
	RoomUsersTable.ForeignKeys[0].RefTable = RoomsTable
	RoomUsersTable.ForeignKeys[1].RefTable = UsersTable
	UserFriendsTable.ForeignKeys[0].RefTable = UsersTable
	UserFriendsTable.ForeignKeys[1].RefTable = UsersTable
}
