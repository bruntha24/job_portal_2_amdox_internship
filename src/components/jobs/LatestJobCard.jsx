import React, { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  Bookmark,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

// ... imports stay the same
export default function LatestJobCard({ job }) {
  const navigate = useNavigate();
  const [applying, setApplying] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [profileResumeUrl, setProfileResumeUrl] = useState(null);
  const [isSaved, setIsSaved] = useState(false); // NEW
  const resumeInputRef = useRef(null);

  const jobId = job.id || job._id;
  const logoSrc = job.companyLogo?.startsWith("http")
    ? job.companyLogo
    : "/logo.png";

  // -----------------------------
  // Auto load profile resume
  // -----------------------------
  useEffect(() => {
    const fetchProfileResume = async () => {
      try {
        const res = await axiosInstance.get("users/profile");
        if (res.data?.resume) {
          setProfileResumeUrl(res.data.resume);
        }
      } catch (err) {
        console.error("Profile resume load failed:", err.response?.data || err.message);
      }
    };
    fetchProfileResume();

    // CHECK IF JOB IS ALREADY SAVED
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setIsSaved(savedJobs.some((item) => item.id === jobId));
  }, [jobId]);

  const goToJob = () => {
    if (!jobId) return;
    navigate(`/jobs/${jobId}`);
  };

  // -----------------------------
  // SAVE JOB (TOGGLE) USING LOCALSTORAGE
  // -----------------------------
  const handleSave = (e) => {
    e.stopPropagation();
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (isSaved) {
      // REMOVE JOB
      const updatedJobs = savedJobs.filter((item) => item.id !== jobId);
      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      setIsSaved(false);
      toast("Job removed from saved list");
    } else {
      // ADD JOB
      savedJobs.push({ ...job, id: jobId });
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(true);
      toast.success("Job saved!");
    }
  };

  const handleResumeSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setProfileResumeUrl(null);
    }
  };

  // -----------------------------
  // APPLY JOB
  // -----------------------------
  const handleApply = async (e) => {
    e.stopPropagation();
    if (!jobId) return toast.error("Invalid job ID");
    if (!resumeFile && !profileResumeUrl) {
      return toast.error("Please upload a resume in your profile.");
    }

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login to apply for this job.");

    const formData = new FormData();
    formData.append("job", jobId);
    formData.append("coverLetter", "Excited to apply for this role!");
    if (resumeFile) formData.append("resume", resumeFile);
    else formData.append("resumeUrl", profileResumeUrl);

    try {
      setApplying(true);
      const res = await axiosInstance.post("applications/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message || "Application submitted!");
      setResumeFile(null);
    } catch (err) {
      console.error("Apply job failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  return (
    <Card
      className="w-full border border-gray-200 rounded-md p-4 hover:shadow-md hover:bg-gray-50 transition cursor-pointer flex flex-col md:flex-row justify-between gap-4"
      onClick={goToJob}
    >
      {/* LEFT */}
      <div className="flex flex-col md:flex-row items-start gap-4 flex-1">
        <img
          src={logoSrc}
          alt={job.companyName || "Company Logo"}
          className="w-12 h-12 rounded border object-cover"
          onError={(e) => (e.target.src = "/logo.png")}
          onClick={(e) => e.stopPropagation()}
        />

        <div className="flex-1">
          <p
            className="text-lg font-semibold text-blue-700 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              goToJob();
            }}
          >
            {job.jobTitle}
          </p>

          <p className="text-gray-600 text-sm">{job.companyName}</p>

          <div className="flex flex-wrap gap-3 text-gray-700 mt-1 text-xs">
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> {job.workMode}
            </span>
            <span className="flex items-center gap-1">
              <IndianRupee className="w-3 h-3" /> {job.salaryRange}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {job.location}
            </span>

            {job.lastDate && (
              <span className="flex items-center gap-1 text-red-600 font-medium">
                <CalendarDays className="w-3 h-3" /> {job.lastDate}
              </span>
            )}
          </div>

          {job.department && (
            <Badge className="text-[10px] bg-blue-100 text-blue-800 mt-2">
              {job.department}
            </Badge>
          )}

          {job.postedOn && (
            <p className="text-gray-500 text-xs mt-1">
              Updated on: {job.postedOn}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-2 w-[160px]">
        <input
          type="file"
          ref={resumeInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeSelect}
        />

        {resumeFile && (
          <p className="text-xs text-gray-600 truncate w-full text-center">
            Selected: {resumeFile.name}
          </p>
        )}

        <Button
          className="text-sm px-3 py-1 w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={handleApply}
          disabled={applying}
        >
          {applying ? "Applying..." : "Apply Now"}
        </Button>

        {/* UPDATED SAVE BUTTON */}
        <Button
          variant={isSaved ? "secondary" : "outline"}
          className="text-sm px-2 py-1 w-full flex justify-center"
          onClick={handleSave}
        >
          <Bookmark className="w-4 h-4" />
          <span className="ml-1">{isSaved ? "Saved" : "Save"}</span>
        </Button>
      </div>
    </Card>
  );
}
