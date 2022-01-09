import {
  Box,
  Button,
  Flex,
  Grid,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { User } from "../types/user";

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
        minW={60}
        h={"100%"}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <VStack spacing={2}>
          <Heading>Todo</Heading>
          {/* カード */}
          <Flex
            w={"100%"}
            direction={"column"}
            borderWidth="1px"
            borderRadius="lg"
            p={3}
          >
            {/* ヘッダー */}
            <Box>
              <Text>テストヘッダー</Text>
            </Box>
            {/* 内容 */}
            <Box>
              <Text>テスト内容1</Text>
              <Text>テスト内容1</Text>
              <Text>テスト内容1</Text>
            </Box>
          </Flex>
          {/* カード */}
          <Flex
            w={"100%"}
            direction={"column"}
            borderWidth="1px"
            borderRadius="lg"
            p={3}
          >
            {/* ヘッダー */}
            <Box>
              <Text>テストヘッダー</Text>
            </Box>
            {/* 内容 */}
            <Box>
              <Text>テスト内容2</Text>
              <Text>テスト内容2</Text>
            </Box>
          </Flex>
          {/* カード */}
          <Flex
            w={"100%"}
            direction={"column"}
            borderWidth="1px"
            borderRadius="lg"
            p={3}
          >
            {/* ヘッダー */}
            <Box>
              <Text>テストヘッダー</Text>
            </Box>
            {/* 内容 */}
            <Box>
              <Text>テスト内容3</Text>
            </Box>
          </Flex>
        </VStack>
      </Box>
    </>
  );
};

export default Board;
