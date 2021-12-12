import './App.css';
import { Suspense, lazy } from "react";

const TestContainer = lazy(() => import("./container/testContainer"))

function App() {
  return (
    <>
      <p>test</p>
      <Suspense fallback={<p>loading...</p>}>
        <TestContainer />
      </Suspense>
    </>
    
  );
}

export default App;
