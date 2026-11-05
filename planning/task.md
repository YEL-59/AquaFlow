# Avengers Task Board: AquaFlow

> **Statuses**: `BACKLOG` | `READY` | `IN_PROGRESS` | `BLOCKED` | `IN_REVIEW` | `FAILED` | `DONE` | `CANCELLED`  
> **Priorities**: `P0` (Critical) | `P1` (High) | `P2` (Normal) | `P3` (Low)  
> **Rule**: A task is `READY` only when all dependencies are `DONE`. A task is `DONE` only when acceptance criteria are met and Thanos has verified the actual test execution.

---

## Active Task Board

| Task ID | Task Title | Assignee | Dependencies | Status | Priority | Verification |
|---|---|---|---|---|---|---|
| [`TASK-001`](tasks/TASK-001.md) | Ingest PRD & Finalize Technical Blueprints | `iron_man` | None | `DONE` | `P0` | Verified |
| [`TASK-002`](tasks/TASK-002.md) | Define AquaFlow Design Tokens & UI Primitives | `jarvis` | `TASK-001` | `DONE` | `P0` | Verified |
| [`TASK-003`](tasks/TASK-003.md) | Design PostgreSQL Schema & Prisma Models | `edith` | `TASK-001` | `DONE` | `P0` | Verified |
| [`TASK-004`](tasks/TASK-004.md) | Define API Contracts & Zod Validation Schemas | `edith` | `TASK-003` | `DONE` | `P0` | Verified |
| [`TASK-005`](tasks/TASK-005.md) | Initialize React/Vite Frontend with Tailwind v4 & i18n | `friday` | `TASK-002` | `DONE` | `P0` | Verified |
| [`TASK-006`](tasks/TASK-006.md) | Setup Express.js Modular Backend Architecture | `edith` | `TASK-003`, `TASK-004` | `DONE` | `P0` | Verified |
| [`TASK-007`](tasks/TASK-007.md) | Implement Authentication & RBAC System | `edith`, `friday` | `TASK-005`, `TASK-006` | `DONE` | `P0` | Verified |
| [`TASK-008`](tasks/TASK-008.md) | Implement Delivery Zones & Coverage Verification | `edith`, `friday` | `TASK-007` | `DONE` | `P0` | Verified |
| [`TASK-009`](tasks/TASK-009.md) | Build Product Catalog & Bilingual Storefront UI | `friday`, `jarvis` | `TASK-005`, `TASK-008` | `DONE` | `P0` | Verified |
| [`TASK-010`](tasks/TASK-010.md) | Build Cart & Server-Calculated Checkout Quote | `edith`, `friday` | `TASK-009` | `DONE` | `P0` | Verified |
| [`TASK-011`](tasks/TASK-011.md) | Implement Transactional Order Creation & Reservations | `edith` | `TASK-010` | `DONE` | `P0` | Verified |
| [`TASK-012`](tasks/TASK-012.md) | Build Customer Account Portal & Order Timeline | `friday` | `TASK-011` | `DONE` | `P1` | Verified |
| [`TASK-013`](tasks/TASK-013.md) | Implement Reusable Jar Ledger & Deposit Subsystem | `edith` | `TASK-011` | `DONE` | `P0` | Verified |
| [`TASK-014`](tasks/TASK-014.md) | Implement Multi-Location Inventory & Movements | `edith` | `TASK-011` | `DONE` | `P0` | Verified |
| [`TASK-015`](tasks/TASK-015.md) | Build Admin Operations Dashboard & Order Dispatch | `friday` | `TASK-011`, `TASK-014` | `DONE` | `P0` | Verified |
| [`TASK-016`](tasks/TASK-016.md) | Build Mobile-First Delivery Staff Dashboard | `friday`, `jarvis` | `TASK-013`, `TASK-015` | `DONE` | `P0` | Verified |
| [`TASK-017`](tasks/TASK-017.md) | Implement Recurring Subscription Engine & Worker | `edith` | `TASK-011` | `DONE` | `P1` | Verified |
| [`TASK-018`](tasks/TASK-018.md) | Build Customer Subscription Management UI | `friday` | `TASK-017` | `DONE` | `P1` | Verified |
| [`TASK-019`](tasks/TASK-019.md) | Implement Supplier Purchasing & Goods Receipt | `edith` | `TASK-014` | `DONE` | `P1` | Verified |
| [`TASK-020`](tasks/TASK-020.md) | Implement Finance, Expenses & Balanced Journals | `edith` | `TASK-013`, `TASK-019` | `DONE` | `P1` | Verified |
| [`TASK-021`](tasks/TASK-021.md) | Build Financial Reports & Cash Reconciliation UI | `friday` | `TASK-016`, `TASK-020` | `DONE` | `P1` | Verified |
| [`TASK-022`](tasks/TASK-022.md) | Docker Multi-Stage Builds, Nginx & Production CI/CD | `ultron` | `TASK-006`, `TASK-005` | `DONE` | `P1` | Verified |
| [`TASK-023`](tasks/TASK-023.md) | End-to-End Verification & Launch Sign-off | `thanos` | All tasks | `DONE` | `P0` | Verified |
| [`TASK-024`](tasks/TASK-024.md) | bKash Merchant & SSLCOMMERZ Digital Payment Gateways | `edith`, `friday` | `TASK-011` | `DONE` | `P0` | Verified |
| [`TASK-025`](tasks/TASK-025.md) | Interactive Live Maps & Dhaka Delivery Fleet GPS Route Tracking | `friday`, `jarvis`, `edith` | `TASK-024` | `DONE` | `P0` | Verified |
| [`TASK-026`](tasks/TASK-026.md) | Bangladesh SMS Gateway Alerts & Customer Notification Engine | `edith`, `friday` | `TASK-025` | `READY` | `P1` | Pending |

---

## Granular Task Architecture (`planning/tasks/`)

To preserve **Context Isolation** and eliminate token waste, tasks are separated into individual markdown files inside `planning/tasks/`:

- **Token Efficiency Benefit**: Instead of an agent reading a monolithic document, the specialist loads **only** its assigned task file (e.g., `planning/tasks/TASK-002.md` ~ 60 lines), reducing context consumption by **85–90%**.
- **Dynamic Task Creation**: When `iron_man` analyzes new requirements, Iron Man dynamically creates or refines task files in `planning/tasks/`.
- **Master Board Index**: This document (`planning/task.md`) serves as the high-level dashboard and clickable index.
