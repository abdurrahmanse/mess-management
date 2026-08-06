# Enterprise Project Structure Specification

## Purpose
This document strictly defines the physical architecture and directory structure of the Mess Management System. It guarantees high maintainability, predictable file placement, and boundaries for AI Coding Agents.

---

## 1. Workspace Overview
The project is structured as a **Monorepo** using Turborepo.

| Directory / File | Responsibility |
| :--- | :--- |
| **`apps/`** | Contains runnable Next.js applications (e.g., `apps/web`). |
| **`packages/`** | Internal, reusable generic libraries (e.g., `ui`, `config`). |
| **`docs/`** | Immutable source of truth for software engineering rules. |
| **`scripts/`** | CI/CD, database seeding, and developer utility scripts. |
| **`prisma/`** | Database schema, migrations, and seed files. |
| **`public/`** | Statically served root assets (favicon, robots.txt). |
| **Configuration** | `turbo.json`, `package.json` for monorepo orchestration. |

---

## 2. Root Folder Structure
```text
mess-management/
├── apps/
│   └── web/                   
├── packages/
│   ├── ui/                    
│   ├── config/                
│   ├── database/              
│   └── shared-utils/          
├── docs/                      
├── prisma/                    
├── scripts/                   
├── .github/                   
├── package.json               
└── turbo.json                 
```

---

## 3. `apps/web` Structure

Every folder in `apps/web` must strictly adhere to the following definitions.

### `app/`
* **Purpose:** Next.js App Router routing logic and layouts.
* **Allowed Files:** `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`.
* **Forbidden Files:** Business logic, heavy UI components, DB queries, schemas.
* **Dependency Rules:** Can import from `features/`, `components/`, `lib/`.
* **Naming Conventions:** Strict Next.js routing conventions (`kebab-case`).

### `components/`
* **Purpose:** Globally shared UI components used across multiple features.
* **Allowed Files:** Pure React components (e.g., `button.tsx`, `sidebar.tsx`).
* **Forbidden Files:** Feature-specific UI, data fetching logic, Server Actions.
* **Dependency Rules:** Cannot import from `features/`. Can import from `lib/` and `utils/`.
* **Naming Conventions:** `kebab-case.tsx` for files, `PascalCase` for component names.

### `features/`
* **Purpose:** Domain-driven modules encapsulating all business logic (see Section 4).
* **Allowed Files:** Feature-specific components, hooks, actions, queries, schemas.
* **Forbidden Files:** Generic UI components, global routing logic.
* **Dependency Rules:** Can import from `components/`, `lib/`, `utils/`. Cannot import from other features unless explicitly configured.
* **Naming Conventions:** Folder names must be `kebab-case` and plural (e.g., `deposits`).

### `hooks/`
* **Purpose:** Globally shared custom React hooks (e.g., `useMediaQuery`).
* **Allowed Files:** React hook files (`.ts` or `.tsx`).
* **Forbidden Files:** Hooks specific to a single feature (e.g., `useMembers`).
* **Dependency Rules:** Cannot import from `features/`.
* **Naming Conventions:** `camelCase` starting with `use`.

### `providers/`
* **Purpose:** Global React Context providers (e.g., `ThemeProvider`).
* **Allowed Files:** Context providers wrapping the app.
* **Forbidden Files:** Feature-specific state providers.
* **Dependency Rules:** Cannot import from `features/`.
* **Naming Conventions:** `PascalCase` suffix `Provider`.

### `store/`
* **Purpose:** Global Zustand state stores (e.g., sidebar toggles).
* **Allowed Files:** Zustand setup files.
* **Forbidden Files:** Server state (belongs in TanStack query), feature-specific state.
* **Dependency Rules:** Cannot import from `features/`.
* **Naming Conventions:** `camelCase` suffix `Store`.

