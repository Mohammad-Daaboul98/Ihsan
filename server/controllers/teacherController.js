import Teacher from "../models/TeacherProfileModel.js";
import Student from "../models/StudentProfileModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllTeachers = async (req, res) => {
  const { search } = req.query;

  const queryObject = {};

  if (search) {
    const searchNumeric = parseInt(search, 10);
    const isNumeric = !isNaN(searchNumeric);

    queryObject.$or = [
      { teacherName: { $regex: search, $options: "i" } },
      ...(isNumeric ? [{ age: searchNumeric }] : []),
    ];
  }

  const teachers = await Teacher.find(queryObject);

  const teacher = teachers.filter(
    (teacher) => teacher._id.toString() !== "669a98d474ed7a09fdd6fe04"
  );

  res.status(StatusCodes.OK).json({ teachers: teacher });
};

export const getTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  res.status(StatusCodes.OK).json({ teacher });
};

export const createTeacherProfile = async (req, res) => {
  const { user, profileData } = req.userInfo;
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
  console.log(req.deletedUserInfo);

  const deletedTeacher = await Teacher.findByIdAndDelete(deletedUser._id);

  const updateStudentTeacher = await Student.updateMany(
    { teacherId: deletedUser._id },
    { teacherId: "669a98d474ed7a09fdd6fe04" }
  );

  res.status(StatusCodes.OK).json({
    updateStudentTeacher,
    deletedUser,
    deletedTeacher,
  });
};
