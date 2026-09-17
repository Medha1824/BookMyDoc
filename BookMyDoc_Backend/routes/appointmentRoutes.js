import express from "express";
import {
  createAppointment,
  getDoctorAppointments,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);
router.get("/doctor", verifyToken, getDoctorAppointments);

export default router;
