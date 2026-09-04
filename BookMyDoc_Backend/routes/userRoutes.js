import express from "express";
import {
  createUser,
  loginUser,
  deleteUserByEmail,
  getAllUsers,
  updateUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", loginUser);
router.put("/:email", updateUserByEmail);
router.delete("/:email", deleteUserByEmail);

export default router;
