import { useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Login from "../../components/pages/login";
import { useAuth } from "../../hooks/useAuth";
import { useInternalApi } from "../../hooks/useInternalApi";

const LoginContainer: React.FC = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { setJwtCsrf } = useAuth();
  const { _post } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  // 認証系の処理を書く
  const handleLogin = handleSubmit((data) =>
    _post("/auth/login", data)
      .then((response: any) => {
        setJwtCsrf(response.accessCsrf);
        localStorage.setItem("accessCsrf", response.accessCsrf);
        toast({
          title: "ログインしました",
          position: "top",
          status: "success",
          isClosable: true,
        });
        // TODO:遷移先の変更
        navigate("/");
      })
      .catch(() => {
        toast({
          title: "ログインに失敗しました",
          position: "top",
          status: "error",
          isClosable: true,
        });
      })
  );

  const props = { handleLogin };

  return (
    <>
      <FormProvider {...methods}>
        <Login {...props} />
      </FormProvider>
    </>
  );
};

export default LoginContainer;
