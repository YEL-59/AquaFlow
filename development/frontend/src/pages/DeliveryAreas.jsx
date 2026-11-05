import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Building2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { formatBDT } from "../lib/utils";

const DHAKA_ZONES = [
  { id: "gulshan", nameEn: "Gulshan (1 & 2)", nameBn: "গুলশান (১ ও ২)", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Gulshan Central Depot" },
  { id: "banani", nameEn: "Banani & Kakoli", nameBn: "বনানী ও কাকলী", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Gulshan Central Depot" },
  { id: "dhanmondi", nameEn: "Dhanmondi & Kalabagan", nameBn: "ধানমন্ডি ও কলাবাগান", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Dhanmondi Micro-Hub" },
  { id: "uttara", nameEn: "Uttara (Sectors 1-14)", nameBn: "উত্তরা (সেক্টর ১-১৪)", fee: 60, leadTime: "2-3 Hours", minOrder: 200, available: true, hub: "Uttara Sector 7 Depot" },
  { id: "mirpur", nameEn: "Mirpur (1 to 14, DOHS)", nameBn: "মিরপুর (১ হতে ১৪, ডিওএইচএস)", fee: 60, leadTime: "2-3 Hours", minOrder: 200, available: true, hub: "Mirpur 10 Hub" },
  { id: "mohakhali", nameEn: "Mohakhali & DOHS", nameBn: "মহাখালী ও ডিওএইচএস", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Gulshan Central Depot" },
  { id: "baridhara", nameEn: "Baridhara & Diplomatic Zone", nameBn: "বারিধারা ডিপ্লোম্যাটিক জোন", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Gulshan Central Depot" },
  { id: "badda", nameEn: "Badda, Rampura & Aftabnagar", nameBn: "বাড্ডা, রামপুরা ও আফতাবনগর", fee: 50, leadTime: "2-3 Hours", minOrder: 150, available: true, hub: "Badda Micro-Hub" },
  { id: "motijheel", nameEn: "Motijheel, Dilkusha & Paltan", nameBn: "মতিঝিল, দিলকুশা ও পল্টন", fee: 60, leadTime: "2-3 Hours", minOrder: 200, available: true, hub: "Motijheel Corporate Depot" },
  { id: "bashundhara", nameEn: "Bashundhara R/A (Blocks A-M)", nameBn: "বসুন্ধরা আ/এ (ব্লক এ-এম)", fee: 50, leadTime: "1-2 Hours", minOrder: 150, available: true, hub: "Baridhara Hub" },
];

export function DeliveryAreas() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const [search, setSearch] = useState("");

  const filtered = DHAKA_ZONES.filter((z) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return z.nameEn.toLowerCase().includes(q) || z.nameBn.includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {isBn ? "ডেলিভারি এরিয়া ও কাভারেজ" : "Coverage & Neighborhood Service Areas"}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {isBn ? "ঢাকায় আমরা কোথায় পানি পৌঁছে দেই" : "Dhaka Water Delivery Coverage"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            {isBn
              ? "আপনার এলাকা সার্চ করে ডেলিভারি চার্জ, এক্সপ্রেস সময় ও মাইক্রো-হাবের তথ্য জানুন।"
              : "Search your neighborhood below to verify express delivery lead times, fees, and assigned micro-hubs."}
          </p>
        </div>

        {/* Neighborhood Checker Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isBn ? "আপনার এলাকা লিখুন (যেমন: গুলশান, ধানমন্ডি, উত্তরা...)" : "Search neighborhood (e.g. Gulshan, Dhanmondi, Uttara...)"}
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-md"
          />
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((z) => (
            <div
              key={z.id}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-start justify-between gap-4 hover:border-sky-500 transition group"
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-500" />
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {isBn ? z.nameBn : z.nameEn}
                  </h3>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Lead Time: {z.leadTime}</span>
                  <span>•</span>
                  <span>Min Order: ৳{z.minOrder}</span>
                </div>
                <div className="text-[10px] text-slate-400">Hub: {z.hub}</div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-black text-emerald-500 text-sm">৳{z.fee} Fee</div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-6">
          <Link to="/products">
            <button className="px-8 py-3.5 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold text-xs shadow-lg transition">
              {isBn ? "পণ্য নির্বাচন ও অর্ডার করুন" : "Browse Water Products & Order Now"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAreas;
