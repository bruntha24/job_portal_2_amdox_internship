import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  PencilIcon,
  CheckIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { ProfileContext } from "../context/ProfileContext.jsx";

export default function EmployeeProfile() {
  const { company, setCompany: setGlobalCompany } = useContext(ProfileContext);
  const [editingField, setEditingField] = useState("");
  const [tempValue, setTempValue] = useState("");
  const token = localStorage.getItem("employeeToken");

  // FIXED: Start empty — profile loads async
  const [localCompany, setLocalCompany] = useState({});

  // Sync when global context updates
  useEffect(() => {
    setLocalCompany(company);
  }, [company]);

  // Make sure fields never break UI even if undefined
  const safeCompany = {
    name: localCompany.name || "",
    email: localCompany.email || "",
    description: localCompany.description || "",
    location: localCompany.location || "",
    website: localCompany.website || "",
    phone: localCompany.phone || "",
    logo: localCompany.logo || "",
  };

  // Detect correct image URL (Cloudinary or Local)
  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `http://localhost:5000/${path}`;
  };

  const handleFieldEdit = (field) => {
    setEditingField(field);
    setTempValue(safeCompany[field] || "");
  };

  const handleFieldChange = (e) => {
    setTempValue(e.target.value);
  };

  const saveField = async (field) => {
    try {
      const form = new FormData();
      form.append(field, tempValue);

      const { data } = await axios.put(
        "http://localhost:5000/api/companies/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLocalCompany(data.company);
      setGlobalCompany(data.company);

      setEditingField("");
      toast.success(`${field} updated successfully`);
    } catch (err) {
      toast.error("Failed to update field");
    }
  };

  // Upload logo to Cloudinary
  const handleLogoChange = async (e) => {
    try {
      const form = new FormData();
      form.append("logo", e.target.files[0]);

      const { data } = await axios.put(
        "http://localhost:5000/api/companies/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLocalCompany(data.company);
      setGlobalCompany(data.company);

      toast.success("Logo updated successfully!");
    } catch (err) {
      toast.error("Failed to update logo");
    }
  };

  const fields = [
    { key: "name", label: "Company Name", icon: <BuildingOfficeIcon className="w-5 h-5 text-indigo-500" /> },
    { key: "email", label: "Email", icon: <EnvelopeIcon className="w-5 h-5 text-indigo-500" /> },
    { key: "description", label: "Description", icon: <GlobeAltIcon className="w-5 h-5 text-indigo-500" /> },
    { key: "location", label: "Location", icon: <MapPinIcon className="w-5 h-5 text-indigo-500" /> },
    { key: "website", label: "Website", icon: <GlobeAltIcon className="w-5 h-5 text-indigo-500" /> },
    { key: "phone", label: "Phone", icon: <PhoneIcon className="w-5 h-5 text-indigo-500" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 min-h-screen gap-6">

      {/* Left Panel */}
      <div className="md:w-1/4 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center gap-6">

        {/* Avatar */}
        <Avatar className="w-28 h-28 shadow-xl ring-2 ring-indigo-500 cursor-pointer">
          {safeCompany.logo ? (
            <AvatarImage src={getImageUrl(safeCompany.logo)} />
          ) : (
            <AvatarFallback>👔</AvatarFallback>
          )}
        </Avatar>

        <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
          <PencilIcon className="w-5 h-5" />
          <span>Update Logo</span>
          <input type="file" className="hidden" onChange={handleLogoChange} />
        </label>

        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">
            {safeCompany.name || "Your Company"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">Click any field to edit.</p>
        </div>

        {/* Field list */}
        <div className="flex flex-col w-full gap-3 mt-4">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-indigo-600 transition-all"
              onClick={() => handleFieldEdit(field.key)}
            >
              {field.icon}
              <span className="text-sm">{field.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="md:w-3/4">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-3xl font-bold text-indigo-700 text-center">
              Edit Company Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                
                <span className="w-32 font-semibold text-gray-700">{field.label}:</span>

                {editingField === field.key ? (
                  field.key === "description" ? (
                    <Textarea
                      value={tempValue}
                      onChange={handleFieldChange}
                      onBlur={() => saveField(field.key)}
                      onKeyDown={(e) => e.key === "Enter" && saveField(field.key)}
                      className="flex-1 border-indigo-300 shadow-sm rounded-lg p-2"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={tempValue}
                        onChange={handleFieldChange}
                        onBlur={() => saveField(field.key)}
                        onKeyDown={(e) => e.key === "Enter" && saveField(field.key)}
                        className="flex-1 border-indigo-300 shadow-sm rounded-lg"
                        autoFocus
                      />
                      <Button size="sm" variant="outline" onClick={() => saveField(field.key)}>
                        <CheckIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-gray-600">{safeCompany[field.key] || "-"}</span>
                    <PencilIcon
                      className="w-5 h-5 text-gray-400 cursor-pointer hover:text-indigo-500 transition-all"
                      onClick={() => handleFieldEdit(field.key)}
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex justify-center pt-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-full px-6 py-2">
              Save All Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
