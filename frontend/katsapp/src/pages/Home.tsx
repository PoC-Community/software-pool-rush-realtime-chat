import { Box, Button, HStack, Image, Input, Stack, Text, VStack } from "@chakra-ui/react";

const Home = (): JSX.Element => {
  const userId = 1;
  const messages = [
    { userId: 1, content: 'message1' },
    { userId: 2, content: 'message2' },
    { userId: 3, content: 'message3' },
    { userId: 1, content: 'message4' },
    { userId: 1, content: 'message5' },
    { userId: 2, content: 'message6' },
    { userId: 2, content: 'message7' },
    { userId: 1, content: 'message8' },
    { userId: 2, content: 'message9' },
    { userId: 3, content: 'message10' },
    { userId: 1, content: 'message11' },
    { userId: 1, content: 'message12' },
    { userId: 2, content: 'message13' },
    { userId: 2, content: 'message14' },
    { userId: 1, content: 'message15' },
    { userId: 2, content: 'message16' },
    { userId: 3, content: 'message17' },
    { userId: 1, content: 'message18' },
    { userId: 1, content: 'message19' },
    { userId: 2, content: 'message20' },
    { userId: 2, content: 'message21' }
  ];

  return (
    <VStack bgColor='whiteAlpha.300' w='100%' minH='100vh' maxH='100vh' borderWidth='5px'>
      <Stack borderRadius='5px' borderColor='#4cb454' borderWidth='5px' bgColor='whiteAlpha.200' shadow='md' w='100%' >
        <Image margin='5px' boxSize='40px' src='assets/logo.png' alt='Logo-Katsapp'/>
      </Stack>
      <HStack w='100%' minH='100%' alignItems='strech'>
        <VStack borderRadius='5px' borderColor='#48cae4'borderWidth='5px' bgColor='#4a525a' shadow='md' w='30%' overflow='scroll' maxH='100%' >
          {[...Array(30)].map(() => <Button variant={'solid'} borderRadius='15px' borderColor='#006400' borderBottom='2px'w='90%' minH='72px' bgColor='#4cb454'>test</Button>)}
        </VStack>
        <VStack borderRadius='5px' borderColor='#168aad' borderWidth='5px' bgImage='assets/background.jpg' shadow='md' w='70%' align='center'>
          <HStack alignItems='center' marginBottom='-10px'>
            <Box>
              <Text color='green.300' fontFamily='Cursive' fontSize='32px'>User.name</Text>
            </Box>
          </HStack>
          <VStack w='100%' maxH='100%' flexGrow={1}  spacing='32px' overflowY='scroll' padding='15px'>
            {messages.map((m) =>
              <HStack borderRadius='13px' borderColor='#52b69a' borderWidth='2px' align='start' maxW='90%' bgColor='#34a0a4' w='fit-content' padding='2px' alignSelf={m.userId === userId ? 'flex-start' : 'flex-end'}>
                <Text>{m.content}</Text>
              </HStack>
            )}
          </VStack>
          <HStack h='120px' w='100%' padding='10px'>
            <Input borderRadius='7px' borderWidth='3px' h='100%' w='100%'></Input>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
);
};

export default Home;