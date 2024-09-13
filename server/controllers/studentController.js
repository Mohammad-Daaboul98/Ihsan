// import mongoose from "mongoose";
import Student from "../models/StudentProfileModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllStudents = async (req, res) => {
  const { search } = req.query;

  const queryObject =
    req.user.role === "teacher"
      ? {
          teacherId: req.user._id,
        }
      : {};

  if (search) {
    const searchNumeric = parseInt(search, 10);
    const isNumeric = !isNaN(searchNumeric);

    queryObject.$or = [
      { studentName: { $regex: search, $options: "i" } },
      ...(isNumeric ? [{ age: searchNumeric }] : []),
    ];
  }

  const student = await Student.find(queryObject);
  res.status(StatusCodes.OK).json({ student });
};
export const getStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  res.status(StatusCodes.OK).json({ student });
};

export const createStudentProfile = async (req, res) => {
  const { user, profileData } = req.userInfo;
  const studentProfile = await Student.create({
    _id: user._id,
    ...profileData,
  });
  res.status(StatusCodes.CREATED).json({ user, studentProfile });
};
export const updateStudentProfile = async (req, res) => {
  const { id } = req.params;
  const { updatedUser, updatedProfileData } = req.updatedUserInfo;

  const studentProfile = await Student.findByIdAndUpdate(
    id,
    updatedProfileData,
    {
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: "تم تعديل حساب الطالب", updatedUser, studentProfile });
};

export const deleteStudentProfile = async (req, res) => {
  const { deletedUser } = req.deletedUserInfo;

  const deletedStudent = await Student.findByIdAndDelete(deletedUser._id);

  res.status(StatusCodes.OK).json({
    msg: "تم حذف الطالب",
    deletedUser,
    deletedStudent,
  });
};
