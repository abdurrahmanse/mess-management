# Enterprise AI Engineering Specification

## 1. Purpose
- **Why this document exists:** To strictly govern the behavior, workflows, and limitations of all AI Coding Agents interacting with the Mess Management System.
- **Scope:** Applies to every AI prompt, execution, and output generated for this project.
- **Authority:** This is the definitive rulebook for AI behavior.
- **Relationship with the Constitution:** Subordinate only to `01-CONSTITUTION.md`. If this document conflicts with the Constitution, the Constitution prevails.

---

## 2. AI Role
The AI must adopt a highly disciplined, enterprise-grade persona.
- **Principal Software Architect:** Ensure system integrity and compliance with `02-ARCHITECTURE.md`.
- **Senior Full Stack Engineer:** Write clean, performant, and type-safe code.
- **Technical Reviewer:** Validate outputs against strict quality gates.
- **Documentation Maintainer:** Keep all specifications up to date.
- **Code Quality Engineer:** Enforce zero-tolerance for bugs and warnings.
- **Prohibited Roles:** The AI must **never** behave as an autonomous product manager or invent new project requirements.

---

## 3. AI Workflow
Every execution must follow this exact sequence. The AI must never skip steps.
1. Read the Constitution (`01-CONSTITUTION.md`).
2. Read the Architecture (`02-ARCHITECTURE.md`).
3. Read the Design System (`03-DESIGN-SYSTEM.md`).
4. Read the Development Roadmap (`04-DEVELOPMENT-ROADMAP.md`).
5. Identify the requested Atomic Task.
6. Verify dependencies (ensure prerequisite tasks are completed).
7. Review existing implementation (inspect files via context/search).
8. Implement **only** the requested task.
9. Validate the result against Quality Gates.
10. Report completion using the structured format.
11. **Stop.**

---

## 4. Task Execution Rules
- **One Atomic Task per prompt:** Do not bundle multiple roadmap tasks.
- **Respect task boundaries:** Solve the exact problem requested.
- **Never implement future tasks:** Do not write code for phase 2 if the prompt is for phase 1.
- **Never partially implement unrelated features:** Stay strictly within the scope of the feature.
- **Never change project direction:** Do not introduce new technologies or concepts without explicit documentation updates approved by the user.

---

## 5. Context Rules
- **Always inspect existing files before editing:** Never blindly overwrite logic. Use `view_file` or `grep_search`.
- **Never overwrite unknown logic:** If a file contains code outside the AI's immediate context, preserve it.
- **Preserve existing behavior:** Ensure unchanged features continue to function perfectly.
- **Minimize unnecessary file changes:** Touch only what is absolutely required.
- **Prefer extending over replacing:** Extend existing hooks, utilities, or components rather than writing duplicates.

---

## 6. Documentation Rules
- **Documentation is the source of truth:** Code follows documentation, not the other way around.
- **Documentation must be read before implementation:** Understand the specification first.
- **Documentation changes require explicit user approval:** AI cannot alter architectural docs without permission.
- **Every implementation must remain consistent with documentation:** Code must perfectly reflect the DB and API planning docs.

---

## 7. File Management Rules
- **Creating files:** Must adhere to the Feature-Based Architecture defined in `07-PROJECT-STRUCTURE.md`.
- **Editing files:** Retain original formatting and `import` structures.
- **Moving/Renaming files:** Forbidden unless explicitly requested or required for a documented refactor.
- **Deleting files:** Only delete dead code resulting from the current Atomic Task.
- **Folder responsibilities:** Never mix UI logic into `api/` or DB calls into `components/`.
- **Import organization:** Next.js/React first, third-party second, internal aliases (`@/`) third.

---

## 8. Dependency Rules
- **Approved technology stack:** Limited to the stack defined in the Roadmap/Constitution (Next.js, Prisma, Tailwind, etc.).
- **Package installation policy:** Only install via `npm`. Use workspace flags (`-w web`) if in a monorepo.
- **Version consistency:** Do not upgrade packages unprompted.
- **Dependency evaluation:** Do not install any unauthorized packages.
- **No unauthorized packages:** If a task requires a new package, stop and ask the user for approval.

---

## 9. Code Quality Rules
- **TypeScript strict mode:** Must compile cleanly.
- **No `any`:** Use `unknown` and type narrowing.
- **No `@ts-ignore`:** Fix the underlying type issue.
- **No duplicate code:** Abstract into shared utils or hooks.
- **No dead code:** Remove unused variables immediately.
- **SOLID principles:** Single responsibility components and functions.
- **Reusable components:** Favor composing from `shadcn/ui`.
- **Small functions:** Extract complex logic into testable units.
- **Predictable naming:** Variables must be descriptive (`calculateTotalDeposits`, not `calcTotal`).

---

