import mongoose from "mongoose";

const TeacherProfile = new mongoose.Schema({
  teacherName: String,
  teacherWork: String,
  teacherStudy: String,
  age: Number,
  teacherPhone: String,
  qrCode: String,
  qrCodePublicId: String,
});

export default mongoose.model("teachers", TeacherProfile);
