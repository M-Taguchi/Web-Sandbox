import "./App.css";
import { Suspense } from "react";
import { theme, ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export const AuthContext = createContext("Auth Context");
export const AuthProvider = AuthContext.Provider;

function App() {
  const [jwtCsrf, setJwtCsrf] = useState("");
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider value={{ jwtCsrf, setJwtCsrf }}>
        <Router>
          {/* TODO: Loadingコンポーネントの作成 */}
          <Suspense fallback={<p>loading...</p>}>
            <Routes>
              <Route path="/" element={<AuthContainer />} />
              <Route path="/test" element={<TestContainer />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
