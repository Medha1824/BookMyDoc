import express from "express";
import {
  createAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);
router.get("/doctor", verifyToken, getDoctorAppointments);
router.patch("/:id/status", verifyToken, updateAppointmentStatus);

export default router;
