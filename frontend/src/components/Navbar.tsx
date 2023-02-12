import { Button, HStack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "src/context/auth";

const Navbar = (): JSX.Element => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ isAuthed: false, user: null, accessToken: "" });
    navigate("/rooms");
  };

  return (
    <HStack
      px="8"
      py="6"
      minW="100vw"
      borderBottom="2px"
      borderColor="green.300"
      justifyContent="space-between"
      bgColor="green.50"
    >
      <Text fontSize="2xl" color="green.600" fontWeight="bold">
        KatsApp
      </Text>

      <HStack>
        <Button
          as={Link}
          to="/rooms"
          colorScheme="blackAlpha"
          color="blackAlpha.800"
          variant="ghost"
        >
          Rooms
        </Button>

        <Button
          as={Link}
          to="/friends"
          colorScheme="blackAlpha"
          color="blackAlpha.800"
          variant="ghost"
        >
          Friends
        </Button>
      </HStack>

      <HStack>
        <Button
          as={Link}
          to="/profile"
          colorScheme="blackAlpha"
          color="blackAlpha.800"
          variant="ghost"
        >
          Profile
        </Button>
        <Button colorScheme="red" variant="ghost" onClick={logout}>
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default Navbar;
