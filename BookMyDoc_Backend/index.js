import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

const PORT = 4000;
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is working" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
