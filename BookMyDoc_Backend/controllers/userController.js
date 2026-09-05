import User from "../models/user.js";

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

  const newUser = await User.create({ name, email, password, role });

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

  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
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
