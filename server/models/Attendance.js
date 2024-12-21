import mongoose from "mongoose";
import { STUDENT_ATTENDANCE } from "../shared/constants.js";

export const  Attendance = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(STUDENT_ATTENDANCE),
      required: true,
    },
  },
  { _id: false }
);
