import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import AuthContext from "src/context/auth";
import ServerError from "src/types/ServerError";
import { server } from "src/utils/server";

const AddRoom = ({ reload }: { reload: () => void }): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { auth } = useContext(AuthContext);
  const toast = useToast();

  const submit = async () => {
    if (!name) {
      return setError("Please fill all fields");
    }

    try {
      const res = await server.post(
        "/rooms",
        { name },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      );

      if (res.status != 200) return setError("Something went wrong");

      toast({
        title: "Room created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setName("");
      reload();
      onClose();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let data: ServerError | null = e.response?.data;
        if (data) setError(data.message);
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="orange" variant="outline" borderRadius="full" borderWidth="medium">
        Create Room
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Room name</FormLabel>
              <Input
                placeholder="Room name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
              />
            </FormControl>
          </ModalBody>

          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <ModalFooter justifyContent="space-between">
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="orange" onClick={submit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRoom;
