export const studentPointCalc = (student) => {
  let studentAttendPoint;
  let absentCount = 0;
  let presentCount = 0;

  const groupedJuzData = (student) =>
    Object.values(
      (student.studentJuz ?? []).reduce((acc, juz) => {
        if (!acc[juz.juzName]) {
          acc[juz.juzName] = { ...juz, surahs: [] };
        }
        acc[juz.juzName].surahs = acc[juz.juzName].surahs.concat(
          Array.isArray(juz.surahs) ? juz.surahs : [juz.surahs]
        );
        return acc;
      }, {})
    );

  const calculateTotalRate = (data) => {
    let totalRate = 0;

    data.forEach((juz) => {
      if (juz.surahs) {
        juz.surahs.forEach((surah) => {
          if (surah.pages) {
            surah.pages.forEach((page) => {
              totalRate += page.rate || 0;
            });
          }
        });
      }
    });

    return totalRate;
  };

  student.studentAttendance.map((i) => {
    if (i.status === "موجود") presentCount++;
    else if (i.status === "غائب") absentCount++;

    studentAttendPoint = presentCount * 10 - absentCount * 10;
  });

  const studentRatePoint = calculateTotalRate(groupedJuzData(student));

  return studentAttendPoint + studentRatePoint;
};
