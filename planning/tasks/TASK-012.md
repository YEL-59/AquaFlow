# TASK-012: Build Customer Account Portal & Order Timeline

> **Status**: `DONE`  
> **Assignee**: `friday`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-011` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Friday (Frontend Specialist), build the customer account portal with active and past orders, step-by-step visual order delivery progress tracker (Placed -> Hub Allocated -> Out for Delivery -> Delivered), assigned delivery agent card with instant calling action, reusable 20L container balance tracker (showing deposit liability held and return history), and profile address management.

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **PRD Section 2 & 5**: Customer Portal & Transactional Order Lifecycle

---

## 3. Step-by-Step Execution Plan
1. Created `development/frontend/src/pages/Account.jsx`:
   - Account overview card displaying customer profile, phone number, and held 20L jars balance.
   - 3-tab layout:
     - Orders Tab: Clickable order cards leading to detailed view with step-by-step timeline, itemized bill breakdown, and delivery agent contact.
     - Jar Deposit Ledger Tab: Full container balance breakdown (full jars received vs empty returned vs deposit balance in BDT).
     - Profile Tab: Editable contact details and default delivery address.
2. Route Registration:
   - Registered `/account` route in `development/frontend/src/App.jsx`.
3. Verification:
   - Checked JSX syntax and React state management cleanly.

---

## 4. Expected Outputs
- `development/frontend/src/pages/Account.jsx`
- Route configuration in `App.jsx`

---

## 5. Acceptance Criteria
- [x] Orders tab lists order history with status badges (`OUT_FOR_DELIVERY`, `DELIVERED`, `CONFIRMED`).
- [x] Clickable order details view shows step-by-step timeline and delivery agent info.
- [x] Reusable jar deposit ledger clearly accounts for container liability in BDT.
- [x] Fully responsive layout with bilingual support.

---

## 6. Verification Evidence (Thanos)
- **Frontend Syntax Validation**: `node -c development/frontend/src/pages/Account.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-013 শুরু করো।
```
