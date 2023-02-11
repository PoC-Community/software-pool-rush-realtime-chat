import { VStack, Center, Text, Image } from "@chakra-ui/react";

const AboutUs = (): JSX.Element => (
  <Center mt="-90px">
    <VStack spacing="30px">
      <Text fontSize="6xl" color="orange.400" as="b">
        Why KatsApp ?
      </Text>
      <Text fontSize="xl" color="orange.400" as="b">
        Mounia - Martin - Jules
      </Text>
      <Image boxSize="150px" src="assets/logo.png" alt="Logo-Katsapp" />
      <Text fontSize="lg" color="green.600" as="i">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae
        elementum purus, vitae convallis eros. Vivamus maximus elementum nunc
        eget tempor. Quisque aliquam lacus id maximus pharetra. Proin erat mi,
        efficitur eu ornare vel, suscipit at arcu. Nulla facilisi. Vestibulum ac
        suscipit mauris, quis faucibus dui. Vivamus a tellus condimentum,
        lobortis sem id, venenatis arcu. Praesent ante mauris, cursus eu ornare
        ut, sollicitudin convallis mauris. Donec rutrum imperdiet lacus. Nulla
        vulputate, elit quis laoreet tempus, purus odio faucibus sapien, eget
        mollis massa ipsum vel elit.
      </Text>
    </VStack>
  </Center>
);

export default AboutUs;
