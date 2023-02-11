import {
  Button,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Welcome = (): JSX.Element => (
  <VStack spacing="12">
    <Image src="assets/logo.png" alt="Logo-Katsapp" w="80" />
    <Text fontSize="2xl" color="orange.400" as="b">
      Join Katsapp to chat with your friends all around the world !
    </Text>
    <VStack spacing={4} width="64">
      <Button
        as={Link}
        to="/login"
        size="lg"
        width="full"
        borderRadius="full"
        borderWidth="medium"
        colorScheme="green"
        variant="outline"
      >
        Log In
      </Button>
      <Button
        as={Link}
        to="/register"
        width="full"
        colorScheme="green"
        borderRadius="full"
        size="lg"
      >
        Register
      </Button>
    </VStack>
    <Button
      as={Link}
      to={"/aboutus"}
      variant="link"
      fontSize="md"
      color="orange.500"
    >
      About us
    </Button>
  </VStack>
);

export default Welcome;
