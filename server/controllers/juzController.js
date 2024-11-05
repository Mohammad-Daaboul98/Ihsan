import { StatusCodes } from "http-status-codes";
import Juz from "../models/Juz.js";
export const createJuz = async (req, res, next) => {
  const { juzName } = req.body;
  const juz = await Juz.create({ juzName });
  req.juzInfo = { juzId: juz._id };
  next();
};

// export const updateJuz = async (req, res) => {
//   const { id } = req.params;
//   const { surahId } = req.JuzInfo;

//   await Juz.findByIdAndUpdate(
//     id,
//     { $push: { surahs: surahId } },
//     {
//       new: true,
//     }
//   );
//   res.status(StatusCodes.OK).json({ msg: "تم اضافة تقيم" });
// };
