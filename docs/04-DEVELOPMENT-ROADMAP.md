# Enterprise AI-First Development Roadmap (Version 2)

## Mission
This document is the absolute single source of truth for all AI-driven implementation in the Mess Management System. It is strictly optimized for AI Coding Agents (Claude Code, Cursor, Gemini CLI, Codex, ChatGPT). The AI must never guess what, where, or how to build. Every execution strictly maps to exactly one **Prompt ID**.

---

## 1. Mandatory Documentation Review
Before every Prompt ID, the AI MUST read and strictly comply with:
1. `01-PROJECT-CONSTITUTION.md`
2. `02-ARCHITECTURE-STRATEGY.md`
3. `03-DESIGN-SYSTEM.md`
4. `04-DEVELOPMENT-ROADMAP.md`
5. `05-AI-DEVELOPMENT-RULES.md`
6. `06-CODING-STANDARDS.md`
7. `07-PROJECT-STRUCTURE.md`
8. `08-DATABASE-PLANNING.md`
9. `09-API-PLANNING.md`
10. `10-TESTING-AND-RELEASE-READINESS.md`

*(This requirement is implicitly embedded into every Prompt ID.)*

---

## 2. Mandatory Verification Pipeline
After completing the Expected Output for a Prompt ID, the AI MUST automatically:
- Fix TypeScript errors
- Fix ESLint errors
- Fix Prettier formatting issues
- Resolve all compiler warnings
- Run build verification (`npm run build`)
- Run unit/integration tests (if applicable)
- Verify architecture boundaries and design system compliance
- Generate a visual preview/demo (UI/Route) or API response (cURL/JSON)
- Produce a detailed Completion Report and wait.
**The next Prompt ID must NEVER begin automatically. The AI must STOP.**

---

## 3. Modern Architecture Requirements
The AI must enforce the following mandatory defaults for all Prompt IDs:
- **Core:** Next.js App Router, React Server Components
- **Auth:** Better Auth
- **Database:** Prisma ORM, Neon PostgreSQL
- **State/Fetching:** TanStack Query (Server State), Zustand (Client State)
- **Forms:** React Hook Form, Zod validation
- **UI:** shadcn/ui, Tailwind CSS, Framer Motion, lucide-react
- **Data Display:** TanStack Table, Recharts
- **Services:** Cloudinary (Uploads), Resend (Emails)
- **Ops:** PWA Support, Vercel Deployment

---

## 3.5 Authentication-First Enforcements
The AI Coding Agent must never generate Dashboard pages before the Authentication module is fully completed.
Every protected page, API, Route Handler, Server Action, and feature must verify authentication before execution.
If authentication is incomplete, the AI must stop implementation and report that the prerequisite Authentication phase has not yet been completed.

Authentication is the first development milestone. The roadmap enforces the following implementation order:
1. Authentication Infrastructure
2. Authentication Database
3. Authentication Services
4. Authentication APIs
5. Authentication UI
6. Authentication Forms
7. OTP Verification
8. Middleware & Route Protection
9. Session Management
10. Authorization
11. Authentication Testing
12. Authentication Production Verification

Only after all Authentication phases pass validation may the AI continue to Dashboard, Members, Financials, Meals, Reports, and all remaining business modules.

---

## 4. Standard Development Flow
Every feature module MUST follow this exact implementation sequence:
1. **Database:** Update `schema.prisma`.
2. **Server:** Define Server Actions / Database queries.
3. **API:** Create REST endpoints (if required for client integrations).
4. **Validation:** Define Zod schemas in `schemas.ts`.
5. **Business Logic:** Implement pure functions in `utils.ts` or `services/`.
6. **State Management:** Set up TanStack Query hooks or Zustand stores.
7. **UI Components (Wireframes -> Layout -> Loading -> Empty -> Errors -> Final):** Build presentational components in `features/[name]/components`.
8. **Pages:** Assemble UI components into route pages in `app/`.
9. **Integration:** Connect UI to State/Actions.
10. **Testing & Optimization:** Final QA and performance checks.
11. **Verification & Completion Report:** Run pipeline and halt.

---

