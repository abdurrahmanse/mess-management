# 08 - Database Planning

## 1. Database Philosophy

### Single Source of Truth
The database serves as the absolute final arbiter of state. No critical business logic or state should exist solely in the application layer or cache. If data is not in PostgreSQL, it does not exist.

### Ledger-Based Accounting
Financial tracking (Deposits and Expenses) relies on an immutable, append-only ledger philosophy. Rather than constantly updating a single "balance" field, balances are computed dynamically from immutable transaction records to ensure mathematical correctness and traceability.

### Monthly Snapshot Strategy
To prevent long-running queries over years of data, the system implements a `MonthClosing` snapshot. At the end of a billing cycle, total meals and expenses are locked, the `mealRate` is computed, and `MemberBalance` records are hard-saved. Future calculations start from the last snapshot, ensuring high performance.

### Soft Delete Strategy
Critical records (Members, Transactions) are never physically deleted from the database. A `deletedAt` timestamp is used to hide them from standard queries, preserving historical financial integrity and audit trails.

### Audit Trail
All mutations to core business models must be logged. Models include `createdAt`, `updatedAt`, and where applicable, `createdBy` and `updatedBy` relations to track exactly which user authorized a change.

### Referential Integrity
Strict foreign key constraints are enforced at the database level. Deleting a parent record either strictly cascades to harmless children (e.g., Session) or is restricted if it breaks financial history (e.g., Member with active deposits).

### Data Consistency & Scalability Strategy
Transactions are wrapped in database-level blocks to prevent race conditions. The schema is normalized (3NF) to eliminate data redundancy, with specific denormalizations (e.g., snapshot balances) introduced purely for read-heavy reporting scalability.

---

## 2. Enums

- `Role`: `ADMIN`, `MANAGER`, `MEMBER`
- `TransactionType`: `DEPOSIT`, `EXPENSE`, `TRANSFER`, `REFUND`
- `ExpenseType`: `FIXED`, `VARIABLE`
- `ExpenseStatus`: `PENDING`, `APPROVED`, `REJECTED`, `PAID`
- `ExpenseCategory`: `GROCERY`, `UTILITIES`, `MAINTENANCE`, `RENT`, `OTHER`
- `MealType`: `BREAKFAST`, `LUNCH`, `DINNER`, `GUEST`
- `NotificationType`: `SYSTEM`, `FINANCIAL`, `REMINDER`, `ALERT`
- `ActivityType`: `CREATE`, `UPDATE`, `DELETE`, `LOGIN`, `EXPORT`
- `UploadType`: `AVATAR`, `RECEIPT`, `DOCUMENT`
- `MonthStatus`: `OPEN`, `FROZEN`, `CLOSED`
- `Theme`: `LIGHT`, `DARK`, `SYSTEM`
- `UserStatus`: `ACTIVE`, `INACTIVE`, `SUSPENDED`
- `DocumentType`: `INVOICE`, `CONTRACT`, `GUIDELINE`
- `PaymentMethod`: `CASH`, `BANK_TRANSFER`, `MOBILE_MONEY`, `CREDIT`

---

## 3. Authentication Models (Better Auth Standard)

### User
- **Purpose**: Core identity for authentication.
- **Fields**: `id`, `name`, `email`, `emailVerified`, `image`, `role` (Enum), `status` (Enum).
- **Relations**: 1:M with Session, Account, ActivityLog. 1:1 with Profile.
- **Constraints**: Unique `email`.

### Account
- **Purpose**: OAuth provider linkage.
- **Fields**: `id`, `userId`, `providerId`, `accountId`, `accessToken`, `refreshToken`.
- **Relations**: M:1 with User. Cascade on User delete.

### Session
- **Purpose**: Active browser sessions.
- **Fields**: `id`, `userId`, `token`, `expiresAt`, `ipAddress`, `userAgent`.
- **Relations**: M:1 with User. Cascade on User delete.

### Verification / Password Reset
- **Purpose**: Email OTP and password reset tokens.
- **Fields**: `id`, `identifier`, `value`, `expiresAt`.

### LoginHistory & ActiveDevice
- **Purpose**: Security auditing.
- **Fields**: `id`, `userId`, `ipAddress`, `deviceInfo`, `loginAt`, `isSuccess`.

---

## 4. Core Business Models

