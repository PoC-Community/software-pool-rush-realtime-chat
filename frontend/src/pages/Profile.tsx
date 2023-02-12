import {
  Button,
  FormControl,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useContext, useState } from "react";

import AuthContext from "src/context/auth";
import User from "src/types/User";
import { server } from "src/utils/server";

const Profile = () => {
  const [name, setName] = useState("");
  const { auth, setAuth } = useContext(AuthContext);
  const toast = useToast();

  const saveUser = async () => {
    if (name === "") return;

    server
      .put<{ user: User }>(
        "/user",
        { newUsername: name },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status !== 200) return;
        console.log(res.data);
        setAuth({ user: res.data.user });

        toast({
          title: "Changes savec !",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((e) => console.log(e));
  };

  return (
    <VStack spacing="8" h="100vh" w="100vw">
      <VStack spacing="12" h="70%" w="70%" justifyContent="center">
        <Text fontSize="3xl" color="orange.400" fontWeight="bold">
          Hello {auth?.user?.username}
        </Text>
        <FormControl w="82">
          <Input
            placeholder="New username"
            w="full"
            value={name}
            type="text"
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") saveUser();
            }}
          />
        </FormControl>

        <Button onClick={() => saveUser()} colorScheme="orange" borderRadius="full" borderWidth="medium" borderColor="orange.700">
          Save changes
        </Button>
      </VStack>
    </VStack>
  );
};

export default Profile;
