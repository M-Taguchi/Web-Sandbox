import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { User } from "../types/user";

type TestProps = {
  user: User;
  handleJwtTest: () => void;
};

const Test: React.FC<TestProps> = ({ user, handleJwtTest }) => {
  return (
    <Box textAlign="center">
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <p>Hello, React!</p>
          <p>{user.userName}さん、こんにちは</p>
          <p>IDは{user.id}です</p>
          <Button mt={4} colorScheme="red" onClick={handleJwtTest}>
            JWTテスト
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Test;
