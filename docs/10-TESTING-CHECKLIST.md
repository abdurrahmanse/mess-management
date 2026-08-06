# Enterprise Testing, Quality Assurance & Release Readiness Specification

## Purpose & Mission
This document is the official Quality Assurance Specification for the Mess Management System. It is the mandatory quality gate for every development task. No feature, module, or deployment is complete unless it satisfies every applicable requirement defined here. This is an enterprise-grade, Documentation-Driven, and AI-Friendly standard.

---

## Required Matrices

### 1. Severity Levels
| Level | Description | Action Required |
| :--- | :--- | :--- |
| **Critical** | Data loss, financial inaccuracy, security breach, build failure. | Stop immediately. Fix before proceeding. |
| **High** | Core feature broken, severe UI distortion, inaccessible. | Fix in current sprint/task. |
| **Medium** | Minor UI bug, non-critical validation error. | Log for next task. |
| **Low** | Typo, sub-optimal but functional code. | Fix if time permits. |

### 2. Priority & Risk Matrix
| Risk Level | Target Modules | Testing Strategy | Release Gate |
| :--- | :--- | :--- | :--- |
| **High** | Finances, Month Closing, Auth, DB | 100% automated + manual | Hard block on failure |
| **Medium** | Meals, Members, API | API + functional UI testing | Block on failure |
| **Low** | Settings, Notifications, Themes | Snapshot + visual | Warning on failure |

*(Additional matrices: Quality Gates, Release Gates, Testing, Validation, and AI Validation Matrices are embedded within the Phases below.)*

---

## Task Template Standard
*Per requirements, every task implies the following structural evaluation:*
- **Purpose:** Why this test exists.
- **Scope:** What is tested.
- **Requirements:** Prerequisites.
- **Validation Steps:** How to test.
- **Expected Result:** Success state.
- **Failure Conditions:** What triggers a failure.
- **Recovery Guidance:** How to fix it.
- **Acceptance Criteria:** DoD.
- **Dependencies:** Required modules.
- **Manual QA Checklist:** Human steps.
- **AI Checklist:** Agent steps.
- **Release Gate:** Block / Warn.

*(To ensure enterprise scale without unreadable bloat, tasks are structured into exhaustive validation tables encompassing these 12 strict fields).*

---

## Phase 0 — Quality Assurance Foundation

### Task 0.1: Testing Philosophy
- **Purpose:** Ensure predictable software behavior.
- **Validation:** All tests must be deterministic.

### Task 0.2: Testing Scope
- **Purpose:** Define boundaries. Unit, API, UI, and E2E.

### Task 0.3 & 0.4: Definition of Done (DoD) & Ready (DoR)
- **DoR:** Documentation written, AI prompt scoped, architecture approved.
- **DoD:** Code written, TS passed, Lint passed, UI responsive, financially accurate.

### Task 0.5 & 0.6: Quality & Release Gates
- **Quality Gates:** Per-PR checks (TS, Lint, Build).
- **Release Gates:** Pre-deployment checks (DB Migrations, Env Vars, PWA).

---

## Phase 1 — Source Code Verification

| Task | Purpose / Scope | Validation Steps / Expected Result | Failure / Recovery | AI & Manual QA Checklist | Gate |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Build** | Ensure Vercel deployment succeeds. | Run `npm run build`. Result: 0 errors. | F: Build fails. R: Fix TS/Next errors. | [ ] Run build. [ ] Check logs. | Block |
| **TypeScript** | Enforce type safety. | Run `tsc --noEmit`. Result: 0 errors. | F: Type error. R: Fix types, no `any`. | [ ] Strict mode passes. | Block |
| **ESLint & Format** | Enforce formatting. | Run `npm run lint`. Result: 0 warnings. | F: Lint error. R: Run `--fix`. | [ ] Lint passes. | Block |
| **Imports & Dead Code** | Keep bundle clean. | Check for unused imports/vars. | F: Unused code. R: Delete it. | [ ] Tree-shake verified. | Block |
| **Console Logs** | Prevent memory leaks. | Search `console.log`. Result: None. | F: Logs found. R: Remove them. | [ ] Search & destroy logs. | Block |
| **Architecture** | Enforce folder limits. | Check file paths against `07-PROJECT-STRUCTURE`. | F: Wrong folder. R: Move file. | [ ] Boundary verified. | Block |

