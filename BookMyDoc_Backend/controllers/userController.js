import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  const allUsers = await User.find();

  return res.status(200).json(allUsers);
};

export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Name, email, password, and role are required" });
  }

  if (!["patient", "doctor"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use" });
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role,
    specialization: [],
  });

  return res.status(201).json({
    message: "New user created",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
};
export const updateDoctorSpecialization = async (req, res) => {
  const { email } = req.params;
  const { specialization } = req.body;

  if (!Array.isArray(specialization) || specialization.length === 0) {
    return res.status(400).json({
      error: "Please select at least one specialization",
    });
  }

  const doctor = await User.findOne({
    email,
    role: "doctor",
  });

  if (!doctor) {
    return res.status(404).json({
      error: "Doctor not found",
    });
  }

  doctor.specialization = specialization;

  await doctor.save();

  return res.status(200).json({
    message: "Specialization saved successfully",
  });
};
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({
      error: "Email, password, and role are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  if (user.password !== password || user.role !== role) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ user });
};

export const updateUserByEmail = async (req, res) => {
  const { email } = req.params;
  const { name: newName, email: newEmail } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = newName;
  user.email = newEmail;

  await user.save();

  return res.status(200).json({
    message: "User updated",
  });
};

export const deleteUserByEmail = async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  await User.deleteOne({ email });

  return res.status(200).json({
    message: "User deleted",
  });
};
