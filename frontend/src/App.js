import "./App.css";
import { Suspense, useEffect } from "react";
import { theme, ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";
import { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { _post } from "./common/internalApi";

export const AuthContext = createContext("Auth Context");
export const AuthProvider = AuthContext.Provider;

function App() {
  const [jwtCsrf, setJwtCsrf] = useState("");

  // const Private = () => {
  //   const [isAuth, setIsAuth] = useState(false);
  //   _post("http://localhost:5000/api/auth", {}, { "X-CSRF-TOKEN": jwtCsrf })
  //     .then(() => {
  //       console.log("成功");
  //       setIsAuth(true);
  //     })
  //     .catch(() => {
  //       console.log("失敗");
  //       setIsAuth(false);
  //     });
  //   return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
  // };

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider value={{ jwtCsrf, setJwtCsrf }}>
        <Router>
          {/* TODO: Loadingコンポーネントの作成 */}
          <Suspense fallback={<p>loading...</p>}>
            <Routes>
              <Route path="/login" element={<AuthContainer />} />
              {/* <Route path="/" element={<Private />}> */}
              <Route path="/test" element={<TestContainer />} />
              {/* </Route> */}
              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
