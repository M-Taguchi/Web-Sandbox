import { Box, Text, Stack } from "@chakra-ui/react";

type CardProps = {
  header?: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ header, content }) => {
  return (
    <>
      {/* カード */}
      <Stack w={"100%"} borderWidth="1px" borderRadius="lg" p={3}>
        {/* ヘッダー */}
        {header && (
          <Box>
            <Text fontWeight="bold" fontSize="lg" color="teal.600">
              {header}
            </Text>
          </Box>
        )}
        {/* 内容 */}
        <Box>
          <Text>{content}</Text>
        </Box>
      </Stack>
    </>
  );
};

export default Card;
