import { Router } from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { addOrUpdateRating } from "../controllers/ratingController.js";

const router = Router();

router
  .route("/")
  .post(
    authorizePermissions("admin", "teacher"),
    addOrUpdateRating
  );

export default router;
