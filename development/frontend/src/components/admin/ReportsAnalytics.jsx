import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Download,
  Filter,
  DollarSign,
  Package,
  RotateCcw,
  Truck,
  Building2,
  CheckCircle2,
  Clock,
  PieChart as PieIcon,
} from "lucide-react";
import { NeighborhoodPieChart, HourlyDeliveryCurve, RevenueTrendChart } from "../charts/BusinessCharts";

export function ReportsAnalytics() {
  const [dateRange, setDateRange] = useState("THIS_MONTH");

  const NEIGHBORHOOD_SALES = [
    { area: "Gulshan (1 & 2)", orders: 482, revenueBDT: 142500, share: "34%" },
    { area: "Banani & DOHS", orders: 395, revenueBDT: 118200, share: "28%" },
    { area: "Dhanmondi", orders: 284, revenueBDT: 85600, share: "20%" },
    { area: "Uttara", orders: 196, revenueBDT: 58900, share: "14%" },
    { area: "Baridhara", orders: 74, revenueBDT: 24800, share: "6%" },
  ];

  const PRODUCT_PERFORMANCE = [
    { product: "AquaFlow 20L Reusable Jar", unitsSold: 4120, revenueBDT: 329600, margin: "64%" },
    { product: "500ml Bottled Box (24x)", unitsSold: 380, revenueBDT: 114000, margin: "38%" },
    { product: "5-Gallon Manual Hand Pump", unitsSold: 94, revenueBDT: 32900, margin: "45%" },
    { product: "Hot & Cold Tabletop Dispenser", unitsSold: 18, revenueBDT: 81000, margin: "32%" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-sky-400" />
            <span>Business Performance Reports & Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Auditable sales summaries, neighborhood revenue breakdown, jar circulation health, and estimated gross margin.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none"
          >
            <option value="TODAY">Today (Nov 04)</option>
            <option value="THIS_WEEK">This Week</option>
            <option value="THIS_MONTH">This Month (November 2026)</option>
            <option value="LAST_MONTH">Last Month</option>
          </select>

          <button
            type="button"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Gross Monthly Revenue</div>
          <div className="text-2xl font-black text-white mt-1">৳429,900</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-0.5">+18.4% vs last month</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Order Completion Rate</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">98.2%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">1,431 delivered / 1,457 placed</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Jar Recovery Rate</div>
          <div className="text-2xl font-black text-cyan-400 mt-1">94.8%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Eligible empties retrieved</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Estimated Gross Profit</div>
          <div className="text-2xl font-black text-sky-400 mt-1">৳248,500</div>
          <div className="text-[11px] text-slate-400 mt-0.5">~57.8% blended margin</div>
        </div>
      </div>

      {/* Dispatch Hourly Velocity Curve Chart */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Hourly Fleet Delivery Pace vs Scheduled Route Volume</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live hourly progression across 18 delivery vans in Dhaka Metro (8:00 AM – 5:00 PM)
            </p>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
            97.8% On-Time SLA
          </span>
        </div>

        <HourlyDeliveryCurve height={240} />
      </div>

      {/* 2 Columns: Neighborhood Breakdown (List + Pie Chart) & Product Margins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Neighborhood Revenue Breakdown & Pie Chart */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Sales Share by Dhaka Neighborhood</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">৳429.9k Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Visual Donut Chart */}
            <div className="h-64 flex items-center justify-center">
              <NeighborhoodPieChart height={240} />
            </div>

            {/* List */}
            <div className="space-y-3">
              {NEIGHBORHOOD_SALES.map((item) => (
                <div key={item.area} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-200">{item.area}</span>
                    <span className="font-bold text-white">
                      ৳{item.revenueBDT.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400"
                      style={{ width: item.share }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Sales & Margins */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Top Performing Products & Unit Margins</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                <tr>
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Units Sold</th>
                  <th className="pb-2">Revenue</th>
                  <th className="pb-2">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {PRODUCT_PERFORMANCE.map((p) => (
                  <tr key={p.product}>
                    <td className="py-3 font-bold text-white max-w-[150px] truncate">{p.product}</td>
                    <td className="py-3 text-slate-300 font-semibold">{p.unitsSold.toLocaleString()}</td>
                    <td className="py-3 text-emerald-400 font-bold">৳{p.revenueBDT.toLocaleString()}</td>
                    <td className="py-3 font-bold text-sky-400">{p.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Primary Revenue Driver: 20L Reusable Jar Subscriptions</span>
            <span className="font-bold text-emerald-400">76.6% Volume</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
