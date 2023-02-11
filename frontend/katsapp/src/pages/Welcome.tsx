import { Button, Center, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Welcome = (): JSX.Element => (
  <Center mt="-90px">
    <VStack spacing="50px">
      <Image src="assets/logo.png" alt="Logo-Katsapp" w="sm" />
      <Text fontSize="2xl" color="orange.400" as="b">
        Join Katsapp to chat with your friends all around the world !
      </Text>
      <Stack direction="column" spacing={4}>
        <Button
          as={Link}
          to={"/login"}
          size="lg"
          borderWidth="4px"
          colorScheme="green"
          variant="outline"
          style={{ borderRadius: 60 }}
        >
          Log In
        </Button>
        <Button
          as={Link}
          to={"/signup"}
          colorScheme="green"
          style={{ borderRadius: 60 }}
          width="350px"
          size="lg"
        >
          Sign Up
        </Button>
      </Stack>
      <Text
        _hover={{ textDecoration: "underline" }}
        as={Link}
        to={"/aboutus"}
        fontSize="md"
        color="orange.500"
      >
        About us
      </Text>
    </VStack>
  </Center>
);

export default Welcome;
