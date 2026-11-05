import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Building2,
  Clock,
  DollarSign,
  Globe,
  Save,
  CheckCircle2,
  Phone,
  RotateCcw,
} from "lucide-react";

export function SettingsManager() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "AquaFlow Dhaka Ltd.",
    bstiLicenseNo: "BSTI/CM/BDS-1240-2021/DH-782",
    emergencyHotline: "+880 9612-AQUA (2782)",
    whatsappDispatch: "+880 1712-345678",
    defaultDeliveryFee: 50,
    minimumOrderAmount: 150,
    standardJarDeposit: 200,
    morningSlotCutoff: "07:00 AM",
    afternoonSlotCutoff: "01:00 PM",
    enableCOD: true,
    enableBKashOnline: true,
    defaultLanguage: "bn",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-400" />
            <span>Platform Governance & Business Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure BSTI certification credentials, Dhaka delivery fees, cutoff rules, and payment gateways.
          </p>
        </div>

        {saved && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved Successfully</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Legal & Regulatory */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>BSTI Certification & Business Identity</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Company Registered Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">BSTI License (BDS 1240:2021)</label>
              <input
                type="text"
                value={settings.bstiLicenseNo}
                onChange={(e) => setSettings({ ...settings, bstiLicenseNo: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-emerald-400 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Customer Support Hotline</label>
              <input
                type="text"
                value={settings.emergencyHotline}
                onChange={(e) => setSettings({ ...settings, emergencyHotline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">WhatsApp Rider Dispatch</label>
              <input
                type="text"
                value={settings.whatsappDispatch}
                onChange={(e) => setSettings({ ...settings, whatsappDispatch: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery Rules & Fees */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-sky-400" />
            <span>Pricing, Deposits & Slot Cutoffs</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Default Delivery Fee (BDT)</label>
              <input
                type="number"
                value={settings.defaultDeliveryFee}
                onChange={(e) => setSettings({ ...settings, defaultDeliveryFee: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Minimum Order Amount (BDT)</label>
              <input
                type="number"
                value={settings.minimumOrderAmount}
                onChange={(e) => setSettings({ ...settings, minimumOrderAmount: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">20L Jar Deposit (BDT)</label>
              <input
                type="number"
                value={settings.standardJarDeposit}
                onChange={(e) => setSettings({ ...settings, standardJarDeposit: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-cyan-400 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Morning Slot Cutoff (Asia/Dhaka)</label>
              <input
                type="text"
                value={settings.morningSlotCutoff}
                onChange={(e) => setSettings({ ...settings, morningSlotCutoff: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">Afternoon Slot Cutoff (Asia/Dhaka)</label>
              <input
                type="text"
                value={settings.afternoonSlotCutoff}
                onChange={(e) => setSettings({ ...settings, afternoonSlotCutoff: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* 3. Payment Methods */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Active Payment Gateways</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableCOD}
                onChange={(e) => setSettings({ ...settings, enableCOD: e.target.checked })}
                className="rounded text-sky-600 focus:ring-0"
              />
              <div>
                <div className="text-xs font-bold text-white">Cash on Delivery (COD)</div>
                <div className="text-[11px] text-slate-400">Riders collect cash at doorstep and reconcile with supervisor</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableBKashOnline}
                onChange={(e) => setSettings({ ...settings, enableBKashOnline: e.target.checked })}
                className="rounded text-sky-600 focus:ring-0"
              />
              <div>
                <div className="text-xs font-bold text-white">bKash Merchant Payment Gateway</div>
                <div className="text-[11px] text-slate-400">Direct instant mobile wallet payment with verified webhook reconciliation</div>
              </div>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/25 transition inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes to Production</span>
        </button>
      </form>
    </div>
  );
}

export default SettingsManager;
