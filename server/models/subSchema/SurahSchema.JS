import mongoose from "mongoose";
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
