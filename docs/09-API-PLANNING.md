# Enterprise REST API Specification

## 1. Purpose
This document defines the complete REST API contract for the Mess Management System. It establishes the strict boundaries, request/response shapes, and endpoint structures required to build Next.js App Router Route Handlers. This specification serves as the absolute source of truth for API generation, ensuring strict alignment with the Database Planning and Architecture guidelines.

---

## 2. API Design Principles
- **RESTful Design:** APIs must represent state transfers of domain resources.
- **Resource-Based URLs:** URLs must identify nouns, not verbs (e.g., `/api/deposits`, not `/api/getDeposits`).
- **Predictable Endpoints:** Adhere to standard CRUD operations.
- **Stateless Requests:** Every request must contain all necessary authentication data (via cookies).
- **Consistent Responses:** All APIs must respond with a standardized envelope structure.
- **Strong Validation:** Zod schemas are mandatory for all `body` and `searchParams`.
- **Security First:** Zero trust. Server validates permissions on every invocation.
- **Idempotency:** `PUT` and `DELETE` requests must be idempotent.
- **Backward Compatibility:** Breaking API contracts is prohibited in `v1`.

---

## 3. Global API Standards
- **Base URL:** `/api`
- **Versioning Strategy:** URI versioning reserved for major breaking changes (e.g., `/api/v1/...`). Current default is unversioned internal APIs.
- **JSON Format:** `application/json` is mandatory for request and response payloads.
- **Content Types:** Exclusively `application/json` unless handling `multipart/form-data` for uploads.
- **Character Encoding:** UTF-8.
- **HTTP Methods:** `GET` (Read), `POST` (Create), `PATCH` (Partial Update), `DELETE` (Soft Delete). Avoid `PUT` unless replacing the entire resource.
- **Naming Conventions:** Kebab-case URLs (`/api/meal-corrections`).
- **Timezone Rules:** UTC internally.
- **Date Format:** ISO 8601 strings (`YYYY-MM-DDTHH:mm:ss.sssZ`).
- **Currency Rules:** Represented as Integers (cents) or strict Decimals in the database, passed as `number` in JSON.

---

## 4. Authentication & Authorization (Better Auth)
*Note: Handled natively by Better Auth internals, but mapped here for conceptual completeness.*

| Endpoint | Method | Purpose | Auth Required | Validation / Body |
| :--- | :--- | :--- | :--- | :--- |
| `/api/auth/sign-in` | `POST` | Authenticate user. | No | `email`, `password` |
| `/api/auth/sign-up` | `POST` | Register new user. | No | `email`, `password`, `name` |
| `/api/auth/sign-out` | `POST` | Terminate session. | Yes | None |
| `/api/auth/verify-email` | `POST` | Verify OTP/Link. | No | `token` |
| `/api/auth/forgot-password` | `POST` | Trigger reset email. | No | `email` |
| `/api/auth/reset-password` | `POST` | Update password. | No | `token`, `newPassword` |
| `/api/auth/session` | `GET` | Get current session. | Yes | None |
| `/api/auth/change-password` | `POST` | Update password. | Yes | `oldPassword`, `newPassword` |

---

## 5. Member APIs
**Resource:** `/api/members`

| Endpoint | Method | Purpose | Auth Required | Body / Query |
| :--- | :--- | :--- | :--- | :--- |
| `/api/members` | `GET` | Fetch all members. | Admin/Manager | `?status=active`, `?page=1` |
| `/api/members` | `POST` | Create member. | Admin | `{ name, email, role, phone }` |
| `/api/members/:id` | `GET` | Fetch member profile. | Yes | None |
| `/api/members/:id` | `PATCH` | Update details. | Admin | `{ phone, roomNumber }` |
| `/api/members/:id` | `DELETE` | Soft deactivate. | Admin | None |

---

## 6. Financial APIs

### Deposits (`/api/deposits`)
- `GET /api/deposits`: Query `?month=YYYY-MM`, `?memberId=123`.
- `POST /api/deposits`: Body `{ memberId, amount, date, method, reference }`.
- `PATCH /api/deposits/:id`: Update deposit details.
- `DELETE /api/deposits/:id`: Soft delete.

### Expenses (`/api/expenses`)
- Includes Shopping, Extra Bills, Cook Salary, Utility Bills, Special Events.
- `GET /api/expenses`: Query `?type=shopping`, `?month=YYYY-MM`, `?category=food`.
- `POST /api/expenses`: Body `{ type, amount, date, description, receiptUrl }`.
- `PATCH /api/expenses/:id`: Update expense.
- `DELETE /api/expenses/:id`: Soft delete.

---

## 7. Meal APIs
**Resource:** `/api/meals`

| Endpoint | Method | Purpose | Body / Query |
| :--- | :--- | :--- | :--- |
| `/api/meals` | `GET` | Fetch meals. | `?month=YYYY-MM`, `?memberId=123` |
| `/api/meals` | `POST` | Add daily meal entry. | `{ date, memberId, count }` |
| `/api/meals/batch` | `POST` | Add bulk meals. | `[{ memberId, count }]` |
| `/api/meals/summary` | `GET` | Aggregate stats. | `?month=YYYY-MM` |
| `/api/meals/:id` | `PATCH` | Correct a meal. | `{ count }` |

---

## 8. Accounting APIs
Read-only aggregations for reporting.

- `GET /api/accounting/cashbook`: Paginated ledger of all money in vs money out.
- `GET /api/accounting/balance-sheet`: Current aggregated mess balances.
- `GET /api/accounting/summary`: Query `?month=YYYY-MM`. Returns total deposits, total expenses, meal rates.
- `GET /api/accounting/outstanding`: List of members with negative balances.

