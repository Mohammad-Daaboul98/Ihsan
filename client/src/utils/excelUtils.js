// excelUtils.js
import { getFromIndexedDB, saveToIndexedDB, deleteFromIndexedDB, stringToArrayBuffer } from "./indexedDBUtils";
import * as XLSX from 'xlsx'; // Ensure you have XLSX library installed

export const createOrUpdateExcelFile = async (filename, newData) => {
  try {
    console.log('Creating or updating file:', filename);

    const existingFile = await getFromIndexedDB(filename);
    let workbook;

    // If the file already exists, read the existing data
    if (existingFile) {
      const data = new Uint8Array(existingFile);
      workbook = XLSX.read(data, { type: 'array' });
    } else {
      // Create a new workbook if the file doesn't exist
      workbook = XLSX.utils.book_new();
    }

    const sheetName = 'معلومات';
    let worksheet = workbook.Sheets[sheetName];

    // If the worksheet doesn't exist, create a new one
    if (!worksheet) {
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    // Retrieve existing data from the worksheet
    const existingData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    const updatedData = existingData.concat(newData);

    // Update the worksheet with the new data
    worksheet = XLSX.utils.json_to_sheet(updatedData);
    workbook.Sheets[sheetName] = worksheet;

    // Convert the workbook to binary format
    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const buffer = stringToArrayBuffer(workbookBinary);

    // Uncomment this if you want to delete the existing file before saving
    // await deleteFromIndexedDB(filename);

    // Save the updated file to IndexedDB
    await saveToIndexedDB(filename, buffer);
    console.log('File saved successfully.');
  } catch (error) {
    console.error('Error creating or updating Excel file:', error);
  }
};
