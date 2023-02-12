import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageType from "src/types/Message";

const isLink = (text: string) => {
  let regex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );

  return regex.test(text);
};

const AlertExternalLink = ({
  isOpen,
  url,
  onClose,
}: {
  isOpen: boolean;
  url: string;
  onClose: () => void;
}) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Warning
            </AlertDialogHeader>

            <AlertDialogBody>
              This link is possibly malicious. Are you sure you want to open it?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button as={Link} colorScheme="red" isExternal href={url} ml={3}>
                Take the risk
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

const MessageList = ({
  messages,
  user_id,
}: {
  messages: MessageType[];
  user_id: string;
}): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <VStack w="60vw" h="64vh" overflow="scroll" spacing="3">
      {messages.length > 60 && (
        <HStack>
          <Button colorScheme="orange" variant="ghost">
            Load more messages
          </Button>
        </HStack>
      )}

      <AlertExternalLink url={url} isOpen={isOpen} onClose={onClose} />

      {messages.length > 0 &&
        messages.map((message) => (
          <HStack
            maxW="96"
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
            {isLink(message.content) ? (
              <Text
                fontSize="lg"
                colorScheme="blue"
                variant="link"
                whiteSpace={'normal'}
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  setUrl(message.content);
                  onOpen();
                }}
              >
                {message.content}
              </Text>
            ) : (
              <Text fontSize="lg">{message.content}</Text>
            )}
          </HStack>
        ))}
      <div ref={scrollRef} style={{ visibility: "hidden" }} />
    </VStack>
  );
};

export default MessageList;
