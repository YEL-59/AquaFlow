import { z } from "zod";

export const checkZoneSchema = z.object({
  neighborhood: z.string().min(2, "Neighborhood is required"),
  road: z.string().optional(),
  building: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const createAddressSchema = z.object({
  zoneId: z.string().uuid("Invalid delivery zone ID"),
  label: z.string().default("Home"),
  neighborhood: z.string().min(2, "Neighborhood is required"),
  road: z.string().min(1, "Road/Street is required"),
  building: z.string().min(1, "House/Building name or number is required"),
  floorOrApartment: z.string().min(1, "Floor or apartment is required"),
  landmark: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
  isDefault: z.boolean().default(false),
  deliveryInstructions: z.string().optional().nullable(),
});

export const updateAddressSchema = createAddressSchema.partial();
