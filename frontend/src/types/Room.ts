import Message from "./Message";
import User from "./User";

type Room = {
  id: string;
  name: string;
  edges: {
    users: User[];
  };
};

export default Room;
