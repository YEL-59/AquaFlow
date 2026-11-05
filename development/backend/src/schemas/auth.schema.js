import { z } from "zod";

// Normalized Bangladeshi phone regex (+8801XXXXXXXXX or 01XXXXXXXXX)
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(bdPhoneRegex, "Please enter a valid Bangladesh phone number (e.g. +8801712345678 or 01712345678)"),
  email: z.string().email("Invalid email address").optional().nullable(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  preferredLanguage: z.enum(["en", "bn"]).default("bn"),
});

export const loginSchema = z.object({
  identifier: z.string().min(3, "Phone or email is required"),
  password: z.string().min(1, "Password is required"),
});

export const verifyPhoneSchema = z.object({
  phone: z.string().regex(bdPhoneRegex, "Valid Bangladesh phone number required"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export const resendOtpSchema = z.object({
  phone: z.string().regex(bdPhoneRegex, "Valid Bangladesh phone number required"),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional().nullable(),
  preferredLanguage: z.enum(["en", "bn"]).optional(),
});
