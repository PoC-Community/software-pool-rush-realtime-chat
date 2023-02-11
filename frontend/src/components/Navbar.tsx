import { HStack, Text } from "@chakra-ui/react";

const Navbar = (): JSX.Element => {
  return (
    <HStack>
      <Text fontSize="6xl" color="orange.400" as="b">
        KatsApp
      </Text>
    </HStack>
  );
};

export default Navbar;
