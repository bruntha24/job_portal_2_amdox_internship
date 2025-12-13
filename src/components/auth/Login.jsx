import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserIcon, EnvelopeIcon, BriefcaseIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Info Panel */}
      <div className="hidden md:flex flex-col justify-center w-1/3 p-8 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-l-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h2>
        
        <div className="flex items-center space-x-2 text-lg">
          <UserIcon className="w-6 h-6 text-white" />
          <p>Access your profile and personal dashboard</p>
        </div>

        <div className="flex items-center space-x-2 text-lg">
          <EnvelopeIcon className="w-6 h-6 text-white" />
          <p>Receive job alerts directly to your email</p>
        </div>

        <div className="flex items-center space-x-2 text-lg">
          <BriefcaseIcon className="w-6 h-6 text-white" />
          <p>Apply for jobs and track your applications</p>
        </div>

        <div className="text-center mt-4">
          <span>New here? </span>
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-200 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <ArrowRightOnRectangleIcon className="w-32 h-32 text-white" />
        </div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex justify-center items-center p-8 bg-gray-50">
        <Card className="w-full max-w-md shadow-lg p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-bold">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="w-auto px-4 py-2 text-sm"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
