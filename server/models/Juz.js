import mongoose from "mongoose";

export const Juz = new mongoose.Schema(
  {
    juzName: {
      type: String,
    },
    surahs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Surah",
      },
    ],
  },
);

export default mongoose.model("Juz", Juz);
