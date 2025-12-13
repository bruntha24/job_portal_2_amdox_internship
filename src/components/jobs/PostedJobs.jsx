// src/components/jobs/PostedJobs.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Edit2, Mail, Phone, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export default function PostedJobs({ postedJobs = [], deleteJob, editJob }) {
  const [editJobId, setEditJobId] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [editData, setEditData] = useState({});
  const [confirmJobId, setConfirmJobId] = useState(null);

  const defaultBanner =
    "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg";

  const DEPARTMENTS = ["Frontend", "Backend", "Fullstack", "QA", "Design", "General"];
  const WORK_MODES = ["Remote", "Office", "Hybrid"];
  const LOCATIONS = ["Bengaluru", "Chennai", "Hyderabad", "Pune", "Delhi"];
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const stopPropagation = (e) => e.stopPropagation();

  // --- Safely get logo URL or fallback ---
  const getLogoUrl = (logoPath) => {
    if (!logoPath) return "https://via.placeholder.com/100x100?text=Logo";
    return logoPath.startsWith("http") ? logoPath : `${API_URL}/${logoPath}`;
  };

  const renderField = (fieldData) => {
    if (!fieldData) return "Not specified";
    if (Array.isArray(fieldData)) return fieldData.join(", ");
    if (typeof fieldData === "object") return JSON.stringify(fieldData);
    return fieldData;
  };

  // --- Edit Job ---
  const handleEditClick = (job) => {
    setEditJobId(job._id);
    setExpandedJobId(job._id);
    setEditData({
      jobTitle: job.jobTitle || "",
      location: job.location || "",
      workMode: job.workMode || "",
      department: job.department || "",
      companyType: job.companyType || "",
      jobDescription: job.jobDescription || "",
      responsibilities: Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : job.responsibilities || "",
      companyOverview: job.companyOverview || "",
      companyInfo: job.companyInfo || "",
      contactInformation: {
        email: job.contactInformation?.email || "",
        phone: job.contactInformation?.phone || "",
        website: job.contactInformation?.website || "",
      },
    });
  };

  const handleSaveClick = async (job) => {
    if (!editJob) return;
    try {
      await editJob(editData, job._id);
      toast.success("Job updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    }
    setEditJobId(null);
    setEditData({});
    setExpandedJobId(null);
  };

  // --- Delete Job ---
  const handleDelete = async (job) => {
    if (!deleteJob) return;
    try {
      await deleteJob(job._id);
      toast.success("Job deleted successfully!");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("You are not authorized to delete this job.");
      } else {
        toast.error(err.response?.data?.message || "Failed to delete job");
      }
    } finally {
      setConfirmJobId(null);
    }
  };

  return (
    <div className="mt-12 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img src={defaultBanner} className="w-12 h-12 rounded-xl object-cover shadow-md" alt="Jobs Icon" />
        <h2 className="text-3xl font-bold text-gray-900">Recently Posted Jobs</h2>
      </div>

      {postedJobs.length === 0 ? (
        <p className="text-gray-500 text-sm">No jobs posted yet.</p>
      ) : (
        <div className="space-y-4">
          {postedJobs.map((job) => {
            const isEditing = editJobId === job._id;
            const isExpanded = expandedJobId === job._id;

            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border rounded-xl shadow-sm hover:shadow-md transition bg-white"
              >
                {/* Job Header */}
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => setExpandedJobId(isExpanded ? null : job._id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border rounded-lg overflow-hidden">
                      <img src={getLogoUrl(job.companyLogo)} className="w-full h-full object-cover" alt="logo" />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      {isEditing ? (
                        <input
                          onClick={stopPropagation}
                          value={editData.jobTitle}
                          onChange={(e) => setEditData({ ...editData, jobTitle: e.target.value })}
                          className="border px-2 py-1 rounded text-gray-900 w-full"
                        />
                      ) : (
                        <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle}</h3>
                      )}

                      <div className="flex gap-2 text-gray-600 text-sm">
                        {["location", "workMode", "department"].map((field) =>
                          isEditing ? (
                            <select
                              key={field}
                              value={editData[field]}
                              onClick={stopPropagation}
                              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                              className={`border px-2 py-1 rounded ${field === "department" ? "w-32" : "w-24"}`}
                            >
                              {(field === "location"
                                ? LOCATIONS
                                : field === "workMode"
                                ? WORK_MODES
                                : DEPARTMENTS
                              ).map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span key={field}>{job[field]}</span>
                          )
                        )}
                      </div>

                      <p className="text-gray-500 text-xs">
                        {isEditing ? (
                          <input
                            onClick={stopPropagation}
                            value={editData.companyType}
                            onChange={(e) => setEditData({ ...editData, companyType: e.target.value })}
                            className="border px-2 py-1 rounded w-36"
                          />
                        ) : (
                          `${job.companyType || "N/A"} | Deadline: ${
                            job.applicationDeadline
                              ? new Date(job.applicationDeadline).toLocaleDateString()
                              : "N/A"
                          }`
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        stopPropagation(e);
                        handleEditClick(job);
                      }}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-lg text-sm"
                    >
                      <Edit2 size={16} /> {isEditing ? "Editing" : "Edit"}
                    </button>

                    <button
                      onClick={(e) => {
                        stopPropagation(e);
                        setConfirmJobId(job._id);
                      }}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-lg text-sm"
                    >
                      <Trash2 size={16} /> Delete
                    </button>

                    <button
                      onClick={(e) => {
                        stopPropagation(e);
                        setExpandedJobId(isExpanded ? null : job._id);
                      }}
                      className="p-1"
                    >
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 border-t bg-gray-50 rounded-b-xl text-gray-700 text-sm space-y-3"
                    >
                      {["jobDescription", "responsibilities", "companyOverview", "companyInfo"].map((field) => (
                        <div key={field}>
                          <h4 className="font-semibold text-gray-800">{field.replace(/([A-Z])/g, " $1")}</h4>
                          {isEditing ? (
                            <textarea
                              onClick={stopPropagation}
                              value={editData[field]}
                              onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                              className="w-full border px-2 py-1 rounded"
                              rows={field === "responsibilities" ? 4 : 3}
                            />
                          ) : (
                            <p>{renderField(job[field])}</p>
                          )}
                        </div>
                      ))}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {["email", "phone", "website"].map((field) => (
                          <div key={field} className="flex items-center gap-1">
                            {field === "email" ? <Mail size={14} /> : field === "phone" ? <Phone size={14} /> : <Globe size={14} />}
                            {isEditing ? (
                              <input
                                onClick={stopPropagation}
                                value={editData.contactInformation?.[field]}
                                onChange={(e) =>
                                  setEditData({
                                    ...editData,
                                    contactInformation: { ...editData.contactInformation, [field]: e.target.value },
                                  })
                                }
                                className="border px-2 py-1 rounded w-full"
                              />
                            ) : (
                              <span>{job.contactInformation?.[field] || "Not provided"}</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {isEditing && (
                        <div className="flex justify-end">
                          <button
                            onClick={(e) => {
                              stopPropagation(e);
                              handleSaveClick(job);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {confirmJobId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-8 rounded-2xl w-[350px] shadow-2xl"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Delete Job?</h3>
              <p className="text-gray-700 mb-6">Are you sure you want to delete this job posting?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmJobId(null)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(postedJobs.find((j) => j._id === confirmJobId))}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
