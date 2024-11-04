import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
// import cors from 'cors';
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//Security package
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//Public
import path, { dirname } from "path";
import { fileURLToPath } from "url";

//Routers
import authRouter from "./routes/authRouter.js";
import usersRouter from "./routes/userRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import studentTeacherRouter from "./routes/studentTeacherRouter.js";
import ratingRouter from "./routes/ratingsRouter.js";

//Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import {
  authenticateUser,
  authorizePermissions,
} from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// const corsOptions = {
//   origin: 'https://ihsan-sigma.vercel.app', // Allow this origin to access your server
//   methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true, // Allow cookies to be sent with requests
// };

// app.use(cors(corsOptions));

app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);
app.use("/api/v1/student", authenticateUser, studentRouter);
app.use(
  "/api/v1/teacher",
  authenticateUser,
  authorizePermissions("admin"),
  teacherRouter
);
app.use(
  "/api/v1/student-with-teacher",
  authenticateUser,
  authorizePermissions("admin", "teacher"),
  studentTeacherRouter
);
app.use(
  "/api/v1/rating",
  authenticateUser,
  authorizePermissions("admin", "teacher"),
  ratingRouter
);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

//Not Found Middleware
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

// Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT | 5100;

try {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Log if the connection is successful
  console.log("Connected to MongoDB successfully");

  app.listen(port, () => {
    console.log(`server running on port ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
