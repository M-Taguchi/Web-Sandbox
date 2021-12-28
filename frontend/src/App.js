import "./App.css";
import { theme, ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";
import { Suspense, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { _post } from "./common/internalApi";
import PrivateRoute from "./container/auth/privateRoute";

export const AuthContext = createContext("Auth Context");
export const AuthProvider = AuthContext.Provider;

function App() {
  const [jwtCsrf, setJwtCsrf] = useState(
    localStorage.getItem("accessCsrf") || ""
  );

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider value={{ jwtCsrf, setJwtCsrf }}>
        <Router>
          {/* TODO: Loadingコンポーネントの作成 */}
          <Suspense fallback={<p>loading...</p>}>
            <Routes>
              <Route path="/login" element={<AuthContainer />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/test" element={<TestContainer />} />
              </Route>
              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
