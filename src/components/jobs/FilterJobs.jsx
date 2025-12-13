import React from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FilterJobs({
  departmentFilter,
  setDepartmentFilter,
  workModeFilter,
  setWorkModeFilter,
  locationFilter,
  setLocationFilter,
  salaryFilter,
  setSalaryFilter,
  resetFilters,
  filters = {},
}) {
  const handleChange = (category, value) => {
    const cat = category.toLowerCase();
    if (cat.includes("department")) setDepartmentFilter(value);
    else if (cat.includes("work")) setWorkModeFilter(value);
    else if (cat.includes("location")) setLocationFilter(value);
    else if (cat.includes("salary")) setSalaryFilter(value);
  };

  const getValue = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("department")) return departmentFilter;
    if (cat.includes("work")) return workModeFilter;
    if (cat.includes("location")) return locationFilter;
    if (cat.includes("salary")) return salaryFilter;
    return "";
  };

  const showOthers = (category) =>
    ["department", "workmode"].includes(category.toLowerCase());

  return (
    <div className="bg-blue-100 border border-blue-400 rounded-2xl p-3 shadow-md space-y-4 w-full">
      {/* RESET BUTTON */}
      <div className="flex justify-end">
        <Button
          onClick={resetFilters}
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-3 py-1 flex items-center gap-1 shadow-sm text-xs h-7"
        >
          <RotateCcw size={14} /> Reset
        </Button>
      </div>

      {/* FILTERS */}
      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className="space-y-1">
          <h3 className="font-semibold text-blue-900 text-sm">{category}</h3>

          <RadioGroup
            value={getValue(category)}
            onValueChange={(value) => handleChange(category, value)}
            className="flex flex-col gap-2"
            aria-label={`Filter by ${category}`}
          >
            {options.map((opt) => (
              <label
                key={opt}
                htmlFor={`${category}-${opt}`}
                className="flex items-center gap-2 bg-white border border-blue-300 rounded-lg px-3 py-1 cursor-pointer transition hover:shadow-md hover:bg-blue-50"
              >
                <RadioGroupItem
                  value={opt}
                  id={`${category}-${opt}`}
                  className="h-4 w-4"
                />
                <span className="text-blue-800 font-medium text-xs">{opt}</span>
              </label>
            ))}

            {showOthers(category) && (
              <label
                key="Others"
                htmlFor={`${category}-Others`}
                className="flex items-center gap-2 bg-white border border-blue-300 rounded-lg px-3 py-1 cursor-pointer transition hover:shadow-md hover:bg-blue-50"
              >
                <RadioGroupItem
                  value="Others"
                  id={`${category}-Others`}
                  className="h-4 w-4"
                />
                <span className="text-blue-800 font-medium text-xs">Others</span>
              </label>
            )}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
