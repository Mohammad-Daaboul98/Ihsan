import { Router } from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { addOrUpdateRating } from "../controllers/ratingController.js";
import { validateStudentRateInput } from "../middleware/validationMiddleware.js";

const router = Router();

router
  .route("/")
  .post(
    authorizePermissions("admin", "teacher"),
    validateStudentRateInput,
    addOrUpdateRating
  );

export default router;