### Member
- **Purpose**: Represents a resident of the mess.
- **Fields**: `id`, `userId` (optional link), `firstName`, `lastName`, `phone`, `roomNumber`, `joinDate`, `leaveDate`.
- **Soft Delete**: `deletedAt`.
- **Relations**: 1:M with Deposits, MealRecords, MemberBalances.

### Transaction
- **Purpose**: The immutable financial ledger.
- **Fields**: `id`, `type` (Enum), `amount`, `date`, `description`, `paymentMethod` (Enum).
- **Audit**: `createdBy`, `updatedBy`.

### Deposit (Extends Transaction conceptually)
- **Purpose**: Money paid by a member into the mess fund.
- **Fields**: `id`, `transactionId` (1:1), `memberId`.
- **Validation**: Amount must be > 0.

### Expense (Extends Transaction conceptually)
- **Purpose**: Money spent by the mess.
- **Fields**: `id`, `transactionId` (1:1), `categoryId`, `status` (Enum), `receiptId` (CloudinaryAsset).

### Shopping & ShoppingItem
- **Purpose**: Daily bazaar tracking.
- **Fields (Shopping)**: `id`, `date`, `totalAmount`, `shopperId` (Member).
- **Fields (ShoppingItem)**: `id`, `shoppingId`, `name`, `quantity`, `unitId`, `price`.
- **Relations**: Shopping 1:M ShoppingItem. Cascade delete allowed on Items.

### MealRecord
- **Purpose**: Tracks daily consumption.
- **Fields**: `id`, `memberId`, `date`, `type` (Enum), `quantity` (Float, allows 0.5).
- **Constraints**: Unique composite `[memberId, date, type]`.

### MonthClosing
- **Purpose**: Immutable snapshot of a billing cycle.
- **Fields**: `id`, `monthYear` (String: YYYY-MM), `status` (Enum), `totalExpenses`, `totalMeals`, `mealRate`, `closedAt`, `closedBy`.
- **Unique**: `monthYear`.

### MemberBalance
- **Purpose**: Member's financial state at the end of a closed month.
- **Fields**: `id`, `monthClosingId`, `memberId`, `totalDeposits`, `totalMealCost`, `carriedForward`, `finalBalance`.
- **Relations**: M:1 with MonthClosing, M:1 with Member.

### Notification & ActivityLog
- **Purpose**: System alerts and audit trails.
- **Fields (Log)**: `id`, `userId`, `action` (Enum), `entityType`, `entityId`, `metadata` (JSONB).

### Settings & Profile
- **Purpose**: Global app config and user preferences.
- **Fields (Settings)**: `id`, `messName`, `currency`, `timezone`, `defaultMealRate`.

---

## 5. Supporting Models

- **ExpenseCategory**: `id`, `name`, `description`, `isActive`.
- **Units**: `id`, `name`, `abbreviation` (e.g., kg, L, pcs).
- **Tags/Labels**: `id`, `name`, `colorHex`. Used for flexible transaction categorizations.

---

## 6. Model Planning Requirements

For every model implemented in the future, the following strict guidelines apply:
1. **Purpose**: Must be clearly documented in comments.
2. **Fields**: Use standard types. Decimals for money, never Floats.
3. **Relations**: Must define both sides of the relationship explicitly.
4. **Cascade Rules**: `Cascade` for generic children (Items, Sessions). `Restrict` for financial records (Members, Transactions).
5. **Validation Rules**: Define `@db.VarChar(255)` length limits to prevent DB-level overflow.

---

## 7. Relationship Diagram (Conceptual)

- **One-to-One (1:1)**: User to Profile. Transaction to Deposit. Transaction to Expense.
- **One-to-Many (1:M)**: Member to Deposits. Member to MealRecords. Shopping to ShoppingItems. MonthClosing to MemberBalances.
- **Many-to-Many (M:N)**: Transactions to Tags. Members to Notifications.

*Rule:* All relationships must use explicit foreign keys (`memberId` linking to `Member.id`). Implicit many-to-many tables should be avoided in favor of explicit join tables if metadata (like `createdAt`) is needed on the join.

---

## 8. Index Strategy

- **Primary Keys**: B-Tree index automatically on `id` (cuid).
- **Unique Keys**: `User.email`, `MonthClosing.monthYear`.
- **Composite Indexes**: `MealRecord(memberId, date)` for ultra-fast daily grid lookups.
- **Foreign Key Indexes**: Every relation ID (`memberId`, `categoryId`) must have an index to prevent full-table scans during joins.
- **Date Indexes**: `Transaction.date` and `Shopping.date` for fast monthly range filtering.
- **Reporting Indexes**: `MonthClosing.status` for quick active-month retrieval.

