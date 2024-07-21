//USER TYPES
export const USER_TYPE = {
  TEACHER: "teacher",
  STUDENT: "student",
};

export const STUDENT_RATE = {
  VERY_GOOD: "ممتاز",
  GOOG: "جيد",
  NOT_BAD: "وسط",
  BAD: "سيء",
};

export const STUDENT_ATTENDANCE = {
  PRESENT: "موجد",
  ABSENT: "غياب",
};

export const STUDENT_JUZ = {
  JUZ: [
    {
      id: "الجزء الثلاثون",
      juzName: "الجزء الثلاثون",
      surahs: [
        { id: 78, surahName: "النبأ", pages: [582, 583] },
        { id: 79, surahName: "النازعات", pages: [583, 584, 585] },
        { id: 80, surahName: "عبس", pages: [586, 587] },
        { id: 81, surahName: "التكوير", pages: [587, 588] },
        { id: 82, surahName: "الانفطار", pages: [589] },
        { id: 83, surahName: "المطففين", pages: [590, 591] },
        { id: 84, surahName: "الانشقاق", pages: [591, 592] },
        { id: 85, surahName: "البروج", pages: [592, 593] },
        { id: 86, surahName: "الطارق", pages: [593, 594] },
        { id: 87, surahName: "الأعلى", pages: [594, 595] },
        { id: 88, surahName: "الغاشية", pages: [595, 596] },
        { id: 89, surahName: "الفجر", pages: [596, 597] },
        { id: 90, surahName: "البلد", pages: [597, 598] },
        { id: 91, surahName: "الشمس", pages: [598, 599] },
        { id: 92, surahName: "الليل", pages: [599, 600] },
        { id: 93, surahName: "الضحى", pages: [600] },
        { id: 94, surahName: "الشرح", pages: [600, 601] },
        { id: 95, surahName: "التين", pages: [601] },
        { id: 96, surahName: "العلق", pages: [601, 602] },
        { id: 97, surahName: "القدر", pages: [602] },
        { id: 98, surahName: "البينة", pages: [602, 603] },
        { id: 99, surahName: "الزلزلة", pages: [603] },
        { id: 100, surahName: "العاديات", pages: [603, 604] },
        { id: 101, surahName: "القارعة", pages: [604] },
        { id: 102, surahName: "التكاثر", pages: [604, 605] },
        { id: 103, surahName: "العصر", pages: [605] },
        { id: 104, surahName: "الهمزة", pages: [605, 606] },
        { id: 105, surahName: "الفيل", pages: [606] },
        { id: 106, surahName: "قريش", pages: [606, 607] },
        { id: 107, surahName: "الماعون", pages: [607] },
        { id: 108, surahName: "الكوثر", pages: [607, 608] },
        { id: 109, surahName: "الكافرون", pages: [608] },
        { id: 110, surahName: "النصر", pages: [608, 609] },
        { id: 111, surahName: "المسد", pages: [609] },
        { id: 112, surahName: "الإخلاص", pages: [609, 610] },
        { id: 113, surahName: "الفلق", pages: [610] },
        { id: 114, surahName: "الناس", pages: [610, 611] },
      ],
    },
    {
      id: "الجزء التاسع والعشرون",
      juzName: "الجزء التاسع والعشرون",
      surahs: [
        { id: 67, surahName: "الملك", pages: [562, 563, 564] },
        { id: 68, surahName: "القلم", pages: [564, 565, 566] },
        { id: 69, surahName: "الحاقة", pages: [566, 567, 568] },
        { id: 70, surahName: "المعارج", pages: [568, 569, 570] },
        { id: 71, surahName: "نوح", pages: [570, 571] },
        { id: 72, surahName: "الجن", pages: [572, 573] },
        { id: 73, surahName: "المزمل", pages: [574, 575] },
        { id: 74, surahName: "المدثر", pages: [575, 576, 577] },
        { id: 75, surahName: "القيامة", pages: [578, 579] },
        { id: 76, surahName: "الانسان", pages: [580, 581] },
        { id: 77, surahName: "المرسلات", pages: [581, 582] },
      ],
    },
    {
      id: "الجزء الثامن والعشرون",
      juzName: "الجزء الثامن والعشرون",
      surahs: [
        { id: 58, surahName: "المجادلة", pages: [542, 543, 544, 545] },
        { id: 59, surahName: "الحشر", pages: [545, 546, 547] },
        { id: 60, surahName: "الممتحنة", pages: [547, 548, 549] },
        { id: 61, surahName: "الصف", pages: [550, 551] },
        { id: 62, surahName: "الجمعة", pages: [551, 552] },
        { id: 63, surahName: "المنافقون", pages: [552, 553] },
        { id: 64, surahName: "التغابن", pages: [553, 554] },
        { id: 65, surahName: "الطلاق", pages: [554, 555, 556] },
        { id: 66, surahName: "التحريم", pages: [556, 557] },
      ],
    },
    {
      id: "الجزء السابع والعشرون",
      juzName: "الجزء السابع والعشرون",
      surahs: [
        { id: 51, surahName: "الذاريات", pages: [520, 521, 522] },
        { id: 52, surahName: "الطور", pages: [522, 523, 524] },
        { id: 53, surahName: "النجم", pages: [524, 525] },
        { id: 54, surahName: "القمر", pages: [526, 527, 528] },
        { id: 55, surahName: "الرحمن", pages: [528, 529, 530] },
        { id: 56, surahName: "الواقعة", pages: [531, 532, 533] },
        { id: 57, surahName: "الحديد", pages: [534, 535, 536, 537] },
      ],
    },
    {
      id: "الجزء السادس والعشرون",
      juzName: "الجزء السادس والعشرون",
      surahs: [
        { id: 46, surahName: "الأحقاف", pages: [502, 503, 504] },
        { id: 47, surahName: "محمد", pages: [504, 505, 506] },
        { id: 48, surahName: "الفتح", pages: [507, 508, 509] },
        { id: 49, surahName: "الحجرات", pages: [509, 510] },
        { id: 50, surahName: "ق", pages: [511, 512] },
      ],
    },
    {
      id: "الجزء الخامس والعشرون",
      juzName: "الجزء الخامس والعشرون",
      surahs: [
        { id: 41, surahName: "فصلت", pages: [482, 483, 484] },
        { id: 42, surahName: "الشورى", pages: [485, 486, 487] },
        { id: 43, surahName: "الزخرف", pages: [488, 489, 490] },
        { id: 44, surahName: "الدخان", pages: [491, 492] },
        { id: 45, surahName: "الجاثية", pages: [493, 494] },
      ],
    },
    {
      id: "الجزء الرابع والعشرون",
      juzName: "الجزء الرابع والعشرون",
      surahs: [
        { id: 39, surahName: "الزمر", pages: [467, 468, 469, 470] },
        { id: 40, surahName: "غافر", pages: [471, 472, 473, 474] },
      ],
    },
    {
      id: "الجزء الثالث والعشرون",
      juzName: "الجزء الثالث والعشرون",
      surahs: [
        { id: 36, surahName: "يس", pages: [440, 441, 442] },
        { id: 37, surahName: "الصافات", pages: [442, 443, 444, 445] },
        { id: 38, surahName: "ص", pages: [446, 447, 448] },
        { id: 39, surahName: "الزمر", pages: [448, 449, 450] },
      ],
    },
    {
      id: "الجزء الثاني والعشرون",
      juzName: "الجزء الثاني والعشرون",
      surahs: [
        { id: 33, surahName: "الأحزاب", pages: [418, 419, 420, 421, 422, 423] },
        { id: 34, surahName: "سبأ", pages: [423, 424, 425] },
        { id: 35, surahName: "فاطر", pages: [426, 427, 428, 429] },
        { id: 36, surahName: "يس", pages: [429, 430, 431] },
      ],
    },
    {
      id: "الجزء الحادي والعشرون",
      juzName: "الجزء الحادي والعشرون",
      surahs: [
        { id: 29, surahName: "العنكبوت", pages: [396, 397, 398, 399] },
        { id: 30, surahName: "الروم", pages: [399, 400, 401, 402, 403] },
        { id: 31, surahName: "لقمان", pages: [404, 405, 406] },
        { id: 32, surahName: "السجدة", pages: [407] },
        { id: 33, surahName: "الأحزاب", pages: [408, 409, 410] },
      ],
    },
    {
      id: "الجزء العشرون",
      juzName: "الجزء العشرون",
      surahs: [
        {
          id: 27,
          surahName: "النمل",
          pages: [377, 378, 379, 380, 381, 382, 383, 384],
        },
        {
          id: 28,
          surahName: "القصص",
          pages: [384, 385, 386, 387, 388, 389, 390, 391, 392, 393],
        },
        { id: 29, surahName: "العنكبوت", pages: [394, 395] },
      ],
    },
    {
      id: "الجزء التاسع عشر",
      juzName: "الجزء التاسع عشر",
      surahs: [
        { id: 25, surahName: "الفرقان", pages: [358, 359, 360, 361] },
        {
          id: 26,
          surahName: "الشعراء",
          pages: [361, 362, 363, 364, 365, 366, 367, 368],
        },
        {
          id: 27,
          surahName: "النمل",
          pages: [369, 370, 371, 372, 373, 374, 375, 376],
        },
      ],
    },
    {
      id: "الجزء الثامن عشر",
      juzName: "الجزء الثامن عشر",
      surahs: [
        {
          id: 23,
          surahName: "المؤمنون",
          pages: [342, 343, 344, 345, 346, 347],
        },
        {
          id: 24,
          surahName: "النور",
          pages: [347, 348, 349, 350, 351, 352, 353, 354],
        },
        { id: 25, surahName: "الفرقان", pages: [355, 356, 357] },
      ],
    },
    {
      id: "الجزء السابع عشر",
      juzName: "الجزء السابع عشر",
      surahs: [
        {
          id: 21,
          surahName: "الأنبياء",
          pages: [322, 323, 324, 325, 326, 327],
        },
        {
          id: 22,
          surahName: "الحج",
          pages: [328, 329, 330, 331, 332, 333, 334, 335],
        },
        {
          id: 23,
          surahName: "المؤمنون",
          pages: [336, 337, 338, 339, 340, 341],
        },
      ],
    },
    {
      id: "الجزء السادس عشر",
      juzName: "الجزء السادس عشر",
      surahs: [
        { id: 18, surahName: "الكهف", pages: [293, 294, 295, 296, 297, 298] },
        { id: 19, surahName: "مريم", pages: [298, 299, 300, 301, 302, 303] },
        { id: 20, surahName: "طه", pages: [304, 305, 306, 307, 308, 309] },
      ],
    },
    {
      id: "الجزء الخامس عشر",
      juzName: "الجزء الخامس عشر",
      surahs: [
        {
          id: 17,
          surahName: "الإسراء",
          pages: [282, 283, 284, 285, 286, 287, 288],
        },
        { id: 18, surahName: "الكهف", pages: [288, 289, 290, 291, 292] },
      ],
    },
    {
      id: "الجزء الرابع عشر",
      juzName: "الجزء الرابع عشر",
      surahs: [
        { id: 15, surahName: "الحجر", pages: [261, 262, 263] },
        {
          id: 16,
          surahName: "النحل",
          pages: [264, 265, 266, 267, 268, 269, 270, 271],
        },
        { id: 17, surahName: "الإسراء", pages: [272, 273, 274, 275] },
      ],
    },
    {
      id: "الجزء الثالث عشر",
      juzName: "الجزء الثالث عشر",
      surahs: [
        { id: 12, surahName: "يوسف", pages: [240, 241, 242, 243, 244, 245] },
        { id: 13, surahName: "الرعد", pages: [246, 247] },
        { id: 14, surahName: "إبراهيم", pages: [248, 249, 250] },
        { id: 15, surahName: "الحجر", pages: [251, 252, 253] },
      ],
    },
    {
      id: "الجزء الثاني عشر",
      juzName: "الجزء الثاني عشر",
      surahs: [
        { id: 11, surahName: "هود", pages: [222, 223, 224, 225, 226, 227] },
        {
          id: 12,
          surahName: "يوسف",
          pages: [228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239],
        },
      ],
    },
    {
      id: "الجزء الحادي عشر",
      juzName: "الجزء الحادي عشر",
      surahs: [
        { id: 10, surahName: "يونس", pages: [208, 209, 210, 211, 212] },
        {
          id: 11,
          surahName: "هود",
          pages: [213, 214, 215, 216, 217, 218, 219, 220, 221],
        },
      ],
    },
    {
      id: "الجزء العاشر",
      juzName: "الجزء العاشر",
      surahs: [
        { id: 8, surahName: "الأنفال", pages: [177, 178, 179, 180, 181, 182] },
        {
          id: 9,
          surahName: "التوبة",
          pages: [183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193],
        },
      ],
    },
    {
      id: "الجزء التاسع",
      juzName: "الجزء التاسع",
      surahs: [
        {
          id: 7,
          surahName: "الأعراف",
          pages: [158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168],
        },
        {
          id: 8,
          surahName: "الأنفال",
          pages: [169, 170, 171, 172, 173, 174, 175, 176],
        },
      ],
    },
    {
      id: "الجزء الثامن",
      juzName: "الجزء الثامن",
      surahs: [
        {
          id: 6,
          surahName: "الأنعام",
          pages: [
            141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153,
          ],
        },
        { id: 7, surahName: "الأعراف", pages: [154, 155, 156, 157] },
      ],
    },
    {
      id: "الجزء السابع",
      juzName: "الجزء السابع",
      surahs: [
        {
          id: 5,
          surahName: "المائدة",
          pages: [117, 118, 119, 120, 121, 122, 123, 124, 125],
        },
        {
          id: 6,
          surahName: "الأنعام",
          pages: [
            126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
            139, 140,
          ],
        },
      ],
    },
    {
      id: "الجزء السادس",
      juzName: "الجزء السادس",
      surahs: [
        {
          id: 4,
          surahName: "النساء",
          pages: [91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
        },
        {
          id: 5,
          surahName: "المائدة",
          pages: [
            104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
          ],
        },
      ],
    },
    {
      id: "الجزء الخامس",
      juzName: "الجزء الخامس",
      surahs: [
        {
          id: 4,
          surahName: "النساء",
          pages: [77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
        },
      ],
    },
    {
      id: "الجزء الرابع",
      juzName: "الجزء الرابع",
      surahs: [
        {
          id: 3,
          surahName: "آل عمران",
          pages: [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73],
        },
        { id: 4, surahName: "النساء", pages: [74, 75, 76] },
      ],
    },
    {
      id: "الجزء الثالث",
      juzName: "الجزء الثالث",
      surahs: [
        { id: 2, surahName: "البقرة", pages: [49, 50, 51, 52, 53] },
        {
          id: 3,
          surahName: "آل عمران",
          pages: [54, 55, 56, 57, 58, 59, 60, 61],
        },
      ],
    },
    {
      id: "الجزء الثاني",
      juzName: "الجزء الثاني",
      surahs: [
        {
          id: 2,
          surahName: "البقرة",
          pages: [
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
          ],
        },
      ],
    },
    {
      id: "الجزء الأول",
      juzName: "الجزء الأول",
      surahs: [
        { id: 1, surahName: "الفاتحة", pages: [2] },
        {
          id: 2,
          surahName: "البقرة",
          pages: [
            3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
            22, 23, 24, 25, 26, 27, 28, 29,
          ],
        },
      ],
    },
  ],
  totalParts: 30,
};
