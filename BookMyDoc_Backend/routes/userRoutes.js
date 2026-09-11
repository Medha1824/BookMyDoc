import express from "express";
import {
  createUser,
  getAllUsers,
  getProfile,
  updateUserById,
  updateDoctorSpecialization,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";
import {
  validateUserCreate,
  validateUserUpdate,
} from "../validators/userValidation.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", validateUserCreate, validate, createUser);
router.get("/profile", verifyToken, getProfile);
router.put(
  "/id/:id",
  verifyToken,
  validateUserUpdate,
  validate,
  updateUserById,
);
router.put(
  "/doctor-specialization/:email",
  verifyToken,
  updateDoctorSpecialization,
);

export default router;
