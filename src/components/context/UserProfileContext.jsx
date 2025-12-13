// src/components/context/UserProfileContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance.js";

export const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [company, setCompany] = useState({ logo: "/logo.png" });
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Fetch profile from backend
  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);

    try {
      const token = localStorage.getItem("token");

      // No token → clear profile
      if (!token) {
        setProfile(null);
        setCompany({ logo: "/logo.png" });
        localStorage.removeItem("cachedProfile");
        setLoadingProfile(false);
        return;
      }

      const { data } = await axiosInstance.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        // Ensure avatar/resume always have safe values
        const formattedProfile = {
          ...data,
          avatar: data.avatar || "/logo.png",
          resume: data.resume || null,
        };

        setProfile(formattedProfile);
        setCompany({ logo: formattedProfile.avatar });
        localStorage.setItem("cachedProfile", JSON.stringify(formattedProfile));
      }
    } catch (err) {
      console.error("❌ Profile fetch failed:", err);

      // If token invalid → clear all
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
      }

      setProfile(null);
      setCompany({ logo: "/logo.png" });
      localStorage.removeItem("cachedProfile");
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  // Load cached profile on mount, then fetch fresh
  useEffect(() => {
    const cached = localStorage.getItem("cachedProfile");

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setProfile(parsed);
        setCompany({ logo: parsed.avatar || "/logo.png" });
      } catch {
        localStorage.removeItem("cachedProfile");
      }
    }

    fetchProfile();
  }, [fetchProfile]);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        setProfile,
        company,
        setCompany,
        loadingProfile,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
