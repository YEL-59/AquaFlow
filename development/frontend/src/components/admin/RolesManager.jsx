import React from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Key,
  Shield,
  Layers,
} from "lucide-react";

export const USER_ROLES = [
  {
    id: "SUPER_ADMIN",
    title: "Super Admin / Owner",
    titleBn: "সুপার অ্যাডমিন / ওনার",
    color: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-950/80 text-amber-300 border-amber-800",
    icon: "👑",
    description: "Full control over business settings, revenue, staff, products and reports.",
    capabilities: [
      "Manage and edit all product prices & container deposits",
      "Full CMS content editing (Hero, banners, contact hotline)",
      "View and audit complete financial ledgers & cash reconciliation",
      "Assign and manage employee accounts and roles",
      "Dispatch orders and manage micro-hubs",
      "Configure Dhaka delivery neighborhood zone fees",
    ],
    userCount: 2,
    backendScope: "ALL_PERMISSIONS",
  },
  {
    id: "OPERATIONS_MANAGER",
    title: "Operations Manager",
    titleBn: "অপারেশনস ম্যানেজার",
    color: "from-sky-500 to-blue-600",
    badgeBg: "bg-sky-950/80 text-sky-300 border-sky-800",
    icon: "⚡",
    description: "Manages orders, delivery scheduling, customer issues and daily operations.",
    capabilities: [
      "Assign delivery heroes and vans to dispatch orders",
      "Live monitor order status and delivery slot windows",
      "Handle customer escalation and rescheduling requests",
      "Supervise Dhaka micro-hub inventory replenishment",
      "View operational reports and daily fulfillment metrics",
    ],
    userCount: 5,
    backendScope: "DISPATCH_AND_OPERATIONS",
  },
  {
    id: "INVENTORY_STAFF",
    title: "Inventory Staff",
    titleBn: "ইনভেন্টরি কর্মী",
    color: "from-cyan-500 to-teal-500",
    badgeBg: "bg-cyan-950/80 text-cyan-300 border-cyan-800",
    icon: "📦",
    description: "Manages full jars, empty jars, stock entries, damaged stock and suppliers.",
    capabilities: [
      "Record full jar batch arrivals from central bottling plant",
      "Audit empty jar returns collected from customers",
      "Mark damaged or decommissioned jars with reason logs",
      "Update real-time stock levels across Dhaka micro-hubs",
      "Track supplier receipts and container deposit counts",
    ],
    userCount: 12,
    backendScope: "INVENTORY_AND_SUPPLY",
  },
  {
    id: "ACCOUNTANT",
    title: "Accountant / Cashier",
    titleBn: "অ্যাকাউন্ট্যান্ট / ক্যাশিয়ার",
    color: "from-emerald-500 to-green-600",
    badgeBg: "bg-emerald-950/80 text-emerald-300 border-emerald-800",
    icon: "💵",
    description: "Records payments, expenses, refunds, customer dues and delivery cash reconciliation.",
    capabilities: [
      "Reconcile daily Cash on Delivery (COD) handed over by riders",
      "Audit Bkash, Nagad, and credit card digital settlements",
      "Process jar deposit refunds upon customer cancellation",
      "Track corporate credit lines and overdue invoices",
      "Export monthly revenue, expense, and tax ledger sheets",
    ],
    userCount: 4,
    backendScope: "FINANCIAL_LEDGER",
  },
  {
    id: "DELIVERY_STAFF",
    title: "Delivery Staff",
    titleBn: "ডেলিভারি রাইডার / কর্মী",
    color: "from-purple-500 to-indigo-600",
    badgeBg: "bg-purple-950/80 text-purple-300 border-purple-800",
    icon: "🛵",
    description: "Views assigned orders, calls customers, confirms delivery and records collections.",
    capabilities: [
      "Access dedicated mobile delivery view (`/delivery`)",
      "View assigned delivery route and customer contact numbers",
      "One-click call customer and verify delivery address/floor",
      "Confirm delivery completion and record COD cash collected",
      "Log number of empty jars collected for deposit credit",
    ],
    userCount: 28,
    backendScope: "MOBILE_DELIVERY",
  },
  {
    id: "CUSTOMER",
    title: "Customer",
    titleBn: "গ্রাহক",
    color: "from-slate-500 to-slate-700",
    badgeBg: "bg-slate-800 text-slate-300 border-slate-700",
    icon: "👤",
    description: "Places orders, manages addresses, tracks deliveries and controls subscriptions.",
    capabilities: [
      "Browse pure water catalog and add items to cart",
      "Subscribe to weekly/monthly jar recurring supply",
      "Track real-time delivery status and rider location",
      "View deposit jar balance and request refund on return",
      "Manage delivery addresses (Gulshan, Banani, Dhanmondi, Uttara, etc.)",
    ],
    userCount: 3420,
    backendScope: "CUSTOMER_SELF_SERVICE",
  },
];

