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
};

const Board: React.FC<BoardProps> = ({ title, cards }) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const onOpenDeleteModal = () => setIsOpenDeleteModal(true);
  const onOpenCreateModal = () => setIsOpenCreateModal(true);
  const onCloseDeleteModal = () => setIsOpenDeleteModal(false);
  const onCloseCreateModal = () => setIsOpenCreateModal(false);

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
                onSubmit={() => alert("削除！")}
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
              header={"ボードの作成"}
              content={
                <>
                  <FormTextField name={"header"} label={"ヘッダー"} />
                  <FormTextField
                    name={"content"}
                    label={"内容"}
                    multiple={true}
                  />
                </>
              }
              isOpen={isOpenCreateModal}
              onClose={onCloseCreateModal}
              onSubmit={() => alert("作成！")}
            />
          )}
        </VStack>
      </Box>
    </>
  );
};

export default Board;
