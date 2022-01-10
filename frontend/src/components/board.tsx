import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Heading,
  CloseButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { User } from "../types/user";
import Card from "./atoms/Card";
import FormTextField from "./atoms/FormTextField";
import Icon from "./atoms/Icon";

type BoardProps = {
  user: User;
  handleJwtTest: () => void;
};

const Board: React.FC = () => {
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
              <Text>Todo</Text>
              <CloseButton variant={"ghost"} onClick={onOpenDeleteModal}>
                <Icon icon={MdClose} />
              </CloseButton>
            </Flex>
            {isOpenDeleteModal && (
              <>
                {/* 削除モーダル */}
                {/* TODO: コンポーネント切り出し */}
                <Modal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal}>
                  <ModalOverlay />
                  <ModalContent minH={60}>
                    <ModalHeader
                      display={"flex"}
                      justifyContent={"space-between"}
                      p={4}
                    >
                      ボードの削除
                      <CloseButton onClick={onCloseDeleteModal}>
                        <Icon icon={MdClose} />
                      </CloseButton>
                    </ModalHeader>

                    <ModalBody pt={0} pb={0}>
                      <Text>
                        選択されたボードを削除します。
                        <br />
                        削除されたボードは復元できません。
                        <br />
                        本当によろしいですか？
                      </Text>
                    </ModalBody>

                    <ModalFooter
                      display={"flex"}
                      justifyContent={"space-between"}
                      p={4}
                    >
                      <Button colorScheme={"red"}>削除</Button>
                      <Button onClick={onCloseDeleteModal}>キャンセル</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
            )}
          </Heading>
          <Card
            header={"テストヘッダー"}
            content={
              "テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1"
            }
          />
          <Card header={"テストヘッダー2"} content={"テストテスト"} />
          <Button
            colorScheme={"teal"}
            leftIcon={<Icon icon={MdAdd} />}
            onClick={onOpenCreateModal}
          >
            新規追加
          </Button>
          {isOpenCreateModal && (
            <>
              {/* 作成モーダル */}
              {/* TODO: コンポーネント切り出し */}
              <Modal isOpen={isOpenCreateModal} onClose={onCloseCreateModal}>
                <form onSubmit={() => alert("submit!")}>
                  <ModalOverlay />
                  <ModalContent minH={60}>
                    <ModalHeader
                      display={"flex"}
                      justifyContent={"space-between"}
                      p={4}
                    >
                      ボードの作成
                      <CloseButton onClick={onCloseCreateModal}>
                        <Icon icon={MdClose} />
                      </CloseButton>
                    </ModalHeader>

                    <ModalBody pt={0} pb={0}>
                      <FormTextField name={"header"} label={"ヘッダー"} />
                      <FormTextField
                        name={"content"}
                        label={"内容"}
                        multiple={true}
                      />
                    </ModalBody>

                    <ModalFooter
                      display={"flex"}
                      justifyContent={"space-between"}
                      p={4}
                    >
                      <Button colorScheme={"teal"} type={"submit"}>
                        作成
                      </Button>
                      <Button onClick={onCloseCreateModal}>キャンセル</Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>
            </>
          )}
        </VStack>
      </Box>
    </>
  );
};

export default Board;
