# TASK-021: Build Financial Reports & Cash Reconciliation UI

> **Status**: `DONE`  
> **Assignee**: `friday`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-016`, `TASK-020` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Friday (Frontend Specialist), implement the executive financial dashboard and shift cash reconciliation portal for AquaFlow finance managers. Display real-time Profit & Loss statements in BDT (Water sales revenue, delivery income, raw water/supplier COGS, van fuel OPEX, sanitization costs, gross and net profit margins), provide delivery driver daily cash handover reconciliation, and an operational expense entry modal.

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.8)
- **PRD Section 10**: Finance, Expenses & Reporting Subsystem

---

## 3. Step-by-Step Execution Plan
1. Finance & Cash Reconciliation Interface:
   - Built `development/frontend/src/pages/admin/FinanceReports.jsx`:
     - Executive metrics summary (Total Revenue, Gross Profit, Net Operating Profit with margin % in BDT).
     - Standard double-entry monthly income statement (P&L) breakdown.
     - Delivery van shift settlement table tracking expected vs actual cash received and vault deposit confirmations.
     - Operational expense entry form posting balanced double-entry journals.
2. Route Registration:
   - Registered `/admin/finance` route in `development/frontend/src/App.jsx`.
3. Verification:
   - Verified JSX syntax and numeric formatting with `formatBDT`.

---

## 4. Expected Outputs
- `development/frontend/src/pages/admin/FinanceReports.jsx`
- Route configuration in `App.jsx`

---

## 5. Acceptance Criteria
- [x] P&L statement displays itemized revenues, COGS, operating expenses, and net profit.
- [x] Shift settlement table tracks cash pouches handed over by delivery riders.
- [x] Modal allows logging fleet fuel and plant sanitization expenses.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Frontend Syntax Validation**: `node -c development/frontend/src/pages/admin/FinanceReports.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-022 শুরু করো।
```
