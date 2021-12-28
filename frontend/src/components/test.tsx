import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { User } from "../types/user";

type TestProps = {
  user: User;
  handleJwtTest: () => void;
  handleLogout: () => void;
};

const Test: React.FC<TestProps> = ({ user, handleJwtTest, handleLogout }) => {
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
          <Button mt={4} colorScheme="blue" onClick={handleLogout}>
            ログアウト
          </Button>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Test;
