import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../../hooks/useInternalApi";
import { Flex, HStack, useToast } from "@chakra-ui/react";
import Board from "../../components/organisms/board";
import { useForm, FormProvider } from "react-hook-form";
import Kanban from "../../components/pages/kanban";
import { useEffect, useState } from "react";
import { CardResponse } from "../../types/card";

const KanbanContainer: React.FC = () => {
  const methods = useForm();
  const { _post, _get, _delete } = useInternalApi();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const toast = useToast();

  const [categorys, setCategorys] = useState(_get("/kanban/").read()[1].kanban);

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

        let update = [...categorys];
        update[response[1].card.categoryId - 1].cards.push(response[1].card);
        setCategorys(update);
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

  const handleDeleteCard = (cardId: number) => {
    console.log(cardId);
    _delete(`/cards/${cardId}`)
      .then((response: any) => {
        toast({
          title: "カードを削除しました",
          position: "top",
          status: "success",
          isClosable: true,
        });

        // let update = [...categorys];
        // update[response[1].card.categoryId - 1].cards.push(response[1].card);
        // setCategorys(update);
      })
      .catch(() => {
        toast({
          title: "カード削除に失敗しました",
          position: "top",
          status: "error",
          isClosable: true,
        });
      });
  };

  const props = {
    categorys,
    handlers: {
      handleCreateCard,
      handleDeleteCard,
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
