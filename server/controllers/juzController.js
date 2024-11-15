import { StatusCodes } from "http-status-codes";
import Juz from "../models/Juz.js";
import Surah from "../models/Surah.js";
import Page from "../models/Page.js";
import Student from "../models/StudentProfile.js";
export const createJuz = async (req, res, next) => {
  const { id } = req.params;
  const { juzName } = req.body;
  const juz = await Juz.create({ juzName });
  if (id) {
    await Student.findByIdAndUpdate(id, { $push: { studentJuz: juz._id } });
    res.status(StatusCodes.OK).json({ msg: "تم اضافة جزء جديد" });
  } else {
    req.juzInfo = { juzId: juz._id };
    next();
  }
};

export const updateJuz = async (req, res) => {
  const { id } = req.params;
  const { newJuz } = req.body;

  const juz = await Juz.findById(id).populate("surahs");

  const pageIds = juz.surahs.flatMap((surah) => surah.pages);

  await Page.deleteMany({ _id: { $in: pageIds } });

  await Surah.deleteMany({
    _id: { $in: juz.surahs.map((surah) => surah._id) },
  });

  juz.juzName = newJuz;
  juz.surahs = [];

  await juz.save();

  res
    .status(StatusCodes.OK)
    .json({ msg: "تم تعديل الجزء وحذف السور والصفحات المرتبطة بنجاح" });
};
