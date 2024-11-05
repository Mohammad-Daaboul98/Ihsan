import mongoose from "mongoose";
import { STUDENT_RATE } from "../shared/constants.js";

export const Page = new mongoose.Schema({
  surah: { type: mongoose.Types.ObjectId, ref: "Surah", required: true },
  pageFrom: { type: Number },
  pageTo: { type: Number },
  rate: {
    type: String,
    enum: Object.values(STUDENT_RATE),
  },
  date: {
    type: Date,
    required: true,
  },
});

Page.index({ surah: 1, pageFrom: 1, pageTo: 1, date: 1 }, { unique: true });

export default mongoose.model("Page", Page);
