import { z } from "zod";

export const deliveryItemDeliveredSchema = z.object({
  orderItemId: z.string().uuid("Invalid order item ID"),
  quantityDelivered: z.number().int().nonnegative(),
  quantityReturned: z.number().int().nonnegative().default(0),
});

export const completeDeliverySchema = z.object({
  items: z.array(deliveryItemDeliveredSchema).min(1, "Delivered items required"),
  emptyJarsCollected: z.number().int().nonnegative().default(0),
  damagedJarsReturned: z.number().int().nonnegative().default(0),
  cashCollected: z.number().nonnegative().default(0),
  paymentMethod: z.enum(["CASH", "BKASH_MANUAL", "NONE"]).default("CASH"),
  notes: z.string().optional().nullable(),
  proofStorageUrl: z.string().url().optional().nullable(),
});

export const failDeliverySchema = z.object({
  failureReason: z.enum([
    "CUSTOMER_UNAVAILABLE",
    "INCORRECT_ADDRESS",
    "CUSTOMER_DECLINED",
    "PRODUCT_UNAVAILABLE",
    "ACCESS_RESTRICTED",
    "OTHER",
  ]),
  notes: z.string().min(3, "Detailed explanation is required"),
});

export const assignDriverSchema = z.object({
  assignedToUserId: z.string().uuid("Invalid driver user ID"),
  stockLocationId: z.string().uuid("Invalid stock location ID"),
  scheduledStart: z.string().datetime(),
  scheduledEnd: z.string().datetime(),
});
