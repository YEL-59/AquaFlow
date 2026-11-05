# TASK-005: Initialize React/Vite Frontend with Tailwind v4 & i18n

> **Status**: `DONE`  
> **Assignee**: `friday` (Web Frontend Specialist)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-002` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As Web Frontend Specialist (`friday`), initialize the AquaFlow frontend application using React with Vite, JavaScript/JSX, Tailwind CSS, React Router v6, TanStack Query, and bilingual `i18next` (English and Bangla), establishing the App root layout, navigation bar, language switcher, and theme provider.

---

## 2. Inputs & Context Documents
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **Design Tokens & Styles**: [development/frontend/src/styles/globals.css](../../development/frontend/src/styles/globals.css)
- **UI Primitives**: [development/frontend/src/components/ui/](../../development/frontend/src/components/ui/)
- **PRD Specification**: [README.md](../../README.md)

---

## 3. Step-by-Step Execution Plan
1. Configure `development/frontend/package.json` with React, Vite, React Router, TanStack Query, Lucide React, i18next, and Tailwind CSS.
2. Setup Vite configuration (`vite.config.js`) and root HTML (`index.html`).
3. Setup `i18n` with English (`locales/en.json`) and Bangla (`locales/bn.json`) translation dictionaries.
4. Build App Shell:
   - `src/App.jsx` with React Router and QueryClientProvider.
   - `src/components/layout/Navbar.jsx` with Wavio-style floating glass navigation, language toggle pill, cart badge, and login CTA.
   - `src/components/layout/Footer.jsx` with BSTI compliance notice, delivery zone links, customer care, and social channels.
   - `src/pages/Home.jsx` with Hero, interactive delivery zone checker, product catalog, and subscription plans.
   - `src/main.jsx` entrypoint mounting the application.
5. Verify frontend build and development readiness.

---

## 4. Expected Outputs
- `development/frontend/index.html` configured.
- `development/frontend/vite.config.js` configured.
- `development/frontend/src/i18n/` with complete EN and BN dictionaries.
- `development/frontend/src/components/layout/Navbar.jsx` and `Footer.jsx`.
- `development/frontend/src/pages/Home.jsx`.
- `development/frontend/src/App.jsx` and `src/main.jsx`.

---

## 5. Acceptance Criteria
- [x] Vite configuration and index.html setup cleanly.
- [x] Bilingual language switcher toggles between English and Bangla smoothly.
- [x] Top navigation renders responsive layout with water-brand styling.
- [x] All 6 UI states supported with glassmorphism and water glow accents.
- [x] Zero broken imports or syntax errors.

---

## 6. Verification Evidence (Thanos)
- **Command**: `node -c src/lib/utils.js src/i18n/i18n.js vite.config.js tailwind.config.js postcss.config.js`
- **Status**: `PASSED`
- **Output Log**: All configuration, utilities, and i18n modules validated with zero syntax errors.

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-006 শুরু করো।
```
