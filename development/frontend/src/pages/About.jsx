import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  Droplets,
  Award,
  Sparkles,
  CheckCircle2,
  Building2,
  Truck,
  RotateCcw,
  ArrowRight,
  Microscope,
  HeartHandshake,
  Check,
} from "lucide-react";

export function About() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const PURIFICATION_STEPS = [
    {
      step: "01",
      titleEn: "Quartz Sand Filtration",
      titleBn: "কোয়ার্টজ বালি পরিশোধন",
      descEn: "Removes visible suspended particles, dust, and physical sediment larger than 20 microns.",
      descBn: "পানির দৃশ্যমান বালুকণা, ধূলিকণা এবং ২০ মাইক্রনের চেয়ে বড় তলানি দূর করে।",
      icon: "🏖️",
    },
    {
      step: "02",
      titleEn: "Activated Carbon Adsorption",
      titleBn: "অ্যাক্টিভেটেড কার্বন ফিল্টার",
      descEn: "Eliminates chlorine, volatile organic compounds, chemical odors, and unnatural taste.",
      descBn: "ক্লোরিন, উদ্বায়ী রাসায়নিক যৌগ, গন্ধ এবং অনাকাঙ্ক্ষিত স্বাদ দূর করে।",
      icon: "🫧",
    },
    {
      step: "03",
      titleEn: "0.0001μm Reverse Osmosis (RO)",
      titleBn: "রিভার্স অসমোসিস (RO)",
      descEn: "Hospital-grade semipermeable membrane strips heavy metals, lead, arsenic, and dissolved solids.",
      descBn: "উচ্চ ক্ষমতাসম্পন্ন মেমব্রেন ভারী ধাতু, সীসা, আর্সেনিক এবং ক্ষতিকারক দ্রবীভূত লবণ দূর করে।",
      icon: "🔬",
    },
    {
      step: "04",
      titleEn: "Essential Mineral Balancing",
      titleBn: "প্রাকৃতিক খনিজ পুনঃসংযোজন",
      descEn: "Infuses optimum levels of Calcium, Magnesium, and Potassium for healthy pH 7.2 - 7.5.",
      descBn: "শরীরের উপযোগী সঠিক পিএইচ (৭.২-৭.৫) বজায় রাখতে ক্যালসিয়াম ও ম্যাগনেসিয়াম ব্যালান্স।",
      icon: "💎",
    },
    {
      step: "05",
      titleEn: "Ultraviolet (UV) Sterilization",
      titleBn: "আল্ট্রাভায়োলেট (UV) জীবাণুমুক্তকরণ",
      descEn: "High-intensity UV-C radiation disables 99.99% of bacteria, viruses, and microbial cysts.",
      descBn: "তীব্র UV-C রশ্মির মাধ্যমে ৯৯.৯৯% ব্যাকটেরিয়া ও জীবাণু সম্পূর্ণরূপে নিষ্ক্রিয় করা হয়।",
      icon: "☀️",
    },
    {
      step: "06",
      titleEn: "Medical-Grade Ozonation",
      titleBn: "ওজোন গ্যাস সুরক্ষা",
      descEn: "Dissolved ozone ensures total sterilization and creates an antimicrobial seal inside each container.",
      descBn: "ওজোন গ্যাসের সুরক্ষায় জারের অভ্যন্তরীণ পরিবেশ সম্পূর্ণভাবে নিরাপদ ও সতেজ থাকে।",
      icon: "⚡",
    },
  ];

  const HUBS = [
    { name: "Gulshan Hub", area: "Gulshan 1 & 2, Baridhara, Niketan", speed: "30-45 mins" },
    { name: "Banani Central", area: "Banani, Mohakhali DOHS, Chairmanbari", speed: "25-40 mins" },
    { name: "Dhanmondi Hub", area: "Dhanmondi, Kalabagan, Lalmatia", speed: "35-50 mins" },
    { name: "Uttara North Hub", area: "Uttara Sectors 1-14, Airport area", speed: "30-45 mins" },
    { name: "Mirpur DOHS Hub", area: "Mirpur DOHS, Mirpur 1, 2, 10, 12", speed: "40-60 mins" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-sky-800 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="container mx-auto relative z-10 text-center max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            <span>Dhaka's Clean Water Infrastructure</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {currentLang === "bn" ? (
              <>ঢাকার প্রতিটি ঘরে ও অফিসে <span className="text-sky-300">শতভাগ বিশুদ্ধ ও স্বাস্থ্যসম্মত পানি</span></>
            ) : (
              <>Purity You Can Trust, Delivered to Every <span className="text-sky-300">Home & Office in Dhaka</span></>
            )}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {currentLang === "bn"
              ? "অ্যাকোয়াফ্লো কেবল একটি পানি ডেলিভারি সেবা নয়—এটি ঢাকার পরিবার ও অফিসগুলোর জন্য BSTI অনুমোদিত, ল্যাব-পরীক্ষিত এবং ৭-ধাপে বিশুদ্ধকৃত নিরাপদ পানির আধুনিক নেটওয়ার্ক।"
              : "AquaFlow is not just a water delivery service—it is a modern water distribution network engineered to provide BSTI BDS 1240:2021 certified, lab-tested, medical-grade drinking water across Dhaka neighborhoods."}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-2xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              <span>{currentLang === "bn" ? "পণ্যসমূহ দেখুন" : "Browse Water Products"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/delivery-areas"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition inline-flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-sky-300" />
              <span>{currentLang === "bn" ? "ডেলিভারি এরিয়া যাচাই করুন" : "Check Delivery Coverage"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BSTI Certification & Standards Badge Bar */}
      <section className="container mx-auto -mt-8 relative z-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Official Certification
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                BSTI BDS 1240:2021
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Packaged drinking water standard certified
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Microscope className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Daily Lab Tested
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                0 CFU Coliform & E. Coli
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Daily batch microbiological test clearance
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Eco-Friendly Circulation
              </div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                Food-Grade Reusable Jars
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                BPA-Free 20L polycarbonate bottles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 7-Stage Purification Process */}
      <section className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-black uppercase tracking-wider">
            <Droplets className="w-3.5 h-3.5" />
            <span>Hospital-Grade Quality Control</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            {currentLang === "bn" ? "আমাদের ৭-ধাপের উন্নত বিশুদ্ধকরণ প্রক্রিয়া" : "Our 7-Stage Advanced Purification Process"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {currentLang === "bn"
              ? "সাধারণ ফিল্টারিংয়ের বাইরে গিয়ে আন্তর্জাতিক মানদণ্ডে আর্সেনিক, সীসা, ক্লোরিন ও ব্যাকটেরিয়ামুক্ত সুপেয় পানির নিশ্চয়তা।"
              : "Every drop of water undergoes rigid multi-barrier purification, rigorous testing, and automated bottle sanitization before leaving our hubs."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PURIFICATION_STEPS.map((s) => (
            <div
              key={s.step}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 text-3xl font-black text-slate-100 dark:text-slate-800/80 group-hover:text-sky-100 dark:group-hover:text-slate-800 transition-colors">
                {s.step}
              </div>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                {currentLang === "bn" ? s.titleBn : s.titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {currentLang === "bn" ? s.descBn : s.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Bottle Sanitization Guarantee */}
      <section className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-sky-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-400/30">
                100% Hygiene Guarantee
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                How We Sanitize Reusable 20L Jars
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every empty jar returned by customers undergoes a multi-step automated sanitization line:
              </p>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>High-pressure caustic and food-grade disinfectant interior wash</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>75°C demineralized hot water rinse cycle</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Pure ozone rinse and immediate robotic airtight cap sealing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Tamper-evident heat-shrink holographic safety seal</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-300" />
                <span>AquaFlow Purity Metrics</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">TDS Level</div>
                  <div className="text-lg font-extrabold text-sky-300 mt-0.5">85 - 120 ppm</div>
                  <div className="text-[10px] text-slate-400">Sweet & balanced</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">pH Balance</div>
                  <div className="text-lg font-extrabold text-emerald-300 mt-0.5">7.2 - 7.5</div>
                  <div className="text-[10px] text-slate-400">Optimal alkaline</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">Arsenic & Lead</div>
                  <div className="text-lg font-extrabold text-cyan-300 mt-0.5">0.00 mg/L</div>
                  <div className="text-[10px] text-slate-400">Undetectable</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">Total Coliform</div>
                  <div className="text-lg font-extrabold text-emerald-300 mt-0.5">0 CFU / 100ml</div>
                  <div className="text-[10px] text-slate-400">100% Sterile</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dhaka Hubs Network */}
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {currentLang === "bn" ? "ঢাকার মাইক্রো-হাব নেটওয়ার্ক" : "Dhaka Micro-Hub Logistics"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Strategically located temperature-controlled distribution hubs ensure your water arrives fresh, cold, and on time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {HUBS.map((hub) => (
            <div
              key={hub.name}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{hub.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{hub.area}</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <Truck className="w-3 h-3" />
                  <span>Est. Delivery: {hub.speed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
