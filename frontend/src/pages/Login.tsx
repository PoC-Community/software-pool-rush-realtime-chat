import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Image,
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
  login: string;
  password: string;
};

const Login = (): JSX.Element => {
  const [data, setData] = useReducer(
    (prev: Data, next: Partial<Data>) => ({ ...prev, ...next }),
    { login: "", password: "" }
  );
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();

  const submit = async () => {
    if (!data.login || !data.password) {
      return setError("Please fill all fields");
    }

    try {
      const res = await server.post<Partial<Auth>>("/auth/login", data);

      if (res.data.accessToken && res.data.user) {
        setAuth({ ...res.data, isAuthed: true });
        navigate("/rooms");
        toast({
          title: "Logged in !",
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
      <Image w="60" src="assets/logo.png" alt="Logo-Katsapp" />

      <Text fontSize="3xl" color="orange.400" fontWeight="bold">
        So happy to see you again :D
      </Text>

      <VStack spacing="4" w="96">
        <FormControl>
          <FormLabel color="green.700">Email or Username</FormLabel>
          <Input
            placeholder="Email/username"
            value={data.login}
            type="text"
            onChange={(e) => setData({ login: e.target.value })}
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
        <Alert status="error" rounded='md' w='auto'>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      <Button onClick={submit} colorScheme="orange" size="lg">
        Log In
      </Button>

      <Text>
        Don't have an account yet ?{" "}
        <Button
          as={Link}
          to={"/register"}
          variant="link"
          fontSize="md"
          color="orange.500"
        >
          Register here !
        </Button>
      </Text>
    </VStack>
  );
};

export default Login;
