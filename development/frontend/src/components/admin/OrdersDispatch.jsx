import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Package,
  Truck,
  RotateCcw,
  TrendingUp,
  Building2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  LayoutList,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { Button } from "../ui/button";
import { DhakaFleetOverviewMap } from "../maps/DhakaFleetOverviewMap";

const INITIAL_DISPATCH_ORDERS = [
  {
    id: "ORD-20261104-7821",
    customerName: "Engr. Tanvir Ahmed",
    customerPhone: "01711223344",
    zone: "Gulshan-Banani",
    address: "House 14, Road 11, Block D, Banani",
    floor: "4th Floor (Lift)",
    itemsCount: 3,
    totalBDT: 290,
    emptyJarsExpected: 2,
    status: "CONFIRMED",
    paymentMethod: "BKASH",
    paymentStatus: "PAID",
    trxID: "BKSH8X42K9",
    assignedRider: null,
    deliverySlot: "Morning (9am-1pm)",
  },
  {
    id: "ORD-20261104-6291",
    customerName: "Dr. Farhana Yasmin",
    customerPhone: "01819876543",
    zone: "Dhanmondi",
    address: "Apartment 5B, Road 27 (Old), Dhanmondi",
    floor: "5th Floor (Lift)",
    itemsCount: 2,
    totalBDT: 210,
    emptyJarsExpected: 1,
    status: "CONFIRMED",
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    assignedRider: null,
    deliverySlot: "Morning (9am-1pm)",
  },
  {
    id: "ORD-20261104-5104",
    customerName: "Grameen Telecom Office",
    customerPhone: "01713456789",
    zone: "Gulshan-Banani",
    address: "Gulshan-1 Circle, Level 6",
    floor: "6th Floor",
    itemsCount: 10,
    totalBDT: 800,
    emptyJarsExpected: 10,
    status: "OUT_FOR_DELIVERY",
    paymentMethod: "SSLCOMMERZ",
    paymentStatus: "PAID",
    trxID: "BNK-CITY-7721",
    assignedRider: "Md. Rafiqul Islam (Van 01)",
    deliverySlot: "Morning (9am-1pm)",
  },
  {
    id: "ORD-20261104-3319",
    customerName: "Nazmul Huda",
    customerPhone: "01911445566",
    zone: "Uttara",
    address: "Sector 7, Road 13, House 22",
    floor: "2nd Floor (Stairs)",
    itemsCount: 1,
    totalBDT: 280,
    emptyJarsExpected: 0,
    status: "CONFIRMED",
    assignedRider: null,
    deliverySlot: "Afternoon (2pm-6pm)",
  },
];

const RIDERS = [
  { id: "rider-1", name: "Md. Rafiqul Islam (Gulshan-Banani Van 01)", zone: "Gulshan-Banani" },
  { id: "rider-2", name: "Kamrul Hasan (Dhanmondi Fleet 02)", zone: "Dhanmondi" },
  { id: "rider-3", name: "Sharif Ahmed (Uttara Hub Van 03)", zone: "Uttara" },
];

