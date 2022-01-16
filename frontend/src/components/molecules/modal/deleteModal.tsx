import {
  Button,
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Icon from "../../atoms/Icon";
import { ReactElement } from "react";
import { MdClose } from "react-icons/md";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  header?: string;
  content: ReactElement;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  header,
  content,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH={60}>
          <ModalHeader display={"flex"} justifyContent={"space-between"} p={4}>
            {header}
            <CloseButton onClick={onClose}>
              <Icon icon={MdClose} />
            </CloseButton>
          </ModalHeader>

          <ModalBody pt={0} pb={0}>
            {content}
          </ModalBody>

          <ModalFooter display={"flex"} justifyContent={"space-between"} p={4}>
            <Button colorScheme={"red"} onClick={onSubmit}>
              削除
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
