import React from "react";

export function DecorativeTrajectory({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 500 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 20 160 C 130 30, 370 30, 480 160"
        stroke="#38bdf8"
        strokeWidth="2.5"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
      <circle cx="20" cy="160" r="5" fill="#0284c7" />
      <circle cx="480" cy="160" r="5" fill="#0284c7" />
    </svg>
  );
}
