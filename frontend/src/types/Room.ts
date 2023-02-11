import Message from "./Message";
import User from "./User";

type Room = {
    id: string;
    name: string;
    messages: Message[];
    users: User[];
}

export default Room;