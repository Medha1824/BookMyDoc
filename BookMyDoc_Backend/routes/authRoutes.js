import express from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";
import { validateLogin } from "../validators/userValidation.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post("/login", validateLogin, validate, loginUser);
router.post("/logout", logoutUser);

export default router;
