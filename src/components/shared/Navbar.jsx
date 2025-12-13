import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, User, Home, Briefcase, BarChart, Menu, X } from "lucide-react";
import { UserProfileContext } from "../context/UserProfileContext.jsx";
import { ProfileContext } from "../context/ProfileContext.jsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import JobSparkLogo from "@/assets/image.png";

export default function Navbar() {
  const { company: userCompany } = useContext(UserProfileContext);
  const { company: employeeCompany } = useContext(ProfileContext);
  const navigate = useNavigate();

  const userToken = localStorage.getItem("token");
  const employeeToken = localStorage.getItem("employeeToken");

  // Employee logo fallback from localStorage
  const storedEmployeeCompany = JSON.parse(localStorage.getItem("employeeCompany") || "{}");
  const logo = employeeToken ? (employeeCompany?.logo || storedEmployeeCompany?.logo) : userCompany?.logo;

const getLogoUrl = (logo) =>
  logo?.startsWith("http") ? logo : `http://localhost:5000/${logo}`;


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeCompany");
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Jobs", path: "/jobs", icon: <Briefcase size={18} /> },
    { name: "Career Insights", path: "/career-insights", icon: <BarChart size={18} /> },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine current user type
  const currentUserType = () => {
    if (employeeToken) return "employee";
    if (userToken) return "user";
    return "guest";
  };

  // Post Job link logic
  const postJobLink = employeeToken ? "/employee/post-job" : "/employee-signup";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 shadow-md border-b border-zinc-200 transition-all duration-300">
      <nav className="container mx-auto px-6 md:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={JobSparkLogo}
            alt="JobSpark"
            className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-md object-cover transition-transform duration-300 transform group-hover:scale-110"
          />
          <h1 className="text-3xl font-bold text-zinc-900 transition-colors group-hover:text-zinc-700">
            Job<span className="text-blue-600">Spark</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 font-medium text-zinc-700">
          {menuItems.map((item, index) => (
            <li key={index} className="group relative flex items-center gap-1 cursor-pointer">
              <span className="text-black">{item.icon}</span>
              <Link
                to={item.path}
                className="transition-all duration-300 group-hover:text-black group-hover:tracking-wide"
              >
                {item.name}
              </Link>
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Post Job Button (desktop) */}
          <Link to={postJobLink} className="hidden md:block">
            <Button className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Plus size={16} /> Post Job
            </Button>
          </Link>

          {/* Auth Buttons */}
          {currentUserType() === "guest" && (
            <ul className="hidden md:flex items-center gap-6 font-medium text-zinc-700">
              <li><Link to="/signup" className="hover:text-black transition-all">User Signup</Link></li>
              <li><Link to="/login" className="hover:text-black transition-all">User Login</Link></li>
              <li><Link to="/employee-login" className="hover:text-black transition-all">Employee Login</Link></li>
            </ul>
          )}

          {/* Avatar Dropdown */}
          {currentUserType() !== "guest" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer group">
                  {logo ? (
                    <img
                      src={getLogoUrl(logo)}
                      alt="Avatar"
                      className="w-11 h-11 object-cover rounded-full border-2 border-white shadow-md transition-transform duration-300 transform group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center text-black text-xl shadow-md group-hover:scale-110">
                      <User size={20} />
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-48">
                {employeeToken && (
                  <DropdownMenuItem onClick={() => navigate("/employee-dashboard")}>
                    Employee Dashboard
                  </DropdownMenuItem>
                )}
                {userToken && (
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    View Profile
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-zinc-200 animate-fadeIn">
          <ul className="flex flex-col p-4 gap-4 font-medium text-zinc-700">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.icon}
                <Link to={item.path} className="hover:text-black transition-all">{item.name}</Link>
              </li>
            ))}

            {/* Auth or Employee/User Links */}
            {currentUserType() === "guest" ? (
              <>
                <li><Link to="/signup" className="hover:text-black transition-all">User Signup</Link></li>
                <li><Link to="/login" className="hover:text-black transition-all">User Login</Link></li>
                <li><Link to="/employee-login" className="hover:text-black transition-all">Employee Login</Link></li>
              </>
            ) : (
              <>
                {employeeToken && (
                  <li onClick={() => { navigate("/employee-dashboard"); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-black transition-all">
                    Employee Dashboard
                  </li>
                )}
                {userToken && (
                  <li onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }} className="cursor-pointer hover:text-black transition-all">
                    View Profile
                  </li>
                )}
                <li onClick={handleLogout} className="cursor-pointer text-red-600 hover:text-red-700 transition-all">
                  Logout
                </li>
                {/* Post Job Button (mobile) */}
                <li>
                  <Link to={postJobLink}>
                    <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-2.5 shadow-md transition-all duration-300 transform hover:scale-105">
                      <Plus size={16} /> Post Job
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}