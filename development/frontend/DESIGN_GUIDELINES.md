# AquaFlow Frontend UI/UX Design System Guidelines

> Owned and maintained by `jarvis`.  
> Visual reference: [https://wavio.peerduck.com/home-bottle/](https://wavio.peerduck.com/home-bottle/)

This document establishes the mandatory design standards and rules for building the AquaFlow frontend application in `development/frontend/`. All frontend development (`friday`) must strictly adhere to these guidelines to ensure a premium, modern, accessible, and consistent user experience across the public storefront, customer portal, admin dashboard, and delivery staff dashboard.

---

## 1. Design Philosophy & Visual Direction

- **Wavio Brand Identity**: Inspired by modern bottled water and hydration brands. Crisp white and light slate surfaces, pure water-blue accents (`#0284c7`), vibrant sky-blue highlights (`#0ea5e9`), and calm cyan touches (`#06b6d4`).
- **Trust & Purity**: A clean, trustworthy aesthetic with ample whitespace, subtle borders (`border-slate-200 dark:border-slate-800`), and soft, refined shadows (`shadow-sm`, `shadow-md`).
- **Bilingual Typographic Harmony**: First-class support for both English (Latin script via **Inter**) and Bengali (Bangla script via **Hind Siliguri** or **Noto Sans Bengali**).
- **Mobile-First for Field Staff**: Touch-optimized interface for delivery personnel (minimum 44x44px touch targets, high contrast for outdoor sunlight use).

---

## 2. Color Palette Tokens (Semantic CSS Variables)

All components must consume theme variables or Tailwind utility classes mapped to these semantic roles:

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;        /* Slate-50 */
  --bg-card: #ffffff;
  --border-subtle: #e2e8f0;       /* Slate-200 */
  --border-active: #0284c7;       /* Sky-600 */

  /* Typography */
  --text-primary: #0f172a;        /* Slate-900 */
  --text-secondary: #475569;      /* Slate-600 */
  --text-muted: #94a3b8;          /* Slate-400 */

  /* Primary Water Brand (Sky-600) */
  --primary: #0284c7;
  --primary-hover: #0369a1;       /* Sky-700 */
  --primary-light: #e0f2fe;       /* Sky-100 */
  --primary-foreground: #ffffff;

  /* Secondary & Cyan Accents */
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
  /* Dark Surfaces */
  --bg-primary: #0b0f19;
  --bg-secondary: #0f172a;        /* Slate-900 */
  --bg-card: #1e293b;             /* Slate-800 */
  --border-subtle: #334155;       /* Slate-700 */
  --border-active: #38bdf8;       /* Sky-400 */

  /* Dark Typography */
  --text-primary: #f8fafc;        /* Slate-50 */
  --text-secondary: #94a3b8;      /* Slate-400 */
  --text-muted: #64748b;          /* Slate-500 */

  /* Dark Brand Primary */
  --primary: #38bdf8;             /* Sky-400 */
  --primary-hover: #0284c7;       /* Sky-600 */
  --primary-light: #082f49;       /* Sky-950 */
  --primary-foreground: #0f172a;

  --secondary: #0ea5e9;
  --accent-cyan: #22d3ee;
}
```

---

## 3. Typography Scale & Bengali Harmony

- **English Font**: `Inter, system-ui, -apple-system, sans-serif`
- **Bangla Font**: `'Hind Siliguri', 'Noto Sans Bengali', sans-serif`
- **Typography Scale**:
  - `Hero / Display`: `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight`
  - `Page Title (h1)`: `text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white`
  - `Section Header (h2)`: `text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-100`
  - `Card Header (h3)`: `text-lg font-medium text-slate-800 dark:text-slate-200`
  - `Body Regular`: `text-sm sm:text-base font-normal text-slate-600 dark:text-slate-300 leading-relaxed`
  - `Caption / Helper`: `text-xs font-medium text-slate-400 dark:text-slate-500`
  - `Monetary Figures`: `font-semibold tracking-normal` with Bangladeshi Taka symbol `৳`

---

## 4. Mandatory 6 UI States Matrix (Zero Missing States)

Every screen, table, form, and feature component MUST implement the following 6 states:

| UI State | Visual & Behavioral Requirement | Implementation Rule |
|---|---|---|
| **1. Default / Success** | Clean layout, crisp data display, accessible buttons, tooltips | Card & grid layout with soft borders |
| **2. Loading State** | **Skeleton Loaders** mirroring exact card, table row, or list item shape | `<Skeleton className="h-48 w-full rounded-2xl" />` |
| **3. Empty State** | Centered water icon, localized headline, friendly description, and a primary CTA button | `<EmptyState icon={Droplets} title="No Orders Found" ... />` |
| **4. Validation / Error** | Inline red helper text under invalid inputs, toast notifications for API failures | React Hook Form error prompts |
| **5. Responsive State** | Mobile-first design; touch-friendly cards for field drivers, responsive drawer menus | Minimum 44x44px touch targets; no horizontal overflow |
| **6. Interactive / A11y** | Smooth hover elevation (`transition-all duration-200`), visible focus rings (`focus-visible:ring-2 ring-sky-500`), disabled opacity (`opacity-50 cursor-not-allowed`) | WCAG 2.2 AA compliant contrast ratio (> 4.5:1) |

---

## 5. Reusable Component Primitives

1. **Button (`<Button />`)**:
   - Variants: `primary`, `secondary`, `outline`, `ghost`, `destructive`
   - Sizes: `sm`, `md`, `lg`, `icon`
   - States: `loading` with inline spinner, `disabled`
2. **Input (`<Input />`)**:
   - Visual clear border, active focus ring `ring-sky-500`
   - Integrated label, helper text, and error prompt
3. **Card (`<Card />`)**:
   - Modern soft border `border-slate-200 dark:border-slate-800`, subtle shadow
   - Slots: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`
4. **Badge (`<Badge />`)**:
   - Semantic status indicators: `success` (Delivered, Paid), `warning` (Pending, In Transit), `danger` (Failed, Cancelled), `info` (Assigned), `neutral`
5. **Skeleton (`<Skeleton />`)**:
   - Pulsing shimmer animation for cards, table rows, and text lines
6. **EmptyState (`<EmptyState />`)**:
   - Centered Lucide icon (e.g. `Droplets`, `Package`, `Clock`), bilingual title, description, and action button
7. **Alert (`<Alert />`)**:
   - Informational and warning banners (e.g. Service Area Coverage Notices, Delivery Reminders)
