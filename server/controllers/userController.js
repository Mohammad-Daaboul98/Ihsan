import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { hashPassword } from "../utils/passwordUtils.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const createUser = async (req, res, next) => {
  let { userName, password, role, ...rest } = req.body;
  const countUser = await User.find({ role });
  const numOfUser = countUser.length ? countUser.length : 0;

  const roleAcronym = role === "teacher" ? "م" : "ط";
  userName = `${roleAcronym}/${userName.trim()}/${numOfUser + 1}`;

  const hashedPassword = await hashPassword(password);
  password = hashedPassword;

  const user = await User.create({ userName, password, role });
  req.userInfo = { user, profileData: rest };

  next();
};
export const updateUser = async (req, res, next) => {
  let { userName, password, role, ...rest } = req.body;
  const { id } = req.params;

  const currentUser = await User.findById(id);
  const oldUserName = currentUser.userName;

  if (userName || password || role) {
    if (req.user.role !== "admin") {
      req.updatedUserInfo = { updatedProfileData: rest };
      next();
    }

    const userNameParts = currentUser.userName.split("/");
    const prefix = userNameParts[0];
    const suffix = userNameParts[2];
    userName = `${prefix}/${userName?.trim()}/${suffix}`;
    const hashedPassword = password ? await hashPassword(password) : undefined;
    password = hashedPassword;

    const updatedUserInfo = {
      role: role,
    };

    password ? (updatedUserInfo.password = password) : null;
    userName ? (updatedUserInfo.userName = userName) : null;

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, {
      new: true,
    });
    req.updatedUserInfo = {
      updatedUser,
      oldUserName,
      updatedProfileData: rest,
    };
  } else req.updatedUserInfo = { updatedProfileData: rest, oldUserName };

  next();
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  req.deletedUserInfo = { deletedUser };
  next();
};
