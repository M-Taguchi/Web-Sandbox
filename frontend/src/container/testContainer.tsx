import Test from "../components/test";
import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../hooks/useInternalApi";
import { useToast } from "@chakra-ui/react";

const TestContainer: React.FC = () => {
  const { _post, _get } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  const response: any = _get("/user", {
    id: 1,
  }).read();

  const handleJwtTest = () =>
    _post(
      "/auth",
    ).then((response: any) => {
      console.log(response);
    }).catch(() => {
      navigate("/login")
    });

  const handleLogout = () =>
    _post("/auth/logout", {}).then((response: any) => {
      localStorage.removeItem("accessCsrf");
      toast({title: "ログアウトしました", position: "top", status: "success"})
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
