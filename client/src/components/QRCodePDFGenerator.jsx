import React from "react";
import { Button } from "@chakra-ui/react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

const QRCodePDFGenerator = ({ list, id, name }) => {
  const generatePDF = async () => {
    const doc = new jsPDF();

    const createQRCode = (value) => {
      return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        QRCode.toCanvas(
          canvas,
          value,
          { errorCorrectionLevel: "H" },
          (error) => {
            if (error) {
              console.error(error);
              resolve(null);
            } else {
              resolve(canvas.toDataURL("image/png"));
            }
          }
        );
      });
    };

    const generateAllQRs = async () => {
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        const imgData = await createQRCode(item[id]);

        if (index !== 0) doc.addPage();

        // Create a temporary div for rendering Arabic text
        const hiddenDiv = document.createElement("div");
        hiddenDiv.style.fontFamily = "Amiri, Arial, sans-serif";
        hiddenDiv.style.fontSize = "16px";
        hiddenDiv.style.direction = "rtl";
        hiddenDiv.style.position = "absolute"; 
        hiddenDiv.style.whiteSpace = "nowrap"; 
        hiddenDiv.style.padding = "5px"; 
        hiddenDiv.style.backgroundColor = "white";
        hiddenDiv.style.color = "#000";
        hiddenDiv.innerText = item[name];

        document.body.appendChild(hiddenDiv);

        // Convert the temporary div to an image
        const canvas = await html2canvas(hiddenDiv, {
          scale: 2,
          backgroundColor: null,
        });
        const arabicTextImg = canvas.toDataURL("image/png");
        document.body.removeChild(hiddenDiv); // Clean up

        // Add Arabic text image to PDF
        doc.addImage(arabicTextImg, "PNG", 10, 20, 20, 20);

        // Add QR code image to the PDF
        if (imgData) {
          doc.addImage(imgData, "PNG", 10, 40, 50, 50);
        }
      }

      // Save the PDF
      doc.save("student_qr_codes.pdf");
    };

    generateAllQRs();
  };

  return <Button onClick={generatePDF}>تنزيل باركود الطلاب</Button>;
};

export default QRCodePDFGenerator;
