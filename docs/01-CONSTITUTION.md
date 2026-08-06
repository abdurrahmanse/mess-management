# Enterprise Software Engineering Constitution

## 1. Constitution Authority
- **Purpose:** This document establishes the absolute, non-negotiable software engineering laws for the Mess Management System.
- **Authority:** This is the highest authority in the project. It overrides every other document, architectural decision, and implementation pattern.
- **Scope:** Applies to all AI-generated prompts, developers, tools, PRs, code commits, database schemas, and documentation.
- **Hierarchy of Documents:** 1. Constitution, 2. Architecture, 3. Design System, 4. Roadmap, 5. Planning Docs.
- **Conflict Resolution Rules:** If any feature requirement or secondary document conflicts with this Constitution, the Constitution wins. The conflicting document must be updated to comply.

---

## 2. Project Vision
- **Long-Term Vision:** A seamlessly operating, fully transparent financial and administrative management tool for a single mess/hostel.
- **Product Mission:** Eliminate manual bookkeeping, prevent financial disputes, and streamline meal tracking.
- **Engineering Mission:** Build a system so predictable, typed, and well-documented that any AI or developer can contribute effortlessly without breaking existing features.
- **User Experience Vision:** Professional, fast, and dense. Information must be clear, error states obvious, and actions frictionless.
- **Technical Vision:** Leverage the modern React Server Component paradigm to achieve maximum performance and minimum client bundle size.

---

## 3. Engineering Philosophy
- **Documentation-Driven Development:** Documentation is written before code. Documentation is the single source of truth.
- **AI-First Development:** Code architecture, boundaries, and prompt tasks must be explicitly optimized for AI agents to execute deterministically.
- **Feature-Driven Development:** Code is grouped by domain (Members, Finances), not by technical responsibility (Controllers, Views).
- **Incremental Delivery:** Deliver working, tested atomic units. Do not build massive untested features.
- **Simplicity Over Complexity:** Solve the problem in front of you. Do not architect for hypothetical multi-tenant SaaS features.
- **Consistency Over Cleverness:** Prefer a boring, predictable pattern over a clever, unreadable one.
- **Explicit Over Implicit:** Magic is forbidden. Configuration, imports, and data flows must be visible and traceable.
- **Composition Over Duplication:** Compose complex UIs from generic `shadcn/ui` blocks. Extract repeated logic to custom hooks.

---

## 4. Core Engineering Principles
- **Architecture:** Monolith, layered, strict boundaries.
- **Frontend:** Server Components default, Client Components at the leaves.
- **Backend:** Next.js Route Handlers. Thin API layer delegating to services.
- **Database:** Prisma ORM, PostgreSQL. Strict foreign keys, immutable ledger.
- **API:** RESTful, Zod-validated, standardized JSON responses.
- **Security:** Zero trust. Server always validates.
- **Performance:** Stream data, cache heavily, optimize assets.
- **Scalability:** Horizontal compute (Vercel), pooled connections (Neon).
- **Maintainability:** Delete a feature folder -> feature is removed cleanly.
- **Testing:** Test business logic and user flows.
- **Accessibility:** WCAG AA, ARIA, Keyboard navigation.
- **Documentation:** Immutably accurate.
- **Deployment:** Automated, environment-aware, preview branches.
- **Monitoring:** Log critical mutations.

---

## 5. AI Development Constitution
AI Coding Agents must obey the following laws:
1. AI must **never** implement undocumented features.
2. AI must **never** skip validation schemas.
3. AI must **never** introduce architectural changes without documentation updates.
4. AI must **never** create duplicate business logic.
5. AI must complete **exactly one** approved task from the Roadmap at a time.
6. AI must respect project boundaries and folder structures.
7. AI must update documentation whenever an implementation explicitly changes project behavior.
8. AI must **stop** after completing the requested task. Do not predict the next task.

---

