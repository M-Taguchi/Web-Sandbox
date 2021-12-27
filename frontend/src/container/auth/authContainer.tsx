import Login from "../../components/login";
import { useForm, FormProvider } from "react-hook-form";
import { _post } from "../../common/internalApi";

const AuthContainer: React.FC = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  // 認証系の処理を書く
  const handleLogin = handleSubmit((data) =>
    _post("http://localhost:5000/api/auth/login", data).then(
      (response: any) => {
        if (response[0] === "failure") {
          // TODO:失敗時のスナックバー表示など
          console.log("ログインに失敗しました");
        } else {
          // TODO:成功時の画面遷移など
          console.log(response[1]);
        }
      }
    )
  );
  const handleJWTTest = () =>
    _post("http://localhost:5000/api/auth", {}).then((response: any) => {
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
