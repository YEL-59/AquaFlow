import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  User,
  Package,
  Clock,
  MapPin,
  Phone,
  RotateCcw,
  CheckCircle2,
  Truck,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
  Calendar,
  AlertCircle,
  RefreshCw,
  Droplets,
  CreditCard,
  Plus,
  Play,
  Pause,
  Receipt,
  FileText,
  Zap,
  Leaf,
  Sparkles,
  HelpCircle,
  Send,
  MessageSquare,
  Minus,
  Navigation,
} from "lucide-react";
import { formatBDT } from "../lib/utils";
import { Button, Card, Badge, EmptyState } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { CustomerHydrationChart } from "../components/charts/BusinessCharts";
import { DhakaDeliveryMap } from "../components/maps/DhakaDeliveryMap";

const DEMO_ORDERS = [
  {
    id: "ORD-20261104-7821",
    orderNumber: "ORD-20261104-7821",
    status: "OUT_FOR_DELIVERY",
    paymentStatus: "PENDING",
    paymentMethod: "CASH_ON_DELIVERY",
    createdAt: "2026-11-04T08:30:00.000Z",
    deliverySlot: "MORNING (09:00 - 13:00)",
    deliveryAddress: "House 14, Road 11, Block D, Banani, Dhaka",
    deliveryFloor: "4th Floor (Lift Available)",
    contactPhone: "+8801712345678",
    riderName: "Md. Rafiqul Islam",
    riderPhone: "+8801811223344",
    emptyJarsExpected: 2,
    summary: {
      itemsSubtotal: 240,
      totalDepositAmount: 400,
      emptyJarsToReturn: 2,
      returnCredit: 400,
      deliveryFee: 50,
      discountAmount: 0,
      grandTotal: 290,
    },
    items: [
      {
        productId: "prod-20l-jar",
        nameEn: "AquaFlow 20L Pure Reusable Jar",
        nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
        quantity: 3,
        unitPrice: 80,
        unitDeposit: 200,
      },
    ],
    timeline: [
      {
        status: "PLACED",
        timestamp: "2026-11-04T08:30:00Z",
        titleEn: "Order Placed",
        titleBn: "অর্ডার গ্রহণ করা হয়েছে",
        descriptionEn: "Order submitted with Cash on Delivery",
        descriptionBn: "ক্যাশ অন ডেলিভারিতে অর্ডার জমা হয়েছে",
      },
      {
        status: "CONFIRMED",
        timestamp: "2026-11-04T08:45:00Z",
        titleEn: "Hub Allocated",
        titleBn: "হাব থেকে স্টক বরাদ্দ",
        descriptionEn: "Sanitized 20L jars allocated at Banani Hub",
        descriptionBn: "বনানী হাব থেকে জীবাণুমুক্ত জার প্রস্তুত করা হয়েছে",
      },
      {
        status: "OUT_FOR_DELIVERY",
        timestamp: "2026-11-04T09:15:00Z",
        titleEn: "Out for Delivery",
        titleBn: "ডেলিভারির উদ্দেশ্যে বের হয়েছে",
        descriptionEn: "Delivery agent Md. Rafiqul Islam is on the way with your water",
        descriptionBn: "ডেলিভারি বয় মো. রফিকুল ইসলাম পানির উদ্দেশ্যে রওনা দিয়েছেন",
      },
    ],
  },
  {
    id: "ORD-20261028-4412",
    orderNumber: "ORD-20261028-4412",
    status: "DELIVERED",
    paymentStatus: "PAID",
    paymentMethod: "CASH_ON_DELIVERY",
    createdAt: "2026-10-28T10:15:00.000Z",
    deliverySlot: "AFTERNOON (14:00 - 18:00)",
    deliveryAddress: "House 14, Road 11, Block D, Banani, Dhaka",
    contactPhone: "+8801712345678",
    emptyJarsExpected: 1,
    summary: {
      itemsSubtotal: 360,
      totalDepositAmount: 0,
      emptyJarsToReturn: 1,
      returnCredit: 200,
      deliveryFee: 50,
      discountAmount: 0,
      grandTotal: 210,
    },
    items: [
      {
        productId: "prod-20l-jar",
        nameEn: "AquaFlow 20L Pure Reusable Jar",
        nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
        quantity: 2,
        unitPrice: 80,
        unitDeposit: 0,
      },
    ],
    timeline: [
      {
        status: "DELIVERED",
        timestamp: "2026-10-28T11:45:00Z",
        titleEn: "Delivered & Reconciled",
        titleBn: "ডেলিভারি সম্পন্ন",
        descriptionEn: "Delivered to Banani address, cash collected ৳210",
        descriptionBn: "সফলভাবে ডেলিভারি ও ক্যাশ গ্রহণ করা হয়েছে",
      },
    ],
  },
];

