import Page from "../models/Page.js";
export const createPage = async (req, res, next) => {
  const { date, PageFrom, pageTo, rate, ...rest } = req.body;
  const page = await Page.create({ date, PageFrom, pageTo, rate });
  req.pageInfo = { pageId: page._id, surahData: rest };
  next();
};
