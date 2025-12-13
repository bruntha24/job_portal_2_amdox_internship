// src/routes/job.route.js
import express from "express";
import multer from "multer";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  getMyJobs
} from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import Job from "../models/job.model.js";

const router = express.Router();

// Multer memory storage for Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =========================
// CREATE JOB
// =========================
router.post(
  "/",
  isAuthenticated,
  upload.single("companyLogo"),
  createJob
);

// =========================
// GET ALL JOBS
// =========================
router.get("/", getAllJobs);

// =========================
// GET JOBS POSTED BY LOGGED-IN USER
// =========================
router.get("/my-jobs", isAuthenticated, getMyJobs);

// =========================
// GET JOB BY ID
// =========================
router.get("/:id", getJobById);

// =========================
// UPDATE JOB
// =========================
router.patch(
  "/:id",
  isAuthenticated,
  upload.single("companyLogo"),
  updateJob
);

// =========================
// DELETE JOB (FINAL FIXED VERSION)
// =========================
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check correct ownership using postedBy (NOT createdBy)
    if (!job.postedBy || job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized: You can delete only your own posted jobs",
      });
    }

    // Delete job
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("❌ Delete job error:", error);
    return res.status(500).json({
      message: "Server error while deleting job",
      error,
    });
  }
});

export default router;