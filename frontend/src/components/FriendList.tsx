import { DeleteIcon } from "@chakra-ui/icons";
import {
  VStack,
  HStack,
  Avatar,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  Text,
} from "@chakra-ui/react";
import User from "src/types/User";

const FriendList = ({
  friends,
  onRemove,
}: {
  friends: User[];
  onRemove: (_: string) => void;
}): JSX.Element => {
  return (
    <VStack spacing="4">
      {friends.length > 0 ? (
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
              <HStack>
                <Avatar mr="4" name={friend.username} />
                <Text>{friend.username}</Text>
              </HStack>
              <Popover>
                <PopoverTrigger>
                  <Button colorScheme="red" variant="ghost">
                    <DeleteIcon mr="2" /> Remove
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
                    <Button
                      colorScheme="red"
                      onClick={() => onRemove(friend.username)}
                    >
                      Confirm
                    </Button>
                  </PopoverContent>
                </Portal>
              </Popover>
            </HStack>
          );
        })
      ) : (
        <Text fontSize="xl">You have no friends yet.</Text>
      )}
    </VStack>
  );
};

export default FriendList;
