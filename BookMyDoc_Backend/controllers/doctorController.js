import User from "../models/user.js";

export const getDoctorsBySpecialization = async (req, res) => {
  const { specialization, search } = req.query;

  try {
    const query = {
      role: "doctor",
    };

    if (specialization) {
      query.specialization = specialization;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const doctors = await User.find(query).select("-password");

    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch doctors",
    });
  }
};
export const getDoctorById = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await User.findOne({
      _id: id,
      role: "doctor",
    }).select("-password");

    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch doctor",
    });
  }
};
