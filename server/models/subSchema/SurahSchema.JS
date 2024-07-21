import mongoose from "mongoose";
import { STUDENT_JUZ, STUDENT_RATE } from "../../../shared/constants.js";

export const SurahSchema = new mongoose.Schema(
    {
      surahName: {
        type: String,
        enum: STUDENT_JUZ.JUZ.flatMap((juz) =>
          juz.surahs.map((surah) => surah.surahName)
        ),
      },
      pages: {
        type: [Number],
        validate: {
          validator: function (pages) {
            return pages.every(
              (page) => Number.isInteger(page) && page > 0 && page <= 611
            );
          },
          message: "الصفحات يجب أن تكون ضمن النطاق من 1 إلى 611",
        },
        default: [],
      },
      rate: {
        type: String,
        enum: Object.values(STUDENT_RATE),
      },
    },
    { _id: false }
  );