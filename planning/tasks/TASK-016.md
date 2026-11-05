# TASK-016: Build Mobile-First Delivery Staff Dashboard

> **Status**: `DONE`  
> **Assignee**: `friday`, `jarvis`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-013`, `TASK-015` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Friday and Jarvis, build the mobile-first delivery staff dashboard optimized for smartphone screens carried by AquaFlow drivers across Dhaka. Provide stop-by-stop delivery queue, customer call actions, floor/lift notes, doorstep empty jar collection counter, Cash On Delivery (COD) collection confirmation, and van inventory shift reconciliation (full jars loaded vs remaining vs empty collected vs cash in hand).

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **PRD Section 2 & 9**: Delivery Staff & Field Operations

---

## 3. Step-by-Step Execution Plan
1. Mobile-First Dashboard Interface:
   - Built `development/frontend/src/pages/delivery/DeliveryDashboard.jsx`:
     - Driver shift header with van registration and active shift indicator.
     - Live shift reconciliation strip: Full Jars In Van, Empty Jars Collected, Cash In Hand (BDT).
     - Active Stop Card with customer details, direct phone dialer (`tel:...`), Google Maps directions, and floor/elevator notes.
     - Doorstep empty jar reconciliation stepper (`- / +`).
     - Delivery & COD confirmation action button.
     - Ordered queue of today's stops with completed checkmarks.
2. Route Registration:
   - Registered `/delivery` route in `development/frontend/src/App.jsx`.
3. Verification:
   - Verified JSX syntax and responsive layout for mobile viewport.

---

## 4. Expected Outputs
- `development/frontend/src/pages/delivery/DeliveryDashboard.jsx`
- Route configuration in `App.jsx`

---

## 5. Acceptance Criteria
- [x] Smartphone-first responsive UI with thumb-friendly buttons.
- [x] Delivery riders can record actual empty 20L jars collected at doorstep.
- [x] Van inventory updates dynamically upon each delivery completion.
- [x] Direct telephone call integration with customer.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Frontend Syntax Validation**: `node -c development/frontend/src/pages/delivery/DeliveryDashboard.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-017 শুরু করো।
```
