import Teacher from "../models/TeacherProfileModel.js";
import Student from "../models/StudentProfileModel.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";

export const getAllTeachers = async (req, res) => {
  const { search } = req.query;
  const queryObject = {};
  if (search) {
    queryObject.$or = [
      { name: { $regex: search, $options: "i" } },
      { age: { $regex: search, $options: "i" } },
    ];
  }
  const teachers = await Teacher.find({});
  res.status(StatusCodes.OK).json({ teachers });
};
export const getTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  res.status(StatusCodes.OK).json({ teacher });
};

export const createTeacherProfile = async (req, res) => {
  const { user, profileData } = req.userInfo;
  profileData.age = day(profileData.age).year();
  const teacherProfile = await Teacher.create({
    _id: user._id,
    ...profileData,
  });
  res.status(StatusCodes.CREATED).json({ user, teacherProfile });
};
export const updateTeacherProfile = async (req, res) => {
  const { updatedUser, updatedProfileData } = req.updatedUserInfo;

  const teacherProfile = await Teacher.findByIdAndUpdate(
    updatedUser._id,
    updatedProfileData,
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: "تم تعديل حساب الاستاذ", updatedUser, teacherProfile });
};

export const deleteTeacherProfile = async (req, res) => {
  const { deletedUser } = req.deletedUserInfo;

  const deletedTeacher = await Teacher.findByIdAndDelete(deletedUser._id);

  const updateStudentTeacher = await Student.updateMany(
    { teacherId: deletedUser._id },
    { teacherId: "669a98d474ed7a09fdd6fe04" }
  );

  res.status(StatusCodes.OK).json({
    msg: " تم حذف الاستاذ واضافة الطلاب لدى الاستاذ السابق بدون استاذ",
    updateStudentTeacher,
    deletedUser,
    deletedTeacher,
  });
};
