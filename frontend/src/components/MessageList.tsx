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

import MessageType from "src/types/Message";
import { server } from "src/utils/server";

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
  onRemove,
}: {
  messages: MessageType[];
  user_id: string;
  onRemove: (_: string) => void;
}): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteMessage = (id: string) => {
    server
      .delete(`/message/${id}`)
      .then((r) => r.status === 200 && onRemove(id))
      .catch((e) => console.log(e));
  };

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

      <VStack spacing="6" w="full" pr="6">
        {messages.length > 0 &&
          messages.map((message) => (
            <VStack
              key={message.id}
              alignSelf={message.user_id == user_id ? "flex-end" : "flex-start"}
              alignItems={
                message.user_id == user_id ? "flex-end" : "flex-start"
              }
            >
              {message.user_id != user_id && (
                <HStack>
                  <Avatar size="sm" name={message.edges.user.username} />
                  <Text fontSize="sm" color="gray.500">
                    {message.edges.user.username}
                  </Text>
                </HStack>
              )}

              <HStack maxW="96" py="3" px="4" rounded="xl" bgColor="orange.50">
                {isLink(message.content) ? (
                  <Link
                    fontSize="lg"
                    color="blue.600"
                    variant="link"
                    wordBreak="break-all"
                    onClick={() => {
                      setUrl(message.content);
                      onOpen();
                    }}
                  >
                    {message.content}
                  </Link>
                ) : (
                  <Text fontSize="lg" wordBreak="break-all">
                    {message.content}
                  </Text>
                )}
              </HStack>

              <HStack>
                <Text fontSize="xs" color="gray.500">
                  {new Date(message.created_at).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
          ))}
      </VStack>

      <div ref={scrollRef} style={{ visibility: "hidden" }} />
    </VStack>
  );
};

export default MessageList;
