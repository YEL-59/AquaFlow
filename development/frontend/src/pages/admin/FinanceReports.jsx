import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Banknote,
  TrendingUp,
  Receipt,
  RotateCcw,
  Plus,
  CheckCircle2,
  Calendar,
  Building2,
  DollarSign,
  Download,
  AlertCircle,
  Truck,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { Button, Card, Badge } from "../../components/ui";
import { api } from "../../services/api";

const INITIAL_SETTLEMENTS = [
  {
    id: "SETTLE-01",
    riderName: "Md. Rafiqul Islam (Van 01)",
    zone: "Gulshan-Banani",
    ordersCompleted: 14,
    emptyJarsCollected: 12,
    expectedCashBDT: 4850,
    actualCashReceivedBDT: 4850,
    discrepancyBDT: 0,
    status: "RECONCILED",
  },
  {
    id: "SETTLE-02",
    riderName: "Kamrul Hasan (Van 02)",
    zone: "Dhanmondi",
    ordersCompleted: 11,
    emptyJarsCollected: 9,
    expectedCashBDT: 3400,
    actualCashReceivedBDT: 3400,
    discrepancyBDT: 0,
    status: "PENDING_VERIFICATION",
  },
  {
    id: "SETTLE-03",
    riderName: "Sharif Ahmed (Van 03)",
    zone: "Uttara",
    ordersCompleted: 8,
    emptyJarsCollected: 6,
    expectedCashBDT: 2650,
    actualCashReceivedBDT: 2650,
    discrepancyBDT: 0,
    status: "PENDING_VERIFICATION",
  },
];

