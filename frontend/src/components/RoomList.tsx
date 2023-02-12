import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
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

const RoomList = ({
  rooms,
  onLeave,
}: {
  rooms: Room[];
  onLeave: (_: string) => void;
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
            <CardFooter>
              <Button as={Link} to={`/rooms/${room.id}`} variant="ghost" mr="2">
                <ChatIcon mr="2" /> Chat
              </Button>
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