### `services/`
* **Purpose:** Integrations with 3rd-party external APIs (Cloudinary, Resend).
* **Allowed Files:** API wrapper classes/functions.
* **Forbidden Files:** UI components, Next.js routing.
* **Dependency Rules:** Cannot import from `features/`.
* **Naming Conventions:** `kebab-case` based on the service name.

### `server/`
* **Purpose:** Global server-side logic not tied to a specific feature.
* **Allowed Files:** Global `actions/` and `queries/`.
* **Forbidden Files:** Client components, UI logic.
* **Dependency Rules:** Can import from `lib/` and `database/`.
* **Naming Conventions:** `kebab-case`.

### `lib/`
* **Purpose:** Singleton instances and core setup (e.g., `prisma.ts`, `auth.ts`).
* **Allowed Files:** Core client initializations.
* **Forbidden Files:** React components, business logic.
* **Dependency Rules:** Dependency-free (imports external packages only).
* **Naming Conventions:** `kebab-case`.

### `utils/`
* **Purpose:** Pure, globally shared utility functions (formatting, math).
* **Allowed Files:** Pure TypeScript functions.
* **Forbidden Files:** React hooks, Server Actions, DB calls.
* **Dependency Rules:** Dependency-free.
* **Naming Conventions:** `camelCase`.

---

## 4. Feature Module Structure

Every feature module (e.g., `features/deposits/`) must follow this exact template. A feature folder only instantiates the subfolders it actually uses.

### `features/[name]/components/`
* **Responsibility:** UI components exclusively used by this feature.
* **Allowed:** `deposit-form.tsx`, `member-card.tsx`.
* **Forbidden:** Data fetching.
* **Import Rules:** Cannot be imported by other features.

### `features/[name]/hooks/`
* **Responsibility:** React hooks exclusively used by this feature.
* **Allowed:** UI state hooks.
* **Forbidden:** Global state hooks.

### `features/[name]/queries/`
* **Responsibility:** TanStack `useQuery` hooks and Query Keys.
* **Allowed:** Server-state fetching logic.
* **Forbidden:** Mutations.

### `features/[name]/mutations/`
* **Responsibility:** TanStack `useMutation` hooks.
* **Allowed:** Client-side wrapper for Server Actions.
* **Forbidden:** Raw `fetch` calls without TanStack Query.

### `features/[name]/actions/`
* **Responsibility:** React Server Actions (database mutations).
* **Allowed:** Functions marked `"use server"`.
* **Forbidden:** Client UI logic.
* **Import Rules:** Must import schemas for Zod validation.

### `features/[name]/schemas/`
* **Responsibility:** Zod validation schemas.
* **Allowed:** `index.ts` exporting Zod objects.
* **Forbidden:** Type definitions not inferred from Zod.

### `features/[name]/types/`
* **Responsibility:** TypeScript interfaces and types.
* **Allowed:** Interface definitions.
* **Forbidden:** Runtime executable code.

### `features/[name]/utils/`
* **Responsibility:** Pure functions specific to the feature's domain logic.
* **Allowed:** Financial calculators, data parsers.
* **Forbidden:** React code, DB access.

---

## 5. Shared Component Structure
Located at `apps/web/components/`.

| Subfolder | Responsibility | Example Files |
| :--- | :--- | :--- |
| `ui/` | Base shadcn/ui generic components. | `button.tsx`, `input.tsx` |
| `layout/` | Structural page components. | `sidebar.tsx`, `navbar.tsx` |
| `common/` | Shared app-specific visuals. | `logo.tsx`, `status-badge.tsx` |
| `forms/` | Reusable form wrappers. | `form-input.tsx` |
| `data-table/` | Generic TanStack Table shell. | `data-table.tsx` |
| `feedback/` | Toasts, spinners, error shells. | `spinner.tsx`, `error-boundary.tsx` |
| `charts/` | Recharts wrappers. | `bar-chart.tsx` |
| `icons/` | Custom SVG wrappers. | `custom-icon.tsx` |

