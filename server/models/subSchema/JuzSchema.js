import mongoose from "mongoose";
import { SurahSchema } from "./SurahSchema.js";

export const JuzSchema = new mongoose.Schema(
  {
    juzName: {
      type: String,
    },
    surahs: [SurahSchema],
  },
  { _id: false }
);
