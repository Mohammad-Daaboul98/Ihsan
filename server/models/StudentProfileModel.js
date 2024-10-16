import mongoose from "mongoose";
import { JuzSchema } from "./subSchema/JuzSchema.js";
import { AttendanceSchema } from "./subSchema/AttendanceSchema.js";

const StudentProfileSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "teachers",
  },
  studentName: String,
  parentName: String,
  parentWork: String,
  parentPhone: Number,
  StudentStudy: String,
  age: Number,
  studentPoint: Number,
  StudentJuz: [JuzSchema],
  studentAttendance:[AttendanceSchema]
});

export default mongoose.model("Students", StudentProfileSchema);
