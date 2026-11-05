# TASK-024: bKash Merchant & SSLCOMMERZ Digital Payment Gateways

> **Status**: `DONE`  
> **Assignee**: `edith` (Backend) & `friday` (Frontend)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-011` (Order Creation), `TASK-010` (Cart Quote) (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As an AquaFlow customer and finance operator, implement an authentic Bangladesh digital payment gateway integration supporting **bKash Merchant Checkout** and **SSLCOMMERZ Multi-Channel Gateway (Visa, Mastercard, Nagad, Rocket, Upay)**. Enable customers to complete pre-paid online water and jar deposit payments seamlessly with instant receipt generation, verified `TrxID`, and atomic database order updates from `PENDING` to `PAID`.

---

## 2. Technical Blueprint & Scope

### 2.1 Backend Payment Subsystem (`edith`)
- **Module**: `development/backend/src/modules/payments/`
- **Endpoints**:
  - `POST /api/v1/payments/bkash/create`: Generates merchant payment session with invoice ID, customer phone, and authoritative BDT amount.
  - `POST /api/v1/payments/bkash/execute`: Executes payment upon OTP/PIN verification, issues unique `trxID` (e.g., `BKSH-8X42K9`), transitions order to `PAID`, and logs audit trail.
  - `POST /api/v1/payments/bkash/query`: Queries transaction status by paymentID/trxID.
  - `POST /api/v1/payments/sslcommerz/init`: Initiates SSLCOMMERZ session for debit/credit cards, Nagad, Rocket, and net banking.
  - `POST /api/v1/payments/sslcommerz/ipn`: Instant Payment Notification (IPN) server-to-server webhook handler with HMAC hash validation.
  - `POST /api/v1/payments/sslcommerz/validate`: Validates payment response from gateway redirect.

### 2.2 Frontend High-Fidelity UI (`friday` & `jarvis`)
- **Checkout Payment Selector in Cart (`Cart.jsx`)**:
  - 3 Distinct Payment Tabs:
    1. **Cash on Delivery (COD)** (৳ ক্যাশ অন ডেলিভারি)
    2. **bKash Direct Merchant** (বিকাশ - #E2136E branding, instant ৳20 cash voucher prompt)
    3. **Cards & MFS via SSLCOMMERZ** (ভিসা, মাস্টারকার্ড, নগদ, রকেট)
- **Authentic bKash Modal Experience (`BkashModal.jsx`)**:
  - Modal with signature bKash pink `#E2136E`, bird silhouette header, merchant name ("AquaFlow Pure Water Ltd."), amount badge in BDT (৳), phone number input, OTP challenge screen, and secured 5-digit PIN keypad with real-time feedback.
- **SSLCOMMERZ Checkout Modal (`SslcommerzModal.jsx`)**:
  - Card selection (Visa/Mastercard/Nagad/Rocket), live gateway simulation with test credentials, and instant callback.
- **Order Confirmation & Customer Tracking**:
  - Displays green `PAID` badge, payment method icon, `TrxID`, and instant print/download receipt action.

---

## 3. Verification & Acceptance Criteria
- [x] Backend payments module routes mounted and responding cleanly on `/api/v1/payments`.
- [x] bKash create & execute API returns mock/sandbox transactions with valid `trxID`.
- [x] SSLCOMMERZ init & IPN validation returns success status with `val_id` and `bank_tran_id`.
- [x] Frontend Cart allows switching between COD, bKash, and SSLCOMMERZ with authentic branding.
- [x] bKash modal renders correctly with 5 UI states (Wallet Input, OTP Challenge, PIN Verification, Spinner, Success Receipt).
- [x] Successful bKash/SSLCOMMERZ transaction sets order to `PAID` and displays verified `TrxID`.
- [x] Delivery Staff Dashboard and Admin Orders Dispatch updated to distinguish PREPAID orders from COD.
- [x] Zero regressions on existing COD orders or quotes; clean production build passed in 20.15s.

---

## 4. Verification Evidence (Thanos Sign-off)
```text
================================================================================
THANOS VERIFICATION: bKash & SSLCOMMERZ PAYMENT GATEWAYS (TASK-024)
================================================================================
[x] Test Order Created: ORD-20261104-7979 (Grand Total: ৳410)
[x] Test 1: bKash Create Payment Session PASSED (ID: BK-PAY-1793791736476-2791)
[x] Test 2: bKash Execute Payment PASSED (TrxID: BKSHV74MCA)
[x] Test 3: Order Status Successfully Updated to PAID with TrxID PASSED
[x] Test 4: bKash Query Payment Status PASSED
[x] Test 5: SSLCOMMERZ Session Init PASSED (TranID: SSLC-1793791736477-9569)
[x] Test 6: SSLCOMMERZ Validate Payment PASSED (ValID: VAL-1793791736478-9472)
[x] Frontend Production Build: vite v5.4.21 built in 20.15s (Zero JSX/JS errors)
================================================================================
VERIFICATION RESULT: 6/6 TESTS PASSED (100% SUCCESS)
STATUS: APPROVED BY THANOS (QA & VERIFICATION SPECIALIST) 🚀
================================================================================
```
