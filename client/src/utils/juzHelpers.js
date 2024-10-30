// utils/juzHelpers.js
export const findOrCreateJuz = (studentJuz, juzName) => {
  let juz = studentJuz.find((j) => j.juzName === juzName);
  if (!juz) {
    juz = { juzName, surahs: [] };
    studentJuz.push(juz);
  }
  return juz;
};

export const findOrUpdateSurah = (juz, newSurah) => {
  let surah = juz.surahs.find((s) => s.surahName === newSurah.surahName);

  if (surah) {
    // Ensure surah.pages exists before updating
    surah.pages = surah.pages || [];

    newSurah.pages.forEach((newPage) => {
      const existingPage = surah.pages.find(
        (p) => Number(p.pageFrom) === Number(newPage.pageFrom)
      );

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
    // Add new Surah if it doesn't exist, ensuring pages array exists
    juz.surahs.push({ ...newSurah, pages: newSurah.pages || [] });
  }

  return surah || newSurah;
};
