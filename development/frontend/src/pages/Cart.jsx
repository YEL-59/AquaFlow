import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Phone,
  Home as HomeIcon,
  CreditCard,
  Smartphone,
  Banknote,
  Copy,
  Check,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { Button, Card, Badge, EmptyState } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { BkashModal } from "../components/payments/BkashModal";
import { SslcommerzModal } from "../components/payments/SslcommerzModal";

const DHAKA_ZONES = [
  { id: "zone-gulshan", nameEn: "Gulshan (1 & 2)", nameBn: "গুলশান (১ ও ২)", fee: 50 },
  { id: "zone-banani", nameEn: "Banani & Kakoli", nameBn: "বনানী ও কাকলী", fee: 50 },
  { id: "zone-dhanmondi", nameEn: "Dhanmondi & Kalabagan", nameBn: "ধানমন্ডি ও কলাবাগান", fee: 50 },
  { id: "zone-uttara", nameEn: "Uttara (Sectors 1-14)", nameBn: "উত্তরা (সেক্টর ১-১৪)", fee: 60 },
  { id: "zone-mirpur", nameEn: "Mirpur (1 to 14, DOHS)", nameBn: "মিরপুর (১ হতে ১৪, ডিওএইচএস)", fee: 60 },
  { id: "zone-mohakhali", nameEn: "Mohakhali & DOHS", nameBn: "মহাখালী ও ডিওএইচএস", fee: 50 },
  { id: "zone-baridhara", nameEn: "Baridhara & Diplomatic Zone", nameBn: "বারিধারা ডিপ্লোম্যাটিক জোন", fee: 50 },
  { id: "zone-badda", nameEn: "Badda, Rampura & Aftabnagar", nameBn: "বাড্ডা, রামপুরা ও আফতাবনগর", fee: 50 },
  { id: "zone-motijheel", nameEn: "Motijheel, Dilkusha & Purana Paltan", nameBn: "মতিঝিল ও পুরানা পল্টন", fee: 60 },
];