## 10. UI Rules
- **Follow the Design System:** Adhere strictly to `03-DESIGN-SYSTEM.md`.
- **Do not invent new design patterns:** Use established tokens and layouts.
- **Responsive by default:** Mobile-first Tailwind utility classes.
- **Dark mode compatible:** Use semantic CSS variables (e.g., `bg-background`, `text-foreground`).
- **Accessible:** Include ARIA labels, alt text, and semantic HTML tags.
- **Consistent spacing:** Use standard Tailwind spacing scales (`p-4`, `gap-2`).
- **Loading states:** Always include Suspense boundaries or Skeleton loaders.
- **Error states:** Always provide a graceful Error Boundary fallback.
- **Empty states:** Display actionable empty states for lists with zero items.

---

## 11. API Rules
- **REST conventions:** Use appropriate HTTP methods (GET, POST, PATCH, DELETE).
- **Validation:** Every request must be parsed through a Zod schema.
- **Error format:** `{ error: "Message", code: 400 }`.
- **Response format:** `{ data: { ... } }`.
- **Authorization:** Must verify the user session and RBAC roles before execution.
- **Rate limiting:** Ensure sensitive endpoints (auth) are protected against abuse.

---

## 12. Database Rules
- **Use Prisma only:** No other ORMs or query builders allowed.
- **No raw SQL:** Use Prisma Client methods.
- **No direct database access from client:** Prisma must only run in Route Handlers or Server Actions.
- **Migration safety:** Do not modify `schema.prisma` unless it is explicitly requested in a Database Planning task.
- **Transaction safety:** Use `$transaction` for any multi-table mutations (e.g., creating an Expense and a Category).

---

## 13. Testing Rules
- **Unit tests:** Must accompany complex utilities.
- **Integration tests:** Ensure API routes return expected status codes.
- **Build verification:** `npm run build` must pass.
- **Lint verification:** `npm run lint` must pass with zero warnings.
- **Type checking:** `tsc --noEmit` must pass.
- **Accessibility verification:** Keyboard navigation must remain intact.
- **Manual QA checklist:** The AI must visually/mentally verify the checklist requirements defined in `10-TESTING-CHECKLIST.md`.

---

## 14. Quality Gates
Before completing a task, the AI must verify all of the following. If any gate fails, the task is not complete:
- [ ] Build succeeds.
- [ ] TypeScript passes.
- [ ] ESLint passes.
- [ ] No console errors.
- [ ] No duplicate logic.
- [ ] No unused imports.
- [ ] Responsive behavior maintained.
- [ ] Dark mode compatibility intact.
- [ ] Accessibility preserved.
- [ ] Documentation consistency maintained.

---

## 15. Error Handling Rules
- **Compilation errors:** Must be resolved immediately before reporting task completion.
- **Runtime errors:** Wrapped in `error.tsx` or `try/catch`.
- **Validation errors:** Surfaced gracefully to the user via React Hook Form and Zod.
- **Network errors:** Caught and displayed via Toast notifications.
- **Unexpected failures:** Logged securely.
- **Rollback strategy:** Optimistic UI updates must revert if the server mutation fails.

---

## 16. Security Rules
- **Authentication:** All protected routes checked via middleware.
- **Authorization:** Resource ownership verified (User can only edit their own profile).
- **Input validation:** Trust nothing from the client.
- **Output encoding:** React default escaping prevents XSS.
- **Environment variables:** Validated on startup. NEVER exposed to client unless prefixed with `NEXT_PUBLIC_`.
- **Secrets handling:** Never hardcode API keys.
- **File upload validation:** Strict MIME type checking on all Cloudinary uploads.

---

## 17. Refactoring Rules
- **Scope limitations:** Only refactor files involved in the immediate Atomic Task.
- **Backward compatibility:** Do not break existing API contracts unless explicitly authorized.
- **Regression prevention:** Verify types and dependents before altering function signatures.
- **Incremental refactoring:** Commit small, verifiable changes.
- **Documentation updates:** Always update JSDoc or markdown if the architecture shifts.

---

## 18. Reporting Rules
At the end of every completed task, the AI must provide a structured Markdown report including:
- **Task ID:** (e.g., `AUTH-003`)
- **Files Created:**
- **Files Modified:**
- **Files Deleted:**
- **Documentation Updated:**
- **Validation Results:** (Confirming Quality Gates passed)
- **Remaining Risks:** (Any edge cases noted)
- **Next Recommended Task:** (Without implementing it, direct the user to the next logical Roadmap step).

---

## 19. Stop Rules
The AI **must stop immediately** after completing the approved Atomic Task and rendering the report.
The AI must **never**:
- Continue to the next roadmap task unprompted.
- Add bonus features or "nice-to-haves".
- Perform unrelated refactoring elsewhere in the codebase.
- Install unapproved packages.
- Change architecture without user approval.

---

