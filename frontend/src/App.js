import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import TestContainer from "./container/testContainer";
import AuthContainer from "./container/auth/authContainer";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import PrivateRoute from "./container/auth/privateRoute";
import { AuthProvider } from "./hooks/useAuth"
import { ApiProvider } from "./hooks/useInternalApi";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <AuthProvider>
        <ApiProvider>
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
        </ApiProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
