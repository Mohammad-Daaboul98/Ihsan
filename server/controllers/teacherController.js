import Teacher from "../models/TeacherProfile.js";
import Student from "../models/StudentProfile.js";
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

  const teachers = await Teacher.aggregate([
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "teacherId",
        as: "students",
      },
    },
    {
      $addFields: {
        studentCount: { $size: "$students" },
      },
    },
    {
      $project: {
        students: 0,
      },
    },
  ]);

  const teacher = teachers.filter(
    (teacher) => teacher._id.toString() !== "6734806168f2be2dd74a2efe"
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
  const MessageInfo = {
    userName: user.userName,
    qrUrl: profileData.qrCode,
  };
  res.status(StatusCodes.CREATED).json({ user, MessageInfo, teacherProfile });
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
    { teacherId: "6734806168f2be2dd74a2efe" }
  );

  res.status(StatusCodes.OK).json({
    updateStudentTeacher,
    deletedUser,
    deletedTeacher,
  });
};
