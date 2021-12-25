import Test from "../components/test";
import { _get } from "../common/internalApi";
import { UserResponse } from "../types/user";

const TestContainer: React.FC = () => {
  const response: any = _get("http://localhost:5000/user", { id: 1 }).read();

  const user = response.user;

  const props = {
    user,
  };

  return (
    <>
      <Test {...props} />
    </>
  );
};

export default TestContainer;
