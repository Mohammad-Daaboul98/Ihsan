import { Router } from "express";
import {
  getAllStudentsWithTeachers,
  getStudentWithTeacher,
} from "../controllers/studentTeacherController.js";
import { validateIdParam } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/").get(getAllStudentsWithTeachers);
router.route("/:id").get(validateIdParam, getStudentWithTeacher);

export default router;
