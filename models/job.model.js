import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    // About the Role
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },

    responsibilities: {
      type: [String],
      default: [],
      required: true,
    },

    qualifications: {
      essential: {
        type: [String],
        default: [],
        required: true,
      },
      preferred: {
        type: [String],
        default: [],
      },
    },

    // Work Mode & Location
    location: {
      type: String,
      enum: ["remote", "in-office", "hybrid"],
      default: "remote",
      required: true,
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Office"],
      default: "Office",
      required: true,
    },

    department: {
      type: String,
      enum: ["Frontend", "Backend", "Fullstack", "QA", "Design", "General"],
      default: "General",
      required: true,
    },

    address: { type: String, default: "Not provided" },

    // About the Company
    companyOverview: { type: String, default: "" },
    salaryRange: { type: String, required: true },
    benefits: { type: [String], default: [], required: true },
    companyInfo: { type: String, default: "" },

    // Company Logo
    companyLogo: { type: String, default: "" },

    // About the Application
    applicationInstructions: { type: String, default: "" },
    applicationDeadline: { type: String, default: "Not specified" },
    requiredDocuments: { type: [String], default: [], required: true },

    // Contact Information
    contactInformation: {
      type: Object,
      default: {},
      required: true,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postedOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
