# Enterprise Software Architecture Specification

## Purpose
This document is the absolute single source of truth for the technical architecture of the Mess Management System. Every AI agent, developer, and script must adhere strictly to these rules. No architectural deviations are permitted without explicitly updating this document first.

---

## 1. Architecture Vision
- **Project Architecture Philosophy:** A scalable, strictly-typed Monolith built on Next.js, favoring predictable boundaries over clever abstractions.
- **Long-Term Goals:** Ensure the application can be maintained indefinitely with zero technical debt by strictly adhering to Feature-Based Architecture.
- **Architectural Principles:** Immutability of state, separation of concerns, fail-fast validation, and strict boundary enforcement.
- **Scalability Strategy:** Horizontally scalable via Vercel edge/serverless functions. Database reads scaled via heavy edge caching and TanStack Query.
- **Maintainability Strategy:** If a feature is deleted, its folder is deleted, and the app continues working perfectly. No deeply entangled code.
- **Simplicity Principles:** Do not engineer for problems we don't have. (e.g., No microservices for a single-mess application).

---

## 2. High-Level Architecture
- **Monolith Architecture:** The frontend, API, and database client exist within a single Next.js application to minimize deployment complexity and latency.
- **Feature-Based Architecture:** Domain logic is grouped by feature (e.g., `features/members`) rather than technical role. This ensures high cohesion and low coupling.
- **Layered Architecture:** UI Layer (React) -> State Layer (TanStack/Zustand) -> Network Layer (Route Handlers) -> Validation Layer (Zod) -> Data Layer (Prisma) -> DB.
- **Modular Design:** Independent packages (`packages/ui`, `packages/config`) within a Turborepo to enforce strict boundary compilation.
- **Shared Libraries:** Only strictly generic utilities (e.g., date formatting, class merging) belong in shared libraries. Domain logic does not.

---

## 3. Feature Architecture
Every feature inside `features/[name]/` must follow this internal structure:
- `components/` - React components strictly tied to this feature.
- `hooks/` - Feature-specific React hooks (e.g., UI toggle state).
- `services/` - Data fetching wrappers or external integrations.
- `schemas/` - Zod schemas defining inputs/outputs for the feature.
- `types/` - TypeScript interfaces exclusively used here.
- `constants/` - Magic strings or numbers.
- `server/actions/` - React Server Actions specific to the feature.
- `queries/` - TanStack Query keys and `useQuery` definitions.
- `mutations/` - TanStack `useMutation` definitions.
- `utils/` - Pure functions specific to the domain.
- `permissions/` - Granular RBAC checks (e.g., `canDeleteMember`).

---

## 4. Project Structure Strategy
No folder should have overlapping responsibilities.
- `app/`: Next.js routing, page definitions, layouts, and route handlers (`api/`). No business logic.
- `features/`: The heart of the app. All domain business logic lives here.
- `components/`: Only globally shared, generic UI (e.g., `Button`, `Dialog`).
- `packages/`: Monorepo shared code (UI, DB).
- `public/`: Static assets, images, fonts, PWA manifest.
- `prisma/`: Database schema, migrations, and seed scripts.
- `docs/`: The architectural source of truth (this document).
- `lib/`: Third-party singleton setups (Prisma Client, Better Auth instance).
- `config/`: Global static configurations (Site metadata, Nav items).
- `providers/`: React Context boundaries (ThemeProvider, QueryProvider).
- `store/`: Global client state (Zustand).
- `middleware.ts`: Global edge request interception.

---

## 5. Rendering Strategy
- **React Server Components (RSC):** The absolute default. Used for all data fetching, layouts, and pages to minimize bundle size.
- **Client Components (`"use client"`):** Used exclusively at the leaves of the render tree for interactivity (onClick, forms, animations).
- **Streaming & Suspense:** Wrap slow data components in `<Suspense>` to stream HTML and immediately show UI shells.
- **Server Actions:** Used for simple form submissions requiring direct DB access without complex REST logic.
- **Route Handlers:** Used for RESTful API exposure, webhooks, and complex validation workflows.
- **Static Rendering (SSG):** Used for static pages (Login layout, Settings shell).
- **Dynamic Rendering:** Used for all dashboard routes requiring real-time financial data.

---

## 6. State Management Strategy
- **Server State:** Handled by `TanStack Query`. It owns caching, deduping, and background updates.
- **Client State (Global):** Handled by `Zustand`. Restricted to UI toggles (Sidebar, Theme). Never duplicate DB data here.
- **Local State:** Handled by `useState/useReducer`. Used for component-level UI (dropdowns, tabs).
- **Optimistic Updates:** Mandatory for high-frequency actions (e.g., deleting a row). Mutate TanStack cache immediately, rollback on failure.
- **Cache Invalidation:** Always invalidate query keys upon successful mutations.
- **Offline Handling:** Not officially supported, but TanStack Query caches read data for temporary connection loss.

---

## 7. Data Fetching Strategy
- **TanStack Query:** The primary fetching mechanism for client components.
- **Server Fetching:** `fetch` with Next.js cache tags for RSCs.
- **Hydration:** Server fetches critical data and dehydrates it into TanStack Query to prevent client-side waterfall loading.
- **Pagination & Infinite Scroll:** Limit responses to 50 items. Use cursor-based pagination for feeds, offset-based for data tables.
- **Query Keys:** Strict array-based hierarchy: `['feature', 'entity', 'action', { filters }]` (e.g., `['members', 'list', { active: true }]`).
- **Mutation Strategy:** `useMutation` hooks must be abstracted inside `features/[name]/mutations/`.

---

