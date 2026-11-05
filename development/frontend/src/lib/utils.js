import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge multiple class names with Tailwind CSS conflicts resolved.
 * @param  {...any} inputs - Class names, expressions, or objects
 * @returns {string} Merged class name string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a numeric amount to Bangladeshi Taka (BDT / ৳) string.
 * @param {number|string} amount
 * @param {string} [locale='en'] - 'en' or 'bn'
 * @returns {string} e.g. "৳ 1,250.00" or "৳ ১,২৫০.০০"
 */
export function formatBDT(amount, locale = "en") {
  const numericAmount = Number(amount) || 0;
  const formatted = numericAmount.toLocaleString(locale === "bn" ? "bn-BD" : "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `৳ ${formatted}`;
}
