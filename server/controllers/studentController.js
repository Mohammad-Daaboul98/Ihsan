import Student from "../models/StudentProfile.js";
import { StatusCodes } from "http-status-codes";
import qrCodeGenerator from "../utils/qrCodeGenerator.js";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

// export const getCurrentStudent = async (req, res) => {
//   const id = req.user._id;

//   const student = await Student.findById(id);
//   res.status(StatusCodes.OK).json({ student });
// };

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
  try {
    const { id } = req.currentUserId || req.params;
    const { rate, surahName, date, juzName } = req.query;

    const student = await Student.aggregate([
      // Match the student by ID
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
    
      // Lookup for teacher data
      {
        $lookup: {
          from: "teachers",
          localField: "teacherId",
          foreignField: "_id",
          as: "teacher",
        },
      },
    
      // Unwind the teacher array to make it a single object
      { $unwind: { path: "$teacher", preserveNullAndEmptyArrays: true } },
    
    
      // Lookup for studentJuz
      {
        $lookup: {
          from: "juzs",
          localField: "studentJuz",
          foreignField: "_id",
          as: "studentJuz",
        },
      },
    
      // Filter studentJuz based on juzName
      {
        $addFields: {
          studentJuz: {
            $cond: [
              { $ifNull: [juzName, false] }, // If juzName is provided
              {
                $filter: {
                  input: "$studentJuz",
                  as: "juz",
                  cond: { $eq: ["$$juz.juzName", juzName] },
                },
              },
              "$studentJuz", // Otherwise, keep all
            ],
          },
        },
      },
    
      // Unwind studentJuz to process nested surahs
      { $unwind: { path: "$studentJuz", preserveNullAndEmptyArrays: true } },
    
      // Lookup surahs within studentJuz
      {
        $lookup: {
          from: "surahs",
          localField: "studentJuz.surahs",
          foreignField: "_id",
          as: "studentJuz.surahs",
        },
      },
    
      // Filter surahs based on surahName
      {
        $addFields: {
          "studentJuz.surahs": {
            $cond: [
              { $ifNull: [surahName, false] }, // If surahName is provided
              {
                $filter: {
                  input: "$studentJuz.surahs",
                  as: "surah",
                  cond: { $eq: ["$$surah.surahName", surahName] },
                },
              },
              "$studentJuz.surahs", // Otherwise, keep all
            ],
          },
        },
      },
    
      // Unwind surahs to process nested pages
      { $unwind: { path: "$studentJuz.surahs", preserveNullAndEmptyArrays: true } },
    
      // Lookup pages within surahs
      {
        $lookup: {
          from: "pages",
          localField: "studentJuz.surahs.pages",
          foreignField: "_id",
          as: "studentJuz.surahs.pages",
        },
      },
    
      // Filter pages based on rate and date
      {
        $addFields: {
          "studentJuz.surahs.pages": {
            $filter: {
              input: "$studentJuz.surahs.pages",
              as: "page",
              cond: {
                $and: [
                  rate ? { $eq: ["$$page.rate", rate] } : true,
                  date ? { $eq: ["$$page.date", date] } : true,
                ],
              },
            },
          },
        },
      },
    
      // Remove Surahs with no matching pages
      {
        $group: {
          _id: "$_id",
          student: { $first: "$$ROOT" }, // Keep the entire student document
          studentJuz: {
            $push: {
              $cond: [
                { $gt: [{ $size: "$studentJuz.surahs.pages" }, 0] },
                "$studentJuz",
                null,
              ],
            },
          },
        },
      },
    
      // Clean up nulls and flatten the result
      {
        $addFields: {
          "student.studentJuz": {
            $filter: {
              input: "$studentJuz",
              as: "juz",
              cond: { $ne: ["$$juz", null] },
            },
          },
        },
      },
    
      // Replace root with the cleaned-up student document
      {
        $replaceRoot: {
          newRoot: "$student",
        },
      },
    ]);
    

    if (!student.length) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No matching student data found." });
    }

    res.status(StatusCodes.OK).json({ student: student[0] });
  } catch (error) {
    console.error("Error in getFilteredStudent (aggregation):", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An error occurred while retrieving the student data.",
    });
  }
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
