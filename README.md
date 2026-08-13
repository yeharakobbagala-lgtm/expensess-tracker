# 💰 Expense Tracker

A full-stack personal finance management application built with **React**, **Spring Boot**, **Spring Security**, and **MySQL**. The system provides authenticated users with isolation for tracking personal income, expenses, monthly budgets, savings goals, financial dashboards, and interactive analytics with **Sri Lanka-focused defaults** (`LKR` / `Rs.`, `Asia/Colombo`).

> [!NOTE]
> **Localization & Security Note:**  
> * **Default Currency & Region:** Sri Lankan Rupee (`LKR`, formatted as `Rs.`) and timezone `Asia/Colombo`. Users can dynamically change their preferred currency (`Rs.`, `$`, `€`, `£`) in Settings.  
> * **Fictional Sample Data:** All demo content and test placeholders use fictional Sri Lankan examples (e.g. `Yehara Perera`, `yehara@example.com`). No real personal credentials, emails, passwords, or live secrets are stored in code or configuration files.

---

## 📌 2. Overview

### Problem & Purpose
Managing personal finances requires tracking income and expenses across categories, maintaining monthly spending limits, and working toward long-term savings goals. Generic tools often lack database-enforced user isolation or real-time calculations directly derived from historical transactions.

**Expense Tracker** was built to provide a secure, multi-tenant personal finance application where financial metrics (total balance, budget utilization, category breakdowns, savings rates, and analytics trends) are computed directly from the authenticated user's database records.

### Communication & Data Handling
* **Client-Server Architecture:** The React SPA communicates with the Spring Boot REST API using asynchronous HTTP requests via an abstracted API service layer (`api.js`).
* **Stateless Token Authentication:** Requests carry a JSON Web Token (JWT) in the `Authorization: Bearer <token>` header.
* **User Isolation:** Every protected database operation resolves the authenticated identity from Spring Security's `SecurityContextHolder`. The frontend never sends or chooses a `userId`; ownership is enforced on the backend.

```mermaid
graph TD
    User["👤 User / Browser"] -->|"HTTP / REST (JWT)"| Frontend["⚛️ React Single Page App"]
    Frontend -->|"Services (api.js)"| API["🌐 REST Endpoints"]
    API -->|"SecurityFilter"| Auth["🛡️ Spring Security + JWT"]
    Auth -->|"Context Scoped"| Controllers["🎮 Controllers"]
    Controllers -->|"Business Rules"| Services["⚙️ Services"]
    Services -->|"Data Operations"| Repositories["📦 JPA Repositories"]
    Repositories -->|"ORM"| Database[("🛢️ MySQL Database")]
```

---

## 🚀 3. Key Features

### 🔐 Authentication & Security
* **User Registration:** Registers new users with full name, email, and password.
* **BCrypt Password Hashing:** Hashes passwords using `BCryptPasswordEncoder` before database insertion.
* **Login & JWT Issuance:** Verifies credentials and returns a signed 24-hour JWT containing the user's email subject.
* **Stateless Security:** Disables session cookies; uses Spring Security `SessionCreationPolicy.STATELESS`.

### 💳 Transaction Management (CRUD)
* **Creation & Scoping:** Logged-in users create income or expense transactions with title, amount, category, payment method, date, and notes.
* **Ownership Checks:** Updates (`PUT /api/transactions/{id}`) and deletions (`DELETE /api/transactions/{id}`) verify that the transaction's `user.id` matches the authenticated caller.
* **Filtering & Pagination:** Frontend client allows searching by title, filtering by type (`income`/`expense`) and category, sorting by date/amount, and paginating records.

### 📊 Dashboard
* **Real-time Financial Totals:** Displays `totalBalance`, `totalIncome`, and `totalExpenses` calculated as:
  $$\text{totalBalance} = \text{totalIncome} - \text{totalExpenses}$$
