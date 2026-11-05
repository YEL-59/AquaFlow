import { z } from "zod";
import { orderItemInputSchema } from "./order.schema";

export const createSubscriptionSchema = z.object({
  addressId: z.string().uuid("Invalid address ID"),
  frequencyType: z.enum(["DAILY", "ALTERNATE_DAY", "WEEKLY", "MONTHLY", "CUSTOM"]),
  recurrenceRule: z.string().min(1, "Recurrence rule is required"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be YYYY-MM-DD"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  paymentMode: z.enum(["PER_DELIVERY", "PREPAID", "MONTHLY_INVOICE"]).default("PER_DELIVERY"),
  items: z.array(orderItemInputSchema).min(1, "At least one item is required"),
});

export const pauseSubscriptionSchema = z.object({
  pauseReason: z.string().min(3, "Reason for pausing is required"),
  resumeDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
});

export const skipOccurrenceSchema = z.object({
  occurrenceId: z.string().uuid("Invalid occurrence ID"),
  reason: z.string().optional(),
});
