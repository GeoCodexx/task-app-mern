import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalConfirmation = ({
  isOpen,
  onClose,
  message,
  idItem,
  deleteFunction,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = () => {
    setIsSubmitting(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        deleteFunction(idItem);
        setIsSubmitting(false);
        resolve();
      }, 1200);
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{message}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleClick}
              isLoading={isSubmitting}
            >
              Si
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalConfirmation;
