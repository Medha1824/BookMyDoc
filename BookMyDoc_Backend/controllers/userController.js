import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/helpers.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

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

    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    // Delete old image from Cloudinary if one exists
    if (user.profilePicture?.publicId) {
      await cloudinary.uploader.destroy(user.profilePicture.publicId);
    }

    // Upload new image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "bookmydoc/profile-pictures",
    });

    // Delete temporary local file
    fs.unlinkSync(req.file.path);

    // Save Cloudinary information in MongoDB
    user.profilePicture = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password -__v");

    return res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile picture upload error:", error);

    // Try to remove temporary file if it still exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: "Failed to update profile picture",
      error: error.message,
    });
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
    qualification,
    experience,
  } = req.body;

  try {
    const otherUser = await User.findOne({ email }).select(["email"]);
    if (otherUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    if (role === "doctor") {
      const pendingToken = jwt.sign(
        { name, email, password: hashedPassword, role },
        process.env.JWT_SECRET,
        { expiresIn: "30m" },
      );

      return res.status(200).json({ pendingToken });
    }

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
      qualification,
      experience,
    });

    await newUser.save();
    return res.status(201).json({ message: "New user added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
export const completeDoctorSignup = async (req, res) => {
  const { pendingToken, specialization } = req.body;

  if (!Array.isArray(specialization) || specialization.length === 0) {
    return res
      .status(400)
      .json({ error: "Please select at least one specialization" });
  }

  let decoded;
  try {
    decoded = jwt.verify(pendingToken, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Signup session expired. Please sign up again." });
  }

  try {
    const existing = await User.findOne({ email: decoded.email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newDoctor = new User({
      name: decoded.name,
      email: decoded.email,
      password: decoded.password,
      role: "doctor",
      specialization,
    });

    await newDoctor.save();
    return res
      .status(201)
      .json({ message: "Doctor account created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
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
      qualification,
      experience,
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

    if (qualification !== undefined) {
      user.qualification = qualification;
    }

    if (experience !== undefined) {
      user.experience = experience;
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
        qualification: user.qualification,
        experience: user.experience,
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
