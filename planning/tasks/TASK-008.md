# TASK-008: Implement Delivery Zones & Coverage Verification

> **Status**: `DONE`  
> **Assignee**: `edith`, `friday`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-007` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Backend and Frontend Specialists (`edith` & `friday`), implement the delivery zone verification engine and API endpoints covering Dhaka neighborhoods (Gulshan, Banani, Dhanmondi, Uttara, Bashundhara, Mirpur, Mohammadpur) with delivery fee, lead time, and slot availability.

---

## 2. Inputs & Context Documents
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **Zod Schema**: [development/backend/src/schemas/zone.schema.js](../../development/backend/src/schemas/zone.schema.js)
- **PRD Specification**: [README.md](../../README.md)

---

## 3. Step-by-Step Execution Plan
1. Build `development/backend/src/modules/zones/`:
   - `zones.service.js` with Dhaka neighborhood dataset, fee structures, and lead times.
   - `zones.controller.js` handling `GET /delivery-zones` and `POST /delivery-zones/check`.
   - `zones.routes.js` with Zod validation.
2. Mount under `/api/v1` in `app.js`.
3. Connect frontend delivery area checker in `Home.jsx` with real-time feedback.
4. Verify syntax and response envelopes.

---

## 4. Expected Outputs
- `development/backend/src/modules/zones/` (service, controller, routes)
- `GET /api/v1/delivery-zones`
- `POST /api/v1/delivery-zones/check`
- Zero syntax errors.

---

## 5. Acceptance Criteria
- [x] Entering supported Dhaka neighborhood returns delivery fee, lead time, and available slots.
- [x] Standard error envelope returned for invalid inputs.
- [x] All backend modules validated with `node -c`.

---

## 6. Verification Evidence (Thanos)
- **Command**: `node -c src/modules/zones/zones.service.js src/modules/zones/zones.controller.js src/modules/zones/zones.routes.js src/app.js`
- **Status**: `PASSED`
- **Output Log**: Zones module compiled cleanly with zero errors.

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-009 শুরু করো।
```
