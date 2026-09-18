import express from "express";
import {
  createUser,
  getAllUsers,
  getProfile,
  updateUserById,
  completeDoctorSignup,
  updateProfilePicture,
} from "../controllers/userController.js";

import { verifyToken } from "../middleware/auth.js";
import {
  validateUserCreate,
  validateUserUpdate,
} from "../validators/userValidation.js";
import validate from "../middleware/validate.js";

import upload from "../middleware/upload.js";

const router = express.Router();
console.log("USER ROUTES LOADED");


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
/*
router.put(
  "/:id/profile-picture",
  verifyToken,
  upload.single("image"),
  updateProfilePicture
);
*/
router.put(
  "/:id/profile-picture",
  (req, res, next) => {
    console.log("PROFILE PICTURE ROUTE HIT");
    next();
  },
  verifyToken,
  upload.single("image"),
  updateProfilePicture
);
router.post("/complete-doctor-signup", completeDoctorSignup);

export default router;
