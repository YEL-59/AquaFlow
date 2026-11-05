# TASK-003: Design PostgreSQL Schema & Prisma Models

> **Status**: `DONE`  
> **Assignee**: `edith` (Backend & Data Architect)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-001` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Backend and Data Specialist (`edith`), implement the normalized PostgreSQL database schema using Prisma ORM for AquaFlow covering all 11 core subsystems specified in PRD Section 11 and `docs/07-database-design.md` (Identity & RBAC, Customer & Delivery Coverage, Catalog & Batches, Multi-Location Inventory, Orders & Fulfillment, Field Deliveries, Subscriptions, Reusable Containers, Payments & Balanced Journals, Purchasing, and Audit Logs).

---

## 2. Inputs & Context Documents
- **Database Design Doc**: [docs/07-database-design.md](../../docs/07-database-design.md)
- **PRD Specification**: [README.md](../../README.md)
- **Prisma Schema Target**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma)

---

## 3. Step-by-Step Execution Plan
1. Review all 11 core subsystem schemas in `docs/07-database-design.md`.
2. Implement complete Prisma schema in `development/backend/prisma/schema.prisma`:
   - Enums: `UserStatus`, `CustomerType`, `ProductType`, `OrderStatus`, `PaymentStatus`, `SubscriptionStatus`.
   - Models: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `RefreshSession`, `Customer`, `Address`, `DeliveryZone`, `DeliverySlot`, `ProductCategory`, `ContainerType`, `Product`, `ProductPrice`, `ProductImage`, `Supplier`, `SupplySource`, `ProductBatch`, `StockLocation`, `InventoryBalance`, `InventoryMovement`, `StockReservation`, `StockCount`, `StockCountItem`, `Order`, `OrderItem`, `OrderStatusHistory`, `Delivery`, `DeliveryItem`, `DeliveryProof`, `DeliveryCollection`, `Subscription`, `SubscriptionItem`, `SubscriptionOccurrence`, `SubscriptionEvent`, `ContainerLedgerEntry`, `ContainerDepositTransaction`, `Payment`, `PaymentEvent`, `Refund`, `ExpenseCategory`, `Expense`, `FinancialAccount`, `JournalEntry`, `JournalLine`, `CustomerLedgerEntry`, `SupplierBill`, `SupplierPayment`, `PurchaseOrder`, `PurchaseOrderItem`, `AuditLog`, `BusinessSetting`.
3. Validate schema syntax: `cd development/backend && npx prisma validate`.
4. Configure `prisma.config.ts` for database connection URL.

---

## 4. Expected Outputs
- `development/backend/prisma/schema.prisma` populated with all 30+ AquaFlow models.
- `development/backend/prisma.config.ts` configured.
- Zero Prisma schema validation errors.

---

## 5. Acceptance Criteria
- [x] `npx prisma validate` passes with zero errors.
- [x] Monetary columns use `Decimal(12, 2)` or `Decimal(10, 2)`.
- [x] All foreign keys have explicit relations and referential integrity constraints.
- [x] Unique constraints enforced on `orderNumber`, `subscriptionNumber`, `paymentReference`, `idempotencyKey`, and `(subscriptionId, scheduledFor)`.

---

## 6. Verification Evidence (Thanos)
- **Command**: `cd development/backend && npx prisma validate`
- **Status**: `PASSED`
- **Output Log**:
```text
Prisma schema loaded from prisma\schema.prisma.
The schema at prisma\schema.prisma is valid 🚀
```

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-004 শুরু করো।
```
