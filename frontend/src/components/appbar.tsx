import {
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  Flex,
  InputGroup,
  InputLeftElement,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { MdClose, MdHome, MdLogout, MdMenu, MdSearch } from "react-icons/md";
import Icon from "./atoms/Icon";

type AppbarProps = {
  handleLogout: () => void;
};

const Appbar: React.FC<AppbarProps> = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
      h={20}
      bg="teal.300"
      w={"100vw"}
      position={"fixed"}
    >
      <Button
        colorScheme="teal"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Icon icon={MdMenu} />
      </Button>
      {/* メニュー */}
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
            <DrawerHeader display={"flex"} justifyContent={"right"} p={2}>
              <CloseButton
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <Icon icon={MdClose} />
              </CloseButton>
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
                    <Icon icon={MdSearch} />
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
                  to="/"
                >
                  <Flex gap={3}>
                    <Icon icon={MdHome} />
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
                  to="/"
                >
                  <Flex gap={3}>
                    <Icon icon={MdHome} />
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
                  to="/"
                >
                  <Flex gap={3}>
                    <Icon icon={MdHome} />
                    <Text>異次元</Text>
                  </Flex>
                </Link>
              </Flex>
            </DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      <Button
        leftIcon={<Icon icon={MdLogout} />}
        colorScheme="blue"
        onClick={handleLogout}
      >
        ログアウト
      </Button>
    </Flex>
  );
};

export default Appbar;
