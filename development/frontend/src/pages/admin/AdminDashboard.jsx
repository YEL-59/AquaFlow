import React, { useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  AdminSidebar,
  AdminTopBar,
  DashboardOverview,
  ProductManager,
  ContentManager,
  OrdersDispatch,
  ZonesManager,
  InventoryManager,
  FinanceOverview,
  RolesManager,
  CustomersManager,
  JarManagement,
  SubscriptionsAdmin,
  StaffSuppliersManager,
  ReportsAnalytics,
  SettingsManager,
  AuditLogsManager,
  USER_ROLES,
} from "../../components/admin";

// Role-to-module permission map
const TAB_PERMISSIONS = {
  dashboard: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT"],
  overview: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT"],
  orders: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  dispatch: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  deliveries: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  customers: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  products: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"],
  inventory: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"],
  "jar-management": ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"],
  jars: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF"],
  subscriptions: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  staff: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT", "DELIVERY_STAFF", "CUSTOMER"],
  suppliers: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  finance: ["SUPER_ADMIN", "ACCOUNTANT"],
  reports: ["SUPER_ADMIN", "ACCOUNTANT", "OPERATIONS_MANAGER"],
  settings: ["SUPER_ADMIN"],
  "audit-logs": ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  audit: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  zones: ["SUPER_ADMIN", "OPERATIONS_MANAGER"],
  content: ["SUPER_ADMIN"],
  roles: ["SUPER_ADMIN", "OPERATIONS_MANAGER", "INVENTORY_STAFF", "ACCOUNTANT", "DELIVERY_STAFF", "CUSTOMER"],
};

export function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from path (e.g. /admin/products -> 'products') or ?tab=...
  const getTab = () => {
    const pathParts = location.pathname.toLowerCase().split("/").filter(Boolean);
    if (pathParts.length >= 2 && pathParts[0] === "admin") {
      return pathParts[1];
    }
    const param = searchParams.get("tab");
    if (param) return param.toLowerCase();
    return "dashboard";
  };

  const activeTab = getTab();

  const [currentRole, setCurrentRole] = useState(() => {
    try {
      return localStorage.getItem("aquaflow_admin_role") || "SUPER_ADMIN";
    } catch {
      return "SUPER_ADMIN";
    }
  });

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem("aquaflow_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("aquaflow_sidebar_collapsed", String(next));
      } catch (e) {}
      return next;
    });
  };

  const handleSelectTab = (tabId) => {
    navigate(`/admin/${tabId.toLowerCase()}`);
  };

  const handleSwitchRole = (newRole) => {
    setCurrentRole(newRole);
    try {
      localStorage.setItem("aquaflow_admin_role", newRole);
    } catch (e) {}
  };

  const normalizedTab = activeTab.toLowerCase();
  const allowedRoles = TAB_PERMISSIONS[normalizedTab] || ["SUPER_ADMIN"];
  const hasAccess = allowedRoles.includes(currentRole) || currentRole === "SUPER_ADMIN";
  const currentRoleObj = USER_ROLES.find((r) => r.id === currentRole) || USER_ROLES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. Left Fixed Sidebar (Collapsible Full / Icon Mode) */}
      <AdminSidebar
        activeTab={normalizedTab}
        onSelectTab={handleSelectTab}
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* 2. Right Main Layout & Content Workspace */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-72"
        } flex flex-col min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950`}
      >
        {/* Sticky Top Bar with Module Dropdown & Sidebar Controls */}
        <AdminTopBar
          activeTab={normalizedTab.toUpperCase()}
          currentRole={currentRole}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSwitchRole={handleSwitchRole}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={handleToggleCollapse}
          onSelectTab={handleSelectTab}
        />

        {/* Dynamic Main Content Container - Full Width Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full space-y-6">
          {!hasAccess ? (
            /* Role Permission Restricted Screen */
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-red-900/40 shadow-2xl text-center space-y-5 animate-in fade-in">
              <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-800 text-red-400 mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">
                  Access Restricted by RBAC Security
                </h3>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  You are currently simulating the <span className="text-amber-400 font-bold">{currentRoleObj.title}</span> role. This module requires permission level:{" "}
                  <span className="font-bold text-sky-400">{allowedRoles.join(" or ")}</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-xs text-slate-300 space-y-1 text-left">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Backend Security Enforcement Active</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Permissions must be enforced by the backend, not merely by hiding dashboard buttons.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSwitchRole("SUPER_ADMIN")}
                  className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition inline-flex items-center gap-2"
                >
                  <span>Switch to Super Admin / Owner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Allowed Module Content */
            <>
              {(normalizedTab === "dashboard" || normalizedTab === "overview") && (
                <DashboardOverview
                  onNavigate={handleSelectTab}
                  currentRole={currentRole}
                />
              )}
              {normalizedTab === "products" && <ProductManager />}
              {normalizedTab === "content" && <ContentManager />}
              {(normalizedTab === "orders" || normalizedTab === "dispatch" || normalizedTab === "deliveries") && (
                <OrdersDispatch />
              )}
              {normalizedTab === "customers" && <CustomersManager />}
              {normalizedTab === "inventory" && <InventoryManager />}
              {(normalizedTab === "jar-management" || normalizedTab === "jars") && <JarManagement />}
              {normalizedTab === "subscriptions" && <SubscriptionsAdmin />}
              {normalizedTab === "staff" && <StaffSuppliersManager defaultSection="STAFF" />}
              {normalizedTab === "suppliers" && <StaffSuppliersManager defaultSection="SUPPLIERS" />}
              {normalizedTab === "finance" && <FinanceOverview />}
              {normalizedTab === "reports" && <ReportsAnalytics />}
              {normalizedTab === "settings" && <SettingsManager />}
              {(normalizedTab === "audit-logs" || normalizedTab === "audit") && <AuditLogsManager />}
              {normalizedTab === "zones" && <ZonesManager />}
              {normalizedTab === "roles" && (
                <RolesManager
                  currentRole={currentRole}
                  onSwitchRole={handleSwitchRole}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
