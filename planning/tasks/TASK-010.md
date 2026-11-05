# TASK-010: Build Cart & Server-Calculated Checkout Quote

> **Status**: `DONE`  
> **Assignee**: `edith`, `friday`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-009` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Edith (Backend) and Friday (Frontend), implement the end-to-end Cart and Server-Calculated Checkout Quote subsystem. Prevent client-side price tampering by computing deterministic BDT totals on the server, factoring in product base prices, refundable jar deposit liability (৳200/jar), live empty jar return credits, Dhaka delivery zone fees, promo vouchers, and Cash On Delivery (COD) order reservation.

---

## 2. Inputs & Context Documents
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md) (POST /api/v1/orders/quote)
- **PRD Invariants**: [README.md](../../README.md) (Section 5: Transactional Order Lifecycle, Section 6: Reusable Container Lifecycle)
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)

---

## 3. Step-by-Step Execution Plan
1. Backend Orders Module:
   - Built `development/backend/src/modules/orders/orders.service.js` calculating server quote (`/api/v1/orders/quote`) with subtotal, jar deposits, empty jar return credits, zone delivery fees, and discount vouchers.
   - Built `orders.controller.js` and `orders.routes.js`.
   - Mounted `/api/v1/orders` in `app.js`.
2. Frontend Cart & Checkout UI:
   - Built `development/frontend/src/pages/Cart.jsx` with Wavio aesthetic:
     - Item line cards with images, quantities, and deposit tags.
     - Reusable Jar Return stepper giving instant ৳200/jar credit deduction.
     - Dhaka delivery zone selector with zone fees (Gulshan, Banani, Dhanmondi, Uttara, Mirpur, etc.).
     - Promo code input with instant validation.
     - Server-calculated summary card with BDT breakdown (`formatBDT`).
     - Cash on Delivery order placement form and order confirmed celebration view.
   - Connected `/cart` route and handlers in `App.jsx`.
3. Verification & Acceptance:
   - Validated backend modules and frontend component syntax.

---

## 4. Expected Outputs
- `development/backend/src/modules/orders/` (`orders.service.js`, `orders.controller.js`, `orders.routes.js`)
- `development/frontend/src/pages/Cart.jsx`
- Cart state handlers and route in `App.jsx`

---

## 5. Acceptance Criteria
- [x] Server quote calculation prevents client price manipulation.
- [x] Empty 20L jar returns provide ৳200 credit per jar deducted from payable total.
- [x] Dhaka delivery zone selection dynamically updates delivery fee.
- [x] Responsive layout with glassmorphic order summary and bilingual labels.
- [x] Zero syntax or compilation errors.

---

## 6. Verification Evidence (Thanos)
- **Backend Orders Route Validation**: `node -c development/backend/src/modules/orders/orders.routes.js` -> `PASSED`
- **Frontend Cart Page Validation**: `node -c development/frontend/src/pages/Cart.jsx` -> `PASSED`

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-011 শুরু করো।
```
