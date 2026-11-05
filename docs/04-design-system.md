# 04 — Design System & UI Specifications: AquaFlow

> Owned and maintained by `jarvis`. Visual reference: [https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)

---

## 1. Visual Direction & Brand Identity
- **Concept**: Clean, modern, trustworthy bottled-water and hydration management brand.
- **Palette**: White backgrounds, pure water-inspired blue accents, calm cyan secondary touches, restrained neutral slate surfaces, high-contrast accessible typography.
- **Tone**: Fresh, reliable, hygienic, premium commercial and household service.

---

## 2. Color Palette Tokens (Semantic CSS Variables)

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;        /* Slate-50 */
  --bg-card: #ffffff;
  --border-subtle: #e2e8f0;       /* Slate-200 */
  --border-active: #0284c7;

  /* Typography */
  --text-primary: #0f172a;        /* Slate-900 */
  --text-secondary: #475569;      /* Slate-600 */
  --text-muted: #94a3b8;          /* Slate-400 */

  /* Water Brand / Primary */
  --primary: #0284c7;             /* Sky-600 (Pure Water Blue) */
  --primary-hover: #0369a1;       /* Sky-700 */
  --primary-light: #e0f2fe;       /* Sky-100 */
  --primary-foreground: #ffffff;

  /* Aqua / Secondary Accent */
  --secondary: #0ea5e9;           /* Sky-500 */
  --accent-cyan: #06b6d4;         /* Cyan-500 */
  --accent-cyan-light: #ecfeff;   /* Cyan-50 */

  /* Semantic Feedback */
  --success: #10b981;             /* Emerald-500 */
  --success-light: #ecfdf5;
  --warning: #f59e0b;             /* Amber-500 */
  --warning-light: #fffbeb;
  --danger: #ef4444;              /* Rose-500 */
  --danger-light: #fef2f2;
  --info: #0284c7;
}

.dark {
  --bg-primary: #0b0f19;
  --bg-secondary: #0f172a;
  --bg-card: #1e293b;
  --border-subtle: #334155;
  --border-active: #38bdf8;

  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  --primary: #38bdf8;             /* Sky-400 */
  --primary-hover: #0284c7;
  --primary-light: #082f49;
  --primary-foreground: #0f172a;

  --secondary: #0ea5e9;
  --accent-cyan: #22d3ee;
}
```

---

## 3. Typography Hierarchy & Bilingual Fonts
- **Latin Font**: `Inter, system-ui, -apple-system, sans-serif`
- **Bangla Font**: `Hind Siliguri, Noto Sans Bengali, sans-serif`
- **Scale**:
  - **Display / Hero**: `2.75rem (44px)` to `3.5rem (56px)`, Bold, tracking tight (`tracking-tight`)
  - **Heading 1**: `2.25rem (36px)`, Bold
  - **Heading 2**: `1.875rem (30px)`, SemiBold
  - **Heading 3**: `1.5rem (24px)`, SemiBold
  - **Body Regular**: `1rem (16px)`, Regular, line-height 1.6
  - **Small / Meta**: `0.875rem (14px)`, Regular
  - **Badge / Metric**: `0.75rem (12px)`, Medium, uppercase tracking-wide

---

## 4. Mandatory 6 UI States Matrix
Every screen and component in AquaFlow must satisfy:

| State | Visual Requirement | AquaFlow Implementation Rule |
|---|---|---|
| **1. Default/Success** | Crisp data rendering, balanced padding, BDT `৳` symbols | Standard card & clean grid layout |
| **2. Loading Skeleton** | Shimmer animation mirroring exact content card/row shape | `<Skeleton className="h-48 w-full rounded-2xl" />` |
| **3. Empty State** | Centered water icon, localized headline, helpful description, action button | `<EmptyState icon={Droplets} action={...} />` |
| **4. Error/Validation** | Accessible red helper text, toast notices, Bengali error messages | React Hook Form `<ErrorMessage />` |
| **5. Responsive** | Mobile-first (<640px), tablet, and desktop layout adaptations | Touch-friendly targets (min 44x44px), collapsible sidebars |
| **6. Interactive/A11y** | Visible focus rings (`focus-visible:ring-2 ring-sky-500`), smooth hover | WCAG 2.2 AA compliant contrast ratio (> 4.5:1) |
