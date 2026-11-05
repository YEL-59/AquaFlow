import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionButton,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50",
        className
      )}
    >
      {Icon && (
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 mb-4 shadow-sm">
          <Icon className="h-8 w-8 stroke-[1.75]" aria-hidden="true" />
        </div>
      )}
      <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
        {title}
      </h4>
      {description && (
        <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {actionButton ? (
        actionButton
      ) : actionLabel && onAction ? (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