const DEMO_SUBSCRIPTIONS = [
  {
    id: "SUB-8910",
    planName: "Family Daily Hydration",
    product: "AquaFlow 20L Reusable Jar",
    frequency: "Daily (Every Morning)",
    quantity: "2 Jars / delivery",
    status: "ACTIVE",
    deliverySlot: "08:00 - 11:00 AM",
    nextDelivery: "Tomorrow, 08:30 AM",
    monthlyEst: 4800,
  },
  {
    id: "SUB-4419",
    planName: "Office Packaged Box Supply",
    product: "AquaFlow 500ml Bottled Box (24x)",
    frequency: "Weekly (Every Sunday)",
    quantity: "4 Boxes / week",
    status: "PAUSED",
    deliverySlot: "10:00 - 01:00 PM",
    nextDelivery: "Paused by User",
    monthlyEst: 3840,
  },
];

const DEMO_ADDRESSES = [
  {
    id: "ADDR-1",
    label: "Home (Primary)",
    neighborhood: "Banani",
    address: "House 14, Road 11, Block D, Banani, Dhaka-1213",
    floorNote: "4th Floor (Flat 4B, Lift available)",
    phone: "+880 1712-345678",
    isDefault: true,
  },
  {
    id: "ADDR-2",
    label: "Office",
    neighborhood: "Gulshan-1",
    address: "Level 6, Navana Tower, Gulshan South Ave, Dhaka-1212",
    floorNote: "Reception desk, commercial cargo elevator",
    phone: "+880 1711-998877",
    isDefault: false,
  },
];

const DEMO_PAYMENTS = [
  {
    id: "PAY-9081",
    date: "2026-11-04",
    orderNumber: "ORD-20261104-7821",
    method: "Cash on Delivery (Pending)",
    amount: 290,
    status: "PENDING",
  },
  {
    id: "PAY-7652",
    date: "2026-10-28",
    orderNumber: "ORD-20261028-4412",
    method: "Cash on Delivery",
    amount: 210,
    status: "PAID",
  },
  {
    id: "PAY-6541",
    date: "2026-10-15",
    orderNumber: "ORD-20261015-1109",
    method: "bKash Online",
    amount: 450,
    status: "PAID",
  },
];

const DEMO_TICKETS = [
  {
    id: "TKT-1044",
    title: "Dispenser cleaning & sanitization service request",
    category: "MAINTENANCE",
    status: "IN_PROGRESS",
    date: "Today, 10:30 AM",
    response: "Assigned technician from Banani Central Hub. Expected arrival today at 3:00 PM.",
  },
  {
    id: "TKT-0982",
    title: "Schedule change for weekend delivery",
    category: "SUBSCRIPTION",
    status: "RESOLVED",
    date: "Oct 30, 2026",
    response: "Updated your subscription delivery slot to 10:00 AM permanently.",
  },
];

