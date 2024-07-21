import { Router } from "express";
import {
  createTeacherProfile,
  deleteTeacherProfile,
  getAllTeachers,
  getTeacher,
  updateTeacherProfile,
} from "../controllers/teacherController.js";
import {
  validateIdParam,
  validateTeacherProfileInput,
  validateUserInput,
} from "../middleware/validationMiddleware.js";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router
  .route("/")
  .get(getAllTeachers)
  .post(
    validateUserInput,
    validateTeacherProfileInput,
    createUser,
    createTeacherProfile
  );

router
  .route("/:id")
  .get(validateIdParam, getTeacher)
  .patch(
    validateUserInput,
    validateTeacherProfileInput,
    validateIdParam,
    updateUser,
    updateTeacherProfile
  )
  .delete(validateIdParam, deleteUser, deleteTeacherProfile);

export default router;
