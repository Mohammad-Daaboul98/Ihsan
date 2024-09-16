import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ModalComponent = ({
  isOpen,
  onClose,
  title,
  bodyContent,
  overlay
}) => {
  return (
    <Modal  onClose={onClose} isOpen={isOpen} size={'xl'} isCentered>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{bodyContent}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
