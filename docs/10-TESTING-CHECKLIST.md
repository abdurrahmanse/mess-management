# 10 - Testing & Pre-Flight Checklist

## Purpose
This document provides stringent checklists that must be verified before considering a feature complete or deploying to production.

## Scope
QA, Performance, Security, and Code Quality metrics.

---

## 1. Development & Build Checklist
- [ ] Code compiles locally without any TypeScript errors (`npm run build`).
- [ ] ESLint passes with zero warnings (`npm run lint`).
- [ ] No `any` types or `@ts-ignore` comments exist in new code.
- [ ] All console.logs are removed from production paths.
- [ ] Next.js build output indicates proper Static/Dynamic route splitting.

## 2. Testing Checklist (Manual QA)
- [ ] **Forms:** Submit empty forms to verify validation errors display properly.
- [ ] **Forms:** Submit malformed data to ensure Zod catches errors.
- [ ] **State:** Verify optimistic UI updates when mutating data (TanStack Query).
- [ ] **Auth:** Attempt to access protected `/dashboard` routes while logged out; ensure redirect to `/login`.
- [ ] **UI:** Test modals and drawers on mobile width. Ensure they are fully visible and dismissible.

## 3. Performance Checklist
- [ ] React Server Components are used for data fetching. Client components are kept to the absolute edges of the tree.
- [ ] Large UI elements (e.g., Recharts) are dynamically imported using `next/dynamic`.
- [ ] Prisma queries are optimized (selecting only needed fields, no N+1 query problems).
- [ ] Images are served via `next/image` with proper sizing and `alt` tags.

## 4. Accessibility (a11y) Checklist
- [ ] Keyboard navigation (Tab) flows logically through forms and tables.
- [ ] Color contrast in Dark Mode passes WCAG AA standards.
- [ ] Shadcn/ui dialogs trap focus correctly when open.
- [ ] Screen reader testing verifies proper `aria-labels` on icon buttons.

## 5. Security Checklist
- [ ] Route Handlers explicitly verify `auth()` session before querying the database.
- [ ] Prisma parameters prevent SQL injection by default.
- [ ] Secrets (API Keys, DB URLs) are stored in `.env` and never prefixed with `NEXT_PUBLIC_` unless specifically required by the client.
- [ ] File uploads (Cloudinary/UploadThing) have strictly defined size and type limits (e.g., max 4MB, image only).

## 6. Production Deployment Checklist
- [ ] Environment variables configured correctly in Vercel.
- [ ] Prisma Migrations applied successfully (`npx prisma migrate deploy`).
- [ ] PWA Manifest generated and service worker successfully registers in production.
- [ ] Vercel Analytics enabled (optional but recommended).
