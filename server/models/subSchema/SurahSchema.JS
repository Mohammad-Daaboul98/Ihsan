import mongoose from "mongoose";
import { STUDENT_RATE } from "../../shared/constants.js";
import studentAttendance from "./StudentAttendanceSchema.js";
export const SurahSchema = new mongoose.Schema(
  {
    surahName: {
      type: String,
    },
    pages: {
      type: [Number],
      default: [],
    },
    rate: {
      type: String,
      enum: Object.values(STUDENT_RATE),
    },
    studentAttendance,
  },
  { _id: false }
);