---

## 9. Naming Convention

- **Table Names**: PascalCase, singular (e.g., `User`, `MealRecord`). Do not use plural table names. Mapped via `@@map("users")` to snake_case plurals in PostgreSQL.
- **Column Names**: camelCase (e.g., `firstName`, `joinDate`). Mapped via `@map("first_name")`.
- **Enum Names**: PascalCase (e.g., `TransactionType`).
- **Foreign Keys**: Target model name + `Id` (e.g., `memberId`, `shoppingId`).
- **Indexes**: `@@index([date, memberId], name: "idx_meal_date_member")`.

---

## 10. Audit Strategy

Every core business model must include:
- `createdAt DateTime @default(now())`
- `updatedAt DateTime @updatedAt`

Where user attribution is critical (Transactions, Settings, MonthClosing):
- `createdById String?`
- `updatedById String?`

Soft deletes must use:
- `deletedAt DateTime?`
- `deletedById String?`

**Audit Log Table**: Used to store JSONB diffs of critical changes (e.g., altering a deposit amount after the fact).

---

## 11. File Storage Planning (CloudinaryAsset)

The database will not store binary blobs. It stores metadata linking to Cloudinary.

**CloudinaryAsset Model:**
- `id`: String (cuid)
- `publicId`: String (Cloudinary unique identifier)
- `secureUrl`: String (HTTPS URL)
- `originalName`: String
- `mimeType`: String (e.g., image/jpeg, application/pdf)
- `size`: Int (bytes)
- `width`: Int?
- `height`: Int?
- `uploadType`: Enum (UploadType)
- `uploadedById`: String
- `createdAt`: DateTime

---

## 12. Future Scalability

The database is architected to be extended without breaking existing queries:
- **Meal Voting**: Can be added as a separate `MealVote` table linking to `MealRecord` and `User`.
- **Shopping Requests**: `ShoppingRequest` table links to `ShoppingItem` for tracking requested vs purchased items.
- **Recurring Bills**: `RecurringExpense` table acts as a cron-job template to automatically generate `Expense` records.
- **OCR Receipt Scanning**: `CloudinaryAsset` can easily be extended with an `ocrText JSONB` field.
- **Analytics & Mobile**: The normalized ledger design guarantees that future mobile APIs can aggregate data via standard REST without complex middleware logic.

---

## 13. Role-Based Access Control (RBAC) & Permission Policy
- **User Registration Policy:** Only Members can self-register. Registration requires Full Name, Email Address, Password, Confirm Password, and Email OTP Verification. A newly registered account must have the default role: MEMBER. No user may choose ADMIN or MANAGER during registration. Roles are assigned internally by the system.
- **Administrator Policy:** The system contains exactly one default Administrator account created during initial database seed. The Administrator has complete system access (View all data, Create users, Activate/deactivate users, Promote Member to Manager, Remove Manager role, Manage all Members, View all financial data, Manage system settings, View audit logs, Manage authentication/application config). The Administrator cannot bypass authentication.
- **Manager Policy:** Managers are never self-created, they are appointed only by the Administrator. A Manager is a Member whose role has been promoted. Managers may: Access Dashboard, Manage Members, Add shopping/deposits/expenses, Update financial records, Manage meals, Generate reports, Close monthly calculations, Upload receipts, Edit existing business data. Managers MUST NOT: Delete Members/Managers, Create Administrators, Promote other Managers, Change user roles, Access system configuration, Manage authentication settings, View security logs, Delete critical financial history.
- **Member Policy:** Members are standard users. They must register before accessing the system. Members can: Log in, View their own profile/deposits/meals/balance/monthly reports, Update limited profile information. Members CANNOT: Manage other users, View other members' financial information, Create expenses/deposits for others, Change roles, Access administration/management pages, Modify system settings.
- **Permission Strategy:** The system must use Role-Based Access Control (RBAC). Permissions must be checked on both Server and Client. Client UI hides unauthorized features for UX, but server-side authorization is mandatory before executing business logic.
- **Security Rules:** Authentication is required before authorization. Authorization is required before business logic. Business logic is required before database access. No API endpoint or Server Action may execute without proper validation. No sensitive data may be returned without authorization.
