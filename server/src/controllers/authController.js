import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";

// Signup controller
const signup = async (req, res) => {
  try {
    const { fullName, email, password, accessCode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine role based on access code
    let userRole = "user"; // Default role

    if (accessCode) {
      if (accessCode === process.env.ADMIN_CODE) {
        userRole = "admin";
      } else if (accessCode === process.env.STAFF_CODE) {
        userRole = "staff";
      } else {
        return res.status(400).json({ message: "Invalid access code" });
      }
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password,
      role: userRole,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Signin controller
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET ||
        "a38b5ab6ba71dab00541d560feb191e3614325f179d26bb9e1ce428cbb02a22d",
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user controller
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    // If trying to change password
    if (currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
      }
    }

    // Update other fields if provided
    if (fullName) user.fullName = fullName;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({
        email,
        _id: { $ne: user._id },
      });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken" });
      }
      user.email = email;
    }

    await user.save();

    // Generate new token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET ||
        "a38b5ab6ba71dab00541d560feb191e3614325f179d26bb9e1ce428cbb02a22d",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { signup, signin, getCurrentUser };
