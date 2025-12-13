// src/components/home/TopCompanyJobs.jsx
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Example data: companies with jobs
const companyJobs = [
  {
    company: "Google",
    logo: "https://www.nichemarket.co.za/wp-content/uploads/2017/08/google-amp-fast-speed-travel-ss-1920.jpg",
    role: "Software Engineer",
    rating: 4.5,
    location: "Mountain View, CA",
    posted: "1d ago",
  },
  {
    company: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    role: "Product Manager",
    rating: 4.3,
    location: "Redmond, WA",
    posted: "3h ago",
  },
  {
    company: "Apple",
    logo: "https://logo.clearbit.com/apple.com",
    role: "UI/UX Designer",
    rating: 4.6,
    location: "Cupertino, CA",
    posted: "2d ago",
  },
  {
    company: "Amazon",
    logo: "https://thumbs.dreamstime.com/b/logo-brand-amazon-american-international-commerce-company-logo-brand-amazon-american-international-commerce-company-209364080.jpg",
    role: "Cloud Solutions Architect",
    rating: 4.2,
    location: "Seattle, WA",
    posted: "5h ago",
  },
  {
    company: "Facebook",
    logo: "https://img.freepik.com/premium-photo/3d-illustration-rendering-facebook-logo-color-blue-background_489925-73.jpg",
    role: "Data Scientist",
    rating: 4.4,
    location: "Menlo Park, CA",
    posted: "1d ago",
  },
  {
    company: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    role: "Frontend Engineer",
    rating: 4.3,
    location: "Los Gatos, CA",
    posted: "2d ago",
  },
  {
    company: "Tesla",
    logo: "https://logo.clearbit.com/tesla.com",
    role: "Mechanical Engineer",
    rating: 4.5,
    location: "Palo Alto, CA",
    posted: "3h ago",
  },
  {
    company: "Adobe",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Adobe-Emblem.png",
    role: "UX Researcher",
    rating: 4.6,
    location: "San Jose, CA",
    posted: "1d ago",
  },
];

export default function TopCompanyJobs() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 border-[0.5px] rounded-2xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Top Companies & Jobs</h3>
        <button className="text-blue-600 text-sm hover:underline">View all</button>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-4 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 scroll-smooth"
        >
          {companyJobs.map((job, idx) => (
            <div
              key={idx}
              className="min-w-[220px] bg-blue-50 rounded-2xl p-4 shadow-md hover:shadow-lg transition flex flex-col items-center relative"
            >
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 object-contain mb-2 rounded-full"
              />
              <h4 className="font-semibold text-center text-gray-800">{job.role}</h4>
              <p className="text-sm text-gray-600 text-center">{job.company}</p>
              <div className="flex justify-between mt-2 w-full text-xs text-gray-500">
                <span>Rating: {job.rating}</span>
                <span>{job.location}</span>
              </div>
              <span className="mt-2 text-xs text-gray-400">{job.posted}</span>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style jsx>{`
        /* Subtle scrollbar */
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #93c5fd;
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #eff6ff;
        }
      `}</style>
    </div>
  );
}
