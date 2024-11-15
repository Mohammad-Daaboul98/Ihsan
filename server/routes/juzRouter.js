import { Router } from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { createJuz, updateJuz } from "../controllers/juzController.js";

const router = Router();

router
  .route("/:id")
  .post(authorizePermissions("admin"), createJuz)
  .patch(authorizePermissions("admin", "teacher"), updateJuz);

export default router;
