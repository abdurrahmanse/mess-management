# 02 - Architecture Strategy

## Purpose
This document defines the architectural patterns and technical strategies for the Mess Management System. It ensures the codebase remains robust, scalable, and predictable.

## Scope
Applies to the entire Next.js web application and accompanying monorepo packages.

---

## 1. Architecture Style
The project uses a **Monolith with Feature-Based Architecture**, contained within a Turborepo workspace.

## 2. Feature-Based Architecture
We organize code around domain features rather than file types.
- **Domains:** `auth`, `members`, `shopping`, `expenses`, `deposits`, `reports`.
- **Structure inside a Feature:**
  - `components/` - UI specific to this feature.
  - `hooks/` - Custom React hooks for business logic.
  - `services/` - API interactions and data fetching.
  - `types/` - Feature-specific TypeScript interfaces.
  - `schemas/` - Zod validation schemas.

## 3. Folder Strategy
- `app/` is strictly for routing, layouts, and page definitions.
- `features/` contains all domain logic.
- `components/` (global) contains strictly generic, reusable UI (e.g., shadcn).
- `lib/` contains singleton configurations (Prisma, Better Auth, Axios/Fetch wrappers).

## 4. Rendering Strategy
- **React Server Components (RSC):** Default for all pages, layouts, and data-fetching components.
- **Client Components:** Used exclusively for interactivity (`onClick`, hooks, state) and marked with `"use client"`. Pushed as far down the component tree as possible.

## 5. State Management Strategy
- **Server State:** `TanStack Query`. Handles caching, background updates, and optimistic UI mutations for API data.
- **Global Client State:** `Zustand`. Used sparingly for UI state (e.g., Sidebar toggle, Theme, Global Notifications).
- **Local Client State:** React `useState` and `useReducer`.

## 6. Authentication Strategy
- **Provider:** `Better Auth` using Prisma Adapter.
- **Session:** Cookie-based HTTP-only sessions.
- **Verification:** Middleware protects all `/dashboard` routes.
- **OTP:** `Resend` handles Email OTPs for registration and password resets.

## 7. API Strategy
- **Next.js Route Handlers:** Located in `app/api/`.
- **Methodology:** RESTful principles returning standard JSON structures.
- **Validation:** Every request body and query param is parsed via Zod before processing.

## 8. Database Strategy
- **ORM:** `Prisma`.
- **Database:** `PostgreSQL` (hosted on Neon).
- **Access:** Only accessed via Server Components, Server Actions, or Route Handlers. Never exposed to the client.

## 9. File Upload Strategy
- **Provider:** `Cloudinary`.
- **Flow:** Client requests signed signature from API -> Client uploads directly to Cloudinary -> Cloudinary returns URL -> Client saves URL to Database.

## 10. Caching Strategy
- **Data Caching:** Next.js built-in fetch caching and TanStack Query stale-time configurations.
- **Static Rendering:** Reports and unchanging data should leverage incremental static regeneration (ISR) where appropriate.

## 11. Error Handling Strategy
- **API Errors:** Standardized API error response ` { error: string, code: number }`.
- **UI Errors:** `error.tsx` boundaries in Next.js to catch render failures gracefully.
- **Form Errors:** Surfaced directly below inputs using React Hook Form and Zod.

## 12. Validation Strategy
- Shared `Zod` schemas between client (React Hook Form) and server (API route validation) to ensure 1:1 validation parity.

## 13. Security Strategy
- SQL Injection prevented via Prisma.
- XSS prevented via React's default escaping.
- CSRF mitigated via Better Auth's token handling and SameSite cookies.
- Rate limiting on sensitive endpoints (Login, OTP).

## 14. Deployment Strategy
- **Platform:** `Vercel`.
- **CI/CD:** Vercel GitHub integration. Branch previews for PRs, production builds for `main`.

---
*References: 07-PROJECT-STRUCTURE.md, 09-API-PLANNING.md*
