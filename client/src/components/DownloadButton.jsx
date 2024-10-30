import React from "react";
import { Box } from "@chakra-ui/react";
import { downloadDataFile } from "../utils/excelDBHandler";

const DownloadButton = ({ filename, exclName }) => {
  const handleDownload = () => {
    downloadDataFile(exclName);
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
