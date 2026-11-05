import React, { useState } from "react";
import {
  Users,
  Building2,
  Truck,
  Plus,
  ShieldCheck,
  Phone,
  Mail,
  CheckCircle2,
  FileText,
  DollarSign,
  Package,
  Calendar,
  AlertTriangle,
  Award,
  Navigation,
  Clock,
  Printer,
  TrendingUp,
  Star,
  Check,
  X,
  FileSpreadsheet,
} from "lucide-react";

const INITIAL_STAFF = [
  {
    id: "STF-01",
    name: "Tofayel Ahmed",
    role: "SUPER_ADMIN",
    roleName: "Super Admin / Owner",
    phone: "+880 1712-345678",
    email: "tofayel@aquaflow.com.bd",
    hub: "Central Operations",
    shiftStatus: "ON_DUTY",
    checkInTime: "07:30 AM",
    deliveriesToday: 0,
    rating: 5.0,
  },
  {
    id: "STF-02",
    name: "Mahmudul Hasan",
    role: "OPERATIONS_MANAGER",
    roleName: "Operations Manager",
    phone: "+880 1812-445566",
    email: "mahmud@aquaflow.com.bd",
    hub: "Banani Central Hub",
    shiftStatus: "ON_DUTY",
    checkInTime: "07:45 AM",
    deliveriesToday: 0,
    rating: 4.9,
  },
  {
    id: "STF-03",
    name: "Md. Rafiqul Islam",
    role: "DELIVERY_STAFF",
    roleName: "Delivery Hero / Rider",
    phone: "+880 1711-223344",
    email: "rafiq@aquaflow.com.bd",
    hub: "Banani Van #DH-11-8901",
    shiftStatus: "ON_DUTY",
    checkInTime: "08:00 AM",
    deliveriesToday: 18,
    rating: 4.9,
    onTimeRate: "98.4%",
    incentiveBDT: 450,
  },
  {
    id: "STF-04",
    name: "Kamrul Hassan",
    role: "ACCOUNTANT",
    roleName: "Accountant / Cashier",
    phone: "+880 1911-778899",
    email: "kamrul@aquaflow.com.bd",
    hub: "Finance & Accounts",
    shiftStatus: "ON_DUTY",
    checkInTime: "08:15 AM",
    deliveriesToday: 0,
    rating: 4.8,
  },
  {
    id: "STF-05",
    name: "Anisur Rahman",
    role: "INVENTORY_STAFF",
    roleName: "Inventory Manager",
    phone: "+880 1611-001122",
    email: "anis@aquaflow.com.bd",
    hub: "Gulshan Micro-Hub",
    shiftStatus: "ON_DUTY",
    checkInTime: "07:15 AM",
    deliveriesToday: 0,
    rating: 4.9,
  },
  {
    id: "STF-06",
    name: "Hasan Tariq",
    role: "DELIVERY_STAFF",
    roleName: "Delivery Rider",
    phone: "+880 1811-998877",
    email: "hasan@aquaflow.com.bd",
    hub: "Gulshan Van #DH-12-4421",
    shiftStatus: "STANDBY",
    checkInTime: "08:30 AM",
    deliveriesToday: 14,
    rating: 4.8,
    onTimeRate: "96.5%",
    incentiveBDT: 350,
  },
];

