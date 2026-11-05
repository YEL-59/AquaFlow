# TASK-019: Implement Supplier Purchasing & Goods Receipt

> **Status**: `DONE`  
> **Assignee**: `edith`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-014` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend Specialist), implement supplier procurement and Goods Receipt Notes (GRN) for AquaFlow's mixed business model (packaged water brands like Kinley/Mum and empty polycarbonate jar components). When shipments arrive, support quality batch inspections (BSTI compliance), increment warehouse inventory, and update Accounts Payable records.

---

## 2. Inputs & Context Documents
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma) (`Supplier`, `PurchaseOrder`, `GoodsReceiptNote`)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.7)
- **PRD Section 4**: Supplier & Purchasing Subsystem

---

## 3. Step-by-Step Execution Plan
1. Backend Purchasing Module:
   - Created `development/backend/src/modules/purchasing/purchasing.service.js`:
     - Defined suppliers (Kinley / Coca-Cola Beverages Bangladesh, Bengal Plastics Container Division, Dometic Dispensers).
     - Purchase Order lifecycle: creation, costing in BDT, status progression (`SENT_TO_SUPPLIER` -> `PARTIALLY_RECEIVED` -> `COMPLETED`).
     - Goods Receipt Note (GRN) with batch verification and automatic stock addition at receiving warehouse/hub.
   - Built `purchasing.controller.js` and `purchasing.routes.js`.
   - Mounted `/api/v1/purchasing` in `development/backend/src/app.js`.
2. Verification:
   - Verified JavaScript syntax and inventory integration.

---

## 4. Expected Outputs
- `development/backend/src/modules/purchasing/purchasing.service.js`
- `development/backend/src/modules/purchasing/purchasing.controller.js`
- `development/backend/src/modules/purchasing/purchasing.routes.js`
- App mount in `app.js`

---

## 5. Acceptance Criteria
- [x] Supplier directory lists active packaged water and jar vendors in Dhaka.
- [x] Purchase orders track ordered vs received quantities and BDT unit costs.
- [x] GRN recording automatically increments warehouse available stock.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Purchasing Routes Validation**: `node -c development/backend/src/modules/purchasing/purchasing.routes.js` -> `PASSED`
- **Backend Purchasing Controller Validation**: `node -c development/backend/src/modules/purchasing/purchasing.controller.js` -> `PASSED`
- **Backend Purchasing Service Validation**: `node -c development/backend/src/modules/purchasing/purchasing.service.js` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-020 শুরু করো।
```
