import { z } from "zod";

export const orderItemInputSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export const quoteSchema = z.object({
  zoneId: z.string().uuid("Invalid delivery zone ID"),
  items: z.array(orderItemInputSchema).min(1, "At least one product is required"),
  couponCode: z.string().optional().nullable(),
  returnEmptyJarsCount: z.number().int().nonnegative().default(0),
});

export const createOrderSchema = z.object({
  addressId: z.string().uuid("Invalid address ID"),
  deliverySlotId: z.string().uuid("Invalid delivery slot ID").optional().nullable(),
  requestedDeliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "MANUAL", "BKASH", "SSLCOMMERZ"]).default("CASH_ON_DELIVERY"),
  items: z.array(orderItemInputSchema).min(1, "At least one product is required"),
  returnEmptyJarsCount: z.number().int().nonnegative().default(0),
  customerNotes: z.string().max(500).optional().nullable(),
  idempotencyKey: z.string().min(10, "Idempotency key required"),
});

export const cancelOrderSchema = z.object({
  reason: z.string().min(3, "Cancellation reason is required"),
});

export const rescheduleOrderSchema = z.object({
  requestedDeliveryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  deliverySlotId: z.string().uuid().optional().nullable(),
  reason: z.string().optional(),
});
