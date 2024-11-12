import { Tooltip, IconButton } from "@chakra-ui/react";
import { BiLogoWhatsapp } from "react-icons/bi";
import whatsAppMessage from "../utils/whatsAppMessage";

const QRCodeComponent = ({ qrCode, list, phoneNumber }) => {  
  return (
    <Tooltip label="ارسل عن طريق الوتس اب" placement="top">
      <IconButton
        width="100%"
        icon={<BiLogoWhatsapp />}
        onClick={() => whatsAppMessage(list[phoneNumber], list[qrCode])}
        aria-label="ارسل عن طريق الوتس اب"
        // size="lg"
        // colorScheme="whatsapp"
        variant="solid"
      />
    </Tooltip>
  );
};

export default QRCodeComponent;
