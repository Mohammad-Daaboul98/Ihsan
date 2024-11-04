<<<<<<< HEAD
import { Tooltip, IconButton } from "@chakra-ui/react";
import { BiLogoWhatsapp } from "react-icons/bi";
import whatsAppMessage from "../utils/whatsAppMessage";

const QRCodeComponent = ({ qrCode, list, phoneNumber }) => {
  
  return (
    <Tooltip label="ارسل عن طريق الوتس اب" placement="top">
      <IconButton
        width="100%"
        icon={<BiLogoWhatsapp />}
        onClick={() => whatsAppMessage(list[qrCode], list[phoneNumber])}
        aria-label="ارسل عن طريق الوتس اب"
        // size="lg"
        // colorScheme="whatsapp"
        variant="solid"
      />
    </Tooltip>
=======
import { useEffect, useState } from "react";
import QRCode from "qrcode"; // Import QRCode for generating QR code data
import {
  ModalOverlay,
  Tooltip,
  IconButton,
  useDisclosure,
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";
import { BiLogoWhatsapp } from "react-icons/bi";
import ModalComponent from "./ModalComponent";
import { FaQrcode } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const QRCodeComponent = ({ list, id, numberPhone, name }) => {
  const [qrCodeImage, setQrCodeImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
  const CLOUD_PRESET = import.meta.env.VITE_CLOUD_PRESET;

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = await QRCode.toDataURL(list[id] || "Default QR Code Text");
        setQrCodeImage(url);
      } catch (err) {
        console.error(err);
      }
    };

    generateQRCode();
  }, [list, id]);

  const uploadToCloudinary = async (imageData) => {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append("upload_preset", CLOUD_PRESET); // Add upload preset

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`; // Correct URL for Cloudinary upload

    const response = await axios.post(cloudinaryUrl, formData);
    if (response.data.secure_url) {
      return response.data.secure_url; // This URL can be shared or used directly
    } else {
      throw new Error("Upload failed");
    }
  };

  const { mutateAsync: uploadImage, isLoading: isUploading } = useMutation(uploadToCloudinary);

  const shareWhatsApp = async () => {
    const imageUrl = await uploadImage(qrCodeImage); // Pass the QR code image data
    const encodedText = encodeURIComponent(
      `هن الباركود لـ ${list[name]}:\nافتح هذا الرابط لعرض صورة الباركود:\n${imageUrl}`
    );
    window.open(
      `https://wa.me/${list[numberPhone]}?text=${encodedText}`,
      "_blank"
    );
  };

  return (
    <Box style={{ display: "flex", alignItems: "center" }}>
      <IconButton icon={<FaQrcode />} cursor="pointer" onClick={onOpen} />

      {/* Modal for QR Code and sharing options */}
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        overlay={<ModalOverlay />}
        components={
          <Box style={{ padding: "20px", textAlign: "center" }}>
            <Heading as="h3" fontSize="md" mb="10px">
              {list[name]}
            </Heading>
            <Image
              src={qrCodeImage}
              alt="QR Code"
              width="150"
              height="150"
              mb="20px"
            />
            <Box mt="20px">
              <Tooltip label="Share via WhatsApp" placement="top">
                <IconButton
                width='100%'
                  icon={<BiLogoWhatsapp />}
                  onClick={shareWhatsApp}
                  aria-label="Share via WhatsApp"
                  size="lg"
                  colorScheme="whatsapp"
                  variant="solid"
                  isLoading={isUploading} // Show loading spinner
                />
              </Tooltip>
            </Box>
          </Box>
        }
      />
    </Box>
>>>>>>> aa62fc11054e580abf1ec47e4d8c195381bcc35e
  );
};

export default QRCodeComponent;
