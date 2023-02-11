import { Button, Center, FormControl, FormLabel, Link, Input, Text, VStack } from '@chakra-ui/react';

const SignUp = (): JSX.Element => (
	<Center mt="250px">
		<VStack spacing="50px">
			<FormControl>
			<Text fontSize='4xl' color='orange.400' as='b'>
				So happy to see you again :D
			</Text>
			<FormLabel color='green.700'>Email </FormLabel>
				<Input placeholder="Your email here !" />
				<FormLabel color='green.700'>Password</FormLabel>
				<Input placeholder="Your password here !" />
					<Button colorScheme="green" size="lg">
						Send
					</Button>
					<Link fontSize='xs' color='orange.500' >Forgot password ?</Link>
					<Text>
						Don't have an account ? {' '}
						<Link color='orange.400' href='#'>
							Register Here !
						</Link>
					</Text>
			</FormControl>
		</VStack>
	</Center>
);

export default SignUp;
