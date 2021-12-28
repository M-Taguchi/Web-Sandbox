import Test from "../components/test";
import { _get, _post } from "../common/internalApi";
import { UserResponse } from "../types/user";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

const TestContainer: React.FC = () => {
  const { jwtCsrf, setJwtCsrf } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  const response: any = _get("http://localhost:5000/api/user", {
    id: 1,
  }).read();

  const handleJwtTest = () =>
    _post(
      "http://localhost:5000/api/auth",
      {},
      { "X-CSRF-TOKEN": jwtCsrf }
    ).then((response: any) => {
      console.log(response);
    });

  const handleLogout = () =>
    _post("http://localhost:5000/api/auth/logout", {}).then((response: any) => {
      localStorage.removeItem("accessCsrf");
      // TODO:遷移先の変更
      navigate("/login");
    });

  const user = response[1].user;

  const props = {
    user,
    handleJwtTest,
    handleLogout,
  };

  return (
    <>
      <Test {...props} />
    </>
  );
};

export default TestContainer;
