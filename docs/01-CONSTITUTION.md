# 01 - Project Constitution

## Purpose
This document serves as the supreme governing text for the Mess Management System. It defines the absolute core philosophy, vision, and principles that dictate every architectural decision, development pattern, and feature implementation within the project. 

## Scope
The rules within this Constitution apply to all code, architecture, UI/UX designs, database models, API endpoints, and AI-driven development workflows. No other document or rule may conflict with this Constitution.

---

## 1. Project Vision
To build a modern, production-ready, scalable Mess Management Dashboard exclusively for a single hostel/mess. It must be blazing fast, visually stunning, and rigorously typed using the official Next.js stack.

## 2. Project Goals
- **Single-Tenant Elegance:** Serve exactly one mess entity with complete feature coverage (shopping, deposits, expenses, cashbook, reports).
- **Production-Readiness:** Ensure high performance, secure data access, and a zero-error build process at all times.
- **Maintainability:** Guarantee long-term code health through strict Feature-Based Architecture.

## 3. Project Philosophy
- **Documentation-Driven Development (DDD):** Documentation is the single source of truth. Code follows documentation.
- **Strict Typing:** No `any`. TypeScript strict mode is absolute.
- **Simplicity & Reusability:** Modular, reusable components using shadcn/ui and Tailwind CSS.
- **Modern React:** Server Components by default. Client Components only for interactivity.

---

## Core Principles

### Development Principles
1. **Feature Isolation:** Domain logic belongs in `features/`, not scattered across the global scope.
2. **Immutable State:** Rely on Zustand for global state and TanStack Query for server state. Never mutate state directly.
3. **Fail-Fast Validation:** Validate everything at the boundaries using Zod.

### Architecture Principles
1. **Feature-Based Architecture:** Group code by domain (e.g., auth, shopping, members) rather than technical role (e.g., controllers, views).
2. **Thin API Layer:** Keep Next.js route handlers (`app/api/*`) thin. Delegate logic to `services/`.
3. **Database Agnosticism (Logic):** Prisma abstracts the database; application code relies on Prisma types, not raw SQL.

### Code Quality Principles
1. **Zero ESLint Warnings:** Code must compile and lint without a single error or warning.
2. **DRY (Don't Repeat Yourself):** Extract repeated UI into `components/` and repeated logic into `hooks/` or `utils/`.
3. **Single Responsibility:** Functions and components must do exactly one thing well.

### UI Principles
1. **Consistent Design Language:** Use predefined Tailwind tokens and shadcn/ui components.
2. **Accessible by Default:** Keyboard navigation, ARIA attributes, and high contrast must be maintained.
3. **Fluid Feedback:** Every action must have a loading state, success toast, or error boundary.

### Security Principles
1. **Never Trust the Client:** All inputs must be parsed through Zod on the server.
2. **Least Privilege:** API routes must explicitly verify user sessions via Better Auth before execution.
3. **Secure Secrets:** Environment variables must be validated on startup.

### Performance Principles
1. **Server-First Rendering:** Use React Server Components (RSC) to ship less JavaScript.
2. **Optimistic Updates:** Use TanStack Query to mutate UI before server confirmation for a snappy feel.
3. **Lazy Loading:** Dynamically import heavy charting libraries or complex modals.

### Scalability & Maintainability Principles
1. **Predictable File Structure:** Predictability over cleverness. Anyone should know where a file lives instantly.
2. **Decoupled Packages:** Use the monorepo structure to keep UI, DB, and config decoupled from the web app.

---

## Rules & Guidelines

### Documentation Rules
- Read docs before writing code.
- If requirements change, update the docs before updating the code.

### Testing Rules
- Every critical user flow requires a checklist verification.
- Forms must be tested for edge cases and validation failures.

### Naming & Folder Rules
- Use `kebab-case` for folders and files.
- Use `PascalCase` for React components.
- Use `camelCase` for functions and variables.

### Dependency Rules
- Use the predefined official tech stack only.
- Do not add new dependencies without architectural approval.

### Business Rules
- The system is built for one mess. Avoid multi-tenant architecture logic.
- Deposits and Expenses must flawlessly tie into the Cashbook and Ledger.

### AI Development Rules
- See `05-AI-DEVELOPMENT-RULES.md`. AI must follow instructions verbatim and only execute the specified task.

---
*References: 02-ARCHITECTURE.md, 05-AI-DEVELOPMENT-RULES.md, 06-CODING-STANDARDS.md*
