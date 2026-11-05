import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Droplets, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Activity } from "lucide-react";
import { DecorativeTrajectory } from "./DecorativeTrajectory";

export function DrinkingWaterSection() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [activeMetric, setActiveMetric] = useState(0);

  const METRICS = [
    {
      label: isBn ? "টিডিএস ১২০-১৫০ পিপিএম" : "TDS 120-150 ppm",
      title: isBn ? "নিখুঁত মিষ্টি ও সতেজ স্বাদ" : "Optimal Mineral Crispness",
      desc: isBn ? "অতিরিক্ত ফিল্টার করে পানিকে খনিজহীন না করে সঠিক খনিজ ভারসাম্য বজায় রাখা হয়।" : "Never demineralized. Perfectly balanced for a sweet, refreshing hydration experience.",
      val: "135 ppm",
    },
    {
      label: isBn ? "পিএইচ ৭.২ - ৭.৬" : "pH 7.2 - 7.6 Alkaline",
      title: isBn ? "প্রাকৃতিক ক্ষারীয় ভারসাম্য" : "Natural Alkaline Balance",
      desc: isBn ? "শরীরের অ্যাসিডিটি কমাতে এবং দ্রুত আর্দ্রতা পূরণে আদর্শ পিএইচ লেভেল।" : "Supports healthy metabolism and neutralizes everyday bodily acidity.",
      val: "7.4 pH",
    },
    {
      label: isBn ? "ক্যালসিয়াম ও ম্যাগনেসিয়াম" : "Essential Electrolytes",
      title: isBn ? "হাড় ও পেশির শক্তি বজায় রাখে" : "Cellular & Cardiac Health",
      desc: isBn ? "প্রতি লিটারে ২৪ মিলিগ্রাম ক্যালসিয়াম ও ১২ মিলিগ্রাম ম্যাগনেসিয়াম উপস্থিত।" : "Fortified with natural ionic minerals essential for active Dhaka lifestyles.",
      val: "36 mg/L",
    },
    {
      label: isBn ? "০% ভারী ধাতু ও জীবাণু" : "0.00% Pathogens & Metals",
      title: isBn ? "বিএসটিআই ল্যাব কর্তৃক পরীক্ষিত" : "Zero Microbial Pathogens",
      desc: isBn ? "আর্সেনিক, সিসা, ক্লোরিন এবং ক্ষতিকর ই-কোলাই সম্পূর্ণ মুক্ত।" : "Guaranteed lead-free, arsenic-free, chlorine-free, and E. coli free.",
      val: "0.00%",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f8fbfe] dark:bg-slate-900/90 transition-colors duration-300 relative overflow-hidden">
      {/* Ambient background blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-3.5 py-1.5 rounded-full border border-cyan-200 dark:border-cyan-800 inline-block mb-3">
                {isBn ? "খনিজ সমৃদ্ধ নিরাপদ পানি" : "PREMIUM MINERAL SPECTRUM"}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {isBn ? (
                  <>
                    আমাদের <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">খাবার পানি</span> ও খনিজ মানদণ্ড
                  </>
                ) : (
                  <>
                    OUR CERTIFIED <span className="bg-gradient-to-r from-cyan-600 to-sky-500 bg-clip-text text-transparent">DRINKING WATER</span>
                  </>
                )}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-[#0284c7] rounded-full mt-3 mx-auto lg:mx-0" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {isBn
                ? "প্রাকৃতিক গভীর অ্যাকুইফার থেকে সংগৃহীত এবং প্রয়োজনীয় প্রাকৃতিক খনিজ দিয়ে সুষম আমাদের পানি দেয় প্রশান্তি ও শক্তি। টিডিএস ১২০-১৫০ পিপিএম এবং ১০০% ব্যাকটেরিয়ামুক্ত নিশ্চয়তায় আপনার পরিবারের স্বাস্থ্য সুরক্ষিত থাকে।"
                : "Experience the difference of pristine mountain-crisp hydration. Enriched with essential electrolytes (Calcium, Magnesium, Potassium) with optimal TDS (120-150 ppm), AquaFlow keeps your body active, healthy, and energized while guaranteeing zero microbial or chemical contaminants."}
            </p>

            {/* Interactive Mineral Pills */}
            <div className="space-y-3 pt-2 text-left">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {METRICS.map((m, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveMetric(idx)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all text-center border ${
                      activeMetric === idx
                        ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-500/25 scale-[1.02]"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300"
                    }`}
                  >
                    <div className="text-[10px] opacity-80 uppercase tracking-wider">{m.val}</div>
                    <div className="text-[11px] font-black truncate">{m.label}</div>
                  </button>
                ))}
              </div>

              {/* Active Metric Highlight Box */}
              <motion.div
                key={activeMetric}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-sky-100 dark:border-slate-700 shadow-sm flex items-start gap-3.5"
              >
                <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 font-bold">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {METRICS[activeMetric].title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-0.5">
                    {METRICS[activeMetric].desc}
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/products" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <Droplets className="h-4 w-4" />
                  <span>{isBn ? "এখনই অর্ডার করুন" : "Order Pure Water Now"}</span>
                </button>
              </Link>
              <Link
                to="/quality"
                className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors inline-flex items-center gap-1.5"
              >
                <span>{isBn ? "পূর্ণাঙ্গ ল্যাব রিপোর্ট" : "BSTI Laboratory Certificate"}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Alpine Mountain Water Bottles with Dashed Arc & Floating Tags */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center order-1 lg:order-2"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl">
              {/* Decorative Dashed Arc */}
              <DecorativeTrajectory className="absolute -top-12 left-0 w-full h-28 pointer-events-none z-10" />

              {/* Floating Top Left Pill */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-4 sm:-left-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">BSTI BDS 1240</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Standard Compliant</div>
                </div>
              </motion.div>

              {/* Floating Bottom Right Pill */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-4 sm:-right-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <Droplets className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Alkaline pH 7.4</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Sweet Mountain Taste</div>
                </div>
              </motion.div>

              {/* Main Image Frame with Smooth Hover Lift */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-sky-100/80 dark:border-slate-800 bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-800 dark:to-slate-900 relative group"
              >
                <img
                  src="/images/mountain-bottles.jpg"
                  alt="AquaFlow Pristine Mountain Mineral Water Bottles"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default DrinkingWaterSection;

