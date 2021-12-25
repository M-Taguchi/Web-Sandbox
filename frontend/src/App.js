import "./App.css";
import { Suspense } from "react";
import { theme, ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <Suspense fallback={<p>loading...</p>}>
        <AuthContainer />
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
