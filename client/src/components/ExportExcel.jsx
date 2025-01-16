import { Box, Button, useToast } from "@chakra-ui/react";
import { IoMdDownload } from "react-icons/io";
import * as XLSX from "xlsx";

// ExportExcel component to export the QR Codes
const ExportExcel = ({ data }) => {
  const toast = useToast();

  const handleExport = () => {
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    // Write the file
    XLSX.writeFile(wb, "حضور الطلاب.xlsx");

    // Show a success toast in Arabic
    toast({
      title: "تم تصدير ملف حضور الطلاب",
      description: "تم تصدير حضور الطلاب إلى ملف Excel بنجاح.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button onClick={handleExport} size="md" rounded="md" boxShadow="md">
      <IoMdDownload />
    </Button>
  );
};

export default ExportExcel;
