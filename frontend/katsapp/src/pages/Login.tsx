import { Button, Center, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

const Login = (): JSX.Element => (
	<Center mt="250px">
		<VStack spacing="50px">
			<FormControl>
			<FormControl>
			<FormLabel>Email address</FormLabel>
			<Input />
			<FormLabel>Password</FormLabel>
			<Input />
			<Button colorScheme="teal" size="lg">
				Validate
			</Button>
		</FormControl>
			</FormControl>
		</VStack>
	</Center>
);

export default Login;
