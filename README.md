# 🛡️ AquaFlow — Client Requirements & Project Specification

> 🚀 **Quick Navigation & Usage Guides**:
> - 📖 **Developer Guide / How to Use (English)**: [HOW_TO_USE_EN.md](HOW_TO_USE_EN.md)
> - 🇧🇩 **ব্যবহার নির্দেশিকা (বাংলা গাইড)**: [HOW_TO_USE_BN.md](HOW_TO_USE_BN.md)
> - 📚 **ফোল্ডার ও ফাইল পরিচিতি (A to Z Guide)**: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
> - 🤖 **Global Agent Rules**: [AGENTS.md](AGENTS.md)
> - ⚙️ **Project Tech Stack Config**: [project.config.md](project.config.md)
>
> ⚡ **সেশন কন্টিনিউয়েশন প্রম্পট (Next Session Command)**:
> নতুন চ্যাট উইন্ডো খুলে শুধু এই এক লাইন বলুন:
> ```text
> planning/updateplanning.md পড়ে পরবর্তী টাস্ক শুরু করো।
> ```
>
> **Avengerse Protocol — Source of Truth**:
> 1. This document (`README.md`) is the **Single Source of Truth** for client requirements.
> 2. The Chief Orchestrator (`iron_man`) reads this file to coordinate Jarvis, Friday, Edith, Thor, Thanos, and Ultron.
> 3. **Zero-Assumption Policy**: AI agents must never invent client requirements. Unanswered details are preserved under **Section 8 (Open Questions)** and tracked in `planning/open-questions.md`.

---

## 1. Project Information

- **Project Codename**: AquaFlow
- **Document Version**: 1.0 (Implementation Specification)
- **Business Domain**: Dhaka Water Supply, Bottled Water E-Commerce, Subscription Delivery & Business Management Platform
- **Target Market**: Dhaka, Bangladesh (Configurable neighborhood delivery zones: Gulshan, Banani, Dhanmondi, Uttara, Mirpur, Mohammadpur, Bashundhara, etc.)
- **Primary Languages**: English and Bangla (বাংলা) — Full bilingual support
- **Currency**: Bangladeshi Taka (BDT / ৳)
- **Reference Design**: [https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)
- **Business Model**:
  - Mixed business model: Resale/distribution of packaged water from approved suppliers + Delivery of reusable 20-liter water jars + Own water purification/supply operation (BSTI compliant).
  - Recurring residential and office subscriptions.
  - Wholesale and bulk B2B orders.
  - Reusable container deposits, returns, exchanges, and outstanding jar balances.
- **Primary Applications**:
  1. **Public Storefront & Checkout**: Consumer browsing, neighborhood coverage verification, cart, server-calculated checkout.
  2. **Customer Account Portal**: Self-service profile, addresses, order history, subscription management, jar balance, invoices.
  3. **Admin & Business Operations Dashboard**: Super Admin, Operations, Inventory, and Accounting controls, real-time KPI metrics.
  4. **Delivery Staff Dashboard**: Mobile-first field app for assigned deliveries, status updates, cash collection, empty jar return recording.

---

## 2. Functional Requirements

### 2.1 Identity, RBAC & Customer Account
- **REQ-F-001 (User Authentication & Session Management)**: Customer and staff authentication supporting international normalized phone numbers (`+8801...`), email/password, JWT access tokens (short TTL), HttpOnly secure refresh cookies, and phone OTP verification.
- **REQ-F-002 (Role-Based Access Control - 8 Roles)**: Enforce RBAC with permission checks on every protected backend route:
  - *Super Admin / Owner*: Full system configuration, sensitive adjustments, financial approvals, audit logs.
  - *Operations Manager*: Order confirmation, dispatch, delivery assignments, customer complaints, zone config.
  - *Inventory Manager*: Stock locations, receipts, batch tracking, transfers, damaged stock, container transactions.
  - *Accountant / Cashier*: Payment reconciliation, expenses, refunds, supplier bills/payments, balanced journal entries.
  - *Delivery Supervisor*: Route and slot capacity management, delivery assignments, shift cash reconciliation.
  - *Delivery Staff*: Mobile-first view of assigned deliveries, status marking, jar return and cash collection recording.
  - *Customer*: Profile, multiple delivery addresses, order history, active subscriptions, jar balances, invoices.
  - *B2B Account Manager*: Commercial office/restaurant accounts, custom negotiated price lists, credit limits.
- **REQ-F-003 (Customer Account Portal)**: Dedicated portal routes (`/account`, `/account/orders`, `/account/subscriptions`, `/account/addresses`, `/account/payments`, `/account/jar-balance`, `/account/profile`, `/account/support`).