export function RolesManager({ currentRole, onSwitchRole }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Backend Enforcement Security Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/80 to-slate-900 border border-sky-800/80 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 shrink-0 mt-0.5">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span>RBAC Matrix & Backend Security Enforcement</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Permissions are strictly enforced by the Express backend API via{" "}
              <code className="text-sky-300 bg-slate-950 px-1.5 py-0.5 rounded font-mono text-[11px]">
                requireRoles(...roles)
              </code>{" "}
              JWT middleware, not merely by hiding dashboard buttons.
            </p>
          </div>
        </div>

        {/* Current Role Indicator */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 text-right">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
            Simulated Active Session
          </div>
          <div className="text-sm font-black text-sky-400 mt-0.5">
            {USER_ROLES.find((r) => r.id === currentRole)?.title || currentRole}
          </div>
        </div>
      </div>

      {/* 6 Roles Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {USER_ROLES.map((role) => {
          const isCurrent = role.id === currentRole;
          return (
            <div
              key={role.id}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                isCurrent
                  ? "bg-slate-800/95 border-sky-500 shadow-xl shadow-sky-500/10 ring-1 ring-sky-500"
                  : "bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 shadow-md"
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{role.icon}</span>
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight">
                        {role.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {role.titleBn}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${role.badgeBg}`}
                  >
                    {role.userCount} Users
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                  {role.description}
                </p>

                {/* Granular Capabilities */}
                <div className="space-y-2 border-t border-slate-800 pt-3">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Granted Permissions
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {role.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5 mt-4 border-t border-slate-800">
                {isCurrent ? (
                  <div className="flex items-center justify-center gap-2 py-2 rounded-xl bg-sky-950/80 border border-sky-800 text-sky-400 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Active Session Role</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSwitchRole && onSwitchRole(role.id)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-300 font-bold text-xs border border-slate-700 transition"
                  >
                    Switch to {role.title.split("/")[0].trim()}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Permissions Matrix Table */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-sky-400" />
          <span>Granular Module Access Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-3 text-center">Catalog & Products</th>
                <th className="py-3 px-3 text-center">CMS Content</th>
                <th className="py-3 px-3 text-center">Orders Dispatch</th>
                <th className="py-3 px-3 text-center">Inventory & Jars</th>
                <th className="py-3 px-3 text-center">Financial Ledger</th>
                <th className="py-3 px-3 text-center">Delivery Mobile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>👑</span> <span>Super Admin / Owner</span>
                </td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>⚡</span> <span>Operations Manager</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-500">View Only</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Manage</td>
                <td className="py-3 px-3 text-center text-slate-500">View Only</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Supervise</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>📦</span> <span>Inventory Staff</span>
                </td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Stock Only</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>💵</span> <span>Accountant / Cashier</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-500">View Only</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">View Only</td>
                <td className="py-3 px-3 text-center text-slate-500">Audit Only</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>🛵</span> <span>Delivery Staff</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">Assigned Only</td>
                <td className="py-3 px-3 text-center text-slate-500">Van Stock</td>
                <td className="py-3 px-3 text-center text-slate-500">COD Handoff</td>
                <td className="py-3 px-3 text-center text-emerald-400 font-bold">✓ Full</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                  <span>👤</span> <span>Customer</span>
                </td>
                <td className="py-3 px-3 text-center text-slate-400">Storefront</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">My Orders</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
                <td className="py-3 px-3 text-center text-slate-500">My Invoices</td>
                <td className="py-3 px-3 text-center text-slate-500">✕ Denied</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RolesManager;
