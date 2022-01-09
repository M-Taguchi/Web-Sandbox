import { useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login";
import { useAuth } from "../../hooks/useAuth";
import { useInternalApi } from "../../hooks/useInternalApi";

const AuthContainer: React.FC = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { setJwtCsrf } = useAuth();
  const { _post } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  // 認証系の処理を書く
  const handleLogin = handleSubmit((data) =>
    _post("/auth/login", data).then((response: any) => {
      if (response[0] === "failure") {
        // TODO:失敗時のスナックバー表示など
        toast({
          title: "ログインに失敗しました",
          position: "top",
          status: "error",
          isClosable: true,
        });
        console.log("ログインに失敗しました");
      } else {
        setJwtCsrf(response[1].accessCsrf);
        localStorage.setItem("accessCsrf", response[1].accessCsrf);
        toast({
          title: "ログインしました",
          position: "top",
          status: "success",
          isClosable: true,
        });
        // TODO:遷移先の変更
        navigate("/test");
      }
    })
  );

  const handleJWTTest = () =>
    _post("/auth")
      .then((response: any) => {
        console.log(response);
      })
      .catch(() => {
        navigate("/login");
      });

  const props = { handleLogin, handleJWTTest };

  return (
    <>
      <FormProvider {...methods}>
        <Login {...props} />
      </FormProvider>
    </>
  );
};

export default AuthContainer;
