import { Box, Text, Stack, Flex, CloseButton } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import Icon from "./Icon";

type CardProps = {
  header?: string;
  content: string;
  handleDeleteCard: () => void;
};

const Card: React.FC<CardProps> = ({ header, content, handleDeleteCard }) => {
  return (
    <>
      {/* カード */}
      <Stack w={"100%"} borderWidth="1px" borderRadius="lg" p={3}>
        {/* ヘッダー */}
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Text fontWeight="bold" fontSize="lg" color="teal.600">
            {header}
          </Text>
          <CloseButton onClick={() => handleDeleteCard()}>
            <Icon icon={MdClose} />
          </CloseButton>
        </Flex>
        {/* 内容 */}
        <Box>
          <Text>{content}</Text>
        </Box>
      </Stack>
    </>
  );
};

export default Card;
