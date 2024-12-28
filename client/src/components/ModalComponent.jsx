import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const ModalComponent = ({ isOpen, onClose, title, overlay, components }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
      {overlay}
      <ModalOverlay />
      <ModalContent h='300px' w='450px'>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px 20px"
          // h="100%"
          // w="100%"
        >
          {components}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
