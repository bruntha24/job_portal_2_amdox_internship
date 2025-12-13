import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

// User Pages
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";

// Employee Pages
import EmployeeLogin from "./components/auth/EmployeeLogin";
import EmployeeSignup from "./components/auth/EmployeeSignup";
import EmployeeDashboard from "./components/auth/EmployeeProfile";
import PostJob from "./components/jobs/PostJob";

// Jobs Pages
import Jobs from "./components/jobs/Jobs";
import JobPage from "./components/jobs/Job";

// Career Page
import CareerInsights from "./components/career/CareerInsights";

// Context Providers
import { ProfileProvider } from "./components/context/ProfileContext.jsx";
import { UserProfileProvider } from "./components/context/UserProfileContext.jsx";

import { Toaster } from "@/components/ui/sonner";

// Protected Routes
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function ProtectedEmployeeRoute({ children }) {
  const token = localStorage.getItem("employeeToken");
  if (!token) return <Navigate to="/employee-login" replace />;
  return children;
}

export default function App() {
  return (
    <UserProfileProvider>
      <ProfileProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-6">
              <Routes>

                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Jobs (PUBLIC) */}
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobPage />} />

                {/* Career Insights */}
                <Route path="/career-insights" element={<CareerInsights />} />

                {/* User Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Employee Auth */}
                <Route path="/employee-login" element={<EmployeeLogin />} />
                <Route path="/employee-signup" element={<EmployeeSignup />} />
                <Route
                  path="/employee-dashboard"
                  element={
                    <ProtectedEmployeeRoute>
                      <EmployeeDashboard />
                    </ProtectedEmployeeRoute>
                  }
                />

                {/* Employee Post Job */}
                <Route
                  path="/employee/post-job"
                  element={
                    <ProtectedEmployeeRoute>
                      <PostJob />
                    </ProtectedEmployeeRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />

              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </Router>
      </ProfileProvider>
    </UserProfileProvider>
  );
}

