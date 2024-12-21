import mongoose from "mongoose";
import { Attendance } from "./Attendance.js";

const StudentProfile = new mongoose.Schema({
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
  studentJuz: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Juz",
    },
  ],
  studentAttendance: [Attendance],
  qrCode: String,
  qrCodePublicId: String,
});

export default mongoose.model("Students", StudentProfile);