export function OrdersDispatch() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState(INITIAL_DISPATCH_ORDERS);
  const [selectedZoneFilter, setSelectedZoneFilter] = useState("ALL");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRiderMap, setSelectedRiderMap] = useState({});
  const [viewMode, setViewMode] = useState("TABLE"); // "TABLE" | "FLEET_MAP"

  const handleAssignRider = (orderId) => {
    const riderId = selectedRiderMap[orderId];
    if (!riderId) {
      alert("Please select a delivery hero from the dropdown first");
      return;
    }
    const rider = RIDERS.find((r) => r.id === riderId);

    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              assignedRider: rider.name,
              status: "OUT_FOR_DELIVERY",
            }
          : ord
      )
    );
  };

  const handleMarkDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: "DELIVERED",
            }
          : ord
      )
    );
  };

  const filteredOrders = orders.filter((ord) => {
    if (selectedZoneFilter !== "ALL" && ord.zone !== selectedZoneFilter) return false;
    if (selectedStatusFilter !== "ALL" && ord.status !== selectedStatusFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        ord.id.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerPhone.includes(q) ||
        ord.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Live Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Total Orders</span>
            <Package className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2">148 Orders</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% vs yesterday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Water Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2">
            {formatBDT(42650, "en")}
          </div>
          <div className="text-xs text-slate-400 mt-1">92% Cash on Delivery (COD)</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>20L Jars in Circulation</span>
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mt-2">1,840 Jars</div>
          <div className="text-xs text-cyan-300/80 mt-1">৳ 368,000 Deposit Liability</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Micro-Hub Stock Status</span>
            <Building2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 mt-2">89% Health</div>
          <div className="text-xs text-purple-400/80 mt-1">3 Micro-Hubs Stocked</div>
        </div>
      </div>

      {/* Hub Stock Status Bar */}
      <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700/50 shadow-md">
        <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-sky-400" />
          <span>Dhaka Micro-Hub Live Jar Inventory</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-slate-200">Gulshan-Banani Hub</div>
            <div className="text-sky-400 font-extrabold text-base mt-1">420 Full / 85 Empty</div>
            <div className="text-slate-500 mt-0.5">Capacity: 1,200 Jars (42% Full)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-slate-200">Dhanmondi Hub</div>
            <div className="text-sky-400 font-extrabold text-base mt-1">310 Full / 60 Empty</div>
            <div className="text-slate-500 mt-0.5">Capacity: 900 Jars (41% Full)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="font-bold text-slate-200">Uttara Sector 7 Hub</div>
            <div className="text-sky-400 font-extrabold text-base mt-1">480 Full / 92 Empty</div>
            <div className="text-slate-500 mt-0.5">Capacity: 1,000 Jars (57% Full)</div>
          </div>
        </div>
      </div>

      {/* Orders Dispatch & Assignment Table */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-sky-400" />
              <span>Active Delivery Dispatch Queue</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Assign neighborhood delivery staff, monitor empty jar reconciliation, and track COD.
            </p>
          </div>

          {/* View Mode Toggle & Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* View Mode Switcher */}
            <div className="flex p-0.5 rounded-xl bg-slate-900 border border-slate-700">
              <button
                type="button"
                onClick={() => setViewMode("TABLE")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "TABLE"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Queue Table</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("FLEET_MAP")}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "FLEET_MAP"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Dhaka Fleet GPS Map</span>
              </button>
            </div>

            {viewMode === "TABLE" && (
              <>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search customer, ID, phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                <select
                  value={selectedZoneFilter}
                  onChange={(e) => setSelectedZoneFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="ALL">All Dhaka Zones</option>
                  <option value="Gulshan-Banani">Gulshan-Banani</option>
                  <option value="Dhanmondi">Dhanmondi</option>
                  <option value="Uttara">Uttara</option>
                </select>

                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="CONFIRMED">Confirmed (Pending Dispatch)</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Content: Fleet Map or Dispatch Table */}
        {viewMode === "FLEET_MAP" ? (
          <div className="animate-in fade-in">
            <DhakaFleetOverviewMap />
          </div>
        ) : (
          /* Dispatch Table */
          <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Order ID & Slot</th>
                <th className="py-3 px-4">Customer & Location</th>
                <th className="py-3 px-4">Items / Jars</th>
                <th className="py-3 px-4">Amount & Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-sky-400">{ord.id}</div>
                    <div className="text-[11px] text-slate-400">{ord.deliverySlot}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{ord.customerName}</div>
                    <div className="text-slate-400">{ord.customerPhone}</div>
                    <div className="text-[11px] text-slate-400 max-w-xs truncate">{ord.address}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{ord.itemsCount} Items</div>
                    {ord.emptyJarsExpected > 0 && (
                      <div className="text-[11px] text-cyan-400 font-medium">
                        ♻ {ord.emptyJarsExpected} Empty Jars to Collect
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-emerald-400 text-sm">
                      {formatBDT(ord.totalBDT, "en")}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ord.paymentMethod === "BKASH"
                          ? "bg-pink-950/80 text-[#E2136E] border border-pink-800"
                          : ord.paymentMethod === "SSLCOMMERZ"
                          ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                          : "bg-slate-800 text-slate-300 border border-slate-700"
                      }`}>
                        {ord.paymentMethod === "BKASH" ? "bKash" : ord.paymentMethod === "SSLCOMMERZ" ? "Cards/MFS" : "COD"}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                        ord.paymentStatus === "PAID"
                          ? "bg-emerald-500 text-white"
                          : "bg-amber-500/20 text-amber-300 border border-amber-600/40"
                      }`}>
                        {ord.paymentStatus || "PENDING"}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {ord.status === "CONFIRMED" && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[11px] font-bold">
                        Pending Dispatch
                      </span>
                    )}
                    {ord.status === "OUT_FOR_DELIVERY" && (
                      <span className="px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800 text-[11px] font-bold">
                        Out for Delivery
                      </span>
                    )}
                    {ord.status === "DELIVERED" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[11px] font-bold">
                        Delivered
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    {ord.status === "CONFIRMED" && (
                      <div className="flex items-center gap-2">
                        <select
                          value={selectedRiderMap[ord.id] || ""}
                          onChange={(e) =>
                            setSelectedRiderMap({
                              ...selectedRiderMap,
                              [ord.id]: e.target.value,
                            })
                          }
                          className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                        >
                          <option value="">Select Rider...</option>
                          {RIDERS.filter((r) => r.zone === ord.zone || true).map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name}
                            </option>
                          ))}
                        </select>
                        <Button
                          size="sm"
                          onClick={() => handleAssignRider(ord.id)}
                          className="rounded-lg text-xs py-1 px-2.5 bg-sky-600 hover:bg-sky-500"
                        >
                          Dispatch
                        </Button>
                      </div>
                    )}

                    {ord.status === "OUT_FOR_DELIVERY" && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-300">{ord.assignedRider}</span>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleMarkDelivered(ord.id)}
                          className="rounded-lg text-xs py-1 px-2 bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                          Delivered
                        </Button>
                      </div>
                    )}

                    {ord.status === "DELIVERED" && (
                      <span className="text-emerald-400 text-xs font-semibold">✓ Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
}

export default OrdersDispatch;
