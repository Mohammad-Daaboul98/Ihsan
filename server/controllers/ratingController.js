import { StatusCodes } from "http-status-codes";
import Juz from "../models/Juz.js";
import Surah from "../models/Surah.js";
import Page from "../models/Page.js";

export const addOrUpdateRating = async (req, res) => {
  const { juzId, surahName, pageFrom, pageTo, rate, date } = req.body;

  try {
    let juz = await Juz.findById(juzId);

    // Step 2: Find or create Surah within the specified Juz
    let surah = await Surah.findOne({ surahName, _id: { $in: juz.surahs } });
    if (!surah) {
      surah = new Surah({ surahName });
      await surah.save();
      juz.surahs.push(surah._id); // Add new Surah to Juz
      await juz.save();
    }

    // Step 3: Find or create Page within the specified Surah
    let page = await Page.findOne({ pageFrom, surah: surah._id });
    if (page) {
      // Update the existing page's rating and date
      page.rate = rate;
      page.date = date;
      page.pageTo = pageTo;
    } else {
      // Create a new page with the specified rating and date
      page = new Page({
        pageFrom,
        pageTo,
        rate,
        date,
        surah: surah._id,
      });
      await page.save();
      surah.pages.push(page._id); // Add new page to Surah
      await surah.save();
    }

    await page.save();

    res.status(StatusCodes.OK).json({
      msg: "تم اضافة تقيم",
      data: {
        juz: juzId,
        surah: surah._id,
        page: page._id,
        rate: page.rate,
        date: page.date,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Error in adding or updating rating",
      error,
    });
  }
};
