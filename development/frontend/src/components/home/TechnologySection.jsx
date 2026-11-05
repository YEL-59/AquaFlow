import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Play,
  CheckCircle2,
  Filter,
  Flame,
  Zap,
  Layers,
} from "lucide-react";

export function TechnologySection({ onOpenVideo }) {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [activeStage, setActiveStage] = useState(3); // Default to Reverse Osmosis

  const STAGES = [
    {
      num: 1,
      name: isBn ? "৫-মাইক্রন সেডিমেন্ট" : "5μ Sediment Filter",
      rating: "5.0 Micron",
      short: isBn ? "ধূলিকণা ও পলল দূরীকরণ" : "Particulate Removal",
      icon: Filter,
      color: "from-sky-500 to-blue-500",
      accent: "text-sky-500",
      desc: isBn
        ? "পানির বড় আকারের ধূলিকণা, মরিচা, বালু ও পলল শতভাগ আটকে দিয়ে পরবর্তী স্তরের মেমব্রেন সুরক্ষিত রাখে।"
        : "Captures suspended matter, sand, rust, and silt to ensure subsequent filtration stages operate at peak performance.",
    },
    {
      num: 2,
      name: isBn ? "অ্যাক্টিভেটেড কার্বন" : "Activated Carbon",
      rating: "Adsorption",
      short: isBn ? "ক্লোরিন ও গন্ধ অপসারণ" : "Chlorine & Odor",
      icon: Sparkles,
      color: "from-cyan-500 to-teal-500",
      accent: "text-cyan-500",
      desc: isBn
        ? "উচ্চ ঘনত্বের নারিকেল খোসার অ্যাক্টিভেটেড কার্বনের সাহায্যে ক্লোরিন, কীটনাশক ও পানির অস্বাভাবিক গন্ধ দূর করে।"
        : "High-density coconut shell carbon eliminates dissolved chlorine, trihalomethanes, and chemical odors.",
    },
    {
      num: 3,
      name: isBn ? "১-মাইক্রন ব্লক ফিল্টার" : "1μ Carbon Block",
      rating: "1.0 Micron",
      short: isBn ? "মাইক্রো-পলিশিং" : "Pre-RO Defense",
      icon: Layers,
      color: "from-blue-500 to-indigo-500",
      accent: "text-blue-500",
      desc: isBn
        ? "সূক্ষ্ম ১ মাইক্রন ফিল্টারের মাধ্যমে অবশিষ্টাংশ দূর করে রিভার্স অসমোসিস মেমব্রেনের দীর্ঘস্থায়িত্ব নিশ্চিত করা হয়।"
        : "Ultra-fine pre-defense barrier capturing micro-particles and safeguarding the delicate RO membrane.",
    },
    {
      num: 4,
      name: isBn ? "রিভার্স অসমোসিস (RO)" : "Reverse Osmosis (RO)",
      rating: "0.0001 Micron",
      short: isBn ? "ভারী ধাতু ও আর্সেনিক মুক্ত" : "0.0001μ Molecular Guard",
      icon: RefreshCw,
      color: "from-sky-600 to-cyan-400",
      accent: "text-sky-500",
      desc: isBn
        ? "আণবিক স্তরের ০.০০০১ মাইক্রন মেমব্রেন দিয়ে আর্সেনিক, সিসা, ক্রোমিয়াম ও ক্ষতিকর দ্রবীভূত লবণ ৯৯.৯৯% দূর করা হয়।"
        : "The core engine: 0.0001 micron membrane rejects arsenic, lead, micro-plastics, and dissolved toxins at a molecular level.",
    },
    {
      num: 5,
      name: isBn ? "মিনারেল রিস্টোরেশন" : "Remineralization",
      rating: "Electrolytes",
      short: isBn ? "প্রাকৃতিক ইলেক্ট্রোলাইট" : "Ionic Minerals Added",
      icon: Droplets,
      color: "from-emerald-500 to-teal-400",
      accent: "text-emerald-500",
      desc: isBn
        ? "ক্যালসিয়াম ও ম্যাগনেসিয়ামের প্রাকৃতিক অনুপাত যোগ করে পানির স্বাদ মিষ্টি ও জীবনীশক্তিতে ভরপুর করে তোলা হয়।"
        : "Fortifies pure water with balanced Calcium and Magnesium ions, achieving optimal TDS and a delicious natural taste.",
    },
    {
      num: 6,
      name: isBn ? "ইউভি-সি জীবানুমুক্তকরণ" : "Dual UV-C Sterilization",
      rating: "254nm Wave",
      short: isBn ? "১০০% ব্যাকটেরিয়া মুক্ত" : "Zero Microbial Pathogens",
      icon: Zap,
      color: "from-purple-500 to-violet-500",
      accent: "text-purple-500",
      desc: isBn
        ? "২৫৪ ন্যানোমিটার মেডিকেল গ্রেড আল্ট্রাভায়োলেট রশ্মি ব্যাকটেরিয়া ও ভাইরাসের ডিএনএ ধ্বংস করে সম্পূর্ণ জীবাণুমুক্ত করে।"
        : "High-intensity 254nm UV-C germicidal light disrupts DNA of microorganisms, ensuring absolute microbiological safety.",
    },
    {
      num: 7,
      name: isBn ? "ওজোন সিলিং ও বটলিং" : "Ozone Hermetic Sealing",
      rating: "Hermetic Cap",
      short: isBn ? "হাইজিন সিল বটলিং" : "Tamper-Evident Safety",
      icon: ShieldCheck,
      color: "from-rose-500 to-pink-500",
      accent: "text-rose-500",
      desc: isBn
        ? "ওজোনেটেড পানিতে ধোয়া জারে স্বয়ংক্রিয়ভাবে পানি ভরে টেম্পার-প্রুফ সেফটি ক্যাপ দিয়ে এয়ারটাইট সিল করা হয়।"
        : "Automated bottling in sterilized BPA-free containers with ozone rinse and hermetic tamper-evident cap sealing.",
    },
  ];

  const currentStage = STAGES[activeStage];

  return (
    <section className="py-20 sm:py-28 bg-[#f0f7fc] dark:bg-slate-800/60 transition-colors duration-300 relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-sky-600 dark:text-sky-400 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-slate-700 shadow-sm inline-block">
            {isBn ? "৭-স্তরের বৈজ্ঞানিক পরিশোধন" : "SCIENTIFIC PURIFICATION MATRIX"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">OUR ADVANCED</span> TECHNOLOGY
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {isBn
              ? "আমাদের ৭-ধাপ বিশিষ্ট পরিশোধন প্রক্রিয়া পানির ক্ষতিকর উপাদান, ক্লোরিন ও ভারী ধাতু ৯৯.৯৯% দূর করে প্রয়োজনীয় প্রাকৃতিক খনিজ বজায় রাখে।"
              : "Our 7-stage proprietary purification process eliminates 99.99% of impurities, heavy metals, and pathogens while preserving vital mineral salts."}
          </p>
        </motion.div>

        {/* 7-Step Interactive Pipeline Stepper */}
        <div className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStage === idx;

              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`p-3.5 rounded-2xl text-left transition-all border relative overflow-hidden group flex flex-col justify-between ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-sky-500 shadow-xl shadow-sky-500/15 scale-[1.03] ring-2 ring-sky-500/30"
                      : "bg-white/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-sky-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}>
                      0{stage.num}
                    </span>
                    <Icon className={`h-4 w-4 ${isSelected ? stage.accent : "text-slate-400 group-hover:text-sky-500"}`} />
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-1">
                      {stage.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      {stage.short}
                    </span>
                  </div>

                  {/* Active Bottom Glow Indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="active-stage-indicator"
                      className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-500 to-cyan-400"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Showcase Card */}
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-sky-100 dark:border-slate-800 shadow-xl mb-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${currentStage.color} text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/20`}>
              {React.createElement(currentStage.icon, { className: "h-8 w-8" })}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800">
                  Stage {currentStage.num} of 7 • {currentStage.rating}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {currentStage.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {currentStage.desc}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] uppercase font-bold text-slate-400">Purity Rating</div>
              <div className="text-xs font-black text-emerald-600 dark:text-emerald-400">99.99% Certified</div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </motion.div>

        {/* Panoramic Mountain Spring Video Showcase Card with Floating Glass Aura */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border border-sky-100/60 dark:border-slate-700/60"
          onClick={onOpenVideo}
        >
          <img
            src="/images/technology-lake.jpg"
            alt="AquaFlow Pure Glacial Mountain Source"
            className="w-full h-80 sm:h-[420px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/20 transition-colors flex flex-col items-center justify-center text-center p-6">
            {/* Animated Pulsing Play Button */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white/40 backdrop-blur-md border border-white/80 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-white/60 transition-all duration-300 mb-4"
            >
              <Play className="h-8 w-8 sm:h-10 sm:w-10 fill-white ml-1 text-white drop-shadow-md" />
            </motion.div>
            <span className="text-white text-sm sm:text-base font-extrabold tracking-wide drop-shadow-md">
              {isBn ? "ভিডিও ডেমো দেখুন (১:১৫ মিনিট)" : "Watch Our Laboratory Purification Tour (1:15 min)"}
            </span>
            <span className="text-white/80 text-xs mt-1 drop-shadow-sm">
              {isBn ? "বনানী সেন্ট্রাল প্ল্যান্টের স্বয়ংক্রিয় প্রসেস" : "Live view inside our ISO 22000 automated plant"}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default TechnologySection;

