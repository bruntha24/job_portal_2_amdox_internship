import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middleware/upload.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// ========================
// Register (with avatar + resume upload)
// ========================
router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerUser
);

// ========================
// Login
// ========================
router.post("/login", loginUser);

// ========================
// Get user profile (protected)
// ========================
router.get("/profile", isAuthenticated, getProfile);

// ========================
// Update user profile (protected)
// ========================
router.put(
  "/profile",
  isAuthenticated,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateProfile
);

export default router;
