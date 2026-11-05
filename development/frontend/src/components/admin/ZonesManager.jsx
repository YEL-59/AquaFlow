import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Clock,
  DollarSign,
  Save,
  CheckCircle2,
  Check,
  ShieldCheck,
  Building,
} from "lucide-react";
import { formatBDT } from "../../lib/utils";
import { Button } from "../ui/button";
import { api } from "../../services/api";

const INITIAL_DHAKA_ZONES = [
  { code: "GULSHAN", nameEn: "Gulshan (1 & 2)", nameBn: "গুলশান (১ ও ২)", deliveryFee: 50, minimumOrderAmount: 150, defaultLeadTimeHours: 2, status: "ACTIVE" },
  { code: "BANANI", nameEn: "Banani & DOHS", nameBn: "বনানী ও ডিওএইচএস", deliveryFee: 50, minimumOrderAmount: 150, defaultLeadTimeHours: 2, status: "ACTIVE" },
  { code: "DHANMONDI", nameEn: "Dhanmondi", nameBn: "ধানমন্ডি", deliveryFee: 60, minimumOrderAmount: 200, defaultLeadTimeHours: 3, status: "ACTIVE" },
  { code: "UTTARA", nameEn: "Uttara (Sectors 1-14)", nameBn: "উত্তরা (সেক্টর ১-১৪)", deliveryFee: 60, minimumOrderAmount: 200, defaultLeadTimeHours: 3, status: "ACTIVE" },
  { code: "BASHUNDHARA", nameEn: "Bashundhara R/A", nameBn: "বসুন্ধরা আ/এ", deliveryFee: 50, minimumOrderAmount: 150, defaultLeadTimeHours: 2, status: "ACTIVE" },
  { code: "MIRPUR", nameEn: "Mirpur (1, 2, 10, 11)", nameBn: "মিরপুর (১, ২, ১০, ১১)", deliveryFee: 70, minimumOrderAmount: 200, defaultLeadTimeHours: 3, status: "ACTIVE" },
  { code: "MOHAMMADPUR", nameEn: "Mohammadpur", nameBn: "মোহাম্মদপুর", deliveryFee: 70, minimumOrderAmount: 200, defaultLeadTimeHours: 3, status: "ACTIVE" },
];

export function ZonesManager() {
  const { t } = useTranslation();
  const [zones, setZones] = useState(() => {
    try {
      const saved = localStorage.getItem("aquaflow_admin_zones");
      return saved ? JSON.parse(saved) : INITIAL_DHAKA_ZONES;
    } catch {
      return INITIAL_DHAKA_ZONES;
    }
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUpdateField = (code, field, value) => {
    setZones((prev) =>
      prev.map((z) => (z.code === code ? { ...z, [field]: value } : z))
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem("aquaflow_admin_zones", JSON.stringify(zones));
    } catch (e) {}
    showToast("✓ Delivery zone fees & lead times saved successfully!");
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

      {/* Top Info Banner */}
      <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>Dhaka Metro Delivery Zones & Tier Pricing</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Set neighborhood delivery fees, minimum order values, and dispatch lead times.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Zone Rules</span>
        </button>
      </div>

      {/* Zones Table */}
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Zone Code & Name</th>
                <th className="py-3.5 px-4">Delivery Fee (৳ BDT)</th>
                <th className="py-3.5 px-4">Min. Order (৳ BDT)</th>
                <th className="py-3.5 px-4">Express Lead Time</th>
                <th className="py-3.5 px-4">Service Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {zones.map((zone) => (
                <tr key={zone.code} className="hover:bg-slate-700/30 transition">
                  {/* Zone Info */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{zone.nameEn}</div>
                    <div className="text-[11px] text-slate-400">{zone.nameBn}</div>
                    <div className="text-[10px] font-mono text-sky-400 mt-0.5">{zone.code}</div>
                  </td>

                  {/* Delivery Fee Input */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">৳</span>
                      <input
                        type="number"
                        value={zone.deliveryFee}
                        onChange={(e) =>
                          handleUpdateField(zone.code, "deliveryFee", parseFloat(e.target.value) || 0)
                        }
                        className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </td>

                  {/* Minimum Order Input */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">৳</span>
                      <input
                        type="number"
                        value={zone.minimumOrderAmount}
                        onChange={(e) =>
                          handleUpdateField(
                            zone.code,
                            "minimumOrderAmount",
                            parseFloat(e.target.value) || 0
                          )
                        }
                        className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                    </div>
                  </td>

                  {/* Lead Time Input */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={zone.defaultLeadTimeHours}
                        onChange={(e) =>
                          handleUpdateField(
                            zone.code,
                            "defaultLeadTimeHours",
                            parseInt(e.target.value, 10) || 2
                          )
                        }
                        className="w-16 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-sky-400 font-bold focus:outline-none focus:ring-1 focus:ring-sky-500"
                      />
                      <span className="text-slate-400">Hours</span>
                    </div>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateField(
                          zone.code,
                          "status",
                          zone.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                        )
                      }
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition flex items-center gap-1 ${
                        zone.status === "ACTIVE"
                          ? "bg-emerald-950/80 text-emerald-300 border-emerald-800"
                          : "bg-slate-900 text-slate-500 border-slate-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          zone.status === "ACTIVE" ? "bg-emerald-400" : "bg-slate-600"
                        }`}
                      />
                      <span>{zone.status === "ACTIVE" ? "Active" : "Disabled"}</span>
                    </button>
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

export default ZonesManager;
