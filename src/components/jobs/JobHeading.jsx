import React from "react";
import { Briefcase, User, Search, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function JobHeading() {
  const iconFloat = {
    initial: { y: 0 },
    animate: { y: [0, -6, 0] },
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {/* 🌟 Premium Animated Top Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent tracking-wide relative"
      >
        Explore Opportunities:
        <motion.span
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="absolute left-0 -bottom-1 h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
        ></motion.span>
      </motion.h1>

      {/* ✨ Sub tagline */}
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-gray-600 text-sm flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4 text-indigo-500" />
        Find your dream job from thousands of verified listings.
      </motion.p>

      {/* 🎖 Smaller Animated Badge */}
      <motion.div
        className="flex items-center gap-3 bg-white/90 border border-blue-200 backdrop-blur-sm rounded-xl px-5 py-2.5 shadow-md hover:shadow-lg transition-all"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div {...iconFloat}>
          <Briefcase className="w-5 h-5 text-blue-500" />
        </motion.div>

        <motion.div
          {...iconFloat}
          transition={{ ...iconFloat.transition, delay: 0.1 }}
        >
          <User className="w-5 h-5 text-blue-500" />
        </motion.div>

        <motion.div
          {...iconFloat}
          transition={{ ...iconFloat.transition, delay: 0.2 }}
        >
          <Search className="w-5 h-5 text-blue-500" />
        </motion.div>

        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-1">
          Latest Job Openings
          <ArrowRight className="w-4 h-4 text-indigo-600" />
        </h2>
      </motion.div>
    </div>
  );
}
