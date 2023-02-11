import { Button, Center, Image, Link, Stack, Text, VStack } from '@chakra-ui/react';

const Home = (): JSX.Element => (
	<Center mt="100px">
		<VStack spacing="20px">
			<Image src='assets/logo.png' alt='Logo-Katsapp' />
			<Text fontSize='xl' color='orange.400' as='b'>
				Join Katsapp to chat with your friends all around the world !
			</Text>
			<Stack direction='column' spacing={4} >
				<Button borderWidth='4px' colorScheme='green' variant='outline' style={{borderRadius: 60}} >
					Log In
				</Button>
				<Button colorScheme='green' style={{borderRadius: 60}} width='220px'>
					Sign Up
				</Button>
			</Stack>
				<Link fontSize='xs' color='orange.500' >About Us</Link>
		</VStack>
	</Center>
);

export default Home;
