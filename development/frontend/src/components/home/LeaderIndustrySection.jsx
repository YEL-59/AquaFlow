import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Award, CheckCircle2, Droplets } from "lucide-react";
import { DecorativeTrajectory } from "./DecorativeTrajectory";

export function LeaderIndustrySection() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const HIGHLIGHTS = [
    {
      icon: Award,
      title: isBn ? "বিএসটিআই ও আইএসও সার্টিফাইড" : "BSTI & ISO 22000 Certified",
      desc: isBn ? "প্রতিটি ব্যাচ নিয়মিত ল্যাব টেস্টে শতভাগ উত্তীর্ণ।" : "Tested and certified every week by national laboratories.",
      color: "from-sky-500/20 to-blue-500/20",
      textColor: "text-sky-600 dark:text-sky-400",
    },
    {
      icon: Zap,
      title: isBn ? "ঢাকার প্রধান ৩টি হাব" : "3 Dedicated Micro-Hubs",
      desc: isBn ? "বনানী, ধানমন্ডি ও উত্তরায় নিজস্ব কোল্ড-চেইন ফ্লিট।" : "Banani, Dhanmondi, and Uttara micro-hubs with smart dispatch.",
      color: "from-emerald-500/20 to-teal-500/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Droplets,
      title: isBn ? "০.০০০১ মাইক্রন ফিল্ট্রেশন" : "0.0001μ Reverse Osmosis",
      desc: isBn ? "ভারী ধাতু ও ক্ষতিকর উপাদান সম্পূর্ণ দূর করে।" : "Removes all dissolved contaminants while restoring natural electrolytes.",
      color: "from-cyan-500/20 to-sky-500/20",
      textColor: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle Ambient Radial Light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/5 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Courier Image with 3D Float & Satellite Badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl">
              {/* Decorative Dashed Arc Over the Courier */}
              <DecorativeTrajectory className="absolute -top-12 left-0 w-full h-28 pointer-events-none z-10" />

              {/* Floating Satellite Card 1 - Top Right */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 sm:-right-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">12,000+ Homes</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Daily Hydration</div>
                </div>
              </motion.div>

              {/* Floating Satellite Card 2 - Bottom Left */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">35-Min Express</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Doorstep Dispatch</div>
                </div>
              </motion.div>

              {/* Main Image Frame with Smooth Hover Lift */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-sky-100/80 dark:border-slate-800 bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-800 dark:to-slate-900 relative group"
              >
                <img
                  src="/images/delivery-hero.jpg"
                  alt="AquaFlow Delivery Hero with Water Bottles"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Information Bento */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 inline-block mb-3">
                {isBn ? "প্রযুক্তিনির্ভর বিশুদ্ধতা" : "TRUSTED PURIFICATION LEADER"}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {isBn ? (
                  <>
                    শিল্পখাতে <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">শীর্ষস্থানীয়</span> বিশুদ্ধ খাবার পানি
                  </>
                ) : (
                  <>
                    LEADER IN <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">DRINKING WATER</span> LOGISTICS
                  </>
                )}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#0284c7] to-cyan-400 rounded-full mt-3 mx-auto lg:mx-0" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {isBn
                ? "অ্যাকুয়াফ্লো ঢাকার সবচেয়ে নির্ভরযোগ্য ও দ্রুতগতির খাবার পানি সরবরাহ নেটওয়ার্ক। অত্যাধুনিক ওয়াটার পিউরিফিকেশন ও স্বয়ংক্রিয় বটলিং সিস্টেমের মাধ্যমে আমরা প্রতিদিন ১২,০০০ এরও বেশি পরিবার, দূতাবাস এবং শীর্ষ কর্পোরেট প্রতিষ্ঠানে পৌঁছে দিচ্ছি নিখাদ বিশুদ্ধ পানি।"
                : "AquaFlow is Dhaka's premier drinking water network. We combine state-of-the-art reverse osmosis purification technology with rapid neighborhood delivery logistics, ensuring safe, certified, and uninterrupted hydration for more than 12,000 households, diplomatic missions, and businesses every single day."}
            </p>

            {/* 3 Bento Mini Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              {HIGHLIGHTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 shadow-sm"
                  >
                    <div className={`h-9 w-9 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center ${item.textColor} mb-2.5`}>
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white leading-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link
                to="/quality"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white text-sm font-black shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 group"
              >
                <span>{isBn ? "গুণমান ও সার্টিফিকেট দেখুন" : "Explore Purity Standards"}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                to="/delivery-areas"
                className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
              >
                {isBn ? "ঢাকার কভারেজ এলাকা →" : "View Dhaka Hub Coverage →"}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LeaderIndustrySection;