**Decision Matrix:** If a component is used in strictly ONE feature, it belongs in `features/[name]/components`. If used in TWO OR MORE features, it must be abstracted into `components/`.

---

## 6. Server Layer Structure
* **Route Handlers:** `app/api/.../route.ts` (REST endpoints).
* **Server Actions:** `features/[name]/actions/` (RPC style mutations).
* **Database Access:** Exclusively inside Server Actions or generic `server/queries/`.
* **Authentication:** `lib/auth.ts`.
* **Email:** `services/resend.ts` and `emails/`.
* **Cloudinary:** `services/cloudinary.ts`.

---

## 7. Package Structure
Located at `packages/`.
* **`ui`:** Pure React components (if extracted from the main app).
* **`config`:** Sharable `eslint`, `prettier`, and `tsconfig`.
* **`database`:** Prisma client and schemas.
* **`shared-utils`:** Generic TS functions usable across apps.

---

## 8. Documentation Structure
Located at `docs/`.
* `01-CONSTITUTION.md` through `10-TESTING-CHECKLIST.md`.
* **Purpose:** The immutable source of truth. If code deviates from these docs, the code is wrong.

---

## 9. Public Assets Structure
Located at `apps/web/public/`.
* **Allowed:** `images/`, `icons/`, `logos/`, `fonts/`.
* **Root Files:** `manifest.json`, `robots.txt`, `favicon.ico`.

---

## 10. Configuration Structure
* **ESLint / Prettier:** `.eslintrc.js` in root.
* **TypeScript:** `tsconfig.json` at root and workspace levels.
* **Tailwind:** `tailwind.config.ts` per workspace.
* **Next.js:** `next.config.mjs` in `apps/web`.

---

## 11. Testing Structure
* **Unit Tests:** Colocated. Example: `format-date.ts` -> `format-date.test.ts`.
* **E2E Tests:** Located in `apps/web/e2e/`.
* **Test Utilities:** `apps/web/test/utils.ts`.

---

## 12. Import Rules & Boundaries
- **Absolute Imports Only:** Use `@/features/...` and `@/components/...`.
- **Feature Boundaries:** `features/A` cannot import from `features/B`.
- **Circular Dependencies:** Banned entirely.

---

## 13. Dependency Rules Summary
| Folder | Can Import From | Must NEVER Import From |
| :--- | :--- | :--- |
| `app/` | `features/`, `components/`, `lib/` | `app/` (other routes) |
| `features/X/` | `@/components`, `@/lib`, `@/utils` | `features/Y/` (other features) |
| `components/` | `@/lib`, `@/utils`, `@/styles` | `features/` |
| `lib/` | external packages | `features/`, `components/` |

---

## 14. File Placement Final Exam
Where does exactly one file go?
- **Reusable button?** `apps/web/components/ui/button.tsx`
- **Feature-specific dialog?** `apps/web/features/deposits/components/deposit-dialog.tsx`
- **Email template?** `apps/web/emails/welcome.tsx`
- **Zod schema for Member?** `apps/web/features/members/schemas.ts`
- **Server action for Expenses?** `apps/web/features/expenses/actions/create-expense.ts`
- **Chart component?** `apps/web/components/charts/bar-chart.tsx`
- **TanStack Query hook?** `apps/web/features/meals/queries/use-meals.ts`
- **Cloudinary helper?** `apps/web/services/cloudinary.ts`

---

## 15. Growth Strategy
To scale, simply add a new domain under `features/`. The strict isolation ensures that adding `features/voting` will never break `features/finances`. If a feature outgrows the app, it can be abstracted into its own app inside the monorepo.

---

## 16. AI Coding Rules
The AI **must never**:
- Create folders outside this exact specification.
- Place files in the wrong location.
- Duplicate shared components (always check `components/ui` first).
- Break feature boundaries by importing across features.
- Create cross-feature dependencies without explicit architectural approval.
