import mongoose from "mongoose";
import { STUDENT_RATE } from "../../shared/constants.js";
import { AttendanceSchema } from "./AttendanceSchema.js";

export const PageSchema = new mongoose.Schema(
  {
    pageNumber: { type: Number },
    rate: {
      type: String,
      enum: Object.values(STUDENT_RATE),
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);
