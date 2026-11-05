import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Truck,
  Phone,
  MapPin,
  CheckCircle2,
  Clock,
  RotateCcw,
  Banknote,
  Navigation,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Plus,
  Minus,
  Check,
  ArrowLeft,
  Calendar,
  XCircle,
  DollarSign,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { HourlyDeliveryCurve } from "../../components/charts/BusinessCharts";
import { DhakaDeliveryMap } from "../../components/maps/DhakaDeliveryMap";

const INITIAL_STOPS = [
  {
    id: "STOP-01",
    orderId: "ORD-20261104-7821",
    customerName: "Engr. Tanvir Ahmed",
    phone: "01711223344",
    address: "House 14, Road 11, Block D, Banani",
    floorNote: "4th Floor (Lift available)",
    slot: "09:00 - 13:00",
    fullJarsToDeliver: 3,
    expectedEmptyJars: 2,
    actualEmptyJars: 2,
    codAmount: 0,
    isPrepaid: true,
    paymentMethod: "BKASH",
    status: "PENDING",
  },
  {
    id: "STOP-02",
    orderId: "ORD-20261104-5104",
    customerName: "Grameen Telecom Office",
    phone: "01713456789",
    address: "Gulshan-1 Circle, Level 6",
    floorNote: "Service elevator behind lobby",
    slot: "09:00 - 13:00",
    fullJarsToDeliver: 10,
    expectedEmptyJars: 10,
    actualEmptyJars: 10,
    codAmount: 800,
    status: "PENDING",
  },
  {
    id: "STOP-03",
    orderId: "ORD-20261104-8932",
    customerName: "Mrs. Shahnaz Begum",
    phone: "01819234567",
    address: "Road 79, House 12, Gulshan-2",
    floorNote: "2nd Floor (Stairs only)",
    slot: "14:00 - 18:00",
    fullJarsToDeliver: 2,
    expectedEmptyJars: 1,
    actualEmptyJars: 1,
    codAmount: 210,
    status: "PENDING",
  },
];

