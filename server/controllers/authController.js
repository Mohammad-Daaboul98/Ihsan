import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const registerAdmin = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "admin created" });
};

export const login = async (req, res) => {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  const isValidUser = user && (await comparePassword(password, user.password));
  if (!isValidUser)
    throw new UnauthenticatedError("كلمة السر او الاسم غير صحيح");

  const token = createJWT({ _id: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "تم تسجيل الدخول" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.json({ msg: "تم تسجيل الخروج" });
};
