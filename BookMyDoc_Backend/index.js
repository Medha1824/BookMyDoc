import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";
import appointmentRouter from "./routes/appointmentRoutes.js";
import authRouter from "./routes/authRoutes.js";
import log from "./middleware/log.js";
import { initSocket } from "./utils/socket.js";

import carbonFootprint, { totals } from "./middleware/carbonFootprint.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(log);

app.use(carbonFootprint);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});

app.get("/carbon-summary", (req, res) => res.json(totals));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/doctors", doctorRouter);
app.use("/appointments", appointmentRouter);

initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
