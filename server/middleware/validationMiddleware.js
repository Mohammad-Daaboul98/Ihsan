import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import {
  STUDENT_ATTENDANCE,
  QURAN_INDEX,
  USER_TYPE,
} from "../shared/constants.js";
import { arabicNameRegex } from "../utils/nameRegex.js";
import User from "../models/UserModel.js";
import Student from "../models/StudentProfileModel.js";

const withValidationErrors = (validationValue) => {
  return [
    validationValue,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        const errorMessage = error.array().map((err) => err.msg);
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateUserInput = withValidationErrors([
  body("userName")
    .notEmpty()
    .withMessage("يجب ادخال اسم المستخدم")
    .custom((userName) => arabicNameRegex(userName, "اسم المستخدم")),
  body("password")
    .isLength({ min: 6 })
    .withMessage("كلمة السر يجب ان تتألف على الأقل من (8) أرقام أو أحرف")
    .notEmpty()
    .withMessage("يجب ادخال كلمة السر "),
  body("age")
    .notEmpty()
    .withMessage("يجب اختيار تاريخ الولادة")
    .isDate()
    .withMessage("تاريخ الولادة يجب أن يكون بتنسيق صحيح"),
  body("role")
    .isIn(Object.values(USER_TYPE))
    .withMessage("يجب اختيار نوع المستخدم "),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (id, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");

    const user = await User.findById(id);
    if (!user) throw new NotFoundError(`لا يوجد مستخدم بالمعرف: ${id}`);

    const student =
      user.role === "student"
        ? await Student.findOne({ teacherId: req.user._id })
        : false;

    const isAdmin = req.user.role === "Admin";
    const isTeacher = student ? student._id.toString() === id : false;

    if (!isAdmin && !isTeacher)
      throw new UnauthorizedError("ليس لديك الصلاحية للوصول إلى هذا المسار");
  }),
]);
export const validateStudentProfileInput = withValidationErrors([
  body("studentName")
    .notEmpty()
    .withMessage("يجب ادخال اسم الطالب")
    .custom((studentName) => arabicNameRegex(studentName, "اسم الطالب")),
  body("parentName")
    .notEmpty()
    .withMessage("يجب ادخال اسم الأب او الأم")
    .custom((parentName) => arabicNameRegex(parentName, "اسم الأب او الأم")),
  body("parentWork").notEmpty().withMessage("يجب ادخال عمل الأب او الأم"),
  body("parentPhone").notEmpty().withMessage("يجب ادخال رقم هاتف الأب او الأم"),
  body("StudentJuz.*.juzName")
    .notEmpty()
    .withMessage("يجب اختيار الجزء")
    .isIn(QURAN_INDEX.JUZ.map((juz) => juz.juzName))
    .withMessage("الجزء غير موجود"),
  body("teacherId").custom((teacherId, { req, res }) => {
    if (req.user.role !== "Admin" && teacherId) {
      throw new UnauthorizedError("Unauthorized to update teacher name");
    }
    if (req.user.role === "Admin" && !teacherId) {
      throw new BadRequestError("يجب اختيار المدرس");
    }
    return true;
  }),
  body("studentAttendance.*.date").notEmpty().withMessage("يجب اختيار التاريخ"),
  body("studentAttendance.*.status")
    .isIn(Object.values(STUDENT_ATTENDANCE))
    .withMessage("يحب اختيار حالة الطالب"),
]);

export const validateTeacherProfileInput = withValidationErrors([
  body("teacherName")
    .notEmpty()
    .withMessage("يجب ادخال اسم الاستاذ")
    .custom((teacherName) => arabicNameRegex(teacherName, "اسم الاستاذ")),
  body("teacherPhone").notEmpty().withMessage("يجب ادخال رقم هاتف الاستاذ"),
  body().custom((value) => {
    if (!value.teacherWork && !value.teacherStudy) {
      throw new BadRequestError("يجب إدخال عمل الأستاذ أو الدراسة");
    }
    return true;
  }),
]);

export const validateLoginInput = withValidationErrors([
  body("userName").notEmpty().withMessage("يجب ادخال اسم المستخدم"),
  body("password").notEmpty().withMessage("يحب ادخال كلمة السر"),
]);