### 2.2 Public Website, Catalog & Ordering
- **REQ-F-004 (Bilingual Storefront UI)**: Responsive modern design inspired by Wavio (white backgrounds, water blue `#0284c7` accents, clean typography, responsive on mobile/desktop), fully localized in English and Bangla with i18next.
- **REQ-F-005 (Delivery Area & Slot Capacity Checker)**: Address validation against configured Dhaka delivery zones returning availability, delivery fee, minimum order value, and available time slots.
- **REQ-F-006 (Product Catalog & Dynamic Pricing)**: Product catalog supporting 5 container categories (20L reusable jars, packaged bottles, multipacks, dispensers, accessories). Supports BDT pricing, promotional prices, deposit requirement, batch/expiry tracking, and multilingual descriptions.
- **REQ-F-007 (Shopping Cart & Quote Engine)**: Persistent cart for authenticated customers, clear itemization of product prices, deposit charges, delivery fees, and discounts calculated strictly on the backend.
- **REQ-F-008 (Transactional Checkout & Stock Reservation)**: Server-calculated checkout with idempotency key protection. Atomic database transaction reserving stock and slot capacity to prevent overselling. Supports Cash on Delivery (COD) and manual payment recording.
- **REQ-F-009 (Customer Order Tracking Timeline)**: Real-time order progress timeline (Placed -> Confirmed -> Preparing -> Out for Delivery -> Delivered / Failed / Rescheduled) without leaking internal staff notes.

### 2.3 Subscriptions Subsystem
- **REQ-F-010 (Flexible Recurring Subscriptions)**: Configurable recurring schedules (Daily, Alternate-day, Selected weekdays, Weekly, Monthly, Custom) for residential and commercial customers.
- **REQ-F-011 (Durable Occurrence Generation Worker)**: Background worker operating in `Asia/Dhaka` timezone generating upcoming delivery orders within a configurable planning horizon. Enforces database constraints and idempotency to guarantee zero duplicate charges or orders.
- **REQ-F-012 (Subscription Lifecycle & Customer Self-Service)**: Status transitions (Draft, Pending, Active, Paused, Resumed, Cancelled, Completed). Customers can pause, reschedule, or cancel according to cut-off rules.

### 2.4 Reusable Jars & Container Management
- **REQ-F-013 (Container Transaction Ledger)**: Immutable transaction ledger recording full jars delivered, empties collected, supplier receipts, filled jar production, damaged/lost jars, and location transfers.
- **REQ-F-014 (Jar Balance Calculation)**: Real-time calculation distinguishing warehouse full stock, warehouse empty stock, customer-held jars, delivery staff custody, and damaged/quarantined units.
- **REQ-F-015 (Container Deposit & Return Credit Accounting)**: Explicit separation of jar deposit liabilities from sales revenue. Configurable refund and return-credit policies with audit logging.

### 2.5 Inventory & Supplier Purchasing
- **REQ-F-016 (Multi-Location Inventory Movement Ledger)**: Stock tracking across multiple warehouses/depots. All stock changes recorded as auditable movements (receipts, transfers, adjustments, reservations, issues). Raw un-audited stock overwrites strictly prohibited.
- **REQ-F-017 (Supplier Purchasing & Goods Receipt)**: Purchase order lifecycle (Draft -> Approved -> Dispatched -> Goods Received -> Inspected -> Accepted/Damaged recorded). Separates physical stock receipt from supplier bill generation and payment.

### 2.6 Delivery Operations & Cash Reconciliation
- **REQ-F-018 (Delivery Staff Mobile-First Dashboard)**: Responsive, touch-optimized field view displaying today's assigned deliveries, delivery window, customer address, landmark, map link, and contact details.
- **REQ-F-019 (Delivery Fulfillment & Failure Handling)**: Delivery worker records actual delivered quantities, empty jars returned, damaged jars, and cash collected. Failed delivery requires recorded reason (customer unavailable, wrong address, declined, etc.) with rescheduling support.
- **REQ-F-020 (End-of-Shift Cash & Stock Reconciliation)**: Staff submits collected cash and returned jars at shift end. Supervisor/accountant reviews and approves reconciliation. Variances remain prominently flagged until resolved.

### 2.7 Finance, Accounting & Reporting
- **REQ-F-021 (Operating Expenses & Cash Management)**: Recording categorized business expenses (fuel, water production, wages, warehouse rent, maintenance, marketing).
- **REQ-F-022 (Balanced Double-Entry Journal Entries)**: Auditable financial transactions where total debit equals total credit. Posted journal entries corrected via reversals, never deletion.
- **REQ-F-023 (Operational & Financial Reporting)**: Dashboard KPI cards and exportable reports (Sales by period/neighborhood/product, Subscription retention, Order completion rate, Jar recovery rate, Gross margin, P&L, Daily cash reconciliation).

