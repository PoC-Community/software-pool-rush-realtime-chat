import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import MessageType from "src/types/Message";

const MessageList = ({
  messages,
  userId,
}: {
  messages: MessageType[];
  userId: string;
}): JSX.Element => {
  return (
    <VStack w="full">
      {messages.length > 0 &&
        messages.map((message) => (
          <HStack w="full" key={message.id} border='2px' p='2' borderColor='orange'>
            <Avatar name={message.username} />
            <Text>{message.content}</Text>
          </HStack>
        ))}
    </VStack>
  );
};

export default MessageList;
