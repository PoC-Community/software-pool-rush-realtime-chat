import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Navbar from "src/components/Navbar";

const Home = (): JSX.Element => {
  const userId = 1;
  const messages = [
    { userId: 1, content: "message1" },
    { userId: 2, content: "message2" },
    { userId: 3, content: "message3" },
    { userId: 1, content: "message4" },
    { userId: 1, content: "message5" },
    { userId: 2, content: "message6" },
    { userId: 2, content: "message7" },
    { userId: 1, content: "message8" },
    { userId: 2, content: "message9" },
    { userId: 3, content: "message10" },
    { userId: 1, content: "message11" },
    { userId: 1, content: "message12" },
    { userId: 2, content: "message13" },
    { userId: 2, content: "message14" },
    { userId: 1, content: "message15" },
    { userId: 2, content: "message16" },
    { userId: 3, content: "message17" },
    { userId: 1, content: "message18" },
    { userId: 1, content: "message19" },
    { userId: 2, content: "message20" },
    { userId: 2, content: "message21" },
  ];

  return (
    <VStack spacing="8">
      <Navbar />
    </VStack>
  );
};

export default Home;
