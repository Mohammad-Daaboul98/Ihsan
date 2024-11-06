import { Router } from "express";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import { updateJuz } from "../controllers/juzController.js";

const router = Router();

router.route("/:id").patch(authorizePermissions("admin", "teacher"), updateJuz);

export default router;
