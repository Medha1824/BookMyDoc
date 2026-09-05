import express from "express";
import { getDoctorsBySpecialization } from "../controllers/doctorController.js";
const router = express.Router();

router.get("/", getDoctorsBySpecialization);

export default router;
