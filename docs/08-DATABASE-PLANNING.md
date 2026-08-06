# 08 - Database Planning

## Purpose
This document outlines the architectural plan for the PostgreSQL database via Prisma ORM.

## Scope
Models, fields, relationships, enums, and indexing strategy. No raw SQL.

---

## 1. Enums
- `Role`: `ADMIN`, `MANAGER`, `MEMBER`
- `TransactionType`: `DEPOSIT`, `EXPENSE`
- `ExpenseCategory`: `GROCERY`, `UTILITIES`, `MAINTENANCE`, `OTHER`
- `MealType`: `BREAKFAST`, `LUNCH`, `DINNER`

## 2. Models (Core & Auth)
**User / Account / Session (Better Auth Standard)**
- `User`: Handles authentication. ID, Email, Name, Role.
- `Account`: OAuth linkage (if applicable).
- `Session`: Active login sessions.

## 3. Models (Domain)

**Member**
- `id`: String (cuid)
- `userId`: String (optional link to Auth User)
- `name`: String
- `phone`: String?
- `roomNumber`: String?
- `isActive`: Boolean (default true)
- `joinDate`: DateTime
- *Relations:* One-to-Many with Deposits, One-to-Many with Meals, One-to-Many with MemberBalances.

**Transaction (Unified Ledger Approach)**
- `id`: String (cuid)
- `type`: Enum (TransactionType)
- `amount`: Float
- `date`: DateTime
- `description`: String?
- `addedById`: String (Auth User who added it)
- `memberId`: String? (Required if DEPOSIT)
- `categoryId`: String? (Required if EXPENSE)
- `receiptUrl`: String? (Cloudinary integration)
- *Indexes:* On `type`, `date`, `memberId`.

**MealRecord**
- `id`: String (cuid)
- `date`: DateTime
- `type`: Enum (MealType)
- `memberId`: String
- `count`: Float (allows 0.5 meals, 1 meal)
- `costPerMeal`: Float? (Calculated at month-end)
- *Indexes:* Composite index on `[date, memberId]`.

**MonthClosing (Archive & Reports)**
- `id`: String (cuid)
- `monthYear`: String (e.g., "2024-10")
- `totalExpenses`: Float
- `totalMeals`: Float
- `mealRate`: Float
- `isClosed`: Boolean
- `closedAt`: DateTime?
- *Relations:* One-to-Many with MemberBalances.

**MemberBalance (Monthly Snapshot)**
- `id`: String (cuid)
- `memberId`: String
- `monthClosingId`: String
- `totalDeposits`: Float
- `totalMealCost`: Float
- `balance`: Float (Positive = advance, Negative = due)

## 4. Indexing Strategy
- Heavy read queries will occur on `date` ranges for financial filtering. Add indexes to `Transaction.date` and `MealRecord.date`.
- Foreign keys (`memberId`, `monthClosingId`) must be indexed to speed up relational joins.
