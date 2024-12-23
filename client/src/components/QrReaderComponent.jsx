import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";
import ModalComponent from "./ModalComponent";

const QrReaderComponent = () => {
  const [scanResult, setScanResult] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        const backCamera = videoDevices.find((device) =>
          device.label.toLowerCase().includes("back")
        );
        setSelectedDeviceId(backCamera?.deviceId || videoDevices[0]?.deviceId);
      })
      .catch((error) => console.error("Error accessing media devices:", error));
  }, []);

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

  const handleScan = (data) => {
    if (data?.text) {
      try {
        setScanResult(data?.text);
        setShowScanner(false);
      } catch (error) {
        console.error("Invalid QR code format:", error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
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

      {showScanner && selectedDeviceId && (
        <ModalComponent
          isOpen={isModalOpen}
          onClose={() => {
            setShowScanner((prev) => !prev);
            setIsModalOpen(false);
          }}
          components={
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
              constraints={{
                video: { deviceId: selectedDeviceId },
              }}
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
