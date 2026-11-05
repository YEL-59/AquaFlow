import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Modern dark palette
export const CHART_COLORS = {
  sky: "#0284c7",
  cyan: "#06b6d4",
  emerald: "#10b981",
  indigo: "#6366f1",
  purple: "#a855f7",
  amber: "#f59e0b",
  rose: "#f43f5e",
  slate: "#475569",
};

// 1. Revenue & Inflow Trend Area Chart
export function RevenueTrendChart({ data, height = 300 }) {
  const sampleData = data || [
    { date: "Oct 29", revenue: 28400, cash: 19200, online: 9200 },
    { date: "Oct 30", revenue: 32600, cash: 22100, online: 10500 },
    { date: "Oct 31", revenue: 35100, cash: 24000, online: 11100 },
    { date: "Nov 01", revenue: 41200, cash: 27500, online: 13700 },
    { date: "Nov 02", revenue: 38900, cash: 26000, online: 12900 },
    { date: "Nov 03", revenue: 44500, cash: 31000, online: 13500 },
    { date: "Nov 04", revenue: 48200, cash: 33500, online: 14700 },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.sky} stopOpacity={0.4} />
              <stop offset="95%" stopColor={CHART_COLORS.sky} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.emerald} stopOpacity={0.4} />
              <stop offset="95%" stopColor={CHART_COLORS.emerald} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} tickFormatter={(val) => `৳${val / 1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff", fontSize: "12px" }}
            formatter={(val) => [`৳${val.toLocaleString()}`, undefined]}
          />
          <Area type="monotone" dataKey="revenue" name="Gross Sales" stroke={CHART_COLORS.sky} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="cash" name="COD Cash Handover" stroke={CHART_COLORS.emerald} strokeWidth={2} fillOpacity={1} fill="url(#colorCash)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 2. Hub Inventory Comparison Bar Chart
export function HubInventoryBarChart({ data, height = 280 }) {
  const sampleData = data || [
    { hub: "Banani Hub", fullJars: 520, emptyJars: 120, damagedJars: 8 },
    { hub: "Gulshan Hub", fullJars: 420, emptyJars: 85, damagedJars: 5 },
    { hub: "Dhanmondi", fullJars: 310, emptyJars: 60, damagedJars: 8 },
    { hub: "Uttara Hub", fullJars: 480, emptyJars: 92, damagedJars: 15 },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="hub" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff", fontSize: "12px" }}
            formatter={(val) => [`${val} Jars`, undefined]}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
          <Bar dataKey="fullJars" name="Full Jars (Ready)" fill={CHART_COLORS.sky} radius={[6, 6, 0, 0]} />
          <Bar dataKey="emptyJars" name="Empty Jars (Washing)" fill={CHART_COLORS.cyan} radius={[6, 6, 0, 0]} />
          <Bar dataKey="damagedJars" name="Damaged (Quarantine)" fill={CHART_COLORS.rose} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// 3. Neighborhood Revenue Share Donut Chart
export function NeighborhoodPieChart({ height = 260 }) {
  const data = [
    { name: "Gulshan 1 & 2", value: 142500, color: CHART_COLORS.sky },
    { name: "Banani & DOHS", value: 118200, color: CHART_COLORS.cyan },
    { name: "Dhanmondi", value: 85600, color: CHART_COLORS.indigo },
    { name: "Uttara Sectors", value: 58900, color: CHART_COLORS.purple },
    { name: "Baridhara", value: 24800, color: CHART_COLORS.emerald },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff", fontSize: "12px" }}
            formatter={(val) => [`৳${val.toLocaleString()}`, "Revenue"]}
          />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// 4. Hourly Delivery Volume & SLA On-Time Chart
export function HourlyDeliveryCurve({ height = 240 }) {
  const data = [
    { hour: "8 AM", scheduled: 18, delivered: 18, onTimePct: 100 },
    { hour: "9 AM", scheduled: 28, delivered: 27, onTimePct: 96 },
    { hour: "10 AM", scheduled: 34, delivered: 33, onTimePct: 97 },
    { hour: "11 AM", scheduled: 24, delivered: 24, onTimePct: 100 },
    { hour: "12 PM", scheduled: 16, delivered: 15, onTimePct: 94 },
    { hour: "1 PM", scheduled: 12, delivered: 12, onTimePct: 100 },
    { hour: "2 PM", scheduled: 20, delivered: 19, onTimePct: 95 },
    { hour: "3 PM", scheduled: 26, delivered: 26, onTimePct: 100 },
    { hour: "4 PM", scheduled: 32, delivered: 31, onTimePct: 97 },
    { hour: "5 PM", scheduled: 22, delivered: 22, onTimePct: 100 },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="hour" stroke="#64748b" fontSize={11} tickLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff", fontSize: "12px" }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "5px" }} />
          <Line type="monotone" dataKey="scheduled" name="Scheduled Deliveries" stroke="#64748b" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
          <Line type="monotone" dataKey="delivered" name="Actual Completed" stroke={CHART_COLORS.emerald} strokeWidth={2.5} dot={{ r: 3, fill: CHART_COLORS.emerald }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// 5. Customer Daily Hydration Intake Chart
export function CustomerHydrationChart({ height = 220 }) {
  const data = [
    { day: "Day 1", liters: 6 },
    { day: "Day 3", liters: 8 },
    { day: "Day 6", liters: 10 },
    { day: "Day 9", liters: 8 },
    { day: "Day 12", liters: 12 },
    { day: "Day 15", liters: 8 },
    { day: "Day 18", liters: 10 },
    { day: "Day 21", liters: 14 },
    { day: "Day 24", liters: 8 },
    { day: "Day 27", liters: 10 },
    { day: "Day 30", liters: 12 },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
          <defs>
            <linearGradient id="colorHydration" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.cyan} stopOpacity={0.5} />
              <stop offset="95%" stopColor={CHART_COLORS.cyan} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" darkStroke="#1e293b" vertical={false} />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} tickFormatter={(v) => `${v}L`} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "0.75rem", color: "#fff", fontSize: "11px" }}
            formatter={(val) => [`${val} Liters`, "Intake"]}
          />
          <Area type="monotone" dataKey="liters" name="Water Consumed" stroke={CHART_COLORS.cyan} strokeWidth={2.5} fillOpacity={1} fill="url(#colorHydration)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// 6. Payment Collection Methods Donut Chart
export function PaymentMethodsDonutChart({ height = 240 }) {
  const data = [
    { name: "Cash on Delivery (COD)", value: 68, color: CHART_COLORS.emerald },
    { name: "bKash Merchant Pay", value: 24, color: "#d946ef" },
    { name: "Corporate Bank Invoicing", value: 8, color: CHART_COLORS.sky },
  ];

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "1rem", color: "#fff", fontSize: "12px" }}
            formatter={(val) => [`${val}%`, "Share"]}
          />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
