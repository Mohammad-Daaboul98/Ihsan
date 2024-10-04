import mongoose from "mongoose";
import { STUDENT_ATTENDANCE } from "../../shared/constants.js";

const StudentAttendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
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
export default StudentAttendanceSchema;
