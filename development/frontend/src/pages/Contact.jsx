import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Building2,
  Truck,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export function Contact() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const [formState, setFormState] = useState({
    fullName: "",
    phone: "",
    neighborhood: "Banani",
    inquiryType: "HOUSEHOLD",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.fullName || !formState.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16">
      {/* 1. Header Hero */}
      <section className="bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="container mx-auto max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold tracking-wider uppercase border border-sky-400/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Dhaka Customer Support</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            {currentLang === "bn" ? "যোগাযোগ ও গ্রাহক সেবা" : "Get in Touch with AquaFlow"}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
            {currentLang === "bn"
              ? "জরুরী পানি সরবরাহ, কর্পোরেট কোটেশন বা যে কোনো প্রয়োজনে আমাদের টিম সর্বদা আপনার সেবায় প্রস্তুত।"
              : "Need instant water delivery, custom corporate office quotes, or jar return support? Contact our dedicated Dhaka operations center."}
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="container mx-auto -mt-8 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Direct Channels & Hub Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-500" />
                <span>Direct Contact Points</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Toll-Free Hotline</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">+880 9612-AQUA (2782)</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Mobile: +880 1712-345678</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">WhatsApp Dispatch</div>
                    <a
                      href="https://wa.me/8801712345678"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-emerald-600 hover:underline"
                    >
                      Chat on WhatsApp (+8801712345678)
                    </a>
                    <div className="text-[11px] text-slate-400">Instant order confirmation</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Email Inquiries</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">support@aquaflow.com.bd</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">corporate@aquaflow.com.bd</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Operating Hours</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">7:00 AM – 10:00 PM</div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Open All 7 Days (Inc. Friday)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Central Hub Location */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Central Operations Hub</span>
              </div>
              <h4 className="text-base font-bold">AquaFlow Operations & Lab</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                House 18, Road 11, Block F, Banani, Dhaka-1213.<br />
                Near Kemal Ataturk Avenue.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-800">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                <span>Micro-hubs located in Gulshan, Dhanmondi, Uttara & Mirpur</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-2">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {currentLang === "bn" ? "আমাদের একটি বার্তা পাঠান" : "Send Us a Message"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill out the form below and our Dhaka customer dispatch team will reach out within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                    Thank you! Your message has been received.
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400 max-w-md mx-auto">
                    An operations manager from our Banani Central Hub will call you at <span className="font-bold">{formState.phone}</span> shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        fullName: "",
                        phone: "",
                        neighborhood: "Banani",
                        inquiryType: "HOUSEHOLD",
                        message: "",
                      });
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.fullName}
                        onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+880 1712-345678"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Dhaka Neighborhood
                      </label>
                      <select
                        value={formState.neighborhood}
                        onChange={(e) => setFormState({ ...formState, neighborhood: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="Gulshan">Gulshan 1 & 2</option>
                        <option value="Banani">Banani & DOHS</option>
                        <option value="Baridhara">Baridhara Diplomatic</option>
                        <option value="Dhanmondi">Dhanmondi & Lalmatia</option>
                        <option value="Uttara">Uttara (All Sectors)</option>
                        <option value="Mirpur">Mirpur & DOHS</option>
                        <option value="Bashundhara">Bashundhara R/A</option>
                        <option value="Badda">Badda & Rampura</option>
                        <option value="Motijheel">Motijheel & Dilkusha (B2B)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Inquiry Type
                      </label>
                      <select
                        value={formState.inquiryType}
                        onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="HOUSEHOLD">Household Water Supply</option>
                        <option value="OFFICE">Corporate / Office Contract</option>
                        <option value="RESTAURANT">Restaurant / Cafe Supply</option>
                        <option value="JAR_DEPOSIT">Jar Deposit & Return Query</option>
                        <option value="FEEDBACK">Service Feedback or Complaint</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Your Message or Address Details
                    </label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please mention your delivery address or specific jar requirement..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 transition inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
