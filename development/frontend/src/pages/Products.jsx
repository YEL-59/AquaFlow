import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Search,
  SlidersHorizontal,
  Droplets,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  Check,
  Sparkles,
  Info,
  Star,
  ArrowRight,
  Zap,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Leaf,
  HelpCircle,
  Layers,
  Clock,
  ShieldAlert,
  X,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { Button, Card, Badge, EmptyState, Skeleton } from "../components/ui";
import { api } from "../services/api";

const RICH_FALLBACK_PRODUCTS = [
  {
    id: "prod-20l-jar",
    slug: "aqua-pure-20l-jar",
    nameEn: "AquaFlow 20L Pure Reusable Jar",
    nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
    descriptionEn: "7-stage purified drinking water in food-grade, sanitized 20-litre reusable polycarbonate jar. Tested TDS 120-150 ppm, balanced pH 7.2 with medical UV sterilization.",
    descriptionBn: "৭ স্তরে পরিশোধিত স্বাস্থ্যকর খাবার পানি। খাদ্য-উপযোগী জীবাণুমুক্ত ২০ লিটার পুনর্ব্যবহারযোগ্য পলিকার্বোনেট জার। ল্যাব টেস্টেড টিডিএস ১২০-১৫০।",
    category: "REUSABLE_JAR",
    price: 80.0,
    depositAmount: 200.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: true,
    volumeLitres: 20.0,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 450,
    rating: 4.9,
    reviewCount: 312,
    badge: "BEST_SELLER",
    specs: {
      volume: "20 Liters",
      tds: "120 - 150 PPM",
      ph: "7.2 Balanced",
      purification: "7-Stage RO + UV",
    },
  },
  {
    id: "prod-1500ml-case",
    slug: "kinley-1500ml-case-12",
    nameEn: "1.5L Mineral Water (Pack of 12)",
    nameBn: "১.৫ লিটার মিনারেল ওয়াটার (১২টি বোতলের কেস)",
    descriptionEn: "Natural mineral water packaged for family dining, outdoor events, and office meeting rooms. 12 bottles per case with tamper-evident seal.",
    descriptionBn: "পারিবারিক ডাইনিং এবং অফিস মিটিংয়ের জন্য আদর্শ খনিজ পানি। প্রতি কেসে ১২টি বোতল।",
    category: "PACKAGED_BOTTLE",
    price: 360.0,
    depositAmount: 0.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: false,
    volumeLitres: 18.0,
    image: "https://images.unsplash.com/photo-1559839914-ba2ac5e7e0e7?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 220,
    rating: 4.8,
    reviewCount: 145,
    badge: "POPULAR",
    specs: {
      volume: "18 Liters (12x 1.5L)",
      tds: "110 - 140 PPM",
      ph: "7.0 Pure",
      purification: "Multi-Filter Natural",
    },
  },
  {
    id: "prod-500ml-case",
    slug: "aqua-500ml-case-24",
    nameEn: "500ml Personal Water (Pack of 24)",
    nameBn: "৫০০ মিলি পার্সোনাল ওয়াটার (২৪টি বোতলের কেস)",
    descriptionEn: "Handy 500ml bottles convenient for grab-and-go daily hydration, corporate conferences, seminars, and weddings.",
    descriptionBn: "সহজে বহনযোগ্য ৫০০ মিলি পানির বোতল। কনফারেন্স ও ব্যক্তিগত ব্যবহারের জন্য আদর্শ।",
    category: "PACKAGED_BOTTLE",
    price: 480.0,
    depositAmount: 0.0,
    isSubscriptionEligible: true,
    requiresContainerDeposit: false,
    volumeLitres: 12.0,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 180,
    rating: 4.7,
    reviewCount: 98,
    badge: "EVENT_FAVORITE",
    specs: {
      volume: "12 Liters (24x 500ml)",
      tds: "100 - 130 PPM",
      ph: "7.1 Crisp",
      purification: "5-Stage Micron RO",
    },
  },
  {
    id: "prod-dispenser-electric",
    slug: "hot-cold-standing-dispenser",
    nameEn: "AquaFlow Hot & Cold Water Dispenser",
    nameBn: "অ্যাকোয়াফ্লো হট ও কোল্ড ওয়াটার ডিসপেনসার",
    descriptionEn: "Floor standing compressor cooled water dispenser with instant boiling & chilled taps. Includes child safety lock and low-power eco compressor.",
    descriptionBn: "আধুনিক কম্প্রেসর কুলিংযুক্ত ফ্লোর স্ট্যান্ডিং ডিসপেনসার। তাৎক্ষণিক গরম ও ঠাণ্ডা পানি এবং চাইল্ড লক সুবিধা।",
    category: "DISPENSER",
    price: 12500.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviewCount: 52,
    badge: "PREMIUM",
    specs: {
      volume: "Dual 3.5L Tank",
      heating: "85°C - 95°C Instant",
      cooling: "4°C - 10°C Chilled",
      warranty: "1 Year Full Warranty",
    },
  },
  {
    id: "prod-dispenser-tabletop",
    slug: "tabletop-ceramic-cradle",
    nameEn: "Tabletop Ceramic Dispenser with Wood Stand",
    nameBn: "টেবিলটপ সিরামিক ডিসপেনসার ও কাঠের স্ট্যান্ড",
    descriptionEn: "Eco-friendly, electricity-free ambient water dispenser with polished natural wooden stand and medical stainless steel valve.",
    descriptionBn: "বিদ্যুৎবিহীন পরিবেশবান্ধব সিরামিক ডিসপেনসার ও প্রাকৃতিক কাঠের সুন্দর স্ট্যান্ড।",
    category: "DISPENSER",
    price: 2400.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 38,
    badge: "ECO_FRIENDLY",
    specs: {
      material: "High-Fire Ceramic",
      stand: "Natural Mahogany",
      power: "0 kWh (Zero Power)",
      compatibility: "Standard 20L Jars",
    },
  },
  {
    id: "prod-dispenser-manual",
    slug: "manual-hand-press-pump",
    nameEn: "Ergonomic Manual 20L Jar Hand Pump",
    nameBn: "ম্যানুয়াল ২০ লিটার জার হ্যান্ড পাম্প",
    descriptionEn: "BPA-free durable suction pump with sanitary dust-cap spout. Quick to install on any standard 20L water jar for fast manual dispensing.",
    descriptionBn: "বিপিএ-মুক্ত দীর্ঘস্থায়ী হ্যান্ড পাম্প। ২০ লিটার জারের মুখে সহজেই স্থাপনযোগ্য।",
    category: "ACCESSORY",
    price: 350.0,
    depositAmount: 0.0,
    isSubscriptionEligible: false,
    requiresContainerDeposit: false,
    volumeLitres: 0.0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    stockCount: 200,
    rating: 4.6,
    reviewCount: 84,
    badge: "ESSENTIAL",
    specs: {
      material: "Food-Grade PP",
      fitting: "Universal 55mm Neck",
      cleaning: "Dishwasher Safe",
      flowRate: "1.2 Liters/Min",
    },
  },
];

