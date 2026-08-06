# Enterprise Coding Standards Specification

## 1. General Coding Philosophy
- **Readability First:** Code is read 10x more than it is written. Optimize for readability over cleverness or terseness.
- **Simplicity:** Do not over-engineer. Avoid premature abstraction.
- **Predictability:** Use established patterns consistently. A developer should guess where logic lives without searching.
- **Explicitness:** Avoid "magic" side-effects. Explicit parameters and return types are mandatory.
- **Reusability & Composition:** Build small, focused pieces. Compose larger behaviors from generic utilities.
- **DRY (Don't Repeat Yourself):** Abstract identical logic, but beware of false abstractions (similar looking code doing different domain tasks).
- **SOLID:** Adhere to Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.
- **KISS & YAGNI:** Keep It Simple, Stupid. You Aren't Gonna Need It—do not write code for hypothetical future requirements.

---

## 2. Naming Conventions
| Type | Convention | Examples |
| :--- | :--- | :--- |
| **Variables** | `camelCase` | `totalAmount`, `userStatus` |
| **Constants (Global)** | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE`, `DEFAULT_THEME` |
| **Functions** | `camelCase` (Verb-Noun) | `calculateTotal`, `fetchMembers` |
| **Async Functions** | `camelCase` | `fetchMembers`, `saveDeposit` (Do not suffix with `Async`) |
| **Booleans** | Prefix `is`, `has`, `can`, `should` | `isActive`, `hasPermission`, `canEdit` |
| **React Components** | `PascalCase` | `MemberCard`, `AddDepositForm` |
| **Hooks** | `camelCase` prefix `use` | `useAuth`, `useMembersQuery` |
| **Stores (Zustand)** | `camelCase` prefix `use` suffix `Store` | `useSidebarStore`, `useNotificationStore` |
| **Providers** | `PascalCase` suffix `Provider` | `ThemeProvider`, `QueryProvider` |
| **Schemas (Zod)** | `camelCase` suffix `Schema` | `createMemberSchema` |
| **Types / Interfaces** | `PascalCase` | `Member`, `TransactionPayload` (No `I` prefix) |
| **Enums** | `PascalCase` | `TransactionType`, `UserRole` |
| **Database Models** | `PascalCase` (Singular) | `User`, `MonthClosing` |
| **Files & Folders** | `kebab-case` | `member-card.tsx`, `use-auth.ts`, `api/members` |
| **CSS Variables** | `kebab-case` prefix `--` | `--primary-color`, `--spacing-md` |
| **Env Variables** | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `NEXT_PUBLIC_API_URL` |

---

## 3. File & Folder Standards
- **Folder Responsibilities:** `features/` isolates domain logic. `components/` is exclusively for globally shared UI.
- **Maximum File Size:** Aim for `< 250 lines`. Break into smaller components or utility files if exceeded.
- **Maximum Function Size:** Aim for `< 50 lines`. Extract complex logic into pure functions.
- **Maximum Component Size:** Aim for `< 150 lines`.
- **Folder Depth Guidelines:** Avoid deep nesting (max 4 levels). Flatten structures where possible.

---

## 4. Component Standards
- **Component Responsibilities:** Must do exactly one thing.
- **Presentational vs Container:** Separate complex data fetching (Container) from UI rendering (Presentational).
- **RSC vs Client:** Server Components by default. Add `"use client"` only for interactivity, pushing it to the leaves of the tree.
- **Props Interface:** Mandatory. Exported if reused. Destructure immediately in the signature.
- **Default Props:** Use ES6 default parameters in destructuring instead of `defaultProps`.
- **Children Usage:** Use `React.ReactNode` for composition to avoid prop drilling.
- **Accessibility:** `aria-` attributes required for custom interactive elements.

---

## 5. Hook Standards
- **Responsibilities:** Encapsulate complex state or lifecycle logic. Keep pure of UI rendering.
- **Return Patterns:** Return objects `{ data, isLoading }` rather than arrays, unless for simple `[value, setValue]` state.
- **Dependencies:** Strictly adhere to the `eslint-plugin-react-hooks/exhaustive-deps` rule.
- **Query/Mutation Hooks:** Abstract TanStack Query usage into custom hooks (e.g., `useAddDeposit`).

---

## 6. State Management Standards
- **Zustand:** Use for global client UI state (sidebar, dark mode toggles).
- **TanStack Query:** Use exclusively for Server State (fetching, caching, mutating DB data).
- **Local State:** Use `useState` for component-level UI (modals, dropdowns).
- **Derived State:** Compute derived values during render rather than storing them in state.
- **Persistence:** Use Zustand's `persist` middleware for preferences. Use cookies for authentication.

---

## 7. API Standards
- **Structure:** Next.js Route Handlers (`app/api/.../route.ts`).
- **REST Conventions:** Use plural nouns (`/api/members`). Use standard methods (GET, POST, PATCH, DELETE).
- **Request Validation:** Mandatory Zod parsing for `body` and `searchParams`.
- **Response Format:** `{ data: T | null, error: string | null, meta?: object }`.
- **Status Codes:** Strict adherence to HTTP standards (200, 201, 400, 401, 403, 404, 500).

---

## 8. Database Standards
- **Prisma Conventions:** Single `schema.prisma`. Run `prisma generate` post-migration.
- **Relations:** Explicit foreign keys required.
- **Indexes:** Create indexes on foreign keys and frequently filtered dates.
- **Audit Fields:** `createdAt`, `updatedAt` mandatory.
- **Soft Delete:** Use `deletedAt` for financial and core records. Avoid hard deletes.
- **Transaction Handling:** Use Prisma `$transaction` for any multi-table mutations.

---

## 9. Validation Standards
- **Zod Conventions:** The sole validation authority.
- **Schema Organization:** Colocate in `features/[name]/schemas.ts`.
- **Shared Validation:** Client forms and Server APIs must use the exact same Zod schema.
- **Error Messages:** Explicit string error messages on every Zod chain.

---

## 10. TypeScript Standards
- **Strict Mode:** `strict: true` in `tsconfig.json`. No implicit `any`.
- **No `any`:** Forbidden. Use `unknown` and type guards.
- **Interfaces vs Types:** Use `interface` for object shapes and extending. Use `type` for unions/primitives.
- **Discriminated Unions:** Preferred over optional flags for complex state modeling.
- **Enums vs Literal Unions:** Prefer literal unions (`type Status = "OPEN" | "CLOSED"`) unless values map to specific numbers.

---

## 11. Error Handling Standards
- **API Errors:** Return generic 500 to client for unexpected errors, log details on server.
- **UI Errors:** Next.js `error.tsx` catches render errors gracefully.
- **Network Errors:** Caught by TanStack Query and displayed via Toasts.
- **Form Errors:** Bound directly to Zod validation and displayed under inputs.

---

## 12. Import / Export Standards
- **Absolute Imports:** Mandatory. Use `@/features/...`, `@/components/...`. No `../../` relative hell.
- **Import Ordering:** Next/React -> Third-Party -> Internal absolute -> Relative.
- **Barrel Exports:** Avoid `index.ts` files. Export specific files to aid tree-shaking and predictability.
- **Circular Dependencies:** Forbidden. Use shared utils if two features must communicate.

---

## 13. Formatting Standards
- **Prettier & ESLint:** Govern all spacing, quotes, and commas. Manual overriding is forbidden.
- **Quotes:** Double quotes for JSX, single/double per Prettier for TS strings.
- **Trailing Commas:** Enabled (ES5 standard) to reduce git diff noise.

---

## 14. Performance Standards
- **Memoization:** Use `useMemo` and `useCallback` only when passing props to heavily re-rendered children, or running expensive calculations. Do not overuse.
- **Lazy Loading:** `next/dynamic` for off-screen modals or heavy charts.
- **Bundle Size:** Audit imports. Do not import full libraries (e.g., Lodash) if specific functions suffice.
- **Image Optimization:** Exclusively use `next/image`.

---

## 15. Security Standards
- **Input Validation:** Zod on all endpoints. Trust nothing from the client.
- **Output Encoding:** React default escaping.
- **Secret Management:** `.env` variables only. Never expose to client without `NEXT_PUBLIC_`.
- **Authentication/Authorization:** Protect all API mutations with session and role checks.
- **Safe File Uploads:** Validated signed URLs via Cloudinary only.

---

## 16. Testing Standards
- **Unit Testing:** Vitest for complex utilities, logic, and schemas.
- **Integration Testing:** API route handlers.
- **E2E Testing:** Critical paths (Login, Close Month).
- **Manual QA:** Final mandatory verification before merge.

---

## 17. Documentation Standards
- **JSDoc Policy:** Use for complex utility functions and shared hooks. Avoid for self-explanatory UI components.
- **Inline Comments:** Explain *why* something is done, not *what*. Code explains *what*.
- **Architecture Notes:** Refer to `docs/` folder for system-level logic.

---

## 18. Git Standards
- **Branch Naming:** `feat/feature-name`, `fix/bug-name`, `chore/task-name`.
- **Commit Messages:** Conventional Commits (e.g., `feat(auth): add login form`, `fix(ui): adjust padding`).
- **PR Requirements:** Must pass CI/CD pipeline (lint, typecheck, build) before merge.

---

## 19. AI Coding Standards
Mandatory behaviors for all AI Coding Agents:
- **Never generate duplicate logic.** Use existing features.
- **Never ignore existing utilities.** Use shared `@/utils`.
- **Never bypass shared components.** Use `@/components/ui`.
- **Never violate folder responsibilities.** Adhere strictly to the defined architecture.
- **Never introduce inconsistent naming.** Follow the conventions above.
- **Always reuse existing abstractions** before creating new ones.
- **Always update relevant documentation** when required.

---

## 20. Quality Gates
Every code submission or AI task completion must satisfy:
- [ ] TypeScript passes (`tsc --noEmit`).
- [ ] ESLint passes (`npm run lint`).
- [ ] Build succeeds (`npm run build`).
- [ ] No dead code, no unused imports.
- [ ] No duplicated logic.
- [ ] Responsive behavior preserved.
- [ ] Dark mode supported via tokens.
- [ ] Accessibility (ARIA/Keyboard) maintained.
- [ ] Documentation remains consistent.

**Failure to meet any of these gates means the implementation is incomplete and must be rejected.**
