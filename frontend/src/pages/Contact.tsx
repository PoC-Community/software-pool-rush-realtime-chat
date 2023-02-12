import { Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Contact = (): JSX.Element => (
  <VStack spacing="12" pt="10">
    <Text fontSize="4xl" color="orange.400" fontWeight="bold">
      Contact Us :D
    </Text>

    <Link to='/'>
      <Image w="56" src="assets/logo.png" alt="Logo-Katsapp" />
    </Link>

    <Text fontSize="xl" color="orange.600" fontWeight="bold" style={{textAlign: "justify"}} >
      Martin SALDINGER
    </Text>
    <Text fontSize="xl" color="orange.600" fontWeight="bold" style={{textAlign: "center"}} >
      Jules DUFRAICHE
    </Text>
    <Text fontSize="xl" color="orange.600" fontWeight="bold" style={{textAlign: "center"}} >
      Mounia ARJDAL
    </Text>
    <Text fontSize="md" color="orange.400" fontWeight="bold">
      Made with ♥️ by Mounia, Martin and Jules
    </Text>
  </VStack>
);

export default Contact;
