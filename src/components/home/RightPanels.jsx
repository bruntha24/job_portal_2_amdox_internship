import React from "react";

// Example images for panels
const resumeImg =
  "https://plus.unsplash.com/premium_photo-1679856789519-790899bcaa09?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const highlightImg =
  "https://plus.unsplash.com/premium_photo-1755994149281-a963270ff219?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI4fHx8ZW58MHx8fHx8";

export default function RightPanels() {
  return (
    <div className="flex flex-col gap-6">
      {/* Resume Panel */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-3xl shadow-lg min-h-[180px] flex flex-col justify-between relative overflow-hidden">
        <div
          className="absolute top-4 right-4 w-24 h-24 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${resumeImg})` }}
        ></div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            We’ve built a resume based on your profile
          </h3>
          <p className="text-sm text-blue-800 mb-2">
            You can further improve its content with the help of AI.
          </p>
          <p className="text-xs text-blue-700">
            Add your skills, experience, and certifications to make your resume stand out to top employers.
          </p>
        </div>
        <button className="self-start mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow">
          View Resume
        </button>
      </div>

      {/* Application Highlight Panel */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-3xl shadow-lg min-h-[180px] flex flex-col justify-between relative overflow-hidden">
        <div
          className="absolute top-4 right-4 w-24 h-24 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${highlightImg})` }}
        ></div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-900">
            Highlight your application and stand out
          </h3>
          <p className="text-sm text-blue-800 mb-2">
            Know more about how to improve your application and get noticed by employers.
          </p>
          <p className="text-xs text-blue-700">
            Personalized tips, AI suggestions, and resume scoring to maximize your chances of landing your dream job.
          </p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow">
            Know More
          </button>
          <span className="text-xs text-gray-500">Paid service by Fastforward</span>
        </div>
      </div>
    </div>
  );
}
