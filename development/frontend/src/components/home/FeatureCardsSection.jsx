import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Droplets, Truck, ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export function FeatureCardsSection() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const CARDS = [
    {
      id: "natural",
      icon: Droplets,
      title: isBn ? "প্রাকৃতিক খনিজ পানি" : "Natural Mineral Balance",
      desc: isBn
        ? "ক্যালসিয়াম ও ম্যাগনেসিয়াম সমৃদ্ধ এবং নিখুঁত পিএইচ ৭.২-৭.৮ এর প্রাকৃতিক ভারসাম্য।"
        : "Naturally balanced pH 7.2-7.8 and essential calcium-magnesium electrolytes for crisp hydration.",
      link: "/products",
      tag: "pH 7.2 Alkaline",
      gradient: "from-sky-500/20 to-cyan-400/20",
      accent: "text-sky-500",
    },
    {
      id: "delivery",
      icon: Truck,
      title: isBn ? "এক্সপ্রেস ডোরস্টেপ ডেলিভারি" : "3-Hour Hub Express",
      desc: isBn
        ? "গুলশান, বনানী, ধানমন্ডি, উত্তরায় ডেডিকেটেড ভ্যান দিয়ে দ্রুত ৩ ঘণ্টার মধ্যে ডোরস্টেপ সরবরাহ।"
        : "Dedicated temperature-controlled micro-van fleet operating across all prime Dhaka metro hubs.",
      link: "/delivery-areas",
      tag: "3 Dhaka Hubs",
      gradient: "from-emerald-500/20 to-teal-400/20",
      accent: "text-emerald-500",
    },
    {
      id: "clean",
      icon: ShieldCheck,
      title: isBn ? "১০০% জীবাণুমুক্ত জার" : "Medical UV-C Sterilized",
      desc: isBn
        ? "ইউভি-সি জীবাণুমুক্ত ফুড-গ্রেড বিপিএ-মুক্ত ২০ লিটার রিইউজেবল বোতল এবং সম্পূর্ণ নিরাপদ সিল।"
        : "Medical-grade UV-C sterilized, food-safe BPA-free 20-liter dispenser jars with hermetic caps.",
      link: "/products/aqua-pure-20l-jar",
      tag: "BDS 1240:2021",
      gradient: "from-cyan-500/20 to-blue-500/20",
      accent: "text-cyan-500",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-sky-500/60 dark:hover:border-sky-500/60 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Ambient Top Glow on Hover */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 rounded-full bg-sky-400/10 dark:bg-sky-500/10 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${card.gradient} flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-md`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shadow-sm">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <Link
                  to={card.link}
                  className="mt-auto text-xs sm:text-sm font-extrabold text-sky-600 dark:text-sky-400 hover:text-sky-500 inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                >
                  <span>{isBn ? "বিস্তারিত জানুন" : "Explore Details"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureCardsSection;
