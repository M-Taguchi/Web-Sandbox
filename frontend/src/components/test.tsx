import { Box, Grid, VStack } from "@chakra-ui/react";
import { User} from "../types/user";

type TestProps = {
  user: User;
};

const Test: React.FC<TestProps> = ({
  user
}) => {
  return (
    <Box textAlign="center"> 
      <Grid minH="100vh" p={3}>
        <VStack spacing={8}>
          <p>Hello, React!</p>
          <p>{user.name}さん、こんにちは</p>
          <p>IDは{user.id}です</p>
        </VStack>
      </Grid>
    </Box>
  )
};

export default Test;