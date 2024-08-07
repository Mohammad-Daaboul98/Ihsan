import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser, authorizePermissions } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/student", authenticateUser, studentRouter);
app.use("/api/v1/teacher", authenticateUser, authorizePermissions("Admin"), teacherRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});

// Error Middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}....`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

// Catch unhandled rejections and log them
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
