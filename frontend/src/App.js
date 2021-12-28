import "./App.css";
import { Suspense } from "react";
import { theme, ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";
import { useState, createContext } from "react";

export const AuthContext = createContext("Auth Context");
export const AuthProvider = AuthContext.Provider;

function App() {
  const [jwtCsrf, setJwtCsrf] = useState("");
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider value={{ jwtCsrf, setJwtCsrf }}>
        <Suspense fallback={<p>loading...</p>}>
          <AuthContainer />
        </Suspense>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
