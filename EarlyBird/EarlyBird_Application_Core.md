# EarlyBird Application Core Architecture

**Version:** 2.0 (Migrated to JavaScript/React Environment)
**Date:** 2025-11-19
**Author:** Senior Software Architect (AI Agent)
**Based on:** THE SOFTWARE ENGINEERING BIBLE.md principles

---

## Table of Contents

1. [Requirements Classification](#1-requirements-classification)
2. [Architectural Principles Applied](#2-architectural-principles-applied)
3. [Application Core Design](#3-application-core-design)
4. [Component Catalog](#4-component-catalog)
5. [Order Submission Workflow](#5-order-submission-workflow)
6. [Change Impact Analysis](#6-change-impact-analysis)
7. [Architecture Diagrams](#7-architecture-diagrams)
8. [Design Rationale](#8-design-rationale)

---

## 1. Requirements Classification

### 1.1 Blood Type Classification (A vs T vs O)

According to **Software Blood Types Principle** (Bible Section: Architecture Blood Types), we separate:

#### TYPE A (Application/Business Logic) - **STABLE**

These requirements represent core business domain knowledge that rarely changes:

| Req # | Requirement                                                     | Rationale                                                 |
|-------|-----------------------------------------------------------------|-----------------------------------------------------------|
| 1-6   | Product concept (simple, prepackaged, composite, pricing)       | Core domain: What is a product? Fundamental business rule |
| 8-10  | Customer concept (customer number format, no collective orders) | Core domain: Who is a customer?                           |
| 11    | Authentication + blacklist check                                | Core business rule: Access control                        |
| 13-16 | Follow-up orders (blueprint pattern)                            | Core domain: Order reuse logic                            |
| 17    | One address per customer                                        | Core business constraint                                  |
| 22    | Invoice calculation (products, amounts, prices, sum)            | Core domain: How to calculate invoice                     |
| 28-31 | Order cancellation rules (only before packing, not undoable)    | Core business process rules                               |
| 5     | Order composition (various products, various amounts)           | Core domain: What is an order?                            |
| 12    | Product search by characteristics                               | Core domain: How to find products                         |

**Key Insight:** These requirements define **WHAT the business does**. They are implemented in pure JavaScript (ES Modules) within `src/services/` and `src/data/`, free from React or browser dependencies.

#### TYPE T (Technology/Infrastructure) - **UNSTABLE**

These requirements are implementation details that change frequently:

| Req # | Requirement                | Technology       | Volatility                       |
|-------|----------------------------|------------------|----------------------------------|
| 7     | Phone ordering             | Phone system     | **CHANGED**: Web + SMS in future |
| 32-36 | Web-based application      | HTML/Browser     | Current technology choice (React)|
| -     | State Management           | React State      | Implementation detail            |
| -     | Persistence                | LocalStorage     | Current storage choice           |
| -     | Bundling/Build             | Vite             | Build tool                       |
| -     | Styling                    | CSS/Components   | Visual presentation              |

**Key Insight:** These requirements define **HOW the system is accessed**. They are implemented in `src/components/` (React), `src/main.js`, and `index.html`.

#### TYPE O (Universal/Eternal)

Universal algorithmic requirements:

| Requirement | Implementation | Rationale |
|-------------|----------------|-----------|
| Luhn Algorithm | `src/utils/luhn.js` | Universal checksum algorithm (Math) |

---

### 1.2 Stability Classification (Kano Model)

#### STABLE (Core Business Rules)

- Product composition (simple + prepackaged)
- Order = Shopping cart with products
- Pricing logic (unit, price per unit)
- Invoice calculation (sum of line items)
- Cancellation constraints (only before packing)

#### UNSTABLE (Technology Channels)

- UI Framework (React)
- State Management Library
- CSS Framework
- Browser APIs (Fetch, LocalStorage)

**Architectural Implication:** We isolate the **Domain Logic** (Type A) from the **UI Components** (Type T).

---

## 2. Architectural Principles Applied

### 2.1 Primary Principle: **Blood Types Separation (A ≠ T)**

**Principle:** Application logic (TYPE A) MUST NOT depend on technology details (TYPE T).

**Application to EarlyBird (JS/React):**

- **Application Core** (`src/services/*.js`, `src/data/*.js`): Contains ONLY domain logic. No `import React`, no `document.getElementById`, no `window`.
- **Technology Ring** (`src/components/*.js`): Surrounds core with Adapters (React Components).
- **Utils** (`src/utils/*.js`): Pure Type O functions.

### 2.2 Secondary Principles

#### 2.2.1 Single Responsibility Principle (SRP)

- **CustomerLogin.js**: Responsible for UI interaction (Type T).
- **customer.js**: Responsible for validation and data retrieval logic (Type A).

#### 2.2.2 Acyclic Dependencies Principle (ADP)

- Dependencies flow **INWARD**: Components (T) → Services (A) → Utils (O).
- Services NEVER import from Components.

#### 2.2.3 Dependency Inversion Principle (DIP)

- React components depend on *exported functions* (abstractions of capability), not on internal data structures.

---

## 3. Application Core Design

### 3.1 Hexagonal Architecture (Ports & Adapters) - Frontend Edition

```
┌─────────────────────────────────────────────────────────┐
│                   TECHNOLOGY RING (TYPE T)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │ React Comp   │  │ Browser API  │  │ Vite Build   │   │
│  │ (UI Adapter) │  │ (Storage)    │  │ (Infra)      │   │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘   │
│         │                 │                 │           │
│   ┌─────▼─────────────────▼─────────────────▼───────┐   │
│   │         PORTS (Exported API)                    │   │
│   │  loginCustomer()  getProducts()  placeOrder()   │   │
│   └─────────────────┬───────────────────────────────┘   │
│                     │                                   │
│   ┌─────────────────▼───────────────────────┐           │
│   │      APPLICATION CORE (TYPE A)          │           │
│   │  ┌───────────┐  ┌───────────┐           │           │
│   │  │ customer  │  │ products  │           │           │
│   │  │ service   │  │ data      │           │           │
│   │  └───────────┘  └───────────┘           │           │
│   │  ┌───────────┐                          │           │
│   │  │ luhn algo │ (Type O)                 │           │
│   │  └───────────┘                          │           │
│   └─────────────────────────────────────────┘           │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Core Components (TYPE A - Application Logic)

#### 3.2.1 Services (Use Cases)

**`src/services/customer.js`**
- **Role:** Customer Registry & Authentication.
- **Responsibilities:** Validate customer numbers, check credentials (mock), enforce blacklists.
- **Exports:** `loginCustomer(number)`

**`src/data/products.js`** (Acting as Product Catalog)
- **Role:** Product Repository.
- **Responsibilities:** Define available products, prices, calories.
- **Exports:** `products` array (acting as readonly data source).

#### 3.2.2 Utils (Type O)

**`src/utils/luhn.js`**
- **Role:** Mathematical validation.
- **Responsibilities:** Calculate/Validate Luhn checksums.
- **Exports:** `validateCustomerNumber(number)`

---

## 4. Component Catalog

### 4.1 Application Core Components (TYPE A)

| Component | File Path | Responsibility | Depends On | Used By |
|-----------|-----------|----------------|------------|---------|
| **CustomerService** | `src/services/customer.js` | Auth logic, customer validation | `luhn.js` | `CustomerLogin.js`, `Checkout.js` |
| **ProductData** | `src/data/products.js` | Product definitions, pricing | - | `ProductCatalog.js` |
| **LuhnUtil** | `src/utils/luhn.js` | Checksum validation (Math) | - | `customer.js` |

### 4.2 Technology Adapter Components (TYPE T)

| Component | File Path | Responsibility | Technologies | Depends On (Core) |
|-----------|-----------|----------------|--------------|-------------------|
| **CustomerLogin** | `src/components/CustomerLogin.js` | Login UI, Form handling | React, JSX | `CustomerService` |
| **ProductCatalog** | `src/components/ProductCatalog.js` | Product Grid UI | React, JSX | `ProductData` |
| **OrderBuilder** | `src/components/OrderBuilder.js` | Shopping Cart UI | React, State | - |
| **Checkout** | `src/components/Checkout.js` | Finalize Order UI | React | `CustomerService` |
| **Main Entry** | `src/main.js` | App Bootstrap | Vite, DOM | All Components |

---

## 5. Order Submission Workflow

### 5.1 Sequence: Customer Login

1. **User** enters ID in `CustomerLogin` component.
2. **`CustomerLogin`** calls `CustomerService.loginCustomer(id)`.
3. **`CustomerService`** calls `LuhnUtil.validateCustomerNumber(id)`.
   - If invalid: returns error.
4. **`CustomerService`** checks mock database.
   - If found: returns customer object.
   - If not found: returns error.
5. **`CustomerLogin`** updates React State (`onLogin` callback).
6. **UI** updates to show "Welcome, [Name]".

---

## 6. Change Impact Analysis

### Scenario: Switching from React to Vue
- **Impact:** High on `src/components/` (rewrite required).
- **Impact:** ZERO on `src/services/` or `src/utils/` or `src/data/`.
- **Conclusion:** Architecture successfully isolates business logic from UI framework.

### Scenario: Changing Customer Number Format
- **Impact:** High on `src/utils/luhn.js` and `src/services/customer.js`.
- **Impact:** Low on UI (just validation message changes).
- **Conclusion:** Business rule changes are localized to Type A components.

---

## 7. Architecture Diagrams

- [Hexagonal Map](#31-hexagonal-architecture-ports--adapters---frontend-edition)
- [Order Workflow (Sequence)](EarlyBird_Order_Workflow.md)
- [Domain Model (Mermaid)](EarlyBird_Domain_Model.md)

---

## 8. Design Rationale