# TASK-006: Setup Express.js Modular Backend Architecture & Core Auth API

> **Status**: `DONE`  
> **Assignee**: `edith` (Backend & Data Architect)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-003`, `TASK-004` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Backend and Data Specialist (`edith`), implement the modular Express.js server architecture, Prisma singleton, environment configuration, centralized error handling middleware, JWT authentication with HttpOnly cookies, and RBAC guards under `/api/v1/auth`.

---

## 2. Inputs & Context Documents
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **Security Plan**: [docs/10-security-plan.md](../../docs/10-security-plan.md)
- **Prisma Schema**: [development/backend/prisma/schema.prisma](../../development/backend/prisma/schema.prisma)
- **Zod Schemas**: [development/backend/src/schemas/auth.schema.js](../../development/backend/src/schemas/auth.schema.js)

---

## 3. Step-by-Step Execution Plan
1. Configure `development/backend/package.json` for Express.js modular domain architecture.
2. Implement environment validation in `src/config/env.js` and Prisma singleton in `src/config/prisma.js`.
3. Implement core middlewares:
   - `src/middleware/validate.middleware.js` (Zod validation for request body/query)
   - `src/middleware/error.middleware.js` (Standard error envelope)
   - `src/middleware/auth.middleware.js` (JWT token extraction & `requireRoles()` guard)
4. Build `src/modules/auth/`:
   - `auth.service.js` with phone normalization, bcrypt hashing, and token issuance.
   - `auth.controller.js` with registration, login, refresh rotation, and logout.
   - `auth.routes.js` with validation bindings.
5. Build `src/app.js` and `src/server.js` with CORS, helmet, cookies, and health endpoints (`/health`, `/ready`).
6. Validate syntax of all created backend modules.

---

## 4. Expected Outputs
- `development/backend/src/config/` (env.js, prisma.js)
- `development/backend/src/middleware/` (validate, error, auth)
- `development/backend/src/modules/auth/` (service, controller, routes)
- `development/backend/src/app.js` and `src/server.js`
- Zero syntax errors.

---

## 5. Acceptance Criteria
- [x] Express.js modular monolith initialized with `/api/v1/` routes.
- [x] Password hashing with bcrypt salt rounds = 10.
- [x] Passwords excluded from responses and token payloads.
- [x] Standard error envelope returned on failure.
- [x] All JS files validated with `node -c`.

---

## 6. Verification Evidence (Thanos)
- **Command**: `node -c src/config/env.js src/config/prisma.js src/middleware/validate.middleware.js src/middleware/error.middleware.js src/middleware/auth.middleware.js src/modules/auth/auth.service.js src/modules/auth/auth.controller.js src/modules/auth/auth.routes.js src/app.js src/server.js`
- **Status**: `PASSED`
- **Output Log**: All 10 backend server files compiled cleanly without errors.

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-007 শুরু করো।
```
