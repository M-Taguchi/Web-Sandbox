import Login from "../../components/login";
import { useForm, FormProvider } from "react-hook-form";
import { _post } from "../../common/internalApi";
import { AuthContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const { jwtCsrf } = useContext<any>(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // HACK: 上手くいっているか不明なので要検討
  useEffect(() => {
    const jwtCheck = () =>
      _post("http://localhost:5000/api/auth", {}, { "X-CSRF-TOKEN": jwtCsrf })
        .then((response: any) => {
          console.log(response);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          navigate("/login");
        });
    jwtCheck();
  }, []);

  // TODO: Loadingの画面を検討
  if (isLoading) return <></>;

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
