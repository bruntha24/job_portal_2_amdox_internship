import Job from "../models/job.model.js";
import cloudinary from "../config/cloudinary.js";

const DEFAULT_LOGO = "https://via.placeholder.com/100x100?text=Logo";

// Cloudinary Upload Helper
const uploadToCloudinary = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });
};

// Safe array parser
const parseArray = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      return value.trim().startsWith("[")
        ? JSON.parse(value)
        : value.split(",").map((v) => v.trim()).filter(Boolean);
    } catch {
      return [value];
    }
  }
  return [];
};

const ALLOWED_LOCATIONS = ["remote", "in-office", "hybrid"];
const LOCATION_TO_WORKMODE = {
  remote: "Remote",
  "in-office": "Office",
  hybrid: "Hybrid",
};

// ======================================================
// CREATE JOB
// ======================================================
export const createJob = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    let companyLogoUrl = DEFAULT_LOGO;

    if (req.file?.buffer) {
      const cloudImage = await uploadToCloudinary(req.file.buffer, "company_logos");
      companyLogoUrl = cloudImage.secure_url;
    }

    const locationRaw = (req.body.location || "").toLowerCase();
    const location = ALLOWED_LOCATIONS.includes(locationRaw) ? locationRaw : "remote";
    const workMode = LOCATION_TO_WORKMODE[location] || "Remote";

    let contactInfo = {};
    if (req.body.contactInformation) {
      try {
        contactInfo =
          typeof req.body.contactInformation === "string"
            ? JSON.parse(req.body.contactInformation)
            : req.body.contactInformation;
      } catch {
        contactInfo = {};
      }
    }

    const essential = parseArray(req.body.essential);
    const preferred = parseArray(req.body.preferred);

    const salaryRange =
      req.body.salaryRange && req.body.salaryRange.trim() !== ""
        ? req.body.salaryRange
        : "Not specified";

    const job = new Job({
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      responsibilities: parseArray(req.body.responsibilities),
      qualifications: { essential, preferred },
      benefits: parseArray(req.body.benefits),
      requiredDocuments: parseArray(req.body.requiredDocuments),
      contactInformation: contactInfo,
      address: req.body.address || "",
      companyOverview: req.body.companyOverview || "",
      salaryRange,
      companyInfo: req.body.companyInfo,
      applicationInstructions: req.body.applicationInstructions,
      applicationDeadline: req.body.applicationDeadline
        ? new Date(req.body.applicationDeadline)
        : null,
      companyLogo: companyLogoUrl,
      location,
      workMode,
      postedBy: req.company._id, // ✅ Use company._id
      postedOn: new Date(),
      department: req.body.department || "General",
    });

    await job.save();

    res.status(201).json({ success: true, message: "Job posted successfully!", job });
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ======================================================
// UPDATE JOB
// ======================================================
export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Find job
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Ownership check
    if (!job.postedBy || job.postedBy.toString() !== req.company._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can update only your own posted jobs",
      });
    }

    // Handle logo upload
    let logoUpdate = {};
    if (req.file?.buffer) {
      const cloudImage = await uploadToCloudinary(req.file.buffer, "company_logos");
      logoUpdate.companyLogo = cloudImage.secure_url;
    }

    const locationRaw = (req.body.location || "").toLowerCase();
    const location = ALLOWED_LOCATIONS.includes(locationRaw) ? locationRaw : "remote";
    const workMode = LOCATION_TO_WORKMODE[location] || "Remote";

    let contactInfo = {};
    if (req.body.contactInformation) {
      try {
        contactInfo =
          typeof req.body.contactInformation === "string"
            ? JSON.parse(req.body.contactInformation)
            : req.body.contactInformation;
      } catch {
        contactInfo = {};
      }
    }

    const updatedData = {
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      responsibilities: parseArray(req.body.responsibilities),
      qualifications: {
        essential: parseArray(req.body.essential),
        preferred: parseArray(req.body.preferred),
      },
      benefits: parseArray(req.body.benefits),
      requiredDocuments: parseArray(req.body.requiredDocuments),
      contactInformation: contactInfo,
      address: req.body.address,
      companyOverview: req.body.companyOverview,
      salaryRange: req.body.salaryRange || "Not specified",
      companyInfo: req.body.companyInfo,
      applicationInstructions: req.body.applicationInstructions,
      applicationDeadline: req.body.applicationDeadline
        ? new Date(req.body.applicationDeadline)
        : null,
      location,
      workMode,
      department: req.body.department,
      ...logoUpdate,
    };

    const updatedJob = await Job.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated successfully!",
      job: updatedJob,
    });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================================================
// GET ALL JOBS
// ======================================================
export const getAllJobs = async (req, res) => {
  try {
    const { search = "", department = "", workMode = "", location = "", salary = "" } =
      req.query;

    const query = {};
    if (search) query.jobTitle = { $regex: search, $options: "i" };
    if (department && department !== "All") query.department = department;
    if (workMode && workMode !== "All") query.workMode = workMode;
    if (location && location !== "All") query.location = location;
    if (salary && salary !== "All") query.salaryRange = { $regex: salary };

    const jobs = await Job.find(query)
      .populate("postedBy", "companyName companyLogo")
      .sort({ postedOn: -1 });

    res.status(200).json({ success: true, jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================================================
// GET SINGLE JOB
// ======================================================
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "companyName companyLogo"
    );

    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, job });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ======================================================
// GET JOBS POSTED BY LOGGED-IN COMPANY
// ======================================================
export const getMyJobs = async (req, res) => {
  try {
    if (!req.company) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const jobs = await Job.find({ postedBy: req.company._id }).sort({ postedOn: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (err) {
    console.error("Error fetching user jobs:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
