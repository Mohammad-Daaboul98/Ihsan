import Students from "../models/StudentProfile.js"; // Student model
import { StatusCodes } from "http-status-codes";

export const getAllStudentsWithTeachers = async (req, res) => {
  const { search } = req.query;

  // Build query based on role and search filters
  const queryObject =
    req.user.role === "teacher" ? { teacherId: req.user._id } : {};

  if (search) {
    const searchNumeric = parseInt(search, 10);
    const isNumeric = !isNaN(searchNumeric);

    queryObject.$or = [
      { studentName: { $regex: search, $options: "i" } },
      ...(isNumeric ? [{ age: searchNumeric }] : []),
    ];
  }

  const studentsWithTeachers = await Students.find(queryObject).populate(
    "teacherId",
    "teacherName"
  );

  res.status(StatusCodes.OK).json({ students: studentsWithTeachers });
};
export const getStudentWithTeacher = async (req, res) => {
  const { id } = req.params;
  const studentWithTeacher = await Students.findById(id).populate(
    "teacherId",
    "teacherName"
  );
  res.status(StatusCodes.OK).json({ student: studentWithTeacher });
};