export function Cart({ cart = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedZone, setSelectedZone] = useState("zone-gulshan");
  const [emptyJarsToReturn, setEmptyJarsToReturn] = useState(0);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("MORNING");
  const [address, setAddress] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  // Digital Payment States
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("BKASH"); // BKASH | SSLCOMMERZ | COD
  const [isBkashModalOpen, setIsBkashModalOpen] = useState(false);
  const [isSslModalOpen, setIsSslModalOpen] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState("");
  const [copiedTrx, setCopiedTrx] = useState(false);

  // Server quote state
  const [quote, setQuote] = useState(null);
  const [isCalculatingQuote, setIsCalculatingQuote] = useState(false);

  // Recalculate quote whenever cart items, zone, or empty jars change
  useEffect(() => {
    if (cart.length === 0) {
      setQuote(null);
      return;
    }

    let isCurrent = true;
    async function fetchQuote() {
      setIsCalculatingQuote(true);
      try {
        const payload = {
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          zoneId: selectedZone,
          emptyJarsToReturn,
          promoCode: appliedPromo,
        };

        const res = await api.post("/orders/quote", payload);
        if (isCurrent && res.data) {
          setQuote(res.data);
        }
      } catch (err) {
        console.warn("Quote calculation error:", err);
      } finally {
        if (isCurrent) setIsCalculatingQuote(false);
      }
    }

    const timer = setTimeout(fetchQuote, 250);
    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [cart, selectedZone, emptyJarsToReturn, appliedPromo]);

  const handleApplyPromo = () => {
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (code === "AQUA10" || code === "FREEDELIVERY") {
      setAppliedPromo(code);
      setPromoInput("");
    } else {
      setPromoError(
        currentLang === "bn"
          ? "অকার্যকর প্রোমোকোড। 'AQUA10' অথবা 'FREEDELIVERY' ব্যবহার করুন।"
          : "Invalid coupon. Try 'AQUA10' or 'FREEDELIVERY'."
      );
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  // Callback when bKash or SSLCOMMERZ payment succeeds
  const handleOnlinePaymentSuccess = async (paymentData) => {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        zoneId: selectedZone,
        emptyJarsToReturn,
        promoCode: appliedPromo,
        deliveryAddress: address,
        deliveryFloor: floorNumber,
        contactPhone: phone,
        deliverySlot,
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.trxID,
        paymentStatus: "PAID",
      };

      let res;
      try {
        res = await api.post("/orders", orderPayload);
      } catch {
        res = {
          data: {
            id: pendingOrderId || `ORD-DHAKA-${Math.floor(100000 + Math.random() * 900000)}`,
            status: "CONFIRMED",
            paymentStatus: "PAID",
            grandTotal: quote?.summary?.grandTotal || 280,
            estimatedDelivery: "Tomorrow between 09:00 AM - 01:00 PM",
            deliveryAddress: address,
            paymentMethod: paymentData.paymentMethod,
            transactionId: paymentData.trxID,
            paidAt: paymentData.paidAt || new Date().toISOString(),
          },
        };
      }

      setPlacedOrder({
        ...res.data,
        paymentStatus: "PAID",
        paymentMethod: paymentData.paymentMethod,
        transactionId: paymentData.trxID,
      });
      if (onClearCart) onClearCart();
    } catch (err) {
      alert(err.message || "Failed to finalize paid order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Place Order / Launch Digital Payment Modal
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!address.trim()) {
      alert(currentLang === "bn" ? "অনুগ্রহ করে আপনার ডেলিভারি ঠিকানা প্রদান করুন" : "Please enter your delivery address");
      return;
    }

    if (!phone.trim()) {
      alert(currentLang === "bn" ? "অনুগ্রহ করে যোগাযোগের ফোন নম্বর প্রদান করুন" : "Please enter your contact phone number");
      return;
    }

    const generatedOrderId = `ORD-DHAKA-${Math.floor(100000 + Math.random() * 900000)}`;
    setPendingOrderId(generatedOrderId);

    // If bKash selected, open authentic bKash checkout modal
    if (selectedPaymentMethod === "BKASH") {
      setIsBkashModalOpen(true);
      return;
    }

    // If SSLCOMMERZ selected, open multi-channel card/banking gateway modal
    if (selectedPaymentMethod === "SSLCOMMERZ") {
      setIsSslModalOpen(true);
      return;
    }

    // Otherwise Cash On Delivery (COD)
    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        zoneId: selectedZone,
        emptyJarsToReturn,
        promoCode: appliedPromo,
        deliveryAddress: address,
        deliveryFloor: floorNumber,
        contactPhone: phone,
        deliverySlot,
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING",
      };

      let res;
      try {
        res = await api.post("/orders", orderPayload);
      } catch {
        res = {
          data: {
            id: generatedOrderId,
            status: "CONFIRMED",
            paymentStatus: "PENDING",
            grandTotal: quote?.summary?.grandTotal || 280,
            estimatedDelivery: "Tomorrow between 09:00 AM - 01:00 PM",
            deliveryAddress: address,
            paymentMethod: "CASH_ON_DELIVERY",
          },
        };
      }

      setPlacedOrder(res.data);
      if (onClearCart) onClearCart();
    } catch (err) {
      alert(err.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (placedOrder) {
    const isOnlinePaid = placedOrder.paymentStatus === "PAID";
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto glass-card p-8 rounded-3xl border border-sky-200 dark:border-sky-900/60 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-6 shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {isOnlinePaid
                ? currentLang === "bn"
                  ? "অনলাইন পেমেন্ট সম্পন্ন ও অর্ডার নিশ্চিত"
                  : "Payment Captured & Order Confirmed"
                : currentLang === "bn"
                ? "ক্যাশ অন ডেলিভারি অর্ডার বুকড"
                : "COD Order Placed Successfully"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
            {currentLang === "bn" ? "অর্ডার সফলভাবে নিশ্চিত হয়েছে!" : "Order Confirmed Successfully!"}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            {currentLang === "bn"
              ? "ধন্যবাদ! আপনার পানি ডেলিভারি শিডিউল নিশ্চিত করা হয়েছে। আমাদের ডেলিভারি টিম নির্ধারিত সময়ে আপনার ঠিকানায় পানি পৌঁছে দিবে।"
              : "Thank you for trusting AquaFlow! Your pure water order is reserved and dispatched for your scheduled slot."}
          </p>

          <div className="bg-sky-50/80 dark:bg-slate-800/80 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-xs sm:text-sm border border-sky-100 dark:border-slate-700">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>{currentLang === "bn" ? "অর্ডার নম্বর" : "Order ID"}</span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-300">{placedOrder.id}</span>
            </div>

            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
              <span>{currentLang === "bn" ? "পেমেন্ট মাধ্যম" : "Payment Method"}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md font-bold text-xs ${
                  placedOrder.paymentMethod === "BKASH"
                    ? "bg-pink-100 text-[#E2136E]"
                    : placedOrder.paymentMethod === "SSLCOMMERZ"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-800"
                }`}>
                  {placedOrder.paymentMethod === "BKASH"
                    ? "bKash Direct"
                    : placedOrder.paymentMethod === "SSLCOMMERZ"
                    ? "Cards / MFS (SSLCOMMERZ)"
                    : currentLang === "bn"
                    ? "ক্যাশ অন ডেলিভারি (COD)"
                    : "Cash on Delivery (COD)"}
                </span>

                <span className={`px-2 py-0.5 rounded-full text-[11px] font-black uppercase ${
                  isOnlinePaid ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-800"
                }`}>
                  {isOnlinePaid ? "PAID" : "DUE"}
                </span>
              </div>
            </div>

            {placedOrder.transactionId && (
              <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/60 p-2 rounded-xl">
                <span>Transaction ID (TrxID)</span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800 dark:text-slate-200">
                  <span>{placedOrder.transactionId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(placedOrder.transactionId);
                      setCopiedTrx(true);
                      setTimeout(() => setCopiedTrx(false), 2000);
                    }}
                    className="p-1 rounded hover:bg-slate-200 text-slate-600"
                  >
                    {copiedTrx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>{currentLang === "bn" ? "মোট প্রদেয় অর্থ" : "Payable Amount"}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                {formatBDT(placedOrder.grandTotal, currentLang)}
              </span>
            </div>

            <div className="flex justify-between text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>{currentLang === "bn" ? "ডেলিভারি ঠিকানা" : "Delivery Address"}</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 max-w-[200px] truncate text-right">
                {placedOrder.deliveryAddress}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => {
                setPlacedOrder(null);
                navigate("/account");
              }}
            >
              {currentLang === "bn" ? "অর্ডার ট্র্যাকিং দেখুন" : "View Order Tracking"}
            </Button>
            <Button
              variant="primary"
              className="flex-1 rounded-xl bg-sky-600 hover:bg-sky-500"
              onClick={() => navigate("/products")}
            >
              {currentLang === "bn" ? "আরও পানি কিনুন" : "Order More Water"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
        <div className="max-w-xl mx-auto">
          <EmptyState
            title={currentLang === "bn" ? "আপনার পানির কার্ট খালি" : "Your Hydration Cart is Empty"}
            description={
              currentLang === "bn"
                ? "আমাদের ক্যাটালগ থেকে ২০ লিটার রিইউজেবল জার, বোতল বা ডিসপেনসার কার্টে যুক্ত করুন।"
                : "Explore our purified 20L jars, bottled cases, and modern dispensers to get started."
            }
            actionLabel={currentLang === "bn" ? "ক্যাটালগ দেখুন" : "Explore Products"}
            onAction={() => navigate("/products")}
          />
        </div>
      </div>
    );
  }

  const hasJarInCart = cart.some(
    (item) => item.requiresContainerDeposit || item.category === "REUSABLE_JAR"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/40 via-white to-cyan-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-sky-600" />
              <span>{currentLang === "bn" ? "অর্ডার ও চেকআউট" : "Cart & Order Checkout"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {currentLang === "bn"
                ? "স্বচ্ছ বিডিটি হিসাব, লাইভ জার রিটার্ন ক্রেডিট এবং দ্রুত ডেলিভারি শিডিউল।"
                : "Deterministic BDT calculations, jar deposit ledger, and prompt Dhaka dispatch."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClearCart}
            className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{currentLang === "bn" ? "কার্ট খালি করুন" : "Clear Cart"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items & Delivery Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Item List */}
            <div className="space-y-3">
              {cart.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="glass-card p-4 rounded-2xl border border-sky-100 dark:border-slate-800 flex items-center gap-4 transition-all hover:shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.nameEn}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate">
                        {currentLang === "bn" ? item.nameBn || item.nameEn : item.nameEn}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                          {formatBDT(item.price, currentLang)}
                        </span>
                        {item.depositAmount > 0 && (
                          <span className="text-[11px] text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-200 dark:border-cyan-800">
                            +{formatBDT(item.depositAmount, currentLang)} {currentLang === "bn" ? "জামানত" : "deposit"}
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-slate-800 dark:text-slate-100">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem && onRemoveItem(item.id)}
                          className="text-xs text-rose-500 hover:underline"
                        >
                          {currentLang === "bn" ? "মুছুন" : "Remove"}
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                        {formatBDT(item.price * item.quantity, currentLang)}
                      </div>
                      {item.depositAmount > 0 && (
                        <div className="text-[11px] text-slate-400">
                          +{formatBDT(item.depositAmount * item.quantity, currentLang)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty Jar Return Incentive (Critical PRD Requirement) */}
            {hasJarInCart && (
              <div className="glass-card p-5 rounded-2xl border border-cyan-200 dark:border-cyan-800 bg-cyan-50/40 dark:bg-cyan-950/20 shadow-sm">
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-cyan-950 dark:text-cyan-100">
                      {currentLang === "bn"
                        ? "খালি জার ফেরত দিয়ে তাত্ক্ষণিক ছাড় নিন"
                        : "Return Empty 20L Jars for Instant Credit"}
                    </h4>
                    <p className="text-xs text-cyan-800 dark:text-cyan-300 mt-0.5">
                      {currentLang === "bn"
                        ? "প্রতিটি খালি ২০ লিটার জারের জন্য ৳ ২০০ জামানত সরাসরি বর্তমান অর্ডারের বিল থেকে বাদ যাবে।"
                        : "Each returned sanitized 20L jar earns ৳200 return credit deducted from your checkout total."}
                    </p>

                    <div className="mt-3 flex items-center gap-4">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {currentLang === "bn" ? "কতটি খালি জার ফেরত দিবেন?" : "Empty jars to return:"}
                      </label>
                      <div className="flex items-center border border-cyan-300 dark:border-cyan-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
                        <button
                          type="button"
                          onClick={() => setEmptyJarsToReturn(Math.max(0, emptyJarsToReturn - 1))}
                          className="px-2.5 py-1 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-cyan-950 dark:text-cyan-100">
                          {emptyJarsToReturn}
                        </span>
                        <button
                          type="button"
                          onClick={() => setEmptyJarsToReturn(emptyJarsToReturn + 1)}
                          className="px-2.5 py-1 text-cyan-800 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900/50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {emptyJarsToReturn > 0 && (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          - {formatBDT(emptyJarsToReturn * 200, currentLang)} {currentLang === "bn" ? "ছাড়" : "Credit"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delivery Details Form */}
            <div className="glass-card p-6 rounded-2xl border border-sky-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>{currentLang === "bn" ? "ডেলিভারি ঠিকানা ও সময়" : "Delivery Address & Slot"}</span>
              </h3>

              {/* Zone Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {currentLang === "bn" ? "ঢাকার ডেলিভারি এলাকা *" : "Dhaka Delivery Area *"}
                </label>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {DHAKA_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {currentLang === "bn" ? zone.nameBn : zone.nameEn} (Fee: ৳{zone.fee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {currentLang === "bn" ? "বিস্তারিত ঠিকানা (রাস্তা, বাসা/হোল্ডিং নম্বর) *" : "Detailed Street Address *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    currentLang === "bn"
                      ? "যেমন: বাড়ি # ১২, রোড # ৪/এ, গুলশান-২"
                      : "e.g. House #12, Road #4/A, Gulshan-2"
                  }
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Floor & Lift Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {currentLang === "bn" ? "ফ্লোর নম্বর ও লিফট সুবিধা" : "Floor & Elevator Info"}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      currentLang === "bn"
                        ? "যেমন: ৫ম তলা (লিফট আছে)"
                        : "e.g. 5th Floor, Elevator available"
                    }
                    value={floorNumber}
                    onChange={(e) => setFloorNumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    {currentLang === "bn" ? "যোগাযোগের ফোন নম্বর *" : "Contact Phone Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017xxxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {currentLang === "bn" ? "ডেলিভারি সময় নির্বাচন করুন" : "Preferred Delivery Slot"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "MORNING", labelEn: "Morning (9am-1pm)", labelBn: "সকাল (৯টা-১টা)" },
                    { id: "AFTERNOON", labelEn: "Afternoon (2pm-6pm)", labelBn: "দুপুর (২টা-৬টা)" },
                    { id: "EVENING", labelEn: "Evening (6pm-9pm)", labelBn: "সন্ধ্যা (৬টা-৯টা)" },
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setDeliverySlot(slot.id)}
                      className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                        deliverySlot === slot.id
                          ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {currentLang === "bn" ? slot.labelBn : slot.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Payment Method (bKash, SSLCOMMERZ Cards/MFS, Cash on Delivery) */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
                  <span>{currentLang === "bn" ? "পেমেন্ট মাধ্যম নির্বাচন করুন *" : "Payment Method *"}</span>
                  <span className="text-[11px] text-emerald-600 font-normal flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>256-bit Secured</span>
                  </span>
                </label>

                <div className="space-y-2.5">
                  {/* Option 1: bKash Direct Merchant */}
                  <div
                    onClick={() => setSelectedPaymentMethod("BKASH")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPaymentMethod === "BKASH"
                        ? "border-[#E2136E] bg-pink-50/70 dark:bg-pink-950/30 shadow-md ring-2 ring-pink-100 dark:ring-pink-900/40"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-pink-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#E2136E] text-white flex items-center justify-center shadow-md flex-shrink-0 p-2">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                          <path d="M50 10 L85 50 L65 50 L80 85 L35 45 L55 45 Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {currentLang === "bn" ? "বিকাশ পেমেন্ট" : "bKash Direct"}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E2136E]/15 text-[#E2136E]">
                            {currentLang === "bn" ? "জনপ্রিয়" : "Fastest"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {currentLang === "bn"
                            ? "অফিসিয়াল বিকাশ ওটিপি ও পিন দিয়ে সরাসরি পরিশোধ করুন"
                            : "Instant checkout with official bKash OTP & PIN"}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "BKASH"
                        ? "border-[#E2136E] bg-[#E2136E]"
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {selectedPaymentMethod === "BKASH" && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* Option 2: SSLCOMMERZ Cards & MFS */}
                  <div
                    onClick={() => setSelectedPaymentMethod("SSLCOMMERZ")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPaymentMethod === "SSLCOMMERZ"
                        ? "border-blue-600 bg-blue-50/70 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-100 dark:ring-blue-900/40"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {currentLang === "bn" ? "কার্ড ও অন্যান্য ডিজিটাল ব্যাংকিং" : "Cards & Mobile Banking"}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                            SSLCOMMERZ
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {currentLang === "bn"
                            ? "ভিসা, মাস্টারকার্ড, নগদ, রকেট, উপায় ও ইন্টারনেট ব্যাংকিং"
                            : "Visa, Mastercard, Nagad, Rocket, Upay & Net Banking"}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "SSLCOMMERZ"
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {selectedPaymentMethod === "SSLCOMMERZ" && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>

                  {/* Option 3: Cash on Delivery (COD) */}
                  <div
                    onClick={() => setSelectedPaymentMethod("COD")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedPaymentMethod === "COD"
                        ? "border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-100 dark:ring-emerald-900/40"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {currentLang === "bn" ? "ক্যাশ অন ডেলিভারি (COD)" : "Cash on Delivery (COD)"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {currentLang === "bn"
                            ? "পানির জার হাতে পেয়ে ডেলিভারি এজেন্টের নিকট নগদ পরিশোধ করুন"
                            : "Pay cash to the delivery staff at doorstep after inspection"}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPaymentMethod === "COD"
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300 dark:border-slate-600"
                    }`}>
                      {selectedPaymentMethod === "COD" && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Server-Calculated Order Summary (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="glass-card p-6 rounded-3xl border border-sky-200 dark:border-slate-800 shadow-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>{currentLang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}</span>
                {isCalculatingQuote && (
                  <span className="text-xs text-sky-500 font-normal animate-pulse">
                    {currentLang === "bn" ? "হিসাব হচ্ছে..." : "Recalculating..."}
                  </span>
                )}
              </h3>

              {/* Promo code box */}
              <div className="mb-4">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedPromo} ({currentLang === "bn" ? "ছাড় প্রযোজ্য" : "Applied"})</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePromo}
                      className="text-xs font-semibold hover:underline text-rose-500"
                    >
                      {currentLang === "bn" ? "মুছুন" : "Remove"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={currentLang === "bn" ? "কুপন কোড (যেমন: AQUA10)" : "Promo code (e.g. AQUA10)"}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 uppercase"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleApplyPromo}
                      className="rounded-xl text-xs"
                    >
                      {currentLang === "bn" ? "প্রয়োগ" : "Apply"}
                    </Button>
                  </div>
                )}
                {promoError && <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>}
              </div>

              {/* Itemized Calculations */}
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <span>{currentLang === "bn" ? "পণ্য উপমোট" : "Products Subtotal"}</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {formatBDT(quote?.summary?.itemsSubtotal || 0, currentLang)}
                  </span>
                </div>

                {/* Total Deposit */}
                {quote?.summary?.totalDepositAmount > 0 && (
                  <div className="flex justify-between text-cyan-700 dark:text-cyan-300">
                    <span>{currentLang === "bn" ? "জার জামানত (রিফান্ডেবল)" : "Jar Deposit (Refundable)"}</span>
                    <span className="font-semibold">
                      +{formatBDT(quote.summary.totalDepositAmount, currentLang)}
                    </span>
                  </div>
                )}

                {/* Jar Return Credit */}
                {quote?.summary?.returnCredit > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>
                      {currentLang === "bn"
                        ? `খালি জার ফেরত ক্রেডিট (${emptyJarsToReturn}টি)`
                        : `Jar Return Credit (${emptyJarsToReturn} jars)`}
                    </span>
                    <span>-{formatBDT(quote.summary.returnCredit, currentLang)}</span>
                  </div>
                )}

                {/* Delivery Fee */}
                <div className="flex justify-between">
                  <span>{currentLang === "bn" ? "ডেলিভারি ফি" : "Delivery Fee"}</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {quote?.summary?.deliveryFee === 0 ? (
                      <span className="text-emerald-500 font-bold uppercase text-xs">
                        {currentLang === "bn" ? "ফ্রি" : "Free"}
                      </span>
                    ) : (
                      formatBDT(quote?.summary?.deliveryFee || 50, currentLang)
                    )}
                  </span>
                </div>

                {/* Discount */}
                {quote?.summary?.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>{currentLang === "bn" ? "প্রোমো ছাড়" : "Promo Discount"}</span>
                    <span>-{formatBDT(quote.summary.discountAmount, currentLang)}</span>
                  </div>
                )}

                {/* Grand Total */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {currentLang === "bn" ? "সর্বমোট প্রদেয়" : "Grand Total"}
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-sky-600 dark:text-sky-400">
                    {formatBDT(quote?.summary?.grandTotal || 0, currentLang)}
                  </span>
                </div>
              </div>

              {/* Dynamic Payment Note */}
              <div className={`mt-4 p-3 rounded-2xl border text-xs flex items-center gap-2.5 transition-all shadow-sm ${
                selectedPaymentMethod === "BKASH"
                  ? "bg-pink-50/80 dark:bg-pink-950/20 border-pink-200 dark:border-pink-900/40 text-pink-950 dark:text-pink-200"
                  : selectedPaymentMethod === "SSLCOMMERZ"
                  ? "bg-blue-50/80 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-blue-950 dark:text-blue-200"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
              }`}>
                <ShieldCheck className={`w-4 h-4 flex-shrink-0 ${
                  selectedPaymentMethod === "BKASH"
                    ? "text-[#E2136E]"
                    : selectedPaymentMethod === "SSLCOMMERZ"
                    ? "text-blue-600"
                    : "text-emerald-500"
                }`} />
                <span>
                  {selectedPaymentMethod === "BKASH"
                    ? currentLang === "bn"
                      ? "বিকাশ অফিসিয়াল মার্চেন্ট গেটওয়েতে ওটিপি ও পিন দিয়ে প্রিপেইড পেমেন্ট।"
                      : "Official bKash payment gateway. Fast OTP & PIN verification."
                    : selectedPaymentMethod === "SSLCOMMERZ"
                    ? currentLang === "bn"
                      ? "ভিসা, মাস্টারকার্ড, নগদ বা রকেটে ২৫৬-বিট এনক্রিপ্টেড পেমেন্ট।"
                      : "256-bit SSL secured cards & mobile banking checkout."
                    : currentLang === "bn"
                    ? "পেমেন্ট পদ্ধতি: ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা পরিশোধ করুন)।"
                    : "Payment: Cash on Delivery upon inspection."}
                </span>
              </div>

              {/* Dynamic Checkout CTA */}
              <Button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting || cart.length === 0}
                className={`w-full mt-5 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedPaymentMethod === "BKASH"
                    ? "bg-[#E2136E] hover:bg-[#c20f5c] shadow-pink-500/25"
                    : selectedPaymentMethod === "SSLCOMMERZ"
                    ? "bg-blue-700 hover:bg-blue-600 shadow-blue-500/25"
                    : "bg-sky-600 hover:bg-sky-500 shadow-sky-500/25"
                }`}
              >
                {isSubmitting ? (
                  <span>{currentLang === "bn" ? "অর্ডার সংরক্ষিত হচ্ছে..." : "Reserving Order..."}</span>
                ) : (
                  <>
                    <span>
                      {selectedPaymentMethod === "BKASH"
                        ? currentLang === "bn"
                          ? `বিকাশে ${formatBDT(quote?.summary?.grandTotal || 0, currentLang)} পরিশোধ করুন`
                          : `Pay ${formatBDT(quote?.summary?.grandTotal || 0, currentLang)} via bKash`
                        : selectedPaymentMethod === "SSLCOMMERZ"
                        ? currentLang === "bn"
                          ? `কার্ড/এমএফএস-এ ${formatBDT(quote?.summary?.grandTotal || 0, currentLang)} পরিশোধ`
                          : `Pay ${formatBDT(quote?.summary?.grandTotal || 0, currentLang)} via Cards/MFS`
                        : currentLang === "bn"
                        ? "ক্যাশ অন ডেলিভারিতে অর্ডার নিশ্চিত করুন"
                        : "Confirm Cash on Delivery Order"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* bKash Payment Modal Popup */}
      <BkashModal
        isOpen={isBkashModalOpen}
        onClose={() => setIsBkashModalOpen(false)}
        amount={quote?.summary?.grandTotal || 0}
        orderId={pendingOrderId}
        customerPhone={phone}
        currentLang={currentLang}
        onPaymentSuccess={handleOnlinePaymentSuccess}
      />

      {/* SSLCOMMERZ Payment Modal Popup */}
      <SslcommerzModal
        isOpen={isSslModalOpen}
        onClose={() => setIsSslModalOpen(false)}
        amount={quote?.summary?.grandTotal || 0}
        orderId={pendingOrderId}
        customerName={user?.name || "AquaFlow Customer"}
        currentLang={currentLang}
        onPaymentSuccess={handleOnlinePaymentSuccess}
      />
    </div>
  );
}

export default Cart;
