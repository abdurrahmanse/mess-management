# 03 - Design System

## Purpose
This document defines the strict visual language, UI components, and design guidelines for the application.

## Scope
Applies to all visual assets, components, CSS, and layout structures within the frontend application.

---

## 1. Design Philosophy
- **Clean & Minimalist:** High signal-to-noise ratio. Content over chrome.
- **Professional & Trustworthy:** Colors and spacing should reflect a financial/management application.
- **Highly Responsive:** Seamless experience from mobile to 4K desktop.

## 2. Design Tokens
- Managed globally in `app/globals.css` using CSS variables to support dynamic theming.
- **Primary Base:** Slate/Zinc (`shadcn/ui` default).
- **Brand Colors:** Reserved for primary actions (buttons, active states).

## 3. Spacing Rules
- Use Tailwind's default spacing scale (`p-4`, `m-6`, `gap-2`).
- 8pt grid system.
- Consistent padding within Cards and Sections.

## 4. Typography Rules
- **Font:** `Inter` (via `next/font/google`).
- **Headings:** Bold, tight tracking. `h1` (text-4xl), `h2` (text-3xl), `h3` (text-2xl).
- **Body:** `text-base` or `text-sm` for dense tables. `text-muted-foreground` for secondary information.

## 5. Radius & Shadow Rules
- **Radius:** `0.5rem` (`rounded-lg`) globally for buttons, cards, and inputs.
- **Shadow:** `shadow-sm` for cards, `shadow-md` for dropdowns, `shadow-lg` for modals.

## 6. Layout Rules
- **Dashboard Layout:** Persistent left sidebar, top header for user context, scrollable main content area.
- **Max Width:** Content constrained to `max-w-7xl` on large screens to prevent stretching.

## 7. Component Specific Rules

### Sidebar & Header
- **Sidebar:** Collapsible on desktop, off-canvas drawer on mobile. Darker background for contrast.
- **Header:** Sticky. Contains Breadcrumbs, Theme Toggle, Notifications, and User Avatar menu.

### Cards
- Used to group related data. Must have an explicitly defined `CardHeader`, `CardTitle`, and `CardContent`.

### Forms
- Vertical layout default.
- Labels above inputs.
- Required fields explicitly marked.
- Inline error messages using destructive red.

### Tables
- TanStack Table powered.
- Must include pagination, column sorting, and basic row filtering for data-heavy views (Ledger, Members).
- Zebra striping or clear border separations.

### Charts
- Recharts powered.
- Tooltips enabled.
- Colors must pull from CSS variables to ensure Dark Mode compatibility.

### Dialogs & Drawers
- **Dialogs (Modals):** For destructive actions or quick data entry. Must have a backdrop blur.
- **Drawers:** For mobile-friendly bottom sheets or complex side-panel forms on desktop.

## 8. Theme & Responsiveness
- **Dark Mode:** Built-in via `next-themes`. All colors must gracefully invert. Avoid hardcoded hex codes.
- **Responsive:** Mobile-first approach. Modals convert to Drawers on small screens. Tables allow horizontal scrolling.

## 9. Animation Rules
- **Framer Motion:** Used for page transitions (fade/slide), list reordering, and micro-interactions.
- Keep animations under 200ms. Snappy and purposeful.

## 10. Accessibility Rules
- `aria-label` on all icon-only buttons.
- Tab-navigation must logically flow through forms.
- High contrast ratios for text.

---
*References: 01-CONSTITUTION.md*
