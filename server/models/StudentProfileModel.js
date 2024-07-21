import mongoose from "mongoose";
import { JuzSchema } from "./subSchema/JuzSchema.js";
import { StudentAttendanceSchema } from "./subSchema/StudentAttendanceSchema.js";

const StudentProfileSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  studentName: String,
  parentName: String,
  parentWork: String,
  parentPhone: Number,
  studentPoint: Number,
  StudentJuz: [JuzSchema],

  studentAttendance: [StudentAttendanceSchema],
});

export default mongoose.model("Students", StudentProfileSchema);
