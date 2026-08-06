# Enterprise AI-First Atomic Development Roadmap

## Mission
This document is the absolute single source of truth for the entire development lifecycle of the Mess Management System. It is strictly optimized for AI Coding Agents. The AI must never guess what, where, or how to build. Every execution strictly maps to exactly one **Prompt ID**.

---

## 1. Roadmap Hierarchy Standard
The roadmap strictly adheres to the following sequence:
`Program` -> `Release` -> `Phase` -> `Module` -> `Feature` -> `Epic` -> `Task` -> `Sub Task` -> `Atomic Task` -> `Prompt ID`

---

## 2. Standard Prompt Template
Every Prompt ID inherently carries the following 22-point contract. To eliminate redundancy in this document, the following template is the mandatory evaluation matrix for **every** Atomic Task listed below:

1. **Identity:** The specific Prompt ID and path.
2. **Purpose:** The exact implementation requirement.
3. **Business Objective:** Why this feature matters to the mess.
4. **Technical Objective:** The architectural outcome.
5. **Scope:** Strict inclusions and exclusions.
6. **Dependencies:** Required packages, DB states, and previous IDs.
7. **Prerequisites:** What must already exist.
8. **Files Allowed:** Strict whitelist of editable files.
9. **Files Forbidden:** Files that cannot be touched.
10. **Folder Restrictions:** Approved directories.
11. **Database Impact:** Modified models or `None`.
12. **API Impact:** Modified endpoints or `None`.
13. **UI Impact:** Modified interfaces or `None`.
14. **Expected Deliverables:** Output artifacts.
15. **Acceptance Criteria:** Measurable success state.
16. **Validation Checklist:** Verification against all 10 documentation rules.
17. **AI Self Validation:** TS, Lint, Architecture boundaries checked.
18. **Manual Verification:** Human QA steps.
19. **Stop Conditions:** The AI MUST halt immediately after this ID.
20. **Rollback Considerations:** Safe revert strategies.
21. **Documentation References:** Links to specs.
22. **Definition of Done:** Passed build, types, lint, and tests.

---

## 3. The Enterprise Roadmap

### Phase 0 — Workspace & Foundation
*Program: MVP | Release: 1.0 | Module: Foundation*

#### Feature: Environment | Epic: Monorepo Setup
- **Task:** Config | **Sub Task:** Linter | **Atomic Task:** Initialize ESLint & Prettier
  - **Prompt ID:** `SETUP-001`
  - **Purpose & Scope:** Setup strict enterprise linting rules. No UI code.
  - **Files Allowed:** `eslint.config.js`, `.prettierrc`, `package.json`.
  - **Deliverables:** Working strict linting script.
- **Task:** Config | **Sub Task:** Database | **Atomic Task:** Initialize Prisma
  - **Prompt ID:** `SETUP-002`
  - **Purpose & Scope:** Connect Neon Postgres via Prisma.
  - **Files Allowed:** `schema.prisma`, `.env`.
  - **Dependencies:** `SETUP-001`.

### Phase 1 — Authentication
*Program: MVP | Release: 1.0 | Module: Auth*

#### Feature: Better Auth | Epic: Core Integration
- **Task:** Middleware | **Sub Task:** Protection | **Atomic Task:** Secure Routes
  - **Prompt ID:** `AUTH-001`
  - **Purpose & Scope:** Intercept requests to `/dashboard` without session.
  - **Files Allowed:** `middleware.ts`, `lib/auth.ts`.
  - **API Impact:** `auth/session` required.
- **Task:** UI | **Sub Task:** Login Form | **Atomic Task:** Build Login Component
  - **Prompt ID:** `AUTH-002`
  - **Purpose & Scope:** Build Zod-validated login form.
  - **Files Allowed:** `features/auth/components/login-form.tsx`, `schemas.ts`.
  - **Dependencies:** `AUTH-001`.

### Phase 2 — Database
*Program: MVP | Release: 1.0 | Module: Data Layer*

