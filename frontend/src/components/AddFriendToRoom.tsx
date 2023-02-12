import { PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext, useState } from "react";

import AuthContext from "src/context/auth";
import Room from "src/types/Room";
import User from "src/types/User";
import { server } from "src/utils/server";

const AddFriendToRoom = ({
  room,
  onAdd,
}: {
  room: Room;
  onAdd: () => void;
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { auth } = useContext(AuthContext);
  const [friends, setFriends] = useState<User[]>([]);

  const loadFriends = async () => {
    server
      .get<{ friends: User[] }>("/friends", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.status != 200) return;
        setFriends(res.data.friends);
      });
  };

  const addFriend = async (friendId: string) => {
    server
      .put(
        `/room/${room.id}`,
        { friendId },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status != 200) return;
        onClose();
        onAdd();
        setFriends([]);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (isOpen) loadFriends();
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} colorScheme="green" variant="ghost">
        <SmallAddIcon mr="2" /> Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add friends</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing="4">
              {friends.length > 0 &&
                friends
                  .filter((f) => !room.edges.users.find((u) => u.id == f.id))
                  .map((friend) => {
                    return (
                      <HStack
                        w="80"
                        key={friend.id}
                        py="3"
                        px="4"
                        rounded="xl"
                        spacing="5"
                        bgColor="orange.50"
                        justifyContent="space-between"
                      >
                        <Text>{friend.username}</Text>
                        <Button
                          onClick={() => addFriend(friend.id)}
                          colorScheme="orange"
                          variant="ghost"
                        >
                          <PlusSquareIcon /> Add
                        </Button>
                      </HStack>
                    );
                  })}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddFriendToRoom;
