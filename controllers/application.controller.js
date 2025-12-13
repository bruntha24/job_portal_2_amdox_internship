import Application from "../models/application.model.js";

// CREATE APPLICATION
export const createApplication = async (req, res) => {
  try {
    // Only job seekers
    if (req.user.role !== "user") {
      return res.status(403).json({ message: "Only job seekers can apply" });
    }

    const { job, coverLetter, resumeUrl: profileResumeUrl } = req.body;

    if (!job) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    let resumePath = null;

    // 1️⃣ If user uploaded a new resume file
    if (req.file && req.file.fieldname === "resume") {
      resumePath = req.file.path; // Multer saves file path
    } 
    // 2️⃣ If user is sending a profile resume URL
    else if (profileResumeUrl) {
      resumePath = profileResumeUrl;
    }

    if (!resumePath) {
      return res.status(400).json({ message: "Resume file or URL is required" });
    }

    const application = await Application.create({
      applicant: req.user._id,
      job,
      resume: resumePath,
      coverLetter: coverLetter || "",
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Application Create Error:", error);

    // Always return JSON to prevent HTML errors on frontend
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// GET ALL APPLICATIONS
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("applicant", "name email")
      .populate("job", "jobTitle companyInfo");

    return res.json(applications);
  } catch (error) {
    console.error("Get Applications Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE APPLICATION
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("applicant", "name email")
      .populate("job", "jobTitle companyInfo");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.json(application);
  } catch (error) {
    console.error("Get Application by ID Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
