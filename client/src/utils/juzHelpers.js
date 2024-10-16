// utils/juzHelpers.js
export const findOrCreateJuz = (studentJuz, juzName) => {
  let juz = studentJuz.find((j) => j.juzName === juzName);
  if (!juz) {
    juz = { juzName, surahs: [] };
    studentJuz.push(juz);
  }
  return juz;
};

// utils/juzHelpers.js
export const findOrUpdateSurah = (juz, newSurah) => {
  let surah = juz.surahs.find((s) => s.surahName === newSurah.surahName);
  
  if (surah) {
    // Loop through newSurah pages and either update or add new pages
    
    newSurah.pages.forEach((newPage) => {
      const existingPage = surah.pages.find((p) => p.pageNumber === newPage.pageNumber);
      
      if (existingPage) {
        // Update the existing page's rate and attendance
        existingPage.rate = newPage.rate;
        existingPage.attendance = newPage.attendance;
      } else {
        // Add new page if it doesn't exist
        surah.pages.push(newPage);
      }
    });
  } else {
    // Add new Surah if it doesn't exist
    juz.surahs.push(newSurah);
  }

  return surah || newSurah; // Return the updated or newly added Surah
};

