# 13 — Feature Acceptance Criteria: AquaFlow

> Owned and verified by `thanos`.

---

## 1. Global Baseline Criteria
Every completed feature must meet:
- [ ] No unhandled Promise rejections, linter errors, or runtime console exceptions.
- [ ] Responsive UI verified on mobile (<640px) and desktop (>1024px).
- [ ] Full English and Bangla language toggle verified on all labels and dynamic messages.
- [ ] Currency rendered in BDT (`৳`) with 2 decimal places.
- [ ] Unit and integration tests passed with recorded evidence.

---

## 2. Subsystem Acceptance Criteria Matrix

| Feature ID | Feature Name | Acceptance Condition | Verification Method |
|---|---|---|---|
| `AC-ZONE-01` | Delivery Area Check | Entering supported Dhaka area (e.g., Gulshan) returns slot times, lead time, and fee. Unsupported area displays localized Bengali/English service notice. | API & Component test |
| `AC-CAT-01` | Catalog & Pricing | Product prices loaded from backend in BDT; inactive items cannot be ordered; jar deposit displayed separately. | Integration test |
| `AC-QUOTE-01` | Server Quote | Quote recalculates subtotal, deposit, delivery fee, and discount strictly on backend; client cannot spoof prices. | Automated test suite |
| `AC-ORDER-01` | Atomic Order Placement | Order creation locks stock and slot capacity atomically; duplicate request with same `Idempotency-Key` returns existing order without creating a duplicate. | Concurrent integration test |
| `AC-JAR-01` | Reusable Jar Ledger | Delivering 3 full jars and collecting 2 empties updates the customer jar balance by +1 net; full history logged in `ContainerLedgerEntry`. | DB Ledger test |
| `AC-SUB-01` | Recurring Subscriptions | Scheduled worker generates tomorrow's delivery orders without creating duplicates for the same subscription date; customer can pause/resume according to cut-off rules. | Cron worker test |
| `AC-DELIV-01` | Driver Mobile Screen | Driver views assigned orders on mobile viewport; marking delivery records actual delivered quantity, empties collected, and cash collected. | Mobile UI & API test |
| `AC-RECON-01` | Shift Cash Closing | Cash collected by delivery driver is submitted at shift end and reconciled against completed orders by accountant; discrepancies remain flagged. | Financial test |
| `AC-FIN-01` | Balanced Journals | Every posted journal entry validates `total debit == total credit`; posting an unbalanced journal throws an error and rolls back. | Unit/Integration test |
| `AC-RBAC-01` | Access Control | Delivery staff cannot access `/admin/finance`; customers cannot access other customers' orders or invoices. | Security test |
