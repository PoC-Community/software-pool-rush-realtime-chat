import { Center, VStack } from '@chakra-ui/react';
import Home from './pages/Home';

function App() {
  return (
    <Center mt="160px">
		<VStack spacing="32px">
			<Home />
		</VStack>
	</Center>
  );
}

export default App;
