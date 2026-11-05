# TASK-017: Implement Recurring Subscription Engine & Worker

> **Status**: `DONE`  
> **Assignee**: `edith`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-011` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend Specialist), implement the recurring subscription engine for automated daily, alternate-day, weekly, and custom-day drinking water deliveries in Dhaka. Support vacation pause windows (`pauseStartDate` / `pauseEndDate`), cutoff management (20:00 cutoff for next day), and an automated daily generation worker with idempotent cycle keys (`SUB-CYCLE-{subId}-{YYYYMMDD}`).

---

## 2. Inputs & Context Documents
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma) (`Subscription`, `SubscriptionDeliveryCycle`)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.4)
- **PRD Section 8**: Subscription & Recurring Deliveries Engine

---

## 3. Step-by-Step Execution Plan
1. Backend Subscriptions Module:
   - Built `development/backend/src/modules/subscriptions/subscriptions.service.js`:
     - `createSubscription`: recurring delivery config (cadence, custom days, quantity, delivery slot, zone).
     - `pauseSubscription` & `resumeSubscription`: vacation pause windows.
     - `cancelSubscription`: cancellation tracking.
     - `runDailyGenerationWorker`: processes active subscriptions, checks pause status, and automatically generates orders with idempotent cycle keys.
   - Built `subscriptions.controller.js` and `subscriptions.routes.js`.
   - Mounted `/api/v1/subscriptions` in `development/backend/src/app.js`.
2. Verification:
   - Validated JavaScript syntax and route handlers.

---

## 4. Expected Outputs
- `development/backend/src/modules/subscriptions/subscriptions.service.js`
- `development/backend/src/modules/subscriptions/subscriptions.controller.js`
- `development/backend/src/modules/subscriptions/subscriptions.routes.js`
- App mount in `app.js`

---

## 5. Acceptance Criteria
- [x] Subscriptions support daily, alternate-day, weekly, and custom-day schedules.
- [x] Pause windows prevent order creation during customer vacation intervals.
- [x] Daily generation worker runs with idempotent cycle keys preventing duplicate orders.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Subscriptions Routes Validation**: `node -c development/backend/src/modules/subscriptions/subscriptions.routes.js` -> `PASSED`
- **Backend Subscriptions Controller Validation**: `node -c development/backend/src/modules/subscriptions/subscriptions.controller.js` -> `PASSED`
- **Backend Subscriptions Service Validation**: `node -c development/backend/src/modules/subscriptions/subscriptions.service.js` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-018 শুরু করো।
```