## 5. Atomic Prompt Structure
Every Prompt ID in this roadmap encapsulates the following contract. To keep the document concise, the parameters are presented in a compressed format, but the AI must treat every Prompt ID as having the full 24-point scope defined below:

* **Prompt ID**: Unique Identifier (e.g. `AUTH-001`)
* **Phase | Module | Feature | Epic | Task | Sub Task**: Taxonomy.
* **Objective**: What to build.
* **Dependencies | Prerequisites**: Prior Prompt IDs or configurations.
* **Complexity | Priority | Estimated Time**: Metrics.
* **Allowed Files**: Strict whitelist of editable files.
* **Forbidden Files**: Files that cannot be touched.
* **Expected Output**: The artifact produced.
* **Acceptance Criteria | DoD**: Measurable success state and Definition of Done.
* **Validation/Testing/Preview**: Required verification steps.
* **Stop Condition**: Halt after producing the Completion Report.

---

## 6. The Enterprise Roadmap

### Phase 1 — Authentication & Authorization [COMPLETED]
*Authentication must be fully completed before any business feature is implemented.*

#### Prompt ID: AUTH-001 (Setup Better Auth)
- **Taxonomy**: Auth | Core | Initialization | Setup | Config | Prisma Adapter
- **Objective**: Initialize Better Auth and Prisma adapter with Session models.
- **Allowed Files**: `schema.prisma`, `lib/auth.ts`, `app/api/auth/[...all]/route.ts`.
- **Expected Output**: Working Better Auth API endpoint and Prisma models.

#### Prompt ID: AUTH-002 (Auth API & Middleware)
- **Taxonomy**: Auth | Core | Protection | Edge | Middleware | Routing
- **Objective**: Configure Next.js middleware for route protection and rate limiting.
- **Allowed Files**: `middleware.ts`, `constants/routes.ts`.
- **Expected Output**: Unauthenticated users are redirected to `/login` from protected routes.

#### Prompt ID: AUTH-003 (Zod Auth Schemas)
- **Objective**: Define strict Zod validation schemas for Login, Registration, Forgot Password, Reset Password.
- **Allowed Files**: `features/auth/schemas.ts`.

#### Prompt ID: AUTH-004 (Auth UI Wireframes & Layout)
- **Objective**: Build the Auth split-screen layout (Image left, Form right), including Dark Mode support and responsive tablet/mobile states.
- **Allowed Files**: `app/(auth)/layout.tsx`, `features/auth/components/auth-layout.tsx`.

#### Prompt ID: AUTH-005 (Login Component & Integration)
- **Objective**: Implement React Hook Form + Zod Login UI with TanStack Query mutation to Better Auth. Include loading/error states.
- **Allowed Files**: `features/auth/components/login-form.tsx`, `app/(auth)/login/page.tsx`.

#### Prompt ID: AUTH-006 (Registration Component & Integration)
- **Objective**: Implement Registration UI with validation, loading states, and API integration.
- **Allowed Files**: `features/auth/components/register-form.tsx`, `app/(auth)/register/page.tsx`.

#### Prompt ID: AUTH-007 (Password Recovery Flows)
- **Objective**: Implement Forgot Password and Reset Password components and pages.
- **Allowed Files**: `features/auth/components/forgot-password-form.tsx`, `features/auth/components/reset-password-form.tsx`, routes.

#### Prompt ID: AUTH-008 (Email Verification & Resend)
- **Objective**: Integrate Resend for Email OTP and verification OPT code registration.
- **Allowed Files**: `lib/email.ts`, `services/resend.ts`, Better Auth email config.

#### Prompt ID: AUTH-009 (Role Authorization & Zustand Store)
- **Objective**: Create a Zustand store to hold the active session user and role globally. Implement Role-based UI guards.
- **Allowed Files**: `store/auth.ts`, `hooks/use-auth.ts`, `components/guards/role-guard.tsx`.

---

### Phase 2 — Database Models & Seeding

#### Prompt ID: DB-001 (Business Models)
- **Objective**: Define models for Members, Deposits, Expenses (Grocery, Extra, Utilities, Maid), Meals, MonthClosing.
- **Allowed Files**: `prisma/schema.prisma`.

