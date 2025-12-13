import express from "express";
import multer from "multer";
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
  updateCompanyProfile,
} from "../controllers/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Multer storage for company logo
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/companyLogos"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ----- Routes -----

// Register company + employer
router.post("/register", upload.single("logo"), registerCompany);

// Login employer
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Pass to controller
    await loginCompany(req, res);
  } catch (err) {
    console.error("[Login Route Error]:", err);
    next(err);
  }
});

// Get logged-in company profile
router.get("/me", isAuthenticated, getCompanyProfile);

// Update logged-in company profile
router.put("/update", isAuthenticated, upload.single("logo"), updateCompanyProfile);

export default router;
