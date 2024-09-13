import React from "react";
import { getFromIndexedDB } from "../utils/indexedDBUtils";
import { saveAs } from "file-saver";
import day from "dayjs";
import { Box } from "@chakra-ui/react";
import { toast } from "react-toastify";

const DownloadButton = ({ filename }) => {
  const date = day(new Date()).format("MMM Do, YYYY");

  const handleDownload = async () => {
    try {
      console.log("Attempting to download file:", filename);
      const fileData = await getFromIndexedDB(filename);
      console.log("Retrieved file data:", fileData);

      if (fileData && fileData.data) {
        const blob = new Blob([new Uint8Array(fileData.data)], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, `${filename}-${date}.xlsx`);
      } else {
        toast.error("ايوجد ملف جاهز للتنزيل", { theme: "colored" });
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Box
      onClick={handleDownload}
      cursor="pointer"
      p={2}
      borderRadius="md"
      textAlign="center"
    >
      {filename}
    </Box>
  );
};

export default DownloadButton;
