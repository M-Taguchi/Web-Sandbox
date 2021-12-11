import { Suspense, lazy, useState, useEffect } from "react";

import Test from "../components/test";
import {_get} from "../common/internalApi";

const TestContainer: React.FC = () => {

  const getMessage = _get('http://localhost:5000/flask/hello').then(res => {
    return res?.body
  });

  console.log(getMessage)

  const props = {
    getMessage
  }

  return (
    <>
      <Test {...props}/>
    </>
    )
}

export default TestContainer;