import mongoose from "mongoose";

export const Surah = new mongoose.Schema({
  surahName: {
    type: String,
  },
  pages: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Page",
    },
  ],
});

export default mongoose.model("Surah", Surah);
