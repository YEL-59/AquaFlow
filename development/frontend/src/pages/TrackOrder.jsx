import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { formatBDT } from "../lib/utils";

const DEMO_TRACKING = {
  id: "ORD-20261104-7821",
  customer: "Engr. Tanvir Ahmed",
  phone: "01711223344",
  address: "House 14, Road 11, Block D, Banani, Dhaka",
  slot: "Morning (9:00 AM - 1:00 PM)",
  rider: "Md. Rafiqul Islam (Van 01)",
  riderPhone: "+880 1713-456789",
  currentStep: 3, // 1: Placed, 2: Validated, 3: Confirmed & Dispatched, 4: Delivered, 5: Reconciled
  totalBDT: 290,
  emptyJarsToReturn: 2,
};

export function TrackOrder() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  const [inputVal, setInputVal] = useState(initialId || "ORD-20261104-7821");
  const [order, setOrder] = useState(DEMO_TRACKING);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setOrder({ ...DEMO_TRACKING, id: inputVal.trim() });
    }
  };

  const STEPS = [
    {
      num: 1,
      title: "Customer places order",
      titleBn: "অর্ডার গ্রহণ",
      desc: "Product, quantity, address and payment choice",
      descBn: "পণ্য, পরিমাণ, ডেলিভারি ঠিকানা ও পেমেন্ট পদ্ধতি নিশ্চিত হয়েছে",
    },
    {
      num: 2,
      title: "Backend validates order",
      titleBn: "সার্ভার ভ্যালিডেশন",
      desc: "Coverage, price, stock and delivery slot capacity checked",
      descBn: "ডেলিভারি কাভারেজ, স্টক ও ডেলিভারি স্লট ভ্যালিডেট হয়েছে",
    },
    {
      num: 3,
      title: "Admin confirms and assigns delivery",
      titleBn: "ডেলিভারি টিম ও ভ্যান অ্যাসাইন",
      desc: "Order allocated to Banani Micro-Hub and dispatched with courier",
      descBn: "নিকটস্থ হাব থেকে ডেলিভারি বয় মো. রফিকুল ইসলাম রওনা দিয়েছেন",
    },
    {
      num: 4,
      title: "Delivery staff completes delivery",
      titleBn: "দোরগোড়ায় ডেলিভারি সম্পন্ন",
      desc: "Delivered quantities, empty jars collection and payment receipt",
      descBn: "বিশুদ্ধ জার হস্তান্তর, খালি জার সংগ্রহ ও ক্যাশ গ্রহণ",
    },
    {
      num: 5,
      title: "System reconciles records",
      titleBn: "সিস্টেম রিকনসিলিয়েশন",
      desc: "Order status, inventory, jar ledger and payment balance settled",
      descBn: "স্টক লেজার, খালি জার ব্যালেন্স ও পেমেন্ট রিকনসাইল হয়েছে",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-3xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {isBn ? "লাইভ অর্ডার ট্র্যাকিং" : "Live Water Delivery Tracking"}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {isBn ? "আপনার পানির বর্তমান অবস্থান দেখুন" : "Track Your Pure Water Order"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {isBn
              ? "অর্ডার আইডি অথবা মোবাইল নাম্বার দিয়ে বর্তমান অগ্রগতি জানুন।"
              : "Enter your order number or phone to see live fulfillment and rider dispatch status."}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="e.g. ORD-20261104-7821 or 017..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
          >
            {isBn ? "খুঁজুন" : "Track"}
          </button>
        </form>

        {order && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-8">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 text-xs">
              <div>
                <div className="text-[11px] text-slate-400 font-bold uppercase">Tracking Order</div>
                <div className="text-lg font-black text-sky-600 dark:text-sky-400 font-mono">
                  {order.id}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
                  {order.customer} • {order.address}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${order.riderPhone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-600 border border-sky-200 dark:border-sky-800 font-bold"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Rider</span>
                </a>
                <span className="text-emerald-500 font-black text-sm">
                  {formatBDT(order.totalBDT, "en")}
                </span>
              </div>
            </div>

            {/* 5-Step Order Workflow Progression */}
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">
                {isBn ? "৫-ধাপের ডেলিভারি ওয়ার্কফ্লো" : "5-Stage Fulfillment Pipeline"}
              </h3>

              <div className="space-y-4">
                {STEPS.map((step) => {
                  const isDone = order.currentStep >= step.num;
                  const isCurrent = order.currentStep === step.num;

                  return (
                    <div
                      key={step.num}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                        isCurrent
                          ? "bg-sky-50/80 dark:bg-sky-950/40 border-sky-400 shadow-md ring-1 ring-sky-400"
                          : isDone
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/60"
                          : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isDone
                            ? "bg-emerald-500 text-white"
                            : isCurrent
                            ? "bg-sky-500 text-white animate-pulse"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                        }`}
                      >
                        {isDone ? "✓" : step.num}
                      </div>

                      <div className="flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-black text-sm ${
                              isCurrent
                                ? "text-sky-600 dark:text-sky-400"
                                : isDone
                                ? "text-slate-900 dark:text-white"
                                : "text-slate-500"
                            }`}
                          >
                            {isBn ? step.titleBn : step.title}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-black uppercase animate-pulse">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {isBn ? step.descBn : step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
