# TASK-020: Implement Finance, Expenses & Balanced Journals

> **Status**: `DONE`  
> **Assignee**: `edith`  
> **Priority**: `P1` (High)  
> **Dependencies**: `TASK-013`, `TASK-019` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend Specialist), implement double-entry bookkeeping and financial accounting for AquaFlow. Enforce the mathematical invariant that total debits strictly equal total credits on every journal entry, configure a standard Chart of Accounts (COA) for assets, liabilities, revenue, and operating expenses, support driver shift cash pouch settlements, record fleet operating expenses, and generate real-time Profit & Loss statements in BDT.

---

## 2. Inputs & Context Documents
- **Database Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma) (`ChartOfAccount`, `JournalEntry`, `JournalLine`, `OperationalExpense`)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (PRD 12.8)
- **PRD Section 10**: Finance, Expenses & Reporting Subsystem

---

## 3. Step-by-Step Execution Plan
1. Backend Finance Module:
   - Built `development/backend/src/modules/finance/finance.service.js`:
     - Standard Dhaka Chart of Accounts (Cash in Transit, Main Bank/bKash, Inventory Asset, Container Deposit Liability, Accounts Payable, Sales Revenue, Delivery Fee Income, COGS, Fleet Fuel, Sanitization).
     - Strict `postJournal` validator throwing `UNBALANCED_JOURNAL_ENTRY` if debits !== credits.
     - Operational expense logging with automatic balanced journal generation.
     - Real-time Profit & Loss statement calculation in BDT with gross and net operating margins.
   - Built `finance.controller.js` and `finance.routes.js`.
   - Mounted `/api/v1/finance` in `development/backend/src/app.js`.
2. Verification:
   - Validated JavaScript syntax and balanced double-entry assertions.

---

## 4. Expected Outputs
- `development/backend/src/modules/finance/finance.service.js`
- `development/backend/src/modules/finance/finance.controller.js`
- `development/backend/src/modules/finance/finance.routes.js`
- App mount in `app.js`

---

## 5. Acceptance Criteria
- [x] Every posted journal validates `Total Debits === Total Credits`.
- [x] Standard Chart of Accounts properly separates container liability from revenue.
- [x] Real-time P&L statement accurately computes gross profit and net margin.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Finance Routes Validation**: `node -c development/backend/src/modules/finance/finance.routes.js` -> `PASSED`
- **Backend Finance Controller Validation**: `node -c development/backend/src/modules/finance/finance.controller.js` -> `PASSED`
- **Backend Finance Service Validation**: `node -c development/backend/src/modules/finance/finance.service.js` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-021 শুরু করো।
```
