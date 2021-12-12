import { User} from "../types/user";

type TestProps = {
  user: User;
};

const Test: React.FC<TestProps> = ({
  user
}) => {
  return (
    <>
      <p>Hello, React!</p>
      <p>{user.name}さん、こんにちは</p>
      <p>IDは{user.id}です</p>
    </>
  )
};

export default Test;