import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useInternalApi } from "../../hooks/useInternalApi";
import AppbarContainer from "../appbarContainer";

const PrivateRoute: React.FC = () => {
  const { _post } = useInternalApi();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // HACK: 上手くいっているか不明なので要検討
  useEffect(() => {
    const jwtCheck = () =>
      _post("/auth")
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
      <AppbarContainer />
      {/* Appbarのサイズ分コンテンツを下に */}
      <Box pt={20}>
        <Outlet />
      </Box>
    </>
  );
};

export default PrivateRoute;