* **Monthly Overview Chart:** 6-month historical area/bar charts rendered from `GET /api/dashboard/monthly`.
* **Category Spending Breakdown:** Pie chart rendered from `GET /api/dashboard/categories`.
* **Recent Feeds:** Displays the top 6 most recent transactions for quick audit.

### 🎯 Budget Management (CRUD)
* **Monthly Limits:** Users set monthly category budgets (e.g. `food`, `10000.0`, `2026-08`).
* **Backend Calculations:** Spring Boot computes `spent`, `remaining`, and `percentageUsed` dynamically by querying the user's expense transactions for that matching category and period:
  $$\text{spent} = \sum \text{Expense Transactions (matching category \& period)}$$
  $$\text{remaining} = \text{limit} - \text{spent}$$
  $$\text{percentageUsed} = \frac{\text{spent}}{\text{limit}} \times 100$$
* **Over-Budget & Warning Indicators:** Visual warning triggers when spending exceeds 80% (`#f59e0b`) or exceeds 100% limit (`#e53935`).
* **Duplicate Prevention:** Backend throws HTTP 409 Conflict if a user attempts to create multiple budgets for the same category and month.

### 🎯 Savings Goals (CRUD)
* **Target & Milestone Tracking:** Users create financial goals with title, target amount, current saved amount, deadline date, icon, and color.
* **DTO Security:** Uses `GoalResponse` DTO to prevent exposing internal JPA `User` relationships or credentials.
* **Progress Display:** Computes remaining amount ($\text{target} - \text{current}$) and completion percentage ($\frac{\text{current}}{\text{target}} \times 100$) for ring progress bars.

### 📈 Analytics Deep-Dive
* **Range-Filtered Analytics:** Supports `week`, `month`, `3months`, and `year` query parameters via `GET /api/analytics?range={range}`.
* **Calculated Metrics:**
  * **Monthly Spending Trend:** Area chart of historical expenses.
  * **Income vs Expenses Comparison:** Grouped bar charts.
  * **Savings Rate Trend:** Line chart calculated safely with zero-income protection:
    $$\text{Savings Rate \%} = \begin{cases} \max\left(0, \text{round}\left(\frac{\text{income} - \text{expenses}}{\text{income}} \times 100\right)\right) & \text{if income} > 0 \\ 0 & \text{otherwise} \end{cases}$$
  * **Category Breakdown:** Aggregated expense totals per category.
  * **Weekly Spending:** Aggregated expense totals by calendar week.

---

## 🛠️ 4. Technology Stack

### Frontend
* **Core:** React 18, JavaScript (ES6+), HTML5, CSS3
* **Build Tool:** Vite 8
* **Routing:** React Router DOM v6
* **Styling:** Tailwind CSS v4 (Vanilla CSS variables & custom utilities)
* **Visualization:** Recharts v2
* **Icons:** `lucide-react`
* **HTTP Service:** Native Fetch API wrapped in `src/services/api.js`

### Backend
* **Language:** Java 17 / 21
* **Framework:** Spring Boot 3
* **Security:** Spring Security, JJWT (Java JWT `io.jsonwebtoken:jjwt-api`)
* **Persistence:** Spring Data JPA, Hibernate ORM
* **Password Encoding:** BCrypt (`BCryptPasswordEncoder`)

### Database
* **Relational DB:** MySQL 8.0+

### Development Tools
* **Build Tools:** Apache Maven Wrapper (`mvnw`), Node.js / npm
* **API Testing:** Postman
* **IDE:** VS Code / IntelliJ IDEA

---

## 🏗️ 5. System Architecture

### Multi-Tier Architecture Diagram

```mermaid
flowchart TD
    subgraph Client ["Client Layer (Frontend)"]
        UI["React UI Pages"] --> Context["AppContext"]
        Context --> APIService["src/services/api.js"]
    end

    subgraph Transport ["Transport Layer"]
        APIService -->|"HTTP + Bearer JWT"| Network["REST Protocol"]
    end

    subgraph Backend ["Server Layer (Spring Boot)"]
        Network --> Filter["JwtAuthenticationFilter"]
        Filter --> SecContext["SecurityContextHolder"]
        SecContext --> Controllers["REST Controllers"]
        Controllers --> Services["Service Layer"]
        Services --> Repos["Spring Data JPA Repositories"]
    end

    subgraph Persistence ["Persistence Layer"]
        Repos --> Database[("MySQL Database")]
    end
```

