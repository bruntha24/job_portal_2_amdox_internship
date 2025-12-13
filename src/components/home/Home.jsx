// src/components/home/Home.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../context/UserProfileContext.jsx";
import { ProfileContext } from "../context/ProfileContext.jsx";
import SearchBar from "../jobs/SearchBar.jsx";
import RecommendedJobs from "./RecommendedJobs.jsx";
import RightPanels from "./RightPanels.jsx";
import TopCompanies from "./TopCompanies.jsx";
import BlogsCard from "./BlogsCard.jsx";
import ChatAI from "./ChatAI.jsx";

export default function Home() {
  const { profile, loadingProfile } = useContext(UserProfileContext);
  const { company } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const guestAvatar =
    "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0";

  const isEmployee = !!company && Object.keys(company).length > 0;
  const displayName = isEmployee ? company.name : profile?.name || "Guest";
  const displayAvatar = isEmployee ? company.avatar : profile?.avatar || guestAvatar;

  const topSlogans = isEmployee
    ? ["Innovation First", "Empowering Teams", "Shaping the Future"]
    : ["Dream Big", "Your Career, Your Future", "Never Stop Learning"];

  const bottomSlogans = isEmployee
    ? ["Lead with Vision", "Make an Impact", "Inspire Growth"]
    : ["Explore Opportunities", "Enhance Skills", "Achieve Goals"];

  const finalSlogans = isEmployee
    ? [
        "Deliver Excellence",
        "Build Smarter",
        "Grow Every Day",
        "Lead with Purpose",
        "Empower Your Team",
        "Progress Over Perfection",
      ]
    : [
        "Stay Motivated",
        "Keep Improving",
        "Success Awaits",
        "Believe in Yourself",
        "Opportunities Everywhere",
        "One Step at a Time",
      ];

  const displayDescription = isEmployee
    ? "Manage your company's jobs and profile here."
    : "Explore job opportunities and enhance your career.";

  if (loadingProfile) {
    return (
      <div className="text-center mt-20 text-blue-600 font-semibold">
        Loading...
      </div>
    );
  }

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-100 flex flex-col">
      <div className="flex w-full gap-4 px-2 py-6">

        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-blue-900 text-white p-3 flex flex-col items-center shadow-lg rounded-xl justify-between">

          {/* Profile Box */}
          <div className="flex flex-col items-center mb-4 bg-blue-800 p-3 rounded-lg w-full">

            {/* Top Slogans */}
            <div className="flex flex-col items-center mb-2 space-y-1">
              {topSlogans.map((s, i) => (
                <p key={i} className="text-xs font-semibold text-yellow-300 text-center">
                  {s}
                </p>
              ))}
            </div>

            {/* Avatar */}
            <img
              src={displayAvatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full mb-2 object-cover border-2 border-yellow-400 shadow-md"
            />

            {/* Name */}
            <h2 className="text-lg font-bold">{displayName}</h2>

            {/* Description */}
            <p className="text-xs text-blue-200 text-center mt-1">
              {displayDescription}
            </p>

            {/* Bottom Slogans */}
            <div className="flex flex-col items-center mt-2 space-y-1">
              {bottomSlogans.map((s, i) => (
                <p key={i} className="text-xs font-medium text-yellow-400 text-center">
                  {s}
                </p>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2 w-full mb-4">
            <a href="/jobs" className="hover:text-yellow-400 transition">Jobs</a>
            <a href="/career-insights" className="hover:text-yellow-400 transition">Career Insights</a>
            <a href="/profile" className="hover:text-yellow-400 transition">Profile</a>

            {isEmployee && (
              <>
                <a href="/employee-dashboard" className="hover:text-yellow-400 transition">Dashboard</a>
                <a href="/employee/post-job" className="hover:text-yellow-400 transition">Post Job</a>
              </>
            )}
          </nav>

          {/* Final Slogans + Image */}
          <div className="mt-auto flex flex-col items-center space-y-1 pt-3 border-t border-blue-700 w-full pb-4">
            {finalSlogans.map((s, i) => (
              <p key={i} className="text-xs text-yellow-300 font-semibold text-center leading-tight">
                {s}
              </p>
            ))}

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&q=80"
              alt="Motivation"
              className="w-28 h-20 object-cover rounded-lg mt-2 shadow-md border border-yellow-400"
            />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col gap-4 items-center">

          <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-[900px]">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
            />
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-[900px]">
            <RecommendedJobs />
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-[900px]">
            <RightPanels />
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-[900px]">
            <TopCompanies />
          </div>

          <div className="p-4 bg-white rounded-xl shadow-md w-full max-w-[900px]">
            <BlogsCard />
          </div>

        </main>
      </div>

      {/* Floating AI Chat Only */}
      <ChatAI />
    </div>
  );
}