#### Feature: Schema | Epic: Financial Models
- **Task:** Prisma | **Sub Task:** Models | **Atomic Task:** Define Expense/Deposit
  - **Prompt ID:** `DB-001`
  - **Purpose & Scope:** Write Prisma models for financial transactions.
  - **Files Allowed:** `schema.prisma`.
  - **Deliverables:** Migratable schema with indexes.
- **Task:** Prisma | **Sub Task:** Seed | **Atomic Task:** Generate Mock Data
  - **Prompt ID:** `DB-002`
  - **Purpose & Scope:** Seed test users and history.
  - **Files Allowed:** `prisma/seed.ts`.
  - **Dependencies:** `DB-001`.

### Phase 3 — Core UI
*Program: MVP | Release: 1.0 | Module: Interface*

#### Feature: Layout | Epic: Dashboard Shell
- **Task:** Layout | **Sub Task:** Sidebar | **Atomic Task:** Build Navigation
  - **Prompt ID:** `UI-001`
  - **Purpose & Scope:** Create responsive sidebar.
  - **Files Allowed:** `components/layout/sidebar.tsx`, `constants/nav.ts`.
  - **UI Impact:** Global sidebar present.
- **Task:** Theme | **Sub Task:** Dark Mode | **Atomic Task:** Next-Themes Setup
  - **Prompt ID:** `UI-002`
  - **Purpose & Scope:** Global dark mode toggle.
  - **Files Allowed:** `providers/theme-provider.tsx`, `components/theme-toggle.tsx`.

### Phase 4 — Member Management
*Program: MVP | Release: 1.0 | Module: Members*

#### Feature: CRUD | Epic: Profiles
- **Task:** API | **Sub Task:** Read | **Atomic Task:** Fetch Members API
  - **Prompt ID:** `MEMBER-001`
  - **Purpose & Scope:** Build `/api/members` GET route.
  - **Files Allowed:** `app/api/members/route.ts`, `features/members/queries.ts`.
- **Task:** UI | **Sub Task:** Table | **Atomic Task:** Member Data Table
  - **Prompt ID:** `MEMBER-002`
  - **Purpose & Scope:** Render TanStack table of members.
  - **Files Allowed:** `features/members/components/member-table.tsx`.
  - **Dependencies:** `MEMBER-001`.

### Phase 5 — Finance
*Program: MVP | Release: 1.0 | Module: Transactions*

#### Feature: Deposits | Epic: Ledger In
- **Task:** Action | **Sub Task:** Create | **Atomic Task:** Add Deposit Action
  - **Prompt ID:** `FINANCE-001`
  - **Purpose & Scope:** Server Action to add deposit with Zod validation.
  - **Files Allowed:** `features/deposits/actions.ts`, `schemas.ts`.
- **Task:** UI | **Sub Task:** Form | **Atomic Task:** Deposit Form
  - **Prompt ID:** `FINANCE-002`
  - **Purpose & Scope:** Client UI to trigger `FINANCE-001`.
  - **Files Allowed:** `features/deposits/components/deposit-form.tsx`.

#### Feature: Expenses | Epic: Ledger Out
- **Task:** Action | **Sub Task:** Create | **Atomic Task:** Add Expense Action
  - **Prompt ID:** `FINANCE-003`
  - **Purpose & Scope:** Server action for categorized expenses.
  - **Files Allowed:** `features/expenses/actions.ts`, `schemas.ts`.

### Phase 6 — Meal Management
*Program: MVP | Release: 1.0 | Module: Meals*

#### Feature: Entry | Epic: Tracking
- **Task:** UI | **Sub Task:** Grid | **Atomic Task:** Daily Meal Grid
  - **Prompt ID:** `MEAL-001`
  - **Purpose & Scope:** Editable grid for daily member meals.
  - **Files Allowed:** `features/meals/components/meal-grid.tsx`.
- **Task:** API | **Sub Task:** Batch | **Atomic Task:** Save Batch Meals
  - **Prompt ID:** `MEAL-002`
  - **Purpose & Scope:** Save grid data using `$transaction`.
  - **Files Allowed:** `features/meals/actions.ts`.

### Phase 7 — Accounting
*Program: MVP | Release: 1.0 | Module: Core Engine*

