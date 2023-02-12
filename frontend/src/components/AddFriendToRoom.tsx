import { PlusSquareIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
  ModalFooter,
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

const AddFriendToRoom = ({ room }: { room: Room }): JSX.Element => {
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
        console.log(res.data);
        setFriends(res.data.friends);
      });
  };

  const addFriend = async (friendId: string) => {
    server
      .put(
        `/rooms/${room.id}`,
        { friendId },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status != 200) return;
        onClose();
        setFriends([]);
      });
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
                friends.map((friend) => {
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
