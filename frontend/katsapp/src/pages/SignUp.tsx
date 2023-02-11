import { Button, Image, Center, FormControl, FormLabel, Link, Input, Text, VStack } from '@chakra-ui/react';

const SignUp = (): JSX.Element => (
	<Center mt="-50px">
		<VStack spacing="30px">
		<Image boxSize='200px' src='assets/logo.png' alt='Logo-Katsapp' />
			<Text fontSize='4xl' color='orange.400' as='b'>
				Welcome among us :D
			</Text>
			<FormControl>
		  <FormLabel color="green.700">Email address</FormLabel>
			<Input placeholder="Email" />
			</FormControl>
			<FormControl>
		  <FormLabel color="green.700">Password</FormLabel>
			<Input placeholder="Password" />
			</FormControl>
			<FormControl>
		  <FormLabel color="green.700">Confirm Password</FormLabel>
			<Input placeholder="Confirm password" />
		</FormControl>
			<Button colorScheme="orange" size="lg">
				Validate
			</Button>
			<Text>
				Don't have an account ? {' '}
				<Link color='orange.400' href='#'>
					Register Here !
				</Link>
			</Text>
		</VStack>
	</Center>
);

export default SignUp;