export function Account() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "en";
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromPath = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/subscriptions")) return "SUBSCRIPTIONS";
    if (path.includes("/addresses")) return "ADDRESSES";
    if (path.includes("/payments")) return "PAYMENTS";
    if (path.includes("/support")) return "SUPPORT";
    return "ORDERS";
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath);
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [subscriptions, setSubscriptions] = useState(DEMO_SUBSCRIPTIONS);
  const [addresses, setAddresses] = useState(DEMO_ADDRESSES);
  const [tickets, setTickets] = useState(DEMO_TICKETS);

  // Quick Refill Toast state
  const [quickOrderNotice, setQuickOrderNotice] = useState(null);

  // Jar Return Modal state
  const [showJarReturnModal, setShowJarReturnModal] = useState(false);
  const [jarReturnForm, setJarReturnForm] = useState({
    jarsCount: 2,
    refundMethod: "bKash",
    accountNumber: "01712345678",
    preferredPickupTime: "Tomorrow Morning (09:00 - 12:00)",
  });
  const [jarReturnSubmitted, setJarReturnSubmitted] = useState(false);

  // Support ticket form
  const [newTicket, setNewTicket] = useState({ title: "", category: "DELIVERY", message: "" });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ label: "Other", neighborhood: "Dhanmondi", address: "", floorNote: "" });

  useEffect(() => {
    setActiveTab(getTabFromPath());
  }, [location.pathname]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedOrder(null);
    navigate(`/account/${tabId.toLowerCase()}`);
  };

  // Instant 1-Click Refill
  const handleInstantRefill = () => {
    const newOrdNumber = `ORD-${Date.now().toString().slice(-8)}`;
    const instantOrder = {
      id: newOrdNumber,
      orderNumber: newOrdNumber,
      status: "CONFIRMED",
      paymentStatus: "PENDING",
      paymentMethod: "CASH_ON_DELIVERY",
      createdAt: new Date().toISOString(),
      deliverySlot: "PRIORITY EXPRESS (Next 45 Mins)",
      deliveryAddress: "House 14, Road 11, Block D, Banani, Dhaka",
      contactPhone: "+8801712345678",
      emptyJarsExpected: 1,
      summary: {
        itemsSubtotal: 80,
        totalDepositAmount: 200,
        emptyJarsToReturn: 1,
        returnCredit: 200,
        deliveryFee: 50,
        grandTotal: 130,
      },
      items: [
        {
          productId: "prod-20l-jar",
          nameEn: "AquaFlow 20L Pure Reusable Jar",
          nameBn: "অ্যাকোয়াফ্লো ২০ লিটার রিইউজেবল জার",
          quantity: 1,
          unitPrice: 80,
        },
      ],
      timeline: [
        {
          status: "PLACED",
          timestamp: new Date().toISOString(),
          titleEn: "Instant Refill Dispatched",
          titleBn: "তাৎক্ষণিক রিফিল বরাদ্দ",
          descriptionEn: "Priority dispatch from Banani Central Hub",
          descriptionBn: "বনানী হাব থেকে এক্সপ্রেস রাইডারকে বরাদ্দ করা হয়েছে",
        },
      ],
    };
    setOrders([instantOrder, ...orders]);
    setQuickOrderNotice("✓ Instant 20L Refill Ordered! Banani Hub Rider is en route (ETA ~45 mins).");
    setTimeout(() => setQuickOrderNotice(null), 5000);
  };

  const handleJarReturnSubmit = (e) => {
    e.preventDefault();
    setJarReturnSubmitted(true);
    setTimeout(() => {
      setJarReturnSubmitted(false);
      setShowJarReturnModal(false);
    }, 3000);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.title) return;
    setTickets([
      {
        id: `TKT-${Date.now().toString().slice(-4)}`,
        title: newTicket.title,
        category: newTicket.category,
        status: "SUBMITTED",
        date: "Just now",
        response: "Support desk acknowledged. Operations manager will contact you within 15 minutes.",
      },
      ...tickets,
    ]);
    setTicketSubmitted(true);
    setNewTicket({ title: "", category: "DELIVERY", message: "" });
    setTimeout(() => setTicketSubmitted(false), 3000);
  };

  const toggleSubscription = (subId) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: s.status === "ACTIVE" ? "PAUSED" : "ACTIVE" } : s))
    );
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddress.address) return;
    setAddresses((prev) => [
      ...prev,
      {
        id: `ADDR-${Date.now()}`,
        ...newAddress,
        phone: user?.phoneNumber || "+880 1712-345678",
        isDefault: false,
      },
    ]);
    setShowAddAddress(false);
    setNewAddress({ label: "Other", neighborhood: "Dhanmondi", address: "", floorNote: "" });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "OUT_FOR_DELIVERY":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
            <Truck className="w-3.5 h-3.5 animate-bounce" />
            {currentLang === "bn" ? "ডেলিভারিতে আছে" : "Out for Delivery"}
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-300">
            <Clock className="w-3.5 h-3.5" />
            {currentLang === "bn" ? "নিশ্চিত হয়েছে" : "Confirmed"}
          </span>
        );
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {currentLang === "bn" ? "ডেলিভারি সম্পন্ন" : "Delivered"}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-6">
        {/* Instant Refill Floating Alert */}
        {quickOrderNotice && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs shadow-2xl flex items-center justify-between animate-in slide-in-from-top-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>{quickOrderNotice}</span>
            </div>
            <button
              onClick={() => setQuickOrderNotice(null)}
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        )}

        {/* User Greeting & Jar Balance Top Banner */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg shadow-sky-500/30">
              {user?.fullName ? user.fullName[0].toUpperCase() : "T"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {user?.fullName || "Tofayel Ahmed"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                <Phone className="w-3.5 h-3.5 text-sky-500" />
                <span>{user?.phoneNumber || "+880 1712-345678"}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>Banani Hub, Dhaka</span>
              </p>
            </div>
          </div>

          {/* Quick Jar Liability Balance & Action Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50 dark:bg-slate-800/80 border border-sky-200/80 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Jars With You
                </div>
                <div className="text-lg font-black text-sky-600 dark:text-sky-400">
                  3 Jars <span className="text-xs text-slate-400 font-normal">(৳600 Deposit Held)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowJarReturnModal(true)}
              className="px-4 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Claim Deposit Refund</span>
            </button>
          </div>
        </div>

        {/* 1-Click Priority Water Refill Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-900 via-slate-900 to-cyan-900 text-white border border-sky-700/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-lg shadow-amber-400/30">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>Running Low on Drinking Water?</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40">
                  Priority 45-Min Hub Dispatch
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                One-tap order delivery of 1x 20L pure RO jar to your default Banani address.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleInstantRefill}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/30 transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <span>⚡ Instant 20L Jar Reorder (৳130)</span>
          </button>
        </div>

        {/* Monthly Household Hydration & Eco Health Analytics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Water Consumed (Nov)</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">240 Liters</div>
              <div className="text-[10px] text-emerald-500 font-semibold">8.0L daily average</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Plastic Waste Saved</div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">480 Bottles</div>
              <div className="text-[10px] text-slate-400">Zero single-use plastic</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Water Purity Score</div>
              <div className="text-lg font-black text-cyan-600 dark:text-cyan-400 mt-0.5">92 ppm TDS</div>
              <div className="text-[10px] text-slate-400">0 CFU Coliform Lab Tested</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Hydration Streak</div>
              <div className="text-lg font-black text-purple-600 dark:text-purple-400 mt-0.5">24 Days</div>
              <div className="text-[10px] text-slate-400">Continuous pure water</div>
            </div>
          </div>
        </div>

        {/* Household 30-Day Hydration & Consumption Trend Graph */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span>Family Drinking Water Intake & Daily Refill Rhythm</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tracking your household's daily pure water consumption in Liters (Average 8.0L/day for 4 family members)
              </p>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 self-start sm:self-auto">
              Eco Goal: 100% On-Track
            </span>
          </div>

          <CustomerHydrationChart height={200} />
        </div>

        {/* 5 Primary Navigation Tabs: /orders, /subscriptions, /addresses, /payments, /support */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => handleTabChange("ORDERS")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "ORDERS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{currentLang === "bn" ? "অর্ডারসমূহ" : "Orders"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("SUBSCRIPTIONS")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "SUBSCRIPTIONS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>{currentLang === "bn" ? "সাবস্ক্রিপশন" : "Subscriptions"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("ADDRESSES")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "ADDRESSES"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{currentLang === "bn" ? "ঠিকানাসমূহ" : "Addresses"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("PAYMENTS")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "PAYMENTS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{currentLang === "bn" ? "পেমেন্ট ও জার লেজার" : "Payments & Ledger"}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("SUPPORT")}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "SUPPORT"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>{currentLang === "bn" ? "সহায়তা ও অভিযোগ" : "Support & Tickets"}</span>
          </button>
        </div>

        {/* ===================== TAB 1: ORDERS ===================== */}
        {activeTab === "ORDERS" && (
          <div className="space-y-6">
            {selectedOrder ? (
              /* Detailed Order Timeline View */
              <div className="space-y-6">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{currentLang === "bn" ? "অর্ডার তালিকায় ফিরুন" : "Back to All Orders"}</span>
                </button>

                <div className="glass-card p-6 sm:p-8 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-xs text-slate-400 font-mono">Order Tracking ID</div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                        {selectedOrder.orderNumber}
                      </h2>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{selectedOrder.deliverySlot}</span>
                      </div>
                    </div>
                    <div>{getStatusBadge(selectedOrder.status)}</div>
                  </div>

                  {/* 5-Stage Essential Workflow Timeline */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
                      Essential Order Workflow
                    </h3>
                    <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-sky-300 dark:border-sky-800 ml-4">
                      {selectedOrder.timeline.map((step, idx) => (
                        <div key={idx} className="relative group">
                          <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-6 h-6 rounded-full bg-sky-500 border-4 border-white dark:border-slate-900 shadow-md flex items-center justify-center text-white text-[10px]">
                            ✓
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {currentLang === "bn" ? step.titleBn : step.titleEn}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {currentLang === "bn" ? step.descriptionBn : step.descriptionEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Live Route Map (OpenStreetMap & Leaflet) */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Navigation className="w-5 h-5 text-sky-600 animate-pulse" />
                        <span>{currentLang === "bn" ? "লাইভ ডেলিভারি রুট ও ভ্যান ট্র্যাকিং" : "Live Delivery Route & GPS Tracking"}</span>
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span>GPS Active • Real-time</span>
                      </span>
                    </div>

                    <DhakaDeliveryMap
                      orderNumber={selectedOrder.orderNumber}
                      driverName={selectedOrder.riderName || "Md. Rafiqul Islam"}
                      driverPhone={selectedOrder.riderPhone || "+8801811223344"}
                      deliveryAddress={selectedOrder.deliveryAddress}
                      currentLang={currentLang}
                      height="360px"
                      interactive={true}
                    />
                  </div>

                  {/* Order Summary & Financials */}
                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Items Subtotal:</span>
                      <span className="font-bold">৳{selectedOrder.summary.itemsSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jar Deposits Charged:</span>
                      <span className="font-bold">৳{selectedOrder.summary.totalDepositAmount}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600">
                      <span>Empty Jars Return Credit:</span>
                      <span className="font-bold">-৳{selectedOrder.summary.returnCredit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery Fee:</span>
                      <span className="font-bold">৳{selectedOrder.summary.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black pt-2 border-t border-slate-200 dark:border-slate-700 text-sky-600">
                      <span>Total Payable:</span>
                      <span>৳{selectedOrder.summary.grandTotal}</span>
                    </div>

                    {/* Payment Information Box */}
                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">Payment:</span>
                        <span className={`px-2 py-0.5 rounded-md font-bold ${
                          selectedOrder.paymentMethod === "BKASH"
                            ? "bg-pink-100 text-[#E2136E]"
                            : selectedOrder.paymentMethod === "SSLCOMMERZ"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {selectedOrder.paymentMethod === "BKASH"
                            ? "bKash Online"
                            : selectedOrder.paymentMethod === "SSLCOMMERZ"
                            ? "Cards & MFS (SSLCOMMERZ)"
                            : "Cash on Delivery"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          selectedOrder.paymentStatus === "PAID"
                            ? "bg-emerald-500 text-white"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {selectedOrder.paymentStatus || "PENDING"}
                        </span>
                      </div>

                      {selectedOrder.transactionId && (
                        <div className="text-slate-500 font-mono">
                          TrxID: <strong className="text-slate-800 dark:text-slate-200">{selectedOrder.transactionId}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-sky-300 transition"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          {ord.orderNumber}
                        </span>
                        {getStatusBadge(ord.status)}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {ord.deliveryAddress} • {ord.deliverySlot}
                      </div>
                      <div className="flex items-center gap-2 pt-1 text-xs font-bold">
                        <span className="text-sky-600">Total: ৳{ord.summary.grandTotal}</span>
                        <span className="text-slate-300">•</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ord.paymentMethod === "BKASH"
                            ? "bg-pink-100 text-[#E2136E]"
                            : ord.paymentMethod === "SSLCOMMERZ"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {ord.paymentMethod === "BKASH" ? "bKash" : ord.paymentMethod === "SSLCOMMERZ" ? "SSLCOMMERZ" : "COD"}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          ord.paymentStatus === "PAID" ? "bg-emerald-500 text-white" : "bg-amber-100 text-amber-800"
                        }`}>
                          {ord.paymentStatus || "PENDING"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedOrder(ord)}
                      className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 dark:bg-sky-950 dark:hover:bg-sky-900 dark:text-sky-300 text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <span>Track Order</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: SUBSCRIPTIONS ===================== */}
        {activeTab === "SUBSCRIPTIONS" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Recurring Water Subscriptions
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automated pure water replenishment directly to your home or office.
                </p>
              </div>
              <Link
                to="/subscriptions"
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Subscription</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      {sub.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{sub.planName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub.product}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Frequency:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{sub.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Delivery Slot:</span>
                      <span className="font-semibold">{sub.deliverySlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Next Occurrence:</span>
                      <span className="font-bold text-sky-600">{sub.nextDelivery}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => toggleSubscription(sub.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                        sub.status === "ACTIVE"
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                      }`}
                    >
                      {sub.status === "ACTIVE" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{sub.status === "ACTIVE" ? "Pause Deliveries" : "Resume Plan"}</span>
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                    >
                      Skip Next
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: ADDRESSES ===================== */}
        {activeTab === "ADDRESSES" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Saved Delivery Addresses</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage home, office, and commercial delivery locations across Dhaka.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAddress(!showAddAddress)}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md inline-flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Add Address Form Modal / Drawer */}
            {showAddAddress && (
              <form
                onSubmit={handleAddAddressSubmit}
                className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 max-w-lg"
              >
                <h4 className="text-sm font-bold">New Delivery Location</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Label</label>
                    <input
                      type="text"
                      required
                      value={newAddress.label}
                      onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                      placeholder="e.g. Gym, Factory"
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Dhaka Area</label>
                    <select
                      value={newAddress.neighborhood}
                      onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                    >
                      <option value="Banani">Banani</option>
                      <option value="Gulshan-1">Gulshan-1</option>
                      <option value="Gulshan-2">Gulshan-2</option>
                      <option value="Dhanmondi">Dhanmondi</option>
                      <option value="Uttara">Uttara</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Road & Building Address</label>
                  <input
                    type="text"
                    required
                    value={newAddress.address}
                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    placeholder="House, Road, Block"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Floor & Landmark Notes</label>
                  <input
                    type="text"
                    value={newAddress.floorNote}
                    onChange={(e) => setNewAddress({ ...newAddress, floorNote: e.target.value })}
                    placeholder="Floor number, lift access, landmark"
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold">
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAddress(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-500" />
                      <span>{addr.label}</span>
                    </span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{addr.address}</p>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] text-amber-600 dark:text-amber-400">
                    🏢 {addr.floorNote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: PAYMENTS & JAR LEDGER ===================== */}
        {activeTab === "PAYMENTS" && (
          <div className="space-y-6">
            {/* Reusable Jar Balance Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-900 to-cyan-950 text-white shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <RotateCcw className="w-5 h-5 text-sky-400" />
                    <span>20L Reusable Container Ledger</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Transparent tracking of bottles issued, empty jars returned, and refundable deposit liability.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
                    <div className="text-[10px] text-slate-300 uppercase">Deposit Value Held</div>
                    <div className="text-lg font-black text-cyan-300">৳600.00</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowJarReturnModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition"
                  >
                    Request Return Pickup
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">Jars Received</div>
                  <div className="text-xl font-black text-white mt-0.5">5</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">Empties Returned</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5">2</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/10">
                  <div className="text-slate-400 text-[11px]">Active At Location</div>
                  <div className="text-xl font-black text-cyan-400 mt-0.5">3</div>
                </div>
              </div>
            </div>

            {/* Payment History List */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-sky-500" />
                <span>Payment History & Receipts</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                      <th className="pb-3 font-semibold">Payment ID</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Order</th>
                      <th className="pb-3 font-semibold">Method</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {DEMO_PAYMENTS.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 font-mono font-bold text-slate-800 dark:text-slate-200">{p.id}</td>
                        <td className="py-3 text-slate-500">{p.date}</td>
                        <td className="py-3 font-mono text-sky-600">{p.orderNumber}</td>
                        <td className="py-3 text-slate-600 dark:text-slate-400">{p.method}</td>
                        <td className="py-3 font-bold text-slate-900 dark:text-white">৳{p.amount}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              p.status === "PAID"
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: SUPPORT & TICKETS ===================== */}
        {activeTab === "SUPPORT" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Create Support Ticket */}
              <div className="lg:col-span-1 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-sky-500" />
                  <span>Raise a Support Ticket</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Have an issue with a jar seal, delivery time, or dispenser? We respond within 15 minutes.
                </p>

                {ticketSubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-emerald-800 dark:text-emerald-300 text-xs text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 mx-auto" />
                    <div className="font-bold">Ticket Submitted!</div>
                    <div>Banani Operations Hub has been assigned.</div>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Issue Category
                      </label>
                      <select
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                        <option value="DELIVERY">Delivery Timing / Rider Question</option>
                        <option value="JAR_SEAL">Damaged Jar Cap or Seal</option>
                        <option value="DISPENSER">Dispenser Sanitization / Repair</option>
                        <option value="BILLING">Deposit or Payment Query</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Subject / Brief Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Broken seal on 1 jar"
                        value={newTicket.title}
                        onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      >
                      </input>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Message Details
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Explain your issue..."
                        value={newTicket.message}
                        onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Ticket</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Existing Tickets Timeline */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Support & Dispute Tickets</h3>
                {tickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-sky-600">{t.id}</span>
                        <span className="text-xs text-slate-400">• {t.date}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          t.status === "RESOLVED"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.title}</h4>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-sky-600">Hub Response:</span> {t.response}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Jar Return & Refund Modal */}
        {showJarReturnModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-cyan-500" />
                  <span>Request Jar Return & Deposit Refund</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowJarReturnModal(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              {jarReturnSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <div className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                    Pickup Scheduled Successfully!
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    A Banani Hub delivery hero will arrive tomorrow to collect {jarReturnForm.jarsCount} empty jars and transfer ৳{jarReturnForm.jarsCount * 200} to your {jarReturnForm.refundMethod} wallet.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJarReturnSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Empty Jars to Hand Over (৳200/Jar Refund)
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setJarReturnForm({ ...jarReturnForm, jarsCount: Math.max(1, jarReturnForm.jarsCount - 1) })}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-black text-cyan-600 dark:text-cyan-400 w-12 text-center">
                        {jarReturnForm.jarsCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setJarReturnForm({ ...jarReturnForm, jarsCount: Math.min(3, jarReturnForm.jarsCount + 1) })}
                        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-bold text-slate-500">
                        Refund: <strong className="text-emerald-600">৳{jarReturnForm.jarsCount * 200}</strong>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Refund Transfer Method
                    </label>
                    <select
                      value={jarReturnForm.refundMethod}
                      onChange={(e) => setJarReturnForm({ ...jarReturnForm, refundMethod: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <option value="bKash">bKash Personal Wallet</option>
                      <option value="Nagad">Nagad Personal Wallet</option>
                      <option value="Credit">Deduct from next water order</option>
                      <option value="Cash">Cash Handover at Doorstep</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Mobile Wallet Number
                    </label>
                    <input
                      type="text"
                      value={jarReturnForm.accountNumber}
                      onChange={(e) => setJarReturnForm({ ...jarReturnForm, accountNumber: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs"
                    >
                      Confirm Pickup & ৳{jarReturnForm.jarsCount * 200} Refund
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowJarReturnModal(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
