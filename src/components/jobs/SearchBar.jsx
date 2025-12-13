// src/components/jobs/SearchBar.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full mb-4">
      <Search className="absolute left-3 top-2.5 text-blue-600" size={18} />
      <Input
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 h-10 rounded-lg border border-blue-300 shadow-sm text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
