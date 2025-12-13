import Company from "../models/company.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ----------------------------
// REGISTER COMPANY + EMPLOYER
// ----------------------------
export const registerCompany = async (req, res) => {
  try {
    let { name, email, password, description, location, website, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    email = email.toLowerCase().trim();
    password = password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employer user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employer",
    });

    // Upload logo if provided
    let logoUrl = null;
    if (req.file) {
      const cloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "company_logos",
      });
      logoUrl = cloud.secure_url;
      fs.unlinkSync(req.file.path);
    }

    // Create company record
    const company = await Company.create({
      name,
      email,
      description,
      location,
      website,
      phone,
      owner: newUser._id,
      logo: logoUrl,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: "employer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Company registered successfully",
      token,
      company,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.error("Register company error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// LOGIN EMPLOYER
// ----------------------------
export const loginCompany = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    email = email.toLowerCase().trim();
    password = password.trim();

    // Find employer
    const user = await User.findOne({ email, role: "employer" });
    if (!user) return res.status(400).json({ message: "Employer not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Get company associated with user
    const company = await Company.findOne({ owner: user._id });
    if (!company) return res.status(400).json({ message: "Company profile not found" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: "employer" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      company,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login company error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------
// GET LOGGED-IN COMPANY PROFILE
// ----------------------------
export const getCompanyProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      company: req.company,
    });
  } catch (err) {
    console.error("Get company profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ----------------------------
// UPDATE COMPANY PROFILE
// ----------------------------
export const updateCompanyProfile = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Upload new logo if provided
    if (req.file) {
      const cloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "company_logos",
      });
      updates.logo = cloud.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.company._id,
      updates,
      { new: true }
    ).populate("owner", "-password");

    if (!updatedCompany)
      return res.status(404).json({ message: "Company not found" });

    res.json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });

  } catch (err) {
    console.error("Update company profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

