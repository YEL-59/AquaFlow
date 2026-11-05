import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Droplets,
  ShieldCheck,
  PhoneCall,
  MapPin,
  Clock,
  Mail,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
  LayoutDashboard
} from "lucide-react";
import { useContent } from "../../context/ContentContext";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const { content } = useContent();
  const contact = content?.contact || {};
  const standards = content?.standards || {};

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-[#0a1122] text-slate-300 overflow-hidden">
      {/* Top Sweeping Wave Transition from White to Deep Navy */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="w-full h-16 sm:h-28 text-white dark:text-slate-900"
          viewBox="0 0 1440 120"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C280,120 720,130 1440,0 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/30">
                <Droplets className="h-5 w-5 fill-white/20 stroke-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">AquaFlow</span>
            </Link>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
              {isBn
                ? "ঢাকার প্রতিটি ঘরে ও কর্মক্ষেত্রে বিশুদ্ধ, খনিজসমৃদ্ধ খাবার পানির নির্ভরযোগ্য সরবরাহ। বিএসটিআই সার্টিফাইড ল্যাব কোয়ালিটি।"
                : "Dhaka's leading pure drinking water supply and delivery service. Certified under BDS 1240:2021 with medical-grade hygiene."}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4 text-sky-400 shrink-0" />
              <span>BSTI BDS 1240:2021 Certified</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isBn ? "প্রয়োজনীয় লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-sky-400 transition-colors">
                  {isBn ? "হোম পেজ" : "Home"}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-sky-400 transition-colors">
                  {isBn ? "পণ্য ও রিফিল জার" : "Bottles & Products"}
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="text-slate-400 hover:text-sky-400 transition-colors">
                  {isBn ? "সাবস্ক্রিপশন প্ল্যান" : "Subscription Plans"}
                </Link>
              </li>
              <li>
                <Link to="/delivery-areas" className="text-slate-400 hover:text-sky-400 transition-colors">
                  {isBn ? "ডেলিভারি এরিয়া" : "Delivery Coverage"}
                </Link>
              </li>
              <li>
                <Link to="/quality" className="text-slate-400 hover:text-sky-400 transition-colors">
                  {isBn ? "বিশুদ্ধতার প্রমাণ" : "Purification Standards"}
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1.5 transition-colors">
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isBn ? "অ্যাডমিন ড্যাশবোর্ড" : "Admin Operations"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isBn ? "যোগাযোগ" : "Contact Us"}
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{isBn ? (contact.addressBn || "গুলশান এভিনিউ, ঢাকা-১২১২") : (contact.addressEn || "Gulshan Avenue, Dhaka-1212, Bangladesh")}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <PhoneCall className="h-4 w-4 text-sky-400 shrink-0" />
                <span className="font-semibold text-slate-200">
                  {contact.hotline || "+880 9612-278235"} ({contact.hotlineDisplay || "09612-AQUA"})
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                <span>{contact.email || "support@aquaflow.com.bd"}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-[#0284c7] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#twitter"
                className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-[#0284c7] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#instagram"
                className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-[#0284c7] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#linkedin"
                className="h-9 w-9 rounded-full bg-slate-800/80 hover:bg-[#0284c7] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 4: Newsletter Box (Matching Wavio) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isBn ? "নিউজলেটার সাবস্ক্রিপশন" : "Subscribe To Our Newsletter"}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isBn
                ? "বিশেষ অফার, ফ্রি ডেলিভারি কুপন ও হেলথ টিপস পেতে আপনার ইমেইল দিন।"
                : "Get exclusive hydration discounts, scheduled delivery perks, and monthly mineral quality reports."}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={isBn ? "আপনার ইমেইল ঠিকানা" : "Your e-mail here"}
                  required
                  className="w-full h-11 pl-4 pr-28 rounded-full bg-white text-slate-900 text-xs sm:text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-4 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all shadow-sm"
                >
                  {isBn ? "সাবস্ক্রাইব" : "Subscribe"}
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>{isBn ? "ধন্যবাদ! সাবস্ক্রিপশন সফল হয়েছে।" : "Thank you for subscribing!"}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AquaFlow Dhaka. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-sky-400 cursor-pointer">
              {isBn ? "প্রাইভেসি পলিসি" : "Privacy Policy"}
            </span>
            <span>•</span>
            <span className="hover:text-sky-400 cursor-pointer">
              {isBn ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions"}
            </span>
            <span>•</span>
            <span className="hover:text-sky-400 cursor-pointer">
              {isBn ? "রিফান্ড গ্যারান্টি" : "Refund Guarantee"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
