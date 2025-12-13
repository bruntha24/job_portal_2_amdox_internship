import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import FilterJobs from "./FilterJobs.jsx";
import LatestJobCard from "./LatestJobCard.jsx";
import JobHeading from "./JobHeading.jsx";
import SearchBar from "./SearchBar.jsx";
import Advertisement from "./Advertisement.jsx";

// Format normal dates
const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  try {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Unknown date";
  }
};

// Extract date from MongoDB ObjectID
const getDateFromObjectId = (id) => {
  if (!id) return "Unknown date";
  try {
    const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
    return new Date(timestamp).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Unknown date";
  }
};

// Logo fallback
const getCompanyLogo = (job) =>
  job.companyLogo?.startsWith("http") ? job.companyLogo : "/logo.png";

export default function Jobs() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialSearch = query.get("search") || "";

  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [workModeFilter, setWorkModeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filters = {
    WorkMode: ["Remote", "Hybrid", "Office"],
    Department: ["Frontend", "Backend", "Fullstack", "QA", "Design"],
    Salary: ["0-3 Lakhs", "3-6 Lakhs", "6-10 Lakhs", "10-15 Lakhs"],
    Location: ["Bengaluru", "Chennai", "Hyderabad", "Pune", "Delhi"],
  };

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Fetch jobs from public API
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${api}/jobs`);
      const data = await res.json();

      if (Array.isArray(data.jobs)) {
        const formatted = data.jobs.map((job) => ({
          id: job._id,
          jobTitle: job.jobTitle || "Untitled Job",
          location: job.location || "Not specified",
          companyName: job.companyInfo?.name || job.companyInfo || "Company",
          companyLogo: getCompanyLogo(job),
          salaryRange: job.salaryRange || "Not specified",
          department: job.department || "General",
          workMode: job.workMode || "Full-Time",
          postedOn: job.postedOn
            ? formatDate(job.postedOn)
            : getDateFromObjectId(job._id),
          lastDate: formatDate(job.applicationDeadline),
        }));
        setPostedJobs(formatted);
      } else {
        setPostedJobs([]);
      }
    } catch (err) {
      console.error("❌ Failed to load jobs:", err);
      setPostedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filter logic
  const filteredJobs = useMemo(() => {
    const searchLower = search.toLowerCase();

    return postedJobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower);

      const matchesDepartment = departmentFilter
        ? job.department.toLowerCase() === departmentFilter.toLowerCase()
        : true;

      const matchesWorkMode = workModeFilter
        ? job.workMode.toLowerCase() === workModeFilter.toLowerCase()
        : true;

      const matchesLocation = locationFilter
        ? job.location.toLowerCase() === locationFilter.toLowerCase()
        : true;

      let matchesSalary = true;
      if (salaryFilter && job.salaryRange.includes("-")) {
        const [min, max] = salaryFilter.replace(" Lakhs", "").split("-").map(Number);
        const [jobMin, jobMax] = job.salaryRange
          .replace(" Lakhs", "")
          .split("-")
          .map(Number);

        matchesSalary = jobMax >= min && jobMin <= max;
      }

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesWorkMode &&
        matchesLocation &&
        matchesSalary
      );
    });
  }, [
    postedJobs,
    search,
    departmentFilter,
    workModeFilter,
    locationFilter,
    salaryFilter,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSearch("");
    setDepartmentFilter("");
    setWorkModeFilter("");
    setLocationFilter("");
    setSalaryFilter("");
  };

  return (
    <div className="flex flex-col lg:flex-row container mx-auto py-6 px-4 gap-6">
      {/* Mobile Filters */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {showMobileFilters && (
          <div className="mt-4 bg-blue-50 border border-blue-400 rounded-3xl p-4 shadow-lg">
            <FilterJobs
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              workModeFilter={workModeFilter}
              setWorkModeFilter={setWorkModeFilter}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              salaryFilter={salaryFilter}
              setSalaryFilter={setSalaryFilter}
              resetFilters={resetFilters}
              filters={filters}
            />
          </div>
        )}
      </div>

      {/* Sidebar Filters (Desktop) */}
      <div className="hidden lg:flex lg:w-1/4 flex-col gap-6 sticky top-20">
        <JobHeading />
        <div className="bg-blue-50 border border-blue-400 rounded-3xl p-6 shadow-lg">
          <FilterJobs
            departmentFilter={departmentFilter}
            setDepartmentFilter={setDepartmentFilter}
            workModeFilter={workModeFilter}
            setWorkModeFilter={setWorkModeFilter}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            salaryFilter={salaryFilter}
            setSalaryFilter={setSalaryFilter}
            resetFilters={resetFilters}
            filters={filters}
          />
        </div>
        <Advertisement />
      </div>

      {/* Jobs Listing */}
      <div className="flex-1 flex flex-col gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="bg-blue-50 border border-blue-400 rounded-3xl p-4 shadow-lg flex flex-col gap-4">
          {loading ? (
            <p className="text-center text-gray-600">Loading jobs...</p>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="transition-all duration-300 hover:scale-[1.01] hover:shadow-xl rounded-2xl"
              >
                <LatestJobCard job={job} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No jobs found</p>
          )}
        </div>

        {/* Mobile Advertisement */}
        <div className="lg:hidden mt-4">
          <Advertisement />
        </div>
      </div>
    </div>
  );
}
