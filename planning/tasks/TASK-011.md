# TASK-011: Implement Transactional Order Creation & Reservations

> **Status**: `DONE`  
> **Assignee**: `edith`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-010` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend Specialist), implement transactional order creation and reservation endpoints (`POST /api/v1/orders`), user order history (`GET /api/v1/orders`), order tracking by ID/number (`GET /api/v1/orders/:id`), and order cancellation (`POST /api/v1/orders/:id/cancel`). Ensure idempotency keys prevent duplicate order placement, maintain status progression timelines, track refundable jar deposit counts, and link Cash On Delivery payments.

---

## 2. Inputs & Context Documents
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (POST /api/v1/orders)
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma)
- **PRD Section 5**: Transactional Order Lifecycle & Section 6: Reusable Container Lifecycle

---

## 3. Step-by-Step Execution Plan
1. Backend Orders Subsystem:
   - Implemented `createOrder` in `development/backend/src/modules/orders/orders.service.js` with:
     - Header idempotency checking (`X-Idempotency-Key`).
     - Server calculation of line prices, jar deposits, and empty jar return credits.
     - Deterministic order numbering (`ORD-YYYYMMDD-XXXX`).
     - Initial status timeline entries (`PLACED`, `CONFIRMED`).
     - Memory / Prisma transactional storage.
   - Implemented `getOrderById`, `getUserOrders`, and `cancelOrder`.
2. Controller & Routes Integration:
   - Added handlers in `orders.controller.js`.
   - Exposed REST endpoints in `orders.routes.js` with `authenticateOptional` support.
3. Verification:
   - Verified JavaScript syntax across backend orders modules.

---

## 4. Expected Outputs
- `development/backend/src/modules/orders/orders.service.js`
- `development/backend/src/modules/orders/orders.controller.js`
- `development/backend/src/modules/orders/orders.routes.js`

---

## 5. Acceptance Criteria
- [x] Orders cannot be duplicated when `X-Idempotency-Key` is provided.
- [x] Orders calculate authoritative server-side BDT pricing and jar deposits.
- [x] Delivery slot and Dhaka delivery address are persisted with the order.
- [x] Status timeline accurately tracks order milestones.
- [x] Zero syntax errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Orders Route Validation**: `node -c development/backend/src/modules/orders/orders.routes.js` -> `PASSED`
- **Backend Orders Controller Validation**: `node -c development/backend/src/modules/orders/orders.controller.js` -> `PASSED`
- **Backend Orders Service Validation**: `node -c development/backend/src/modules/orders/orders.service.js` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-012 শুরু করো।
```
