import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import MessageType from "src/types/Message";

const MessageList = ({
  messages,
  user_id,
}: {
  messages: MessageType[];
  user_id: string;
}): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <VStack w="60vw" h="70vh" overflow="scroll" spacing="3">
      {messages.length > 60 && (
        <HStack>
          <Button colorScheme="orange" variant='ghost'>
            Load more messages
          </Button>
        </HStack>
      )}

      {messages.length > 0 &&
        messages.map((message) => (
          <HStack
            w="auto"
            alignSelf={message.user_id == user_id ? "flex-end" : "flex-start"}
            key={message.id}
            py="3"
            px="4"
            rounded="xl"
            bgColor="orange.50"
          >
            {message.user_id != user_id && (
              <Avatar mr="4" name={message.edges.user.username} />
            )}
            <Text fontSize="lg">{message.content}</Text>
          </HStack>
        ))}
      <div ref={scrollRef} style={{ visibility: "hidden" }} />
    </VStack>
  );
};

export default MessageList;
