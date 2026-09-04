import User from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const allUsers = await User.find();

  return res.status(200).json(allUsers);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      error: "Name, email, and password are required",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      error: "Password must be at least 6 characters",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      error: "Email is already in use",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  return res.status(201).json({
    message: "New user created",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      error: "Invalid email or password",
    });
  }

  if (user.password !== password) {
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
    },
  });
};

// UPDATE USER
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
