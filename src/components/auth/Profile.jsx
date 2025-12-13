// src/components/auth/Profile.jsx
import React, { useEffect, useState, useContext } from "react";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";
import { UserProfileContext } from "../context/UserProfileContext.jsx";
import ProfileUI from "./ProfileUI.jsx";

export default function Profile() {
  const { profile, setProfile, setCompany, loadingProfile, refreshProfile } =
    useContext(UserProfileContext);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    workStatus: "fresher",
    notifications: true,
    avatar: null,
    resume: null,
  });

  // ----------------------------
  // Load profile into form when profile changes
  // ----------------------------
  useEffect(() => {
    if (!profile) return;

    setFormData({
      name: profile.name || "",
      mobile: profile.mobile || "",
      workStatus: profile.workStatus || "fresher",
      notifications: profile.notifications ?? true,
      avatar: null,
      resume: null,
    });

    if (profile.avatar) {
      setCompany({ logo: profile.avatar + "?t=" + Date.now() });
    }
  }, [profile, setCompany]);

  // ----------------------------
  // Load saved jobs once
  // ----------------------------
  useEffect(() => {
    try {
      const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setSavedJobs(jobs);
    } catch {
      setSavedJobs([]);
      localStorage.removeItem("savedJobs");
    }
  }, []);

  // Reset jobToDelete when dialog closes
  useEffect(() => {
    if (!confirmDelete) setJobToDelete(null);
  }, [confirmDelete]);

  // ----------------------------
  // Remove a saved job
  // ----------------------------
  const handleRemoveJob = () => {
    if (!jobToDelete) return;

    const updated = savedJobs.filter((job) => job.id !== jobToDelete);
    setSavedJobs(updated);
    localStorage.setItem("savedJobs", JSON.stringify(updated));

    toast.success("Job removed from saved list!");
    setConfirmDelete(false);
  };

  // ----------------------------
  // Logout
  // ----------------------------
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cachedProfile");
    window.location.href = "/login";
  };

  // ----------------------------
  // Form change handler
  // ----------------------------
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ----------------------------
  // Submit profile update
  // ----------------------------
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if ((key === "avatar" || key === "resume") && !val) return;
        fd.append(key, val);
      });

      const token = localStorage.getItem("token");
      if (!token) throw new Error("Login required to update profile");

      const res = await axiosInstance.put("/users/profile", fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = res.data.user;

      const formatted = {
        ...updatedUser,
        avatar: updatedUser.avatar || "/logo.png",
      };

      setProfile(formatted);
      setCompany({ logo: formatted.avatar + "?t=" + Date.now() });
      localStorage.setItem("cachedProfile", JSON.stringify(formatted));

      // Update form state
      setFormData({
        name: formatted.name || "",
        mobile: formatted.mobile || "",
        workStatus: formatted.workStatus || "fresher",
        notifications: formatted.notifications ?? true,
        avatar: null,
        resume: null,
      });

      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Loading state
  // ----------------------------
  if (loadingProfile) {
    return (
      <div className="text-center mt-20 text-blue-600 font-semibold">
        Loading profile...
      </div>
    );
  }

  const isGuest = !profile;

  return (
    <ProfileUI
      profile={profile}
      editMode={editMode}
      setEditMode={setEditMode}
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      loading={loading}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      handleLogout={handleLogout}
      savedJobs={savedJobs}
      confirmDelete={confirmDelete}
      setConfirmDelete={setConfirmDelete}
      jobToDelete={jobToDelete}
      setJobToDelete={setJobToDelete}
      handleRemoveJob={handleRemoveJob}
      isGuest={isGuest}
    />
  );
}
