import React, { useState } from "react";
import {
  RefreshCw,
  Search,
  Filter,
  Play,
  Pause,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Users,
  Plus,
} from "lucide-react";

const INITIAL_SUBSCRIPTIONS = [
  {
    id: "SUB-8910",
    customerName: "Engr. Tanvir Ahmed",
    phone: "+880 1711-223344",
    planType: "RESIDENTIAL",
    planName: "Family Daily 20L Hydration",
    schedule: "Daily (08:00 - 11:00 AM)",
    quantityPerDelivery: "2 Jars (20L)",
    neighborhood: "Banani",
    status: "ACTIVE",
    nextOccurrence: "Tomorrow, Nov 05, 08:30 AM",
    totalOccurrencesDelivered: 46,
    monthlyBillingBDT: 4800,
  },
  {
    id: "SUB-8911",
    customerName: "Grameen Telecom HQ",
    phone: "+880 1713-456789",
    planType: "COMMERCIAL",
    planName: "Corporate Floor Hydration",
    schedule: "Every Weekday (Sun - Thu)",
    quantityPerDelivery: "15 Jars (20L)",
    neighborhood: "Gulshan-1",
    status: "ACTIVE",
    nextOccurrence: "Tomorrow, Nov 05, 09:00 AM",
    totalOccurrencesDelivered: 120,
    monthlyBillingBDT: 26400,
  },
  {
    id: "SUB-8912",
    customerName: "Bistro 99 Cafe & Grill",
    phone: "+880 1819-234567",
    planType: "COMMERCIAL",
    planName: "Restaurant Filtered Supply",
    schedule: "Alternate Days",
    quantityPerDelivery: "6 Jars (20L)",
    neighborhood: "Dhanmondi",
    status: "PAUSED",
    nextOccurrence: "Paused by Customer",
    totalOccurrencesDelivered: 28,
    monthlyBillingBDT: 7200,
  },
  {
    id: "SUB-8913",
    customerName: "Mrs. Shahnaz Begum",
    phone: "+880 1912-887766",
    planType: "RESIDENTIAL",
    planName: "Weekly 20L Reusable Jar Plan",
    schedule: "Every Sunday & Wednesday",
    quantityPerDelivery: "2 Jars (20L)",
    neighborhood: "Uttara",
    status: "ACTIVE",
    nextOccurrence: "Wednesday, Nov 06, 02:00 PM",
    totalOccurrencesDelivered: 14,
    monthlyBillingBDT: 1600,
  },
];

export function SubscriptionsAdmin() {
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const toggleStatus = (id) => {
    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              status: s.status === "ACTIVE" ? "PAUSED" : "ACTIVE",
              nextOccurrence: s.status === "ACTIVE" ? "Paused by Admin" : "Next scheduled window",
            }
          : s
      )
    );
  };

  const filtered = subscriptions.filter((s) => {
    const matchesSearch =
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.includes(searchTerm) ||
      s.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || s.planType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-sky-400" />
            <span>Recurring Subscriptions & Occurrence Generator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Background workers generate daily recurring orders in Asia/Dhaka timezone with idempotency and slot capacity guards.
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Subscriptions</div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">
            {subscriptions.filter((s) => s.status === "ACTIVE").length}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Tomorrow's Occurrences</div>
          <div className="text-xl font-black text-sky-400 mt-0.5">2 Orders Due</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Monthly Recurring Run Rate</div>
          <div className="text-xl font-black text-white mt-0.5">
            ৳{subscriptions.reduce((sum, s) => sum + s.monthlyBillingBDT, 0).toLocaleString()}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Background Worker</div>
          <div className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Idempotent Active</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search subscriber, phone, area..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "ALL" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            All Plans
          </button>
          <button
            type="button"
            onClick={() => setFilterType("RESIDENTIAL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "RESIDENTIAL" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => setFilterType("COMMERCIAL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "COMMERCIAL" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            Commercial B2B
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Subscriber & Plan</th>
                <th className="px-4 py-3.5">Type & Area</th>
                <th className="px-4 py-3.5">Schedule & Volume</th>
                <th className="px-4 py-3.5">Next Occurrence</th>
                <th className="px-4 py-3.5">Monthly Est.</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-white text-sm">{s.customerName}</div>
                    <div className="text-[11px] text-sky-400 mt-0.5">{s.planName}</div>
                    <div className="text-[10px] font-mono text-slate-500">{s.id} • {s.phone}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.planType === "COMMERCIAL"
                          ? "bg-purple-950/80 text-purple-300 border border-purple-800"
                          : "bg-sky-950/80 text-sky-300 border border-sky-800"
                      }`}
                    >
                      {s.planType}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">{s.neighborhood}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-200">{s.schedule}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{s.quantityPerDelivery}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-sky-300 text-[11px]">{s.nextOccurrence}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{s.totalOccurrencesDelivered} runs completed</div>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-emerald-400">
                    ৳{s.monthlyBillingBDT.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === "ACTIVE"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                          : "bg-amber-950/80 text-amber-400 border border-amber-800"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleStatus(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 ${
                        s.status === "ACTIVE"
                          ? "bg-amber-950/80 text-amber-300 hover:bg-amber-900 border border-amber-800"
                          : "bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 border border-emerald-800"
                      }`}
                    >
                      {s.status === "ACTIVE" ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{s.status === "ACTIVE" ? "Pause" : "Resume"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsAdmin;
