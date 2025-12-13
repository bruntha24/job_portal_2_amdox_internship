import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("/user-default.avif");
  const [loading, setLoading] = useState(false);
  const [workStatus, setWorkStatus] = useState("fresher");
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (!avatar) setPreview("/user-default.avif");
  }, [avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("password", password);
      formData.append("workStatus", workStatus);
      formData.append("role", "user"); // important
      if (avatar) formData.append("avatar", avatar);
      if (resume) formData.append("resume", resume);

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Signup successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Info Panel */}
      <div className="hidden md:flex flex-col justify-center w-1/3 p-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-l-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Join as a Job Seeker
        </h2>
        <p className="mb-2 text-lg text-center">
          Build your profile and let recruiters find you.
        </p>
        <p className="mb-2 text-lg text-center">
          Get job postings delivered right to your email.
        </p>
        <p className="mb-4 text-lg text-center">
          Find a job and grow your career.
        </p>
        <div className="text-center">
          <span>Already Registered? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-200 font-semibold hover:underline"
          >
            Login here
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Right Signup Form */}
      <div className="flex-1 flex justify-center items-center p-8">
        <Card className="w-full max-w-lg shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label>Name</Label>
                <Input
                  className="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Mobile</Label>
                <Input
                  type="tel"
                  className="w-full"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div>
                <Label>Work Status</Label>
                <select
                  value={workStatus}
                  onChange={(e) => setWorkStatus(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="fresher">Fresher</option>
                  <option value="experienced">Experienced</option>
                </select>
              </div>
              <div>
                <Label>Avatar</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={handleAvatarChange}
                />
              </div>
              <div>
                <Label>Resume</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full"
                  onChange={handleResumeChange}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-auto px-4 py-1 text-sm"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Create Account"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
