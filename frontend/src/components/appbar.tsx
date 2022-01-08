import { HamburgerIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useState } from "react";

type AppbarProps = {
};

const Appbar: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <Box p={4}>
      <Button colorScheme="teal" onClick={() => {
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
            setIsOpen(false);
          }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton onClick={() => {
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
