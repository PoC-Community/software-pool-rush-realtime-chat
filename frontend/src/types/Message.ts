import User from "./User";

type Message = {
  content: string;
  created_at: string;
  edges: { user: User };
  room_id: string;
  user_id: string;
  id: string;
};

export default Message;
