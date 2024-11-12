import Student from "../models/StudentProfile.js";
import { StatusCodes } from "http-status-codes";
import qrCodeGenerator from "../utils/qrCodeGenerator.js";
import cloudinary from "cloudinary";

export const getCurrentStudent = async (req, res) => {
  const id = req.user._id;

  const student = await Student.findById(id);
  res.status(StatusCodes.OK).json({ student });
};

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
  const { id } = req.currentUserId || req.params;
  const student = await Student.findById(id).populate("studentJuz", "juzName");
  res.status(StatusCodes.OK).json({ student });
};

export const createStudentProfile = async (req, res) => {
  const { user, profileData } = req.userInfo;

  const { juzId } = req.juzInfo;
  profileData.studentJuz = juzId;

  await qrCodeGenerator(user._id, profileData);

  const studentProfile = await Student.create({
    _id: user._id,
    ...profileData,
  });
  const MessageInfo = {
    userName: user.userName,
    qrUrl: profileData.qrCode,
  };
  res.status(StatusCodes.CREATED).json({ user, MessageInfo, studentProfile });
};

export const updateMultipleStudentsAttendance = async (req, res) => {
  const { date, attendance } = req.body;

  try {
    await Promise.all(
      attendance.map(async ({ studentId, status }) => {
        const student = await Student.findById(studentId);

        const existingAttendance = student.studentAttendance.find(
          (attendance) => attendance.date.toISOString().split("T")[0] === date
        );

        if (existingAttendance) {
          existingAttendance.status = status;
        } else {
          student.studentAttendance.push({ date, status });
        }
        await student.save();
      })
    );

    res.status(StatusCodes.OK).json({ message: "تم تعديل حالة حضور الطالاب" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "يوجد خطأ في ادخال حضور الطلاب" });
  }
};

export const updateStudentProfile = async (req, res) => {
  const { id } = req.params;

  const { updatedUser, updatedProfileData, oldUserName } =
    req.updatedUserInfo || {};
  let updatedStudent;

  if (updatedProfileData) {
    updatedStudent = updatedProfileData;
  } else {
    updatedStudent = req.body;
  }

  const studentProfile = await Student.findByIdAndUpdate(id, updatedStudent, {
    new: true,
  });

  res.status(StatusCodes.OK).json({
    msg: "تم تعديل حساب الطالب",
    updatedUser,
    oldUserName,
    studentProfile,
  });
};

export const deleteStudentProfile = async (req, res) => {
  const { deletedUser } = req.deletedUserInfo;

  const deletedStudent = await Student.findByIdAndDelete(deletedUser._id);
  if (deletedStudent.qrCodePublicId) {
    await cloudinary.v2.uploader.destroy(deletedStudent.qrCodePublicId);
  }

  res.status(StatusCodes.OK).json({
    msg: "تم حذف الطالب",
    deletedUser,
    deletedStudent,
  });
};
