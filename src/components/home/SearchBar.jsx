// src/components/jobs/SearchBar.jsx
import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <input
        type="text"
        className="flex-1 p-3 outline-none"
        placeholder="Search jobs by title or company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch && onSearch()}
      />
      <button
        onClick={() => onSearch && onSearch()}
        className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
}
