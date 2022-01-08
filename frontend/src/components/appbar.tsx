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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

type AppbarProps = {};

const Appbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box p={4}>
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
                    <SearchIcon />
                  </InputLeftElement>
                  <Input placeholder="検索" mb={2} />
                </InputGroup>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"100%"}
                  h={12}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  ホーム
                </Link>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"100%"}
                  h={12}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  どっか
                </Link>
                <Link
                  display={"Flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  w={"100%"}
                  h={12}
                  _hover={{ bg: "gray.100" }}
                  as={ReactRouterLink}
                  to="/test"
                >
                  異次元
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