export function FinanceReports() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en";

  const [settlements, setSettlements] = useState(INITIAL_SETTLEMENTS);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("FUEL");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseNotes, setExpenseNotes] = useState("");
  const [activeTab, setActiveTab] = useState("PNL"); // 'PNL' | 'RECONCILIATION'

  const handleReconcileShift = (id) => {
    setSettlements((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "RECONCILED" } : s))
    );
  };

  const handleRecordExpense = (e) => {
    e.preventDefault();
    alert(`Operational expense of ৳${expenseAmount} recorded under ${expenseCategory} and posted to balanced journal.`);
    setShowExpenseModal(false);
    setExpenseAmount("");
    setExpenseNotes("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-2">
              <Banknote className="w-3.5 h-3.5" />
              <span>Balanced Double-Entry Financial Ledger</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
              <span>Financial Reports & Shift Cash Settlement</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => setShowExpenseModal(true)}
              className="rounded-xl text-xs py-2 px-4 bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Record Expense</span>
            </Button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("PNL")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "PNL"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            Profit & Loss (P&L) Statement
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("RECONCILIATION")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === "RECONCILIATION"
                ? "bg-sky-600 text-white shadow-md shadow-sky-500/20"
                : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            Rider Shift Cash Settlement ({settlements.filter((s) => s.status !== "RECONCILED").length} Pending)
          </button>
        </div>

        {/* Tab 1: P&L Statement */}
        {activeTab === "PNL" && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
                <div className="text-xs font-semibold text-slate-400">Total Operating Revenue</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {formatBDT(354500, "en")}
                </div>
                <div className="text-xs text-slate-400 mt-1">Water Sales + Delivery Fees</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
                <div className="text-xs font-semibold text-slate-400">Gross Operating Profit</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                  {formatBDT(209500, "en")}
                </div>
                <div className="text-xs text-emerald-400/80 mt-1">59.1% Gross Margin</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
                <div className="text-xs font-semibold text-slate-400">Net Operating Profit</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 mt-1">
                  {formatBDT(169000, "en")}
                </div>
                <div className="text-xs text-sky-400/80 mt-1">47.6% Net Margin</div>
              </div>
            </div>

            {/* Itemized P&L Table */}
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-white border-b border-slate-700 pb-3 flex items-center justify-between">
                <span>Monthly Income Statement (Asia/Dhaka)</span>
                <span className="text-xs text-slate-400 font-mono">Currency: Bangladeshi Taka (BDT)</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Revenue */}
                <div>
                  <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                    Operating Revenues
                  </div>
                  <div className="space-y-1.5 pl-4 border-l-2 border-slate-700">
                    <div className="flex justify-between text-slate-300">
                      <span>4010 - Water Sales Revenue</span>
                      <span className="font-semibold text-white">{formatBDT(320000, "en")}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>4020 - Delivery Fee Income</span>
                      <span className="font-semibold text-white">{formatBDT(34500, "en")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-700">
                      <span>Total Revenue</span>
                      <span className="text-emerald-400">{formatBDT(354500, "en")}</span>
                    </div>
                  </div>
                </div>

                {/* COGS */}
                <div>
                  <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                    Cost of Goods Sold (COGS)
                  </div>
                  <div className="space-y-1.5 pl-4 border-l-2 border-slate-700">
                    <div className="flex justify-between text-slate-300">
                      <span>5010 - Packaged Water Supplier Invoices & Raw Bottling</span>
                      <span className="font-semibold text-rose-400">-{formatBDT(145000, "en")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-700">
                      <span>Gross Profit</span>
                      <span className="text-emerald-400">{formatBDT(209500, "en")}</span>
                    </div>
                  </div>
                </div>

                {/* Operating Expenses */}
                <div>
                  <div className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                    Operating Expenses (OPEX)
                  </div>
                  <div className="space-y-1.5 pl-4 border-l-2 border-slate-700">
                    <div className="flex justify-between text-slate-300">
                      <span>5020 - Van Fuel & Delivery Fleet Maintenance</span>
                      <span className="font-semibold text-rose-400">-{formatBDT(22000, "en")}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>5030 - 7-Stage Plant Sanitization & Consumables</span>
                      <span className="font-semibold text-rose-400">-{formatBDT(18500, "en")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white pt-1 border-t border-slate-700">
                      <span>Total Operating Expenses</span>
                      <span className="text-rose-400">-{formatBDT(40500, "en")}</span>
                    </div>
                  </div>
                </div>

                {/* Net Income */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 flex justify-between items-center text-sm sm:text-base font-extrabold">
                  <span className="text-white">Net Operating Profit</span>
                  <span className="text-emerald-400 text-xl">{formatBDT(169000, "en")}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Rider Shift Reconciliation */}
        {activeTab === "RECONCILIATION" && (
          <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-sky-400" />
                <span>Rider Daily Shift Cash Settlements</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Reconcile physical cash pouch handovers from delivery van staff to neighborhood hub vaults.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-700 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Rider / Fleet</th>
                    <th className="py-3 px-4">Zone</th>
                    <th className="py-3 px-4">Orders Done</th>
                    <th className="py-3 px-4">Empty Jars</th>
                    <th className="py-3 px-4">Expected Cash</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {settlements.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-3.5 px-4 font-bold text-white">{s.riderName}</td>
                      <td className="py-3.5 px-4 text-slate-300">{s.zone}</td>
                      <td className="py-3.5 px-4 text-slate-300">{s.ordersCompleted} orders</td>
                      <td className="py-3.5 px-4 text-cyan-400 font-semibold">{s.emptyJarsCollected} jars</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-400 text-sm">
                        {formatBDT(s.expectedCashBDT, "en")}
                      </td>
                      <td className="py-3.5 px-4">
                        {s.status === "RECONCILED" ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[11px] font-bold">
                            ✓ Reconciled
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-800 text-[11px] font-bold">
                            Pending Vault Deposit
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {s.status !== "RECONCILED" ? (
                          <Button
                            size="sm"
                            onClick={() => handleReconcileShift(s.id)}
                            className="rounded-lg text-xs py-1 px-3 bg-emerald-600 hover:bg-emerald-500 text-white"
                          >
                            Confirm Deposit
                          </Button>
                        ) : (
                          <span className="text-slate-500 text-xs">Deposited to #1020</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Record Expense Modal */}
        {showExpenseModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="max-w-md w-full glass-card p-6 rounded-3xl border border-sky-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-sky-600" />
                <span>Record Operational Expense</span>
              </h3>

              <form onSubmit={handleRecordExpense} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Expense Category
                  </label>
                  <select
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="FUEL">Van Fuel & Vehicle Maintenance (Code 5020)</option>
                    <option value="SANITIZATION">Filtration & Sanitization Chemicals (Code 5030)</option>
                    <option value="MISC">Micro-Hub Petty Cash / General Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Amount in BDT (৳)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1500"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Description / Voucher Reference
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CNG refuel for Gulshan Van #DH-11-8901"
                    value={expenseNotes}
                    onChange={(e) => setExpenseNotes(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-xl"
                    onClick={() => setShowExpenseModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white"
                  >
                    Post Journal
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinanceReports;
