import express from "express";
import {
  createAppointment,
  getDoctorAppointments,
  getPatientAppointments,
  updateAppointmentStatus,
  getNotifications,
  markAsSeen,
  markAllAsSeen,
} from "../controllers/appointmentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createAppointment);
router.get("/doctor", verifyToken, getDoctorAppointments);
router.get("/patient", verifyToken, getPatientAppointments);
router.get("/notifications", verifyToken, getNotifications);
router.put("/seen-all", verifyToken, markAllAsSeen);
router.patch("/:id/status", verifyToken, updateAppointmentStatus);
router.put("/:id/seen", verifyToken, markAsSeen);
export default router;
