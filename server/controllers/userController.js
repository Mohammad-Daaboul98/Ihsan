import User from "../models/UserModel.js";
import { hashPassword } from "../utils/passwordUtils.js";
import { login } from "./authController.js";

export const createUser = async (req, res, next) => {
  let { userName, name, password, age, role, ...rest } = req.body;
  const countUser = await User.find({ role });
  const numOfUser = countUser.length ? countUser.length : 0;

  const roleAcronym = role === "teacher" ? "م" : "ط";
  userName = `${roleAcronym}/${userName.trim()}/${numOfUser + 1}`;

  const hashedPassword = await hashPassword(password);
  password = hashedPassword;

  const user = await User.create({ userName, name, password, age, role });
  req.userInfo = { user, profileData: rest };

  next();
};
export const updateUser = async (req, res, next) => {
  let { userName, name, password, age, role, ...rest } = req.body;
  const { id } = req.params;

  if (req.user.role !== "Admin") {
    req.updatedUserInfo = {updatedProfileData: rest };
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
    { userName, name, password, age, role },
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
