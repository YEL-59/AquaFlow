import React from "react";
import { motion } from "framer-motion";

export function WaveDivider({ className = "" }) {
  return (
    <div className={`relative w-full overflow-hidden leading-none -mb-1 pointer-events-none ${className}`}>
      {/* Background Animated Secondary Wave */}
      <motion.div
        animate={{ x: [0, -80, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="w-[120%] -ml-[10%]"
      >
        <svg
          className="w-full h-14 sm:h-20 text-sky-200/40 dark:text-slate-800/40"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,45 C280,10 420,70 720,40 C1020,10 1180,65 1440,35 L1440,100 L0,100 Z" />
        </svg>
      </motion.div>

      {/* Foreground Animated Primary Wave */}
      <motion.div
        animate={{ x: [-40, 40, -40] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-[120%] -ml-[10%] -mt-10 sm:-mt-14"
      >
        <svg
          className="w-full h-16 sm:h-24 text-[#f0f7fc] dark:text-slate-800"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,48C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
        </svg>
      </motion.div>
    </div>
  );
}

export default WaveDivider;

