import { Spinner, VStack } from "@chakra-ui/react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MessageInput from "src/components/MessageInput";
import MessageList from "src/components/MessageList";

import { API_URL } from "src/Config";
import AuthContext from "src/context/auth";
import Message from "src/types/Message";

const Room = (): JSX.Element => {
  const roomId = useParams<{ id: string }>().id;
  const ctrlRef = useRef<AbortController>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { auth } = useContext(AuthContext);

  const joinRoom = async (roomId: string) => {
    if (ctrlRef.current) ctrlRef.current.abort();

    ctrlRef.current = new AbortController();

    fetchEventSource(`${API_URL}/stream/${roomId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.accessToken}` },
      signal: ctrlRef.current.signal,
      onmessage(event) {
        const message = JSON.parse(event.data) as Message;
        setMessages((messages) => [...messages, message]);
      },
    });
  };

  useEffect(() => {
    if (!roomId) return;

    joinRoom(roomId);

    return () => {
      if (ctrlRef.current) ctrlRef.current.abort();
    };
  }, [roomId]);

  if (!roomId || !auth.user)
    return <Spinner color="orange.500" w="40" h="40" />;

  return (
    <VStack>
      <MessageList messages={messages} userId={auth.user?.id} />

      <MessageInput roomId={roomId} />
    </VStack>
  );
};

export default Room;
