# [Cluster Name] - Architecture Specification

**Cluster ID:** [e.g., Cluster 5]
**Domain:** [e.g., Order Management, Product Catalog]
**Status:** Draft | In Review | Approved
**Last Updated:** [Date]

---

## 1. Overview

### Purpose

[Describe what this microservice/component does in 2-3 sentences]

### Scope

**In Scope:**
- [Functionality that belongs here]
- [Domain concepts managed by this service]

**Out of Scope:**
- [What this service explicitly does NOT handle]
- [Responsibilities of other services]

---

## 2. Requirements Covered

[List all requirements from the cluster this component implements]

1. Req-001: The system must...
2. Req-002: Users must be able to...
3. Req-003: ...

**Total:** [X] requirements

---

## 3. Domain Model

### Aggregates

**[AggregateName]** (Aggregate Root)
- **Properties:**
  - `Id: [Type]Id` (e.g., `OrderId`)
  - `Field1: string`
  - `Field2: decimal`
- **Invariants:**
  - [Business rule that must always be true]
  - [Another invariant]
- **Operations:**
  - `Create(...): Result<Order>`
  - `Update(...): Result<Unit>`

### Entities

**[EntityName]**
- **Properties:** ...
- **Belongs to:** [Aggregate]

### Value Objects

**[ValueObjectName]**
- **Properties:** ...
- **Validation:** ...

---

## 4. Component Structure (Hexagonal Architecture)

```
┌─────────────────────────────────────┐
│   Adapters (Infrastructure - T)     │
│  HTTP Controllers │ Message Handlers │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Application Layer (Use Cases)     │
│  CreateOrder │ CancelOrder │ ...    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Domain Layer (Business Logic - A) │
│  Order │ Customer │ ValidationRules │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Ports (Interfaces - A/O)          │
│  IOrderRepository │ IEventPublisher │
└─────────────────────────────────────┘
```

### Layers

**1. Domain (Core - A-Type)**
- Pure business logic
- No dependencies on infrastructure
- Aggregates, Entities, Value Objects, Domain Services

**2. Application (Use Cases - A-Type)**
- Orchestrates domain operations
- Transaction boundaries
- Maps domain to DTOs

**3. Infrastructure (Adapters - T-Type)**
- HTTP/gRPC endpoints
- Database (SQL/NoSQL)
- Message queues
- External APIs

---

## 5. Public Interfaces (Ports)

### Inbound (What This Service Provides)

**IOrderService** (A-Type Interface)

```csharp
public interface IOrderService
{
    Task<Result<OrderId>> CreateOrder(CreateOrderCommand command);
    Task<Result<Unit>> CancelOrder(OrderId orderId);
    Task<Result<OrderDto>> GetOrder(OrderId orderId);
}
```

**HTTP API** (T-Type Adapter)

```
POST   /api/orders
DELETE /api/orders/{id}
GET    /api/orders/{id}
```

### Outbound (What This Service Needs)

**Dependencies:**

- `ICustomerRepository` (from Customer Management service)
- `IProductCatalog` (from Product Catalog service)
- `IEventPublisher` (messaging infrastructure)

---

## 6. Cross-Cluster Dependencies

| This Service Calls | Interface | Purpose | Type |
|--------------------|-----------|---------|------|
| Customer Management | `ICustomerValidator` | Validate customer | A |
| Product Catalog | `IProductCatalog` | Get product details | A |
| Payment Integration | `IPaymentService` | Process payments | A |

| This Service Provides To | Interface | Purpose | Type |
|---------------------------|-----------|---------|------|
| Delivery Management | `IOrderService` | Get order details | A |
| Reporting | `IOrderQuery` | Query orders | A |

---

## 7. Data Ownership

### Database Schema

**Tables Owned by This Service:**

**orders**
- `id: UUID PRIMARY KEY`
- `customer_id: UUID NOT NULL`
- `created_at: TIMESTAMP`
- `status: VARCHAR(20)`
- `total_amount: DECIMAL(10,2)`

**order_items**
- `id: UUID PRIMARY KEY`
- `order_id: UUID FOREIGN KEY`
- `product_id: UUID`
- `quantity: INT`
- `unit_price: DECIMAL(10,2)`

