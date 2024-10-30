import { openDB } from "idb";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

// Open or create the IndexedDB database
async function openDatabase() {
  return openDB("SchoolDB", 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("excelFiles")) {
        db.createObjectStore("excelFiles");
      }
    },
  });
}

// Save data to an Excel file and store in IndexedDB
async function saveDataToExcel(fileName, data) {
  const db = await openDatabase();

  // Check if an existing file needs to be updated
  let existingData = await db.get("excelFiles", fileName);
  if (existingData) {
    // Parse the existing data to update it
    const workbook = XLSX.read(existingData, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const existingJsonData = XLSX.utils.sheet_to_json(worksheet);
    existingJsonData.push(data);
    const updatedWorksheet = XLSX.utils.json_to_sheet(existingJsonData);
    workbook.Sheets[workbook.SheetNames[0]] = updatedWorksheet;
    const updatedExcelFile = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    await db.put("excelFiles", updatedExcelFile, fileName);
  } else {
    // Create a new Excel file if it doesn't exist
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelFile = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    await db.put("excelFiles", excelFile, fileName);
  }
}

// Retrieve and download Excel file from IndexedDB
async function downloadExcelFile(fileName) {
  const db = await openDatabase();
  const data = await db.get("excelFiles", fileName);

  if (!data) {
    toast.error("لايوجد ملف للتنزبل");
    return;
  }

  const blob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${fileName}.xlsx`;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// Example function to handle form submission
export async function handleFormSubmit(request, fileName = "students") {
  await saveDataToExcel(fileName, request[0]);
}

// Usage example for patching/updating data dynamically
export async function patchData(data, fileName, oldUserName) {
  const db = await openDatabase();

  // Retrieve existing data to check for existing password
  const existingFile = await db.get("excelFiles", fileName);

  if (existingFile) {
    // Parse the existing file to find the matching record
    const workbook = XLSX.read(existingFile, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Find the index of the record by username
    const userIndex = jsonData.findIndex(
      (record) => record["اسم المستخدم"] === oldUserName
    );

    if (userIndex !== -1) {
      // Retrieve the existing record
      const userRecord = jsonData[userIndex];

      // Update the fields dynamically based on provided data
      for (const key in data[0]) {
        if (data[0][key]) {
          userRecord[key] = data[0][key];
        }
      }

      // Save the updated data back to the Excel file
      const updatedWorksheet = XLSX.utils.json_to_sheet(jsonData);
      workbook.Sheets[workbook.SheetNames[0]] = updatedWorksheet;
      const updatedExcelFile = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      await db.put("excelFiles", updatedExcelFile, fileName);
    } else {
      console.error("User not found for the provided username.");
    }
  } else {
    console.error("No existing data found to update.");
  }
}

// Usage example to download the Excel file
export async function downloadDataFile(fileName = "students") {
  await downloadExcelFile(fileName);
}
