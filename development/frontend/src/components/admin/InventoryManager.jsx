import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RotateCcw,
  Building2,
  AlertOctagon,
  Plus,
  CheckCircle2,
  Package,
  Layers,
  ArrowDownUp,
  History,
  ClipboardCheck,
  Check,
  AlertTriangle,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";
import { HubInventoryBarChart } from "../charts/BusinessCharts";

const INITIAL_HUBS = [
  {
    id: "hub-gulshan",
    name: "Gulshan-Banani Central Hub",
    address: "Road 11, Banani DOHS",
    fullJars: 420,
    emptyJars: 85,
    damagedJars: 12,
    capacity: 1200,
    status: "HEALTHY",
  },
  {
    id: "hub-dhanmondi",
    name: "Dhanmondi Micro-Hub",
    address: "Road 27 (Old), Dhanmondi",
    fullJars: 310,
    emptyJars: 60,
    damagedJars: 8,
    capacity: 900,
    status: "HEALTHY",
  },
  {
    id: "hub-uttara",
    name: "Uttara Sector 7 Depot",
    address: "Sector 7, Road 13, Uttara",
    fullJars: 480,
    emptyJars: 92,
    damagedJars: 15,
    capacity: 1000,
    status: "HEALTHY",
  },
];

const INITIAL_AUDITS = [
  {
    id: "AUD-20261103-01",
    hubName: "Gulshan-Banani Central Hub",
    item: "AquaFlow 20L Full Jar",
    systemCount: 422,
    physicalCount: 420,
    variance: -2,
    reason: "2 jars quarantined due to cap seal micro-leak",
    auditedBy: "Mahfuz Rahman (Inventory Lead)",
    status: "APPROVED",
  },
  {
    id: "AUD-20261102-04",
    hubName: "Dhanmondi Micro-Hub",
    item: "20L Empty Reusable Jar",
    systemCount: 58,
    physicalCount: 60,
    variance: +2,
    reason: "Extra empty jar returned by walk-in subscriber",
    auditedBy: "Sumon Sarker (Depot Staff)",
    status: "APPROVED",
  },
];

