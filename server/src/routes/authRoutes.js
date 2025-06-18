import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
import {
  signup,
  signin,
  getCurrentUser,
  updateUserSettings,
} from "../controllers/authController.js";

const router = express.Router();

// Signup route
router.post(
  "/signup",
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  signup
);

// Signin route
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signin
);

// Get current user
router.get("/me", auth, getCurrentUser);

// Update user settings
router.put(
  "/settings",
  auth,
  [
    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Full name cannot be empty"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("currentPassword")
      .optional()
      .notEmpty()
      .withMessage("Current password is required for changes"),
    body("newPassword")
      .optional()
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  updateUserSettings
);

export default router;
