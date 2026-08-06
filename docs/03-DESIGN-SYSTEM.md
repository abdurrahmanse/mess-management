# Enterprise Design System Specification

## Purpose
This document is the absolute source of truth for all UI/UX implementations in the Mess Management System. It ensures a production-grade, highly cohesive visual language across the entire platform.

---

## 1. Design Philosophy
- **Design Vision:** Provide a frictionless, dashboard-driven experience similar to Linear, Vercel, and Stripe.
- **UX Principles:** Predictable interactions, fast navigation, and immediate visual feedback.
- **Product Personality:** Professional, trustworthy, precise, and financially secure.
- **Information Hierarchy:** Data first. Navigation and chrome must recede to the background.
- **Simplicity Rules:** Avoid excessive borders and nested boxes. Use whitespace and typography to separate content.
- **Consistency Rules:** Same actions use the same colors, placements, and verbiage globally.
- **Trust & Financial UI:** Amounts align right, positive is green, negative is red. No ambiguity.

---

## 2. Design Tokens
*Values are abstract token names linking to CSS variables.*

| Category | Token | Value/Description |
| :--- | :--- | :--- |
| **Spacing** | `--spacing-*` | Base 4px system (e.g., 4, 8, 12, 16, 24, 32). |
| **Radius** | `--radius-*` | `sm` (4px), `md` (6px), `lg` (8px), `full` (9999px). |
| **Elevation** | `--shadow-*` | `sm` (cards), `md` (dropdowns), `lg` (modals). |
| **Blur** | `--blur-*` | `sm` (navbars), `md` (overlays). |
| **Border Width** | `--border-*` | `1px` default, `2px` for focus rings. |
| **Transition** | `--duration-*` | `fast` (150ms), `normal` (200ms), `slow` (300ms). |
| **Animation Curve**| `--ease-*` | `ease-out` (entering), `ease-in` (exiting). |
| **Container** | `--container-w` | `1400px` max-width. |

---

## 3. Color System

| Role | Variable | Usage |
| :--- | :--- | :--- |
| **Primary** | `--primary` | High emphasis actions (Submit buttons, Active states). |
| **Secondary** | `--secondary` | Medium emphasis, alternate buttons, subtle highlights. |
| **Success** | `--success` | Positive financial values, success toasts, completed statuses. |
| **Warning** | `--warning` | Pending statuses, non-destructive alerts. |
| **Danger** | `--destructive` | Destructive actions, negative financial values, errors. |
| **Muted** | `--muted` | Disabled states, background for secondary blocks. |
| **Border** | `--border` | Dividers, card outlines, input borders. |
| **Background**| `--background` | Primary page background. |
| **Foreground**| `--foreground` | Primary text. |
| **Sidebar** | `--sidebar` | Distinct background tone for left navigation. |

---

## 4. Typography System
- **Font Family:** `Inter` (sans-serif) for all UI, `JetBrains Mono` for code/IDs.
- **Weights:** Regular (400), Medium (500), Semibold (600), Bold (700).

| Scale | Token | Size / Line Height | Usage |
| :--- | :--- | :--- | :--- |
| **Heading 1** | `text-3xl` | 30px / 36px | Page titles. |
| **Heading 2** | `text-2xl` | 24px / 32px | Section titles. |
| **Heading 3** | `text-xl` | 20px / 28px | Card titles, Modals. |
| **Body** | `text-base` | 16px / 24px | Default reading text. |
| **Caption** | `text-sm` | 14px / 20px | Table cells, inputs, generic labels. |
| **Metadata** | `text-xs` | 12px / 16px | Timestamps, extremely dense data. |
| **Statistics**| `text-4xl` | 36px / 40px | KPI dashboard numbers. |

---

## 5. Layout System
- **Dashboard Layout:** Fixed left sidebar, sticky top header, scrollable main content area.
- **Section Container:** `flex flex-col gap-6`.
- **Card Layout:** Padded evenly, optional header with bottom border, content area.
- **Sticky Elements:** Table headers and main navigation headers must remain visible on scroll.

---

## 6. Component Standards
- **Buttons:** 4 sizes (sm, default, lg, icon). Variants: default, secondary, outline, ghost, destructive.
- **Inputs:** Height matches buttons. Focus ring required.
- **Select/Combobox:** Searchable combobox preferred for lists > 10 items.
- **Dialog:** Backdrop blur, centered, max-width `md`.
- **Drawer:** Slides from right (desktop) or bottom (mobile). Used for complex forms.
- **Toast:** Bottom-right corner. Auto-dismisses in 4s.
- **Badge:** Rounded-full. Used for statuses.
- **Data Table:** Compact padding, hover state on rows, zebra striping off by default.

---

