import { z } from "zod";

export const containerLedgerEntrySchema = z.object({
  containerTypeId: z.string().uuid("Invalid container type ID"),
  customerId: z.string().uuid().optional().nullable(),
  stockLocationId: z.string().uuid().optional().nullable(),
  deliveryId: z.string().uuid().optional().nullable(),
  orderId: z.string().uuid().optional().nullable(),
  entryType: z.enum([
    "DELIVERED_FULL",
    "RETURNED_EMPTY",
    "DAMAGED",
    "PRODUCED",
    "TRANSFER",
    "MANUAL_ADJUSTMENT",
  ]),
  quantityDelta: z.number().int("Quantity delta must be an integer"),
  depositAmount: z.number().optional().nullable(),
  reason: z.string().min(3, "Reason must be specified"),
});

export const adjustJarBalanceSchema = z.object({
  customerId: z.string().uuid("Invalid customer ID"),
  containerTypeId: z.string().uuid("Invalid container type ID"),
  adjustmentQuantity: z.number().int(),
  reason: z.string().min(5, "Authorized adjustment reason is required"),
});
