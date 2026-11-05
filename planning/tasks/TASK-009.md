# TASK-009: Build Product Catalog & Bilingual Storefront UI

> **Status**: `DONE`  
> **Assignee**: `friday`, `jarvis`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-005`, `TASK-008` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Frontend (`friday`) and Design Specialist (`jarvis`), implement the full bilingual Product Catalog and Storefront UI for AquaFlow. Enable Dhaka customers to browse 20L reusable jars, packaged bottles, dispensers, and accessories, view BDT pricing and refundable jar deposit breakdowns, filter by category or subscription eligibility, and add items to the cart with interactive animations.

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **PRD Reference**: [README.md](../../README.md) (Section 3: Product Catalog & Pricing, Section 6: Reusable Container Lifecycle)

---

## 3. Step-by-Step Execution Plan
1. Backend Catalog Module:
   - Built `development/backend/src/modules/catalog/catalog.service.js` with categories and Dhaka catalog items (20L reusable jars with ৳80 price + ৳200 refundable deposit, 1.5L cases, 500ml packs, electric/manual dispensers).
   - Built `catalog.controller.js` and `catalog.routes.js`.
   - Mounted `/api/v1/categories`, `/api/v1/products`, and `/api/v1/products/:id` in `app.js`.
2. Frontend Storefront UI:
   - Built `development/frontend/src/pages/Products.jsx` following Wavio design aesthetic with water gradients, category tabs, real-time search, subscription toggle, quantity steppers, refundable jar deposit highlights, and animated add-to-cart.
   - Connected `/products` route in `App.jsx`.
3. Verification & Acceptance:
   - Validated backend routes and frontend components with zero errors.

---

## 4. Expected Outputs
- `development/backend/src/modules/catalog/` (`catalog.service.js`, `catalog.controller.js`, `catalog.routes.js`)
- `development/frontend/src/pages/Products.jsx`
- Route configuration in `App.jsx` and `app.js`

---

## 5. Acceptance Criteria
- [x] Products display with BDT prices formatted via `formatBDT`.
- [x] 20L Reusable Jar prominently displays refundable deposit requirement (৳200).
- [x] Bilingual toggle switches English and Bengali descriptions seamlessly.
- [x] Real-time category filtering and search works without page reload.
- [x] Zero build/syntax errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Routes Validation**: `node -c development/backend/src/modules/catalog/catalog.routes.js` -> `PASSED`
- **Frontend Syntax Validation**: `node -c development/frontend/src/pages/Products.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-010 শুরু করো।
```
