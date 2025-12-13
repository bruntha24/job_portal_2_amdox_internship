// src/components/home/RecommendedJobs.jsx
import React, { useRef } from "react";

const recommendedJobs = [
  {
    company: "QSpiders",
    role: "Student Counsellor",
    rating: 3.8,
    location: "Rajasthan",
    posted: "2d ago",
    logo: "https://plus.unsplash.com/premium_photo-1679826780040-c48444660e21?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    company: "Hinduja Tech",
    role: "Graduate Engineer Trainee",
    rating: 3.2,
    location: "Chennai (OMR)",
    posted: "16h ago",
    logo: "https://plus.unsplash.com/premium_photo-1668902221386-91f5588d309c?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    company: "eTeam Inc",
    role: "Associate US Recruiter For SheTeam Program",
    rating: 4.0,
    location: "Remote",
    posted: "1d ago",
    logo: "https://plus.unsplash.com/premium_photo-1675333737177-88b001e32bfa?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    company: "Infosys",
    role: "Software Engineer",
    rating: 4.2,
    location: "Bangalore",
    posted: "3d ago",
    logo: "https://plus.unsplash.com/premium_photo-1667354097023-4b8d9c3f7767?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function RecommendedJobs() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 max-w-4xl mx-auto">
        <h3 className="text-md font-medium">Recommended jobs for you</h3>
        <button className="text-blue-600 text-xs hover:underline">View all</button>
      </div>

      {/* Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-200 transition"
        >
          &#8592;
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-blue-200 transition"
        >
          &#8594;
        </button>

        {/* Job Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto px-4 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100"
          style={{ scrollbarWidth: "thin" }}
        >
          {recommendedJobs.map((job, idx) => (
            <div
              key={idx}
              className="min-w-[260px] bg-blue-50 border border-blue-200 rounded-lg shadow-sm hover:shadow-md transition-all p-4 flex-shrink-0"
            >
              <div className="flex items-center mb-3">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-8 h-8 rounded-full mr-3 object-cover border"
                />
                <h4 className="font-semibold text-sm">{job.role}</h4>
              </div>
              <p className="text-xs text-blue-800 mb-1">{job.company}</p>
              <div className="flex justify-between text-[10px] text-blue-600">
                <span>Rating: {job.rating}</span>
                <span>{job.location}</span>
              </div>
              <div className="mt-2 text-right text-[10px] text-blue-400">{job.posted}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

