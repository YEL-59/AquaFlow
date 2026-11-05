import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Bell,
  ExternalLink,
  ShieldCheck,
  Droplets,
  Search,
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  LayoutDashboard,
  Truck,
  Navigation,
  RefreshCw,
  Users,
  Package,
  Building2,
  RotateCcw,
  Building,
  DollarSign,
  BarChart3,
  Settings,
  Check,
  ShieldAlert,
} from "lucide-react";
import { USER_ROLES } from "./RolesManager";

const TAB_TITLES = {
  DASHBOARD: "Dashboard Overview & Operational Health",
  OVERVIEW: "Dashboard Overview & Operational Health",
  ORDERS: "Orders Dispatch & Real-Time Queue",
  DELIVERIES: "Delivery Manifests & Fleet Routing",
  SUBSCRIPTIONS: "Recurring Subscriptions & Occurrence Generation",
  CUSTOMERS: "Customer Directory & B2B Corporate Accounts",
  PRODUCTS: "Product Catalog & Pricing Management",
  INVENTORY: "Micro-Hub Stock Balances & Receipts",
  "JAR-MANAGEMENT": "Reusable 20L Container Ledger & Liabilities",
  JARS: "Reusable 20L Container Ledger & Liabilities",
  SUPPLIERS: "Suppliers & Packaging Procurement",
  STAFF: "Staff Directory, Shifts & RBAC Matrix",
  FINANCE: "Cash Reconciliation & Financial Ledger",
  REPORTS: "Performance Analytics & Sales Margin Reports",
  "AUDIT-LOGS": "Audit Logs, Security Trail & PRD 12.10 Compliance",
  AUDIT: "Audit Logs, Security Trail & PRD 12.10 Compliance",
  SETTINGS: "Platform Governance & Delivery Rules",
  ZONES: "Dhaka Delivery Zones & Fees",
  CONTENT: "Website CMS & Dynamic Copy",
};

const MODULE_OPTIONS = [
  { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders & Live Dispatch", icon: Truck },
  { id: "deliveries", label: "Delivery Manifests", icon: Navigation },
  { id: "subscriptions", label: "Subscriptions Engine", icon: RefreshCw },
  { id: "customers", label: "Customers & B2B", icon: Users },
  { id: "products", label: "Products & Pricing", icon: Package },
  { id: "inventory", label: "Inventory Balances", icon: Building2 },
  { id: "jar-management", label: "Jar Management & Ledger", icon: RotateCcw },
  { id: "suppliers", label: "Suppliers & POs", icon: Building },
  { id: "finance", label: "Finance & Reconciliation", icon: DollarSign },
  { id: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { id: "staff", label: "Staff & RBAC", icon: ShieldCheck },
  { id: "audit-logs", label: "Audit Logs & Security", icon: ShieldAlert },
  { id: "settings", label: "Governance Settings", icon: Settings },
];

export function AdminTopBar({
  activeTab,
  currentRole,
  onOpenMobileSidebar,
  onSwitchRole,
  isSidebarCollapsed = false,
  onToggleSidebar,
  onSelectTab,
}) {
  const currentRoleObj = USER_ROLES.find((r) => r.id === currentRole) || USER_ROLES[0];
  const title = TAB_TITLES[activeTab] || "Admin Console";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Desktop Sidebar Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Open Navigation Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Sidebar Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="hidden lg:flex p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          title={isSidebarCollapsed ? "Expand Sidebar (Open)" : "Collapse Sidebar (Close)"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-sky-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Breadcrumb & Section Title */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>AquaFlow Admin</span>
            <span>/</span>
            <span className="text-sky-400">{activeTab}</span>
          </div>
          <h2 className="text-sm sm:text-base font-extrabold text-white truncate max-w-xs sm:max-w-md">
            {title}
          </h2>
        </div>
      </div>

      {/* Right: Sidebar Control Dropdown, Role Pill & Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Dropdown: Sidebar Toggle & Quick Module Navigation */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 text-xs font-bold transition shadow-sm"
          >
            <span className="text-sky-400">Sidebar</span>
            <span className="text-[11px] text-slate-400">
              {isSidebarCollapsed ? "(Closed)" : "(Open)"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                <span className="font-bold text-white">Sidebar View Control</span>
                <button
                  type="button"
                  onClick={() => {
                    onToggleSidebar();
                    setIsDropdownOpen(false);
                  }}
                  className="px-2 py-0.5 rounded-md bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold"
                >
                  {isSidebarCollapsed ? "Open Sidebar" : "Close Sidebar"}
                </button>
              </div>

              <div className="px-3 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Jump to Module
              </div>

              <div className="max-h-64 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-slate-800">
                {MODULE_OPTIONS.map((m) => {
                  const Icon = m.icon;
                  const isCurrent = activeTab.toLowerCase() === m.id.toLowerCase();
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        if (onSelectTab) onSelectTab(m.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between hover:bg-slate-800 transition ${
                        isCurrent ? "text-sky-400 bg-slate-950 font-bold" : "text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{m.label}</span>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Active Role Indicator Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200">
          <span>{currentRoleObj.icon}</span>
          <span>{currentRoleObj.title}</span>
        </div>

        {/* Live Operational Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/80 text-[11px] font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Hubs Online</span>
        </div>

        {/* View Live Store */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition"
          title="Open Public Customer Storefront in New Tab"
        >
          <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          <span>Live Store</span>
        </Link>
      </div>
    </header>
  );
}

export default AdminTopBar;