## 8. Authentication & Authorization
- **Better Auth:** The exclusive auth provider.
- **Session Strategy:** Cookie-based, HTTP-only, secure sessions.
- **Protected Routes:** Enforced globally at the edge via `middleware.ts` for all `/dashboard/*` routes.
- **Role-Based Access (RBAC):** `ADMIN`, `MANAGER`, `MEMBER`. Checked at the API level and UI level.
- **OTP & Email:** Handled via Resend. Tokens expire in 15 minutes.
- **Cookie Strategy:** SameSite=Lax, Secure in production.

---

## 9. API Architecture
- **Route Handlers:** Located in `app/api/.../route.ts`.
- **REST Standards:** Predictable paths. `/api/members` (GET/POST), `/api/members/[id]` (PATCH/DELETE).
- **Request Validation:** Every request `body` and `searchParams` MUST be parsed by Zod.
- **Response Format:** `{ data: T | null, error: string | null, meta?: any }`.
- **Status Codes:** 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error).
- **Versioning Strategy:** Unversioned currently. V1 implied.

---

## 10. Database Architecture
- **Prisma Strategy:** Single schema file, typed generation.
- **Transaction Strategy:** Use `$transaction` for any operation involving multiple records (e.g., Month Closing, balancing).
- **Relation Strategy:** Explicit foreign keys with strict referential actions.
- **Migration Strategy:** Standard `prisma migrate dev` for local, `prisma migrate deploy` for CI/CD.
- **Soft Delete:** `deletedAt` DateTime fields on critical tables. Query filters must exclude these by default.
- **Connection Pooling:** Managed via Neon's connection pooler or Prisma Accelerate.

---

## 11. File Storage Strategy
- **Cloudinary:** Exclusive provider for binary assets. No local storage.
- **Signed Upload:** API provides secure signature `api/upload/signature`. Client uploads directly.
- **Metadata:** PostgreSQL stores `secureUrl`, `publicId`, `mimeType`, and `size`.
- **Deletion:** Cloudinary Asset deletion must be triggered via API when DB record is removed.
- **Image Optimization:** Requested via Cloudinary URL params (`w_500,q_auto,f_auto`).

---

## 12. Error Handling Architecture
- **Server Errors:** Caught in try/catch blocks. Generic 500 returned to client. Error details logged internally.
- **Client Errors:** React Error Boundaries (`error.tsx`) wrap routes to prevent white screens.
- **Form Errors:** Zod errors mapped directly to UI fields beneath inputs.
- **Network Errors:** Intercepted by TanStack Query. Toast notification triggered globally.
- **Retry Strategy:** GET requests retry 3 times automatically via TanStack. Mutations fail fast (no retry).

---

## 13. Validation Strategy
- **Zod:** The absolute single source of truth for validation schemas.
- **Shared Schemas:** Exported from `features/.../schemas.ts` and used by BOTH the API (parsing body) and React Hook Form (resolver).
- **Error Messages:** Explicit, human-readable strings defined in Zod (e.g., `.min(1, "Name is required")`).

---

## 14. Security Architecture
- **Authentication:** Sessions strictly verified before any sensitive DB access.
- **Authorization:** Ownership checks (e.g., `if (expense.memberId !== session.user.id)`).
- **CSRF / XSS:** Mitigated by Next.js defaults (React escaping, SameSite cookies).
- **Rate Limiting:** IP-based rate limiting on `/api/auth` endpoints to prevent brute force.
- **Secrets Management:** NEVER prefix `.env` variables with `NEXT_PUBLIC_` unless strictly required by the client bundle.

---

## 15. Performance Strategy
- **Code Splitting:** Automatic via Next.js routing.
- **Dynamic Imports:** Use `next/dynamic` for heavy client libraries (Recharts, heavy Modals).
- **Image Optimization:** Must use `next/image` to prevent layout shifts and serve WebP.
- **Lazy Loading:** Paginated data loading via IntersectionObserver.
- **Bundle Optimization:** `import { Icons } from "lucide-react"` forbidden. Use direct specific imports if tree-shaking fails.

---

## 16. Logging & Monitoring
- **Application Logs:** Standard `console.log/error` filtered out of production client bundles.
- **Activity Logs:** Business logic mutations (e.g., updating a deposit) wrote to the `ActivityLog` DB table for auditability.

---

## 17. Testing Architecture
- **Unit Testing:** Vitest/Jest for pure utility functions and Zod schemas.
- **Integration Testing:** Testing API route handlers against a test database.
- **Component Testing:** React Testing Library for complex interactive components.
- **Manual Testing:** Required Checklist verification before every PR merge.

---

## 18. Deployment Architecture
- **Platform:** Vercel (Edge Network).
- **Environment Variables:** Defined in Vercel UI. Replicated in local `.env`.
- **Production Builds:** Triggered on merge to `main`.
- **Preview Deployments:** Triggered on PR creation for QA.
- **CI/CD Strategy:** GitHub Actions runs ESLint, Typecheck, and Tests before allowing Vercel deployment.

---

## 19. Dependency Rules
- **Forbidden Imports:** Features cannot import from other features (prevents circular dependencies). They must communicate via shared global state or API.
- **Allowed Imports:** Features can import from `@/components`, `@/utils`, `@/lib`.
- **Feature Isolation:** If `Feature A` needs `Feature B`'s data, it fetches it from the API or reads it from the DB.

---

## 20. AI Development Rules
- **Never bypass architecture:** Do not place API routes inside `components` or UI logic inside `services`.
- **Never duplicate business logic:** Use existing utilities and hooks.
- **Never move files outside approved folders:** The structure defined here is rigid.
- **Strict Adherence:** AI Coding Agents must read this document before generating any new implementation. When generating code, the output must comply 100% with the layered architecture pattern.
