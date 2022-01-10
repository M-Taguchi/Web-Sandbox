import {
  Box,
  Button,
  Flex,
  VStack,
  Text,
  Heading,
  CloseButton,
} from "@chakra-ui/react";
import { MdAdd, MdClose } from "react-icons/md";
import { User } from "../types/user";
import Card from "./atoms/Card";
import Icon from "./atoms/Icon";

type BoardProps = {
  user: User;
  handleJwtTest: () => void;
};

const Board: React.FC = () => {
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
              <CloseButton variant={"ghost"}>
                <Icon icon={MdClose} />
              </CloseButton>
            </Flex>
          </Heading>
          <Card
            header={"テストヘッダー"}
            content={
              "テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1テスト内容1"
            }
          />
          <Card header={"テストヘッダー2"} content={"テストテスト"} />
          <Button colorScheme={"teal"} leftIcon={<Icon icon={MdAdd} />}>
            新規追加
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default Board;
