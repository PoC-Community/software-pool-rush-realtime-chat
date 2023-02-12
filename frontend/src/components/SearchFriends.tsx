import { SmallAddIcon } from "@chakra-ui/icons";
import {
  HStack,
  FormControl,
  Input,
  Button,
  VStack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import AuthContext from "src/context/auth";
import User from "src/types/User";
import { server } from "src/utils/server";

const SearchFriends = ({ onAdd }: { onAdd: () => void }): JSX.Element => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const { auth } = useContext(AuthContext);

  const searchUser = async () => {
    if (search == "") return setUsers([]);

    server
      .post<{ users: User[] }>(
        "/search",
        { username: search },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status != 200) return;
        setUsers(res.data.users);
      })
      .catch((e) => console.log(e));
  };

  const addFriend = async (friendName: string) => {
    server
      .post(
        `/friends`,
        { username: friendName },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status != 200) return;
        onAdd();
        searchUser();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <HStack>
        <FormControl>
          <Input
            placeholder="Username"
            w="full"
            value={search}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") searchUser();
            }}
          />
        </FormControl>
        <Button onClick={() => searchUser()} colorScheme="orange">
          Search
        </Button>
      </HStack>
      <VStack>
        {users.length > 0 &&
          users.map((user) => {
            return (
              <HStack
                key={user.id}
                w="80"
                py="3"
                px="4"
                rounded="xl"
                spacing="5"
                bgColor="green.50"
                justifyContent="space-between"
              >
                <Text>{user.username}</Text>
                <Button
                  onClick={() => addFriend(user.username)}
                  colorScheme="green"
                  variant="ghost"
                >
                  <SmallAddIcon /> Add
                </Button>
              </HStack>
            );
          })}
      </VStack>
    </>
  );
};

export default SearchFriends;
