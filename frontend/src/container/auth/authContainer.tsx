import Login from "../../components/login";
import { useForm, FormProvider } from "react-hook-form";
import { _post } from "../../common/internalApi";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContainer: React.FC = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  const { jwtCsrf, setJwtCsrf } = useContext<any>(AuthContext);
  const navigate = useNavigate();

  // 認証系の処理を書く
  const handleLogin = handleSubmit((data) =>
    _post("http://localhost:5000/api/auth/login", data).then(
      (response: any) => {
        if (response[0] === "failure") {
          // TODO:失敗時のスナックバー表示など
          console.log("ログインに失敗しました");
        } else {
          setJwtCsrf(response[1].accessCsrf);
          localStorage.setItem("accessCsrf", response[1].accessCsrf);
          // TODO:遷移先の変更
          navigate("/test");
        }
      }
    )
  );

  const handleJWTTest = () =>
    _post(
      "http://localhost:5000/api/auth",
      {},
      { "X-CSRF-TOKEN": jwtCsrf }
    ).then((response: any) => {
      console.log(response);
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