#### Prompt ID: DB-002 (Seed Data)
- **Objective**: Create realistic mock data for UI testing.
- **Allowed Files**: `prisma/seed.ts`.

---

### Phase 3 — Core UI & Dashboard Shell

#### Prompt ID: UI-001 (Dashboard Layout & Sidebar)
- **Objective**: Build responsive Dashboard Layout with collapsible Sidebar and Mobile drawer.
- **Allowed Files**: `app/(dashboard)/layout.tsx`, `components/layout/sidebar.tsx`, `components/layout/mobile-nav.tsx`.

#### Prompt ID: UI-002 (Theme & Providers)
- **Objective**: Setup Next-Themes, Sonner (Toaster), and TanStack Query global providers.
- **Allowed Files**: `providers/*.tsx`, `components/theme-toggle.tsx`.

---

### Phase 4 — Member Management

#### Prompt ID: MEMBER-001 (Member API & Queries)
- **Objective**: Create Server Actions for fetching, creating, updating, and deactivating members.
- **Allowed Files**: `features/members/actions.ts`, `features/members/queries.ts`.

#### Prompt ID: MEMBER-002 (Member UI Components)
- **Objective**: Build TanStack Data Table for members, with Skeleton loading states.
- **Allowed Files**: `features/members/components/member-table.tsx`.

#### Prompt ID: MEMBER-003 (Member Forms & Dialogs)
- **Objective**: Build Create/Edit Member Dialogs using React Hook Form.
- **Allowed Files**: `features/members/components/member-dialog.tsx`, `app/(dashboard)/members/page.tsx`.

---

### Phase 5 — Income (Deposits)

#### Prompt ID: DEPOSIT-001 (Deposit Actions & Queries)
- **Objective**: Server Actions for Member Deposits (cash/bKash).
- **Allowed Files**: `features/deposits/actions.ts`, `features/deposits/queries.ts`.

#### Prompt ID: DEPOSIT-002 (Deposit UI & Integration)
- **Objective**: Deposit Data Table, Form Dialog, and Page integration.
- **Allowed Files**: `features/deposits/components/*.tsx`, `app/(dashboard)/deposits/page.tsx`.

---

### Phase 6 — Expenses & Ledger Out

#### Prompt ID: EXPENSE-001 (Expense Core Actions)
- **Objective**: Base Server Actions for generalized expenses (Category, Amount, Date, Voucher).
- **Allowed Files**: `features/expenses/actions.ts`.

#### Prompt ID: EXPENSE-002 (Shopping & Grocery UI)
- **Objective**: Forms and Tables specifically tailored for daily bazar/grocery.
- **Allowed Files**: `features/shopping/components/*.tsx`, `app/(dashboard)/shopping/page.tsx`.

#### Prompt ID: EXPENSE-003 (Utilities & Maid Salary UI)
- **Objective**: Forms for fixed monthly expenses.
- **Allowed Files**: `features/expenses/components/fixed-expense-form.tsx`.

---

### Phase 7 — Meal Management

#### Prompt ID: MEAL-001 (Meal Tracking Engine)
- **Objective**: Server Actions to batch upsert daily meal counts per member.
- **Allowed Files**: `features/meals/actions.ts`.

#### Prompt ID: MEAL-002 (Daily Meal Grid UI)
- **Objective**: Highly interactive spreadsheet-like grid for inputting daily meals. Includes empty/error states.
- **Allowed Files**: `features/meals/components/meal-grid.tsx`, `app/(dashboard)/meals/page.tsx`.

---

### Phase 8 — Monthly Calculation Engine

#### Prompt ID: ENGINE-001 (Meal Rate Algorithm)
- **Objective**: Pure business logic to calculate `(Total Grocery + Total Utilities + Maid) / Total Meals`.
- **Allowed Files**: `features/ledger/utils/calculator.ts`.

#### Prompt ID: ENGINE-002 (Member Balance Algorithm)
- **Objective**: Pure logic to calculate `Total Deposit - (Total Meals * Meal Rate) - Fixed Charges`.
- **Allowed Files**: `features/ledger/utils/balance.ts`.

#### Prompt ID: ENGINE-003 (Month Closing Action)
- **Objective**: Server Action wrapped in `$transaction` to freeze the month and carry over balances.
- **Allowed Files**: `features/month-closing/actions.ts`.

