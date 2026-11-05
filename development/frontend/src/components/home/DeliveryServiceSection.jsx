import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Truck,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { DecorativeTrajectory } from "./DecorativeTrajectory";
import { formatBDT } from "../../lib/utils";

const dhakaZones = [
  {
    id: "gulshan",
    nameEn: "Gulshan (1 & 2)",
    nameBn: "গুলশান (১ ও ২)",
    fee: 50,
    leadTime: "35 - 50 Mins",
    hub: "Banani-Gulshan Central Hub",
    van: "Fleet Van #02 [Express]",
    minOrder: 150,
    available: true,
  },
  {
    id: "banani",
    nameEn: "Banani & DOHS",
    nameBn: "বনানী ও ডিওএইচএস",
    fee: 50,
    leadTime: "25 - 45 Mins",
    hub: "Banani Primary Hub",
    van: "Fleet Van #01 [Express]",
    minOrder: 150,
    available: true,
  },
  {
    id: "dhanmondi",
    nameEn: "Dhanmondi",
    nameBn: "ধানমন্ডি",
    fee: 60,
    leadTime: "45 - 65 Mins",
    hub: "Dhanmondi Micro-Hub",
    van: "Fleet Van #05 [Express]",
    minOrder: 200,
    available: true,
  },
  {
    id: "uttara",
    nameEn: "Uttara (Sectors 1-14)",
    nameBn: "উত্তরা (সেক্টর ১-১৪)",
    fee: 60,
    leadTime: "40 - 60 Mins",
    hub: "Uttara Sub-Station Hub",
    van: "Fleet Van #08 [Express]",
    minOrder: 200,
    available: true,
  },
  {
    id: "bashundhara",
    nameEn: "Bashundhara R/A",
    nameBn: "বসুন্ধরা আ/এ",
    fee: 50,
    leadTime: "30 - 50 Mins",
    hub: "Kuril-Bashundhara Hub",
    van: "Fleet Van #03 [Express]",
    minOrder: 150,
    available: true,
  },
  {
    id: "mirpur",
    nameEn: "Mirpur (1, 2, 10, 11)",
    nameBn: "মিরপুর (১, ২, ১০, ১১)",
    fee: 70,
    leadTime: "50 - 75 Mins",
    hub: "Mirpur 10 Station",
    van: "Fleet Van #09 [Standard]",
    minOrder: 200,
    available: true,
  },
  {
    id: "mohammadpur",
    nameEn: "Mohammadpur",
    nameBn: "মোহাম্মদপুর",
    fee: 70,
    leadTime: "50 - 70 Mins",
    hub: "Dhanmondi-Mohammadpur Hub",
    van: "Fleet Van #06 [Standard]",
    minOrder: 200,
    available: true,
  },
];

export function DeliveryServiceSection() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [selectedZoneId, setSelectedZoneId] = useState("gulshan");
  const selectedZone = dhakaZones.find((z) => z.id === selectedZoneId) || dhakaZones[0];

  return (
    <section id="delivery-service" className="py-20 sm:py-28 bg-white dark:bg-slate-900 scroll-mt-24 transition-colors duration-300 relative overflow-hidden">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content & Coverage Selector */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
          >
            <div>
              <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-200 dark:border-sky-800 inline-block mb-3">
                {isBn ? "স্মার্ট কোল্ড-চেইন লজিস্টিকস" : "MICRO-HUB DISPATCH ENGINE"}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {isBn ? (
                  <>
                    ডেলিভারি <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">সার্ভিস</span> ও কভারেজ ক্যালকুলেটর
                  </>
                ) : (
                  <>
                    EXPRESS DELIVERY <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">SERVICE</span>
                  </>
                )}
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mt-3 mx-auto lg:mx-0" />
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {isBn
                ? "আমরা ১ থেকে ২ ঘণ্টার মধ্যে ঢাকা মেট্রোপলিটন এলাকার যেকোনো প্রান্তে আপনার ঘরের দরজায় বিশুদ্ধ পানি পৌঁছে দিই। নিজস্ব তাপমাত্রা-নিয়ন্ত্রিত আধুনিক ভ্যান বহর।"
                : "We deliver laboratory-certified pure water directly to your door within 1-2 hours across prime Dhaka zones using our dedicated temperature-controlled van fleet."}
            </p>

            {/* Quick Contact & Speed Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
              <a
                href="tel:+8809612278235"
                className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 flex items-center gap-3 hover:bg-sky-100/80 transition-colors group"
              >
                <div className="h-10 w-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Emergency Hotline</div>
                  <div className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">+880 9612-AQUA</div>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Standard Speed</div>
                  <div className="text-xs sm:text-sm font-black text-emerald-700 dark:text-emerald-300">1 - 2 Hours Doorstep</div>
                </div>
              </div>
            </div>

            {/* Interactive Neighborhood Zone Checker */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-sky-600" />
                    <span>{isBn ? "আপনার এলাকা নির্বাচন করুন:" : "Select Neighborhood:"}</span>
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Live Route Active
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {dhakaZones.map((zone) => (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => setSelectedZoneId(zone.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        selectedZoneId === zone.id
                          ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                          : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300"
                      }`}
                    >
                      {isBn ? zone.nameBn : zone.nameEn}
                    </button>
                  ))}
                </div>

                {/* Instant Dynamic Zone Result Box */}
                <motion.div
                  key={selectedZone.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-slate-700 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                        {isBn ? `${selectedZone.nameBn} - সম্পূর্ণ সার্ভিস চালু` : `${selectedZone.nameEn} Hub Serviceable`}
                      </span>
                    </div>
                    <span className="text-[11px] font-black text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full">
                      Fee: {formatBDT(selectedZone.fee, i18n.language)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Allocated Hub</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedZone.hub}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Dispatch</span>
                      <strong className="text-emerald-600 dark:text-emerald-400">{selectedZone.leadTime}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Assigned Van</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedZone.van}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Minimum Order</span>
                      <strong className="text-slate-800 dark:text-slate-200">{formatBDT(selectedZone.minOrder, i18n.language)}</strong>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Delivery Van Image with Dashed Trajectory Arc & Floating Live Badge */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-xl">
              {/* Decorative Dashed Arc Over the Van */}
              <DecorativeTrajectory className="absolute -top-12 left-0 w-full h-28 pointer-events-none z-10" />

              {/* Floating Live Dispatch Badge */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 sm:-right-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">Live GPS Dispatch</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Dhaka North & South</div>
                </div>
              </motion.div>

              {/* Floating Hygiene Badge */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-4 sm:-left-6 z-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-sky-100 dark:border-slate-700 flex items-center gap-2.5"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900 dark:text-white">100% Sanitized</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">UV-C Hermetic Caps</div>
                </div>
              </motion.div>

              {/* Main Image Frame with Smooth Hover Lift */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-sky-100/80 dark:border-slate-800 bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-800 dark:to-slate-900 relative group"
              >
                <img
                  src="/images/delivery-van.jpg"
                  alt="AquaFlow Rapid Delivery Micro-Van"
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

export default DeliveryServiceSection;

