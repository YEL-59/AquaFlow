import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";

export function VideoModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-sky-100 dark:border-slate-800 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-2">
          <Badge variant="info">AquaFlow Pure Water Technology</Badge>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            7-Stage RO + UV-C Water Purification
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Witness how every drop is brought to absolute crystal purity and bottled under cleanroom conditions.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative bg-slate-950 aspect-video flex items-center justify-center">
          <img
            src="/images/technology-lake.jpg"
            alt="Purification Lake Source"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 text-white space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Live Water Purity Status: 100% Certified (BDS 1240)
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Total Dissolved Solids: 135 ppm | pH: 7.4 | Heavy Metals: 0.00 ppm | Microbial Count: 0 CFU/ml
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link to="/products" onClick={onClose}>
            <button className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-full shadow-md">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
