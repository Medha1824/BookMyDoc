import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import { notifyUser } from "../utils/socket.js";

export const createAppointment = async (req, res) => {
  try {
    const { doctor, consultationType, date, time } = req.body;

    if (!doctor || !consultationType || !date || !time) {
      return res.status(400).json({
        error: "All appointment fields are required",
      });
    }

    const patient = req.user.id;

    const doctorUser = await User.findOne({
      _id: doctor,
      role: "doctor",
    });

    if (!doctorUser) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: "Confirmed",
    });

    if (existingAppointment) {
      return res.status(409).json({
        error: "This time slot is already booked by another patient.",
      });
    }
    const appointment = await Appointment.create({
      patient,
      doctor,
      consultationType,
      date,
      time,
      status: "Pending",
    });

    notifyUser(doctor);

    return res.status(201).json({
      message: "Appointment request sent successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);
    return res.status(500).json({ error: "Failed to create appointment" });
  }
};
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const appointments = await Appointment.find({
      doctor: doctorId,
    })
      .populate("patient", "name email")
      .populate("doctor", "name email specialization")
      .sort({ createdAt: -1 });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Get doctor appointments error:", error);

    return res.status(500).json({
      error: "Failed to fetch doctor appointments",
    });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { id, role } = req.user;
    let items = [];
    let unreadCount = 0;

    if (role === "doctor") {
      items = await Appointment.find({ doctor: id, status: "Pending" })
        .populate("patient", "name")
        .sort({ createdAt: -1 });

      unreadCount = items.length;
    } else {
      items = await Appointment.find({
        patient: id,
        status: { $in: ["Confirmed", "Cancelled"] },
      })
        .populate("doctor", "name")
        .sort({ updatedAt: -1 });

      unreadCount = items.filter((item) => !item.patientSeen).length;
    }

    return res.status(200).json({ role, items, unreadCount });
  } catch (error) {
    console.error("Fetch notifications error:", error);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findOneAndUpdate(
      { _id: id, patient: req.user.id },
      { patientSeen: true },
      { timestamps: false },
    );
    return res.status(200).json({ message: "Marked as seen" });
  } catch (error) {
    console.error("Mark seen error:", error);
    return res.status(500).json({ error: "Failed to update status" });
  }
};

export const markAllAsSeen = async (req, res) => {
  try {
    await Appointment.updateMany(
      { patient: req.user.id, status: { $in: ["Confirmed", "Cancelled"] } },
      { patientSeen: true },
      { timestamps: false },
    );
    return res.status(200).json({ message: "All marked as seen" });
  } catch (error) {
    console.error("Mark all seen error:", error);
    return res.status(500).json({ error: "Failed to update status" });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Cancelled", "Completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid appointment status" });
    }

    const appointment = await Appointment.findOne({
      _id: id,
      doctor: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (status === "Completed" && appointment.status !== "Confirmed") {
      return res
        .status(400)
        .json({ error: "Only confirmed appointments can be completed" });
    }
    if (status === "Confirmed") {
      const alreadyConfirmed = await Appointment.findOne({
        doctor: appointment.doctor,
        date: appointment.date,
        time: appointment.time,
        status: "Confirmed",
        _id: { $ne: appointment._id },
      });

      if (alreadyConfirmed) {
        return res.status(409).json({
          error: "This time slot is already confirmed for another patient.",
        });
      }
    }
    appointment.status = status;
    appointment.patientSeen = false;

    await appointment.save();

    notifyUser(appointment.patient);

    return res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Update appointment status error:", error);
    return res
      .status(500)
      .json({ error: "Failed to update appointment status" });
  }
};
