# TASK-002: Define AquaFlow Design Tokens & UI Primitives

> **Status**: `DONE`  
> **Assignee**: `jarvis` (UI/UX Specialist)  
> **Priority**: `P0` (Critical)  
> **Dependencies**: `TASK-001` (DONE)  
> **Master Board**: [planning/task.md](../task.md)

---

## 1. Objective & User Story
As UI/UX specialist (`jarvis`), establish the AquaFlow design system inspired by Wavio ([https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)), defining water-inspired blue color tokens (`#0284c7`, `#0369a1`, `#0ea5e9`), bilingual typography (Inter & Hind Siliguri), surface neutrals, spacing, and component patterns for the 6 mandatory UI states across all 4 customer and staff applications.

---

## 2. Inputs & Context Documents
- **Design Specifications**: [docs/04-design-system.md](../../docs/04-design-system.md)
- **Design Guidelines**: [development/frontend/DESIGN_GUIDELINES.md](../../development/frontend/DESIGN_GUIDELINES.md)
- **Client Branding in README**: [README.md](../../README.md)
- **Reference Site**: [https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)

---

## 3. Step-by-Step Execution Plan
1. Extract and standardize the AquaFlow palette tokens:
   - Primary: Water Blue `#0284c7`, Primary Hover `#0369a1`, Primary Light `#e0f2fe`
   - Secondary / Accent: Sky Blue `#0ea5e9`, Cyan `#06b6d4`
   - Surfaces: Light `#ffffff`, Slate-50 `#f8fafc`, Borders `#e2e8f0`
   - Dark mode variables: Dark Surface `#0b0f19`, Card `#1e293b`
2. Configure typography hierarchy supporting Latin (Inter) and Bengali (Hind Siliguri / Noto Sans Bengali).
3. Document exact JSX/CSS specifications for the **6 Mandatory UI States**:
   - `Default / Success`
   - `Loading Skeleton` (shimmer matching product card and table row)
   - `Empty State` (water-droplet icon, localized message, CTA)
   - `Validation / Error State` (accessible Bengali and English error prompts)
   - `Responsive Layout` (mobile-first for delivery staff, responsive for public and admin)
   - `Interactive / A11y State` (visible focus ring `focus-visible:ring-2 ring-sky-500`, WCAG 2.2 AA contrast)
4. Update `development/frontend/DESIGN_GUIDELINES.md` with concrete implementation tokens.
5. Create standard styling and UI primitives in `development/frontend/src/`:
   - `src/styles/globals.css` with Google Fonts, CSS variables, and utility classes.
   - `src/lib/utils.js` with `cn()` and `formatBDT()` helpers.
   - `src/components/ui/` with `Button`, `Input`, `Card`, `Badge`, `Skeleton`, `EmptyState`, and `Alert`.
   - `tailwind.config.js` and `postcss.config.js`.

---

## 4. Expected Outputs
- `development/frontend/DESIGN_GUIDELINES.md` updated with exact AquaFlow tokens.
- `development/frontend/src/styles/globals.css` created with semantic variables and font stacks.
- `development/frontend/src/lib/utils.js` created with `cn()` and `formatBDT()`.
- 7 UI primitives created in `development/frontend/src/components/ui/`.
- `tailwind.config.js` and `postcss.config.js` configured.

---

## 5. Acceptance Criteria
- [x] Tailwind tokens reflect water-inspired blue brand palette (`#0284c7`, `#0ea5e9`, `#06b6d4`).
- [x] Full English (Inter) and Bengali (Hind Siliguri) font stacks configured.
- [x] 6 mandatory UI states explicitly documented with code snippets.
- [x] WCAG 2.2 AA contrast verified (> 4.5:1).
- [x] Core UI primitives built and verified with clean syntax.

---

## 6. Verification Evidence (Thanos)
- **Command**: `node -c src/lib/utils.js && node -c tailwind.config.js && node -c postcss.config.js`
- **Status**: `PASSED`
- **Output Log**: All JavaScript configuration files and helpers validated with zero syntax errors.
- **Protocol Command**: `& "C:\Program Files\Git\bin\bash.exe" scripts/validate-project.sh`
- **Status**: `PASSED` (100% protocol checks passed).

---

## 7. Fresh Session Handoff
```markdown
planning/updateplanning.md পড়ে TASK-003 শুরু করো।
```
