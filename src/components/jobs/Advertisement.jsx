// src/components/jobs/Advertisement.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Advertisement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-yellow-50 border border-yellow-400 rounded-2xl p-6 shadow-lg flex flex-col items-center gap-4 text-center"
    >
      {/* Premium Image */}
      <motion.img
        src="https://plus.unsplash.com/premium_photo-1670446441509-b0fea4f03bac?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Premium Membership"
        className="w-32 h-32 rounded-full object-cover border-2 border-yellow-400"
        whileHover={{ scale: 1.1 }}
      />

      {/* Slogans */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-bold text-yellow-800"
      >
        Go Premium!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-yellow-700"
      >
        Unlock exclusive job alerts, featured listings, and priority applications.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-yellow-700 font-semibold"
      >
        Boost your career today!
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-yellow-700 font-medium italic"
      >
        Stand out. Apply faster. Get noticed.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-yellow-600 transition"
      >
        Upgrade Now
      </motion.button>
    </motion.div>
  );
}