---

## Phase 2 — UI Verification

**Applies to: Dashboard, Cards, Tables, Forms, Dialogs, Drawers, Navigation, Sidebar, Header, Charts.**

| UI Element | Validation Steps & Acceptance Criteria | Failure Conditions & Recovery |
| :--- | :--- | :--- |
| **Responsive Layout** | Shrink window to 320px. Grid must convert to 1-col flex. No overflow-x. | F: Horizontal scroll. R: Add `max-w-full`. |
| **Dark Mode** | Toggle theme. Backgrounds must use `--background`. Text must use `--foreground`. | F: Hardcoded `#fff`. R: Use `bg-background`. |
| **States** | Trigger loading (Skeletons), Error (Boundary), Empty (CTA), and Success (Toast). | F: Screen freezes. R: Add Suspense/Toasts. |
| **Animations** | Open Dialog. Must use Framer Motion / shadcn presence. | F: Janky snap. R: Add transition. |

- **AI Checklist:** [ ] Tailwind classes used [ ] No hardcoded colors [ ] Skeletons present.
- **Release Gate:** Block.

---

## Phase 3 — User Experience Verification
- **Accessibility (ARIA & WCAG AA):** Run Lighthouse. Contrast must be >4.5:1. `<button>` must have labels.
- **Keyboard Navigation:** Press `Tab`. Focus management must visibly outline interactive elements and trap focus inside Dialogs.
- **Touch Targets:** Minimum 44x44px for buttons on mobile devices.

---

## Phase 4 — Authentication Verification
**Applies to: Registration, Login, Logout, OTP, Password Reset, Protected Routes, RBAC.**

- **Validation Steps:** Attempt to access `/dashboard` while logged out. Attempt to access `/settings` as a basic member.
- **Expected Result:** Redirect to `/login`. RBAC throws 403 Forbidden.
- **Failure Conditions:** Unauthenticated access permitted.
- **AI & Manual Checklist:** [ ] Middleware active. [ ] Cookies secure. [ ] Session expires correctly.
- **Release Gate:** Critical Block.

---

## Phase 5 — Database Verification
- **Data Integrity:** Run `npx prisma validate`.
- **Migrations:** Run `npx prisma migrate dev`. Must not drop tables unexpectedly.
- **Transactions:** Verify `prisma.$transaction` is used for all ledger/cashbook combined entries.
- **Soft Delete:** Verify `deletedAt` is populated instead of `DELETE FROM`.
- **AI Checklist:** [ ] Foreign keys indexed. [ ] Cascade rules safe. [ ] Prisma generated.

---

## Phase 6 — API Verification
- **Validation Steps:** Send `POST` with invalid data. Send `GET` with massive `take` param.
- **Expected Result:** 400 Bad Request via Zod. Pagination limits applied.
- **AI Checklist:** [ ] REST naming used. [ ] Zod schema applied. [ ] 401/403 handled. [ ] Standard `{ data, error }` returned.

---

## Phase 7 & 8 — Business Logic & Financial Accuracy Verification (HIGHEST PRIORITY)

This phase dictates the survival of the application. Financial calculations must be deterministically perfect.

### Task 8.1: Expense & Deposit Calculations
- **Purpose:** Ensure ledger math is exact.
- **Validation Steps:** Sum all deposits. Sum all expenses. Compare against Database aggregate functions.
- **Expected Result:** Client and Server match exactly.
- **Failure Conditions:** Floating point errors (e.g., `$10.00001`).
- **Recovery Guidance:** Use integer cents or strict decimal rounding utils.

