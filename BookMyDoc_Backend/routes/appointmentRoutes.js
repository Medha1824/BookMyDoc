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
import { verifyToken, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, requireRole("patient"), createAppointment);
router.get(
  "/doctor",
  verifyToken,
  requireRole("doctor"),
  getDoctorAppointments,
);
router.get(
  "/patient",
  verifyToken,
  requireRole("patient"),
  getPatientAppointments,
);
router.get("/notifications", verifyToken, getNotifications);
router.put("/seen-all", verifyToken, markAllAsSeen);
router.patch(
  "/:id/status",
  verifyToken,
  requireRole("doctor"),
  updateAppointmentStatus,
);
router.put("/:id/seen", verifyToken, markAsSeen);

export default router;
