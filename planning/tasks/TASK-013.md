# TASK-013: Implement Reusable Jar Ledger & Deposit Subsystem

> **Status**: `DONE`  
> **Assignee**: `edith`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-011` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend Specialist), implement the double-entry immutable container ledger subsystem for AquaFlow's 20L reusable jars. Maintain exact customer balances of full jars held vs empty jars returned, track container deposit liabilities (৳200 per jar in BDT), and provide auditing endpoints for container returns, hub allocations, and customer balances.

---

## 2. Inputs & Context Documents
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma) (`ContainerLedgerEntry`, `ContainerState`)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.5)
- **PRD Section 6**: Reusable Container Lifecycle & Deposit Ledger

---

## 3. Step-by-Step Execution Plan
1. Backend Containers Module:
   - Created `development/backend/src/modules/containers/containers.service.js` implementing:
     - `getCustomerBalance(customerId)`: computes total received, total returned, jars currently held, and net deposit liability in BDT.
     - `recordReturn(...)`: append-only immutable logging of returned jars with credit calculations.
     - `recordDelivery(...)`: logs full jar issues with deposit liabilities.
     - `getLedger(...)`: filtered audit history of container transactions.
   - Built `containers.controller.js` and `containers.routes.js`.
   - Mounted `/api/v1/containers` in `development/backend/src/app.js`.
2. Verification:
   - Verified JavaScript syntax across the containers module.

---

## 4. Expected Outputs
- `development/backend/src/modules/containers/containers.service.js`
- `development/backend/src/modules/containers/containers.controller.js`
- `development/backend/src/modules/containers/containers.routes.js`
- App mount in `app.js`

---

## 5. Acceptance Criteria
- [x] Container ledger entries are append-only and immutable.
- [x] Customer jar balances strictly calculate jars held and deposit liability (৳200/jar).
- [x] Return events accurately record negative quantity changes and deposit credits.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Containers Routes Validation**: `node -c development/backend/src/modules/containers/containers.routes.js` -> `PASSED`
- **Backend Containers Controller Validation**: `node -c development/backend/src/modules/containers/containers.controller.js` -> `PASSED`
- **Backend Containers Service Validation**: `node -c development/backend/src/modules/containers/containers.service.js` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-014 শুরু করো।
```
