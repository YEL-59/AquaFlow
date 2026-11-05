# 10 — Security Plan & Hardening: AquaFlow

> Owned and maintained by `ultron` and `edith`.

---

## 1. Authentication & Session Security
- **Password Hashing**: Modern `argon2id` (or `bcrypt` with work factor >= 12) for all stored credentials.
- **Short-Lived Access Tokens**: JWT access tokens signed with HMAC-SHA256, 15-minute expiration time.
- **Refresh Token Rotation**: Refresh tokens stored hashed in database (`RefreshSession`), delivered via `HttpOnly`, `Secure`, `SameSite=Strict` cookies. Tokens revoked upon logout or password reset.
- **Phone OTP Protection**: Maximum 3 OTP requests per 10 minutes per phone number; OTP expires in 5 minutes. Constant-time string comparison to prevent timing attacks.

---

## 2. API Authorization & Invariant Enforcement
- **Deny-by-Default RBAC**: Every protected route under `/api/v1/admin/*`, `/api/v1/delivery/*`, and `/api/v1/account/*` validates user identity and active roles/permissions before executing business logic.
- **Customer Data Isolation**: Backend queries enforce customer ownership (`customerId == req.user.customerId`). Customers cannot query or modify another user's orders or addresses.
- **Driver Delivery Scoping**: Delivery staff can view and modify only deliveries explicitly assigned to their driver ID or branch.
- **Input Sanitization**: All endpoint payloads strictly validated against `Zod` schemas. Extraneous fields stripped (`strip()`).

---

## 3. Financial & Stock Invariant Guards
- **Strict Decimal Math**: Calculations performed with fixed decimal precision. No floating-point inaccuracies for prices, taxes, delivery fees, or deposits.
- **Double-Entry Balance Checks**: Application level and database level verification that for every posted `JournalEntry`, `sum(debit) == sum(credit)`.
- **Negative Stock Prevention**: Inventory and container ledger transactions execute inside atomic Prisma transactions (`prisma.$transaction`) with balance checks to prevent negative quantities.

---

## 4. Network & Infrastructure Hygiene
- **CORS Allowlist**: Explicitly configured for verified frontend origins only.
- **Rate Limiting**: Redis-backed rate limiter on public auth endpoints (`/auth/login`, `/auth/verify-phone`, `/auth/register`) limiting to 10 requests per minute per IP.
- **Secret Hygiene**: Zero hardcoded secrets; loaded exclusively from validated environment variables.
- **Log Masking**: Passwords, OTP codes, credit cards, and customer personal phone numbers masked in structured logs.
