type User = {
  id: string;
  username: string;
  email: string;
  edges: {
    friends: User[];
  };
};

export default User;
