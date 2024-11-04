import cloudinary from "cloudinary";
import QRCode from "qrcode";
import { formatImage } from "../middleware/multerMiddleware.js";

const qrCodeGenerator = async (id, data) => {
  const qrCode = await QRCode.toDataURL(id.toString());

  if (qrCode) {
    const file = formatImage(qrCode);
    const response = await cloudinary.v2.uploader.upload(
      `data:image/png;base64,${file.content.toString("base64")}`
    );
    data.qrCode = response.secure_url;
    data.qrCodePublicId = response.public_id;
  }
};

export default qrCodeGenerator;
