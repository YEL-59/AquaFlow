# 02 — System Architecture: AquaFlow

> Maintained by `iron_man` and `edith`.

---

## 1. High-Level Architecture Overview
AquaFlow is structured as a modular full-stack web platform consisting of a unified React frontend and a modular Express.js backend with PostgreSQL and Redis.

```mermaid
graph TD
    subgraph Client Applications ["Frontend (React + Vite + Tailwind CSS v4)"]
        Storefront["Public Storefront & Checkout"]
        CustomerPortal["Customer Account Portal"]
        AdminDashboard["Admin Operations Dashboard"]
        DeliveryApp["Delivery Staff Dashboard (Mobile-First)"]
    end

    subgraph Gateway ["Reverse Proxy & Network"]
        NginxProxy["Nginx Reverse Proxy & SSL Termination"]
    end

    subgraph BackendServices ["Backend API (Express.js Modular Monolith)"]
        AuthModule["Auth & RBAC Module"]
        ZoneModule["Zones & Slots Module"]
        CatalogModule["Catalog & Pricing Module"]
        OrderModule["Orders & Reservation Engine"]
        SubModule["Subscriptions & Scheduler"]
        JarModule["Reusable Jar Ledger Module"]
        InvModule["Inventory & Movement Module"]
        DeliveryModule["Delivery & Dispatch Module"]
        SupplierModule["Suppliers & Purchasing Module"]
        FinanceModule["Finance & Balanced Journals"]
        Worker["Background Cron Worker (Asia/Dhaka)"]
    end

    subgraph DataStorage ["Data & Cache Layer"]
        Postgres[(PostgreSQL 15+ / Prisma ORM)]
        RedisCache[(Redis Cache / BullMQ Queue)]
    end

    ClientApplications -->|HTTPS / REST /api/v1| NginxProxy
    NginxProxy --> BackendServices
    BackendServices -->|Prisma Client| Postgres
    BackendServices -->|ioredis| RedisCache
    Worker -->|Prisma Client| Postgres
```

---

## 2. Component Boundaries & Responsibilities

### 2.1 Frontend (`development/frontend/`)
- Built with React + Vite + JavaScript/JSX + Tailwind CSS v4 + shadcn/ui primitives.
- Internationalized using `i18next` with complete English and Bangla translation key coverage.
- Contains 4 distinct route layouts:
  1. `/(storefront)`: Home, Catalog, Subscriptions, Delivery Areas, Checkout, Cart.
  2. `/account/*`: Customer addresses, orders, subscriptions, jar ledger, support.
  3. `/admin/*`: Orders, inventory, containers, deliveries, staff, accounting, reports.
  4. `/delivery/*`: Mobile-first touch-friendly field interface for drivers.

### 2.2 Backend (`development/backend/`)
- Express.js with modular domain directory structure under `src/modules/`.
- Domain modules encapsulate controllers, services, validation DTOs (Zod), and data queries.
- Atomic Prisma transactions (`prisma.$transaction`) ensure consistency for orders, stock reservations, container ledger entries, and double-entry journals.
- Background worker handles recurring subscription order generation and delivery reminders in `Asia/Dhaka` time.

### 2.3 Data Layer
- PostgreSQL with UUID primary keys, normalized foreign keys, and Decimal types for money.
- Immutable event tables: `InventoryMovement`, `ContainerLedgerEntry`, `JournalEntry` + `JournalLine`.
- Redis handles token revocation, rate limiting, and temporary checkout quote caching.
