import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  RotateCcw,
  TrendingUp,
  DollarSign,
  Building2,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { RevenueTrendChart, HubInventoryBarChart } from "../charts/BusinessCharts";

export function DashboardOverview({ onNavigate, currentRole }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-slate-950 border border-sky-900/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/40 text-sky-400 border border-sky-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Dhaka Metro Live Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome to AquaFlow Command Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Manage daily pure water bottle replenishment, real-time rider dispatch across Dhaka neighborhoods, container deposit reconciliation, and dynamic website copy.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate("PRODUCTS")}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products</span>
          </button>
          <button
            onClick={() => onNavigate("CONTENT")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Edit Website Content</span>
          </button>
          <button
            onClick={() => onNavigate("DISPATCH")}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Truck className="w-4 h-4" />
            <span>Live Dispatch</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Total Orders</span>
            <Package className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white mt-2">148 Orders</div>
          <div className="text-xs text-emerald-400 flex items-center gap-1 mt-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% vs yesterday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Water Inflow</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            {formatBDT(42650, "en")}
          </div>
          <div className="text-xs text-slate-400 mt-1">92% Cash on Delivery (COD)</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>20L Jars in Circulation</span>
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-2">1,840 Jars</div>
          <div className="text-xs text-cyan-300/80 mt-1">৳ 368,000 Deposit Liability</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Active Micro-Hubs</span>
            <Building2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 mt-2">3 Hubs</div>
          <div className="text-xs text-purple-400/80 mt-1">89% Inventory Health</div>
        </div>
      </div>

      {/* Interactive Visual Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Revenue & COD Collection Trend */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-400" />
                <span>7-Day Gross Sales & COD Collection</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparison between total orders invoiced and cash physically collected by delivery heroes
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              Live Feed
            </span>
          </div>

          <RevenueTrendChart height={270} />

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">7-Day Gross</span>
              <span className="text-xs font-black text-sky-400">৳269,000</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">Cash Handover</span>
              <span className="text-xs font-black text-emerald-400">৳183,300</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">Gateway & bKash</span>
              <span className="text-xs font-black text-cyan-400">৳85,700</span>
            </div>
          </div>
        </div>

        {/* Graph 2: Hub Inventory Balances Bar Chart */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Dhaka Micro-Hubs Real-Time Stock</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Ready full jars available for dispatch vs empty jars in washing vs quarantined
              </p>
            </div>
            <button
              onClick={() => onNavigate("INVENTORY")}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <HubInventoryBarChart height={270} />

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700/60 text-center">
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">Full Ready Jars</span>
              <span className="text-xs font-black text-sky-400">1,730 Jars</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">Empty Washing</span>
              <span className="text-xs font-black text-cyan-400">357 Jars</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80">
              <span className="text-[10px] text-slate-400 block">Quarantined</span>
              <span className="text-xs font-black text-rose-400">36 Jars</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Operations + Fast Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dhaka Micro-Hub Live Status */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Dhaka Micro-Hubs Stock Health</span>
            </h3>
            <button
              onClick={() => onNavigate("INVENTORY")}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">Gulshan-Banani Central Hub</div>
                <div className="text-xs text-slate-400 mt-0.5">Capacity: 1,200 Jars (42% Full)</div>
              </div>
              <div className="text-right">
                <div className="text-sky-400 font-extrabold text-sm">420 Full / 85 Empty</div>
                <span className="text-[10px] font-bold text-emerald-400">● Operational</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">Dhanmondi Micro-Hub</div>
                <div className="text-xs text-slate-400 mt-0.5">Capacity: 900 Jars (41% Full)</div>
              </div>
              <div className="text-right">
                <div className="text-sky-400 font-extrabold text-sm">310 Full / 60 Empty</div>
                <span className="text-[10px] font-bold text-emerald-400">● Operational</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">Uttara Sector 7 Depot</div>
                <div className="text-xs text-slate-400 mt-0.5">Capacity: 1,000 Jars (57% Full)</div>
              </div>
              <div className="text-right">
                <div className="text-sky-400 font-extrabold text-sm">480 Full / 92 Empty</div>
                <span className="text-[10px] font-bold text-emerald-400">● Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick System Navigation shortcuts */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Fast Navigation by Domain</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate("PRODUCTS")}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-800/80 transition text-left group"
            >
              <Package className="w-5 h-5 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white text-xs">Products & Pricing</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Edit prices, deposits, stock</div>
            </button>

            <button
              onClick={() => onNavigate("CONTENT")}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-800/80 transition text-left group"
            >
              <FileText className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white text-xs">Website CMS Copy</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Hero, banners, hotline phone</div>
            </button>

            <button
              onClick={() => onNavigate("DISPATCH")}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-800/80 transition text-left group"
            >
              <Truck className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white text-xs">Orders & Dispatch</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Assign riders, empty jars</div>
            </button>

            <button
              onClick={() => onNavigate("ROLES")}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500 hover:bg-slate-800/80 transition text-left group"
            >
              <Users className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-white text-xs">Roles & Permissions</div>
              <div className="text-[11px] text-slate-400 mt-0.5">RBAC 6 role definitions</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
