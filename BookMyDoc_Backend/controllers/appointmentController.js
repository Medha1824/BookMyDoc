import Appointment from "../models/appointment.js";
import User from "../models/user.js";

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

    const appointment = await Appointment.create({
      patient,
      doctor,
      consultationType,
      date,
      time,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Appointment request sent successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    return res.status(500).json({
      error: "Failed to create appointment",
    });
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
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        error: "Invalid appointment status",
      });
    }

    const appointment = await Appointment.findOne({
      _id: id,
      doctor: req.user.id,
    });

    if (!appointment) {
      return res.status(404).json({
        error: "Appointment not found",
      });
    }

    appointment.status = status;

    await appointment.save();

    return res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment,
    });
  } catch (error) {
    console.error("Update appointment status error:", error);

    return res.status(500).json({
      error: "Failed to update appointment status",
    });
  }
};
