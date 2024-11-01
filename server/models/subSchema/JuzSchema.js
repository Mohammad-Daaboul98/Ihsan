import mongoose from "mongoose";
import { SurahSchema } from "../subSchema/SurahSchema.js";

export const JuzSchema = new mongoose.Schema(
  {
    juzName: {
      type: String,
    },
    surahs: [SurahSchema],
  },
  { _id: false }
);
