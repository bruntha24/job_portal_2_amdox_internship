// src/components/jobs/Job.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function Job() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [profileResumeUrl, setProfileResumeUrl] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axiosInstance.get(`jobs/${id}`);
        setJob(res.data.job || res.data);
      } catch (err) {
        console.error(err.response || err);
        setError(err.response?.data?.message || "Failed to load job.");
      } finally {
        setLoading(false);
      }
    };

    const fetchProfileResume = async () => {
      try {
        const res = await axiosInstance.get("users/profile");
        if (res.data?.resume) setProfileResumeUrl(res.data.resume);
      } catch (err) {
        console.error("Failed to load profile resume:", err.response?.data || err.message);
      }
    };

    fetchJob();
    fetchProfileResume();
  }, [id]);

  const handleApply = async () => {
    if (!resumeFile && !profileResumeUrl)
      return toast.error("Please upload a resume or use the one from your profile.");

    const token = localStorage.getItem("token");
    if (!token) return toast.error("Login to apply for this job.");

    setApplying(true);

    try {
      const formData = new FormData();
      formData.append("job", job._id || job.id);
      formData.append("coverLetter", coverLetter || "Excited to apply for this role!");

      if (resumeFile) formData.append("resume", resumeFile);
      else formData.append("resumeUrl", profileResumeUrl);

      const res = await axiosInstance.post("applications/create", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      toast.success(res.data.message || "Application submitted!");
      setResumeFile(null);
      setCoverLetter("");
    } catch (err) {
      console.error("Apply failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to apply.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Job Details Panel */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8 rounded-3xl shadow-2xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{job.jobTitle}</h2>
            <span className="text-sm text-gray-500">{job.department}</span>
          </div>

          <p className="text-gray-700 mb-6">{job.jobDescription}</p>

          {/* Company Info & Badges */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <img
                src={job.companyLogo?.startsWith("http") ? job.companyLogo : "/logo.png"}
                alt={job.companyInfo}
                className="w-10 h-10 rounded-full border shadow-sm"
              />
              <span className="font-medium text-gray-700">{job.companyInfo}</span>
            </div>
            {job.workMode && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">{job.workMode}</span>
            )}
            {job.location && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">{job.location}</span>
            )}
            {job.salaryRange && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">{job.salaryRange}</span>
            )}
          </div>

          {/* Application Deadline */}
          {job.applicationDeadline && (
            <p className="text-sm text-gray-500 mb-4">
              Apply By: <span className="font-medium">{new Date(job.applicationDeadline).toLocaleDateString()}</span>
            </p>
          )}

          {/* Sections: Responsibilities, Qualifications, Benefits, Contact */}
          {job.responsibilities?.length > 0 && (
            <Section title="Responsibilities">
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.responsibilities.map((task, idx) => (
                  <li key={idx}>{task}</li>
                ))}
              </ul>
            </Section>
          )}

          {(job.qualifications?.essential?.length > 0 || job.qualifications?.preferred?.length > 0) && (
            <Section title="Qualifications">
              {job.qualifications.essential?.length > 0 && (
                <div className="mb-2">
                  <p className="font-medium text-gray-700">Essential:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.qualifications.essential.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.qualifications.preferred?.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700">Preferred:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {job.qualifications.preferred.map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Section>
          )}

          {job.benefits?.length > 0 && (
            <Section title="Benefits">
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </Section>
          )}

          {job.contactInformation && Object.keys(job.contactInformation).length > 0 && (
            <Section title="Contact Information">
              <ul className="text-gray-700 space-y-1">
                {Object.entries(job.contactInformation).map(([key, value]) => (
                  <li key={key}>
                    <span className="capitalize font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {job.applicationInstructions && (
            <Section title="Application Instructions">
              <p className="text-gray-700">{job.applicationInstructions}</p>
            </Section>
          )}
        </Card>
      </div>

      {/* Apply Sidebar Panel */}
      <div className="lg:col-span-1 sticky top-28">
        <Card className="p-6 shadow-2xl rounded-3xl flex flex-col items-center gap-4 border border-gray-200 bg-blue-50">
          <img
            src={job.companyLogo?.startsWith("http") ? job.companyLogo : "/logo.png"}
            alt={job.companyInfo}
            className="w-28 h-28 rounded-full border shadow-sm mb-2"
          />

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              setResumeFile(e.target.files[0]);
              setProfileResumeUrl(null); // override profile resume
            }}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {resumeFile && (
            <p className="text-xs text-gray-600 text-center truncate w-full">
              Selected: {resumeFile.name}
            </p>
          )}

          <textarea
            placeholder="Cover Letter (optional)"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />

          <button
            onClick={handleApply}
            disabled={applying}
            className={`w-full text-white p-2 rounded font-medium transition ${
              applying ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applying ? "Applying..." : "Apply Now"}
          </button>
        </Card>
      </div>
    </div>
  );
}

// Reusable section component with colored header
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2 text-white bg-gray-800 px-3 py-1 rounded">{title}</h3>
    <div className="p-3 bg-gray-50 rounded">{children}</div>
  </div>
);
