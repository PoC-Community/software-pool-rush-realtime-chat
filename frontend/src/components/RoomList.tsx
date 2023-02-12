import { DeleteIcon } from "@chakra-ui/icons";
import { Button, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import AuthContext from "src/context/auth";
import Room from "src/types/Room";
import { server } from "src/utils/server";
import AddRoom from "./AddRoom";

const RoomList = ({
  rooms,
  reload,
  joinRoom
}: {
  rooms: Room[];
  reload: () => void;
  joinRoom: (roomId: string) => void;
}): JSX.Element => {
  const toast = useToast();
  const { auth } = useContext(AuthContext);

  const leaveRoom = async (roomId: string) => {
    const res = await server.delete("/rooms", {
      data: { id: roomId },
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    toast({
      title: "Left room.",
      description: "We've removed you from the room.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    reload();
  };

  return (
    <VStack w="auto" me="8" spacing="8" alignItems="start">
      <AddRoom reload={reload} />

      <VStack w="full" justifyContent="space-between" spacing="0">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <HStack key={room.id} justifyContent="space-between" w="full">
              <Button w="100%" variant="ghost" justifyContent="start" onClick={() => joinRoom(room.id)}>
                {room.name}
              </Button>
              <Button
                onClick={() => leaveRoom(room.id)}
                colorScheme="red"
                ml="4"
                variant="link"
                justifyContent="start"
                w="6"
              >
                <DeleteIcon />
              </Button>
            </HStack>
          ))
        ) : (
          <Text>No rooms found. Create one!</Text>
        )}
      </VStack>
    </VStack>
  );
};
export default RoomList;
