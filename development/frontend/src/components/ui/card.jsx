import React from "react";
import { cn } from "../../lib/utils";

export const Card = React.forwardRef(
  ({ className, isGlass = true, isInteractive = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border text-slate-900 transition-all duration-300",
        isGlass
          ? "glass-card"
          : "bg-white border-slate-200/80 shadow-sm dark:bg-slate-900 dark:border-slate-800",
        isInteractive &&
          "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-400/50 cursor-pointer",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 sm:p-7", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl sm:text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-slate-500 dark:text-slate-400 leading-relaxed",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 sm:p-7 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 sm:p-7 pt-0 border-t border-slate-100 dark:border-slate-800/80 mt-2",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
