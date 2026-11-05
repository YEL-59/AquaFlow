import React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = {
  variant: {
    primary:
      "bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-500 text-white shadow-md shadow-sky-500/25 hover:shadow-lg hover:shadow-sky-500/35 hover:brightness-105 active:scale-[0.98] border border-sky-400/30",
    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-[0.98] dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700",
    outline:
      "border-2 border-sky-600/30 bg-transparent text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:border-sky-500 active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-sky-50/70 dark:hover:bg-slate-800 hover:text-sky-600 active:scale-[0.98]",
    destructive:
      "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-600/25 hover:shadow-lg hover:brightness-105 active:scale-[0.98]",
    glass:
      "glass-panel text-slate-800 dark:text-slate-100 hover:bg-white/95 dark:hover:bg-slate-800/90 shadow-sm border border-white/60 dark:border-slate-700/60 active:scale-[0.98]",
  },
  size: {
    sm: "h-9 px-3.5 text-xs rounded-xl gap-1.5",
    md: "h-11 px-5 text-sm rounded-2xl gap-2",
    lg: "h-13 px-7 text-base rounded-2xl gap-2.5 font-semibold",
    icon: "h-11 w-11 p-0 rounded-2xl justify-center",
  },
};

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled = false,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isActuallyDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 relative overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900",
          "disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer",
          buttonVariants.variant[variant] || buttonVariants.variant.primary,
          buttonVariants.size[size] || buttonVariants.size.md,
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
