import './App.css';
import { Suspense } from "react";
import { theme, ChakraProvider } from '@chakra-ui/react'
import TestContainer from './container/testContainer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Suspense fallback={<p>loading...</p>}>
        <TestContainer />
      </Suspense>
    </ChakraProvider>
  );
}

export default App;
