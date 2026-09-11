import { body } from "express-validator";

export const validateUserCreate = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .isIn(["patient", "doctor"])
    .withMessage("Role must be patient or doctor"),
];

export const validateUserUpdate = [
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["patient", "doctor"])
    .withMessage("Role must be patient or doctor"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
