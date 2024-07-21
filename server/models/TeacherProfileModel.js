import mongoose from "mongoose";

const TeacherProfile = new mongoose.Schema(
  {
    teacherName: String,
    teacherWork: String,
    teacherStudy: String,
    teacherPhone: String,
  },
);

export default mongoose.model("teachers", TeacherProfile);
