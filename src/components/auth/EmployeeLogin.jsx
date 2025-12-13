// src/components/auth/EmployeeLogin.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { BuildingOfficeIcon, BriefcaseIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { ProfileContext } from "../context/ProfileContext.jsx";
import axiosInstance from "../../utils/axiosInstance.js";

export default function EmployeeLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setCompany } = useContext(ProfileContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return toast.error("Email and password are required");
    }

    setLoading(true);

    try {
      const payload = { email: trimmedEmail, password: trimmedPassword };
      const { data } = await axiosInstance.post("/companies/login", payload);

      if (!data.token) {
        throw new Error("Login failed: no token returned");
      }

      // Save token & company info in localStorage
      localStorage.setItem("employeeToken", data.token);
      localStorage.setItem("employeeCompany", JSON.stringify(data.company));

      // Update context immediately
      setCompany(data.company);

      toast.success("Login successful!");
      navigate("/employee/post-job", { replace: true });
    } catch (err) {
      console.error("[Login Error]:", err.response || err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Check credentials or server.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Info Panel */}
      <div className="hidden md:flex w-1/3 bg-blue-600 text-white flex-col justify-center items-center p-8 space-y-4 rounded-l-3xl shadow-lg">
        <BuildingOfficeIcon className="w-16 h-16 text-white animate-bounce" />
        <BriefcaseIcon className="w-16 h-16 text-white animate-bounce delay-200" />
        <ArrowRightOnRectangleIcon className="w-16 h-16 text-white animate-bounce delay-400" />
        <h2 className="text-3xl font-bold text-center mt-4">Join as an Employee / Employer</h2>
        <p className="text-center">Manage your company profile and post jobs.</p>
        <p className="text-center">Reach potential candidates faster.</p>
        <p className="text-center">Track applications and grow your team.</p>
      </div>

      {/* Form Panel */}
      <div className="flex-1 flex justify-center items-center p-4">
        <Card className="w-full max-w-md shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Employee / Employer Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company@example.com"
                  required
                  autoFocus
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
