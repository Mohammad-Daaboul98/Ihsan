import mongoose from "mongoose";
import { STUDENT_JUZ } from "../../../shared/constants.js";
import { SurahSchema } from "./SurahSchema.js";

export const JuzSchema = new mongoose.Schema(
  {
    juzName: {
      type: String,
      enum: STUDENT_JUZ.JUZ.map((juz) => juz.juzName),
    },
    surahs: [SurahSchema],
  },
  { _id: false }
);
