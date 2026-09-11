import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/helpers.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select(["-password", "-__v"]);
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userInfo = await User.findById(decoded.id).select([
      "-password",
      "-__v",
    ]);
    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
};
export const createUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    specialization,
    age,
    bloodGroup,
    gender,
    contact,
    hospital,
  } = req.body;

  try {
    const otherUser = await User.findOne({ email }).select(["email"]);

    if (otherUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      specialization,
      age,
      bloodGroup,
      gender,
      contact,
      hospital,
    });

    await newUser.save();
    return res.status(201).json({ message: "New user added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
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

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      age,
      gender,
      contact,
      bloodGroup,
      address,
      specialization,
      hospital,
    } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Common information
    user.name = name;
    user.email = email;
    user.gender = gender;
    user.contact = contact;

    // Patient information
    if (age !== undefined) {
      user.age = age;
    }

    if (bloodGroup !== undefined) {
      user.bloodGroup = bloodGroup;
    }

    if (address !== undefined) {
      user.address = address;
    }

    // Doctor information
    if (specialization !== undefined) {
      user.specialization = specialization;
    }

    if (hospital !== undefined) {
      user.hospital = hospital;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        contact: user.contact,
        bloodGroup: user.bloodGroup,
        address: user.address,
        specialization: user.specialization,
        hospital: user.hospital,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to update profile",
    });
  }
};
