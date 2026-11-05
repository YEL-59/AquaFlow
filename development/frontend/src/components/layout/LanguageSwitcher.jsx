import React from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { cn } from "../../lib/utils";

export function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "bn";

  const toggleLanguage = () => {
    const nextLang = currentLang === "bn" ? "en" : "bn";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200",
        "bg-white/80 dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-slate-700",
        "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
        className
      )}
      aria-label="Toggle language"
    >
      <Languages className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
      <span className="font-medium">{currentLang === "bn" ? "English" : "বাংলা"}</span>
    </button>
  );
}
