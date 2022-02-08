import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../../hooks/useInternalApi";
import { Flex, HStack, useToast } from "@chakra-ui/react";
import Board from "../../components/organisms/board";
import { useForm, FormProvider } from "react-hook-form";
import Kanban from "../../components/pages/kanban";
import { useEffect, useState } from "react";
import { CardResponse } from "../../types/card";
import axios from "axios";
import { url } from "inspector";
import { mutate } from "swr";

const KanbanContainer: React.FC = () => {
  const methods = useForm();
  const { _post, _get, _delete } = useInternalApi();
  const { handleSubmit } = methods;
  const navigate = useNavigate();
  const toast = useToast({ position: "top", isClosable: true });

  const { data, fetch } = _get("/kanban/");

  const [categorys, setCategorys] = useState(data.kanban);

  useEffect(() => {
    setCategorys(data.kanban);
  }, [data]);

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
          status: "success",
        });

        fetch();
      })
      .catch(() => {
        toast({
          title: "カード作成に失敗しました",
          status: "error",
        });
      });
  });

  const handleDeleteCard = (cardId: number) => {
    _delete(`/cards/${cardId}`)
      .then((response: any) => {
        toast({
          title: "カードを削除しました",
          status: "success",
        });

        fetch();
      })
      .catch(() => {
        toast({
          title: "カード削除に失敗しました",
          status: "error",
        });
      });
  };

  const handleDeleteCategory = (categoryId: number) => {
    _delete(`/categorys/${categoryId}`)
      .then((response: any) => {
        toast({
          title: "ボードを削除しました",
          status: "success",
        });

        fetch();
      })
      .catch(() => {
        toast({
          title: "ボード削除に失敗しました",
          status: "error",
        });
      });
  };

  const handleCreateCategory = handleSubmit((data) => {
    const request = {
      category: {
        ...data,
      },
    };
    _post("/categorys", request)
      .then((response: any) => {
        toast({
          title: "ボードを作成しました",
          status: "success",
        });

        fetch();
      })
      .catch(() => {
        toast({
          title: "ボード作成に失敗しました",
          status: "error",
        });
      });
  });

  const props = {
    categorys,
    handlers: {
      handleCreateCard,
      handleDeleteCard,
      handleDeleteCategory,
      handleCreateCategory,
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
