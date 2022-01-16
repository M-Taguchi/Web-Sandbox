import Test from "../components/test";
import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../hooks/useInternalApi";
import { Flex, HStack, useToast } from "@chakra-ui/react";
import Board from "../components/organisms/board";
import { useForm, FormProvider } from "react-hook-form";

const TestContainer: React.FC = () => {
  const methods = useForm();
  const { _post, _get } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  const response: any = _get("/users/1").read();

  const handleJwtTest = () =>
    _post("/auth")
      .then((response: any) => {
        console.log(response);
      })
      .catch(() => {
        navigate("/login");
      });

  const user = response[1].user;

  const props = {
    user,
    handleJwtTest,
  };

  return (
    <>
      {/* <Test {...props} /> */}
      <FormProvider {...methods}>
        <Flex>
          <Board />
          <Board />
        </Flex>
      </FormProvider>
    </>
  );
};

export default TestContainer;
