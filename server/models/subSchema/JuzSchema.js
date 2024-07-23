import mongoose from "mongoose";
import { QURAN_INDEX } from "../../shared/constants.js";
import { SurahSchema } from "./SurahSchema.js";

export const JuzSchema = new mongoose.Schema(
  {
    juzName: {
      type: String,
      enum: QURAN_INDEX.JUZ.map((juz) => juz.juzName),
    },
    surahs: [SurahSchema],
  },
  { _id: false }
);
