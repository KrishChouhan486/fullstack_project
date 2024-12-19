import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();
const _dirname = path.resolve();
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import healthcheckRouter from "./routes/heathcheck.routes.js";
import userRoute from "./routes/user.routes.js";

// API routes
app.use("/api/v1", healthcheckRouter);
app.use("/api/v1/user", userRoute);


// Fallback to serve the index.html for all non-API routes (frontend routes)
app.use(express.static(path.join(_dirname, "/frontend/build")));  // Update to "build" instead of "dist"
app.get('*', (_, res) => {
  res.sendFile(path.join(_dirname, "frontend", "build", "index.html"));  // Update to "build" instead of "dist"
});


// Global error handler (uncomment if needed)
// app.use(errorHandler);

export { app };
