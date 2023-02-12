import { Spinner, Text,  VStack } from "@chakra-ui/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MessageInput from "src/components/MessageInput";
import MessageList from "src/components/MessageList";

import { API_URL } from "src/Config";
import AuthContext from "src/context/auth";
import Message from "src/types/Message";
import { server } from "src/utils/server";

const Room = (): JSX.Element => {
  const room = useParams<{ id: string, name: string }>();
  const ctrlRef = useRef<AbortController>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const joinRoom = async (roomId: string) => {
    if (ctrlRef.current) ctrlRef.current.abort();

    ctrlRef.current = new AbortController();

    fetchEventSource(`${API_URL}/stream/${room.id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.accessToken}` },
      signal: ctrlRef.current.signal,
      onmessage(event) {
        const message = JSON.parse(event.data) as Message;
        setMessages((messages) => [...messages, message]);
      },
      onerror() {
        navigate("/rooms");
      },
    });
  };

  const loadMessages = async (roomId: string) => {
    server
      .get<{ messages: Message[] }>(`/room/${roomId}?start=${0}&end=${100}`, {
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      })
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch(() => {
        navigate("/rooms");
      });
  };

  useEffect(() => {
    if (!room.id) return;

    joinRoom(room.id);

    loadMessages(room.id);

    return () => {
      if (ctrlRef.current) ctrlRef.current.abort();
    };
  }, [room]);

  if (!room.id || !auth.user)
    return <Spinner color="orange.500" w="40" h="40" />;

  return (
    <VStack spacing="6">
      <Text fontSize='2xl'>
        {room.name}
      </Text>

      <MessageList messages={messages} user_id={auth.user?.id} />

      <MessageInput roomId={room.id} />
    </VStack>
  );
};

export default Room;
