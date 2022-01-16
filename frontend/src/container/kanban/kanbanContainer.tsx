import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../../hooks/useInternalApi";
import { Flex, HStack, useToast } from "@chakra-ui/react";
import Board from "../../components/organisms/board";
import { useForm, FormProvider } from "react-hook-form";
import Kanban from "../../components/pages/kanban";

const KanbanContainer: React.FC = () => {
  const methods = useForm();
  const { _post, _get } = useInternalApi();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const toast = useToast();

  const response: any = _get("/kanban/").read();
  const categorys = response[1].kanban;

  const handleCreateCard = handleSubmit((data) => {
    const request = {
      card: {
        ...data,
      },
    };
    _post("/cards", request)
      .then((response: any) => {
        toast({
          title: "カードを作成しました",
          position: "top",
          status: "success",
          isClosable: true,
        });
        // TODO:遷移先の変更
        navigate("/");
        // TODO:表示の更新処理
      })
      .catch(() => {
        toast({
          title: "カード作成に失敗しました",
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  });

  const props = {
    categorys,
    handlers: {
      handleCreateCard,
    },
  };

  return (
    <>
      <FormProvider {...methods}>
        <Kanban {...props} />
      </FormProvider>
    </>
  );
};

export default KanbanContainer;
