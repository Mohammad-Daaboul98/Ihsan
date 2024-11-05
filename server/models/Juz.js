import mongoose from "mongoose";

export const Juz = new mongoose.Schema(
  {
    juzName: {
      type: String,
    },
  },
);

export default mongoose.model("Juz", Juz);