### Complete Authentication Execution Flow

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant React as React Frontend (api.js)
    participant AuthCtrl as AuthController / AuthService
    participant JWT as JwtService
    participant Filter as JwtAuthenticationFilter
    participant SecCtx as SecurityContextHolder
    participant Endpoint as Protected Controller / Service
    participant DB as MySQL Database

    User->>React: Enters email & password
    React->>AuthCtrl: POST /api/auth/login
    AuthCtrl->>DB: findByEmail(email)
    DB-->>AuthCtrl: User entity (with BCrypt hash)
    AuthCtrl->>AuthCtrl: PasswordEncoder.matches()
    AuthCtrl->>JWT: generateToken(email)
    JWT-->>React: { "token": "eyJhbG..." }
    React->>React: Save token to localStorage

    Note over User, DB: Subsequent Authenticated Requests (e.g. GET /api/dashboard)

    React->>Filter: GET /api/dashboard (Header: Authorization: Bearer eyJhbG...)
    Filter->>JWT: extractEmail(token)
    JWT-->>Filter: email (e.g. user@example.com)
    Filter->>SecCtx: setAuthentication(UsernamePasswordAuthenticationToken)
    Filter->>Endpoint: Forward request
    Endpoint->>SecCtx: getAuthentication().getName()
    SecCtx-->>Endpoint: user@example.com
    Endpoint->>DB: findByEmail("user@example.com")
    DB-->>Endpoint: User Entity
    Endpoint->>DB: Query User-scoped data
    DB-->>Endpoint: User Data
    Endpoint-->>React: 200 OK DTO Response
