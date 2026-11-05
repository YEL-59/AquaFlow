import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  Droplets,
  RotateCcw,
  Pause,
  Play,
  XCircle,
  Plus,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  MapPin,
  Truck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { Button, Card, Badge } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";

const DAYS_OF_WEEK = [
  { id: "SATURDAY", labelEn: "Sat", labelBn: "শনিবার" },
  { id: "SUNDAY", labelEn: "Sun", labelBn: "রবিবার" },
  { id: "MONDAY", labelEn: "Mon", labelBn: "সোমবার" },
  { id: "TUESDAY", labelEn: "Tue", labelBn: "মঙ্গলবার" },
  { id: "WEDNESDAY", labelEn: "Wed", labelBn: "বুধবার" },
  { id: "THURSDAY", labelEn: "Thu", labelBn: "বৃহস্পতিবার" },
  { id: "FRIDAY", labelEn: "Fri", labelBn: "শুক্রবার" },
];

const INITIAL_DEMO_SUBS = [
  {
    id: "sub-demo-101",
    productNameEn: "AquaFlow 20L Pure Reusable Jar",
    productNameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
    quantityPerDelivery: 2,
    cadence: "CUSTOM_DAYS",
    customDays: ["SUNDAY", "TUESDAY", "THURSDAY"],
    preferredSlot: "MORNING",
    deliveryZone: "Gulshan-Banani",
    deliveryAddress: "House 14, Road 11, Block D, Banani",
    status: "ACTIVE",
    nextDeliveryDate: "2026-11-06",
    pricePerDelivery: 160,
  },
];