## 6. Code Quality Constitution
- **TypeScript Strict Mode:** Mandatory. No `strict: false`.
- **No `any`:** `any` is strictly forbidden. Use `unknown` and type guards.
- **No dead code:** Unused variables, imports, and functions must be deleted.
- **No duplicated logic:** DRY (Don't Repeat Yourself).
- **No unused dependencies:** Keep `package.json` clean.
- **No circular dependencies:** Feature A cannot depend on Feature B if Feature B depends on Feature A.
- **SOLID Principles:** Follow Single Responsibility and Dependency Inversion.
- **Clean Architecture:** Domain logic must not depend on UI rendering logic.
- **Small reusable modules:** Functions should do one thing well.
- **Predictable file organization:** Follow the `07-PROJECT-STRUCTURE.md` exactly.

---

## 7. Architecture Constitution
- **Feature-Based Architecture:** Domain specific code lives in `features/[name]`.
- **Layer Separation:** UI -> State -> API -> Validation -> Database.
- **Dependency Direction:** Features may import from `components` or `lib`. `components` may NOT import from `features`.
- **Shared Package Rules:** `packages/ui` contains NO business logic.
- **Rendering Strategy:** Server-first. Use `"use client"` only for interactivity.
- **State Management Rules:** TanStack Query for server state. Zustand for global UI toggles.
- **API Rules:** All routes must validate `body` and `searchParams` with Zod.
- **Database Access Rules:** Only Server Components, Server Actions, and Route Handlers may access Prisma.

---

## 8. UI/UX Constitution
- **Design Consistency:** Strictly adhere to `03-DESIGN-SYSTEM.md`.
- **Responsive Design:** Mobile-first approach. Modals convert to drawers on small screens.
- **Accessibility:** Semantic HTML. High contrast. Keyboard navigable.
- **Dark Mode:** System default. No hardcoded hex colors, use CSS variables.
- **Component Reuse:** Utilize `shadcn/ui` base components.
- **Loading States:** Skeletons matching the data shape.
- **Error States:** Graceful fallbacks, clear error messages.
- **Empty States:** Actionable CTAs when lists are empty.
- **Animation Philosophy:** Fast, purposeful (Framer Motion).
- **Information Hierarchy:** Data > Labels > Chrome.

---

## 9. Security Constitution
- **Authentication:** Better Auth. Secure HTTP-only cookies.
- **Authorization:** Server-side Role-Based Access Control (RBAC) verification before DB execution.
- **Input Validation:** Zod parsing on all inputs.
- **Output Safety:** React handles XSS escaping.
- **Secure Cookies:** `SameSite=Lax`, `Secure` in production.
- **Secrets Management:** Environment variables only. No hardcoded secrets.
- **Environment Variables:** Zod validation on startup (`env.mjs`).
- **File Upload Security:** Signed Cloudinary uploads. Strict MIME type and size checks.
- **Audit Logging:** Critical financial changes must be recorded in the `ActivityLog`.

---

## 10. Performance Constitution
- **Server Components First:** Ship HTML, not JS.
- **Client Components:** Push down the tree as far as possible.
- **Lazy Loading:** `next/dynamic` for heavy charts and modals.
- **Dynamic Imports:** Used to split the bundle.
- **Caching:** Leverage Next.js data cache and TanStack stale times.
- **Bundle Optimization:** Avoid importing entire libraries (e.g., specific Lucide icons).
- **Query Optimization:** Prisma `select` only required fields. No N+1 queries.
- **Database Optimization:** Index foreign keys, dates, and lookups.
- **Image Optimization:** `next/image` with WebP and sizing.

---

## 11. Documentation Constitution
- **Single Source of Truth:** Code conforms to docs. If docs are wrong, fix the docs first.
- **Documentation must be updated before or alongside implementation.**
- **Every implementation must reference documentation.**
- **No undocumented feature may be implemented.**

---

## 12. Testing Constitution
- **Unit Testing:** Focus on Zod schemas and calculation engines (Month Closing).
- **Integration Testing:** API handlers.
- **End-to-End Testing:** Critical paths (Login, Add Deposit, Close Month).
- **Manual QA Checklist:** Required before deployment (`10-TESTING-CHECKLIST.md`).
- **Build Verification:** `npm run build` must pass.
- **Accessibility Verification:** No ARIA violations.
- **Performance Verification:** Lighthouse score > 90.

---

## 13. Naming Constitution
- **Folder Naming:** `kebab-case`.
- **File Naming:** `kebab-case.ts`.
- **Component Naming:** `PascalCase`.
- **Hook Naming:** `camelCase` starting with `use`.
- **API Naming:** RESTful plural nouns (e.g., `/api/members`).
- **Database Naming:** PascalCase models, camelCase fields.
- **Environment Variable Naming:** `UPPER_SNAKE_CASE`.
- **Branch Naming:** `feature/`, `bugfix/`, `hotfix/`.
- **Commit Naming:** Conventional Commits (`feat:`, `fix:`, `docs:`).

---

## 14. Dependency Constitution
- **Approved Technology Stack:** Strictly limited to the original project definition (Next.js, Prisma, Tailwind, etc.).
- **Dependency Approval Rules:** No new dependencies without Architectural Documentation updates.
- **Third-Party Package Evaluation:** Must have weekly downloads > 100k, active maintainers, TS support.
- **Package Update Policy:** Keep dependencies locked. Update via dedicated maintenance tasks.
- **Deprecation Policy:** Replace deprecated packages immediately to prevent technical debt.

---

## 15. Business Constitution
- **Single Mess Only:** The system is for exactly one organization. Do not add `organizationId` or multi-tenant logic.
- **Ledger-Based Accounting:** Balances are derived from transactions. You cannot arbitrarily edit a "balance".
- **Monthly Closing Workflow:** Financial periods must be officially closed and locked to generate immutable balances.
- **Immutable Historical Records:** Soft deletes only. Financial history cannot be erased.
- **Consistent Financial Calculations:** Month end calculations (`Total Expenses / Meals = Rate`) must be transactionally safe.

---

## 16. Governance
- **Engineering Decision Process:** Propose -> Update Docs -> Implement.
- **Documentation Approval:** AI updates docs, user approves.
- **Architecture Changes:** Requires a specific prompt targeting the `02-ARCHITECTURE.md`.
- **Breaking Changes:** Permitted only in early development phases, properly documented.
- **Migration Policy:** Prisma migrations run automatically in CI/CD. No manual DB edits.

---

## 17. Definition of Success
The project is considered successful when it is:
- **Production Ready:** Can be deployed to Vercel and used immediately.
- **Zero Build Errors:** `next build` passes seamlessly.
- **Zero Type Errors:** `tsc --noEmit` returns silently.
- **Zero ESLint Errors:** Clean codebase.
- **Responsive:** Works perfectly on mobile and desktop.
- **Accessible:** Usable by everyone.
- **Secure:** Authorized access only.
- **Maintainable:** Clear structure, easy to onboard.
- **Well Documented:** Driven entirely by this Constitution and its supporting docs.
