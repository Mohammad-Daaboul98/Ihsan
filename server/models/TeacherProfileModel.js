import mongoose from "mongoose";

const TeacherProfile = new mongoose.Schema(
  {
    teacherName: String,
    teacherWork: String,
    teacherStudy: String,
    age: Date,
    teacherPhone: Number,
  },
);

export default mongoose.model("teachers", TeacherProfile);
