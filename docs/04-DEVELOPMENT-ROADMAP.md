# 04 - Development Roadmap

## Purpose
This document provides a strict, step-by-step roadmap for project execution. 

## Scope
Every AI prompt must correspond to exactly one Task or Sub Task from this roadmap.

---

## Phase 0: Project Initialization
- **Task 0.1:** Setup Next.js, TypeScript, Tailwind CSS
- **Task 0.2:** Setup Workspace, Turborepo, package.json
- **Task 0.3:** Setup Prisma & Neon Database Connection
- **Task 0.4:** Setup Better Auth Configuration
- **Task 0.5:** Setup TanStack Query & Providers
- **Task 0.6:** Setup Zustand Stores
- **Task 0.7:** Setup shadcn/ui & Base Design Tokens
- **Task 0.8:** Setup next-themes & Dark Mode
- **Task 0.9:** Setup PWA Manifest & Service Worker
- **Task 0.10:** Setup Resend & Cloudinary API Keys

## Phase 1: Authentication & Onboarding
- **Task 1.1:** Build Login UI & Integration
- **Task 1.2:** Build Registration UI & Integration
- **Task 1.3:** Build Email OTP Verification Flow
- **Task 1.4:** Build Forgot Password & Reset Flow
- **Task 1.5:** Build Auth Middleware & Protected Routes
- **Task 1.6:** Build Session Expired Handling

## Phase 2: Core Dashboard & Layout
- **Task 2.1:** Build Dashboard Shell (Sidebar, Header)
- **Task 2.2:** Build Global Navigation & Breadcrumbs
- **Task 2.3:** Build Theme Toggle & Profile Dropdown
- **Task 2.4:** Build Notification Store & UI Panel
- **Task 2.5:** Build Home Dashboard Overview Cards

## Phase 3: Member Management
- **Task 3.1:** Create Prisma Models for Members
- **Task 3.2:** Build Member API Endpoints (CRUD)
- **Task 3.3:** Build Member DataTable (TanStack Table)
- **Task 3.4:** Build Add/Edit Member Forms (React Hook Form)
- **Task 3.5:** Build Member Profile Image Upload (Cloudinary)

## Phase 4: Financials - Deposits & Expenses
- **Task 4.1:** Create Prisma Models for Deposits & Categories
- **Task 4.2:** Build Deposit API & DataTable
- **Task 4.3:** Build Add Deposit Form
- **Task 4.4:** Create Prisma Models for Expenses & Shopping
- **Task 4.5:** Build Expense API & DataTable
- **Task 4.6:** Build Add Expense/Shopping Form

## Phase 5: Accounting - Cashbook & Ledger
- **Task 5.1:** Build Cashbook Aggregation Logic (API)
- **Task 5.2:** Build Cashbook UI & Monthly Filtering
- **Task 5.3:** Build Individual Member Ledger Logic (API)
- **Task 5.4:** Build Member Ledger UI (Statement View)

## Phase 6: Analytics & Reports
- **Task 6.1:** Build Meal Tracking System (Models & API)
- **Task 6.2:** Build Meal Input Grid UI
- **Task 6.3:** Build Month-Closing Calculation Engine (API)
- **Task 6.4:** Build Month-Closing Report UI
- **Task 6.5:** Build Recharts Visualizations (Expense vs Deposit)

## Phase 7: Polish & Production
- **Task 7.1:** Implement Global Error Boundaries
- **Task 7.2:** Implement Not Found & Loading Skeletons
- **Task 7.3:** Review Accessibility & PWA Installation
- **Task 7.4:** Audit Database Indexes & Query Performance
- **Task 7.5:** Final Vercel Deployment & Env Verification
