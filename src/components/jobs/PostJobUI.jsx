// src/components/jobs/PostJobUI.jsx
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";

export default function PostJobUI({
  jobData,
  handleChange,
  handleContactChange,
  handleFileChange,
  handleSubmit,
  loading,
  filters,
}) {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">

        {/* LEFT PANEL */}
        <div className="md:w-1/4 flex flex-col justify-between bg-gradient-to-br from-yellow-50 via-white/60 to-yellow-100 border border-yellow-200 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
          <div className="space-y-4 text-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80"
              alt="Career Growth"
              className="w-24 h-24 object-cover rounded-full shadow-md mx-auto"
            />
            <h2 className="text-xl font-bold text-gray-800">Hire Top Talent</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Post your job and attract the best candidates quickly.
            </p>
            <p className="text-yellow-600 font-semibold italic text-sm">
              "Connecting Dreams with Opportunities"
            </p>
            <p className="text-gray-500 text-xs mt-2 leading-relaxed">
              Join thousands of companies finding their next star employees here.
            </p>
          </div>

          <div className="space-y-3 mt-6">
            {[
              "Discover qualified candidates faster",
              "Save time on recruitment",
              "Reach top talent across industries",
              "Easy management of job postings",
              "Boost your employer brand",
              "Flexible posting options",
              "Attract candidates globally",
              "Track applications effortlessly",
              "Highlight company culture",
            ].map((slogan, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-gray-700 text-sm font-medium hover:text-yellow-600 transition"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <span>{slogan}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="hidden md:block w-[2px] bg-gradient-to-b from-yellow-300 via-white to-yellow-300 rounded"></div>

        {/* RIGHT PANEL */}
        <div className="md:w-3/4 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 text-left">
                Post a New Job
              </CardTitle>
              <p className="text-gray-500 mt-1 text-sm">
                Fill the job details below to publish a new job listing.
              </p>
            </CardHeader>

            <form onSubmit={handleSubmit} className="space-y-10 mt-6">

              {/* BASIC DETAILS */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Basic Details</h3>
                <Separator className="mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      name="jobTitle"
                      value={jobData.jobTitle}
                      onChange={handleChange}
                      className="h-14 text-base leading-6"
                      placeholder="Enter job title"
                      required
                    />
                  </div>

                  {/* Department with "Others" option */}
                  <div>
                    <Label>Department</Label>
                    <select
                      name="department"
                      value={jobData.department}
                      onChange={handleChange}
                      className="border p-3 rounded-lg w-full h-14 text-base leading-6"
                    >
                      {filters.Department.map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                      ))}
                      <option value="Others">Others</option>
                    </select>

                    {jobData.department === "Others" && (
                      <Input
                        name="department"
                        value={jobData.departmentCustom || ""}
                        onChange={handleChange}
                        placeholder="Type your department using _ (underscore)"
                        className="mt-2 h-14 text-base leading-6"
                      />
                    )}
                  </div>

                  {/* Location with "Others" option */}
                  <div>
                    <Label>Location</Label>
                    <select
                      name="location"
                      value={jobData.location}
                      onChange={handleChange}
                      className="border p-3 rounded-lg w-full h-14 text-base leading-6"
                    >
                      {filters.Location.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                      <option value="Others">Others</option>
                    </select>

                    {jobData.location === "Others" && (
                      <Input
                        name="locationCustom"
                        value={jobData.locationCustom || ""}
                        onChange={handleChange}
                        placeholder="Type your location using _ (underscore)"
                        className="mt-2 h-14 text-base leading-6"
                      />
                    )}
                  </div>

                  {/* Work Mode with "Others" option */}
                  <div>
                    <Label>Work Mode</Label>
                    <select
                      name="workMode"
                      value={jobData.workMode}
                      onChange={handleChange}
                      className="border p-3 rounded-lg w-full h-14 text-base leading-6"
                    >
                      {filters.WorkMode.map((mode) => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                      <option value="Others">Others</option>
                    </select>

                    {jobData.workMode === "Others" && (
                      <Input
                        name="workModeCustom"
                        value={jobData.workModeCustom || ""}
                        onChange={handleChange}
                        placeholder="Type work mode using _ (underscore)"
                        className="mt-2 h-14 text-base leading-6"
                      />
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label>Salary Range</Label>
                    <Input
                      name="salaryRange"
                      value={jobData.salaryRange}
                      onChange={handleChange}
                      className="h-14 text-base leading-6"
                      placeholder="e.g., 5,00,000 - 8,00,000"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label>Last Date to Apply</Label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={jobData.applicationDeadline}
                      onChange={handleChange}
                      className="w-full h-14 px-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all text-base leading-6"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* JOB DESCRIPTION */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Job Description</h3>
                <Separator className="mb-4" />
                <Textarea
                  name="jobDescription"
                  value={jobData.jobDescription}
                  onChange={handleChange}
                  className="min-h-[120px] rounded-lg text-base leading-6"
                  placeholder="Describe the job role..."
                />
              </section>

              {/* RESPONSIBILITIES */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Responsibilities</h3>
                <Separator className="mb-4" />
                <Textarea
                  name="responsibilities"
                  value={jobData.responsibilities}
                  onChange={handleChange}
                  className="min-h-[100px] rounded-lg text-base leading-6"
                  placeholder="One per line..."
                />
              </section>

              {/* QUALIFICATIONS */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Qualifications</h3>
                <Separator className="mb-4" />
                <Textarea
                  name="qualifications"
                  value={jobData.qualifications}
                  onChange={handleChange}
                  className="min-h-[120px] rounded-lg text-base leading-6"
                  placeholder="Essential first, then Preferred..."
                />
              </section>

              {/* COMPANY DETAILS */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Company Details</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Company Type</Label>
                    <select
                      name="companyType"
                      value={jobData.companyType}
                      onChange={handleChange}
                      className="border p-3 rounded-lg w-full h-14 text-base leading-6"
                    >
                      {filters.CompanyType.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Company Logo</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="h-14 text-base leading-6"
                    />
                  </div>

                  <div>
                    <Label>Company Overview</Label>
                    <Textarea
                      name="companyOverview"
                      value={jobData.companyOverview}
                      onChange={handleChange}
                      className="min-h-[100px] rounded-lg text-base leading-6"
                    />
                  </div>

                  <div>
                    <Label>Company Info</Label>
                    <Input
                      name="companyInfo"
                      value={jobData.companyInfo}
                      onChange={handleChange}
                      className="h-14 text-base leading-6"
                    />
                  </div>
                </div>
              </section>

              {/* CONTACT INFORMATION */}
              <section>
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label>Email</Label>
                    <Input
                      name="email"
                      value={jobData.contactInformation.email}
                      onChange={handleContactChange}
                      className="h-14 text-base leading-6"
                    />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input
                      name="phone"
                      value={jobData.contactInformation.phone}
                      onChange={handleContactChange}
                      className="h-14 text-base leading-6"
                    />
                  </div>

                  <div>
                    <Label>Website</Label>
                    <Input
                      name="website"
                      value={jobData.contactInformation.website}
                      onChange={handleContactChange}
                      className="h-14 text-base leading-6"
                    />
                  </div>
                </div>
              </section>

              {/* SUBMIT */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="px-8 py-3 rounded-xl text-lg shadow-md"
                >
                  {loading ? "Posting..." : "Post Job"}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
