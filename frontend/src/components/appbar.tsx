import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Stack,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MdHome, MdSearch } from "react-icons/md";

type AppbarProps = {};

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box p={4} bg="teal.300">
      <Button
        colorScheme="teal"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <HamburgerIcon />
      </Button>
      {/* TODO: アンマウント時のアニメーション追加 */}
      {isOpen && (
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              メニュー
              <DrawerCloseButton
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </DrawerHeader>

            <DrawerBody>
              <Flex
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                textAlign={"center"}
                gap={1}
              >
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={MdSearch} w={6} h={6} />
                  </InputLeftElement>
                  <Input placeholder="検索" mb={2} />
                </InputGroup>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  w={"100%"}
                  pl={1}
                  h={12}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  <Flex gap={3}>
                    <Icon as={MdHome} w={6} h={6} />
                    <Text>ホーム</Text>
                  </Flex>
                </Link>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  w={"100%"}
                  h={12}
                  pl={1}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  <Flex gap={3}>
                    <Icon as={MdHome} w={6} h={6} />
                    <Text>どっか</Text>
                  </Flex>
                </Link>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  w={"100%"}
                  h={12}
                  pl={1}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  <Flex gap={3}>
                    <Icon as={MdHome} w={6} h={6} />
                    <Text>異次元</Text>
                  </Flex>
                </Link>
              </Flex>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Appbar;
