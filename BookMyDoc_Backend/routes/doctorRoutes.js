import express from "express";
import {
  getDoctorsBySpecialization,
  getDoctorById,
} from "../controllers/doctorController.js";
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  requireRole("patient"),
  getDoctorsBySpecialization,
);
router.get("/:id", verifyToken, requireRole("patient"), getDoctorById);

export default router;
