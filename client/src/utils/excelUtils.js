export const createOrUpdateExcelFile = async (filename, newData) => {
  try {
    console.log("Creating or updating file:", filename);

    const existingFile = await getFromIndexedDB(filename);
    console.log("Existing file data:", existingFile);

    let workbook;
    if (existingFile && existingFile.data) {
      const data = new Uint8Array(existingFile.data);
      workbook = XLSX.read(data, { type: 'array' });
    } else {
      workbook = XLSX.utils.book_new();
    }

    const sheetName = 'معلومات';
    let worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    }

    const existingData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    const updatedData = existingData.concat(newData);

    worksheet = XLSX.utils.json_to_sheet(updatedData);
    workbook.Sheets[sheetName] = worksheet;

    const workbookBinary = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    const buffer = s2ab(workbookBinary);
    await saveToIndexedDB(filename, buffer);

    console.log("File saved successfully.");
  } catch (error) {
    console.error("Error creating or updating Excel file:", error);
  }
};