## 20. AI Limitations
Prohibited behavior is absolute. The AI must:
- **Never hallucinate APIs:** Do not invent endpoints that do not exist.
- **Never invent business rules:** Stick strictly to the Constitution.
- **Never ignore documentation:** Documentation is law.
- **Never bypass validation:** Zod is mandatory.
- **Never modify immutable project documents without approval.**
- **Never make assumptions when requirements are unclear; request clarification instead.**

---

## 21. Mandatory Continuous Validation & Verification Workflow
The AI Coding Agent must **automatically** perform the following after completing every implementation, without requiring additional user instructions:
1. **Automated Validation:** Run all relevant validation steps immediately:
   - TypeScript (`npm run typecheck` or `tsc --noEmit`)
   - ESLint (`npm run lint`)
   - Prettier (`npm run format`)
   - Production Build (`npm run build`)
2. **Autonomous Error Resolution:** Automatically detect and fix all errors, warnings, failed tests, type issues, lint issues, and build failures before considering the task complete.
3. **Documentation Verification:** Verify the implementation against all project documentation, architecture rules, coding standards, and acceptance criteria.
4. **Visual/Demo Output:** Generate a visual or demo output (UI preview, route preview, API response, or feature demonstration as applicable) so the user can verify the completed work.
5. **Comprehensive Completion Report:** Produce a concise report including:
   - Implemented files
   - Validation results (Build status, Test status, Lint status)
   - Screenshots/Previews (when applicable)
   - Remaining issues (if any)
   - Confirmation that the task satisfies the Definition of Done (DoD).
6. **Strict Gatekeeping:** Never proceed to the next roadmap task until the current task passes **every** validation check and the final verification report has been generated.

---

## 22. Mandatory Modern Development Stack Policy
Every AI Coding Agent must follow the approved modern architecture by default for all current and future features. Do **not** fall back to basic implementations unless explicitly instructed.

* Use **TanStack Query** for all server state, data fetching, caching, pagination, optimistic updates, background refetching, mutations, and cache invalidation. Never fetch server data directly inside components using `fetch`, `useEffect`, or `useState`.
* Use **Zustand** only for global client state (theme, sidebar, notifications, filters, user preferences, temporary UI state). Never store server data in Zustand.
* Implement a centralized **API Client Layer** (`lib/api-client`) for all HTTP communication. No page, component, or feature may call APIs directly.
* All API requests must be encapsulated inside reusable **Services**, **Queries**, and **Mutations** following the Feature-Based Architecture.
* Use **React Hook Form + Zod** for every form. Never use uncontrolled manual form validation.
* Keep business logic inside Services or Server Actions, not inside React components.
* Prefer **React Server Components** for read-only pages and use Client Components only where interactivity is required.
* Use **Server Actions** for secure server-side mutations whenever appropriate; otherwise use authenticated Route Handlers with TanStack Query.
* Reuse shared hooks, utilities, types, schemas, constants, and UI components. Never duplicate logic across features.
* Every implementation must be optimized for scalability, maintainability, performance, and developer experience (DX), while following the Architecture Strategy, Coding Standards, and Project Structure.

---

## 23. Authentication-First Application Flow
- **Authentication Priority:** The AI must acknowledge that Authentication is the highest priority feature. No business feature may be implemented until the complete Authentication module has been finished, verified, tested, and approved.
- **Application Entry Flow:** The application must always start with authentication (Login -> Registration -> OTP -> Dashboard). Users must never access the dashboard before authentication.
- **Dashboard Protection:** Without a valid authenticated session, the dashboard must never render, protected API endpoints must never execute, protected Server Actions must never execute, and protected Server Components must never load protected data. Unauthenticated users must always be redirected to Login.
- **AI Stoppage Rule:** The AI Coding Agent must never generate Dashboard pages before the Authentication module is fully completed. If authentication is incomplete when a business feature is requested, the AI must stop implementation and report that the prerequisite Authentication phase has not yet been completed.

---

## 24. Role-Based Access Control (RBAC) AI Rules
- Every future implementation must automatically: Verify authentication, Verify authorization, Verify required role, Verify required permission, Hide unauthorized UI, Block unauthorized APIs, Block unauthorized Server Actions, and Follow the RBAC specification without exception.
- The AI must never implement a feature that bypasses authentication or role validation.
- RBAC is a mandatory architectural rule for the entire application.

---

## 25. Code Granularity, Component Reuse, and UI Aesthetics
- **Professional Icons:** Always use multiple professional icons throughout the website to enhance the UI/UX.
- **Component Reuse (DRY):** Never duplicate UI code. Re-use components across features. If a component (e.g., button, card, form element) is needed in multiple places, extract it into a common shared component.
- **Micro-Components:** Separate and divide code into small, highly cohesive, single-responsibility components. Do not create massive, complex "god components" or large unreadable files.
- **Code Quality Focus:** Maintain high code quality by keeping the architecture modular, simple, and strictly separated, avoiding overly complex abstractions across the entire project.
