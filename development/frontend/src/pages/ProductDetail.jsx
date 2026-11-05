import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Droplets,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  ArrowLeft,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { api } from "../services/api";

const PRODUCT_FALLBACKS = {
  "aqua-pure-20l-jar": {
    id: "prod-20l-jar",
    slug: "aqua-pure-20l-jar",
    nameEn: "AquaFlow 20L Pure Reusable Jar",
    nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
    descriptionEn: "7-stage purified drinking water in food-grade, sanitized 20-litre reusable polycarbonate jar. Laboratory tested TDS 120-150. Medical-grade UV sterilization & ozonation.",
    descriptionBn: "৭ স্তরে পরিশোধিত স্বাস্থ্যকর খাবার পানি। খাদ্য-উপযোগী জীবাণুমুক্ত ২০ লিটার পুনর্ব্যবহারযোগ্য পলিকার্বোনেট জার। ল্যাব টেস্টেড টিডিএস ১২০-১৫০।",
    category: "REUSABLE_JAR",
    price: 80,
    depositAmount: 200,
    volumeLitres: 20,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 312,
  },
  "kinley-1500ml-case-12": {
    id: "prod-1500ml-case",
    slug: "kinley-1500ml-case-12",
    nameEn: "1.5L Mineral Water (Pack of 12)",
    nameBn: "১.৫ লিটার মিনারেল ওয়াটার (১২টি বোতলের কেস)",
    descriptionEn: "Natural mineral water packaged for family dining, outdoor events, and office meeting rooms. 12 bottles per case. Sealed tamper-proof caps.",
    descriptionBn: "পারিবারিক ডাইনিং এবং অফিস মিটিংয়ের জন্য আদর্শ খনিজ পানি। প্রতি কেসে ১২টি বোতল।",
    category: "PACKAGED_BOTTLE",
    price: 360,
    depositAmount: 0,
    volumeLitres: 18,
    image: "https://images.unsplash.com/photo-1559839914-ba2ac5e7e0e7?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 145,
  },
  "aqua-500ml-case-24": {
    id: "prod-500ml-case",
    slug: "aqua-500ml-case-24",
    nameEn: "500ml Personal Water (Pack of 24)",
    nameBn: "৫০০ মিলি পার্সোনাল ওয়াটার (২৪টি বোতলের কেস)",
    descriptionEn: "Handy 500ml bottles convenient for grab-and-go daily hydration, corporate conferences, seminars, and weddings.",
    descriptionBn: "সহজে বহনযোগ্য ৫০০ মিলি পানির বোতল। কনফারেন্স ও ব্যক্তিগত ব্যবহারের জন্য আদর্শ।",
    category: "PACKAGED_BOTTLE",
    price: 480,
    depositAmount: 0,
    volumeLitres: 12,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    reviewCount: 98,
  },
  "hot-cold-standing-dispenser": {
    id: "prod-dispenser-electric",
    slug: "hot-cold-standing-dispenser",
    nameEn: "AquaFlow Hot & Cold Water Dispenser",
    nameBn: "অ্যাকোয়াফ্লো হট ও কোল্ড ওয়াটার ডিসপেনসার",
    descriptionEn: "Floor standing compressor cooled water dispenser with instant boiling & chilled taps. Includes child safety lock and low-power eco compressor.",
    descriptionBn: "আধুনিক কম্প্রেসর কুলিংযুক্ত ফ্লোর স্ট্যান্ডিং ডিসপেনসার। তাৎক্ষণিক গরম ও ঠাণ্ডা পানি এবং চাইল্ড লক সুবিধা।",
    category: "DISPENSER",
    price: 12500,
    depositAmount: 0,
    volumeLitres: 0,
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 52,
  },
  "tabletop-ceramic-cradle": {
    id: "prod-dispenser-tabletop",
    slug: "tabletop-ceramic-cradle",
    nameEn: "Tabletop Ceramic Dispenser with Wood Stand",
    nameBn: "টেবিলটপ সিরামিক ডিসপেনসার ও কাঠের স্ট্যান্ড",
    descriptionEn: "Eco-friendly, electricity-free ambient water dispenser with polished natural wooden stand and medical stainless steel valve.",
    descriptionBn: "বিদ্যুৎবিহীন পরিবেশবান্ধব সিরামিক ডিসপেনসার ও প্রাকৃতিক কাঠের সুন্দর স্ট্যান্ড।",
    category: "DISPENSER",
    price: 2400,
    depositAmount: 0,
    volumeLitres: 0,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 38,
  },
  "manual-hand-press-pump": {
    id: "prod-dispenser-manual",
    slug: "manual-hand-press-pump",
    nameEn: "Ergonomic Manual 20L Jar Hand Pump",
    nameBn: "ম্যানুয়াল ২০ লিটার জার হ্যান্ড পাম্প",
    descriptionEn: "BPA-free durable suction pump with sanitary dust-cap spout. Quick to install on any standard 20L water jar for fast manual dispensing.",
    descriptionBn: "বিপিএ-মুক্ত দীর্ঘস্থায়ী হ্যান্ড পাম্প। ২০ লিটার জারের মুখে সহজেই স্থাপনযোগ্য।",
    category: "ACCESSORY",
    price: 350,
    depositAmount: 0,
    volumeLitres: 0,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    reviewCount: 84,
  },
};

