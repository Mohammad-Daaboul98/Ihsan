import mongoose from "mongoose";

const TeacherProfile = new mongoose.Schema(
  {
    teacherName: String,
    teacherWork: String,
    teacherStudy: String,
    age: Number,
    teacherPhone: Number,
  },
);

export default mongoose.model("teachers", TeacherProfile);
