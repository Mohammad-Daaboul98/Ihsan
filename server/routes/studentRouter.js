import { Router } from "express";
import {
  createStudentProfile,
  deleteStudentProfile,
  getAllStudents,
  getStudent,
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
  .get(authorizePermissions("Admin", "teacher"), getAllStudents)
  .post(
    authorizePermissions("Admin"),
    validateUserInput,
    validateStudentProfileInput,
    createUser,
    createStudentProfile
  );
  router
  .route("/student-rate/:id")
  .patch(
    authorizePermissions("Admin", "teacher"),
    validateStudentRateInput,
    validateIdParam,
    updateStudentProfile
  )

router
  .route("/:id")
  .get(validateIdParam, getStudent)
  .patch(
    authorizePermissions("Admin", "teacher"),
    validateUserInput,
    validateStudentProfileInput,
    validateIdParam,
    updateUser,
    updateStudentProfile
  )
  .delete(
    authorizePermissions("Admin"),
    validateIdParam,
    deleteUser,
    deleteStudentProfile
  );


export default router;
