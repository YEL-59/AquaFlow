import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Truck, Award, Clock, Droplets, CheckCircle2 } from "lucide-react";

export function StatsCounterBar() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const STATS = [
    {
      icon: Droplets,
      val: "2,375+",
      label: isBn ? "দৈনিক বোতল সরবরাহ" : "Bottles Delivered Today",
      sub: isBn ? "রিয়েল-টাইম মেট্রো সাপ্লাই" : "Live Dhaka Metro Count",
      color: "from-sky-500 to-blue-500",
      accent: "text-sky-500",
    },
    {
      icon: Truck,
      val: "11",
      label: isBn ? "মাইক্রো-হাব ও ডেলিভারি ভ্যান" : "Micro-Hubs & Vans",
      sub: isBn ? "বনানী, গুলশান, ধানমন্ডি, উত্তরা" : "Banani, Gulshan, Uttara",
      color: "from-emerald-500 to-teal-500",
      accent: "text-emerald-500",
    },
    {
      icon: Clock,
      val: "99.8%",
      label: isBn ? "অন-টাইম ডেলিভারি রেট" : "On-Time Dispatch Rate",
      sub: isBn ? "১-২ ঘণ্টার মধ্যে নিশ্চিত" : "Under 90 Mins Average",
      color: "from-cyan-500 to-sky-500",
      accent: "text-cyan-500",
    },
    {
      icon: Award,
      val: "100%",
      label: isBn ? "বিএসটিআই ল্যাব সার্টিফাইড" : "BSTI Laboratory Pure",
      sub: isBn ? "BDS 1240:2021 অনুমোদিত" : "Zero Pathogen Guarantee",
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-500",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-r from-sky-50 via-[#f0f8fd] to-sky-50 dark:from-slate-900 dark:via-slate-800/80 dark:to-slate-900 border-y border-sky-100/80 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Live Beacon Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {isBn ? "লাইভ ঢাকা মেট্রো সাপ্লাই অ্যান্ড ডেসপ্যাচ ট্র্যাকার" : "LIVE DHAKA METRO SUPPLY & DISPATCH PIPELINE"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-sky-100 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:border-sky-400/50 transition-all text-center flex flex-col items-center justify-between group"
              >
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center mb-4 shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-slate-900 to-sky-700 dark:from-white dark:to-sky-300 bg-clip-text text-transparent tracking-tight">
                  {stat.val}
                </div>

                <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mt-2">
                  {stat.label}
                </div>

                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-1">
                  {stat.sub}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsCounterBar;

