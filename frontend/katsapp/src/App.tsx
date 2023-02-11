import { Center, VStack } from '@chakra-ui/react';
// import Welcome from './pages/Welcome';
import { default as Routes } from './Routes';

function App() {
  return (
    <Center mt="160px">
		<VStack spacing="32px">
			<Routes />
		</VStack>
	</Center>
  );
}

export default App;
