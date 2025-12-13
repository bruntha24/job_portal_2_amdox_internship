// src/components/jobs/PostJob.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PostJobUI from "./PostJobUI";
import PostedJobs from "./PostedJobs";
import axiosInstance from "../../utils/axiosInstance.js";

export default function PostJob() {
  const navigate = useNavigate();

  const initialJobData = {
    jobTitle: "",
    jobDescription: "",
    responsibilities: "",
    qualifications: "",
    location: "Bengaluru",
    locationCustom: "",
    workMode: "Remote",
    workModeCustom: "",
    department: "Frontend",
    departmentCustom: "",
    companyType: "Startup",
    address: "",
    companyOverview: "",
    salaryRange: "",
    benefits: "",
    companyInfo: "",
    applicationInstructions: "",
    applicationDeadline: "",
    requiredDocuments: "",
    contactInformation: { email: "", phone: "", website: "" },
  };

  const [jobData, setJobData] = useState(initialJobData);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postedJobs, setPostedJobs] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const filters = {
    WorkMode: ["Remote", "Hybrid", "Office"],
    Department: ["Frontend", "Backend", "Fullstack", "QA", "Design"],
    CompanyType: ["Startup", "Corporate"],
    Location: ["Bengaluru", "Chennai", "Hyderabad", "Pune", "Delhi"],
  };

  // --- AUTH CHECK AND LOAD JOBS ---
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axiosInstance.get("/companies/me");
        if (!res.data?.company) {
          toast.error("Company profile not found");
          setAuthenticated(false);
          return;
        }
        setAuthenticated(true);

        const jobsRes = await axiosInstance.get("/jobs/my-jobs");
        if (jobsRes.data.success) setPostedJobs(jobsRes.data.jobs);
      } catch (err) {
        console.warn("Auth failed:", err);
        if (err.response?.status !== 401) toast.error("Unable to load company data");
      } finally {
        setCheckingAuth(false);
      }
    };

    fetchCompanyData();
  }, [navigate]);

  // --- FORM HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanVal =
      ["locationCustom", "workModeCustom", "departmentCustom"].includes(name)
        ? value.replace(/\s+/g, "_")
        : value;
    setJobData((prev) => ({ ...prev, [name]: cleanVal }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      contactInformation: { ...prev.contactInformation, [name]: value },
    }));
  };

  const handleFileChange = (e) => setCompanyLogoFile(e.target.files[0]);

  // --- HELPER: PREPARE FORM DATA ---
  const prepareFormData = (data, logoFile = null) => {
    const formData = new FormData();

    // Convert multi-line fields to arrays
    ["responsibilities", "benefits", "requiredDocuments"].forEach((field) => {
      const arr = data[field]?.split("\n").map((v) => v.trim()).filter(Boolean) || [];
      formData.append(field, JSON.stringify(arr));
    });

    // Qualifications: essential vs preferred
    const [essentialRaw = "", preferredRaw = ""] = data.qualifications.split("\n\n");
    formData.append(
      "essential",
      JSON.stringify(essentialRaw.split("\n").map((v) => v.trim()).filter(Boolean))
    );
    formData.append(
      "preferred",
      JSON.stringify(preferredRaw.split("\n").map((v) => v.trim()).filter(Boolean))
    );

    formData.append("contactInformation", JSON.stringify(data.contactInformation));

    const department = data.department === "Others" ? data.departmentCustom : data.department;
    const location = data.location === "Others" ? data.locationCustom : data.location;
    const workMode = data.workMode === "Others" ? data.workModeCustom : data.workMode;

    [
      "jobTitle",
      "jobDescription",
      "companyType",
      "address",
      "companyOverview",
      "companyInfo",
      "applicationInstructions",
      "applicationDeadline",
    ].forEach((field) => {
      if (data[field]) formData.append(field, data[field]);
    });

    formData.append("department", department);
    formData.append("location", location);
    formData.append("workMode", workMode);
    formData.append("salaryRange", data.salaryRange.trim() || "Not specified");

    if (logoFile) formData.append("companyLogo", logoFile);

    return formData;
  };

  // --- POST NEW JOB ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = prepareFormData(jobData, companyLogoFile);
      const res = await axiosInstance.post("/jobs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success("Job posted successfully!");
        setPostedJobs((prev) => [res.data.job, ...prev]);
        setJobData(initialJobData);
        setCompanyLogoFile(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE JOB ---
  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await axiosInstance.delete(`/jobs/${jobId}`);
      if (res.data.success) {
        setPostedJobs((prev) => prev.filter((job) => job._id !== jobId));
        toast.success("Job deleted successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete job");
    }
  };

  // --- EDIT JOB ---
  const editJob = async (updatedJob, jobId) => {
    try {
      const formData = prepareFormData(updatedJob, updatedJob.companyLogoFile);
      const res = await axiosInstance.put(`/jobs/${jobId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setPostedJobs((prev) => prev.map((job) => (job._id === jobId ? res.data.job : job)));
        toast.success("Job updated successfully!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    }
  };

  if (checkingAuth) return <p>Loading...</p>;
  if (!authenticated) return null;

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Job Posting Form */}
      <PostJobUI
        jobData={jobData}
        handleChange={handleChange}
        handleContactChange={handleContactChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        loading={loading}
        filters={filters}
      />

      {/* List of Posted Jobs */}
      <PostedJobs
        postedJobs={postedJobs}
        deleteJob={deleteJob}
        editJob={editJob}
      />
    </div>
  );
}
