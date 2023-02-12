import { Flex, HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AddRoom from "src/components/AddRoom";
import RoomList from "src/components/RoomList";
import AuthContext from "src/context/auth";
import Room from "src/types/Room";
import { server } from "src/utils/server";

type Data = {
  rooms: Room[];
};

const Rooms = (): JSX.Element => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { auth } = useContext(AuthContext);

  const fetchRooms = () => {
    server
      .get<Data>("/rooms", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        if (res.status != 200) return;
        setRooms(res.data.rooms);
      })
      .catch((e) => {});
  };

  const leaveRoom = async (roomId: string) => {
    const res = await server.delete("/rooms", {
      data: { id: roomId },
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });

    if (res.status != 200) return;

    setRooms((prev) => prev.filter((room) => room.id != roomId));
  };

  useEffect(() => {
    if (auth.isAuthed) fetchRooms();
  }, [auth]);

  return (
    <VStack spacing="10">
      <AddRoom reload={() => fetchRooms()} />

      <RoomList rooms={rooms} onLeave={(id) => leaveRoom(id)} />
    </VStack>
  );
};

export default Rooms;
