import react from "react";
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
      <p>{user.userName}さん、こんにちは</p>
      <p>メッセージ：{user.message}</p>
    </>
  )
};

export default Test;