# Architecture & Technical Decisions Log

> This document records confirmed technical choices, architectural patterns, and design trade-offs. Once recorded and approved, agents must adhere to these decisions and not alter them without human approval.

---

## Decision Records

### ADR-001: Adoption of Hierarchical Multi-Agent System (Avengers Protocol)
- **Date**: 2026-11-02
- **Status**: APPROVED
- **Context**: Monolithic single-agent workflows lead to high token burn, context contamination, and lack of specialized domain discipline.
- **Decision**: Adopt a Chief Orchestrator (`iron_man`) with 6 specialized agents (`jarvis`, `friday`, `edith`, `thor`, `thanos`, `ultron`).
- **Consequences**:
  - Positive: Clean context isolation, reduced token waste, independent testing verification.
  - Trade-off: Requires task decomposition and contract-driven communication through `docs/` and `planning/task.md`.

### ADR-002: Default Technology Stack Selection
- **Date**: 2026-11-02
- **Status**: SUPERSEDED by ADR-003
- **Context**: The template had default starter technologies prior to client PRD integration.

### ADR-003: AquaFlow Architecture, Domain Modeling & Technical Stack Confirmation
- **Date**: 2026-11-04
- **Status**: APPROVED
- **Context**: PRD version 1.0 defines specific business requirements for Dhaka Water Supply & Delivery Management Platform (AquaFlow).
- **Decisions**:
  1. **Frontend Architecture**: Single React application built with Vite, JavaScript/JSX, Tailwind CSS v4, shadcn/ui primitives, React Router, TanStack Query, and i18next supporting 4 primary route spaces: Public Storefront, Customer Portal, Admin Dashboard, and Delivery Staff Dashboard.
  2. **Backend Architecture**: Express.js modular domain architecture, Prisma ORM, PostgreSQL database, and Redis for caching, rate limiting, and queues.
  3. **Timezone & Currency**: System time strictly operates in `Asia/Dhaka` (UTC+6). All monetary values stored as `Decimal` (PostgreSQL `NUMERIC`) with `BDT` (৳) currency.
  4. **Container & Jar Ledger**: Reusable 20-liter jars and packaging are managed via an immutable event ledger (`ContainerLedgerEntry`). Full jars, empty jars, customer holdings, delivery holdings, and damaged jars are tracked as directional movements. Jar deposits are accounted separately from sales revenue.
  5. **Inventory Movement Ledger**: All warehouse stock movements (receipts, issues, reservations, transfers, adjustments) are recorded in `InventoryMovement`. Silent overwrites of stock balances are strictly prohibited.
  6. **Double-Entry Financial Transactions**: Operating expenses, supplier payments, and refunds follow double-entry journal lines (`debit == credit`). Historical prices on completed orders remain immutable.
  7. **Subscription Worker**: Subscriptions generate occurrences idempotently using a background worker with database unique constraints to prevent duplicate deliveries or double billing.
  8. **Delivery Staff Mobile-First Experience**: Delivery Dashboard is built mobile-first, enabling rapid touch actions for status updates, cash collection, and empty jar returns.
- **Consequences**:
  - High auditability, robust financial and stock integrity, zero duplicate orders, full compliance with BSTI tracking guidelines.