const DHAKA_DELIVERY_HUBS = [
  { area: "Banani & DOHS", hub: "Banani Central Hub", nextSlot: "Today: 09:00 - 13:00", dispatchTime: "Within 35 Mins", activeFleet: "Van 01 & Van 04" },
  { area: "Gulshan 1 & 2", hub: "Gulshan Depot", nextSlot: "Today: 09:00 - 13:00", dispatchTime: "Within 45 Mins", activeFleet: "Van 02" },
  { area: "Dhanmondi", hub: "Dhanmondi Micro-Hub", nextSlot: "Today: 14:00 - 18:00", dispatchTime: "Within 50 Mins", activeFleet: "Van 03" },
  { area: "Uttara Sectors", hub: "Uttara Depot 07", nextSlot: "Today: 14:00 - 18:00", dispatchTime: "Within 45 Mins", activeFleet: "Van 05" },
  { area: "Baridhara & Diplomatic Zone", hub: "Banani Central Hub", nextSlot: "Today: 09:00 - 13:00", dispatchTime: "Within 30 Mins", activeFleet: "Van 01" },
  { area: "Mirpur (DOHS & 1-14)", hub: "Dhanmondi Micro-Hub", nextSlot: "Tomorrow: 09:00 - 13:00", dispatchTime: "Scheduled Route", activeFleet: "Van 06" },
  { area: "Bashundhara R/A", hub: "Uttara Depot 07", nextSlot: "Today: 14:00 - 18:00", dispatchTime: "Within 60 Mins", activeFleet: "Van 05" },
];

