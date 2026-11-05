import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  RotateCcw,
  Receipt,
  Download,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Wallet,
  Check,
  X,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { PaymentMethodsDonutChart, RevenueTrendChart } from "../charts/BusinessCharts";

const RECENT_TRANSACTIONS = [
  {
    id: "TXN-9021",
    time: "Today, 11:45 AM",
    orderId: "ORD-20261104-5104",
    customer: "Grameen Telecom Office",
    method: "CASH_ON_DELIVERY",
    amount: 800,
    collectedBy: "Md. Rafiqul Islam (Van 01)",
    status: "RECONCILED",
  },
  {
    id: "TXN-9020",
    time: "Today, 10:15 AM",
    orderId: "ORD-20261104-7821",
    customer: "Engr. Tanvir Ahmed",
    method: "BKASH_DIRECT",
    amount: 290,
    collectedBy: "Automated Gateway",
    status: "SETTLED",
  },
  {
    id: "TXN-9019",
    time: "Today, 09:30 AM",
    orderId: "DEP-REF-104",
    customer: "Shamsul Alam (Gulshan 2)",
    method: "DEPOSIT_REFUND",
    amount: -400,
    collectedBy: "Cashier Desk",
    status: "REFUNDED",
  },
  {
    id: "TXN-9018",
    time: "Yesterday, 05:20 PM",
    orderId: "ORD-20261103-1182",
    customer: "Bashundhara Residence",
    method: "CASH_ON_DELIVERY",
    amount: 450,
    collectedBy: "Kamrul Hasan (Fleet 02)",
    status: "RECONCILED",
  },
];

export function FinanceOverview() {
  const { t } = useTranslation();
  const [toastMessage, setToastMessage] = useState(null);
  const [showReconcileModal, setShowReconcileModal] = useState(false);
  const [selectedRider, setSelectedRider] = useState("Md. Rafiqul Islam (Van 01)");
  const [countedCash, setCountedCash] = useState(4850);
  const [expectedCash] = useState(4850);
  const [reconcileSuccess, setReconcileSuccess] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApproveReconciliation = (e) => {
    e.preventDefault();
    setReconcileSuccess(true);
    setTimeout(() => {
      setReconcileSuccess(false);
      setShowReconcileModal(false);
      showToast(`✓ Cash handover of ৳${countedCash.toLocaleString()} for ${selectedRider} reconciled into General Ledger.`);
    }, 1800);
  };

  const variance = countedCash - expectedCash;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cashier Reconciliation Modal */}
      {showReconcileModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">
                  Rider Shift COD Handover Verification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReconcileModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reconcileSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h4 className="text-lg font-black text-white">Reconciliation Approved!</h4>
                <p className="text-xs text-slate-300">
                  Bank deposit voucher generated #RC-20261104-09. Ledger balance updated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApproveReconciliation} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Select Delivery Hero / Van</label>
                  <select
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold"
                  >
                    <option value="Md. Rafiqul Islam (Van 01)">Md. Rafiqul Islam (Van 01 - Banani Hub)</option>
                    <option value="Kamrul Hasan (Van 02)">Kamrul Hasan (Van 02 - Dhanmondi Hub)</option>
                    <option value="Jasim Uddin (Van 03)">Jasim Uddin (Van 03 - Uttara Depot)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">App Calculated COD</span>
                    <span className="text-lg font-black text-white">৳{expectedCash.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block text-[10px] font-bold">Calculated Variance</span>
                    <span className={`text-lg font-black ${variance === 0 ? "text-emerald-400" : "text-amber-400"}`}>
                      {variance === 0 ? "৳0 (Exact)" : `৳${variance}`}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 font-bold mb-1">Physical Cash Handed Over (BDT)</label>
                  <input
                    type="number"
                    value={countedCash}
                    onChange={(e) => setCountedCash(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono font-bold text-sm"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-2 text-slate-400 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Cashier digital sign-off records audit trail with current timestamp and user ID.</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReconcileModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg"
                  >
                    Confirm & Deposit to Safe
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Today's Total Inflow</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
            {formatBDT(42650, "en")}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">92% COD / 8% bKash & Card</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Rider Cash in Hand (Unsettled)</span>
            <Receipt className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
            {formatBDT(18400, "en")}
          </div>
          <div className="text-xs text-amber-300/80 mt-1">Pending evening route reconciliation</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Customer Jar Deposit Liability</span>
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-2">
            {formatBDT(368000, "en")}
          </div>
          <div className="text-xs text-cyan-300/80 mt-1">1,840 Active jars @ ৳200/jar</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Monthly Run-rate (Nov 2026)</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-300 mt-2">
            {formatBDT(1280000, "en")}
          </div>
          <div className="text-xs text-purple-400 mt-1">+24% vs Oct 2026</div>
        </div>
      </div>

      {/* Visual Charts: 7-Day Inflow Trend + Payment Methods Share */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart (Spans 2 columns) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Daily Sales Inflow & Cash Settled</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Physical Cash on Delivery collected by riders vs digital online payments
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
              Nov 2026
            </span>
          </div>

          <RevenueTrendChart height={240} />
        </div>

        {/* Payment Methods Donut (1 column) */}
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-cyan-400" />
              <span>Payment Channel Share</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Cash on delivery remains primary (68%) followed by bKash (24%)
            </p>
          </div>

          <PaymentMethodsDonutChart height={220} />

          <button
            type="button"
            onClick={() => setShowReconcileModal(true)}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4" />
            <span>Reconcile Rider Route Cash Handover</span>
          </button>
        </div>
      </div>

      {/* Transactions & Cash Reconciliation Table */}
      <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/60 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Daily Delivery Cash & Settlement Audit</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Role: Accountant / Cashier. Audit rider COD receipts, deposit releases, and refunds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReconcileModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Verify Rider Handover</span>
            </button>
            <button
              onClick={() => showToast("✓ Exporting CSV ledger statement...")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs transition"
            >
              <Download className="w-3.5 h-3.5 text-sky-400" />
              <span>Export Statement</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Txn ID & Time</th>
                <th className="py-3 px-4">Order / Event</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount (BDT)</th>
                <th className="py-3 px-4">Collected By</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-sky-400">{tx.id}</div>
                    <div className="text-[10px] text-slate-400">{tx.time}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-300">
                    {tx.orderId}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-white">
                    {tx.customer}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-bold text-[10px]">
                      {tx.method}
                    </span>
                  </td>

                  <td className={`py-3.5 px-4 font-black text-sm ${tx.amount < 0 ? "text-amber-400" : "text-emerald-400"}`}>
                    {tx.amount < 0 ? `- ${formatBDT(Math.abs(tx.amount), "en")}` : `+ ${formatBDT(tx.amount, "en")}`}
                  </td>

                  <td className="py-3.5 px-4 text-slate-400">
                    {tx.collectedBy}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                      ✓ {tx.status}
                    </span>
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

export default FinanceOverview;
