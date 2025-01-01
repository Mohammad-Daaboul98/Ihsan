import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Scanner from "react-qr-barcode-scanner";
import ModalComponent from "./ModalComponent";

const QrReaderComponent = () => {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    if (scanResult) {
      const btnElement = document.getElementById("checkAttend");
      if (btnElement) {
        btnElement.click();
      } else {
        console.error("Form with ID 'checkAttend' not found.");
      }
    }
  }, [scanResult]);

  const handleScan = (result) => {
    if (result) {      
      setScanResult(result?.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <>
      <Button
        colorScheme="green"
        size="lg"
        w={{ base: "48%", lg: "auto", md: "auto", sm: "48%" }}
        onClick={() => {
          setIsModalOpen(true);
          setShowScanner((prev) => !prev);
        }}
      >
        تصوير الباركود
      </Button>

      {showScanner && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => {
            setShowScanner(false);
            setIsModalOpen(false);
          }}
          components={
            <Scanner
              onUpdate={(err, result) => {
                if (result) {
                  handleScan(result);
                } else if (err) {
                  handleError(err);
                }
              }}
              style={{ width: "100%" }}
            />
          }
        />
      )}

      {scanResult && (
        <>
          <Input type="hidden" name="status" value="موجود" />
          <Input type="hidden" name="studentId" value={scanResult} />
        </>
      )}
    </>
  );
};

export default QrReaderComponent;
