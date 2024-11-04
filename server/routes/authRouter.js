import { Router } from "express";
import { login, logout, registerAdmin } from "../controllers/authController.js";
import { validateLoginInput } from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { msg: "IP rate limit exceeded, retry in 15 minutes." },
});

const router = Router();

router.post("/login", apiLimiter, validateLoginInput, login);
router.get("/logout", logout);

//one time use
router.post("/registerAdmin", registerAdmin);

export default router;
