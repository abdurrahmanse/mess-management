# 07 - Project Structure

## Purpose
This document maps out the absolute directory layout of the monorepo and Next.js application.

## Scope
Directory creation and file placement rules.

---

## Workspace Root
```text
mess-management/
├── apps/
│   └── web/                   # Next.js Application
├── packages/                  # Shared internal packages
│   ├── ui/                    # Shared design system components
│   ├── database/              # DB types or Prisma logic (optional split)
│   ├── config/                # Shared ESLint/TS configs
│   └── tsconfig/              # Base tsconfigs
├── docs/                      # Documentation source of truth
├── prisma/                    # Global database schema and migrations
├── scripts/                   # Workspace automation scripts
├── package.json
└── turbo.json
```

## Next.js Application (`apps/web`)
```text
apps/web/
├── app/                       # App Router Pages & API Routes
│   ├── (auth)/                # Auth route group
│   ├── (dashboard)/           # Protected dashboard route group
│   ├── api/                   # Route handlers
│   ├── globals.css            # Tailwind & CSS Variables
│   └── layout.tsx
├── components/                # Global UI Components
│   ├── ui/                    # shadcn/ui components
│   └── layout/                # Global Header, Sidebar, Containers
├── features/                  # Domain-Driven Feature Modules
│   ├── auth/                  # Components, hooks, types for auth
│   ├── members/               
│   ├── financials/            # Shared deposits & expenses logic
│   ├── shopping/
│   ├── meals/
│   └── reports/
├── hooks/                     # Global generic hooks (useMediaQuery, etc)
├── providers/                 # React Context Providers (Query, Theme)
├── store/                     # Zustand global stores
├── services/                  # External API wrappers (Cloudinary, Resend)
├── lib/                       # Singletons & Configurations (Prisma Client, Better Auth)
├── config/                    # Static configuration (Navigation links, Enums)
├── constants/                 # App-wide magic strings and numbers
├── types/                     # Global TypeScript interfaces
├── utils/                     # Generic utility functions (date formatters, cn)
├── public/                    # Static assets, PWA manifest
├── middleware.ts              # Route protection (or proxy.ts)
└── next.config.mjs
```

## Feature Structure Example
```text
features/members/
├── components/                # Member DataTable, Member Form
├── hooks/                     # useMembers Query
├── schemas/                   # Zod schemas for member creation
├── types/                     # Specific member interfaces
└── utils/                     # Member specific formatting
```
