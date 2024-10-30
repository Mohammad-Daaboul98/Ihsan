import { Router } from "express";
import {
  createStudentProfile,
  deleteStudentProfile,
  getAllStudents,
  getCurrentStudent,
  getStudent,
  updateMultipleStudentsAttendance,
  updateStudentProfile,
} from "../controllers/studentController.js";
import {
  validateIdParam,
  validateStudentProfileInput,
  validateStudentRateInput,
  validateUserInput,
} from "../middleware/validationMiddleware.js";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(authorizePermissions("admin", "teacher"), getAllStudents)
  .post(
    authorizePermissions("admin"),
    validateUserInput,
    validateStudentProfileInput,
    createUser,
    createStudentProfile
  )
  .patch(
    authorizePermissions("admin", "teacher"),
    updateMultipleStudentsAttendance
  );

  router.get("/current-student", getCurrentStudent);

router
  .route("/:id")
  .get(validateIdParam, getStudent)
  .patch(
    authorizePermissions("admin", "teacher"),
    // validateUserInput,
    // validateStudentProfileInput,
    validateIdParam,
    updateUser,
    updateStudentProfile
  )
  .delete(
    authorizePermissions("admin"),
    validateIdParam,
    deleteUser,
    deleteStudentProfile
  );

router
  .route("/student-rate/:id")
  .patch(
    authorizePermissions("admin", "teacher"),
    validateStudentRateInput,
    validateIdParam,
    updateStudentProfile
  );

export default router;
