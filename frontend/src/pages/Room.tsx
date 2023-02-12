import { Spinner, VStack } from "@chakra-ui/react";
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
  const roomId = useParams<{ id: string }>().id;
  const ctrlRef = useRef<AbortController>();
  const [messages, setMessages] = useState<Message[]>([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const joinRoom = async (roomId: string) => {
    if (ctrlRef.current) ctrlRef.current.abort();

    ctrlRef.current = new AbortController();

    fetchEventSource(`${API_URL}/stream/${roomId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${auth.accessToken}` },
      signal: ctrlRef.current.signal,
      onmessage(event) {
        const message = JSON.parse(event.data) as Message;
        console.log(message);

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
    if (!roomId) return;

    joinRoom(roomId);

    loadMessages(roomId);

    return () => {
      if (ctrlRef.current) ctrlRef.current.abort();
    };
  }, [roomId]);

  if (!roomId || !auth.user)
    return <Spinner color="orange.500" w="40" h="40" />;

  return (
    <VStack spacing="10">
      <MessageList messages={messages} user_id={auth.user?.id} />

      <MessageInput roomId={roomId} />
    </VStack>
  );
};

export default Room;
