import mongoose from "mongoose";
import { STUDENT_RATE } from "../../shared/constants.js";
import { PageSchema } from "./PageSchema.js";

export const SurahSchema = new mongoose.Schema(
  {
    surahName: {
      type: String,
    },
    pages: [PageSchema],
  },
  { _id: false }
);
