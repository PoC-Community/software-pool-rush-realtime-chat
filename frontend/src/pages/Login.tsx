import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useReducer, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "src/Config";

type Data = {
  login: string;
  password: string;
};

const Login = (): JSX.Element => {
  const [data, setData] = useReducer(
    (prev: Data, next: Partial<Data>) => ({ ...prev, ...next }),
    {
      login: "",
      password: "",
    }
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.login || !data.password) {
      return setError("Please fill all fields");
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData: { message: string; accessToken: string } =
        await res.json();

      if (res.status !== 200) {
        return setError(resData.message);
      } else {
        localStorage.setItem("accessToken", resData.accessToken);
        navigate("/home");
      }
    } catch (e) {}
  };

  return (
    <Center mt="-50px">
      <VStack spacing="30px">
        <Image boxSize="200px" src="assets/logo.png" alt="Logo-Katsapp" />
        <Text fontSize="4xl" color="orange.400" as="b">
          So happy to see you again :D
        </Text>
        <FormControl>
          <FormLabel color="green.700">Email or Username</FormLabel>
          <Input
            placeholder="Email/username"
            value={data.login}
            onChange={(e) => setData({ login: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="green.700">Password</FormLabel>
          <Input
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ password: e.target.value })}
          />
        </FormControl>

        {error && <Text color="red.500">{error}</Text>}

        <Button onClick={submit} colorScheme="orange" size="lg">
          Log In
        </Button>
        <Text>
          Don't have an account ?{" "}
          <Text
            as={Link}
            to={"/signup"}
            _hover={{ textDecoration: "underline" }}
            fontSize="md"
            color="orange.500"
          >
            Register here !
          </Text>
        </Text>
      </VStack>
    </Center>
  );
};

export default Login;
