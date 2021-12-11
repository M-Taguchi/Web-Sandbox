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
      <p>{getMessage}</p>
    </>
  )
};

export default Test;