export function ProductDetail({ onAddToCart }) {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setIsLoading(true);
      try {
        const res = await api.get(`/products/${slug}`);
        if (res?.data && isMounted) {
          setProduct(res.data);
        } else if (isMounted) {
          setProduct(PRODUCT_FALLBACKS[slug] || PRODUCT_FALLBACKS["aqua-pure-20l-jar"]);
        }
      } catch (e) {
        if (isMounted) {
          setProduct(PRODUCT_FALLBACKS[slug] || PRODUCT_FALLBACKS["aqua-pure-20l-jar"]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-slate-400">
        <Droplets className="w-8 h-8 text-sky-500 animate-spin mx-auto mb-3" />
        <p>Loading pure water details...</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (onAddToCart) {
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-500"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? "সকল পণ্যে ফিরে যান" : "Back to All Products"}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <img
              src={product.image || "/images/hero-bottle.jpg"}
              alt={product.nameEn}
              className="max-h-[380px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-2 mt-4 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 text-xs font-bold border border-sky-100 dark:border-sky-900">
              <ShieldCheck className="w-4 h-4" />
              <span>BSTI BDS 1240:2021 Certified</span>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                {isBn ? product.nameBn : product.nameEn}
              </h1>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="text-amber-400 font-bold">★ {product.rating || "4.9"}</span>
                <span>•</span>
                <span>{product.reviewCount || 120} Customer Reviews</span>
                <span>•</span>
                <span className="text-emerald-500 font-bold">In Stock (Dhaka Hubs)</span>
              </div>
            </div>

            {/* Price & Deposit */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-medium">Selling Price</div>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {formatBDT(product.price, isBn ? "bn" : "en")}
                </div>
              </div>
              {product.depositAmount > 0 && (
                <div className="text-right">
                  <div className="text-xs text-cyan-600 font-medium">Refundable Deposit</div>
                  <div className="text-xl font-black text-cyan-500">
                    + {formatBDT(product.depositAmount, isBn ? "bn" : "en")}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isBn ? product.descriptionBn : product.descriptionEn}
            </p>

            {/* Key Quality Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">7-Stage RO</div>
                <div className="text-slate-500 text-[11px]">Medical-grade filtration</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">120 - 150 PPM</div>
                <div className="text-slate-500 text-[11px]">Balanced mineral TDS</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white">1-2 Hour Delivery</div>
                <div className="text-slate-500 text-[11px]">Express Dhaka hubs</div>
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-black text-sm text-slate-900 dark:text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-extrabold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{isBn ? "কার্টে যোগ করুন" : "Add to Cart"}</span>
              </button>

              <Link to="/subscriptions" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full px-5 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-sky-500" />
                  <span>{isBn ? "সাবস্ক্রাইব" : "Subscribe Plan"}</span>
                </button>
              </Link>
            </div>

            {addedNotice && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isBn ? "কার্টে যোগ করা হয়েছে!" : "Added to Cart successfully!"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
