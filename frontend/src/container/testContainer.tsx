import { Suspense, lazy, useState, useEffect } from "react";

import Test from "../components/test";
import {_get} from "../common/internalApi";

const TestContainer: React.FC = () => {

  const response = _get('http://localhost:5000/flask/hello');

  console.log(response);

  const props = {
    getMessage: response.value
  }

  return (
    <>
      <Test {...props}/>
    </>
    )
}

export default TestContainer;