export function Subscriptions() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState(INITIAL_DEMO_SUBS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(null);
  const [pauseUntilDate, setPauseUntilDate] = useState("");

  // New Subscription Form State
  const [cadence, setCadence] = useState("CUSTOM_DAYS");
  const [selectedDays, setSelectedDays] = useState(["SUNDAY", "TUESDAY", "THURSDAY"]);
  const [quantity, setQuantity] = useState(2);
  const [slot, setSlot] = useState("MORNING");
  const [address, setAddress] = useState(user?.address || "House 14, Road 11, Block D, Banani");

  const toggleDay = (dayId) => {
    setSelectedDays((prev) =>
      prev.includes(dayId) ? prev.filter((d) => d !== dayId) : [...prev, dayId]
    );
  };

  const handleCreateSubscription = (e) => {
    e.preventDefault();
    const newSub = {
      id: `sub-${Date.now()}`,
      productNameEn: "AquaFlow 20L Pure Reusable Jar",
      productNameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
      quantityPerDelivery: quantity,
      cadence,
      customDays: cadence === "CUSTOM_DAYS" ? selectedDays : [],
      preferredSlot: slot,
      deliveryZone: "Dhaka Central",
      deliveryAddress: address,
      status: "ACTIVE",
      nextDeliveryDate: "2026-11-06",
      pricePerDelivery: quantity * 80,
    };

    setSubscriptions([newSub, ...subscriptions]);
    setShowCreateModal(false);
  };

  const handleTogglePause = (subId) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id === subId) {
          const isPaused = s.status === "PAUSED";
          return {
            ...s,
            status: isPaused ? "ACTIVE" : "PAUSED",
            pauseEndDate: isPaused ? null : pauseUntilDate || "2026-11-15",
          };
        }
        return s;
      })
    );
    setShowPauseModal(null);
  };

  const handleCancelSub = (subId) => {
    if (confirm(currentLang === "bn" ? "আপনি কি নিশ্চিত সাবস্ক্রিপশন বাতিল করতে চান?" : "Are you sure you want to cancel this subscription?")) {
      setSubscriptions((prev) =>
        prev.map((s) => (s.id === subId ? { ...s, status: "CANCELLED" } : s))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Fancy Hero Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-3 shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-sky-500" />
            <span>{currentLang === "bn" ? "নিয়মিত অটো-ডেলিভারি প্ল্যান" : "Automated Recurring Hydration"}</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {currentLang === "bn" ? "পানি শেষ হওয়ার দুশ্চিন্তা আর নয়" : "Never Run Out of Clean Water"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {currentLang === "bn"
              ? "আপনার সাপ্তাহিক বা মাসিক সময়সূচী ঠিক করুন। আমাদের ডেলিভারি টিম নির্দিষ্ট দিনে পৌঁছে দিবে।"
              : "Set your schedule once. Sanitized 20L jars delivered fresh to your door on your terms."}
          </p>

          <Button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="mt-5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-lg shadow-sky-500/25 px-6 py-2.5 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{currentLang === "bn" ? "নতুন সাবস্ক্রিপশন শুরু করুন" : "Set Up Water Subscription"}</span>
          </Button>
        </div>

        {/* Benefits Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl glass-card border border-sky-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                {currentLang === "bn" ? "নির্দিষ্ট সময়ে ডেলিভারি" : "Guaranteed Morning Slot"}
              </div>
              <div className="text-slate-500 text-xs">{currentLang === "bn" ? "সকাল ৯টা হতে ১টার মাঝে" : "09:00 - 13:00 dispatch"}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-sky-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold">
              <Pause className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                {currentLang === "bn" ? "ছুটিতে সাময়িক পজ" : "Holiday Vacation Pause"}
              </div>
              <div className="text-slate-500 text-xs">{currentLang === "bn" ? "যেকোনো সময় স্থগিত করুন" : "Pause anytime with 1-click"}</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-sky-100 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">
                {currentLang === "bn" ? "স্বয়ংক্রিয় জার বদল" : "Zero Deposit Refills"}
              </div>
              <div className="text-slate-500 text-xs">{currentLang === "bn" ? "খালি জার দিয়ে নতুন জার নিন" : "Swap empty jar for full"}</div>
            </div>
          </div>
        </div>

        {/* Active Subscriptions List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Droplets className="w-5 h-5 text-sky-600" />
            <span>{currentLang === "bn" ? "আপনার সক্রিয় সাবস্ক্রিপশনসমূহ" : "Your Active Subscriptions"}</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="glass-card p-6 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {currentLang === "bn" ? sub.productNameBn : sub.productNameEn}
                    </h3>
                    {sub.status === "ACTIVE" && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        ● {currentLang === "bn" ? "সক্রিয়" : "Active"}
                      </span>
                    )}
                    {sub.status === "PAUSED" && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                        ⏸ {currentLang === "bn" ? "সাময়িক স্থগিত" : "Paused"}
                      </span>
                    )}
                    {sub.status === "CANCELLED" && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                        ✕ {currentLang === "bn" ? "বাতিলকৃত" : "Cancelled"}
                      </span>
                    )}
                  </div>

                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-4">
                    <div>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">
                        {sub.quantityPerDelivery} {currentLang === "bn" ? "টি জার প্রতি ডেলিভারিতে" : "Jars per Delivery"}
                      </span>
                    </div>
                    <span>•</span>
                    <div>
                      {sub.cadence === "CUSTOM_DAYS"
                        ? sub.customDays.join(", ")
                        : sub.cadence}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sub.preferredSlot}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sub.deliveryAddress}</span>
                  </div>

                  {sub.status === "ACTIVE" && (
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      {currentLang === "bn"
                        ? `পরবর্তী ডেলিভারি: ${sub.nextDeliveryDate}`
                        : `Next Scheduled Delivery: ${sub.nextDeliveryDate}`}
                    </div>
                  )}
                </div>

                {/* Actions */}
                {sub.status !== "CANCELLED" && (
                  <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    {sub.status === "ACTIVE" ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowPauseModal(sub.id)}
                        className="rounded-xl text-xs flex items-center gap-1.5"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>{currentLang === "bn" ? "ছুটিতে পজ করুন" : "Pause Plan"}</span>
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleTogglePause(sub.id)}
                        className="rounded-xl text-xs bg-emerald-600 hover:bg-emerald-500 flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{currentLang === "bn" ? "পুনরায় চালু করুন" : "Resume"}</span>
                      </Button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleCancelSub(sub.id)}
                      className="text-xs text-rose-500 hover:text-rose-600 font-semibold px-2"
                    >
                      {currentLang === "bn" ? "বাতিল" : "Cancel"}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vacation Pause Modal */}
        {showPauseModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-card p-6 rounded-3xl border border-sky-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pause className="w-5 h-5 text-amber-500" />
                <span>{currentLang === "bn" ? "ছুটি বা ভ্রমণের জন্য সাময়িক স্থগিত" : "Pause Subscription"}</span>
              </h3>
              <p className="text-xs text-slate-500">
                {currentLang === "bn"
                  ? "ছুটিতে থাকা অবস্থায় ডেলিভারি বন্ধ থাকবে এবং কোনো চার্জ কাটা হবে না।"
                  : "Automatic deliveries will pause. You will not be charged or contacted until your resumption date."}
              </p>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  {currentLang === "bn" ? "কবে পুনরায় শুরু করতে চান?" : "Resume Deliveries On:"}
                </label>
                <input
                  type="date"
                  value={pauseUntilDate}
                  onChange={(e) => setPauseUntilDate(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => setShowPauseModal(null)}
                >
                  {currentLang === "bn" ? "ফিরে যান" : "Cancel"}
                </Button>
                <Button
                  variant="primary"
                  className="flex-1 rounded-xl bg-amber-600 hover:bg-amber-500"
                  onClick={() => handleTogglePause(showPauseModal)}
                >
                  {currentLang === "bn" ? "পজ নিশ্চিত করুন" : "Confirm Pause"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Create Subscription Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-lg w-full glass-card p-6 rounded-3xl border border-sky-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 space-y-5 my-8">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  <span>{currentLang === "bn" ? "নতুন সাবস্ক্রিপশন প্ল্যান" : "New Subscription Plan"}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSubscription} className="space-y-4 text-xs sm:text-sm">
                {/* Cadence */}
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {currentLang === "bn" ? "ডেলিভারি ফ্রিকোয়েন্সি" : "Delivery Frequency"}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "CUSTOM_DAYS", label: currentLang === "bn" ? "নির্দিষ্ট দিনসমূহে" : "Selected Days" },
                      { id: "DAILY", label: currentLang === "bn" ? "প্রতিদিন" : "Every Day" },
                      { id: "ALTERNATE_DAYS", label: currentLang === "bn" ? "একদিন পর পর" : "Alternate Days" },
                      { id: "WEEKLY", label: currentLang === "bn" ? "সপ্তাহে একদিন" : "Once a Week" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCadence(item.id)}
                        className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                          cadence === item.id
                            ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                            : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day Selector (if CUSTOM_DAYS) */}
                {cadence === "CUSTOM_DAYS" && (
                  <div>
                    <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                      {currentLang === "bn" ? "সপ্তাহের দিন নির্বাচন করুন" : "Choose Delivery Days"}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {DAYS_OF_WEEK.map((day) => {
                        const isSelected = selectedDays.includes(day.id);
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => toggleDay(day.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                              isSelected
                                ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {currentLang === "bn" ? day.labelBn : day.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {currentLang === "bn" ? "প্রতিবারে কতটি ২০ লিটার জার লাগবে?" : "20L Jars per Delivery"}
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 5, 10].map((qty) => (
                      <button
                        key={qty}
                        type="button"
                        onClick={() => setQuantity(qty)}
                        className={`w-10 h-10 rounded-xl font-extrabold text-sm border transition ${
                          quantity === qty
                            ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Slot */}
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {currentLang === "bn" ? "পছন্দের সময়" : "Preferred Slot"}
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="MORNING">Morning (09:00 - 13:00)</option>
                    <option value="AFTERNOON">Afternoon (14:00 - 18:00)</option>
                    <option value="EVENING">Evening (18:00 - 21:00)</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="font-bold text-slate-800 dark:text-slate-200 block mb-1.5">
                    {currentLang === "bn" ? "ডেলিভারি ঠিকানা" : "Delivery Address"}
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                {/* Summary */}
                <div className="p-3 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 text-xs flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-300">
                    {currentLang === "bn" ? "প্রতি ডেলিভারিতে বিল:" : "Cost per Delivery:"}
                  </span>
                  <span className="text-base font-extrabold text-sky-600 dark:text-sky-400">
                    {formatBDT(quantity * 80, currentLang)}
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-md shadow-sky-500/20"
                >
                  {currentLang === "bn" ? "সাবস্ক্রিপশন সক্রিয় করুন" : "Activate Subscription"}
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;
