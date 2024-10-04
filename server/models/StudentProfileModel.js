import mongoose from "mongoose";
import { JuzSchema } from "./subSchema/JuzSchema.js";

const StudentProfileSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
  studentName: String,
  parentName: String,
  parentWork: String,
  parentPhone: Number,
  StudentStudy: String,
  age: Number,
  studentPoint: Number,
  StudentJuz: [JuzSchema],

});

export default mongoose.model("Students", StudentProfileSchema);