export function DeliveryDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const [stops, setStops] = useState(INITIAL_STOPS);
  const [activeStopId, setActiveStopId] = useState(params.id || INITIAL_STOPS[0].id);
  const [reconciled, setReconciled] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(false);

  const [vanStock, setVanStock] = useState({
    fullJarsLoaded: 40,
    fullJarsRemaining: 25,
    emptyJarsCollected: 15,
    cashCollectedBDT: 4850,
  });

  // Detect active view from path
  const getView = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes("/cash-reconciliation")) return "RECONCILIATION";
    if (path.includes("/delivery/") || params.id) return "DETAIL";
    if (path.includes("/my-deliveries")) return "MY_DELIVERIES";
    return "DASHBOARD";
  };

  const activeView = getView();

  useEffect(() => {
    if (params.id) {
      setActiveStopId(params.id);
    }
  }, [params.id]);

  const activeStop = stops.find((s) => s.id === activeStopId) || stops[0];

  const handleUpdateEmptyCount = (delta) => {
    setStops((prev) =>
      prev.map((s) =>
        s.id === activeStopId
          ? {
              ...s,
              actualEmptyJars: Math.max(0, s.actualEmptyJars + delta),
            }
          : s
      )
    );
  };

  const handleCompleteDelivery = (stopId) => {
    const target = stops.find((s) => s.id === stopId);
    if (!target) return;

    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, status: "DELIVERED" } : s))
    );

    // Update van shift balances
    setVanStock((prev) => ({
      ...prev,
      fullJarsRemaining: Math.max(0, prev.fullJarsRemaining - target.fullJarsToDeliver),
      emptyJarsCollected: prev.emptyJarsCollected + target.actualEmptyJars,
      cashCollectedBDT: prev.cashCollectedBDT + target.codAmount,
    }));

    // If on detail view, navigate back to list or dashboard
    navigate("/delivery/my-deliveries");
  };

  const handleFailDelivery = (stopId) => {
    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, status: "FAILED" } : s))
    );
    navigate("/delivery/my-deliveries");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-3 sm:px-6 font-sans">
      <div className="w-full space-y-5">
        {/* Rider Shift & Van Header */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-cyan-950 border border-sky-800/60 shadow-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-lg shadow-sky-500/25">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                Dhaka Delivery Hero
              </div>
              <div className="text-sm font-extrabold text-white">Md. Rafiqul Islam</div>
              <div className="text-[10px] text-slate-400">Van #DH-11-8901 • Banani Central Hub</div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              On Duty
            </span>
          </div>
        </div>

        {/* 4 Tabs Matching PRD: /dashboard, /my-deliveries, /delivery/:id, /cash-reconciliation */}
        <div className="grid grid-cols-3 gap-2 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => navigate("/delivery/dashboard")}
            className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition ${
              activeView === "DASHBOARD"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => navigate("/delivery/my-deliveries")}
            className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition ${
              activeView === "MY_DELIVERIES" || activeView === "DETAIL"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            My Stops ({stops.filter((s) => s.status === "PENDING").length})
          </button>
          <button
            type="button"
            onClick={() => navigate("/delivery/cash-reconciliation")}
            className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition ${
              activeView === "RECONCILIATION"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            Reconciliation
          </button>
        </div>

        {/* Live Van Jar & Cash Strip */}
        <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Full In Van</div>
            <div className="text-lg font-black text-sky-400 mt-0.5">{vanStock.fullJarsRemaining}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Empty Jars</div>
            <div className="text-lg font-black text-cyan-400 mt-0.5">{vanStock.emptyJarsCollected}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Cash Collected</div>
            <div className="text-sm font-black text-emerald-400 mt-1">৳{vanStock.cashCollectedBDT}</div>
          </div>
        </div>

        {/* VIEW 1: /delivery or /delivery/dashboard */}
        {activeView === "DASHBOARD" && (
          <div className="space-y-4">
            {/* Current Active Delivery Highlight */}
            {activeStop && activeStop.status === "PENDING" ? (
              <div className="p-5 rounded-3xl bg-slate-900 border-2 border-sky-500 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black">
                    NEXT UP: STOP #{activeStop.id.split("-")[1]}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeStop.slot}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-white">{activeStop.customerName}</h3>
                  <p className="text-xs text-sky-300 font-medium mt-1 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span>{activeStop.address}</span>
                  </p>
                  <div className="mt-2 px-3 py-1 rounded-lg bg-slate-950 text-amber-300 text-[11px] font-medium border border-slate-800">
                    🏢 {activeStop.floorNote}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">To Deliver</span>
                    <span className="font-bold text-white">{activeStop.fullJarsToDeliver} Full Jars</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${
                    activeStop.isPrepaid
                      ? "bg-pink-950/40 border-pink-800/60"
                      : "bg-slate-950 border-slate-800"
                  }`}>
                    <span className="text-slate-400 text-[10px] block">
                      {activeStop.isPrepaid ? "Payment Status" : "To Collect (COD)"}
                    </span>
                    <span className={`font-bold ${
                      activeStop.isPrepaid ? "text-pink-400" : "text-emerald-400"
                    }`}>
                      {activeStop.isPrepaid
                        ? `PAID (${activeStop.paymentMethod || "Online"})`
                        : `৳${activeStop.codAmount}`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowRouteMap(!showRouteMap)}
                    className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{showRouteMap ? "Hide GPS Map" : "View Live Route Map"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/delivery/delivery/${activeStop.id}`)}
                    className="flex-1 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>Execute Delivery Stop</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Turn-by-Turn Live GPS Map */}
                {showRouteMap && (
                  <div className="pt-2 animate-in fade-in">
                    <DhakaDeliveryMap
                      orderNumber={activeStop.orderId}
                      driverName="Md. Rafiqul Islam (Van 01)"
                      driverPhone="01811223344"
                      deliveryAddress={activeStop.address}
                      height="280px"
                      interactive={true}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">All Route Deliveries Completed!</h4>
                <p className="text-xs text-slate-400">Proceed to cash reconciliation at Banani Hub.</p>
                <button
                  type="button"
                  onClick={() => navigate("/delivery/cash-reconciliation")}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  Submit Cash Reconciliation
                </button>
              </div>
            )}

            {/* Rider Performance & Hourly Pace Chart */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Today's Route Velocity (Scheduled vs Completed)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Live hourly stops completion pace in Gulshan-Banani sector
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  98% On-Time
                </span>
              </div>

              <HourlyDeliveryCurve height={200} />
            </div>

            {/* Daily Incentive & Streak Earnings */}
            <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 shadow-xl flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                  Shift Incentive Bonus
                </div>
                <div className="text-xl font-black text-white">
                  ৳350 Earned Today <span className="text-xs text-slate-400 font-normal">(Target: ৳500)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Complete remaining 1 stop with zero empty jar damage to unlock bonus tier.
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">70%</div>
                <span className="text-[10px] text-slate-500 font-bold">Goal Progress</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: /delivery/my-deliveries */}
        {activeView === "MY_DELIVERIES" && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Assigned Route Deliveries ({stops.length})
            </h3>
            {stops.map((stop) => (
              <div
                key={stop.id}
                className={`p-4 rounded-2xl border transition ${
                  stop.status === "DELIVERED"
                    ? "bg-slate-950/60 border-slate-800 opacity-70"
                    : stop.status === "FAILED"
                    ? "bg-red-950/20 border-red-900/60"
                    : "bg-slate-900 border-slate-800 hover:border-sky-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-sky-400">{stop.id}</span>
                    <span className="text-xs text-slate-400">• {stop.slot}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stop.status === "DELIVERED"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : stop.status === "FAILED"
                        ? "bg-red-950 text-red-400 border border-red-800"
                        : "bg-amber-950 text-amber-400 border border-amber-800"
                    }`}
                  >
                    {stop.status}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-sm font-bold text-white">{stop.customerName}</div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{stop.address}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">
                    Deliver: <strong className="text-white">{stop.fullJarsToDeliver} jars</strong> | COD:{" "}
                    <strong className="text-emerald-400">৳{stop.codAmount}</strong>
                  </span>
                  {stop.status === "PENDING" && (
                    <button
                      type="button"
                      onClick={() => navigate(`/delivery/delivery/${stop.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                    >
                      Open Stop
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: /delivery/delivery/:id */}
        {activeView === "DETAIL" && activeStop && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => navigate("/delivery/my-deliveries")}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Route List</span>
            </button>

            <div className="p-5 rounded-3xl bg-slate-900 border-2 border-sky-500 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black">
                  STOP {activeStop.id}
                </span>
                <span className="text-xs text-slate-400">{activeStop.slot}</span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white">{activeStop.customerName}</h3>
                <p className="text-xs text-sky-300 font-medium mt-1 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                  <span>{activeStop.address}</span>
                </p>
                <div className="mt-2 px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 text-xs font-medium border border-slate-800">
                  🏢 {activeStop.floorNote}
                </div>
              </div>

              {/* Direct Actions: Call & Google Maps */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${activeStop.phone}`}
                  className="py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call ({activeStop.phone})</span>
                </a>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeStop.address + ", Dhaka")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-sky-400" />
                  <span>Google Map</span>
                </a>
              </div>

              {/* Live Turn-by-Turn GPS Map Navigation */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-sky-400" />
                    <span>Live GPS Route Navigation</span>
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">ETA: ~12 Mins</span>
                </div>
                <DhakaDeliveryMap
                  orderNumber={activeStop.orderId}
                  driverName="Md. Rafiqul Islam (Van 01)"
                  driverPhone="01811223344"
                  deliveryAddress={activeStop.address}
                  height="260px"
                  interactive={true}
                />
              </div>

              {/* Jar Accounting Counter for this Stop */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Full Jars to Unload:</span>
                  <span className="font-bold text-white text-sm">{activeStop.fullJarsToDeliver} Jars</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Cash to Collect (COD):</span>
                  <span className="font-bold text-emerald-400 text-base">৳{activeStop.codAmount}</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Empty Jars Collected</span>
                    <span className="text-[10px] text-slate-400">Handed by customer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdateEmptyCount(-1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-bold text-cyan-400 text-base">
                      {activeStop.actualEmptyJars}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateEmptyCount(1)}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Complete or Fail Actions */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleCompleteDelivery(activeStop.id)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm Delivery & Collected ৳{activeStop.codAmount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleFailDelivery(activeStop.id)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-300 font-bold text-xs transition"
                >
                  Customer Unavailable / Delivery Failed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: /delivery/cash-reconciliation */}
        {activeView === "RECONCILIATION" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span>Shift End Cash Reconciliation</span>
              </h3>
              <p className="text-xs text-slate-400">
                Submit collected Cash on Delivery and returned empty jars to Banani Hub supervisor.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Cash Collected</span>
                    <span className="text-lg font-black text-emerald-400">৳{vanStock.cashCollectedBDT}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                    Matches Recorded Stops
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Empty Jars in Van</span>
                    <span className="text-lg font-black text-cyan-400">{vanStock.emptyJarsCollected} Jars</span>
                  </div>
                  <span className="text-xs text-slate-400">Return to Washing Bay</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Full Jars Remaining</span>
                    <span className="text-lg font-black text-sky-400">{vanStock.fullJarsRemaining} Jars</span>
                  </div>
                  <span className="text-xs text-slate-400">Return to Storage Bay</span>
                </div>
              </div>

              {reconciled ? (
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-emerald-200">Reconciliation Approved</div>
                  <div className="text-[11px] text-emerald-400">
                    Handover verified by Supervisor Kamrul Hassan. Shift closed cleanly.
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setReconciled(true)}
                  className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
                >
                  Submit Handover to Hub Supervisor
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryDashboard;
