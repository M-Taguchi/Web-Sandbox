import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

type AppbarProps = {
};

const Appbar: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button colorScheme="teal" onClick={() => {
          onOpen();
          setIsOpen(true);
        }}>
        <HamburgerIcon/>
      </Button>
      {/* TODO: アンマウント時のアニメーション追加 */}
      {isOpen && 
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={() => {
            onClose();
            setIsOpen(false);
          }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={() => {
            onClose();
            setIsOpen(false);
          }}/>
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      }
    </Box>
  );
};

export default Appbar;
