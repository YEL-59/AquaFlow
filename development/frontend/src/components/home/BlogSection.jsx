import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Send, Calendar, Droplets, Sparkles, Heart, ArrowRight, Clock } from "lucide-react";

export function BlogSection() {
  const { i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const POSTS = [
    {
      id: 1,
      image: "/images/blog-dolphin.jpg",
      icon: Droplets,
      date: "Nov 02, 2026",
      readTime: "3 min read",
      tag: "Hydration",
      tagColor: "bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200 dark:border-sky-800",
      title: isBn ? "প্রতিদিনের সতেজ পানির গোপন রহস্য" : "The Science of Daily Cellular Hydration",
      desc: isBn
        ? "শরীরের সঠিক কোষীয় ভারসাম্য, ত্বক ও কর্মক্ষমতা বজায় রাখতে নিয়মিত বিশুদ্ধ পানির ভূমিকা অপরিহার্য।"
        : "Discover how optimal mineral hydration boosts cognitive stamina, metabolic clarity, and cellular health.",
    },
    {
      id: 2,
      image: "/images/blog-iceberg.jpg",
      icon: Sparkles,
      date: "Oct 28, 2026",
      readTime: "4 min read",
      tag: "Laboratory Purity",
      tagColor: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/60 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
      title: isBn ? "পানির টিডিএস ও মিনারেল ভারসাম্য কেন জরুরি?" : "Why TDS & Mineral Electrolytes Truly Matter",
      desc: isBn
        ? "টিডিএস, পিএইচ এবং প্রাকৃতিক ইলেক্ট্রোলাইট উপাদান কীভাবে পানির স্বাদ ও স্বাস্থ্যের মান নির্ধারণ করে।"
        : "Demystifying drinking water: understand Total Dissolved Solids, alkaline pH, and ionic electrolytes for wellness.",
    },
    {
      id: 3,
      image: "/images/blog-athlete.jpg",
      icon: Heart,
      date: "Oct 22, 2026",
      readTime: "3 min read",
      tag: "Active Living",
      tagColor: "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      title: isBn ? "সক্রিয় জীবনের জন্য বিশুদ্ধ পানি" : "Clean Hydration for Active Everyday Lifestyles",
      desc: isBn
        ? "শরীরচর্চা ও কর্মব্যস্ত দিনে ক্লান্তি দূর করতে সঠিক সময়ে পানি পানের স্বাস্থ্যকর টিপস।"
        : "How structured water intake prevents physical fatigue, accelerates muscle recovery, and keeps energy consistent.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#f8fbfe] dark:bg-slate-900/90 transition-colors duration-300 relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-2xl bg-sky-100 dark:bg-slate-800 text-[#0284c7] mx-auto mb-1 shadow-sm">
            <Send className="h-5 w-5" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">HEALTH & PURITY</span> INSIGHTS
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto" />
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
            {isBn ? "স্বাস্থ্য, পুষ্টি ও পানি পরিশোধন সম্পর্কিত দরকারি বৈজ্ঞানিক তথ্য" : "Essential insights on hydration, mineral health, and daily wellness from our certified water laboratory"}
          </p>
        </motion.div>

        {/* 3 Animated Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {POSTS.map((post, idx) => {
            const Icon = post.icon;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:border-sky-400/50 transition-all flex flex-col group"
              >
                <div className="relative h-56 sm:h-60 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 right-4 h-9 w-9 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-[#0284c7] shadow-md">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <div className="absolute bottom-4 left-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-sm ${post.tagColor}`}>
                      {post.tag}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#0284c7] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {post.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60">
                    <span className="text-xs sm:text-sm font-black text-[#0284c7] group-hover:text-[#0369a1] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      <span>{isBn ? "বিস্তারিত পড়ুন" : "Read Full Article"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Centered Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-white font-extrabold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/20 transition-all hover:scale-105 active:scale-95">
            {isBn ? "সকল বৈজ্ঞানিক ব্লগ পড়ুন" : "View All Knowledge Articles"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogSection;