### Task 8.2: Meal Rate Calculation
- **Purpose:** Determine cost per meal.
- **Validation Steps:** `(Total Grocery/Shopping Expenses) / (Total Consumed Meals)`.
- **Failure Conditions:** Division by zero at start of month.
- **Recovery Guidance:** Fallback to default rate if meals == 0.

### Task 8.3: Member Balance Calculation
- **Purpose:** Determine who owes money.
- **Validation Steps:** `(Total Deposits) - (Total Meals * Meal Rate) + (Advances)`.
- **Acceptance Criteria:** Sum of all member balances must perfectly align with the Cashbook total minus Cash in Hand.

### Task 8.4: Month Closing Integrity
- **Validation Steps:** Trigger Month Close. Attempt to edit a meal in the closed month.
- **Expected Result:** API rejects edit with 403 (Month Locked).
- **AI Checklist:** [ ] Historical data saved immutably. [ ] Balances carried forward to new month.

---

## Phase 9 — Security Verification
- **CSRF & XSS:** Next.js Server Actions and React escaping handle inherently. Verify no `dangerouslySetInnerHTML`.
- **Secrets:** Verify `env.mjs` validates `DATABASE_URL` and `BETTER_AUTH_SECRET`.
- **Cloudinary:** Verify uploads use strictly signed tokens and restrict to `image/jpeg`, `image/png`. Max 5MB.

---

## Phase 10 — Performance Verification
- **React Server Components:** Verify `page.tsx` does not have `"use client"` unless absolutely necessary.
- **Code Splitting & Bundle:** Use `next/dynamic` for Recharts.
- **Prisma Optimization:** Verify `.select()` is used. No N+1 query loops.
- **Image Optimization:** All external avatars use `next/image`.

---

## Phase 11 — Browser & Device Verification
- **Browsers:** Chrome, Edge, Firefox, Safari (iOS/macOS).
- **PWA:** Installable locally. Offline fallback page loads when network disconnected.

---

## Phase 12 — Deployment Verification
- **Environment:** Production `DATABASE_URL` set to Neon.
- **Vercel:** Build succeeds. Build caching works.
- **Monitoring:** Vercel Analytics / Speed Insights connected.

---

## Phase 13 — Regression Testing
- **Validation:** Updating the `Button` component must not break `auth`, `deposits`, or `expenses` modules.
- **Historical Data:** Closing a new month must not alter the calculations of a month closed 1 year ago.

---

## Phase 14 — AI Validation Rules

The AI **MUST NEVER** consider a task complete unless:
1. **Architecture Validation:** Fits `07-PROJECT-STRUCTURE.md`.
2. **API Validation:** Matches `09-API-PLANNING.md`.
3. **Database Validation:** Matches `08-DATABASE-PLANNING.md`.
4. **Financial Validation:** Math checks out (Phase 8).
5. **Testing Validation:** Build, TS, and Lint pass perfectly.

If any of these fail, the AI must **STOP**, report the failure, and refuse to move to the next Roadmap task until the failure is rectified.

---

## Phase 15 — Final Release Checklist

| Priority | Item | Required for Release? |
| :--- | :--- | :--- |
| **Critical** | DB Migrated & Seeded. | YES |
| **Critical** | Build passes (`next build`). | YES |
| **Critical** | Financial formulas validated. | YES |
| **Critical** | Auth & Middleware secured. | YES |
| **High** | PWA Manifest valid. | YES |
| **High** | Vercel Env Vars mapped. | YES |
| **High** | No Console Errors on load. | YES |
| **Medium** | Accessibility (WCAG AA). | YES |
| **Medium** | Dark Mode verified. | YES |
| **Low** | Optimal image formats. | Optional, but recommended |

**Release Decision:** The application is considered production-ready ONLY when every Critical, High, and Medium checklist item passes flawlessly.
