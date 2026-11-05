import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  ShoppingBag,
  User,
  Menu,
  X,
  PhoneCall,
  LayoutDashboard,
  Truck,
  Sparkles,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { useContent } from "../../context/ContentContext";

export function Navbar({ cartCount = 0 }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const { content } = useContent();
  const isBn = i18n.language === "bn";

  const announcement = content?.announcement;
  const contact = content?.contact || {};

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/products", label: t("nav.shop") },
    { href: "/subscriptions", label: t("nav.subscriptions") },
    { href: "/delivery-areas", label: t("nav.deliveryAreas") },
    { href: "/quality", label: t("nav.quality") },
  ];

  return (
    <>
      {/* Dynamic Top Announcement Banner */}
      {announcement?.enabled && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-700 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2 shadow-inner"
        >
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            {announcement.badgeText || "OFFER"}
          </span>
          <span>{isBn ? announcement.textBn : announcement.textEn}</span>
        </motion.div>
      )}

      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
        <div className="w-full max-w-[1720px] mx-auto">
          <div className="rounded-3xl px-4 sm:px-7 py-2.5 sm:py-3 flex items-center justify-between border border-sky-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-sky-500/5 relative overflow-hidden">
            {/* Ambient Background Glow Bar */}
            <div className="absolute inset-x-0 -bottom-1 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-60" />

            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-md shadow-sky-500/30"
              >
                <Droplets className="h-5 w-5 sm:h-6 sm:w-6 fill-white/25 stroke-white" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                  Aqua<span className="text-[#0284c7]">Flow</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 dark:text-slate-400 tracking-wider uppercase mt-0.5">
                  Dhaka Pure Water
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links with Animated Active Indicator */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                const isHovered = hoveredPath === link.href;

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={cn(
                      "relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors z-10",
                      isActive
                        ? "text-[#0284c7] dark:text-sky-400"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-sky-100/80 dark:bg-sky-950/60 rounded-xl -z-10 border border-sky-200 dark:border-sky-800/60"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="navbar-hover-pill"
                        className="absolute inset-0 bg-slate-100/70 dark:bg-slate-800/50 rounded-xl -z-10"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Cluster */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Phone Badge */}
              <a
                href={`tel:${contact.hotline || "+8809612278235"}`}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-900 text-[#0284c7] text-xs font-black hover:bg-sky-100 transition-colors"
              >
                <PhoneCall className="h-3.5 w-3.5 text-[#0284c7]" />
                <span>{contact.hotlineDisplay || "09612-AQUA"}</span>
              </a>

              {/* Quick Portals Switcher */}
              <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-sky-600 transition-all shadow-none hover:shadow-sm"
                  title="Backend Admin Operations Center"
                >
                  <LayoutDashboard className="h-3 w-3 text-sky-500" />
                  <span>Admin</span>
                </Link>
                <Link
                  to="/delivery"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-emerald-600 transition-all shadow-none hover:shadow-sm"
                  title="Delivery Fleet Courier Portal"
                >
                  <Truck className="h-3 w-3 text-emerald-500" />
                  <span>Fleet</span>
                </Link>
              </div>

              <LanguageSwitcher />

              {/* Cart Button with Animated Bounce */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-sky-50 hover:text-[#0284c7] border border-slate-200/80 dark:border-slate-700 transition-colors"
                aria-label="View Shopping Cart"
              >
                <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-[10px] font-black text-white shadow-md shadow-sky-500/40"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Sign In / Account Button */}
              <Link to="/auth/login" className="hidden sm:inline-flex">
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] hover:from-[#0369a1] hover:to-[#0284c7] text-xs font-bold px-4 py-2 shadow-sm shadow-sky-500/20"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>{t("nav.login")}</span>
                </Button>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer with AnimatePresence */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl mt-2 p-5 border border-sky-100 dark:border-slate-800 shadow-2xl space-y-2"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-[#0284c7]"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-sky-400 bg-slate-900 border border-slate-800"
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>Admin Hub</span>
                  </Link>
                  <Link
                    to="/delivery"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-400 bg-slate-900 border border-slate-800"
                  >
                    <Truck className="h-3.5 w-3.5" />
                    <span>Fleet Hub</span>
                  </Link>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                  <a
                    href={`tel:${contact.hotline || "+8809612278235"}`}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-[#0284c7] text-xs font-bold"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    <span>{contact.hotlineDisplay || "+880 9612-AQUA"}</span>
                  </a>
                  <Link
                    to="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full"
                  >
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9]"
                    >
                      <User className="h-4 w-4" />
                      <span>{t("nav.login")}</span>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}

export default Navbar;

