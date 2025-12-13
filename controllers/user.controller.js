import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ========================
// REGISTER USER
// ========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, mobile, workStatus, notifications } =
      req.body;

    if (!["user", "employer"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Cloudinary URLs (multer-storage-cloudinary automatically uploads)
    const avatarUrl = req.files?.avatar?.[0]?.path || null;
    const resumeUrl = req.files?.resume?.[0]?.path || null;

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      mobile,
      workStatus,
      notifications: notifications === "true" || notifications === true,
      avatar: avatarUrl,
      resume: resumeUrl,
    });

    // ⭐ TOKEN MUST INCLUDE ROLE
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(201).json({ token, user: safeUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// LOGIN USER
// ========================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // ⭐ TOKEN MUST INCLUDE ROLE
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.json({ token, user: safeUser });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// GET PROFILE (Protected)
// ========================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// UPDATE PROFILE (Protected)
// ========================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, mobile, workStatus, notifications } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(mobile && { mobile }),
      ...(workStatus && { workStatus }),
      notifications: notifications === "true" || notifications === true,
    };

    // Cloudinary Uploads
    if (req.files?.avatar?.[0])
      updatedData.avatar = req.files.avatar[0].path;

    if (req.files?.resume?.[0])
      updatedData.resume = req.files.resume[0].path;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

