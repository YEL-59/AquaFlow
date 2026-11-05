import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      id,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-900 transition-colors",
              "border-slate-300 placeholder:text-slate-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:border-sky-500",
              "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50",
              "dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500",
              error && "border-rose-500 focus-visible:ring-rose-500 focus-visible:border-rose-500",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p
            id={`${inputId}-error`}
            className="text-xs font-medium text-rose-600 dark:text-rose-400 mt-1"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-slate-500 dark:text-slate-400 mt-1"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