## 7. Form System
- **Layout:** Vertical stack (Label above Input). Gap of 8px between label/input, 24px between fields.
- **Validation:** Instant validation on blur. Red text below input for errors.
- **Loading States:** Submit button transforms to disabled state with a spinner icon.
- **Help Text:** Muted text directly below the input for complex requirements.

---

## 8. Table System
- **Column Layout:** Text left-aligned. Numbers right-aligned. Actions right-aligned.
- **Sorting:** Clickable headers with up/down caret icons.
- **Bulk Actions:** Floating action bar appears at the bottom when rows are selected.
- **Sticky Header:** The header `th` must stay at the top of the table wrapper when scrolling.
- **Actions:** Hidden behind an ellipsis `...` dropdown menu to save space.

---

## 9. Chart System
- **Colors:** Must map to CSS variables (`--chart-1`, `--chart-2`) to support automatic dark mode switching.
- **Legend:** Placed below the chart.
- **Tooltip:** Always enabled. Dark background, precise numbers.
- **Empty State:** Gray dashed box with "No data available for this period."

---

## 10. Dashboard Standards
- **KPI Cards:** Top row. Contain Title, Big Number, and Trend (e.g., "+5% from last month" in green).
- **Widgets:** Grid layout. Typical sizes are 1/3 width or 1/2 width.
- **Activity Feed:** Chronological list with avatars and relative timestamps (e.g., "2 hours ago").

---

## 11. Page Templates
- **List Page:** Header (Title + Primary Action Button) -> Search/Filter Bar -> Data Table -> Pagination.
- **Details Page:** Breadcrumbs -> Header -> 2-Column Grid (Main details left, metadata right).
- **Settings Page:** Left vertical tab list, right content area (similar to GitHub settings).

---

## 12. Navigation Standards
- **Sidebar:** Icons + Text. Collapses to icons-only on tablet. Hidden behind hamburger on mobile.
- **Topbar:** Breadcrumbs on the left. Search (Cmd+K), Theme Toggle, Notifications, Profile Menu on the right.

---

## 13. Responsive Design
- **Mobile (`<768px`):** Single column. Sidebar becomes a drawer. Tables allow horizontal scrolling.
- **Tablet (`768px - 1024px`):** 2-column grids allowed. Sidebar collapsed.
- **Desktop (`>1024px`):** Full sidebar. 3-column grids allowed.
- **Ultra Wide (`>1440px`):** Content centers and caps at `--container-w` to prevent infinite stretching.

---

## 14. Motion System (Framer Motion)
- **Page Transition:** Gentle fade in `opacity: 0 -> 1` (Duration 200ms).
- **Modal:** Scale up from `0.95 -> 1` and fade in (Duration 150ms).
- **Hover:** Fast background color transitions (Duration 150ms).
- **Loading:** Infinite smooth spin or pulse.

---

## 15. Accessibility
- **WCAG Compliance:** Target AA standard.
- **Keyboard Navigation:** Tab must flow sequentially. Enter triggers links/buttons. Space triggers toggles.
- **ARIA:** `aria-label` required for all icon-only buttons.
- **Focus States:** Every interactive element must have a visible `ring-2` focus state.
- **Color Contrast:** Text must have a 4.5:1 ratio against its background.

---

## 16. Empty / Loading / Error States
- **Loading:** Use skeleton loaders matching the exact shape of the incoming data. No generic spinners for main content.
- **Empty List:** Centered illustration/icon, muted descriptive text, and a call-to-action button to create the first item.
- **404 / 500:** Dedicated full-page minimal layouts with a "Return Home" button.

---

## 17. Theme System
- **Dark Mode:** Fully supported.
- **Theme Tokens:** Backgrounds become dark grays (not pure black). Borders become slightly lighter grays. Shadows are removed or heavily darkened.
- **Persistence:** Saved in `localStorage` or a cookie.

---

## 18. Icons (Lucide React)
- **Sizes:** `16px` (sm), `20px` (md - default), `24px` (lg).
- **Stroke Width:** `1.5` or `2` (must remain consistent globally).
- **Usage:** Left-aligned inside buttons. Muted color inside inputs.

---

## 19. Image & File Display
- **Avatar:** Circular. Initials fallback if image fails or is missing.
- **Receipt Preview:** Displayed as a rounded rectangle thumbnail. Click expands into an Image Modal.
- **Document Card:** Icon representing file type, filename, size, and download button.

---

## 20. Naming Convention
- **Components:** `[Entity][Type]` (e.g., `MemberTable`, `DepositForm`).
- **CSS Variables:** `--[category]-[name]` (e.g., `--color-primary`, `--spacing-md`).
- **Variants:** lowercase (e.g., `variant="outline"`, `size="sm"`).