export function InventoryManager() {
  const { t } = useTranslation();
  const [hubs, setHubs] = useState(INITIAL_HUBS);
  const [activeTab, setActiveTab] = useState("BALANCES"); // "BALANCES" | "VARIANCE_AUDIT"
  const [audits, setAudits] = useState(INITIAL_AUDITS);
  const [toastMessage, setToastMessage] = useState(null);

  // Stock count form state
  const [auditForm, setAuditForm] = useState({
    hubId: "hub-gulshan",
    item: "AquaFlow 20L Full Jar",
    physicalCount: 420,
    reason: "Weekly physical inventory cycle count",
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalFullJars = hubs.reduce((acc, h) => acc + h.fullJars, 0);
  const totalEmptyJars = hubs.reduce((acc, h) => acc + h.emptyJars, 0);
  const totalDamagedJars = hubs.reduce((acc, h) => acc + h.damagedJars, 0);

  const handleQuickAdd = (hubId, count) => {
    setHubs((prev) =>
      prev.map((h) => (h.id === hubId ? { ...h, fullJars: h.fullJars + count } : h))
    );
    showToast(`✓ Received +${count} full jars into depot.`);
  };

  const handleAuditSubmit = (e) => {
    e.preventDefault();
    const targetHub = hubs.find((h) => h.id === auditForm.hubId) || hubs[0];
    const systemVal = auditForm.item.includes("Full") ? targetHub.fullJars : targetHub.emptyJars;
    const diff = Number(auditForm.physicalCount) - systemVal;

    const newAudit = {
      id: `AUD-${Date.now().toString().slice(-8)}`,
      hubName: targetHub.name,
      item: auditForm.item,
      systemCount: systemVal,
      physicalCount: Number(auditForm.physicalCount),
      variance: diff,
      reason: auditForm.reason,
      auditedBy: "Active Operator (You)",
      status: "APPROVED",
    };

    setAudits([newAudit, ...audits]);

    // Apply variance adjustment to hub
    setHubs((prev) =>
      prev.map((h) =>
        h.id === auditForm.hubId
          ? {
              ...h,
              fullJars: auditForm.item.includes("Full") ? Number(auditForm.physicalCount) : h.fullJars,
              emptyJars: auditForm.item.includes("Empty") ? Number(auditForm.physicalCount) : h.emptyJars,
            }
          : h
      )
    );

    showToast(`✓ Inventory variance of ${diff >= 0 ? `+${diff}` : diff} reconciled and approved!`);
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Ready Full Jars in Hubs</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-2">{totalFullJars} Jars</div>
          <div className="text-xs text-slate-400 mt-1">Laboratory tested 7-stage RO pure water</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Empty Jars to Sanitize & Refill</span>
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400 mt-2">{totalEmptyJars} Jars</div>
          <div className="text-xs text-slate-400 mt-1">Collected from customer doorsteps</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Damaged / Decommissioned Jars</span>
            <AlertOctagon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 mt-2">{totalDamagedJars} Jars</div>
          <div className="text-xs text-slate-400 mt-1">Pending recycling & manufacturer replacement</div>
        </div>
      </div>

      {/* Visual Chart Card */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Dhaka Micro-Hubs Real-Time Stock Capacity</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Visual stock comparison: Full Jars (Ready), Empty Jars (Washing), Damaged Jars (Quarantine)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("BALANCES")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "BALANCES"
                  ? "bg-sky-600 text-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              Hub Balances
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("VARIANCE_AUDIT")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                activeTab === "VARIANCE_AUDIT"
                  ? "bg-sky-600 text-white shadow"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              Variance Audit (PRD 11.5)
            </button>
          </div>
        </div>

        <HubInventoryBarChart height={260} />
      </div>

      {/* TAB 1: Hub Inventory Balances Table */}
      {activeTab === "BALANCES" && (
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400" />
                <span>Dhaka Micro-Hub Daily Inventory Balances</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Role: Inventory Staff / Operations Manager. Record new bottling batches and jar returns.
              </p>
            </div>
          </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Micro-Hub & Location</th>
                <th className="py-3 px-4">Full Jars (Ready)</th>
                <th className="py-3 px-4">Empty Jars</th>
                <th className="py-3 px-4">Damaged</th>
                <th className="py-3 px-4">Capacity Utilization</th>
                <th className="py-3 px-4 text-right">Quick Stock Entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {hubs.map((hub) => {
                const totalJars = hub.fullJars + hub.emptyJars + hub.damagedJars;
                const percent = Math.round((totalJars / hub.capacity) * 100);

                return (
                  <tr key={hub.id} className="hover:bg-slate-700/30 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{hub.name}</div>
                      <div className="text-[11px] text-slate-400">{hub.address}</div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-emerald-400 text-base">
                      {hub.fullJars}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-cyan-400 text-sm">
                      {hub.emptyJars}
                    </td>

                    <td className="py-3.5 px-4 text-amber-400 font-semibold">
                      {hub.damagedJars}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="w-36">
                        <div className="flex items-center justify-between text-[11px] text-slate-300 font-bold mb-1">
                          <span>{percent}%</span>
                          <span className="text-slate-500">{totalJars}/{hub.capacity}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(hub.id, 50)}
                          className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 text-xs font-bold"
                          title="Record 50 fresh jars from plant"
                        >
                          +50 Full
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(hub.id, 100)}
                          className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-300 border border-sky-800 hover:bg-sky-900 text-xs font-bold"
                          title="Record 100 fresh jars from plant"
                        >
                          +100 Full
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}

      {/* TAB 2: Physical Count & Variance Audit (PRD 11.5) */}
      {activeTab === "VARIANCE_AUDIT" && (
        <div className="space-y-6">
          {/* New Cycle Count Entry */}
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                  <span>Physical Inventory Count vs System Ledger (PRD 11.5)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Record floor count of 20L jars. System calculates variance and requires supervisor justification.
                </p>
              </div>
            </div>

            <form onSubmit={handleAuditSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Target Hub</label>
                <select
                  value={auditForm.hubId}
                  onChange={(e) => setAuditForm({ ...auditForm, hubId: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                >
                  {hubs.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">SKU / Item Type</label>
                <select
                  value={auditForm.item}
                  onChange={(e) => setAuditForm({ ...auditForm, item: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-medium"
                >
                  <option value="AquaFlow 20L Full Jar">AquaFlow 20L Full Ready Jar</option>
                  <option value="20L Empty Reusable Jar">20L Empty Reusable Jar</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Physical Floor Count</label>
                <input
                  type="number"
                  value={auditForm.physicalCount}
                  onChange={(e) => setAuditForm({ ...auditForm, physicalCount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold"
                  placeholder="e.g. 420"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-md flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Submit Audit Count</span>
                </button>
              </div>
            </form>
          </div>

          {/* Past Variance Audit Records */}
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-sky-400" />
              <span>Verified Physical Count Variance Audit Trail</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Audit ID</th>
                    <th className="py-3 px-4">Hub & Item</th>
                    <th className="py-3 px-4">System Count</th>
                    <th className="py-3 px-4">Physical Count</th>
                    <th className="py-3 px-4">Variance</th>
                    <th className="py-3 px-4">Justification</th>
                    <th className="py-3 px-4">Auditor</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {audits.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-sky-400">{a.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{a.hubName}</div>
                        <div className="text-[11px] text-slate-400">{a.item}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{a.systemCount}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">{a.physicalCount}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono font-bold text-[11px] ${
                            a.variance === 0
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : a.variance < 0
                              ? "bg-rose-950 text-rose-300 border border-rose-800"
                              : "bg-cyan-950 text-cyan-300 border border-cyan-800"
                          }`}
                        >
                          {a.variance > 0 ? `+${a.variance}` : a.variance}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 max-w-[200px] truncate">{a.reason}</td>
                      <td className="py-3.5 px-4 text-slate-400">{a.auditedBy}</td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                          ✓ {a.status}
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
    </div>
  );
}

export default InventoryManager;
