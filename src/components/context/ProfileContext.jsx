import React, { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance.js";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [company, setCompany] = useState(() => {
    const stored = localStorage.getItem("employeeCompany");
    return stored ? JSON.parse(stored) : {};
  });
  const [loading, setLoading] = useState(true);

  const fetchCompanyProfile = useCallback(async () => {
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      setCompany({});
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.get("/companies/me");
      setCompany(data.company || {});
      localStorage.setItem("employeeCompany", JSON.stringify(data.company || {}));
    } catch (err) {
      console.error("Failed to fetch company profile:", err);
      toast.error(err.response?.data?.message || "Failed to load company profile");
      setCompany({});
      localStorage.removeItem("employeeCompany");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyProfile();

    const handleStorage = () => fetchCompanyProfile();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [fetchCompanyProfile]);

  return (
    <ProfileContext.Provider value={{ company, setCompany, loading, fetchCompanyProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
