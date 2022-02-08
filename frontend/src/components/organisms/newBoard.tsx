import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Heading,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { MdAdd, MdClose } from "react-icons/md";
import { CardProps } from "../../types/card";
import Card from "../atoms/Card";
import FormTextField from "../atoms/FormTextField";
import Icon from "../atoms/Icon";
import CreateModal from "../molecules/modal/createModal";
import DeleteModal from "../molecules/modal/deleteModal";

type BoardProps = {
  handlers: {
    handleCreateCategory: () => void;
  };
};

const NewBoard: React.FC<BoardProps> = ({ handlers, ...props }) => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const onOpenCreateModal = () => setIsOpenCreateModal(true);
  const onCloseCreateModal = () => setIsOpenCreateModal(false);

  const { handleCreateCategory } = handlers;

  const { register, reset } = useFormContext();

  return (
    <>
      {/* ボード */}
      <Box
        m={4}
        p={2}
        w={60}
        h={"100%"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <VStack spacing={2}>
          <Button
            colorScheme={"teal"}
            leftIcon={<Icon icon={MdAdd} />}
            onClick={onOpenCreateModal}
          >
            新規追加
          </Button>
          {isOpenCreateModal && (
            <CreateModal
              header={"ボードの作成"}
              content={
                <>
                  <FormTextField name={"categoryName"} label={"タイトル"} />
                </>
              }
              isOpen={isOpenCreateModal}
              onClose={() => {
                onCloseCreateModal();
                reset();
              }}
              onSubmit={() => {
                handleCreateCategory();
                onCloseCreateModal();
                reset();
              }}
            />
          )}
        </VStack>
      </Box>
    </>
  );
};

export default NewBoard;
