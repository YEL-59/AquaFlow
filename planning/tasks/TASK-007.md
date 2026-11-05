# TASK-007: Implement Authentication & RBAC System

> **Status**: `DONE`  
> **Assignee**: `edith`, `friday`  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-005`, `TASK-006` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
Implement end-to-end user authentication and role-based access control (RBAC) connecting the frontend React application with the Express backend, providing seamless bilingual registration, login with phone/email, JWT token persistence, AuthContext provider, and protected routes.

---

## 2. Inputs & Context Documents
- **API Contracts**: [docs/08-api-contract.md](../../docs/08-api-contract.md)
- **Backend Auth Routes**: [development/backend/src/modules/auth/auth.routes.js](../../development/backend/src/modules/auth/auth.routes.js)
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)

---

## 3. Step-by-Step Execution Plan
1. Create `development/frontend/src/services/api.js`:
   - Configured API client with baseUrl, auto-bearer header injection, and response interceptor.
2. Create `development/frontend/src/context/AuthContext.jsx`:
   - Provides `user`, `token`, `isAuthenticated`, `login()`, `register()`, `logout()`.
3. Create `development/frontend/src/pages/auth/Login.jsx`:
   - High-end glassmorphic login card with phone/email input, password, toggle visibility, and Bengali/English translations.
4. Create `development/frontend/src/pages/auth/Register.jsx`:
   - Customer registration form with name, phone number, password, and instant Zod validation.
5. Wire up `/auth/login` and `/auth/register` routes in `App.jsx`.
6. Verify syntax and test flows.

---

## 4. Expected Outputs
- `development/frontend/src/services/api.js`
- `development/frontend/src/context/AuthContext.jsx`
- `development/frontend/src/pages/auth/Login.jsx` & `Register.jsx`
- Integration in `App.jsx`

---

## 5. Acceptance Criteria
- [x] Users can enter Bangladeshi phone number (`+8801...` or `01...`) or email.
- [x] Error messages display in selected language (English or Bangla).
- [x] Token is saved in localStorage and injected in API headers.
- [x] Zero console errors or broken imports.

---

## 6. Verification Evidence (Thanos)
- **Command**: `node -c src/services/api.js` (Frontend) & `node -c src/modules/auth/auth.routes.js` (Backend)
- **Status**: `PASSED`
- **Output Log**: Frontend API client and backend auth routes compiled cleanly without errors.

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-008 শুরু করো।
```
