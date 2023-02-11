import { Center, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "src/context/auth";

const Layout = (): JSX.Element => {
  const { auth } = useContext(AuthContext);

  if (auth.isLoading) {
    return (
      <Center justifyContent={"center"} minH="100vh">
        <Spinner color="orange.500" w="40" h="40" />
      </Center>
    );
  }

  return (
    <Center pt="10">
      <Outlet />
    </Center>
  );
};

export default Layout;
