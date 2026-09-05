import express from "express";
import {
  createUser,
  loginUser,
  deleteUserByEmail,
  getAllUsers,
  updateUserByEmail,
  getProfile,
  updateDoctorSpecialization,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/profile", verifyToken, getProfile);
router.put("/:email", updateUserByEmail);
router.delete("/:email", deleteUserByEmail);
router.put("/doctor-specialization/:email", updateDoctorSpecialization);

export default router;
