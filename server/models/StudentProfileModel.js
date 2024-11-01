import mongoose from "mongoose";
import { AttendanceSchema } from "./AttendanceSchema.js";
import { JuzSchema } from "./JuzSchema.js";

const StudentProfileSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "teachers",
  },
  studentName: String,
  parentName: String,
  parentWork: String,
  parentPhone: String,
  StudentStudy: String,
  age: Number,
  studentPoint: Number,
  StudentJuz: [JuzSchema],
  studentAttendance:[AttendanceSchema]
});

export default mongoose.model("Students", StudentProfileSchema);
