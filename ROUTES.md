# Api routes DOCUMENTATION

1. Authentication
2. User
3. Health
4. Friends
5. Search
6. Rooms
7. Messages

## 1. Authentication

### 1.1. Login
Endpoint: `/auth/login`  
Method: `POST`  
Description: Login user  
Request body:
```ts
type Request = {
    login: string; // can be username or email
    password: string;
}
```

### 1.2. Register
Endpoint: `/auth/register`  
Method: `POST`  
Description: Register user  
Request body:
```ts
type Request = {
    email: string,
    username: string,
    password: string,
}
```

### 1.3. Get user data
Endpoint: `/auth/user`  
Method: `GET`  
Description: Get user data  
Request body: `null` (because it's a GET request)  
Headers: `Authorization: Bearer token`

### 1.4. Logout
Endpoint: `/auth/logout`  
Method: `GET`  
Description: Logout user  

## 2. User

### 2.1. Change data
Endpoint: `/user`  
Method: `PUT`  
Description: Change user data  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    newUsername: string,
}
```

## 3. Health

### 3.1. Get health (normal)
Endpoint: `/ping`  
Method: `GET`  
Description: Get health of the server (normal)

### 3.2. Get health (authed)
Endpoint: `/ping/authed`  
Method: `GET`  
Description: Get health of the server (authed)  
Headers: `Authorization: Bearer token`  

## 4. Friends

### 4.1. Get friends
Endpoint: `/friends`  
Method: `GET`  
Description: Get friends of the user  
Headers: `Authorization: Bearer token`  

### 4.2. Add friend
Endpoint: `/friends`  
Method: `POST`  
Description: Add friend to the user  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    username: string,
}
```

### 4.3. Remove friend
Endpoint: `/friends`  
Method: `DELETE`  
Description: Remove friend from the user  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    username: string,
}
```

## 5. Search

### 5.1. Search users
Endpoint: `/search/users`  
Method: `POST`  
Description: Search users  
Headers: `Authorization: Bearer token`  
Request body:  
```ts
type Request = {
    username: string,
}
```

## 6. Rooms

### 6.1. Get rooms
Endpoint: `/rooms`
Method: `GET`
Description: Get rooms of the user
Headers: `Authorization: Bearer token`  
Response body:
```ts
type Response = []{
    id: string,
    name: string,
    users: string[],
}
```

### 6.2. Create room
Endpoint: `/rooms`  
Method: `POST`  
Description: Create room  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    name: string,
    usersTarget: string[],
}
```

### 6.3. Get room
Endpoint: `/rooms/:id`  
Method: `GET`  
Description: Get room  
Headers: `Authorization: Bearer token`  
Response body:
```ts
type Response = {
    id: string,
    name: string,
    users: string[],
}
```

### 6.4. Delete room
Endpoint: `/rooms`  
Method: `DELETE`  
Description: Delete room  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    id: string,
}
```

### 6.5. Add user to room
Endpoint: `/rooms/:id`  
Method: `POST`  
Description: Add user to room  
Headers: `Authorization: Bearer token`  
Request body:  
```ts
type Request = {
    usernames: string[],
}
```

### 6.6. Join room
Endpoint: `/rooms/join`  
Method: `POST`  
Description: Join room  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    id: string,
}
```

### 6.7. Leave room
Endpoint: `/rooms/leave`  
Method: `POST`  
Description: Leave room  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    id: string,
}
```

## 7. Messages

### 7.1. Get messages from room (with range)
Protocol: websocket  
Query: `/messages`  
Description: Get messages from room (with range)  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    roomId: string,
    range: {
        start: number,
        end: number,
    },
}
```
Response body:
```ts
type Message = {
    id: string,
    content: string,
    user_id: string,
}

type Response = []Message
```

### 7.2. Send Message to room
Protocol: websocket  
Query: `/send`  
Description: Send Message to room  
Headers: `Authorization: Bearer token`  
Request body:
```ts
type Request = {
    roomId: string,
    message: string,
}
```