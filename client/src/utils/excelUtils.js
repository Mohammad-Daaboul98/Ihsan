
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Function to handle updating the existing Excel file
export const createOrUpdateExcelFile = (filename, newData) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xlsx, .xls';

  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return; // No file selected, exit function

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Use 'Sheet1' as default, or the first sheet if there's at least one
      const sheetName = workbook.SheetNames.length > 0 ? workbook.SheetNames[0] : 'Sheet1';
      let worksheet = workbook.Sheets[sheetName];

      if (!worksheet) {
        // Create a new worksheet if none exists
        worksheet = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }

      // Read existing data and append new data
      const existingData = XLSX.utils.sheet_to_json(worksheet);
      const updatedData = existingData.concat(newData);

      // Convert updated data to a new worksheet
      const updatedWorksheet = XLSX.utils.json_to_sheet(updatedData);
      
      // Replace the existing worksheet with the updated one
      workbook.Sheets[sheetName] = updatedWorksheet;

      // Write the workbook to a binary string
      const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

      // Convert binary string to ArrayBuffer
      const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      };

      const buffer = s2ab(workbookBinary);

      // Create a Blob from the ArrayBuffer
      const blob = new Blob([buffer], { type: 'application/octet-stream' });

      // Use FileSaver to save the updated file
      saveAs(blob, `${filename}.xlsx`);
    };

    reader.readAsArrayBuffer(file);
  };

  // Trigger the file input dialog
  fileInput.click();
};
