import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EmployeeSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("website", website);
      formData.append("phone", phone);
      if (logo) formData.append("logo", logo);

      await axios.post(
        "http://localhost:5000/api/companies/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Signup successful! Please login.");
      setLoading(false);
      navigate("/employee-login");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 p-4">
      <Card className="w-full max-w-5xl shadow-lg flex flex-col md:flex-row overflow-hidden rounded-xl">
        {/* Left side: Avatar and info */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex flex-col justify-center items-center p-10">
          <img
            src="/default-company.jpeg"
            alt="Company Avatar"
            className="w-36 h-36 mb-6 rounded-full shadow-xl object-cover border-4 border-white"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">Join as an Employee / Employer</h2>
          <p className="text-center mb-4">
            Already Registered?{" "}
            <span
              className="underline font-semibold cursor-pointer px-4 py-1 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition"
              onClick={() => navigate("/employee-login")}
            >
              Login here
            </span>
          </p>
          <p className="text-center text-sm mb-1">Build your profile and let recruiters find you.</p>
          <p className="text-center text-sm mb-1">Get job postings delivered right to your email.</p>
          <p className="text-center text-sm">Find a job and grow your career.</p>
        </div>

        {/* Right side: Signup form */}
        <div className="md:w-1/2 p-8 bg-white">
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label>Company Name *</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your company name"
                  required
                />
              </div>

              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company@example.com"
                  required
                />
              </div>

              <div>
                <Label>Password *</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief company description"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label>Website</Label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.example.com"
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 1234567890"
                />
              </div>

              <div>
                <Label>Logo</Label>
                <Input type="file" accept="image/*" onChange={handleLogoChange} />
                <p className="text-sm text-gray-500 mt-1">
                  Upload your company logo (optional)
                </p>
              </div>

              <Button type="submit" className="w-full py-2 mt-2" disabled={loading}>
                {loading ? "Signing up..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
