import { Button, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "src/context/auth";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ isAuthed: false, user: null, accessToken: "" });
    navigate("/");
  };

  return (
    <HStack
      p="8"
      minW="100vw"
      borderBottom="2px"
      borderColor="orange.300"
      justifyContent="space-between"
      bgColor="orange.50"
    >
      <Text fontSize="2xl" color="orange.400" fontWeight="bold">
        KatsApp
      </Text>

      <Button colorScheme="red" variant="link" onClick={logout}>
        Logout
      </Button>
    </HStack>
  );
};

export default Navbar;
