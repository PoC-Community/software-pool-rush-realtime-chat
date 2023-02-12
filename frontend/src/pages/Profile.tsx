import { Button, FormControl, FormLabel, Image, Input, Text, VStack } from '@chakra-ui/react';
import { Outlet } from "react-router-dom";

import Navbar from "src/components/Navbar";

const Profile = () => (
  <VStack spacing='8' h='100vh' w='100vw'>
    <Navbar />
    <Outlet />
    <VStack spacing='8' h='70%' w='70%' justifyContent='center'>
    <Text fontSize="3xl" color="orange.400" fontWeight="bold" padding='25'>
        You ? Again ?
      </Text>
      <VStack spacing='4' w='96'>
        <FormControl>
          <FormLabel color='green.700'>New username</FormLabel>
          <Input
            placeholder='your future name'
          />
        </FormControl>
      </VStack>
      <Button colorScheme="orange" size="lg">
        Save change
      </Button>
    </VStack>
  </VStack>
);

export default Profile;