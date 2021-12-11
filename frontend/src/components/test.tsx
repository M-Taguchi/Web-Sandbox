import react from "react";

type TestProps = {
  getMessage?: any;
};

const Test: React.FC<TestProps> = ({
  getMessage
}) => {
  return (
    <>
      <p>Hello, React!</p>
      <p>{getMessage.message}</p>
    </>
  )
};

export default Test;