import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

const ModalComponent = ({ isOpen, onClose, title, overlay, components }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="xl" isCentered>
      {overlay}
      <ModalOverlay />
      <ModalContent>
        {title ? (
          <ModalHeader>
            <Text textAlign="center">{title}</Text>
          </ModalHeader>
        ) : null}
        <ModalCloseButton />
        <ModalBody
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="10px 20px"
          py="60px"
        >
          {components}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