---

## 3. Non-Functional Requirements

- **Performance**: P95 API response time < 500ms for common database-backed reads; fast server-side aggregation for reports; lazy loading and image optimization.
- **Availability & Resilience**: 99.5% uptime target. Idempotent background jobs and API endpoints. Committed orders and ledger transactions survive process restarts without data loss.
- **Financial Precision**: Decimal arithmetic (`Prisma.Decimal` / PostgreSQL `NUMERIC`) for all monetary amounts; integer counts for indivisible containers and bottles; zero floating-point math for money.
- **Security & Authorization**: Argon2id password hashing; JWT access tokens with short TTL; HttpOnly SameSite secure cookies; strict CORS allowlist; input validation via Zod; parameterized SQL via Prisma; rate limiting on auth and OTP routes.
- **Auditability**: Every sensitive mutation (price override, stock adjustment, refund, period close) logs actor ID, action, resource, timestamp, and sanitized change diff.
- **Accessibility & Localization**: WCAG 2.2 AA compliant contrast and keyboard navigation; full Unicode Bangla rendering; localized date, time, and BDT (৳) currency formatting.
- **Timezone**: System business logic operates strictly in `Asia/Dhaka` (UTC+6).

---

## 4. Technology Stack Preferences

- **Frontend**: React (Vite), JavaScript/JSX, Tailwind CSS v4, shadcn/ui & Radix primitives, React Router, TanStack Query, React Hook Form + Zod, Axios, Redux Toolkit (minimal shared state), Recharts, i18next.
- **Backend**: Node.js LTS, Express.js (Modular Domain Architecture), Zod validation, Winston/Morgan structured logging, background scheduled worker (node-cron / BullMQ ready).
- **Database & ORM**: PostgreSQL 15+, Prisma ORM with automated migrations.
- **Cache & Queue**: Redis (Session caching, rate limiting, background queues).
- **Mobile**: Native mobile apps out of scope for initial release; responsive mobile-first web app for Delivery Staff Dashboard.
- **Infrastructure**: Docker multi-stage builds, Nginx reverse proxy, GitHub Actions CI/CD.

---

## 5. Design References

- **Reference Website**: [https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)
- **Visual Direction**: Clean, modern, trustworthy bottled-water brand. White backgrounds, water-inspired blue accents, restrained neutral surfaces, crisp typography.
- **Brand Colors**:
  - Primary Water Blue: `#0284c7` (Sky-600) / `#0369a1` (Sky-700)
  - Secondary Aqua Accent: `#0ea5e9` (Sky-500) / `#06b6d4` (Cyan-500)
  - Surface Background: Light `#ffffff`, Secondary `#f8fafc`, Card `#ffffff`
  - Text Primary: `#0f172a` (Slate-900), Text Muted: `#64748b` (Slate-500)
- **Typography**: Inter (Latin) and Hind Siliguri / Noto Sans Bengali (Bangla).
- **UI States**: Mandatory 6 UI states on every view (Default/Success, Loading Skeleton, Empty State, Error/Validation, Responsive, Interactive/Focus).

---

## 6. External Integrations

- **Payment Methods**: Cash on Delivery (COD) and manual payment recording at launch; extensible integration for bKash merchant flow and SSLCOMMERZ gateway.
- **SMS & OTP**: Bangladesh SMS gateway API for phone verification and delivery alerts.
- **Email**: Nodemailer / Resend for operational notices and invoices.
- **Maps**: Configurable Leaflet / OpenStreetMap or Google Maps for customer landmark and delivery directions.

---

## 7. Project Constraints & Regulatory References

- **Regulatory Compliance**: BSTI standard BDS 1240:2021 reference for packaged drinking water ([https://bsti.gov.bd/](https://bsti.gov.bd/)). Proper supplier documents and batch tracking maintained.
- **Initial Launch Coverage**: Specific pilot neighborhoods in Dhaka with expansion through database configuration.
- **Browser Support**: Modern evergreen desktop and mobile browsers (Chrome, Firefox, Safari, Edge).

---

## 8. Open Questions

1. **SMS Gateway Provider**: Which SMS gateway provider (e.g. SSL Wireless, Greenweb, Elitbuzz) will be used for production phone OTPs? *(COD and test OTP mock available for development)*.
2. **Online Payment Merchant Credentials**: Will bKash merchant credentials and SSLCOMMERZ store ID be supplied during Phase 6 hardening? *(COD and manual recording active initially)*.
3. **Map Coordinates vs Landmarks**: For delivery zones, should address matching use explicit neighborhood dropdowns initially, followed by GeoJSON polygons? *(PRD specifies neighborhood coverage initially, polygon geofencing later)*.
