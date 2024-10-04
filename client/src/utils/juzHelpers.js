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
  console.log("juz", juz);
  console.log("newSurah", newSurah);

  let surah = juz.surahs.find((s) => s.surahName === newSurah.surahName);
  console.log("11:", surah);
  if (surah) {
    // Update existing surah
    surah.pages = [...new Set([...surah.pages, ...newSurah.pages])]; // Merge pages
    surah.rate = newSurah.rate; // Update rate
  } else {
    // Add new surah
    juz.surahs.push(newSurah);
  }
  console.log("12:", juz);

  return surah;
};
