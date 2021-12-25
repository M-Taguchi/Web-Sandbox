import Login from "../../components/login";
import { useForm, FormProvider } from "react-hook-form";

const AuthContainer: React.FC = () => {
  const methods = useForm();
  const { handleSubmit } = methods;
  // 認証系の処理を書く
  const handleLogin = handleSubmit((data) => console.log(data));
  const props = { handleLogin };
  return (
    <>
      <FormProvider {...methods}>
        <Login {...props} />
      </FormProvider>
    </>
  );
};

export default AuthContainer;