---

## 9. Month Closing APIs
Strictly controlled administrative actions.

- `GET /api/month-closing/preview`: Preview calculations (Meal Rate, Balances) for a pending month.
- `POST /api/month-closing`: Execute the closing process, lock meals/expenses, and generate historical records.
- `GET /api/month-closing/history`: Fetch list of past closed months.
- `GET /api/month-closing/:id`: Fetch exact frozen report for a closed month.

---

## 10. Dashboard APIs
Aggregated endpoints to prevent frontend N+1 requests.

- `GET /api/dashboard/summary`: Fetches `Today's Overview`, active member count, and recent alerts.
- `GET /api/dashboard/activities`: Unified feed of recent deposits and expenses.

---

## 11. Analytics APIs
For populating Recharts.

- `GET /api/analytics/expense-trends`: Returns timeseries data for expense categories.
- `GET /api/analytics/meal-trends`: Returns timeseries data for meal consumption.
- `GET /api/analytics/monthly-comparison`: Compares current month metrics vs previous month.

---

## 12. Upload APIs
Interfacing securely with Cloudinary.

- `POST /api/uploads/signature`: Returns a secure signed token for the client to upload files directly to Cloudinary.
- **Validation:** Enforce `image/jpeg`, `image/png`, `application/pdf`. Size limit `5MB`.

---

## 13. Notification APIs
- `GET /api/notifications`: Fetch paginated user notifications.
- `PATCH /api/notifications/:id/read`: Mark as read.
- `POST /api/notifications/mark-all-read`: Mark all as read.

---

## 14. Settings APIs
- `GET /api/settings`: Fetch mess-wide settings (e.g., Default Meal Rate).
- `PATCH /api/settings`: Update application settings. Admin only.
- `PATCH /api/settings/profile`: User updates their own preferences/theme.

---

## 15. Common Request Standards
- **Headers:** `Content-Type: application/json`.
- **Pagination:** Query params `?page=1&limit=20`.
- **Sorting:** Query params `?sortBy=date&sortOrder=desc`.
- **Filtering:** Query params `?status=active`.
- **Date Range:** `?startDate=2024-01-01&endDate=2024-01-31`.

---

## 16. Common Response Standards
**Success Contract:**
```json
{
  "data": { ... },
  "error": null,
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "timestamp": "2024-01-01T12:00:00Z"
  }
}
```

**Error Contract:**
```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [...]
  }
}
```

---

## 17. Error Standards
| HTTP Code | Use Case |
| :--- | :--- |
| `400 Bad Request` | Zod validation failed. Invalid query params. |
| `401 Unauthorized` | Missing or invalid session cookie. |
| `403 Forbidden` | Valid session, but lacks Admin/Manager role. |
| `404 Not Found` | Resource ID does not exist. |
| `409 Conflict` | Business rule violated (e.g., Month already closed). |
| `429 Too Many Requests` | Rate limit exceeded. |
| `500 Internal Server Error` | Database crash, unhandled exception. |

---

## 18. Validation Rules
- **Zod Validation:** Every endpoint must run `schema.parse()` or `schema.safeParse()`.
- **Input Sanitization:** Trim strings automatically via Zod `.trim()`.
- **Business Validation:** Validate dates (e.g., cannot add a deposit in a closed month) inside the Route Handler.

---

## 19. Security Standards
- **Authorization:** Middleware and Handler-level checks against `session.user.role`.
- **Rate Limiting:** Protect `/api/auth/*` and `/api/uploads/*`.
- **CORS:** Restrict API access strictly to the Next.js frontend origin.
- **Audit Logging:** Record the `userId` initiating `POST`, `PATCH`, `DELETE` operations on finances.

---

## 20. Performance Standards
- **Pagination:** Offset pagination (`skip/take`) for standard lists. Cursor pagination for infinite scroll feeds (Activities).
- **Database Optimization:** `select` only the fields requested by the contract. Avoid `include` unless absolutely necessary to prevent massive payloads.

---

## 21. API Lifecycle
- **Creating APIs:** Define in this document first.
- **Updating APIs:** Must be strictly backward compatible. Add new fields, do not rename or remove existing ones.
- **Deprecating APIs:** Mark with `@deprecated` in JSDoc, return a warning header.

---

## 22. Endpoint Naming Rules
- **Resources:** Plural nouns (`/api/members`).
- **Nested Resources:** Used only for strict parent-child relationships (`/api/members/:id/deposits`).
- **Actions:** Avoid verbs in paths. Use `POST` to the resource. Exception: explicit state mutations like `/api/month-closing`.
- **Path Parameters:** Prefix with `:` conceptually (e.g., `[id]` in Next.js app router).

---

## 23. AI API Rules
The AI **must never**:
- Invent endpoints not defined in this document.
- Skip Zod validation on incoming requests.
- Return inconsistent response formats (the standard envelope is absolute).
- Expose raw database internals or un-hashed passwords.
- Bypass `requireAdmin` or `requireAuth` checks.
- Mix heavy business logic directly inside the Route Handler (delegate to Services/Actions).

---

## 24. API Validation Checklist
Before considering an endpoint complete, verify:
- [ ] RESTful naming is maintained.
- [ ] Correct HTTP method is used.
- [ ] Authentication checks are defined and functional.
- [ ] Authorization checks (Roles) are defined and functional.
- [ ] Request is validated via Zod.
- [ ] Response matches the standard envelope structure.
- [ ] Error responses correctly map to HTTP status codes.
- [ ] Matches Database Planning constraints.
