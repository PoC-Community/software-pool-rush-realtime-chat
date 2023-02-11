import {
  Button,
  Image,
  Center,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SignUp = (): JSX.Element => (
  <Center mt="-50px">
    <VStack spacing="30px">
      <Image boxSize="200px" src="assets/logo.png" alt="Logo-Katsapp" />
      <Text fontSize="4xl" color="orange.400" as="b">
        Welcome among us :D
      </Text>
      <FormControl>
        <FormLabel color="green.700">Email address</FormLabel>
        <Input placeholder="Email" />
      </FormControl>
      <FormControl>
        <FormLabel color="green.700">Username</FormLabel>
        <Input placeholder="Username" />
      </FormControl>
      <FormControl>
        <FormLabel color="green.700">Password</FormLabel>
        <Input placeholder="Password" />
      </FormControl>
      <Button as={Link} to={"/home"} colorScheme="orange" size="lg">
        Register
      </Button>
    </VStack>
  </Center>
);

export default SignUp;