#### Feature: Cashbook | Epic: Live Balances
- **Task:** Engine | **Sub Task:** Logic | **Atomic Task:** Calculate Live Balances
  - **Prompt ID:** `LEDGER-001`
  - **Purpose & Scope:** Complex DB aggregation to find current owed/advance.
  - **Files Allowed:** `features/ledger/utils.ts`, `server/queries.ts`.
  - **Validation:** Strict floating point check required.

#### Feature: Month Closing | Epic: Archiving
- **Task:** Engine | **Sub Task:** Freeze | **Atomic Task:** Execute Month Close
  - **Prompt ID:** `LEDGER-002`
  - **Purpose & Scope:** Lock month data, calculate final meal rate, save to history.
  - **Files Allowed:** `features/ledger/actions/close-month.ts`.
  - **Dependencies:** `LEDGER-001`.

### Phase 8 — Reports & Analytics
*Program: MVP | Release: 1.0 | Module: Dashboard*

#### Feature: Dashboard | Epic: KPIs
- **Task:** UI | **Sub Task:** Widgets | **Atomic Task:** Render KPI Cards
  - **Prompt ID:** `REPORT-001`
  - **Purpose & Scope:** Render fast server-side stats.
  - **Files Allowed:** `app/(dashboard)/page.tsx`, `features/analytics/components/kpi.tsx`.
- **Task:** UI | **Sub Task:** Charts | **Atomic Task:** Expense Trend Chart
  - **Prompt ID:** `REPORT-002`
  - **Purpose & Scope:** Recharts wrapper for expense trends.
  - **Files Allowed:** `features/analytics/components/expense-chart.tsx`.

### Phase 9 — Settings
*Program: MVP | Release: 1.0 | Module: Config*

#### Feature: Application | Epic: Mess Preferences
- **Task:** UI | **Sub Task:** Form | **Atomic Task:** System Settings Form
  - **Prompt ID:** `SETTING-001`
  - **Purpose & Scope:** Update default meal rates, names.
  - **Files Allowed:** `features/settings/components/app-settings.tsx`.

### Phase 10 — Integrations
*Program: MVP | Release: 1.0 | Module: External*

#### Feature: Uploads | Epic: Cloudinary
- **Task:** Service | **Sub Task:** Signature | **Atomic Task:** Secure Upload Endpoint
  - **Prompt ID:** `INTEGRATION-001`
  - **Purpose & Scope:** Generate signed tokens for secure file uploads.
  - **Files Allowed:** `services/cloudinary.ts`, `app/api/uploads/route.ts`.

### Phase 11 — Testing & QA
*Program: MVP | Release: 1.0 | Module: Verification*

#### Feature: CI | Epic: Pipeline
- **Task:** Config | **Sub Task:** Actions | **Atomic Task:** GitHub Actions Setup
  - **Prompt ID:** `QA-001`
  - **Purpose & Scope:** Automate `tsc`, `lint`, and `build` on PRs.
  - **Files Allowed:** `.github/workflows/ci.yml`.

### Phase 12 — Production Release
*Program: MVP | Release: 1.0 | Module: DevOps*

#### Feature: Deployment | Epic: Vercel
- **Task:** Deploy | **Sub Task:** Production | **Atomic Task:** Execute Release
  - **Prompt ID:** `DEPLOY-001`
  - **Purpose & Scope:** Final DB migration, Vercel env checks, Go Live.
  - **Files Allowed:** `Vercel Dashboard` (Manual steps only).
  - **Dependencies:** All previous IDs.

---

## AI Rules
The AI **MUST NEVER**:
1. Implement multiple Atomic Tasks in one prompt.
2. Modify files outside "Files Allowed".
3. Ignore dependencies or prerequisite IDs.
4. Skip validation (TS, Lint, Build).
5. Skip testing (DoD).
6. Guess architecture (Must use `07-PROJECT-STRUCTURE.md`).
7. Continue to the next Prompt ID automatically. The AI MUST stop and wait for the user to request the next ID.
8. Change documentation unless explicitly instructed by the prompt.