const INITIAL_VANS = [
  {
    id: "VAN-01",
    plate: "DH-11-8901",
    assignedRider: "Md. Rafiqul Islam",
    hub: "Banani Hub",
    routeZone: "Banani, Baridhara, Chairmanbari",
    fullJarsLoaded: 40,
    fullJarsRemaining: 22,
    emptyCollected: 18,
    cashPouchBDT: 4850,
    stopsCompleted: 12,
    stopsTotal: 18,
    status: "ON_ROUTE",
  },
  {
    id: "VAN-02",
    plate: "DH-12-4421",
    assignedRider: "Hasan Tariq",
    hub: "Gulshan Hub",
    routeZone: "Gulshan 1, Gulshan 2, Niketan",
    fullJarsLoaded: 45,
    fullJarsRemaining: 15,
    emptyCollected: 30,
    cashPouchBDT: 6200,
    stopsCompleted: 14,
    stopsTotal: 20,
    status: "ON_ROUTE",
  },
  {
    id: "VAN-03",
    plate: "DH-14-1102",
    assignedRider: "Mokhlesur Rahman",
    hub: "Dhanmondi Hub",
    routeZone: "Dhanmondi, Kalabagan, Lalmatia",
    fullJarsLoaded: 35,
    fullJarsRemaining: 0,
    emptyCollected: 35,
    cashPouchBDT: 7400,
    stopsCompleted: 15,
    stopsTotal: 15,
    status: "COMPLETED",
  },
];

const INITIAL_COMPLAINTS = [
  {
    id: "TKT-8901",
    customer: "Grameen Telecom HQ",
    phone: "+880 1713-456789",
    category: "CAP_SEAL_DAMAGED",
    description: "1 jar arrived with slight scuff on holographic seal",
    reportedAt: "Today, 10:15 AM",
    status: "IN_PROGRESS",
    assignedTo: "Mahmudul Hasan (Ops)",
  },
  {
    id: "TKT-8898",
    customer: "Engr. Tanvir Ahmed",
    phone: "+880 1711-223344",
    category: "RESCHEDULE_SLOT",
    description: "Customer requested evening afternoon delivery shift",
    reportedAt: "Today, 08:40 AM",
    status: "RESOLVED",
    assignedTo: "Banani Hub Auto-Dispatch",
  },
];

const INITIAL_SUPPLIERS = [
  {
    id: "SUP-101",
    name: "Meghna Pure Polymer Ltd.",
    supplierType: "Polycarbonate 20L Jars & Caps",
    phone: "+880 2-9887766",
    email: "sales@meghnapolymer.com",
    address: "Tejgaon Industrial Area, Dhaka",
    outstandingPayable: 145000,
    status: "ACTIVE",
  },
  {
    id: "SUP-102",
    name: "Bengal Filter Media Corp.",
    supplierType: "RO Membranes & Carbon",
    phone: "+880 2-8877665",
    email: "contact@bengalfilter.bd",
    address: "Tongi Industrial Estate, Gazipur",
    outstandingPayable: 62000,
    status: "ACTIVE",
  },
  {
    id: "SUP-103",
    name: "OzoneTech Bangladesh",
    supplierType: "Sanitization & UV Disinfection",
    phone: "+880 1711-554433",
    email: "support@ozonetech.com.bd",
    address: "Uttara Sector 3, Dhaka",
    outstandingPayable: 18000,
    status: "ACTIVE",
  },
];

