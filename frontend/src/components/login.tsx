import { useState } from "react";
import {
  Box,
  Grid,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Container,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormContext } from "react-hook-form";

type LoginProps = {
  handleLogin: () => void;
  handleJWTTest: () => void;
};

const Test: React.FC<LoginProps> = ({ handleLogin, handleJWTTest }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    formState: { errors, isSubmitting },
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
              <FormControl isInvalid={errors.userName}>
                <FormLabel htmlFor="userName">ユーザー名</FormLabel>
                <Input
                  {...register("userName", {
                    maxLength: { value: 20, message: "上限は20文字です" },
                  })}
                  placeholder="ユーザー名"
                />
                {errors.userName ? (
                  <FormErrorMessage mb={2}>
                    {errors.userName.message}
                  </FormErrorMessage>
                ) : (
                  <Box h={"21px"} mt={2} mb={2}></Box>
                )}
              </FormControl>
              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">パスワード</FormLabel>
                <InputGroup>
                  <Input
                    {...register("password", {
                      maxLength: { value: 20, message: "上限は20文字です" },
                    })}
                    placeholder="パスワード"
                    type={show ? "text" : "password"}
                  />
                  <InputRightElement>
                    <Button onClick={handleClick}>
                      {show ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password ? (
                  <FormErrorMessage mb={2}>
                    {errors.password.message}
                  </FormErrorMessage>
                ) : (
                  <Box h={"21px"} mt={2} mb={2}></Box>
                )}
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                ログイン
              </Button>
              <Button mt={4} colorScheme="red" onClick={handleJWTTest}>
                JWTテスト
              </Button>
            </form>
          </Stack>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Test;
