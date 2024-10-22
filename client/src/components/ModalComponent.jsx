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
    <Modal onClose={onClose} isOpen={isOpen} size="full" isCentered>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody
        display='flex'
        justifyContent='center'
        alignItems='center'
        >
          {components}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
