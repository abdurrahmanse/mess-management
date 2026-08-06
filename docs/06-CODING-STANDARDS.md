# 06 - Coding Standards

## Purpose
This document enforces strict coding conventions across the codebase to ensure high readability and consistency.

## Scope
Applies to all TypeScript, TSX, CSS, Prisma, and configuration files.

---

## 1. Naming Conventions
- **Variables & Functions:** `camelCase` (e.g., `calculateTotal`, `userId`).
- **React Components:** `PascalCase` (e.g., `MemberCard`, `AddDepositForm`).
- **Files & Folders:** `kebab-case` (e.g., `member-card.tsx`, `use-auth.ts`).
- **Types & Interfaces:** `PascalCase` without prefixes (e.g., `Member`, not `IMember`).
- **Constants & Env Vars:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`, `NEXT_PUBLIC_API_URL`).

## 2. Component Convention
- Default export for Next.js page components (`page.tsx`, `layout.tsx`).
- Named exports for all standard React components.
- Destructure props in the function signature.
- Always type props using `interface` rather than inline types.

## 3. Hook Convention
- Prefix with `use` (e.g., `useMemberData`).
- Return objects `{ data, error, isLoading }` rather than arrays, unless creating simple generic tuples.
- Keep hooks pure and free from UI logic.

## 4. Store Convention (Zustand)
- Separate stores by domain logic (e.g., `useAuthStore`, `useThemeStore`).
- Export actions separate from state if they are complex.

## 5. API Convention
- Next.js App Router Route Handlers (`app/api/.../route.ts`).
- Use standard HTTP methods: `GET` (read), `POST` (create), `PATCH` (update partial), `DELETE` (remove).
- Always return JSON standard format: `{ data: any, error: string | null }`.

## 6. Schema Convention (Zod)
- Colocate schemas in `features/[name]/schemas.ts`.
- Suffix schema variables with `Schema` (e.g., `createMemberSchema`).
- Infer TypeScript types from Zod: `export type CreateMember = z.infer<typeof createMemberSchema>`.

## 7. Prisma Convention
- Singular model names (e.g., `model User`).
- Plural relations (e.g., `users User[]`).
- Always use `cuid()` for string IDs, avoiding predictable auto-incrementing integers.
- Define `@map` for database table names in snake_case (e.g., `@@map("users")`).

## 8. Type Convention
- Use `interface` for object definitions. Use `type` for unions and primitives.
- Avoid `any`. Use `unknown` if a type is truly uncertain, followed by a type guard.

## 9. Error Convention
- Create specific custom Error classes or use a standard structure.
- Never swallow errors with empty `catch` blocks. Log to an external service or `console.error`.

## 10. Import/Export Convention
- Absolute imports using path aliases (`@/components`, `@/features`).
- Group imports: React/Next > Third-party > Internal Features > Internal Components > Utils.

## 11. Formatting Convention
- Governed entirely by Prettier. Do not manually format code in a way that conflicts with standard Prettier rules.
- Double quotes for JSX attributes, single/double based on Prettier defaults for JS/TS strings.
