import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FileText,
  Truck,
  MapPin,
  RotateCcw,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Droplets,
  LogOut,
  X,
  UserCheck,
  Building2,
  Users,
  RefreshCw,
  BarChart3,
  Settings,
  Navigation,
  Building,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldAlert,
} from "lucide-react";
import { USER_ROLES } from "./RolesManager";

export function AdminSidebar({
  activeTab,
  onSelectTab,
  currentRole,
  onSwitchRole,
  isOpenMobile,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const navigate = useNavigate();
  const currentRoleObj = USER_ROLES.find((r) => r.id === currentRole) || USER_ROLES[0];

  const normalizedActive = (activeTab || "dashboard").toLowerCase();

  const NAV_SECTIONS = [
    {
      title: "OPERATIONS & DISPATCH",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT"] },
        { id: "orders", label: "Orders", icon: Truck, badge: "Queue", path: "/admin/orders", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
        { id: "deliveries", label: "Deliveries", icon: Navigation, path: "/admin/deliveries", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
        { id: "subscriptions", label: "Subscriptions", icon: RefreshCw, badge: "Daily", path: "/admin/subscriptions", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
        { id: "customers", label: "Customers", icon: Users, path: "/admin/customers", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
      ],
    },
    {
      title: "CATALOG & SUPPLY CHAIN",
      items: [
        { id: "products", label: "Products", icon: Package, badge: "Catalog", path: "/admin/products", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"] },
        { id: "inventory", label: "Inventory", icon: Building2, path: "/admin/inventory", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"] },
        { id: "jar-management", label: "Jar Management", icon: RotateCcw, badge: "20L Ledger", path: "/admin/jar-management", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"] },
        { id: "suppliers", label: "Suppliers", icon: Building, path: "/admin/suppliers", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
      ],
    },
    {
      title: "FINANCE & GOVERNANCE",
      items: [
        { id: "finance", label: "Finance", icon: DollarSign, badge: "Ledger", path: "/admin/finance", allowed: ["SUPER_ADMIN", "ACCOUNTANT"] },
        { id: "reports", label: "Reports", icon: BarChart3, path: "/admin/reports", allowed: ["SUPER_ADMIN", "ACCOUNTANT", "OPERATIONS_MANAGER"] },
        { id: "staff", label: "Staff & RBAC", icon: ShieldCheck, badge: "6 Roles", path: "/admin/staff", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT", "DELIVERY_STAFF", "CUSTOMER"] },
        { id: "audit-logs", label: "Audit Logs", icon: ShieldAlert, badge: "PRD 12.10", path: "/admin/audit-logs", allowed: ["SUPER_ADMIN", "OPERATIONS_MANAGER"] },
        { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings", allowed: ["SUPER_ADMIN"] },
      ],
    },
  ];

  const handleItemClick = (item) => {
    onSelectTab(item.id);
    navigate(item.path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Container with Collapsible Width */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-slate-950 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out lg:translate-x-0 ${
          isCollapsed ? "w-20" : "w-72"
        } ${isOpenMobile ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top: Brand Header */}
        <div className="flex flex-col">
          <div
            className={`h-16 px-4 flex items-center border-b border-slate-800/80 ${
              isCollapsed ? "justify-center" : "justify-between px-6"
            }`}
          >
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-3 group"
              title="AquaFlow Dhaka Admin OS"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform shrink-0">
                <Droplets className="h-5 w-5 fill-white/20 stroke-white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight text-white leading-none">
                    Aqua<span className="text-sky-400">Flow</span>
                  </span>
                  <span className="text-[9px] font-bold text-sky-400/90 tracking-widest uppercase mt-0.5">
                    Admin OS
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse / Expand Toggle Button */}
            {!isCollapsed ? (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition"
                  title="Collapse Sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {/* Mobile Close Button */}
                <button
                  onClick={onCloseMobile}
                  className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 transition absolute -right-3.5 top-5 bg-slate-950 shadow-md"
                title="Expand Sidebar"
              >
                <ChevronRight className="w-4 h-4 text-sky-400" />
              </button>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          {!isCollapsed ? (
            <div className="p-3.5 mx-3 my-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                    TA
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white leading-none">Tofayel Ahmed</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Administrator</div>
                  </div>
                </div>
                <span className="text-base">{currentRoleObj.icon}</span>
              </div>

              {/* Role Switcher Dropdown */}
              <div className="pt-1.5 border-t border-slate-800">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                  <span>Active Role Simulator</span>
                  <span className="text-emerald-400 text-[8px] font-bold">Enforced</span>
                </div>
                <select
                  value={currentRole}
                  onChange={(e) => onSwitchRole(e.target.value)}
                  className="w-full px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 cursor-pointer"
                >
                  {USER_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.icon} {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <div className="p-2 mx-2 my-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-1">
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-inner cursor-pointer"
                title={`Logged in: Tofayel Ahmed (${currentRoleObj.title})`}
              >
                TA
              </div>
              <span className="text-xs" title={currentRoleObj.title}>
                {currentRoleObj.icon}
              </span>
            </div>
          )}

          {/* Navigation Links List */}
          <div
            className={`px-3 space-y-4 overflow-y-auto ${
              isCollapsed ? "max-h-[calc(100vh-170px)] px-2" : "max-h-[calc(100vh-270px)]"
            } scrollbar-thin scrollbar-thumb-slate-800`}
          >
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-3 text-[9px] font-black uppercase tracking-wider text-slate-500">
                    {section.title}
                  </div>
                )}
                {section.items.map((item) => {
                  const isActive =
                    normalizedActive === item.id ||
                    (item.id === "dashboard" && (normalizedActive === "overview" || normalizedActive === ""));
                  const isAllowed = item.allowed.includes(currentRole) || currentRole === "SUPER_ADMIN";
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item)}
                      title={isCollapsed ? `${item.label} (${isAllowed ? "Accessible" : "Restricted"})` : undefined}
                      className={`w-full flex items-center rounded-xl text-xs font-bold transition-all relative group ${
                        isCollapsed
                          ? "justify-center p-2.5"
                          : "justify-between px-3 py-2"
                      } ${
                        isActive
                          ? "bg-gradient-to-r from-sky-600 to-cyan-600 text-white shadow-md shadow-sky-600/20"
                          : isAllowed
                          ? "text-slate-300 hover:text-white hover:bg-slate-900/90"
                          : "text-slate-600 hover:bg-slate-900/40 cursor-not-allowed opacity-60"
                      }`}
                    >
                      <div className={`flex items-center gap-2.5 ${isCollapsed ? "justify-center" : ""}`}>
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : isAllowed ? "text-slate-400" : "text-slate-600"}`} />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>

                      {!isCollapsed && (
                        <div className="flex items-center gap-1.5">
                          {!isAllowed && (
                            <span className="text-[10px] text-slate-500 font-normal">🔒</span>
                          )}
                          {item.badge && (
                            <span
                              className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-900 text-slate-400 border border-slate-800"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Tooltip on Collapsed Mode */}
                      {isCollapsed && (
                        <div className="hidden group-hover:block absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white border border-slate-700 text-xs rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none">
                          {item.label} {item.badge ? `(${item.badge})` : ""}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions: Storefront & Delivery App */}
        <div className={`p-3 border-t border-slate-800/80 bg-slate-950/90 space-y-1.5 ${isCollapsed ? "px-2 text-center" : ""}`}>
          {!isCollapsed ? (
            <>
              <Link
                to="/"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition border border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span>Back to Storefront</span>
                </div>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </Link>

              <Link
                to="/delivery/dashboard"
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-950/80 text-purple-300 text-xs font-bold transition border border-purple-900/60"
              >
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-purple-400" />
                  <span>Rider App View</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-200">
                  Mobile
                </span>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                title="Back to Storefront"
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-800"
              >
                <ExternalLink className="w-4 h-4 text-sky-400" />
              </Link>
              <Link
                to="/delivery/dashboard"
                title="Rider App View"
                className="p-2 rounded-xl bg-purple-950/40 hover:bg-purple-950/80 text-purple-300 flex items-center justify-center border border-purple-900/60"
              >
                <Truck className="w-4 h-4 text-purple-400" />
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
