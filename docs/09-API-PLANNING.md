# 09 - API Planning

## Purpose
This document maps out the required RESTful endpoints to support the Mess Management dashboard.

## Scope
Next.js Route Handlers (`app/api/...`) design.

---

## 1. Authentication (`/api/auth/*`)
Handled natively by Better Auth internals, but includes:
- `POST /api/auth/sign-in`
- `POST /api/auth/sign-up`
- `POST /api/auth/sign-out`
- `POST /api/auth/verify-email`
- `POST /api/auth/reset-password`

## 2. Members (`/api/members`)
- `GET /api/members`: Fetch all active members. Query params for `?status=active|inactive`.
- `POST /api/members`: Create a new member profile.
- `PATCH /api/members/[id]`: Update member details.
- `DELETE /api/members/[id]`: Soft delete/deactivate a member.

## 3. Transactions: Deposits (`/api/deposits`)
- `GET /api/deposits`: Fetch paginated deposits. Query `?month=YYYY-MM`.
- `POST /api/deposits`: Create deposit for a specific member.
- `PATCH /api/deposits/[id]`: Edit deposit amount or date.
- `DELETE /api/deposits/[id]`: Delete a deposit.

## 4. Transactions: Expenses (`/api/expenses`)
- `GET /api/expenses`: Fetch paginated expenses. Query `?month=YYYY-MM`.
- `POST /api/expenses`: Record an expense with a category and optional receipt URL.
- `PATCH /api/expenses/[id]`: Edit expense.
- `DELETE /api/expenses/[id]`: Delete expense.

## 5. Meals (`/api/meals`)
- `GET /api/meals`: Fetch meal records for a specific date range. Query `?start=DATE&end=DATE`.
- `POST /api/meals/batch`: Create or update meal counts in bulk for multiple members on a specific date.

## 6. Accounting & Reports (`/api/accounting`)
- `GET /api/accounting/cashbook`: Aggregates total deposits minus total expenses for a given period.
- `GET /api/accounting/ledger/[memberId]`: Returns detailed statement of deposits and meal costs for a specific member.

## 7. Month Closing (`/api/month-closing`)
- `POST /api/month-closing/calculate`: Triggers calculation of total meals, total expenses, and determines the exact `mealRate` for the month. Creates MemberBalance records.
- `GET /api/month-closing/history`: Fetch list of past closed months.

## 8. Uploads (`/api/uploadthing`)
- Exposes UploadThing handlers for direct client-to-cloud secure file uploads (receipts, avatars).
