import "./App.css";
import { ChakraProvider, Box } from "@chakra-ui/react";
import KanbanContainer from "./container/kanban/kanbanContainer";
import AuthContainer from "./container/login/loginContainer";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./container/auth/privateRoute";
import { AuthProvider } from "./hooks/useAuth";
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
                  <Route path="/" element={<KanbanContainer />} />
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
