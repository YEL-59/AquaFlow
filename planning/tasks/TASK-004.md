# TASK-004: Define API Contracts & Zod Validation Schemas

> **Status**: `DONE`  
> **Assignee**: `edith` (Backend & Data Architect)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-003` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Backend Specialist (`edith`), establish formal API contracts and Zod request/response validation schemas for all AquaFlow domain modules under `/api/v1/` based on `docs/08-api-contract.md` and `development/backend/prisma/schema.prisma`.

---

## 2. Inputs & Context Documents
- **API Contract Specification**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma)
- **PRD Specification**: [README.md](../../README.md)

---

## 3. Step-by-Step Execution Plan
1. Define shared Zod validation schemas for all core modules in `development/backend/src/schemas/`:
   - `auth.schema.js`: Register, Login, Phone Verification, OTP
   - `order.schema.js`: Cart Quote, Idempotent Order Placement, Status Mutation
   - `zone.schema.js`: Coverage Address Check, Slot Capacity
   - `subscription.schema.js`: Plan creation, frequency rules, pause/resume
   - `delivery.schema.js`: Driver fulfillment, delivered quantities, empties, cash collection
   - `container.schema.js`: Reusable jar ledger movements, deposit transactions
   - `finance.schema.js`: Expense recording, balanced double-entry journal lines
2. Verify contract compliance using `./scripts/validate-contracts.sh`.
3. Align request/response DTO contracts with Friday's frontend client services.

---

## 4. Expected Outputs
- `development/backend/src/schemas/*.schema.js` for all domains.
- `docs/08-api-contract.md` verified.
- `scripts/validate-contracts.sh` passes.

---

## 5. Acceptance Criteria
- [x] Every protected route has a corresponding Zod validation schema.
- [x] Bangladeshi normalized phone format `+8801...` enforced in validation.
- [x] Fixed decimal numeric validations configured for BDT amounts.
- [x] Balanced journal entry schema verifies `debit == credit`.
- [x] `./scripts/validate-contracts.sh` passes.

---

## 6. Verification Evidence (Thanos)
- **Command**: `bash scripts/validate-contracts.sh`
- **Status**: `PASSED`
- **Output Log**:
```text
Validating API Contract: docs/08-api-contract.md...
✅ API Contract format is valid.
```

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-005 শুরু করো।
```
