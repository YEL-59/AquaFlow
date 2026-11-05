import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Megaphone,
  Globe,
  Sliders,
} from "lucide-react";
import { Button } from "../ui/button";
import { useContent } from "../../context/ContentContext";

export function ContentManager() {
  const { t, i18n } = useTranslation();
  const { content, updateContent, isLoading } = useContent();

  const [form, setForm] = useState(() => ({
    hero: {
      headlineEn: content?.hero?.headlineEn || "READY TO GET HYDRATED?",
      headlineBn: content?.hero?.headlineBn || "পানির বিশুদ্ধতায় অতুলনীয়?",
      subtitleEn:
        content?.hero?.subtitleEn ||
        "Experience the purest mineral-balanced water in Dhaka. Express 1-2 hour delivery right to your door with hermetically sealed, medical-grade sanitized bottles.",
      subtitleBn:
        content?.hero?.subtitleBn ||
        "ঢাকায় ঘরে ঘরে পৌঁছে দিচ্ছি ল্যাব-পরীক্ষিত শতভাগ বিশুদ্ধ খাবার পানি। অর্ডার করার ১-২ ঘণ্টার মধ্যেই এক্সপ্রেস ডেলিভারি।",
      ctaTextEn: content?.hero?.ctaTextEn || "Order Now",
      ctaTextBn: content?.hero?.ctaTextBn || "অর্ডার করুন",
      videoUrl: content?.hero?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    announcement: {
      enabled: content?.announcement?.enabled !== false,
      badgeText: content?.announcement?.badgeText || "SPECIAL PROMO",
      textEn:
        content?.announcement?.textEn ||
        "⚡ Fast 1-2 Hour Delivery across Gulshan, Banani, Dhanmondi, Uttara & Mirpur! Free Jar Delivery on Subscriptions.",
      textBn:
        content?.announcement?.textBn ||
        "⚡ গুলশান, বনানী, ধানমন্ডি, উত্তরা ও মিরপুরে ১-২ ঘণ্টার এক্সপ্রেস ডেলিভারি! সাবস্ক্রিপশনে ফ্রি ডেলিভারি।",
    },
    contact: {
      hotline: content?.contact?.hotline || "+880 9612-278235",
      hotlineDisplay: content?.contact?.hotlineDisplay || "+880 9612-AQUA",
      email: content?.contact?.email || "support@aquaflow.com.bd",
      addressEn: content?.contact?.addressEn || "Gulshan Avenue, Dhaka-1212, Bangladesh",
      addressBn: content?.contact?.addressBn || "গুলশান এভিনিউ, ঢাকা-১২১২, বাংলাদেশ",
      hoursEn: content?.contact?.hoursEn || "7:00 AM – 10:00 PM (Everyday)",
      hoursBn: content?.contact?.hoursBn || "সকাল ৭:০০ - রাত ১০:০০ (প্রতিদিন)",
    },
    standards: {
      bstiLicense: content?.standards?.bstiLicense || "BDS 1240:2021",
      tdsRange: content?.standards?.tdsRange || "120 - 150 PPM",
      phRange: content?.standards?.phRange || "7.2 - 7.6 pH",
      filtrationStages: content?.standards?.filtrationStages || "7-Stage Medical-Grade RO",
    },
  }));

  const [toastMessage, setToastMessage] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState("HERO");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await updateContent(form);
    showToast("✓ Site Content updated successfully! Live changes are synced.");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-md">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab("HERO")}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeSubTab === "HERO"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hero & Landing Copy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("PROMO")}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeSubTab === "PROMO"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Announcement Banner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("CONTACT")}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeSubTab === "CONTACT"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hotline & Support</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("STANDARDS")}
            className={`px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-2 ${
              activeSubTab === "STANDARDS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/30"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BSTI & Lab Standards</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{isLoading ? "Saving..." : "Save All Changes"}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* HERO SECTION TAB */}
        {activeSubTab === "HERO" && (
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-5">
            <div className="border-b border-slate-700/60 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Hero Section Headline & Subtitle</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Modifies the high-converting copy seen at the very top of the homepage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Main Headline (English)
                </label>
                <input
                  type="text"
                  value={form.hero.headlineEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, headlineEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Main Headline (Bangla)
                </label>
                <input
                  type="text"
                  value={form.hero.headlineBn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, headlineBn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 font-bold text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Hero Subtitle Paragraph (English)
                </label>
                <textarea
                  rows={4}
                  value={form.hero.subtitleEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, subtitleEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Hero Subtitle Paragraph (Bangla)
                </label>
                <textarea
                  rows={4}
                  value={form.hero.subtitleBn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, subtitleBn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 leading-relaxed focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  CTA Button Text (English)
                </label>
                <input
                  type="text"
                  value={form.hero.ctaTextEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, ctaTextEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  CTA Button Text (Bangla)
                </label>
                <input
                  type="text"
                  value={form.hero.ctaTextBn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      hero: { ...form.hero, ctaTextBn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ANNOUNCEMENT BANNER TAB */}
        {activeSubTab === "PROMO" && (
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-5">
            <div className="border-b border-slate-700/60 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-cyan-400" />
                  <span>Top Announcement / Promo Ribbon</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Displays a prominent top alert banner above the navbar for promotions and emergency updates.
                </p>
              </div>

              <label className="flex items-center gap-2 cursor-pointer bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                <input
                  type="checkbox"
                  checked={form.announcement.enabled}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcement: { ...form.announcement, enabled: e.target.checked },
                    })
                  }
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="font-bold text-white">Banner Enabled</span>
              </label>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={form.announcement.badgeText}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcement: { ...form.announcement, badgeText: e.target.value },
                    })
                  }
                  placeholder="e.g. SPECIAL PROMO / EID OFFER"
                  className="w-full max-w-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Banner Text (English)
                </label>
                <input
                  type="text"
                  value={form.announcement.textEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcement: { ...form.announcement, textEn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Banner Text (Bangla)
                </label>
                <input
                  type="text"
                  value={form.announcement.textBn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      announcement: { ...form.announcement, textBn: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* CONTACT & HOTLINE TAB */}
        {activeSubTab === "CONTACT" && (
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-5">
            <div className="border-b border-slate-700/60 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Customer Hotline, Address & Support</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configures operational contact points across the website header and footer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Hotline Phone (Dialable Format)
                </label>
                <input
                  type="text"
                  value={form.contact.hotline}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: { ...form.contact, hotline: e.target.value },
                    })
                  }
                  placeholder="+880 9612-278235"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Hotline Display Text
                </label>
                <input
                  type="text"
                  value={form.contact.hotlineDisplay}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: { ...form.contact, hotlineDisplay: e.target.value },
                    })
                  }
                  placeholder="+880 9612-AQUA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Support Email</label>
                <input
                  type="email"
                  value={form.contact.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: { ...form.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Operating Hours</label>
                <input
                  type="text"
                  value={form.contact.hoursEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: { ...form.contact, hoursEn: e.target.value },
                    })
                  }
                  placeholder="7:00 AM – 10:00 PM (Everyday)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-bold mb-1">
                  Central Operations Hub Address
                </label>
                <input
                  type="text"
                  value={form.contact.addressEn}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      contact: { ...form.contact, addressEn: e.target.value },
                    })
                  }
                  placeholder="Gulshan Avenue, Dhaka-1212, Bangladesh"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* BSTI STANDARDS TAB */}
        {activeSubTab === "STANDARDS" && (
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-5">
            <div className="border-b border-slate-700/60 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Certification, BSTI & Water Quality Metrics</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Sets the verified certification metrics displayed to establish consumer trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  BSTI License Number
                </label>
                <input
                  type="text"
                  value={form.standards.bstiLicense}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      standards: { ...form.standards, bstiLicense: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  TDS Mineral Level Range
                </label>
                <input
                  type="text"
                  value={form.standards.tdsRange}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      standards: { ...form.standards, tdsRange: e.target.value },
                    })
                  }
                  placeholder="120 - 150 PPM"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">pH Balance Level</label>
                <input
                  type="text"
                  value={form.standards.phRange}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      standards: { ...form.standards, phRange: e.target.value },
                    })
                  }
                  placeholder="7.2 - 7.6 pH"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Filtration Technology Stages
                </label>
                <input
                  type="text"
                  value={form.standards.filtrationStages}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      standards: { ...form.standards, filtrationStages: e.target.value },
                    })
                  }
                  placeholder="7-Stage Medical-Grade RO"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-2.5 text-xs shadow-lg"
          >
            {isLoading ? "Saving..." : "Save Content Settings"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ContentManager;
