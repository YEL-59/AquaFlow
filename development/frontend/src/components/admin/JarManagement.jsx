import React, { useState } from "react";
import {
  RotateCcw,
  Building2,
  Truck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const INITIAL_JAR_METRICS = {
  totalCirculating: 12500,
  fullInWarehouses: 4200,
  emptyInWarehouses: 2800,
  fullWithCustomers: 4150,
  inTransitVan: 950,
  damagedQuarantined: 400,
  depositLiabilitiesBDT: 830000, // 4150 * 200
  recoveryRatePercent: 94.8,
};

const INITIAL_JAR_LEDGER = [
  {
    id: "JAR-TX-8901",
    timestamp: "2026-11-04 11:30 AM",
    location: "Banani Hub",
    eventType: "EMPTIES_COLLECTED",
    quantityDelta: "+15",
    actor: "Md. Rafiqul Islam (Van #DH-11-8901)",
    reference: "ORD-20261104-7821",
    depositImpact: "-৳3,000 credit",
    notes: "15 empty 20L PC jars collected from customer stops",
  },
  {
    id: "JAR-TX-8900",
    timestamp: "2026-11-04 10:15 AM",
    location: "Gulshan Hub",
    eventType: "FULL_DISPATCHED",
    quantityDelta: "-40",
    actor: "Karim Ullah (Van #DH-12-4421)",
    reference: "MANIFEST-20261104-02",
    depositImpact: "+৳8,000 liability",
    notes: "40 sanitized 20L jars dispatched on morning run",
  },
  {
    id: "JAR-TX-8899",
    timestamp: "2026-11-04 09:00 AM",
    location: "Central Washing Plant",
    eventType: "FILLING_COMPLETED",
    quantityDelta: "+500",
    actor: "Production Line Supv. Anis",
    reference: "BATCH-20261104-A",
    depositImpact: "N/A",
    notes: "500 sanitized jars filled with 7-stage RO water & BSTI sealed",
  },
  {
    id: "JAR-TX-8898",
    timestamp: "2026-11-03 04:30 PM",
    location: "Uttara Hub",
    eventType: "DAMAGED_QUARANTINE",
    quantityDelta: "-3",
    actor: "Inspector Faruk",
    reference: "QC-20261103-91",
    depositImpact: "-৳600 deposit forfeited",
    notes: "Hairline crack on jar neck detected during pressure rinse",
  },
];

export function JarManagement() {
  const [metrics, setMetrics] = useState(INITIAL_JAR_METRICS);
  const [ledger, setLedger] = useState(INITIAL_JAR_LEDGER);
  const [showAdjustmentModal, setShowAdjustmentModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    location: "Banani Hub",
    eventType: "EMPTIES_COLLECTED",
    quantityDelta: 10,
    actor: "Tofayel Ahmed (Admin)",
    notes: "Manual verified reconciliation",
  });

  const handleAddEntry = (e) => {
    e.preventDefault();
    const created = {
      id: `JAR-TX-${Date.now()}`,
      timestamp: "Just now",
      location: newEntry.location,
      eventType: newEntry.eventType,
      quantityDelta: `${newEntry.quantityDelta > 0 ? "+" : ""}${newEntry.quantityDelta}`,
      actor: newEntry.actor,
      reference: "MANUAL-ADJ",
      depositImpact: `৳${Math.abs(newEntry.quantityDelta) * 200}`,
      notes: newEntry.notes,
    };
    setLedger([created, ...ledger]);
    setShowAdjustmentModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-cyan-400" />
            <span>Reusable 20-Liter Jar Management & Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track every food-grade polycarbonate bottle across Dhaka warehouses, delivery vans, and customer premises.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdjustmentModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record Jar Ledger Entry</span>
        </button>
      </div>

      {/* Jar Circulation Visual Breakdown Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Fleet</div>
          <div className="text-xl font-black text-white mt-1">{metrics.totalCirculating.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">BPA-Free 20L PC Jars</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">Full In Hubs</div>
          <div className="text-xl font-black text-sky-400 mt-1">{metrics.fullInWarehouses.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Ready for dispatch</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Empty In Hubs</div>
          <div className="text-xl font-black text-cyan-400 mt-1">{metrics.emptyInWarehouses.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Awaiting sanitization</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">With Customers</div>
          <div className="text-xl font-black text-purple-400 mt-1">{metrics.fullWithCustomers.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Deposit held by us</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">In Vans (Transit)</div>
          <div className="text-xl font-black text-amber-400 mt-1">{metrics.inTransitVan.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Active delivery vans</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Damaged / QC</div>
          <div className="text-xl font-black text-red-400 mt-1">{metrics.damagedQuarantined}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Scrapped / Quarantined</div>
        </div>
      </div>

      {/* Deposit Liability Highlight Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-cyan-950/80 border border-sky-800/60 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center justify-center font-bold shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
              Customer Deposit Liability Balance
            </div>
            <div className="text-2xl font-black text-white mt-0.5">
              ৳{metrics.depositLiabilitiesBDT.toLocaleString()}{" "}
              <span className="text-xs text-slate-400 font-normal">
                (at ৳200 refundable deposit per 20L bottle)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] font-bold text-slate-400">Jar Recovery Rate</div>
            <div className="text-lg font-black text-emerald-400">{metrics.recoveryRatePercent}%</div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            Optimal
          </span>
        </div>
      </div>

      {/* Manual Entry Modal */}
      {showAdjustmentModal && (
        <form
          onSubmit={handleAddEntry}
          className="p-6 rounded-3xl bg-slate-900 border border-cyan-500 shadow-2xl space-y-4 max-w-lg"
        >
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>New Container Ledger Transaction</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Micro-Hub Location</label>
              <select
                value={newEntry.location}
                onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              >
                <option value="Banani Hub">Banani Central Hub</option>
                <option value="Gulshan Hub">Gulshan Hub</option>
                <option value="Dhanmondi Hub">Dhanmondi Hub</option>
                <option value="Uttara Hub">Uttara Hub</option>
                <option value="Central Washing Plant">Central Washing Plant</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Event Type</label>
              <select
                value={newEntry.eventType}
                onChange={(e) => setNewEntry({ ...newEntry, eventType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              >
                <option value="EMPTIES_COLLECTED">Empty Jars Collected (+)</option>
                <option value="FULL_DISPATCHED">Full Jars Dispatched (-)</option>
                <option value="FILLING_COMPLETED">Filled at Plant (+)</option>
                <option value="DAMAGED_QUARANTINE">Damaged / Scrapped (-)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Quantity (Jars)</label>
              <input
                type="number"
                min="1"
                required
                value={newEntry.quantityDelta}
                onChange={(e) => setNewEntry({ ...newEntry, quantityDelta: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Authorized Operator</label>
              <input
                type="text"
                readOnly
                value={newEntry.actor}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Reason / Notes</label>
            <input
              type="text"
              required
              value={newEntry.notes}
              onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
              placeholder="e.g. Returned from Gulshan corporate office batch"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold">
              Commit Ledger Transaction
            </button>
            <button
              type="button"
              onClick={() => setShowAdjustmentModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Immutable Jar Ledger Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Immutable Container Movement Ledger
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">
            {ledger.length} Recorded Events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Tx ID & Timestamp</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Event Type</th>
                <th className="px-4 py-3">Delta</th>
                <th className="px-4 py-3">Operator / Actor</th>
                <th className="px-4 py-3">Deposit Impact</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {ledger.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-4 py-3 font-mono">
                    <div className="font-bold text-white text-[11px]">{entry.id}</div>
                    <div className="text-[10px] text-slate-500">{entry.timestamp}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-200">{entry.location}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-cyan-300 border border-slate-700">
                      {entry.eventType}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-black text-sm text-cyan-400">
                    {entry.quantityDelta}
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-[11px]">{entry.actor}</td>
                  <td className="px-4 py-3 text-emerald-400 font-semibold text-[11px]">
                    {entry.depositImpact}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px] max-w-xs truncate">
                    {entry.notes}
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

export default JarManagement;
