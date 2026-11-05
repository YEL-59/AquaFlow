import React from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  CheckCircle2,
  Package,
  Truck,
  RotateCcw,
  ArrowRight,
  PhoneCall,
  Clock,
  MapPin,
  FileText,
} from "lucide-react";
import { Button } from "../components/ui/button";

export function OrderSuccess() {
  const { orderId } = useParams();
  const { t, i18n } = useTranslation();
  const isBn = i18n.language === "bn";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-xl text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 mx-auto flex items-center justify-center shadow-xl animate-in zoom-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            {isBn ? "অর্ডার গ্রহণ করা হয়েছে" : "Order Placed Successfully"}
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {isBn ? "ধন্যবাদ! আপনার পানি প্রস্তুতিতে আছে" : "Thank you! Your water is on its way."}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isBn
              ? `অর্ডার আইডি: ${orderId}। আমাদের নিকটস্থ ঢাকা মাইক্রো-হাব থেকে এক্সপ্রেস ডেলিভারি টিম প্রস্তুত হচ্ছে।`
              : `Order ID: ${orderId}. Assigned from your nearest Dhaka Micro-Hub. Expected delivery in 1-2 hours.`}
          </p>
        </div>

        {/* Essential Order Workflow Card (Image 7) */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md text-left space-y-4 text-xs">
          <div className="font-extrabold text-slate-900 dark:text-white text-sm">
            {isBn ? "অর্ডার প্রসেসিং টাইমলাইন" : "Live Delivery Workflow"}
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <div>1. Order Placed & Confirmed</div>
                <div className="text-slate-400 font-normal text-[11px]">Validated items, address and COD amount</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sky-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0 animate-ping" />
              <div>
                <div>2. Micro-Hub Dispatch & Rider Assign</div>
                <div className="text-slate-400 font-normal text-[11px]">Sanitized jars packed for dispatch</div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 mt-1.5 shrink-0" />
              <div>
                <div>3. Doorstep Delivery & Empty Jar Return</div>
                <div className="text-slate-500 text-[11px]">Collect empty jars & receive payment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to={`/track-order?id=${orderId}`} className="w-full sm:w-auto">
            <button className="w-full px-6 py-3.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2">
              <Truck className="w-4 h-4" />
              <span>{isBn ? "অর্ডার ট্র্যাক করুন" : "Track Order Status"}</span>
            </button>
          </Link>

          <Link to="/" className="w-full sm:w-auto">
            <button className="w-full px-6 py-3.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition">
              {isBn ? "হোম পেজে যান" : "Return to Home"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
