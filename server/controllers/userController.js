import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import Admin from "../models/AdminModel.js";

export const getCurrentUser = async (req, res) => {

  const [adminUser, normalUser] = await Promise.all([
    Admin.findById(req.user._id),
    User.findById(req.user._id),
  ]);
  
  const user = adminUser || normalUser;
  
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

  if (req.user.role !== "Admin") {
    req.updatedUserInfo = { updatedProfileData: rest };
    next();
  }

  const currentUser = await User.findById(id);
  const userNameParts = currentUser.userName.split("/");
  const prefix = userNameParts[0];
  const suffix = userNameParts[2];
  userName = `${prefix}/${userName.trim()}/${suffix}`;
  const hashedPassword = await hashPassword(password);
  password = hashedPassword;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { userName, password, role },
    {
      new: true,
    }
  );

  req.updatedUserInfo = { updatedUser, updatedProfileData: rest };

  next();
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);

  req.deletedUserInfo = { deletedUser };
  next();
};
