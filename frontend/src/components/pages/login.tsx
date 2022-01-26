import { Box, Button, Heading, Flex, Stack } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import FormTextField from "../atoms/FormTextField";
import FormPasswordField from "../atoms/FormPasswordField";

type LoginProps = {
  handleLogin: () => void;
};

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Flex h="100vh" w="100%" bg={"gray.200"} textAlign={"center"}>
      <Box
        w={"50%"}
        h="50vh"
        pt={10}
        margin={"auto"}
        bg={"white"}
        minW={"600px"}
        maxW={"600px"}
        minH={"480px"}
        maxH={"480px"}
      >
        <Flex p={8} gap={10} direction={"column"}>
          <Heading textAlign="center">ユーザーログイン</Heading>
          <Stack justifyContent="center" spacing={8}>
            <form onSubmit={handleLogin}>
              <FormTextField
                name={"userName"}
                label={"ユーザー名"}
                maxLength={20}
              />
              <FormPasswordField
                name={"password"}
                label={"パスワード"}
                maxLength={20}
              />
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                ログイン
              </Button>
            </form>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
