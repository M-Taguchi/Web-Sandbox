import { useNavigate } from "react-router-dom";
import { useInternalApi } from "../hooks/useInternalApi";
import { Flex, HStack, useToast } from "@chakra-ui/react";
import Board from "../components/board";
import { useForm, FormProvider } from "react-hook-form";
import Kanban from "../components/kanban";

const KanbanContainer: React.FC = () => {
  const methods = useForm();
  const { _post, _get } = useInternalApi();
  const navigate = useNavigate();
  const toast = useToast();

  const response: any = _get("/categorys").read();
  const categorys = response[1].categorys;

  const props = {
    categorys,
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
