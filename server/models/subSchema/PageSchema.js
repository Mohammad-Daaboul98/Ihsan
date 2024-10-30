import mongoose from "mongoose";
import { STUDENT_RATE } from "../../shared/constants.js";

export const PageSchema = new mongoose.Schema(
  {
    pageFrom: { type: Number },
    pageTo: { type: Number },
    rate: {
      type: String,
      enum: Object.values(STUDENT_RATE),
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { _id: false }
);
