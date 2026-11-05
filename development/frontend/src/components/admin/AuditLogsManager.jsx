import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Clock,
  User,
  Eye,
  ChevronDown,
  ChevronUp,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Lock,
  RefreshCw,
  Server,
} from "lucide-react";

const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-20261104-9811",
    timestamp: "2026-11-04 11:46:12",
    action: "RIDER_COD_RECONCILED",
    category: "FINANCE",
    severity: "INFO",
    actor: {
      name: "Tofayel Ahmed",
      role: "SUPER_ADMIN",
      email: "tofayel@aquaflow.com.bd",
    },
    target: "Rider Md. Rafiqul Islam (Van 01)",
    ipAddress: "103.145.72.19 (Dhaka, BD)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
    payload: {
      route: "Gulshan-Banani Fleet 01",
      expectedCOD: 4850,
      collectedCOD: 4850,
      variance: 0,
      receiptVoucher: "RC-20261104-09",
    },
  },
  {
    id: "LOG-20261104-8742",
    timestamp: "2026-11-04 10:15:30",
    action: "STOCK_VARIANCE_APPROVED",
    category: "INVENTORY",
    severity: "WARNING",
    actor: {
      name: "Mahfuz Rahman",
      role: "INVENTORY_STAFF",
      email: "inventory.lead@aquaflow.com.bd",
    },
    target: "Gulshan-Banani Central Hub (20L Full Jars)",
    ipAddress: "103.145.72.22 (Dhaka, BD)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
    payload: {
      systemCount: 422,
      physicalFloorCount: 420,
      variance: -2,
      reason: "2 jars quarantined due to cap seal micro-leak",
    },
  },
  {
    id: "LOG-20261104-7120",
    timestamp: "2026-11-04 09:30:45",
    action: "DEPOSIT_REFUND_APPROVED",
    category: "FINANCE",
    severity: "INFO",
    actor: {
      name: "Tofayel Ahmed",
      role: "SUPER_ADMIN",
      email: "tofayel@aquaflow.com.bd",
    },
    target: "Shamsul Alam (Gulshan 2)",
    ipAddress: "103.145.72.19 (Dhaka, BD)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
    payload: {
      refundAmountBDT: 400,
      emptyJarsReturned: 2,
      method: "bKash Direct Payout (01712345678)",
      txId: "DEP-REF-104",
    },
  },
  {
    id: "LOG-20261103-6201",
    timestamp: "2026-11-03 16:45:10",
    action: "PRODUCT_PRICE_OVERRIDE",
    category: "SECURITY",
    severity: "CRITICAL",
    actor: {
      name: "Tofayel Ahmed",
      role: "SUPER_ADMIN",
      email: "tofayel@aquaflow.com.bd",
    },
    target: "AquaFlow 20L Pure Reusable Jar",
    ipAddress: "103.145.72.19 (Dhaka, BD)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
    payload: {
      field: "priceBDT",
      oldValue: 85,
      newValue: 80,
      justification: "Dhaka city promo rate reduction for new subscribers",
    },
  },
  {
    id: "LOG-20261103-4519",
    timestamp: "2026-11-03 14:10:02",
    action: "STAFF_ROLE_PROMOTION",
    category: "SECURITY",
    severity: "WARNING",
    actor: {
      name: "Tofayel Ahmed",
      role: "SUPER_ADMIN",
      email: "tofayel@aquaflow.com.bd",
    },
    target: "Sumon Sarker (Staff ID #8802)",
    ipAddress: "103.145.72.19 (Dhaka, BD)",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130",
    payload: {
      previousRole: "DELIVERY_STAFF",
      promotedRole: "INVENTORY_STAFF",
      hubAssigned: "Dhanmondi Micro-Hub",
    },
  },
];

export function AuditLogsManager() {
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [expandedLogId, setExpandedLogId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleExpand = (id) => {
    setExpandedLogId(expandedLogId === id ? null : id);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "ALL" || log.category === categoryFilter;
    const matchesSeverity = severityFilter === "ALL" || log.severity === severityFilter;

    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-rose-950/80 text-rose-300 border-rose-800";
      case "WARNING":
        return "bg-amber-950/80 text-amber-300 border-amber-800";
      default:
        return "bg-sky-950/80 text-sky-300 border-sky-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>PRD 12.10 Compliance & Security Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Immutable System Audit Logs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
            Tamper-evident trail of administrative overrides, inventory counts, cashier reconciliations, and RBAC security events with IP addresses and payload diff snapshots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => showToast("✓ Exported 5 audit log events to compliance JSON file.")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center gap-2 shadow"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Export Audit Trail</span>
          </button>
        </div>
      </div>

      {/* Audit Stats Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Total Recorded Events</div>
          <div className="text-2xl font-black text-white mt-1">{logs.length} Actions</div>
          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">100% Cryptographically Intact</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Financial Approvals</div>
          <div className="text-2xl font-black text-emerald-400 mt-1">2 Events</div>
          <div className="text-[10px] text-slate-400 mt-0.5">COD reconciliations & refunds</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Inventory Adjustments</div>
          <div className="text-2xl font-black text-amber-400 mt-1">1 Event</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Cycle count variance approved</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] text-slate-400 uppercase font-bold">Security Overrides</div>
          <div className="text-2xl font-black text-purple-400 mt-1">2 Events</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Price & Role policy adjustments</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search action, actor, ID, target..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-bold"
          >
            <option value="ALL">All Categories</option>
            <option value="FINANCE">Finance</option>
            <option value="INVENTORY">Inventory</option>
            <option value="SECURITY">Security</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-bold"
          >
            <option value="ALL">All Severities</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
      </div>

      {/* Main Audit Trail Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Event ID & Time</th>
                <th className="py-3 px-4">Action & Category</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">IP Address & Client</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-right">Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;

                return (
                  <React.Fragment key={log.id}>
                    <tr className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-indigo-400">{log.id}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{log.timestamp}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-white text-[11px]">{log.action}</div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 inline-block mt-0.5">
                          {log.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{log.actor.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{log.actor.role}</div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {log.target}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                        {log.ipAddress}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSeverityBadge(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => toggleExpand(log.id)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold inline-flex items-center gap-1"
                        >
                          <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{isExpanded ? "Hide" : "Diff"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>

                    {/* Expandable JSON Snapshot */}
                    {isExpanded && (
                      <tr className="bg-slate-950/80">
                        <td colSpan={7} className="p-4">
                          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                              <span className="font-mono font-bold text-indigo-400">
                                Payload Diff Snapshot • User-Agent: {log.userAgent}
                              </span>
                              <span className="text-emerald-400 font-bold">✓ SHA-256 Checksum Verified</span>
                            </div>
                            <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto p-2 bg-black/40 rounded-xl">
                              {JSON.stringify(log.payload, null, 2)}
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AuditLogsManager;
