import { Button, Center, FormControl, FormLabel, Input, VStack, Text, Image } from '@chakra-ui/react';

const Login = (): JSX.Element => (
	<Center mt="-50px">
		<VStack spacing="30px">
		<Image boxSize='200px' src='assets/logo.png' alt='Logo-Katsapp' />
			<Text fontSize='4xl' color='orange.400' as='b'>
				So happy to see you again :D
			</Text>
			<FormControl>
		  <FormLabel color="green.700">Email address</FormLabel>
			<Input placeholder="Email" />
			</FormControl>
			<FormControl>
		  <FormLabel color="green.700">Password</FormLabel>
			<Input placeholder="Password" />
		</FormControl>
			<Button colorScheme="orange" size="lg">
				Validate
			</Button>
		</VStack>
	</Center>
);

export default Login;

