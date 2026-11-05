---
name: design-system
description: Workflow for establishing design tokens, typography scale, color palettes, dark mode, and UI component primitives with Jarvis.
---

# Design System Workflow (Jarvis)

## Purpose
Guide the Design Specialist (`jarvis`) to construct a coherent, accessible, and **extremely fancy, premium design system** that wows the user at first glance.

---

## 💎 Fancy Design & Visual Excellence Mandate (Mandatory)
Every component, card, banner, and page MUST look state-of-the-art and visually stunning:
1. **Luminous Water & Aqua Aesthetics**:
   - Curated HSL color palette tailored for AquaFlow: Deep Sapphire (`#0369a1`), Pure Sky Water (`#0284c7`), Vibrant Cyan (`#06b6d4`), and Fresh Aqua (`#38bdf8`).
   - Smooth multi-stop gradients (e.g. `bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-600`).
   - Gradient headline text clipping (`bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-700`).
2. **Glassmorphism & Surface Depth**:
   - Frosted glass cards with backdrop blurs (`backdrop-blur-xl bg-white/75 dark:bg-slate-900/80 border border-white/40 dark:border-slate-800/60`).
   - Soft ambient colored glow shadows (`shadow-[0_10px_30px_-5px_rgba(2,132,199,0.15)]`).
   - Delicate 1px borders with active gradient hover rings.
3. **Dynamic Motion & Micro-Animations**:
   - Liquid wave effects and shimmering skeleton loaders.
   - Smooth button interactions (`hover:scale-[1.02] active:scale-[0.98] transition-all duration-200`).
   - Glowing pulse dots on active delivery badges and live statuses.
4. **Bilingual Typography Harmony**:
   - Modern Latin typography with **Inter** and Bengali typography with **Hind Siliguri**.
   - Bengali labels formatted cleanly with matching line-height and typographic rhythm.

---

## Key Deliverables
1. **Design Tokens (`globals.css` / Tailwind Config)**:
   - Surface colors: `--bg-primary`, `--bg-secondary`, `--bg-card`, `--border-subtle`, `--border-active`.
   - Brand colors: `--primary`, `--primary-hover`, `--primary-light`, `--secondary`, `--accent-cyan`.
   - Semantic Feedback: `--success`, `--warning`, `--danger`, `--info`.
2. **Core UI Primitives**:
   - `Button`: Primary gradient, Secondary, Outline, Ghost, Danger with smooth hover physics and loading state.
   - `Input`: Frosted input field, focus-visible glowing ring, inline localized error state.
   - `Card`: Ultra-premium elevated card with glassmorphism, rounded-2xl corners, and optional glow.
   - `Badge`: Glowing status tags with soft pill backgrounds.
   - `Skeleton`: Elegant gradient shimmer loader.
   - `EmptyState`: Ambient water-drop illustration, friendly bilingual messaging, action CTA.
   - `Alert`: Floating alert banner with clean icons and subtle border tinting.
