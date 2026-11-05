import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Truck,
  RotateCcw,
  Play,
  ShieldCheck,
  Sparkles,
  Zap,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Clock,
  Award,
  Leaf,
} from "lucide-react";
import { useContent } from "../../context/ContentContext";

export function HeroSection({ onOpenVideo }) {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const { content } = useContent();
  const hero = content?.hero || {};

  // Interactive Live Hydration Estimator
  const [householdSize, setHouseholdSize] = useState("FAMILY"); // "INDIVIDUAL" | "FAMILY" | "OFFICE"

  const ESTIMATES = {
    INDIVIDUAL: {
      label: isBn ? "১-২ জন সদস্য" : "1-2 Persons",
      dailyLiters: 4,
      monthlyJars: 2,
      monthlyCost: 160,
      savingsBottles: 80,
    },
    FAMILY: {
      label: isBn ? "৩-৪ জনের পরিবার" : "3-4 Family Members",
      dailyLiters: 8,
      monthlyJars: 4,
      monthlyCost: 320,
      savingsBottles: 160,
    },
    OFFICE: {
      label: isBn ? "৫+ জন অফিস / ব্যবসা" : "5+ Office / Commercial",
      dailyLiters: 20,
      monthlyJars: 12,
      monthlyCost: 960,
      savingsBottles: 480,
    },
  };

  const currentEstimate = ESTIMATES[householdSize];

  const headline = isBn
    ? (hero.headlineBn || "পানির বিশুদ্ধতায় ঢাকার সবচেয়ে আধুনিক সমাধান")
    : (hero.headlineEn || "PURE MOUNTAIN-FRESH WATER DELIVERED TO YOUR DOOR");

  const subtitle = isBn
    ? (hero.subtitleBn || "৭ স্তরে ফিল্টারকৃত শতভাগ নিরাপদ খাবার পানি। বনানী, গুলশান, ধানমন্ডি ও উত্তরায় ১-২ ঘণ্টার মধ্যেই এক্সপ্রেস ডোরস্টেপ ডেলিভারি।")
    : (hero.subtitleEn || "7-Stage Reverse Osmosis laboratory-certified pure water in sanitized 20L reusable jars. Express 1-2 hour doorstep delivery across Dhaka with zero single-use plastic.");

  const ctaText = isBn
    ? (hero.ctaTextBn || "এখনই অর্ডার করুন")
    : (hero.ctaTextEn || "Order Water Now");

  return (
    <section className="relative pt-6 sm:pt-12 pb-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-[#eaf4fb] via-[#f2f8fc] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
      {/* 1. Animated Ambient Water Glows & Morphing Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -15, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 -z-10 w-[550px] h-[550px] bg-sky-400/25 dark:bg-sky-500/15 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -25, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 right-10 -z-10 w-[450px] h-[450px] bg-cyan-300/30 dark:bg-cyan-400/15 blur-[110px] rounded-full pointer-events-none"
      />

      {/* Floating Animated Bubbles */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{
              y: "-10%",
              opacity: [0, 0.4, 0.8, 0],
              x: Math.sin(i) * 30,
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
            style={{
              left: `${15 + i * 14}%`,
              width: `${12 + (i % 3) * 8}px`,
              height: `${12 + (i % 3) * 8}px`,
            }}
            className="rounded-full bg-gradient-to-tr from-sky-400 to-cyan-200 blur-[1px] shadow-sm shadow-sky-300/50"
          />
        ))}
      </div>

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Live Dispatch Beacon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center lg:justify-start mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-extrabold shadow-sm backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-slate-900 dark:text-white">
              {isBn ? "লাইভ ঢাকা মেট্রো সরবরাহ:" : "Live Dhaka Metro Supply:"}
            </span>
            <span className="text-sky-600 dark:text-sky-400">
              {isBn ? "১৮টি ভ্যান রুটে সক্রিয় • ৩টি মাইক্রো-হাব প্রস্তুত" : "18 Vans Active • 3 Micro-Hubs Stocked"}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 animate-pulse" />
          </div>
        </motion.div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white">
              {headline}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* CTAs: Order Now + Watch Video */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(2, 132, 199, 0.35)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 hover:from-sky-700 hover:to-cyan-600 text-white font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/25 transition-all flex items-center gap-2 group"
                >
                  <span>{ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <button
                type="button"
                onClick={onOpenVideo}
                className="flex items-center gap-3 group text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors p-2"
              >
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 shadow-md border border-sky-100 dark:border-slate-700 flex items-center justify-center text-sky-600 group-hover:scale-110 group-hover:bg-sky-50 dark:group-hover:bg-slate-700 transition-all">
                    <Play className="h-4 w-4 fill-sky-600 ml-0.5" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-sky-400/30 animate-ping -z-10 opacity-75" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold">
                    {isBn ? "ভিডিও দেখুন" : "Watch Purification Process"}
                  </div>
                  <div className="text-[10px] text-slate-400">7-Stage Medical RO Tour</div>
                </div>
              </button>
            </div>

            {/* Interactive Family Hydration Estimator Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md text-left space-y-4 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    {isBn ? "আপনার পরিবারের দৈনিক পানির হিসাব" : "Household Hydration & Refill Calculator"}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  Save 10% on Subscription
                </span>
              </div>

              {/* Household Size Selector Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(ESTIMATES).map((key) => {
                  const item = ESTIMATES[key];
                  const isSelected = householdSize === key;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setHouseholdSize(key)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                        isSelected
                          ? "bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Hydration Outcome Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Water</span>
                  <span className="text-base font-black text-sky-600 dark:text-sky-400 mt-0.5 block">
                    {currentEstimate.dailyLiters} Liters
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Recommended</span>
                  <span className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                    {currentEstimate.monthlyJars}x 20L Jars/Mo
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Monthly Refill</span>
                  <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                    ৳{currentEstimate.monthlyCost}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Saves ~{currentEstimate.savingsBottles} single-use plastic bottles/mo</span>
                </span>

                <Link
                  to="/products/aqua-pure-20l-jar"
                  className="font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  <span>Select Plan</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Animated Floating Bottle Centerpiece + 3 Satellite Cards */}
          <div className="lg:col-span-6 flex justify-center relative py-8 lg:py-4">
            <div className="relative w-72 sm:w-88 lg:w-[440px] flex items-center justify-center">
              {/* Pulsing Cyan Radial Light */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/30 to-cyan-300/30 rounded-full blur-3xl scale-110 -z-10 animate-pulse" />

              {/* Floating Levitation Bottle */}
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-0.5, 0.5, -0.5],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 w-full flex justify-center"
              >
                <img
                  src="/images/hero-bottle.jpg"
                  alt="AquaFlow 20-Liter Pure Water Bottle"
                  className="w-full max-h-[460px] object-contain drop-shadow-[0_30px_45px_rgba(2,132,199,0.28)]"
                />
              </motion.div>

              {/* Satellite Card 1: Top Left - 35-Min Express Dispatch */}
              <motion.div
                animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="absolute -top-4 -left-4 sm:-left-8 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-2.5 max-w-[200px]"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                  <Zap className="w-4 h-4 fill-white" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white">35-Min Dispatch</div>
                  <div className="text-[10px] text-slate-400">Banani & Gulshan Hubs</div>
                </div>
              </motion.div>

              {/* Satellite Card 2: Top Right - 92 PPM TDS Lab Tested */}
              <motion.div
                animate={{ y: [6, -6, 6], x: [3, -3, 3] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                className="absolute top-10 -right-4 sm:-right-8 z-20 p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md flex items-center gap-2.5 max-w-[210px]"
              >
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/25">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white">BSTI Certified</div>
                  <div className="text-[10px] text-slate-400">TDS 120-150 ppm • pH 7.2</div>
                </div>
              </motion.div>

              {/* Satellite Card 3: Bottom Center - 4.9 Rating & 100% Refundable Deposit */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md flex items-center gap-3 w-max"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-md shadow-amber-400/30">
                  <Star className="w-5 h-5 fill-slate-950" />
                </div>
                <div className="text-left text-xs">
                  <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>4.9 / 5.0 Rating</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      ★ 5,800+ Homes
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    ৳200 Safe 100% Refundable Deposit Guarantee
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