export function StaffSuppliersManager({ defaultSection = "STAFF" }) {
  const [activeSubTab, setActiveSubTab] = useState(defaultSection); // 'STAFF' | 'FLEET' | 'PERFORMANCE' | 'SUPPLIERS' | 'EXCEPTIONS'
  const [staffList, setStaffList] = useState(INITIAL_STAFF);
  const [vans, setVans] = useState(INITIAL_VANS);
  const [suppliersList, setSuppliersList] = useState(INITIAL_SUPPLIERS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);

  // New PO Modal
  const [showPOModal, setShowPOModal] = useState(false);
  const [newPO, setNewPO] = useState({
    supplier: "Meghna Pure Polymer Ltd.",
    item: "20L Polycarbonate Jars (BPA-Free)",
    quantity: 500,
    unitPrice: 420,
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    alert(`✓ Purchase Order for ${newPO.quantity} units submitted to ${newPO.supplier}!`);
    setShowPOModal(false);
  };

  const handleResolveComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "RESOLVED" } : c))
    );
  };

  return (
    <div className="space-y-6 w-full">
      {/* Sub Navigation Bar with 5 Specialized Operations Modules */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab("STAFF")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === "STAFF"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff Directory ({staffList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("FLEET")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === "FLEET"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Fleet Manifests ({vans.length} Vans)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("PERFORMANCE")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === "PERFORMANCE"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Rider KPIs & Incentives</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("SUPPLIERS")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === "SUPPLIERS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Suppliers & POs ({suppliersList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("EXCEPTIONS")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeSubTab === "EXCEPTIONS"
                ? "bg-sky-600 text-white shadow-md shadow-sky-600/20"
                : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Complaints & Exceptions ({complaints.filter((c) => c.status !== "RESOLVED").length})</span>
          </button>
        </div>

        {/* Quick Action Button */}
        {activeSubTab === "SUPPLIERS" ? (
          <button
            type="button"
            onClick={() => setShowPOModal(true)}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Draft Purchase Order</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => alert("✓ Printed live delivery manifest for today's active vans.")}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>Print Manifest</span>
          </button>
        )}
      </div>

      {/* ===================== TAB 1: STAFF DIRECTORY ===================== */}
      {activeSubTab === "STAFF" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Total Personnel</div>
              <div className="text-xl font-black text-white mt-0.5">{staffList.length} Accounts</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">On Duty Today</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">
                {staffList.filter((s) => s.shiftStatus === "ON_DUTY").length} Checked In
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Delivery Van Fleet</div>
              <div className="text-xl font-black text-sky-400 mt-0.5">3 Vans Active</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Governance</div>
              <div className="text-xl font-black text-purple-400 mt-0.5">6 RBAC Roles</div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">Staff Name & ID</th>
                    <th className="px-4 py-3.5">Role Designation</th>
                    <th className="px-4 py-3.5">Assigned Location</th>
                    <th className="px-4 py-3.5">Shift Status</th>
                    <th className="px-4 py-3.5">Check-In</th>
                    <th className="px-4 py-3.5">Contact Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {staffList.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white text-sm">{s.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{s.id}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-950/80 text-sky-300 border border-sky-800">
                          {s.roleName}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-slate-300">{s.hub}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.shiftStatus === "ON_DUTY"
                              ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {s.shiftStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-400">{s.checkInTime}</td>
                      <td className="px-4 py-3.5 text-slate-300">{s.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: FLEET MANIFESTS ===================== */}
      {activeSubTab === "FLEET" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vans.map((v) => (
              <div
                key={v.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-mono font-black text-white text-sm">#{v.plate}</div>
                      <div className="text-[10px] text-slate-400">{v.hub}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      v.status === "ON_ROUTE"
                        ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Hero:</span>
                    <span className="font-bold text-white">{v.assignedRider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route Zone:</span>
                    <span className="font-semibold text-sky-300 truncate max-w-[160px]">{v.routeZone}</span>
                  </div>
                </div>

                {/* Progress bar of stops */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Stops Progress</span>
                    <span className="font-bold text-white">
                      {v.stopsCompleted} / {v.stopsTotal} completed
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400"
                      style={{ width: `${(v.stopsCompleted / v.stopsTotal) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">Full Left</div>
                    <div className="font-black text-sky-400 text-sm">{v.fullJarsRemaining}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">Empties</div>
                    <div className="font-black text-cyan-400 text-sm">{v.emptyCollected}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400 uppercase">Cash Collected</div>
                    <div className="font-black text-emerald-400 text-sm">৳{v.cashPouchBDT}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== TAB 3: RIDER INCENTIVES & KPIS ===================== */}
      {activeSubTab === "PERFORMANCE" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Rider Performance, On-Time Rates & Daily Commission</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Rider Name</th>
                    <th className="px-4 py-3">Assigned Van</th>
                    <th className="px-4 py-3">Deliveries Today</th>
                    <th className="px-4 py-3">On-Time Rate</th>
                    <th className="px-4 py-3">Customer Rating</th>
                    <th className="px-4 py-3">Daily Commission Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {staffList
                    .filter((s) => s.role === "DELIVERY_STAFF")
                    .map((r) => (
                      <tr key={r.id}>
                        <td className="px-4 py-3 font-bold text-white">{r.name}</td>
                        <td className="px-4 py-3 text-slate-300 font-mono">{r.hub}</td>
                        <td className="px-4 py-3 font-bold text-sky-400 text-sm">{r.deliveriesToday} stops</td>
                        <td className="px-4 py-3 font-bold text-emerald-400">{r.onTimeRate}</td>
                        <td className="px-4 py-3 text-amber-300 font-bold flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span>{r.rating} / 5.0</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-emerald-400 text-sm">
                          ৳{r.incentiveBDT} <span className="text-[10px] text-slate-400">(৳25/stop)</span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 4: SUPPLIERS & PO CREATOR ===================== */}
      {activeSubTab === "SUPPLIERS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Licensed Suppliers</div>
              <div className="text-xl font-black text-white mt-0.5">{suppliersList.length} Verified</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Accounts Payable</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">
                ৳{suppliersList.reduce((sum, sup) => sum + sup.outstandingPayable, 0).toLocaleString()}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Standards</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">BSTI / ISO 9001</div>
            </div>
          </div>

          {/* Supplier Directory Table */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">Supplier Name & ID</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Factory Location</th>
                    <th className="px-4 py-3.5">Contact Phone & Email</th>
                    <th className="px-4 py-3.5">Outstanding Payable</th>
                    <th className="px-4 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {suppliersList.map((sup) => (
                    <tr key={sup.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-white text-sm">{sup.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{sup.id}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800">
                          {sup.supplierType}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-300">{sup.address}</td>
                      <td className="px-4 py-3.5 text-slate-300">
                        <div>{sup.phone}</div>
                        <div className="text-[11px] text-slate-500">{sup.email}</div>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-amber-400">
                        ৳{sup.outstandingPayable.toLocaleString()}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Draft PO Modal */}
          {showPOModal && (
            <form
              onSubmit={handleCreatePO}
              className="p-6 rounded-3xl bg-slate-900 border border-sky-500 shadow-2xl space-y-4 max-w-lg mx-auto"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-400" />
                <span>New Supplier Purchase Order (PO)</span>
              </h3>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Select Supplier</label>
                <select
                  value={newPO.supplier}
                  onChange={(e) => setNewPO({ ...newPO, supplier: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                >
                  {suppliersList.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.supplierType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newPO.quantity}
                    onChange={(e) => setNewPO({ ...newPO, quantity: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Unit Cost (BDT)</label>
                  <input
                    type="number"
                    min="1"
                    value={newPO.unitPrice}
                    onChange={(e) => setNewPO({ ...newPO, unitPrice: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between">
                <span className="text-slate-400">Total PO Value:</span>
                <span className="font-bold text-emerald-400">
                  ৳{(newPO.quantity * newPO.unitPrice).toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold">
                  Submit Purchase Order
                </button>
                <button
                  type="button"
                  onClick={() => setShowPOModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ===================== TAB 5: COMPLAINTS & EXCEPTIONS ===================== */}
      {activeSubTab === "EXCEPTIONS" && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Customer Complaints & Operational Exceptions Center</span>
            </h3>

            <div className="space-y-3">
              {complaints.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-sky-400">{c.id}</span>
                      <span className="text-xs font-bold text-white">{c.customer}</span>
                      <span className="text-[10px] text-slate-500">({c.phone})</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{c.description}</p>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Reported: {c.reportedAt} • Assigned to: {c.assignedTo}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        c.status === "RESOLVED"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-amber-950 text-amber-400 border border-amber-800"
                      }`}
                    >
                      {c.status}
                    </span>
                    {c.status !== "RESOLVED" && (
                      <button
                        type="button"
                        onClick={() => handleResolveComplaint(c.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSuppliersManager;
