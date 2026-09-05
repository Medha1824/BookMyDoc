import express from "express";
import {
  getDoctorsBySpecialization,
  getDoctorById,
} from "../controllers/doctorController.js";
const router = express.Router();

router.get("/", getDoctorsBySpecialization);
router.get("/:id", getDoctorById);

export default router;