const STORE_FAQS = [
  {
    questionEn: "How does the 20L Reusable Jar container deposit work?",
    questionBn: "২০ লিটার রিইউজেবল জারের জামানত কীভাবে কাজ করে?",
    answerEn: "On your very first order, a refundable deposit of ৳200 is held per jar. On subsequent refill deliveries, you simply swap empty jars for full ones with ৳0 deposit. If you relocate or cancel, our rider collects your empty jars and refunds ৳200/jar directly to your bKash or in cash within 1 hour.",
    answerBn: "প্রথম অর্ডারে প্রতিটি জারের জন্য ২০০ টাকা রিফান্ডেবল জামানত গ্রহণ করা হয়। পরবর্তী রিফিলে খালি জার ফেরত দিলে জামানত দিতে হয় না। আপনি সেবা বন্ধ করলে ডেলিভারি হিরো খালি জার নিয়ে ১ ঘণ্টার মধ্যে বিকাশে টাকা ফেরত দেন।",
  },
  {
    questionEn: "What purification process is used for AquaFlow drinking water?",
    questionBn: "অ্যাকোয়াফ্লো খাবার পানির পরিশোধন প্রক্রিয়া কী?",
    answerEn: "We utilize a rigorous 7-stage purification system: Sediment Pre-Filtration, Activated Carbon Adsorption, Reverse Osmosis (RO 0.0001 micron membrane), Remineralization (adding vital calcium and magnesium), Medical-grade UV disinfection, and Ozone stabilization before automated airtight capping.",
    answerBn: "আমরা ৭ স্তরের বৈজ্ঞানিক পরিশোধন পদ্ধতি ব্যবহার করি: সেডিমেন্ট প্রি-ফিল্টার, অ্যাক্টিভেটেড কার্বন, রিভার্স অসমোসিস (RO), প্রয়োজনীয় মিনারেল সংযোজন, মেডিকেল UV চেম্বার এবং ওজোন নির্বীজন।",
  },
  {
    questionEn: "Do you deliver to higher floors without an elevator?",
    questionBn: "লিফটবিহীন ওপরের তলায় কি পানি ডেলিভারি দেওয়া হয়?",
    answerEn: "Yes! Our trained Dhaka Delivery Heroes carry heavy 20L jars directly to your apartment door, kitchen, or office dispenser, even on higher floors with stairs. Delivery is hassle-free.",
    answerBn: "হ্যাঁ! আমাদের ডেলিভারি হিরোরা লিফট না থাকলেও আপনার ফ্ল্যাটের রান্নাঘর বা অফিসের ডিসপেনসার পর্যন্ত পৌঁছে দেয়।",
  },
  {
    questionEn: "Can I subscribe for automatic daily or weekly water deliveries?",
    questionBn: "দৈনিক বা সাপ্তাহিক স্বয়ংক্রিয় ডেলিভারির জন্য কি সাবস্ক্রিপশন করা যায়?",
    answerEn: "Absolutely. You can select Daily, Alternate Days, Weekly, or Custom days with a 10% discount on every refill. You can pause or resume deliveries with one tap from your account anytime you travel.",
    answerBn: "অবশ্যই। আপনি দৈনিক, একদিন পর পর বা সাপ্তাহিক সাবস্ক্রিপশন বেছে নিয়ে প্রতি রিফিলে ১০% ছাড় পেতে পারেন। কোথাও ভ্রমণে গেলে এক ক্লিকে পজ করে রাখতে পারেন।",
  },
  {
    questionEn: "Are corporate and bulk office deliveries available?",
    questionBn: "কর্পোরেট এবং অফিসের জন্য কি বিশেষ সুবিধা রয়েছে?",
    answerEn: "Yes, we service 240+ corporate offices, banks, embassies, and hospitals across Dhaka with monthly consolidated tax-invoicing, free dispenser sanitization maintenance, and dedicated account managers.",
    answerBn: "হ্যাঁ, আমরা ঢাকা শহরের ২৪০+ অফিস ও হাসপাতালে মাসিক ট্যাক্স ইনভয়েস, ফ্রি ডিসপেনসার ক্লিনিং ও নির্ধারিত অ্যাকাউন্ট ম্যানেজার সহ কর্পোরেট সেবা দিয়ে থাকি।",
  },
];

