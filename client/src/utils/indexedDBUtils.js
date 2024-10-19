import Dexie from 'dexie';


const DB_NAME = 'ExcelDatabase';
const STORE_NAME = 'files';

// Open the IndexedDB database
export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Save data to IndexedDB
export const saveToIndexedDB = async (filename, data) => {
  try {
    console.log(`Saving file: ${filename} to IndexedDB`);
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put({ id: filename, data });

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        console.log(`File ${filename} saved successfully.`);
        resolve();
      };
      request.onerror = (event) => {
        console.error("Error saving to IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error accessing IndexedDB:", error);
  }
};

// Get data from IndexedDB
export const getFromIndexedDB = async (filename) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(filename);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = event.target.result;
        resolve(result?.data || null);  // Handle missing data more cleanly
      };
      request.onerror = (event) => {
        console.error('Error retrieving file from IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
};

// Delete data from IndexedDB
export const deleteFromIndexedDB = async (filename) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(filename);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error('Error deleting file from IndexedDB:', error);
  }
};

// Helper function to convert string to ArrayBuffer
export const stringToArrayBuffer = (str) => {
  const buf = new ArrayBuffer(str.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    view[i] = str.charCodeAt(i) & 0xFF;
  }
  return buf;
};
