import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, Building2, Home, Globe, Quote } from "lucide-react";

export function TestimonialsSection() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [activeCategory, setActiveCategory] = useState("ALL");

  const CATEGORIES = [
    { id: "ALL", label: isBn ? "সকল রিভিউ (৫,৮০০+)" : "All Reviews (5,800+)", icon: Globe },
    { id: "RESIDENTIAL", label: isBn ? "আবাসিক ও পরিবার" : "Homes & Families", icon: Home },
    { id: "CORPORATE", label: isBn ? "কর্পোরেট ও অফিস" : "Corporate & Offices", icon: Building2 },
  ];

  const REVIEWS = [
    {
      id: 1,
      cat: "RESIDENTIAL",
      name: "Sadia Rahman",
      title: isBn ? "গুলশান ২, ঢাকা" : "Gulshan 2, Dhaka",
      avatarText: "SR",
      color: "from-sky-400 to-cyan-300",
      rating: 5,
      leadTime: "45 mins dispatch",
      jarsMonthly: "4 Jars/Mo",
      quote: isBn
        ? "“গুলশানে আমাদের বাসার জন্য অ্যাকুয়াফ্লোর সার্ভিস নিয়েছি। অর্ডার দিলে ৯০ মিনিটের মধ্যেই ডেলিভারি দেয় এবং পানির স্বাদ সত্যি অপূর্ব ও সতেজ।”"
        : "“AquaFlow has completely solved our drinking water concerns in Gulshan. Delivery is always within 90 minutes and the taste is remarkably crisp and pure.”",
    },
    {
      id: 2,
      cat: "CORPORATE",
      name: "Tanvir Ahmed",
      title: isBn ? "হেড অব অপস, টেকহাব বনানী" : "Head of Ops, TechHub Banani",
      avatarText: "TA",
      color: "from-blue-500 to-sky-400",
      rating: 5,
      leadTime: "Recurring Mon/Thu",
      jarsMonthly: "24 Jars/Mo",
      quote: isBn
        ? "“আমাদের বনানীর অফিসের জন্য অটোমেটেড সাবস্ক্রিপশন নিয়েছি। জারগুলো সবসময় ঝকঝকে পরিষ্কার থাকে এবং ইনভয়েসিং সিস্টেম খুবই সহজ ও স্বয়ংক্রিয়।”"
        : "“Switching our corporate office supply in Banani to AquaFlow automated subscriptions was the best decision. Invoices are clear and jars are spotless.”",
    },
    {
      id: 3,
      cat: "RESIDENTIAL",
      name: "Dr. Farhana Yasmin",
      title: isBn ? "ধানমন্ডি ২৭, ঢাকা" : "Dhanmondi 27, Dhaka",
      avatarText: "FY",
      color: "from-emerald-500 to-teal-400",
      rating: 5,
      leadTime: "60 mins dispatch",
      jarsMonthly: "6 Jars/Mo",
      quote: isBn
        ? "“ভারী জার বহন করার ঝামেলা আর নেই। নির্দিষ্ট দিনে ঠিক সময়ে দরজায় রেখে যায়। একজন চিকিৎসক হিসেবে ল্যাব টেস্ট রিপোর্ট দেখে আমি সম্পূর্ণ আশ্বস্ত।”"
        : "“No more lifting heavy jars or waiting for delayed suppliers. As a physician, I reviewed their laboratory TDS reports and I am thoroughly impressed.”",
    },
    {
      id: 4,
      cat: "CORPORATE",
      name: "Mahmud Hasan",
      title: isBn ? "ম্যানেজার, বারারি ক্যাফে উত্তরা" : "Manager, Barari Cafe Uttara",
      avatarText: "MH",
      color: "from-purple-500 to-pink-400",
      rating: 5,
      leadTime: "Express Hub",
      jarsMonthly: "30 Jars/Mo",
      quote: isBn
        ? "“আমাদের ক্যাফের এসপ্রেসো কফি তৈরির জন্য পানির সঠিক টিডিএস খুব জরুরি। অ্যাকুয়াফ্লোর পানি নিখুঁত ভারসাম্য বজায় রাখে।”"
        : "“For specialty coffee extraction, water hardness and TDS must be exact. AquaFlow provides consistent 135 ppm mineral water every delivery.”",
    },
    {
      id: 5,
      cat: "RESIDENTIAL",
      name: "Nusrat Jahan",
      title: isBn ? "বসুন্ধরা আ/এ, ঢাকা" : "Bashundhara R/A, Block C",
      avatarText: "NJ",
      color: "from-amber-400 to-orange-400",
      rating: 5,
      leadTime: "Fast Micro-van",
      jarsMonthly: "4 Jars/Mo",
      quote: isBn
        ? "“অ্যাপ থেকেই খুব সহজে সাবস্ক্রিপশন পজ বা রিফিল করা যায়। বিকাশ দিয়ে এক ক্লিকে পেমেন্ট করা যায়, সার্ভিস দারুণ!”"
        : "“Managing delivery dates and jar refills through their customer portal is ridiculously smooth. Instant bKash checkout and zero hassle.”",
    },
    {
      id: 6,
      cat: "CORPORATE",
      name: "David K. Larson",
      title: isBn ? "কূটনৈতিক আবাসন, বারিধারা" : "Diplomatic Residence, Baridhara",
      avatarText: "DL",
      color: "from-cyan-500 to-blue-600",
      rating: 5,
      leadTime: "Priority Diplomatic",
      jarsMonthly: "12 Jars/Mo",
      quote: isBn
        ? "“আন্তর্জাতিক মানের মতো বিশুদ্ধ ও ফুড গ্রেড সিল করা বোতল ঢাকায় পাওয়া সত্যিই চমৎকার অভিজ্ঞতা।”"
        : "“Exceeds international drinking water protocols. The UV-C sterilization and sealed tamper-evident security caps give complete peace of mind.”",
    },
  ];

  const filteredReviews =
    activeCategory === "ALL"
      ? REVIEWS.slice(0, 3)
      : REVIEWS.filter((r) => r.cat === activeCategory).slice(0, 3);

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-3"
        >
          <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 inline-block">
            {isBn ? "৫,৮০০+ সন্তুষ্ট গ্রাহকের অভিজ্ঞতা" : "5,800+ TRUSTED DHAKA CITIZENS"}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            WHAT <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">OUR CLIENTS SAY</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {isBn ? "ঢাকার বিভিন্ন এলাকার সম্মানিত গ্রাহকদের বিশ্বস্ত মতামত" : "Real experiences from satisfied households, diplomats, and offices across Dhaka"}
          </p>
        </motion.div>

        {/* Filter Category Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all border ${
                  isSelected
                    ? "bg-[#0284c7] text-white border-[#0284c7] shadow-md shadow-sky-500/25"
                    : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filtered Review Cards Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-slate-50/70 dark:bg-slate-800/80 rounded-3xl p-7 border border-slate-200/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-sky-400/60 transition-all flex flex-col justify-between relative group"
              >
                {/* Floating Top Quote watermark */}
                <Quote className="absolute top-6 right-6 h-10 w-10 text-sky-500/10 dark:text-sky-400/10 group-hover:scale-125 transition-transform pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Verified Client</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6 italic font-medium">
                    {review.quote}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-2xl bg-gradient-to-tr ${review.color} flex items-center justify-center font-black text-white text-sm shadow-md`}>
                      {review.avatarText}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {review.name}
                      </h4>
                      <p className="text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                        {review.title}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-bold">{review.jarsMonthly}</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{review.leadTime}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Centered Button */}
        <div className="text-center">
          <Link to="/products">
            <button className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95">
              {isBn ? "সকল রিভিউ ও রেটিং দেখুন" : "View All Customer Reviews"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

