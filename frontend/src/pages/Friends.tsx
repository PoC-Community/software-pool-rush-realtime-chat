import { VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import FriendList from "src/components/FriendList";
import SearchFriends from "src/components/SearchFriends";

import AuthContext from "src/context/auth";
import User from "src/types/User";
import { server } from "src/utils/server";

const Friends = (): JSX.Element => {
  const [friends, setFriends] = useState<User[]>([]);
  const { auth } = useContext(AuthContext);

  const removeFriend = async (friendName: string) => {
    server
      .delete(`/friends`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
        data: { username: friendName },
      })
      .then((res) => {
        if (res.status !== 200) return;
        loadFriends();
      })
      .catch((e) => console.log(e));
  };

  const loadFriends = async () => {
    server
      .get<{ friends: User[] }>("/friends", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.status !== 200) return;
        setFriends(res.data.friends);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <VStack spacing="12">
      <SearchFriends onAdd={() => loadFriends()} />

      <FriendList friends={friends} onRemove={(id) => removeFriend(id)} />
    </VStack>
  );
};

export default Friends;
