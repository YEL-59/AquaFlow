# TASK-018: Build Customer Subscription Management UI

> **Status**: `DONE`  
> **Assignee**: `friday`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-017` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Friday (Frontend Specialist), build the customer subscription management portal for recurring automatic water deliveries. Enable customers to set up new recurring subscriptions with schedule cadences (Daily, Alternate Days, Custom Days of Week, Weekly), choose preferred morning/afternoon slots, pause delivery for vacations, resume paused subscriptions, and view next scheduled delivery dates.

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.4)
- **PRD Section 8**: Subscription & Recurring Deliveries Engine

---

## 3. Step-by-Step Execution Plan
1. Subscriptions Management Interface:
   - Built `development/frontend/src/pages/Subscriptions.jsx`:
     - Hero header with value props (Guaranteed Morning Slot, Vacation Pause, Zero Deposit Refills).
     - Active subscriptions list with status pills (`ACTIVE`, `PAUSED`, `CANCELLED`).
     - Vacation Pause modal allowing customers to select vacation duration and pause with 1 click.
     - New Subscription creation wizard with cadence selection, interactive day-of-week toggles, quantity selectors, and instant BDT cost preview.
2. Route Registration:
   - Registered `/subscriptions` route in `development/frontend/src/App.jsx`.
3. Verification:
   - Verified JSX syntax and responsive layout.

---

## 4. Expected Outputs
- `development/frontend/src/pages/Subscriptions.jsx`
- Route configuration in `App.jsx`

---

## 5. Acceptance Criteria
- [x] Customers can configure recurring schedules (Daily, Alternate Days, Specific days).
- [x] Vacation pause feature allows scheduling a temporary suspension window.
- [x] Responsive layout with bilingual support and Wavio water aesthetic.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Frontend Syntax Validation**: `node -c development/frontend/src/pages/Subscriptions.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-019 শুরু করো।
```
