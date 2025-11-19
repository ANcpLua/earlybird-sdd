# EarlyBird Order Workflow

**Version:** 2.0
**Date:** 2025-11-19

## 1. Order Lifecycle State Machine

The order process follows a strict state machine to ensure data integrity.

```mermaid
stateDiagram-v2
    [*] --> Browsing
    Browsing --> BuildingOrder: Add Product
    BuildingOrder --> CheckOut: Proceed to Pay
    CheckOut --> Placed: Confirm & Valid
    CheckOut --> BuildingOrder: Cancel/Back
    Placed --> [*]
```

---

## 2. Sequence Diagrams

### 2.1 Customer Login & Product Search

```mermaid
sequenceDiagram
    actor User
    participant UI as React Component
    participant Auth as CustomerService
    participant Data as ProductData

    User->>UI: Enters Customer Number
    UI->>Auth: loginCustomer(number)
    Auth->>Auth: Validate Luhn Checksum
    
    alt Invalid Checksum
        Auth-->>UI: Error("Invalid Format")
        UI-->>User: Show Red Error
    else Valid Format
        Auth->>Auth: Lookup in Mock DB
        alt Found
            Auth-->>UI: { name: "Anna", ... }
            UI-->>User: "Welcome Anna!"
            UI->>Data: Import products
            Data-->>UI: [List of Products]
            UI-->>User: Display Product Grid
        else Not Found
            Auth-->>UI: Error("User Unknown")
            UI-->>User: Show Not Found Message
        end
    end
```

### 2.2 Order Placement

```mermaid
sequenceDiagram
    actor User
    participant OrderBuilder as OrderBuilder.js
    participant AppState as React State
    
    User->>OrderBuilder: Click "Add to Order" (Croissant)
    OrderBuilder->>AppState: updateOrder(product, quantity=1)
    AppState->>AppState: Recalculate Total
    AppState-->>OrderBuilder: New Cart State
    OrderBuilder-->>User: Show Updated Cart (Total €2.20)
    
    User->>OrderBuilder: Click "Checkout"
    OrderBuilder->>User: Show Summary Screen
```

---

## 3. Workflow Rules

1.  **Authentication First:** A user *can* browse products without login (depending on requirements), but in the current "Elite" implementation, the flow suggests `CustomerLogin` is the entry gate or a prerequisite for `Checkout`.
2.  **Inventory Check:** (Future) Before confirming `Placed`, the system should check stock. currently assumed infinite.
3.  **Immutability:** Once an order transitions to `Placed`, it cannot be modified by the user.