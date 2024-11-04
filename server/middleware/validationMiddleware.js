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
import User from "../models/User.js";
import Student from "../models/StudentProfile.js";

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

    const isadmin = req.user.role === "admin";
    const isTeacher = req.user._id === Student.teacherId?.toString();

    if (!isadmin && !isTeacher)
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
  body("parentWork")
    .notEmpty()
    .withMessage("يجب ادخال عمل الأب او الأم")
    .custom((parentWork) => arabicNameRegex(parentWork, "عمل الأب او الأم")),
  body("age")
    .notEmpty()
    .withMessage("يجب اختيار تاريخ الولادة")
    .isNumeric()
    .withMessage("عمر الطالب يجب ان يكون رقم"),
  body("parentPhone")
    .notEmpty()
    .withMessage("يجب ادخال رقم هاتف الأب او الأم")
    .isNumeric()
    .withMessage("يحب انا يحتوي رقم الهاتف على أرقام فقط"),

  // body("StudentJuz.*.juzName")
  //   .notEmpty()
  //   .withMessage("يجب اختيار الجزء")
  //   .isIn(QURAN_INDEX.JUZ.map((juz) => juz.juzName))
  //   .withMessage("الجزء غير موجود"),
  body("teacherId").custom((teacherId, { req, res }) => {
    if (req.user.role !== "admin" && teacherId) {
      throw new UnauthorizedError("Unauthorized to update teacher name");
    }
    if (req.user.role === "admin" && !teacherId) {
      throw new BadRequestError("يجب اختيار المدرس");
    }
    return true;
  }),
]);
export const validateStudentRateInput = withValidationErrors([
  body("StudentJuz.*.surahs.*.surahName")
    .notEmpty()
    .withMessage("يجب اختيار السورة"),
  // body("StudentJuz.*.surahs.*.pages.*.pageFrom")
  //   .notEmpty()
  //   .withMessage("يجب اختيار الصفحة"),


  // body("StudentJuz.*.surahs.*.pages.*.rate")
  //   .notEmpty()
  //   .withMessage("يجب اختيار التقيم"),

  // body("StudentJuz.*.surahs.*.pages.*.date")
  //   .notEmpty()
  //   .withMessage("يجب اختيار التاريخ"),
]);

export const validateTeacherProfileInput = withValidationErrors([
  body("teacherName")
    .notEmpty()
    .withMessage("يجب ادخال اسم الاستاذ")
    .custom((teacherName) => arabicNameRegex(teacherName, "اسم الاستاذ")),
  body("age")
    .notEmpty()
    .withMessage("يجب اختيار تاريخ الولادة")
    .isNumeric()
    .withMessage("عمر الاستاذ يجب ان يكون رقم")
    .custom((age) => {
      if (age < 15) {
        throw new BadRequestError(" يجب ان يكون عمر الاستاذ أكبر من 15 سنة");
      }
      return true;
    }),
  body("teacherPhone")
    .notEmpty()
    .withMessage("يجب ادخال رقم هاتف الاستاذ")
    .isNumeric()
    .withMessage("يحب انا يحتوي رقم الهاتف على أرقام فقط"),
  body("teacherWork")
    .notEmpty()
    .withMessage("يجب إدخال عمل الأستاذ")
    .custom((teacherWork) => arabicNameRegex(teacherWork, "عمل الأستاذ")),
  body("teacherStudy")
    .notEmpty()
    .withMessage("يجب إدخال المستوى العلمي للأستاذ")
    .custom((teacherStudy) =>
      arabicNameRegex(teacherStudy, "المستوى العلمي للأستاذ")
    ),
]);

export const validateLoginInput = withValidationErrors([
  body("userName").notEmpty().withMessage("يجب ادخال اسم المستخدم"),
  body("password").notEmpty().withMessage("يحب ادخال كلمة السر"),
]);
