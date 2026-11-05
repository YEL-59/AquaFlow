import React from "react";
import { cn } from "../../lib/utils";

const alertVariants = {
  tone: {
    info:
      "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/40 dark:text-sky-200 dark:border-sky-800",
    success:
      "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800",
    warning:
      "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
    destructive:
      "bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-800",
  },
};

export function Alert({
  className,
  tone = "info",
  icon: Icon,
  title,
  children,
  ...props
}) {
  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full gap-3.5 rounded-2xl border p-4 text-sm transition-colors",
        alertVariants.tone[tone] || alertVariants.tone.info,
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="shrink-0 mt-0.5">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      )}
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-semibold leading-tight">{title}</h5>}
        <div className="text-xs sm:text-sm leading-relaxed opacity-95">
          {children}
        </div>
      </div>
    </div>
  );
}
