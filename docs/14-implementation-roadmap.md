# 14 — Implementation Roadmap: AquaFlow

> Owned and maintained by `iron_man`. Based on PRD Section 19.

---

## Roadmap Phases & Milestones

### Phase 0: Discovery, Architecture & Setup Gate
- [x] Ingest client requirements & PRD v1.0 into `README.md`.
- [x] Update technical configuration in `project.config.md`.
- [x] Draft technical specifications in `docs/` (`01` through `14`).
- [x] Define multi-agent tasks in `planning/task.md` and granular specifications in `planning/tasks/`.
- [ ] Initialize frontend and backend foundations.

### Phase 1: Storefront, Coverage & Identity
- [ ] Implement bilingual design system tokens and Wavio-inspired UI primitives (`jarvis`).
- [ ] Implement PostgreSQL schema, migrations, and Prisma client (`edith`).
- [ ] Implement Auth & RBAC REST APIs (`edith`).
- [ ] Build bilingual public storefront, hero section, and delivery-area checker (`friday`).
- [ ] Implement product catalog, cart, and server-calculated quote engine (`friday` & `edith`).
- [ ] Phase 1 verification by `thanos`.

### Phase 2: Orders, Inventory & COD Checkout
- [ ] Implement transactional order creation with idempotency and stock reservations (`edith`).
- [ ] Build admin order management dashboard and status transitions (`friday`).
- [ ] Implement multi-location inventory ledger and movements (`edith`).
- [ ] Implement Cash on Delivery (COD) payment recording (`edith`).
- [ ] Customer order tracking timeline and account portal (`friday`).
- [ ] Phase 2 verification by `thanos`.

### Phase 3: Delivery Operations & Reusable Jars Subsystem
- [ ] Implement 20L reusable container ledger and deposit/return tracking (`edith`).
- [ ] Build mobile-first Delivery Staff Dashboard for field workers (`friday` & `jarvis`).
- [ ] Implement delivery completion, empty jar returns, and failure reason logging (`edith` & `friday`).
- [ ] Implement shift cash reconciliation workflow (`edith` & `friday`).
- [ ] Phase 3 verification by `thanos`.

### Phase 4: Subscriptions & Scheduled Occurrence Worker
- [ ] Implement subscription plans and customer recurring subscriptions (`edith`).
- [ ] Implement durable Asia/Dhaka background cron worker for delivery occurrence generation (`edith`).
- [ ] Build customer subscription management portal (pause, resume, skip, reschedule) (`friday`).
- [ ] Implement automated reminders and status notifications (`edith`).
- [ ] Phase 4 verification by `thanos`.

### Phase 5: Finance, Suppliers & Business Reports
- [ ] Implement supplier purchasing, purchase orders, and goods receipts (`edith`).
- [ ] Implement operating expenses, customer receivables, and supplier payables (`edith`).
- [ ] Implement double-entry balanced journal entries (`edith`).
- [ ] Build financial reporting UI (P&L, gross margin, cash reconciliation) (`friday`).
- [ ] Phase 5 verification by `thanos`.

### Phase 6: Production Hardening, Online Payments & Deployment
- [ ] Extensible bKash merchant and SSLCOMMERZ gateway integration (`edith` & `friday`).
- [ ] Ultron configures production Docker Compose, Nginx SSL reverse proxy, and CI/CD pipelines (`ultron`).
- [ ] Thanos conducts full end-to-end regression and load/concurrency testing (`thanos`).
- [ ] Launch sign-off and deployment.
