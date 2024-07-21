import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

//Security package
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//Routers
import authRouter from "./routes/authRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";

//Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {
  authenticateUser,
  authorizePermissions,
} from "./middleware/authMiddleware.js";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", authenticateUser, studentRouter);
app.use(
  "/api/v1/teacher",
  authenticateUser,
  authorizePermissions("Admin"),
  teacherRouter
);

//Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT | 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
