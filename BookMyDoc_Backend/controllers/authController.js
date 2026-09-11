import User from "../models/user.js";
import { comparePassword } from "../utils/helpers.js";
import jwt from "jsonwebtoken";

const lifetime = "3600000";

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email }).select(["-__v"]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (role && user.role !== role) {
      return res
        .status(400)
        .json({ error: `No ${role} account found with this email` });
    }

    const isSame = await comparePassword(password, user.password);
    if (!isSame) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: lifetime },
    );

    res.cookie("token", token, {
      maxAge: lifetime,
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
};
