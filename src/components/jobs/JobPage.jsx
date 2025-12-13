// src/components/jobs/JobPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  CalendarDays,
  Mail,
  FileText,
  Info,
} from "lucide-react";

export default function JobPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const backendURL =
          import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${backendURL}/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("employeeToken")}`,
          },
        });
        const data = await res.json();
        if (data.success) setJob(data.job);
      } catch (err) {
        console.error("Failed to fetch job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading)
    return <p className="text-center mt-20">Loading job details...</p>;
  if (!job)
    return (
      <p className="text-center mt-20 text-red-600">Job not found</p>
    );

  const postedDate = job.postedOn
    ? new Date(job.postedOn).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Unknown";
  const deadline = job.applicationDeadline
    ? new Date(job.applicationDeadline).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not specified";

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="p-6 rounded-2xl shadow-lg flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <img
            src={job.companyLogo || "https://via.placeholder.com/80"}
            alt={job.companyInfo}
            className="w-20 h-20 rounded border object-cover"
          />
          <div className="flex-1 flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-blue-700">
              {job.jobTitle}
            </h1>
            <p className="text-gray-600">{job.companyInfo}</p>
            <div className="flex flex-wrap gap-3 mt-1 text-gray-700 text-sm">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" /> {job.workMode || "Full-Time"}
              </span>
              <span className="flex items-center gap-1">
                <IndianRupee className="w-4 h-4" /> {job.salaryRange || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" /> {job.location}
              </span>
              <span className="flex items-center gap-1 text-red-600">
                <CalendarDays className="w-4 h-4" /> {deadline}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {job.department && (
                <Badge className="bg-blue-100 text-blue-800 text-sm">
                  {job.department}
                </Badge>
              )}
              {job.workMode && (
                <Badge className="bg-gray-100 text-gray-700 text-sm">
                  {job.workMode}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 md:mt-0">
            <Button
              className="px-4 py-2"
              onClick={() => alert("Apply action here")}
            >
              Apply
            </Button>
          </div>
        </div>

        {/* DESCRIPTION & DETAILS */}
        <div className="flex flex-col gap-4 text-gray-700 text-sm">
          {job.jobDescription && (
            <p className="flex gap-2 items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />{" "}
              {job.jobDescription}
            </p>
          )}

          {job.companyOverview && (
            <p className="flex gap-2 items-start">
              <FileText className="w-5 h-5 text-green-600 mt-0.5" />{" "}
              {job.companyOverview}
            </p>
          )}

          {job.benefits?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Benefits:</h3>
              <ul className="list-disc list-inside">
                {job.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requiredDocuments?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">
                Required Documents:
              </h3>
              <ul className="list-disc list-inside">
                {job.requiredDocuments.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {job.contactInformation && (
            <div className="flex flex-col gap-1 text-blue-600">
              <h3 className="font-semibold text-gray-700 mb-1">Contact:</h3>
              {job.contactInformation.email && (
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 mt-0.5" /> {job.contactInformation.email}
                </p>
              )}
              {job.contactInformation.phone && (
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 mt-0.5" /> {job.contactInformation.phone}
                </p>
              )}
              {job.contactInformation.website && (
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5 mt-0.5" /> {job.contactInformation.website}
                </p>
              )}
            </div>
          )}
        </div>

        {/* RESPONSIBILITIES & QUALIFICATIONS */}
        <div className="flex flex-col gap-4">
          {job.responsibilities?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Responsibilities:</h3>
              <ul className="list-disc list-inside">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {job.qualifications?.essential?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">
                Essential Qualifications:
              </h3>
              <ul className="list-disc list-inside">
                {job.qualifications.essential.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {job.qualifications?.preferred?.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">
                Preferred Qualifications:
              </h3>
              <ul className="list-disc list-inside">
                {job.qualifications.preferred.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
