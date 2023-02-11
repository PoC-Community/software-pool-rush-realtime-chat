import { ChakraProvider } from "@chakra-ui/react";

import theme from "src/theme";
import Routes from "src/app/Routes";
import Auth from "src/components/Auth";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Auth>
        <Routes />
      </Auth>
    </ChakraProvider>
  );
}

export default App;
