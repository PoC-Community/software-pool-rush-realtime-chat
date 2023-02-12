import { HStack, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Navbar from "src/components/Navbar";
import RoomList from "src/components/RoomList";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { API_URL } from "src/Config";
import AuthContext from "src/context/auth";
import Room from "src/types/Room";
import { server } from "src/utils/server";
import Message from "src/types/Message";

type Data = {
  rooms: Room[];
};

const Home = (): JSX.Element => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const { auth } = useContext(AuthContext);

  const fetchRooms = async () => {
    try {
      const res = await server.get<Data>("/rooms", {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      });

      if (res.status != 200) return;

      setRooms(res.data.rooms);
    } catch (e) {}
  };

  const leaveRoom = async (roomId: string) => {



  const joinRoom = async (roomId: string) => {
    if (currentRoom != null) {
      leaveRoom(currentRoom.id);
    }

    setCurrentRoom(rooms.find((room) => room.id == roomId) as Room);

    const source = fetchEventSource(`${API_URL}/stream/${roomId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      onmessage(event) {
        console.log(event.data);
        // const parsedData = JSON.parse(event.data);
        // setData((data) => [...data, parsedData]);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
  };

  useEffect(() => {
    if (auth.isAuthed) fetchRooms();
  }, [auth]);

  useEffect(() => {
    console.log(currentRoom);
  }, [currentRoom]);

  return (
    <VStack spacing="8">
      <Navbar />

      <HStack w="100%" justifyContent="space-between" px="10">
        <RoomList
          rooms={rooms}
          reload={() => fetchRooms()}
          joinRoom={joinRoom}
        />
        <VStack w="full" spacing="8"></VStack>
      </HStack>
    </VStack>
  );
};

export default Home;