```

---

## 🔑 6. Authentication & Authorization

### Registration Flow
1. User posts payload to `POST /api/auth/register`:
   ```json
   {
     "fullName": "Yehara Kobbagala",
     "email": "yehara@example.com",
     "password": "securePassword123"
   }
   ```
2. `AuthService.register()` checks if email already exists in `UserRepository`. If present, throws `RuntimeException("Email already registered")`.
3. Password is encrypted via `passwordEncoder.encode(rawPassword)`.
4. `User` entity is saved to MySQL. Plaintext passwords are never stored.

### Login Flow
1. User posts credentials to `POST /api/auth/login`:
   ```json
   {
     "email": "yehara@example.com",
     "password": "securePassword123"
   }
   ```
2. `AuthService.login()` queries `userRepository.findByEmail(email)`.
3. `passwordEncoder.matches(rawPassword, encodedPassword)` validates credentials.
4. `JwtService.generateToken(email)` signs a 24-hour token with HMAC-SHA256.
5. Returns `LoginResponse` containing `{ "token": "..." }`.

### Authenticated Request Execution
For every protected request, `src/services/api.js` automatically attaches:
```http
Authorization: Bearer <token>
```
`JwtAuthenticationFilter` intercepts the request:
1. Extracts `token` from `Authorization` header.
2. Validates expiration and signature against the backend secret key.
3. Extracts the subject (`email`).
4. Populates `SecurityContextHolder.getContext().setAuthentication(...)`.
5. Controllers and services extract identity via `SecurityContextHolder.getContext().getAuthentication().getName()` to load the database `User`.

---

## 🔒 7. User Handling & Data Isolation

The frontend **never** dictates entity ownership. The backend completely ignores `userId` fields passed in request bodies and resolves ownership strictly from the active Security Context.

```mermaid
erDiagram
    USERS ||--o{ TRANSACTIONS : owns
    USERS ||--o{ BUDGETS : owns
    USERS ||--o{ GOALS : owns

    USERS {
        bigint id PK
        string email UK
        string full_name
        string password
    }

    TRANSACTIONS {
        bigint id PK
        bigint user_id FK
        string type
        string title
        double amount
        string category
        string method
        date date
        string notes
    }

    BUDGETS {
        bigint id PK
        bigint user_id FK
        string category
        double budget_limit
        string period
    }

    GOALS {
        bigint id PK
        bigint user_id FK
        string title
        double target
        double current
        date deadline
        string icon
        string color
    }
```

### Authorization Checks in Service Layer
To prevent cross-tenant data tampering (e.g. User A modifying User B's resource by altering an ID in the URL):

```java
// Example from TransactionService / BudgetService / GoalService
User user = getCurrentUser();
Transaction existing = transactionRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Transaction not found"));

if (!existing.getUser().getId().equals(user.getId())) {
    throw new RuntimeException("Unauthorized transaction access");
}
```

---

## 🛡️ 8. Security Architecture

### JWT Implementation Details
* **Algorithm:** HMAC-SHA256 via `Keys.hmacShaKeyFor(secretKey.getBytes())`.
* **Validity:** 86,400,000 ms (24 hours).
* **Invalid / Expired Tokens:** `JwtAuthenticationFilter` catches parsing/validation exceptions, clears security context, and responds immediately with `HTTP 401 Unauthorized`.

### Password Security
* Hashes passwords using Spring Security's `BCryptPasswordEncoder`. Passwords are never logged or stored in plain text.

### Endpoint Security Mapping
```java
.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
    .anyRequest().authenticated()
)
```

### CORS Configuration
Configured in `SecurityConfig.java` to allow local cross-origin development requests:
```java
CorsConfiguration configuration = new CorsConfiguration();
configuration.setAllowedOriginPatterns(List.of("http://localhost:*", "http://127.0.0.1:*"));
configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
configuration.setAllowedHeaders(List.of("*"));
configuration.setAllowCredentials(true);
```

### API Response Security & Password Exposure Protection
* All `@ManyToOne private User user` relationships in `Transaction.java`, `Budget.java`, and `Goal.java` are annotated with `@JsonIgnore` from `com.fasterxml.jackson.annotation.JsonIgnore`.
* Sensitive credentials (passwords/hashes) are excluded from all JSON serializations.
* Data transfer objects (`TransactionResponse`, `BudgetResponse`, `GoalResponse`, `UserProfileResponse`) sanitize response structures.

---

## 🏛️ 9. Backend Architecture

The backend follows the standard Spring Boot layered design pattern:

```mermaid
flowchart LR
    Controller["Controller Layer\n(Handles HTTP & Mapping)"] --> Service["Service Layer\n(Business Logic & Ownership)"]
    Service --> Repository["Repository Layer\n(Spring Data JPA / SQL)"]
    Repository --> DB[("MySQL DB")]
```

* **Controller Layer:** Receives HTTP payloads, delegates execution to services, and returns `ResponseEntity<T>`.
* **Service Layer:** Manages security context lookups, ownership validations, transaction filtering, mathematical calculations, and entity persistence.
* **Repository Layer:** Extends `JpaRepository<T, Long>` to execute type-safe SQL queries (e.g., `findByUser`, `findByUserAndCategoryAndPeriod`).

---

## 💡 10. Important Backend Design Decisions

1. **Security Context as Single Source of Truth:** `userId` is never accepted from client inputs. The active user is always extracted from the validated JWT token.
2. **DTO Scoping:** Controller endpoints return custom DTOs (`GoalResponse`, `BudgetResponse`, `TransactionResponse`) to decouple internal database schemas from external presentation models.
3. **Backend Calculation Engine:** `totalBalance`, monthly area chart arrays, budget `spent`/`remaining`/`percentageUsed`, and analytics aggregations are computed dynamically from transaction records to guarantee mathematical consistency across all devices.

---

## 📐 11. Dashboard Calculations

* **`totalIncome`**: Sum of all `Transaction` amounts owned by the user where `type == "income"`.
* **`totalExpenses`**: Sum of all `Transaction` amounts owned by the user where `type == "expense"`.
* **`totalBalance`**:
  $$\text{totalBalance} = \text{totalIncome} - \text{totalExpenses}$$

---

## 📐 12. Budget Calculations

Computed inside `BudgetService.getMyBudgets()`:
* **`spent`**:
  $$\text{spent} = \sum_{\substack{t \in \text{Transactions} \\ t.\text{type} = \text{"expense"} \\ t.\text{category} = B.\text{category} \\ \text{YearMonth}(t.\text{date}) = B.\text{period}}} t.\text{amount}$$
* **`remaining`**: $\text{limit} - \text{spent}$
* **`percentageUsed`**:
  $$\text{percentageUsed} = \begin{cases} 0 & \text{if limit} = 0 \\ \frac{\text{spent}}{\text{limit}} \times 100 & \text{otherwise} \end{cases}$$

---

## 📐 13. Goal Calculations

Calculated client-side inside `Goals.jsx` for rendering ring progress charts:
* **`pct`**: $\min\left(100, \frac{\text{current}}{\text{target}} \times 100\right)$
* **`remaining`**: $\text{target} - \text{current}$
* **`daysLeft`**: Days remaining between current date and `deadline`.

---

## 📐 14. Analytics Calculations

Computed inside `AnalyticsService.getAnalytics(range)`:
* **`monthlyData`**: Historical monthly breakdown of total income vs expenses for the requested range.
* **`categorySpending`**: Expense amounts grouped by category ID.
* **`weeklyData`**: Expense amounts grouped by week index for the current month.
* **`savingsRate`**: Computed safely on frontend with zero-income guardrails:
  $$\text{savingsRate} = \begin{cases} 0 & \text{if income} \le 0 \\ \max\left(0, \text{round}\left(\frac{\text{income} - \text{expenses}}{\text{income}} \times 100\right)\right) & \text{otherwise} \end{cases}$$

---

## 📑 15. API Documentation

| Endpoint | Method | Auth Required | Request Body | Response Body / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | ❌ No | `{fullName, email, password}` | Registers user (`200 OK`) |
| `/api/auth/login` | `POST` | ❌ No | `{email, password}` | Returns `{ "token": "..." }` |
| `/api/users/me` | `GET` | ✅ Yes | None | Returns `{ id, fullName, email }` |
| `/api/users/me` | `PUT` | ✅ Yes | `{name, email}` | Updates profile info |
| `/api/transactions` | `GET` | ✅ Yes | None | Returns `List<TransactionResponse>` |
| `/api/transactions` | `POST` | ✅ Yes | `{type, title, amount, category, method, date, notes}` | Creates transaction entity |
| `/api/transactions/{id}`| `PUT` | ✅ Yes | `{type, title, amount, category, method, date, notes}` | Updates transaction entity |
| `/api/transactions/{id}`| `DELETE`| ✅ Yes | None | Deletes transaction (`204 No Content`) |
| `/api/dashboard` | `GET` | ✅ Yes | None | Returns `DashboardResponse` |
| `/api/dashboard/monthly`| `GET`| ✅ Yes | None | Returns `List<MonthlyOverviewResponse>` |
| `/api/dashboard/categories`| `GET`| ✅ Yes | None | Returns `List<CategorySpendingResponse>` |
| `/api/budgets` | `GET` | ✅ Yes | None | Returns `List<BudgetResponse>` |
| `/api/budgets` | `POST` | ✅ Yes | `{category, limit, period}` | Creates category budget |
| `/api/budgets/{id}` | `PUT` | ✅ Yes | `{category, limit, period}` | Updates budget entity |
| `/api/budgets/{id}` | `DELETE`| ✅ Yes | None | Deletes budget (`204 No Content`) |
| `/api/goals` | `GET` | ✅ Yes | None | Returns `List<GoalResponse>` |
| `/api/goals` | `POST` | ✅ Yes | `{title, target, current, deadline, icon, color}` | Creates savings goal |
| `/api/goals/{id}` | `PUT` | ✅ Yes | `{title, target, current, deadline, icon, color}` | Updates goal entity |
| `/api/goals/{id}` | `DELETE`| ✅ Yes | None | Deletes goal (`204 No Content`) |
| `/api/analytics` | `GET` | ✅ Yes | Query Param `?range=week|month|3months|year` | Returns `AnalyticsResponse` |

---

## 🔄 16. Example API Flow

```http
POST /api/auth/login HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "email": "yehara@example.com",
  "password": "mySecretPassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZWhhcmFAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTQ5..."
}
```

**Subsequent Request:**
```http
GET /api/dashboard HTTP/1.1
Host: localhost:8080
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5ZWhhcmFAZXhhbXBsZS5jb20iLCJpYXQiOjE3NTQ5...
```

**Response:**
```json
{
  "totalBalance": 35000.0,
  "totalIncome": 40000.0,
  "totalExpenses": 5000.0
}
```

---

## 🗄️ 17. Database Schema

### Table Definitions

#### `users`
* `id` (`BIGINT`, PK, Auto-Increment)
* `full_name` (`VARCHAR(255)`, Not Null)
* `email` (`VARCHAR(255)`, Not Null, Unique)
* `password` (`VARCHAR(255)`, Not Null)

#### `transactions`
* `id` (`BIGINT`, PK, Auto-Increment)
* `user_id` (`BIGINT`, FK $\rightarrow$ `users.id`, Not Null)
* `type` (`VARCHAR(255)`, Not Null)
* `title` (`VARCHAR(255)`, Not Null)
* `amount` (`DOUBLE`, Not Null)
* `category` (`VARCHAR(255)`, Not Null)
* `method` (`VARCHAR(255)`, Not Null)
* `date` (`DATE`, Not Null)
* `notes` (`VARCHAR(255)`)

#### `budgets`
* `id` (`BIGINT`, PK, Auto-Increment)
* `user_id` (`BIGINT`, FK $\rightarrow$ `users.id`, Not Null)
* `category` (`VARCHAR(255)`, Not Null)
* `budget_limit` (`DOUBLE`, Not Null)
* `period` (`VARCHAR(255)`, Not Null)

#### `goals`
* `id` (`BIGINT`, PK, Auto-Increment)
* `user_id` (`BIGINT`, FK $\rightarrow$ `users.id`, Not Null)
* `title` (`VARCHAR(255)`, Not Null)
* `target` (`DOUBLE`, Not Null)
* `current` (`DOUBLE`, Not Null)
* `deadline` (`DATE`, Not Null)
* `icon` (`VARCHAR(255)`, Not Null)
* `color` (`VARCHAR(255)`, Not Null)

---

## 📁 18. Project Structure

```
d:/projects/expensess tracker/
├── expensess tracker/                 # Spring Boot Backend Project Root
│   ├── mvnw / mvnw.cmd               # Maven Wrapper Scripts
│   ├── pom.xml                        # Maven Build & Dependency Configuration
│   └── src/
│       └── main/
│           ├── java/com/example/expensessTracker/
│           │   ├── ExpensessTrackerApplication.java
│           │   ├── config/
│           │   │   ├── JwtAuthenticationFilter.java
│           │   │   └── SecurityConfig.java
│           │   ├── controller/
│           │   │   ├── AnalyticsController.java
│           │   │   ├── AuthController.java
│           │   │   ├── BudgetController.java
│           │   │   ├── DashboardController.java
│           │   │   ├── GoalController.java
│           │   │   ├── TransactionController.java
│           │   │   └── UserController.java
│           │   ├── dto/
│           │   │   ├── AnalyticsResponse.java
│           │   │   ├── BudgetResponse.java
│           │   │   ├── CategorySpendingResponse.java
│           │   │   ├── DashboardResponse.java
│           │   │   ├── GoalResponse.java
│           │   │   ├── LoginRequest.java
│           │   │   ├── LoginResponse.java
│           │   │   ├── MonthlyOverviewResponse.java
│           │   │   ├── TransactionResponse.java
│           │   │   └── UserProfileResponse.java
│           │   ├── entity/
│           │   │   ├── Budget.java
│           │   │   ├── Goal.java
│           │   │   ├── Transaction.java
│           │   │   └── User.java
│           │   ├── repository/
│           │   │   ├── BudgetRepository.java
│           │   │   ├── GoalRepository.java
│           │   │   ├── TransactionRepository.java
│           │   │   └── UserRepository.java
│           │   └── service/
│           │       ├── AnalyticsService.java
│           │       ├── AuthService.java
│           │       ├── BudgetService.java
│           │       ├── DashboardService.java
│           │       ├── GoalService.java
│           │       ├── JwtService.java
│           │       ├── TransactionService.java
│           │       └── UserService.java
│           └── resources/
│               └── application.properties
│
└── frontend/                          # React Frontend Project Root
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── components/
        │   ├── layout/
        │   │   ├── AppLayout.jsx
        │   │   ├── Navbar.jsx
        │   │   └── Sidebar.jsx
        │   ├── transactions/
        │   │   └── TransactionForm.jsx
        │   └── ui/
        │       ├── Badge.jsx
        │       ├── Button.jsx
        │       ├── ConfirmDialog.jsx
        │       ├── EmptyState.jsx
        │       ├── Input.jsx
        │       ├── Modal.jsx
        │       ├── Select.jsx
        │       └── SummaryCard.jsx
        ├── context/
        │   └── AppContext.jsx
        ├── data/
        │   └── mockData.js
        ├── pages/
        │   ├── AddTransaction.jsx
        │   ├── Analytics.jsx
        │   ├── Budgets.jsx
        │   ├── Dashboard.jsx
        │   ├── Goals.jsx
        │   ├── Login.jsx
        │   ├── Profile.jsx
        │   ├── Register.jsx
        │   ├── Settings.jsx
        │   └── Transactions.jsx
        └── services/
            └── api.js
```

---

## ⚡ 19. Setup & Installation

### Prerequisites
* **Java Development Kit (JDK):** Version 17 or 21
* **Node.js:** Version 18.x or 20.x
* **MySQL Server:** Version 8.0 or higher

### 1. Database Setup
Launch MySQL terminal or Workbench and create the database schema:
```sql
CREATE DATABASE expense_tracker;
```

### 2. Backend Configuration & Launch
Navigate to `expensess tracker/src/main/resources/application.properties` and update your local database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/expense_tracker?useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Compile and run the Spring Boot application using Maven:
```powershell
# Windows PowerShell
cd "d:\projects\expensess tracker\expensess tracker"
$env:JAVA_HOME="C:\Program Files\Java\jdk-21.0.11"
.\mvnw clean compile
.\mvnw spring-boot:run
```
The backend server will start on **`http://localhost:8080`**.

### 3. Frontend Installation & Launch
Navigate to the frontend directory, install dependencies, and run the Vite development server:
```powershell
# Windows PowerShell
cd "d:\projects\expensess tracker\frontend"
npm install
npm run dev
```
The application interface will open at **`http://localhost:5173`** (or `http://localhost:8443`).

---

## 🔐 20. Environment Variables & Secrets

Do NOT commit real database passwords or JWT secret keys to version control repositories. Recommended environment variables for production environments:

```env
# Database Credentials
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/expense_tracker
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password

# Security Secrets
JWT_SECRET_KEY=your_base64_encoded_256bit_secret_key_here

# Frontend API Endpoint
VITE_API_URL=http://localhost:8080/api
```

---

## 🧪 21. API Testing via Postman

1. **Register a User:**  
   `POST http://localhost:8080/api/auth/register` with `{ "fullName": "Test User", "email": "test@example.com", "password": "password123" }`.
2. **Login & Extract JWT:**  
   `POST http://localhost:8080/api/auth/login` with `{ "email": "test@example.com", "password": "password123" }`. Copy the returned `token`.
3. **Authenticated Endpoint Request:**  
   `GET http://localhost:8080/api/dashboard`  
   Header: `Authorization: Bearer <token>`. Verify `200 OK` JSON response.

---

## 🛡️ 22. Security Testing Scenarios

```powershell
# 1. Test Missing Token (Should return 401 Unauthorized)
curl -i http://localhost:8080/api/transactions

# 2. Test Invalid Token (Should return 401 Unauthorized)
curl -i -H "Authorization: Bearer invalid_token_str" http://localhost:8080/api/dashboard

# 3. Test Cross-Tenant Resource Access (User A attempting to access User B ID)
curl -i -H "Authorization: Bearer USER_A_TOKEN" -X DELETE http://localhost:8080/api/transactions/USER_B_TRANSACTION_ID
# Result: 401/403 Error - "Unauthorized transaction access"
```

---

## 💻 23. Frontend Architecture

The frontend follows a decoupled data service flow:

```mermaid
flowchart LR
    Views["React Pages & Modals"] --> Context["AppContext\n(Global State & Selectors)"]
    Context --> API["services/api.js\n(Centralized Fetch Layer)"]
    API --> Server["Spring Boot REST API"]
```

### Centralized `request()` Function in `src/services/api.js`:
* Automatically retrieves `token` from `localStorage`.
* Adds `Authorization: Bearer <token>` header to all requests.
* Intercepts `401`/`403` HTTP responses and raises user-friendly UI alerts.

---

## 🎨 24. UI Features & Design System

* **Dashboard Page:** Financial health cards, interactive Recharts charts, and recent transaction audit table.
* **Transactions Page:** Real-time search, category/type filtering, date/amount sorting, and pagination.
* **Budgets Page:** Spending limit progress bars with warning states and budget creation/editing modals.
* **Savings Goals Page:** Ring progress charts, milestone percentage indicators, target date countdowns, and creation modals.
* **Analytics Page:** Range filter toggles (`This Week`, `This Month`, `Last 3 Months`, `This Year`) driving area, bar, line, and pie charts.
* **Profile Page:** Editable user details with dynamic initial badge icons.
* **Settings Page:** Currency switcher (`Rs.`, `$`, `€`, `£`), notification preference toggles, and sign-out controls.

---

## 🔮 25. Future Improvements (Planned)

* **Refresh Tokens:** Implement sliding refresh token expiration strategy.
* **Password Reset & Email Verification:** Add SMTP integration for password recovery.
* **CSV Export Execution:** Enable client-side CSV download from `Transactions` table.
* **Containerization:** Add `docker-compose.yml` for single-command MySQL & Spring Boot deployments.

---

## ⭐ 26. Engineering Highlights

1. **Stateless JWT Security Architecture:** Decouples session management completely from backend memory using standard Bearer token validation.
2. **Strict Multi-Tenant Scoping:** Guarantees database-level tenant isolation by enforcing security context ownership checks across all database mutations.
3. **Transaction-Driven Financial Engine:** Computes balance, income, expenses, category spending, and monthly/weekly trends dynamically from historical transaction records.
4. **Clean DTO Layer Boundaries:** Utilizes DTOs (`GoalResponse`, `BudgetResponse`, `TransactionResponse`, `UserProfileResponse`) to prevent sensitive fields or JPA proxies from exposing internal structure.

---

## 🎓 27. Learning & Demonstration Highlights

* **Full-Stack REST Architecture:** End-to-end integration between React and Spring Boot.
* **Spring Security Authorization:** Custom `OncePerRequestFilter` integration and stateless session policies.
* **Database Modeling & JPA:** Foreign key relationships, entity lifecycle management, and custom repository queries.
* **Data Visualization:** Interactive chart rendering with Recharts and Tailwind CSS styling.

---

## 📜 28. License

Licensing has not yet been specified for this repository.
