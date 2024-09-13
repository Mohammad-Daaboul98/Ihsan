// utils/indexedDBUtils.js

const DB_NAME = 'ExcelDatabase';
const STORE_NAME = 'files';

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

export const saveToIndexedDB = async (filename, data) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.put({ id: filename, data });

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve();
      request.onerror = (event) => {
        console.error("Error saving to IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error accessing IndexedDB:", error);
  }
};


export const getFromIndexedDB = async (filename) => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    const request = store.get(filename);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        const result = event.target.result;
        if (result && result.data) {
          resolve(result);
        } else {
          resolve(null);  // Ensure we handle missing data gracefully
        }
      };
      request.onerror = (event) => {
        console.error("Error retrieving file from IndexedDB:", event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error("Error accessing IndexedDB:", error);
  }
};



export const deleteFromIndexedDB = async (filename) => {
  const db = await openDatabase();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  const request = store.delete(filename);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = (event) => reject(event.target.error);
  });
};
