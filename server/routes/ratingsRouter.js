import { Router } from "express";
import { createPage } from "../controllers/pageController.js";
import { createSurah } from "../controllers/surhaController.js";
import { updateJuz } from "../controllers/juzController.js";
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
