import { Router } from "express";
import { createPage } from "../controllers/pageController";
import { createSurah } from "../controllers/surhaController";
import { updateJuz } from "../controllers/juzController";

const router = Router();

router
  .route("/:id")
  .post(
    authorizePermissions("admin", "teacher"),
    createPage,
    createSurah,
    updateJuz
  );

export default router;
