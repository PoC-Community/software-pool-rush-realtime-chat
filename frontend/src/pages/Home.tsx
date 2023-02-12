import { VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "src/components/Navbar";

const Home = (): JSX.Element => {
  return (
    <VStack spacing="8">
      <Navbar />
      <Outlet />
    </VStack>
  );
};

export default Home;