export function Products({ onAddToCart }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const navigate = useNavigate();

  const [categories, setCategories] = useState([
    { id: "ALL", nameEn: "All Products", nameBn: "সব পণ্য" },
    { id: "REUSABLE_JAR", nameEn: "20L Reusable Jars", nameBn: "২০ লিটার জার" },
    { id: "PACKAGED_BOTTLE", nameEn: "Packaged Bottles", nameBn: "বোতলজাত পানি" },
    { id: "DISPENSER", nameEn: "Dispensers & Stands", nameBn: "ডিসপেনসার" },
    { id: "ACCESSORY", nameEn: "Pumps & Accessories", nameBn: "আনুষাঙ্গিক পণ্য" },
  ]);

  const [products, setProducts] = useState(RICH_FALLBACK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [subscriptionOnly, setSubscriptionOnly] = useState(false);
  const [sortBy, setSortBy] = useState("RECOMMENDED");
  const [isLoading, setIsLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  // Delivery Slot Calculator state
  const [selectedArea, setSelectedArea] = useState(DHAKA_DELIVERY_HUBS[0].area);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Fetch catalog from API with graceful fallback to rich seed items
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      setIsLoading(true);
      try {
        const [catsRes, prodsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);
        if (isMounted) {
          if (catsRes?.data?.length) setCategories(catsRes.data);
          if (prodsRes?.data?.length) {
            // merge API with rich specs
            const merged = prodsRes.data.map((apiProd) => {
              const matched = RICH_FALLBACK_PRODUCTS.find((p) => p.id === apiProd.id || p.slug === apiProd.slug);
              return {
                ...apiProd,
                specs: matched?.specs || {
                  volume: `${apiProd.volumeLitres || 20}L`,
                  tds: "120 - 150 PPM",
                  ph: "7.2 Balanced",
                  purification: "7-Stage RO",
                },
                badge: matched?.badge || (apiProd.isSubscriptionEligible ? "BEST_SELLER" : "IN_STOCK"),
              };
            });
            setProducts(merged);
          }
        }
      } catch (err) {
        console.warn("Using rich local catalog seed:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const handleAddToCartClick = (product, e) => {
    if (e) e.stopPropagation();
    const qty = quantities[product.id] || 1;
    if (onAddToCart) {
      onAddToCart({
        id: product.id,
        nameEn: product.nameEn,
        nameBn: product.nameBn,
        price: product.price,
        depositAmount: product.depositAmount || 0,
        requiresContainerDeposit: product.requiresContainerDeposit,
        image: product.image,
        category: product.category,
        quantity: qty,
      });
    }

    setAddedItemNotice(product.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 2500);
  };

  // Filter & Sort Logic
  const filteredProducts = products
    .filter((prod) => {
      if (selectedCategory !== "ALL" && prod.category !== selectedCategory) {
        return false;
      }
      if (subscriptionOnly && !prod.isSubscriptionEligible) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchEn = prod.nameEn?.toLowerCase().includes(q);
        const matchBn = prod.nameBn?.includes(q);
        const matchDescEn = prod.descriptionEn?.toLowerCase().includes(q);
        const matchDescBn = prod.descriptionBn?.includes(q);
        return matchEn || matchBn || matchDescEn || matchDescBn;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "PRICE_ASC") return a.price - b.price;
      if (sortBy === "PRICE_DESC") return b.price - a.price;
      if (sortBy === "RATING") return (b.rating || 5) - (a.rating || 5);
      return 0; // Default RECOMMENDED
    });

  const activeHubInfo = DHAKA_DELIVERY_HUBS.find((h) => h.area === selectedArea) || DHAKA_DELIVERY_HUBS[0];
  const flagshipProduct = products.find((p) => p.id === "prod-20l-jar") || products[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* 1. Live Dhaka Metro Operational Announcement Ribbon */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-950 text-sky-200 border-b border-sky-800/50 py-2.5 px-4 text-xs font-semibold">
        <div className="w-full max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-bold">Dhaka Metro Live Supply:</span>
            <span>1,730 fresh sanitized jars ready across 3 Micro-Hubs (Gulshan, Banani, Dhanmondi, Uttara).</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-sky-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next Morning Delivery Window: 09:00 - 13:00</span>
            </span>
            <span className="hidden md:inline text-sky-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-300 font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Free Delivery on 2+ Jars</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1720px] mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 2. Hero Header with Trust Badges */}
        <div className="text-center relative space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-extrabold shadow-sm backdrop-blur-md">
            <Droplets className="w-4 h-4 text-sky-500 animate-pulse" />
            <span>{currentLang === "bn" ? "বিশুদ্ধ পানির ডিজিটাল মার্কেটপ্লেস" : "Dhaka's #1 Pure Water Supply & Refill Store"}</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {currentLang === "bn" ? (
              <>
                ঢাকার প্রতি ঘরে <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">১০০% বিশুদ্ধ পানি</span> পৌঁছে দেওয়ার নিশ্চয়তা
              </>
            ) : (
              <>
                Pure, Mountain-Fresh RO Water{" "}
                <span className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                  Delivered To Your Door
                </span>
              </>
            )}
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentLang === "bn"
              ? "৭ স্তরে পরিশোধিত ল্যাব-টেস্টেড জার পানি, বোতলজাত মিনারেল ওয়াটার এবং আধুনিক ডিসপেনসার। কোনো সিঙ্গেল-ইউজ প্লাস্টিক বর্জ্য ছাড়া সরাসরি আপনার রান্নাঘর বা অফিসে পৌঁছে দেওয়া হয়।"
              : "7-Stage Reverse Osmosis laboratory-certified pure water in sanitized 20L reusable jars, bulk packs, and modern dispensers. Zero single-use plastic, with fast 3-hour doorstep replenishment across Dhaka."}
          </p>

          {/* 4 Trust Value Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-left">
                <div className="font-extrabold text-slate-900 dark:text-white">BSTI Certified</div>
                <div className="text-[10px] text-slate-400">BDS 1240:2021 Standard</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
              <Droplets className="w-5 h-5 text-sky-500 shrink-0" />
              <div className="text-left">
                <div className="font-extrabold text-slate-900 dark:text-white">TDS 120-150 PPM</div>
                <div className="text-[10px] text-slate-400">pH 7.2 Optimal Taste</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
              <RotateCcw className="w-5 h-5 text-cyan-500 shrink-0" />
              <div className="text-left">
                <div className="font-extrabold text-slate-900 dark:text-white">৳200 Safe Deposit</div>
                <div className="text-[10px] text-slate-400">100% Instant Refundable</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2.5">
              <Star className="w-5 h-5 text-amber-400 shrink-0 fill-amber-400" />
              <div className="text-left">
                <div className="font-extrabold text-slate-900 dark:text-white">4.9/5 Rating</div>
                <div className="text-[10px] text-slate-400">5,800+ Dhaka Families</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Featured Flagship Spotlight Banner (AquaFlow 20L Reusable Jar) */}
        {flagshipProduct && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-cyan-950 border border-sky-800/60 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>Dhaka's Most Subscribed Pure Water Choice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                AquaFlow 20L Pure Reusable Jar
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bottled under sterile medical-grade conditions in food-grade polycarbonate containers. Perfect for daily family drinking water and office hydration.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-200 pt-1">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>7-Stage RO + UV Sanitized</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>20 Liters Capacity</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Saves 40 Single-Use Bottles</span>
                </span>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-400">৳80</span>
                  <span className="text-xs text-slate-400">/ Refill</span>
                  <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
                    + ৳200 Refundable Deposit
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleAddToCartClick(flagshipProduct, e)}
                  className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/25 transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Order 20L Jar Now</span>
                </button>

                <Link
                  to="/subscriptions"
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-2"
                >
                  <span>Subscribe & Save 10%</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </Link>
              </div>
            </div>

            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl relative group">
                <img
                  src={flagshipProduct.image}
                  alt={flagshipProduct.nameEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[11px] font-bold text-white">
                  <span>Standard 55mm Neck</span>
                  <span className="text-emerald-400">● In Stock (450 Jars)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Controls Bar: Search, Category Filters, Subscription Toggle & Sorting */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input with Clear Button */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={
                  currentLang === "bn"
                    ? "পানির নাম, জার সাইজ বা বিবরণ দিয়ে খুঁজুন..."
                    : "Search 20L jars, bottle cases, dispensers, pumps..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Right Tools: Subscription Only Filter + Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSubscriptionOnly(!subscriptionOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                  subscriptionOnly
                    ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{currentLang === "bn" ? "সাবস্ক্রিপশনযোগ্য পণ্য" : "Subscription Eligible Only"}</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="RECOMMENDED">Featured & Popular</option>
                  <option value="PRICE_ASC">Price: Low to High</option>
                  <option value="PRICE_DESC">Price: High to Low</option>
                  <option value="RATING">Highest Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills with Item Count Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 dark:border-slate-800 no-scrollbar">
            {categories.map((cat) => {
              const count =
                cat.id === "ALL"
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;

              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-sky-600 text-white shadow-lg shadow-sky-600/25"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{currentLang === "bn" ? cat.nameBn : cat.nameEn}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Product Cards Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            title={currentLang === "bn" ? "কোন পণ্য পাওয়া যায়নি" : "No products found"}
            description={
              currentLang === "bn"
                ? "অনুগ্রহ করে অন্য কোনো কীওয়ার্ড দিয়ে খুঁজুন অথবা ফিল্টার রিসেট করুন।"
                : "Try adjusting your search query or reset your category filters."
            }
            actionLabel={currentLang === "bn" ? "সব পণ্য দেখুন" : "View All Products"}
            onAction={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
              setSubscriptionOnly(false);
              setSortBy("RECOMMENDED");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const isAdded = addedItemNotice === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.slug || product.id}`)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-2xl hover:border-sky-500/60 dark:hover:border-sky-500/60 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {/* Top Product Image Box */}
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-950 aspect-[4/3] w-full">
                    <img
                      src={product.image}
                      alt={product.nameEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      {product.badge === "BEST_SELLER" && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md">
                          ★ Best Seller
                        </span>
                      )}
                      {product.isSubscriptionEligible && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-500/90 text-white backdrop-blur-md shadow-md">
                          Subscribe & Save 10%
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-700 backdrop-blur-md shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        In Stock (Dhaka Hubs)
                      </span>
                    </div>

                    {/* Bottom Specs Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-semibold">
                      <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl">
                        {product.specs?.volume || "Standard Size"}
                      </span>
                      <span className="bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-xl text-amber-300 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{product.rating || "4.9"}</span>
                        <span className="text-white/60 font-normal">({product.reviewCount || 100})</span>
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-1">
                        {currentLang === "bn" ? product.nameBn : product.nameEn}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {currentLang === "bn" ? product.descriptionBn : product.descriptionEn}
                      </p>
                    </div>

                    {/* Quality Specs Pill Grid */}
                    {product.specs && (
                      <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">Purity TDS</span>
                          <span className="font-bold text-sky-600 dark:text-sky-400">{product.specs.tds || "120-150 PPM"}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                          <span className="text-slate-400 block text-[9px] uppercase font-bold">pH Level</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{product.specs.ph || "7.2 Balanced"}</span>
                        </div>
                      </div>
                    )}

                    {/* Deposit Info for Reusable Containers */}
                    {product.requiresContainerDeposit && (
                      <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 flex items-start gap-2.5 text-xs text-cyan-950 dark:text-cyan-200">
                        <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold">
                            + {formatBDT(product.depositAmount, currentLang)} 100% Refundable Deposit
                          </div>
                          <div className="text-[10px] text-cyan-800 dark:text-cyan-300 mt-0.5">
                            Swap empty jar on refills for ৳0 deposit, or get refunded on return.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Price and Cart Row */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                          Water Price
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                          {formatBDT(product.price, currentLang)}
                        </div>
                      </div>

                      {/* Quantity Stepper + Add Button */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-slate-800 dark:text-slate-100">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleAddToCartClick(product, e)}
                          className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 ${
                            isAdded
                              ? "bg-emerald-600 text-white"
                              : "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 6. Interactive Dhaka Micro-Hub Delivery Slot Checker */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-900/40 text-white shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-800 text-xs font-bold mb-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Express Dhaka Micro-Hub Dispatch</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Check Real-Time Water Delivery Slot For Your Area
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your Dhaka neighborhood to see closest hub stock and next scheduled van run.
              </p>
            </div>

            <div className="w-full md:w-72">
              <label className="block text-slate-400 text-xs font-bold mb-1">Select Your Area:</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white font-bold text-xs focus:outline-none focus:border-indigo-500"
              >
                {DHAKA_DELIVERY_HUBS.map((h) => (
                  <option key={h.area} value={h.area}>
                    {h.area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery Slot Results Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">Allocated Hub</span>
              <span className="text-sm font-black text-sky-400 mt-1 block">{activeHubInfo.hub}</span>
              <span className="text-[10px] text-slate-500">Dhaka Metro Regional Center</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">Next Available Slot</span>
              <span className="text-sm font-black text-emerald-400 mt-1 block">{activeHubInfo.nextSlot}</span>
              <span className="text-[10px] text-emerald-400/80 font-bold">● Same-Day Delivery Open</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">Estimated Delivery Speed</span>
              <span className="text-sm font-black text-amber-300 mt-1 block">{activeHubInfo.dispatchTime}</span>
              <span className="text-[10px] text-slate-500">Direct doorstep handover</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] font-bold uppercase block">Assigned Fleet</span>
              <span className="text-sm font-black text-cyan-300 mt-1 block">{activeHubInfo.activeFleet}</span>
              <span className="text-[10px] text-slate-500">Equipped with hand trolleys</span>
            </div>
          </div>
        </div>

        {/* 7. The 7-Stage Scientific Purification Process Showcase */}
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300 text-xs font-bold">
            <Layers className="w-4 h-4 text-cyan-500" />
            <span>Certified Laboratory Standard</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Why AquaFlow Water Is Truly Pure & Safe
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Standard boiling cannot eliminate dissolved heavy metals, arsenic, or chemical micro-contaminants. Every liter of AquaFlow passes through our 7-stage pharmaceutical-grade purification process:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left pt-4">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                01
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                5-Micron Sediment Filter
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Filters sand, silt, rust flakes, and suspended particulate matter coming from Dhaka municipal groundwater.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Granular Activated Carbon
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Adsorbs harsh chlorine, foul odor, volatile organic chemicals (VOCs), and pesticides, restoring natural sweetness.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Reverse Osmosis Membrane
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Micro-pores at 0.0001 microns reject heavy metals, lead, arsenic, fluoride, and excess dissolved solids.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                04
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Remineralization & pH Balance
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Reintroduces essential magnesium and calcium electrolytes to balance pH at healthy alkaline 7.2.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                05
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Post-Carbon Taste Polishing
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Fine coconut-shell carbon polishes the water for an invigorating, crisp, mountain-fresh taste.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                06
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Medical UV Sterilization
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                High-intensity ultraviolet irradiation eliminates 99.99% of bacteria, E. coli, cysts, and viruses.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 sm:col-span-2">
              <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                07
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Ozone Disinfection & Airtight Bottling
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Active ozone sanitizes both water and inner container walls before robotic hermetic cap sealing, ensuring zero airborne bacteria entry during transport.
              </p>
            </div>
          </div>
        </div>

        {/* 8. 100% Refundable Container Deposit Assurance Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-300 text-xs font-bold border border-emerald-800">
              <Leaf className="w-3.5 h-3.5" />
              <span>Zero Single-Use Plastic • Circular Economy</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Transparent ৳200 Jar Deposit Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We never trap your deposit. On each delivery, exchange empty jars for fresh ones at ৳0 deposit. When you finish or move, hand back your jars to receive 100% of your deposit back via bKash or cash instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/account/orders"
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
            >
              Check My Jar Deposit Balance
            </Link>
          </div>
        </div>

        {/* 9. Frequently Asked Questions (FAQ) Accordion */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-bold">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Customer Help & Clarity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions About AquaFlow
            </h3>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-slate-100 dark:divide-slate-800">
            {STORE_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div key={index} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left gap-4 group"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {currentLang === "bn" ? faq.questionBn : faq.questionEn}
                    </span>
                    <span className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in">
                      {currentLang === "bn" ? faq.answerBn : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
