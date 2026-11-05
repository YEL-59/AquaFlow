# 01 — Requirements Analysis: AquaFlow

> Generated and maintained by `iron_man` based on root [README.md](../README.md) and PRD v1.0.

---

## 1. Executive Summary & Problem Statement
- **Product Overview**: AquaFlow is a bilingual (English & Bangla) water supply, bottled water e-commerce, subscription delivery, multi-location inventory, and operations management platform serving households, offices, shops, and restaurants across Dhaka, Bangladesh.
- **Core Domain**: Clean drinking water supply (reusable 20L jars, packaged bottles, multipacks, dispensers) with container deposit tracking, delivery routing, and accounting.
- **Target Market**: Dhaka, Bangladesh with configurable neighborhood delivery zones (Gulshan, Banani, Dhanmondi, Uttara, Mirpur, Mohammadpur, etc.).
- **Primary Objectives**:
  - Accept orders 24/7 through a bilingual responsive web application.
  - Eliminate lost or unreturned containers via an auditable reusable jar ledger.
  - Automate recurring residential and commercial subscriptions with Asia/Dhaka scheduling.
  - Provide a mobile-first dashboard for delivery drivers to record collections and empties.
  - Reconcile shift cash and inventory daily with balanced double-entry accounting.

---

## 2. Functional Requirements Breakdown

| ID | Module / Feature | Description | Priority | Dependencies |
|---|---|---|---|---|
| `REQ-F-001` | Auth & RBAC | Phone-based & email registration, JWT sessions, HttpOnly cookies, 8 roles | P0 | None |
| `REQ-F-002` | Delivery Zones | Dhaka neighborhood coverage checker, lead times, delivery fees, time slots | P0 | None |
| `REQ-F-003` | Product Catalog | Multilingual (EN/BN) water catalog, packaging types, deposits, volume | P0 | None |
| `REQ-F-004` | Shopping Cart | Multi-item cart with separate display of deposits, fees, and discounts | P0 | `REQ-F-003` |
| `REQ-F-005` | Checkout & Reservation | Server-calculated total, atomic stock reservation, slot capacity check, COD | P0 | `REQ-F-002`, `REQ-F-004` |
| `REQ-F-006` | Order Tracking | Customer-visible order timeline without leaking internal operational notes | P0 | `REQ-F-005` |
| `REQ-F-007` | Customer Portal | Self-service address management, active subscriptions, jar balance, invoices | P0 | `REQ-F-001` |
| `REQ-F-008` | Reusable Jar Ledger | Immutable ledger tracking 20L jars (full/empty, warehouse/customer/driver) | P0 | `REQ-F-005` |
| `REQ-F-009` | Container Deposits | Segregation of customer deposit liabilities from earned revenue | P0 | `REQ-F-008` |
| `REQ-F-010` | Multi-Location Inventory | Ledger-based stock movements across warehouses/depots (no raw overwrites) | P0 | `REQ-F-003` |
| `REQ-F-011` | Delivery Staff Dashboard | Mobile-first field view for assigned orders, landmarks, customer contact | P0 | `REQ-F-005` |
| `REQ-F-012` | Delivery Fulfillment | Driver records delivered quantities, cash collected, empties returned | P0 | `REQ-F-011` |
| `REQ-F-013` | Daily Reconciliation | End-of-shift reconciliation for driver cash and container balances | P0 | `REQ-F-012` |
| `REQ-F-014` | Admin Operations UI | Central management for orders, dispatch, stock levels, and staff assignments | P0 | `REQ-F-001` |
| `REQ-F-015` | Subscriptions Engine | Daily, alternate-day, weekly, monthly recurrence plans for homes & offices | P1 | `REQ-F-005` |
| `REQ-F-016` | Scheduled Worker | Background job generator creating delivery occurrences in `Asia/Dhaka` | P1 | `REQ-F-015` |
| `REQ-F-017` | Supplier Purchasing | Purchase order lifecycle, goods receipts, inspection, supplier bills | P1 | `REQ-F-010` |
| `REQ-F-018` | Finance & Expenses | Categorized operational expenses, supplier payables, customer receivables | P1 | `REQ-F-001` |
| `REQ-F-019` | Balanced Journals | Balanced double-entry accounting entries for financial integrity | P1 | `REQ-F-018` |
| `REQ-F-020` | Operational Reports | Sales, subscription retention, jar recovery, gross margin, daily closing | P1 | `REQ-F-014` |
| `REQ-F-021` | Online Payments | Extensible bKash merchant flow and SSLCOMMERZ gateway integration | P2 | `REQ-F-005` |

---

## 3. Non-Functional Requirements
- **Performance**: P95 database read latency < 500ms; server-side paginated queries with indexed foreign keys.
- **Financial Precision**: All currency amounts stored as PostgreSQL `NUMERIC` / `Prisma.Decimal`. Zero floating-point rounding errors.
- **Auditability**: All sensitive operations (refunds, stock corrections, price overrides) record actor, timestamp, reason, and change diff.
- **Bilingual & Localization**: Full English and Bangla UI strings via i18next; BDT (৳) currency formatting; Asia/Dhaka timezone.
- **Security**: Argon2id password hashing; short-lived JWT access tokens; HttpOnly cookies; RBAC permission checks on every route.
- **Availability**: 99.5% uptime target with durable background jobs that survive process restarts.

---

## 4. Scope Matrix
- **In-Scope (Initial Release)**:
  - Bilingual responsive website & checkout.
  - Customer account portal & order tracking.
  - Admin operations & inventory management.
  - Delivery staff mobile-first dashboard.
  - 20L reusable jar ledger & deposit tracking.
  - Cash on delivery and manual payment reconciliation.
  - Asia/Dhaka subscription recurrence worker.
  - Expense tracking & balanced journal entries.
- **Out-of-Scope (Initial Release)**:
  - Native iOS/Android apps (handled via responsive mobile-first web app).
  - Continuous live GPS tracking of delivery drivers.
  - AI automated route optimization.
  - Multi-tenant third-party seller marketplace.
