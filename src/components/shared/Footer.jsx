import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-10 mt-10">
      <div className="container mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">JobPortal</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Find the right job that matches your skills and passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-white">Jobs</Link></li>
              <li><Link to="/career-insights" className="hover:text-white">Career Insights</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/post-job" className="hover:text-white">Post a Job</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link to="/plans" className="hover:text-white">Pricing Plans</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@jobportal.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Location: Chennai, India</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t border-zinc-700 pt-5 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
