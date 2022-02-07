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
  title?: string;
  cards?: Array<CardProps>;
  categoryId: number;
  handlers: {
    handleCreateCard: () => void;
    handleDeleteCard: (cardId: number) => void;
    handleDeleteCategory: (categoryId: number) => void;
  };
};

const Board: React.FC<BoardProps> = ({
  title,
  cards,
  categoryId,
  handlers,
  ...props
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const onOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const onOpenCreateModal = () => setIsOpenCreateModal(true);
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);
  const onCloseCreateModal = () => setIsOpenCreateModal(false);

  const { handleCreateCard, handleDeleteCard, handleDeleteCategory } = handlers;

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
          <Heading w={"100%"} pl={2}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text>{title}</Text>
              <CloseButton onClick={onOpenDeleteModal}>
                <Icon icon={MdClose} />
              </CloseButton>
            </Flex>
            {isOpenDeleteModal && (
              <DeleteModal
                header={"ボードの削除"}
                content={
                  <Text>
                    選択されたボードを削除します。
                    <br />
                    削除されたボードは復元できません。
                    <br />
                    本当によろしいですか？
                  </Text>
                }
                isOpen={isOpenDeleteModal}
                onClose={onCloseDeleteModal}
                onSubmit={() => {
                  {
                    handleDeleteCategory(categoryId);
                    onCloseDeleteModal();
                    reset();
                  }
                }}
              />
            )}
          </Heading>
          {cards &&
            cards.map((card: CardProps, index: number) => {
              return (
                <Card
                  key={index}
                  header={card.cardTitle}
                  content={card.cardContent}
                  handleDeleteCard={() => handleDeleteCard(card.cardId)}
                />
              );
            })}
          <Button
            colorScheme={"teal"}
            leftIcon={<Icon icon={MdAdd} />}
            onClick={onOpenCreateModal}
          >
            新規追加
          </Button>
          {isOpenCreateModal && (
            <CreateModal
              header={"カードの作成"}
              content={
                <>
                  <FormTextField name={"cardTitle"} label={"タイトル"} />
                  <FormTextField
                    name={"cardContent"}
                    label={"内容"}
                    multiple={true}
                  />
                  <input
                    type="hidden"
                    {...register("categoryId", { value: categoryId })}
                  />
                </>
              }
              isOpen={isOpenCreateModal}
              onClose={() => {
                onCloseCreateModal();
                reset();
              }}
              onSubmit={() => {
                handleCreateCard();
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

export default Board;
