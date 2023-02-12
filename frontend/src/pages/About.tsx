import { VStack, Text, Image } from "@chakra-ui/react";

const About = (): JSX.Element => (
  <VStack spacing="14" pt="10">
    <Text fontSize="3xl" color="orange.400" fontWeight="bold">
      Why KatsApp ?
    </Text>

    <Image w="56" src="assets/logo.png" alt="Logo-Katsapp" />

    <Text fontSize="xl" color="green.600" w="96">
      Katsapp is a chat application that allows you to chat with your friends
    </Text>

    <Text fontSize="md" color="orange.400" fontWeight="bold">
      made with ♥️ by Mounia, Martin and Jules
    </Text>
  </VStack>
);

export default About;
