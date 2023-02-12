import { Button, Text, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Navbar from "src/components/Navbar";

const Friends = (): JSX.Element => {
  return (
    <VStack spacing='8' h='100vh' w='100vw'>
    <Navbar />
    <Outlet />
      <VStack spacing='8' w='100%'>
        <Text fontSize="3xl" color="orange.400" fontWeight="bold" padding='25'>
          So famous !
        </Text>
      </VStack>
      <VStack paddingBottom='10px' spacing='4' h='100%' w='100%' justifyContent='' overflowY='scroll'>
        {[...Array(30)].map(() => <Button w='30%' minH='42px' colorScheme="orange">friend.name</Button>)}
      </VStack>
    </VStack>
  );
};

export default Friends;