#### Prompt ID: ENGINE-004 (Month Closing UI)
- **Objective**: Review screen before closing a month (Warnings, Summary, Confirm Dialog).
- **Allowed Files**: `features/month-closing/components/closing-summary.tsx`, `app/(dashboard)/month-closing/page.tsx`.

---

### Phase 9 — Cashbook & Ledger

#### Prompt ID: LEDGER-001 (Cashbook API & UI)
- **Objective**: Read-only chronological ledger of all cash-in and cash-out.
- **Allowed Files**: `features/cashbook/queries.ts`, `features/cashbook/components/cashbook-table.tsx`, `app/(dashboard)/cashbook/page.tsx`.

---

### Phase 10 — Reports, Charts & Dashboard KPIs

#### Prompt ID: REPORT-001 (Dashboard KPIs)
- **Objective**: Build metric cards (Current Balance, Total Meals, Active Members, Meal Rate).
- **Allowed Files**: `features/analytics/components/kpi-cards.tsx`, `app/(dashboard)/page.tsx`.

#### Prompt ID: REPORT-002 (Expense Charts)
- **Objective**: Recharts implementation for Expense by Category (Pie Chart) and Daily Expense Trend (Line Chart).
- **Allowed Files**: `features/analytics/components/charts/*.tsx`.

---

### Phase 11 — Settings, Config & Profile

#### Prompt ID: SETTINGS-001 (System Config)
- **Objective**: UI to configure global mess settings (Mess Name, Currency, Default Fixed Charges).
- **Allowed Files**: `features/settings/components/system-config-form.tsx`, `app/(dashboard)/settings/page.tsx`.

#### Prompt ID: PROFILE-001 (User Profile)
- **Objective**: UI for user to update name, avatar (Cloudinary), and password.
- **Allowed Files**: `features/profile/components/profile-form.tsx`, `app/(dashboard)/profile/page.tsx`.

---

### Phase 12 — Operations & Audit

#### Prompt ID: OPS-001 (Audit Logs)
- **Objective**: Track and display who created/deleted transactions.
- **Allowed Files**: `features/audit/components/audit-feed.tsx`.

#### Prompt ID: OPS-002 (Backup & Export)
- **Objective**: API route to generate and download a CSV/JSON dump of the current month.
- **Allowed Files**: `app/api/export/route.ts`, `features/settings/components/export-button.tsx`.

---

### Phase 13 — Modern Enhancements

#### Prompt ID: MODERN-001 (AI Mess Assistant)
- **Objective**: Implement a Vercel AI SDK chatbot to answer financial and meal questions for members.
- **Allowed Files**: `app/api/chat/route.ts`, `features/ai/components/chat-widget.tsx`.

#### Prompt ID: MODERN-002 (Offline Mode & PWA Enhancements)
- **Objective**: Enable offline bazar input using TanStack Query optimistic updates, syncing upon reconnection.
- **Allowed Files**: `features/shopping/actions.ts`, `hooks/use-offline-sync.ts`.

#### Prompt ID: MODERN-003 (Automated Notifications)
- **Objective**: Send Web Push notifications or automated Resend emails for Month Closings and Low Balances.
- **Allowed Files**: `features/notifications/actions.ts`, `lib/push.ts`.

#### Prompt ID: MODERN-004 (Receipt OCR)
- **Objective**: Automatically parse Cloudinary-uploaded bazar receipts to extract total amounts.
- **Allowed Files**: `features/shopping/components/receipt-scanner.tsx`, `app/api/ocr/route.ts`.

---

## Final Instruction to AI
When executing this roadmap, you MUST read the exact `Prompt ID` requested by the user, lookup its scope in this document, perform the Mandatory Documentation Review, execute the Standard Development Flow, complete the Verification Pipeline, output the Completion Report, and immediately **STOP**.

---

## 7. Role-Based Access Control (RBAC) Roadmap Rules
- Authentication becomes the first module of the project.
- Role Management must be completed before Member Management.
- Permission validation must be completed before any financial module.
- No business feature may be implemented until Authentication, Session Management, Middleware, and RBAC are fully completed and verified.
