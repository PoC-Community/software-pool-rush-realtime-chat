import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
} from "@chakra-ui/react";

import Room from "src/types/Room";
import { Link } from "react-router-dom";
import AddFriendToRoom from "./AddFriendToRoom";

const RoomList = ({
  rooms,
  onLeave,
  reload,
}: {
  rooms: Room[];
  onLeave: (_: string) => void;
  reload: () => void;
}): JSX.Element => {
  return (
    <Flex w="80vw" justifyContent="center" gap="10" flexWrap="wrap">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <Card key={room.id}>
            <CardHeader>
              <Heading size="md" textAlign="center">
                {room.name}
              </Heading>
            </CardHeader>
            <CardBody>
              {room.edges.users.map((user) => (
                <Avatar
                  key={user.id}
                  name={user.username}
                  size="md"
                  mr="2"
                  title={user.username}
                />
              ))}
            </CardBody>
            <CardFooter>
              <Button as={Link} to={`/rooms/${room.id}/${room.name}`} variant="ghost">
                <ChatIcon mr="2" /> Chat
              </Button>

              <AddFriendToRoom room={room} onAdd={() => reload()} />

              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red" variant="ghost">
                    <DeleteIcon mr="2" /> Leave
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    w="auto"
                    px="6"
                    py="4"
                    flexDirection="row"
                    justifyContent="space-around"
                    alignItems="center"
                  >
                    <PopoverArrow />
                    <Text fontSize="md" mr="4">
                      Are you sure ?
                    </Text>
                    <Button colorScheme="red" onClick={() => onLeave(room.id)}>
                      Confirm
                    </Button>
                  </PopoverContent>
                </Portal>
              </Popover>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Text fontSize="md">No rooms found. Create one!</Text>
      )}
    </Flex>
  );
};
export default RoomList;
