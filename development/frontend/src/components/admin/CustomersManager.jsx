import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Phone,
  MapPin,
  Building2,
  CheckCircle2,
  ShieldAlert,
  CreditCard,
  RotateCcw,
  Plus,
} from "lucide-react";

const INITIAL_CUSTOMERS = [
  {
    id: "CUST-1001",
    displayName: "Engr. Tanvir Ahmed",
    customerType: "HOUSEHOLD",
    phone: "+880 1711-223344",
    neighborhood: "Banani",
    address: "House 14, Road 11, Block D, Banani",
    creditLimit: 0,
    outstandingJars: 2,
    depositLiability: 400,
    totalOrders: 18,
    status: "ACTIVE",
  },
  {
    id: "CUST-1002",
    displayName: "Grameen Telecom HQ",
    customerType: "BUSINESS",
    phone: "+880 1713-456789",
    neighborhood: "Gulshan-1",
    address: "Navana Tower, Level 6, Gulshan South Ave",
    creditLimit: 25000,
    outstandingJars: 25,
    depositLiability: 5000,
    totalOrders: 64,
    status: "ACTIVE",
  },
  {
    id: "CUST-1003",
    displayName: "Bistro 99 Cafe & Grill",
    customerType: "BUSINESS",
    phone: "+880 1819-234567",
    neighborhood: "Dhanmondi",
    address: "Road 27 (Old), House 45, Dhanmondi",
    creditLimit: 15000,
    outstandingJars: 12,
    depositLiability: 2400,
    totalOrders: 42,
    status: "ACTIVE",
  },
  {
    id: "CUST-1004",
    displayName: "Mrs. Shahnaz Begum",
    customerType: "HOUSEHOLD",
    phone: "+880 1912-887766",
    neighborhood: "Uttara",
    address: "Sector 4, Road 9, House 12, Uttara",
    creditLimit: 0,
    outstandingJars: 3,
    depositLiability: 600,
    totalOrders: 9,
    status: "ACTIVE",
  },
  {
    id: "CUST-1005",
    displayName: "Dhaka Law Associates",
    customerType: "BUSINESS",
    phone: "+880 1611-332211",
    neighborhood: "Baridhara",
    address: "Park Road, House 8, Baridhara Diplomatic",
    creditLimit: 30000,
    outstandingJars: 8,
    depositLiability: 1600,
    totalOrders: 31,
    status: "ACTIVE",
  },
];

export function CustomersManager() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.neighborhood.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "ALL" || c.customerType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            <span>Customer Directory & B2B Accounts</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage residential households, commercial offices, credit limits, and container liabilities across Dhaka.
          </p>
        </div>

        <button
          type="button"
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Customer</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Accounts</div>
          <div className="text-xl font-black text-white mt-0.5">{customers.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">B2B Corporate Accounts</div>
          <div className="text-xl font-black text-sky-400 mt-0.5">
            {customers.filter((c) => c.customerType === "BUSINESS").length}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Jars With Clients</div>
          <div className="text-xl font-black text-cyan-400 mt-0.5">
            {customers.reduce((sum, c) => sum + c.outstandingJars, 0)} Jars
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Deposit Liabilities</div>
          <div className="text-xl font-black text-emerald-400 mt-0.5">
            ৳{customers.reduce((sum, c) => sum + c.depositLiability, 0)}
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, phone, area..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "ALL" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            All Accounts
          </button>
          <button
            type="button"
            onClick={() => setFilterType("HOUSEHOLD")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "HOUSEHOLD" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            Household
          </button>
          <button
            type="button"
            onClick={() => setFilterType("BUSINESS")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterType === "BUSINESS" ? "bg-sky-600 text-white" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            B2B Corporate
          </button>
        </div>
      </div>

      {/* Customer Directory Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3.5">Customer Name & ID</th>
                <th className="px-4 py-3.5">Type</th>
                <th className="px-4 py-3.5">Phone & Neighborhood</th>
                <th className="px-4 py-3.5">Jars Held</th>
                <th className="px-4 py-3.5">Credit Limit</th>
                <th className="px-4 py-3.5">Total Orders</th>
                <th className="px-4 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/50 transition">
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-white text-sm">{c.displayName}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">{c.id}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.customerType === "BUSINESS"
                          ? "bg-purple-950/80 text-purple-300 border border-purple-800"
                          : "bg-sky-950/80 text-sky-300 border border-sky-800"
                      }`}
                    >
                      {c.customerType === "BUSINESS" ? "B2B Office" : "Household"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-slate-200">{c.phone}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-sky-400" />
                      <span>{c.neighborhood}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-cyan-400">{c.outstandingJars} Jars</div>
                    <div className="text-[10px] text-slate-400">৳{c.depositLiability} deposit</div>
                  </td>
                  <td className="px-4 py-3.5">
                    {c.creditLimit > 0 ? (
                      <span className="font-bold text-emerald-400">৳{c.creditLimit}</span>
                    ) : (
                      <span className="text-slate-500">COD Only</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-300">{c.totalOrders}</td>
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
    </div>
  );
}

export default CustomersManager;
