import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/appbar";
import { useInternalApi } from "../hooks/useInternalApi";

const AppbarContainer: React.FC = () => {
  const { _post } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () =>
    _post("/auth/logout", {}).then((response: any) => {
      localStorage.removeItem("accessCsrf");
      toast({
        title: "ログアウトしました",
        position: "top",
        status: "success",
        isClosable: true,
      });
      navigate("/login");
    });

  const props = {
    handleLogout,
  };

  return (
    <>
      <Appbar {...props} />
    </>
  );
};

export default AppbarContainer;