### Persistence Strategy

- **Database:** PostgreSQL (primary), Redis (caching)
- **ORM:** Entity Framework Core
- **Migrations:** EF Core Migrations
- **Backup:** Daily snapshots

---

## 8. Events Published

**OrderCreated**
```json
{
  "eventType": "OrderCreated",
  "orderId": "uuid",
  "customerId": "uuid",
  "totalAmount": 123.45,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

**OrderCancelled**
```json
{
  "eventType": "OrderCancelled",
  "orderId": "uuid",
  "reason": "Customer request",
  "timestamp": "2025-01-15T11:00:00Z"
}
```

---

## 9. Quality Attributes

### Performance

- **Target:** 95th percentile < 200ms for order creation
- **Throughput:** 1000 orders/minute

### Scalability

- **Horizontal:** Stateless services, scale to 10+ instances
- **Database:** Read replicas for queries

### Availability

- **Target:** 99.9% uptime
- **Strategy:** Circuit breakers, retry policies, fallbacks

### Security

- **Authentication:** JWT tokens from Auth service
- **Authorization:** Role-based (Customer, Admin, etc.)
- **Data Protection:** Encryption at rest & in transit

---

## 10. Testing Strategy

### Unit Tests

- All domain logic covered (>90% coverage)
- Value object validation
- Aggregate invariants

### Integration Tests

- Database interactions (Testcontainers)
- Message publishing/consuming
- External API calls (mocked)

### Contract Tests

- Pact for consumer-driven contracts
- Ensure backwards compatibility

### Mutation Tests

- Stryker.NET with >75% mutation score
- Validates test quality

---

## 11. Build & Deployment

### Source Generators

- **Typed IDs:** `OrderId`, `CustomerId` (strong typing)
- **Mapster Mappings:** Auto-generate DTO mappings
- **Analyzers:** Custom Roslyn rules

### NUKE Build Pipeline

```csharp
Target Compile => _ => _
    .Executes(() => DotNetBuild(s => s.SetProjectFile(Solution)));

Target Test => _ => _
    .DependsOn(Compile)
    .Executes(() => DotNetTest(s => s.SetProjectFile(Solution)));

Target Publish => _ => _
    .DependsOn(Test)
    .Executes(() => DotNetPublish(s => s
        .SetProject(Solution)
        .SetOutput(OutputDirectory)));
```

### Deployment

- **Container:** Docker
- **Orchestration:** Kubernetes
- **CI/CD:** GitHub Actions + ArgoCD

---

## 12. Monitoring & Observability

### Metrics

- Request rate, latency, error rate (RED metrics)
- Database connection pool usage
- Queue depth

### Logging

- Structured logging (Serilog)
- Correlation IDs across services
- Log levels: Debug, Info, Warning, Error

### Tracing

- OpenTelemetry
- Distributed tracing across service calls

### Alerts

- P1: Service down (page on-call)
- P2: Error rate > 5% (notify team)
- P3: Slow responses > 500ms (ticket)

---

## 13. Migration & Rollback

### Database Migrations

- Forward-only migrations
- Backward-compatible schema changes
- Dual-write during transitions

### Rollback Strategy

- Blue-green deployments
- Feature flags for new functionality
- Database rollback scripts (if needed)

---

## 14. Open Questions & Decisions

| Question | Status | Decision | Date |
|----------|--------|----------|------|
| Should we use event sourcing? | 🟡 Pending | TBD | - |
| NoSQL vs SQL for order items? | ✅ Decided | SQL (PostgreSQL) | 2025-01-10 |
| Sync vs async order creation? | 🟡 Pending | TBD | - |

---

## 15. References

- [Domain-Driven Design (Eric Evans)](https://www.domainlanguage.com/ddd/)
- [Clean Architecture (Robert C. Martin)](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Microservices Patterns (Chris Richardson)](https://microservices.io/patterns/)
- [Original Requirements Cluster](../examples/clusters.json)

---

**Sign-off:**
- [ ] Domain Expert Reviewed
- [ ] Security Reviewed
- [ ] Performance Reviewed
- [ ] Approved for Implementation
