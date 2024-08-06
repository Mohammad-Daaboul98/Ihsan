// components/DownloadButton.js

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
      const fileData = await getFromIndexedDB(filename);
      if (fileData && fileData.data) {
        const blob = new Blob([new Uint8Array(fileData.data)], {
          type: "application/octet-stream",
        });
        saveAs(blob, `${filename}-${date}.xlsx`);
      } else {
        toast.error("لايوجد ملف جاهز للتنزيل", { theme: "colored" });
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <Box
      onClick={handleDownload}
    >{filename}</Box>
  );
};

export default DownloadButton;
