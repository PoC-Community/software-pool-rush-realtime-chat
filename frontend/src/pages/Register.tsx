import {
  Button,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "src/context/auth";
import Auth from "src/types/Auth";
import ServerError from "src/types/ServerError";
import { server } from "src/utils/server";

type Data = {
  email: string;
  username: string;
  password: string;
};

const Register = (): JSX.Element => {
  const [data, setData] = useReducer(
    (prev: Data, next: Partial<Data>) => ({ ...prev, ...next }),
    { username: "", email: "", password: "" }
  );
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async () => {
    if (!data.username || !data.email || !data.password) {
      return setError("Please fill all fields");
    }

    try {
      const res = await server.post<Partial<Auth>>("/auth/register", data);

      if (res.data.accessToken && res.data.user) {
        setAuth({ ...res.data, isAuthed: true });
        navigate("/rooms");
        toast({
          title: "Registered !",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        let data: ServerError | null = e.response?.data;

        if (data) setError(data.message);
      }
    }
  };

  return (
    <VStack spacing="8" minH="100vh" justifyContent="center">
      <Image boxSize="60" src="assets/logo.png" alt="Logo-Katsapp" />

      <Text fontSize="3xl" color="orange.400" fontWeight="bold">
        Welcome among us :D
      </Text>

      <VStack spacing="4" w="96">
        <FormControl>
          <FormLabel color="green.700">Email address</FormLabel>
          <Input
            placeholder="Email"
            type="text"
            value={data.email}
            onChange={(e) => setData({ email: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="green.700">Username</FormLabel>
          <Input
            placeholder="Username"
            value={data.username}
            type="text"
            onChange={(e) => setData({ username: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="green.700">Password</FormLabel>
          <Input
            placeholder="Password"
            value={data.password}
            type="password"
            onChange={(e) => setData({ password: e.target.value })}
          />
        </FormControl>
      </VStack>

      {error && (
        <Alert status="error" rounded="md" w="auto">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <Button onClick={submit} colorScheme="orange" size="lg">
        Register
      </Button>

      <Text>
        Already got an account ?{" "}
        <Button
          as={Link}
          to={"/login"}
          variant="link"
          color="orange.500"
          fontSize="md"
        >
          Login here !
        </Button>
      </Text>
    </VStack>
  );
};

export default Register;
