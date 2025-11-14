# Kiro Integration: From Raw Requirements to Type-Safe Architecture

**Purpose:** How Kiro enables semantic requirement normalization, domain modeling, and architecture scaffolding before code generation

---

## 🎯 Kiro's Role in the SDD Flow

Kiro sits **before** the actual SDD implementation flow as the **semantic requirements processor** and **architecture scaffolder**:

```
Raw Requirements (messy, informal, duplicate)
    ↓
🤖 KIRO: Normalize & Structure
    ↓
requirements.normalized.json (clean, semantic, deduplicated)
    ↓
🤖 KIRO: Build Domain Model
    ↓
domain_model.json (Glossary + Aggregates + Bounded Contexts)
    ↓
🔧 YOUR SCRIPT: Cluster Requirements
    ↓
clusters.json (Semantic groups → Microservice candidates)
    ↓
🤖 KIRO: Interpret Clusters + Domain Model
    ↓
architecture.yaml + ARCHITECTURE.md per Cluster
    ↓
🔧 YOUR TOOLS: Generate Guardrails
    ↓
Source Generators + Roslyn Analyzers + NUKE Pipelines + MCP Server
    ↓
🤖 CLAUDE/CURSOR: Implement within Guardrails
    ↓
Production Code (Type-Safe, Architecturally Compliant)
```

**Key Insight:** Kiro handles the **semantic understanding** and **structural scaffolding** without making implementation decisions or writing business logic.

---

## 📋 Phase 0: Kiro Normalizes Requirements

### Input (What Kiro Receives)

```markdown
# EarlyBird Requirements (Raw - from stakeholder interviews)

- Users should be able to order breakfast
- We need delivery in under 30 minutes (or was it 25?)
- Phone ordering is required
- Actually, we also want web-based ordering
- Customers need authentication (not sure how yet)
- Products can be simple or complex (prepackaged)
- Orders should be tracked somehow
- Delivery guy needs routes
- [DUPLICATE] Users should be able to order breakfast online
```

**Problems:**
- Duplicates
- Vague wording ("somehow", "not sure")
- Conflicting info (30 vs 25 minutes)
- Missing semantic structure
- No glossary

### Kiro Process

```bash
> kiro normalize requirements.md --output requirements.normalized.json --checks
```

**What Kiro Does:**

1. **Deduplication**
   - Identifies semantic duplicates (not just text matching)
   - Merges "order breakfast" and "order breakfast online" → one requirement

2. **Semantic Checks**
   - Flags vague terms: "somehow" → needs clarification
   - Highlights conflicts: 30 vs 25 minutes → requires decision
   - Detects missing actors: "delivery guy" → should be "Delivery Clerk"

3. **Glossary Building**
   - Extracts domain terms: Customer, Order, Product, Delivery
   - Links synonyms: "delivery guy" = "Delivery Clerk"
   - Identifies bounded context boundaries

4. **Kano Analysis** (optional)
   - Categorizes requirements:
     - **Basic:** Authentication, order placement
     - **Performance:** <25 min delivery
     - **Excitement:** Blueprint reordering

5. **Normalization**
   - Consistent structure: "Actor must/should/may verb object under constraint"
   - Examples:
     - ❌ "Users should be able to order breakfast"
     - ✅ "Customer must be able to place orders via phone"

### Output: `requirements.normalized.json`

```json
{
  "project": "EarlyBird",
  "version": "1.0",
  "glossary": {
    "Customer": {
      "definition": "Individual who places breakfast orders",
      "synonyms": ["User", "Client"],
      "type": "Actor"
    },
    "Order": {
      "definition": "Collection of products for delivery",
      "synonyms": ["Purchase", "Request"],
      "type": "Aggregate"
    },
    "DeliveryClerk": {
      "definition": "Employee responsible for delivering orders",
      "synonyms": ["Delivery guy", "Driver"],
      "type": "Actor"
    }
  },
  "requirements": [
    {
      "id": "REQ-001",
      "text": "The system must guarantee breakfast delivery in less than 25 minutes to all parts of the city",
      "actor": "System",
      "verb": "guarantee delivery",
      "object": "breakfast",
      "constraint": "< 25 minutes, all city parts",
      "type": "Performance",
      "kano_category": "Performance",
      "priority": "High",
      "domain_terms": ["System", "delivery", "breakfast"],
      "conflicts": []
    },
    {
      "id": "REQ-002",
      "text": "Customer must be able to place orders via phone by providing customer number",
      "actor": "Customer",
      "verb": "place orders",
      "object": "order",
      "constraint": "via phone, with customer number",
      "type": "Functional",
      "kano_category": "Basic",
      "priority": "High",
      "domain_terms": ["Customer", "order", "customer number"],
      "conflicts": []
    }
  ],
  "conflicts_resolved": [
    {
      "original": ["30 minutes", "25 minutes"],
      "resolution": "25 minutes (confirmed with stakeholder)"
    }
  ],
  "open_questions": [
    {
      "requirement_id": "REQ-015",
      "question": "Should blueprint orders be editable or read-only?",
      "status": "pending"
    }
  ]
}
```

---

## 🏗️ Phase 1: Kiro Builds Domain Model

### Input

- `requirements.normalized.json`

### Kiro Process

```bash
> kiro build-domain-model requirements.normalized.json --output domain_model.json
```

**What Kiro Does:**

1. **Extract Aggregates**
   - Identifies aggregate roots from nouns: Order, Customer, Product, Delivery
   - Determines aggregate boundaries (composition, lifecycle)

2. **Map Entities & Value Objects**
   - Entities: OrderItem, Invoice, Itinerary
   - Value Objects: CustomerNumber, Address, Price

3. **Identify Bounded Contexts**
   - Semantic grouping: OrderManagement, ProductCatalog, DeliveryLogistics
   - Language boundaries: "Product" means different things in catalog vs. packing

4. **Build Glossary++**
   - Enriched with relationships, invariants, business rules

### Output: `domain_model.json`

```json
{
  "bounded_contexts": [
    {
      "name": "OrderManagement",
      "description": "Handles order lifecycle from creation to fulfillment",
      "aggregates": ["Order", "Blueprint"],
      "ubiquitous_language": {
        "Order": "A customer's request for breakfast products with delivery constraints",
        "Blueprint": "A saved order template for quick reordering"
      }
    },
    {
      "name": "ProductCatalog",
      "description": "Manages product definitions and composition",
      "aggregates": ["Product"],
      "ubiquitous_language": {
        "Product": "An item available for ordering (simple or prepackaged)",
        "SimpleProduct": "Single ingredient (e.g., coffee, croissant)",
        "PrepackagedProduct": "Combination of simple products (e.g., breakfast bundle)"
      }
    }
  ],
  "aggregates": [
    {
      "name": "Order",
      "root_entity": "Order",
      "entities": ["OrderItem"],
      "value_objects": ["OrderNumber", "TotalPrice"],
      "invariants": [
        "Order must have at least one OrderItem",
        "Order total must match sum of OrderItem prices",
        "Order cannot be modified after assembly starts"
      ],
      "operations": [
        "Create(customerId, products) → Result<Order>",
        "AddItem(productId, quantity) → Result<Unit>",
        "Cancel() → Result<Unit>"
      ]
    },
    {
      "name": "Customer",
      "root_entity": "Customer",
      "entities": [],
      "value_objects": ["CustomerNumber", "Address"],
      "invariants": [
        "Customer must have valid 8-digit customer number with Luhn checksum",
        "Customer must not be blacklisted"
      ],
      "operations": [
        "Validate(customerNumber) → Result<Customer>",
        "Blacklist(reason) → Result<Unit>"
      ]
    }
  ],
  "relationships": [
    {
      "from": "Order",
      "to": "Customer",
      "type": "association",
      "cardinality": "many-to-one",
      "description": "An order belongs to exactly one customer"
    },
    {
      "from": "Order",
      "to": "OrderItem",
      "type": "composition",
      "cardinality": "one-to-many",
      "description": "An order contains multiple order items (lifecycle bound)"
    }
  ]
}
```

---

## 🔬 Phase 2: Your Script Clusters Requirements

### Input

- `requirements.normalized.json`

### Your Script (Enhanced)

```python
def load_requirements_from_kiro():
    """Load normalized requirements from Kiro output."""
    with open('../output/requirements.normalized.json', 'r') as f:
        data = json.load(f)
    return [req['text'] for req in data['requirements']]

def save_clusters_with_metadata(clusters, requirements, kiro_data):
    """Save clusters with Kiro enrichment."""
    output = {}
    for i in range(num_clusters):
        cluster_reqs = [
            {
                "id": kiro_data['requirements'][j]['id'],
                "text": requirements[j],
                "domain_terms": kiro_data['requirements'][j]['domain_terms'],
                "priority": kiro_data['requirements'][j]['priority']
            }
            for j, label in enumerate(clusters) if label == i
        ]
        output[f"Cluster {i}"] = cluster_reqs

    with open("../output/clusters.enriched.json", "w") as f:
        json.dump(output, f, indent=2)
```

### Output: `clusters.enriched.json`

```json
{
  "Cluster 0": [
    {
      "id": "REQ-017",
      "text": "The system must store one predefined address per customer for delivery",
      "domain_terms": ["System", "address", "Customer", "delivery"],
      "priority": "High"
    }
  ],
  "Cluster 1": [
    {
      "id": "REQ-002",
      "text": "Customer must be able to place orders via phone...",
      "domain_terms": ["Customer", "order", "phone"],
      "priority": "High"
    },
    {
      "id": "REQ-007",
      "text": "Customer must call company number and provide customer number",
      "domain_terms": ["Customer", "customer number"],
      "priority": "High"
    }
  ]
}
```

---

## 🏛️ Phase 3: Kiro Interprets Clusters + Generates Architecture

### Input

- `clusters.enriched.json`
- `domain_model.json`

### Kiro Process

```bash
> kiro interpret-clusters clusters.enriched.json domain_model.json \
    --output architecture.yaml \
    --generate-docs
```

**What Kiro Does:**

1. **Map Clusters to Bounded Contexts**
   - Cluster 0 (Address) → CustomerManagement context
   - Cluster 1 (Phone Orders) → OrderManagement context
   - Identifies overlap and suggests merges/splits

2. **Propose Service Boundaries**
   - Each cluster → one microservice candidate
   - Cross-cluster dependencies → interface definitions

3. **Classify Interfaces (Blood Types)**
   - A-Type: Business logic interfaces (e.g., `IOrderValidator`)
   - T-Type: Technology adapters (e.g., HTTP, SQL)
   - O-Type: Universal abstractions (e.g., `IRepository<T>`)

4. **Generate Allowed-to-Use Matrix**
   - OrderManagement → CustomerManagement (allowed: validate customer)
   - CustomerManagement → OrderManagement (forbidden: circular dependency)

5. **Create ARCHITECTURE.md per Cluster**
   - Pre-filled with requirements, domain model, interfaces
   - Human reviews and approves

### Output: `architecture.yaml`

```yaml
project: EarlyBird
version: 1.0

microservices:
  - name: CustomerManagement
    cluster_id: 0
    bounded_context: CustomerManagement
    requirements:
      - REQ-017
      - REQ-009
      - REQ-011
    aggregates:
      - Customer
    responsibilities:
      - Manage customer data
      - Validate customer numbers (Luhn)
      - Blacklist management
    provides:
      - interface: ICustomerValidator
        type: A
        methods:
          - ValidateCustomerNumber(customerNumber) → Result<Customer>
          - IsBlacklisted(customerId) → bool
    consumes: []
    persistence:
      database: PostgreSQL
      tables:
        - customers
        - blacklist
    events_published:
      - CustomerValidated
      - CustomerBlacklisted

  - name: OrderManagement
    cluster_id: 1
    bounded_context: OrderManagement
    requirements:
      - REQ-002
      - REQ-007
      - REQ-012
      - REQ-014
    aggregates:
      - Order
      - Blueprint
    responsibilities:
      - Handle order placement (phone, web, SMS)
      - Manage order lifecycle
      - Blueprint save/load
    provides:
      - interface: IOrderService
        type: A
        methods:
          - CreateOrder(customerId, products) → Result<OrderId>
          - CancelOrder(orderId) → Result<Unit>
          - GetOrderStatus(orderId) → OrderStatus
    consumes:
      - service: CustomerManagement
        interface: ICustomerValidator
        type: A
      - service: ProductCatalog
        interface: IProductCatalog
        type: A
    persistence:
      database: PostgreSQL
      tables:
        - orders
        - order_items
        - blueprints
    events_published:
      - OrderCreated
      - OrderCancelled

allowed_to_use:
  OrderManagement:
    - CustomerManagement.ICustomerValidator
    - ProductCatalog.IProductCatalog
  CustomerManagement: []  # No external dependencies
  ProductCatalog: []

forbidden:
  CustomerManagement:
    - OrderManagement.*  # Prevent circular dependency
```

### Output: `architecture/OrderManagement.ARCHITECTURE.md`

```markdown
# OrderManagement - Architecture Specification

**Cluster ID:** Cluster 1
**Domain:** Order Management, Phone-based Ordering
**Status:** Generated (needs human review)
**Last Updated:** 2025-01-15

---

## 1. Overview

### Purpose

Manages the complete order lifecycle from placement (phone/web/SMS) through
cancellation, including blueprint save/load functionality.

### Requirements Covered

- REQ-002: Customer must be able to place orders via phone
- REQ-007: Customer must call company number and provide customer number
- REQ-012: Customers must be able to add products to shopping cart
- REQ-014: Customers must be able to use previous order as blueprint

**Total:** 12 requirements

---

## 3. Domain Model (from Kiro)

### Aggregates

**Order** (Aggregate Root)
- **Properties:**
  - `OrderId: OrderId` (Typed ID from generator)
  - `CustomerId: CustomerId`
  - `Status: OrderStatus` (enum: Draft, Confirmed, InProgress, Delivered, Cancelled)
  - `Items: List<OrderItem>`
  - `TotalPrice: decimal`
  - `CreatedAt: DateTime`

- **Invariants** (from domain_model.json):
  - Order must have at least one OrderItem
  - Order total must match sum of OrderItem prices
  - Order cannot be modified after assembly starts

- **Operations:**
  - `Create(customerId, products): Result<Order>`
  - `AddItem(productId, quantity): Result<Unit>`
  - `Cancel(): Result<Unit>`

---

## 5. Public Interfaces (Generated by Kiro)

### Inbound (What This Service Provides)

**IOrderService** (A-Type Interface)

```csharp
// Generated by Kiro - DO NOT EDIT MANUALLY
public interface IOrderService
{
    Task<Result<OrderId>> CreateOrder(CreateOrderCommand command);
    Task<Result<Unit>> CancelOrder(OrderId orderId);
    Task<Result<OrderDto>> GetOrderStatus(OrderId orderId);
    Task<Result<BlueprintId>> SaveAsBlueprint(OrderId orderId);
    Task<Result<OrderId>> CreateFromBlueprint(BlueprintId blueprintId);
}
```

### Outbound (What This Service Needs)

**Dependencies (from architecture.yaml):**

```csharp
// Allowed dependencies per architecture.yaml
[AllowedDependency("CustomerManagement.ICustomerValidator")]
public interface ICustomerValidator { ... }

[AllowedDependency("ProductCatalog.IProductCatalog")]
public interface IProductCatalog { ... }

// FORBIDDEN (will trigger Roslyn analyzer error)
// [ForbiddenDependency("DeliveryManagement.*")]
```

---

**[Rest of template filled by Kiro...]**
```

---

## 🛠️ Phase 4: Your Tools Generate Guardrails

### Input

- `architecture.yaml`
- `domain_model.json`

### Source Generators

**Typed IDs Generator** (from architecture.yaml)

```csharp
// Auto-generated from architecture.yaml
namespace EarlyBird.OrderManagement.Domain;

[GeneratedTypedId]
public readonly record struct OrderId(Guid Value)
{
    public static OrderId New() => new(Guid.NewGuid());
    public static OrderId From(string value) => new(Guid.Parse(value));
}

[GeneratedTypedId]
public readonly record struct CustomerId(Guid Value);

[GeneratedTypedId]
public readonly record struct BlueprintId(Guid Value);
```

**Commands/DTOs Generator**

```csharp
// Auto-generated from IOrderService interface
namespace EarlyBird.OrderManagement.Application;

[GeneratedCommand]
public record CreateOrderCommand(
    CustomerId CustomerId,
    IReadOnlyList<OrderItemDto> Items
);

[GeneratedDto]
public record OrderDto(
    OrderId Id,
    CustomerId CustomerId,
    OrderStatus Status,
    decimal TotalPrice,
    DateTime CreatedAt
);
```

### Roslyn Analyzers (from architecture.yaml)

**Allowed-to-Use Analyzer**

```csharp
// Auto-generated from architecture.yaml allowed_to_use section
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class AllowedToUseAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor ForbiddenDependencyRule = new(
        id: "ARCH001",
        title: "Forbidden cross-service dependency",
        messageFormat: "'{0}' is not allowed to reference '{1}' per architecture.yaml",
        category: "Architecture",
        defaultSeverity: DiagnosticSeverity.Error,
        isEnabledByDefault: true
    );

    // Architecture rules from architecture.yaml
    private static readonly Dictionary<string, HashSet<string>> AllowedDependencies = new()
    {
        ["OrderManagement"] = new()
        {
            "CustomerManagement.ICustomerValidator",
            "ProductCatalog.IProductCatalog"
        },
        ["CustomerManagement"] = new() { },  // No external deps
    };

    public override void Initialize(AnalysisContext context)
    {
        context.RegisterSyntaxNodeAction(AnalyzeInvocation, SyntaxKind.InvocationExpression);
    }

    // ... analyzer logic validates calls against allowed_to_use matrix
}
```

**Blood Type Analyzer**

```csharp
// Ensures interfaces are properly classified
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class BloodTypeAnalyzer : DiagnosticAnalyzer
{
    private static readonly DiagnosticDescriptor MissingBloodTypeRule = new(
        id: "ARCH002",
        title: "Interface missing Blood Type classification",
        messageFormat: "Interface '{0}' must have [AType], [TType], or [OType] attribute",
        category: "Architecture",
        defaultSeverity: DiagnosticSeverity.Warning,
        isEnabledByDefault: true
    );

    // Validates interfaces have proper blood type attributes
}
```

### NUKE Build Pipeline (from architecture.yaml)

```csharp
// Auto-generated NUKE targets per microservice
class Build : NukeBuild
{
    // Generated from architecture.yaml microservices
    Target BuildOrderManagement => _ => _
        .Description("Build OrderManagement microservice")
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(Solution.GetProject("OrderManagement"))
                .SetConfiguration(Configuration));
        });

    Target BuildCustomerManagement => _ => _
        .Description("Build CustomerManagement microservice")
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(Solution.GetProject("CustomerManagement"))
                .SetConfiguration(Configuration));
        });

    // Generated dependency graph from allowed_to_use
    Target BuildAll => _ => _
        .DependsOn(
            BuildCustomerManagement,   // No deps, builds first
            BuildProductCatalog,       // No deps
            BuildOrderManagement       // Depends on above two
        );

    Target TestOrderManagement => _ => _
        .DependsOn(BuildOrderManagement)
        .Executes(() =>
        {
            DotNetTest(s => s
                .SetProjectFile(Solution.GetProject("OrderManagement.Tests"))
                .SetConfiguration(Configuration)
                .EnableCodeCoverage()
                .SetCoverageThreshold(80)  // From architecture.yaml
                .SetMutationThreshold(75)); // Stryker config
        });
}
```

### MCP Server (from architecture.yaml)

```json
{
  "name": "earlybird-architecture",
  "version": "1.0.0",
  "tools": [
    {
      "name": "validate-architecture",
      "description": "Validates code against architecture.yaml rules",
      "inputSchema": {
        "type": "object",
        "properties": {
          "service": {
            "type": "string",
            "enum": ["OrderManagement", "CustomerManagement", "ProductCatalog"]
          }
        }
      }
    },
    {
      "name": "build-service",
      "description": "Builds a specific microservice with NUKE",
      "inputSchema": {
        "type": "object",
        "properties": {
          "service": {"type": "string"},
          "target": {"type": "string", "enum": ["Build", "Test", "Publish"]}
        }
      }
    },
    {
      "name": "run-analyzers",
      "description": "Runs Roslyn analyzers for architecture compliance",
      "inputSchema": {
        "type": "object",
        "properties": {
          "service": {"type": "string"}
        }
      }
    }
  ]
}
```

**Claude Code can now call:**

```typescript
// Claude Code uses MCP to validate architecture
const result = await useMCPTool("earlybird-architecture", "validate-architecture", {
  service: "OrderManagement"
});

// Build with NUKE
await useMCPTool("earlybird-architecture", "build-service", {
  service: "OrderManagement",
  target: "Build"
});

// Check analyzer violations
const violations = await useMCPTool("earlybird-architecture", "run-analyzers", {
  service: "OrderManagement"
});
```

---

## 🤖 Phase 5: Claude/Cursor Implements (Within Guardrails)

### What AI Agents CAN Do

1. **Implement Use Cases** (within ARCHITECTURE.md spec)
   ```csharp
   // Claude implements this per spec
   public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Result<OrderId>>
   {
       private readonly ICustomerValidator _customerValidator;  // ✅ Allowed dependency
       private readonly IProductCatalog _productCatalog;        // ✅ Allowed dependency
       private readonly IOrderRepository _orderRepository;

       public async Task<Result<OrderId>> Handle(CreateOrderCommand request, ...)
       {
           // Claude implements business logic
           var customerResult = await _customerValidator.ValidateCustomerNumber(request.CustomerNumber);
           // ...
       }
   }
   ```

2. **Write Tests** (test-first)
   ```csharp
   // Human defines intent
   [Fact]
   public void CreateOrder_WithBlacklistedCustomer_ShouldFail()
   {
       // Given
       var customer = Customer.Blacklisted();
       var products = ProductList.Valid();

       // When
       var result = orderService.CreateOrder(customer.Id, products);

       // Then
       result.ShouldBeFailed("Customer is blacklisted");
   }

   // Claude generates 20 more variants (edge cases, permutations)
   ```

3. **Generate Infrastructure** (T-Type adapters)
   ```csharp
   // Claude implements HTTP controller
   [ApiController]
   [Route("api/orders")]
   public class OrdersController : ControllerBase
   {
       [HttpPost]
       public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
       {
           var command = new CreateOrderCommand(
               CustomerId.From(request.CustomerId),
               request.Items
           );

           var result = await _mediator.Send(command);
           return result.Match<IActionResult>(
               success => Ok(new { orderId = success.Value }),
               failure => BadRequest(failure.Error)
           );
       }
   }
   ```

### What AI Agents CANNOT Do (Analyzer Prevents)

1. **Violate Allowed-to-Use**
   ```csharp
   // ❌ Roslyn analyzer error ARCH001
   public class CreateOrderHandler
   {
       private readonly IDeliveryService _deliveryService;  // FORBIDDEN!
       //                ^^^^^^^^^^^^^^^^
       // Error ARCH001: 'OrderManagement' is not allowed to reference
       // 'DeliveryManagement.IDeliveryService' per architecture.yaml
   }
   ```

2. **Use Primitive Types for IDs**
   ```csharp
   // ❌ Analyzer error
   public async Task<Order> GetOrder(Guid orderId)  // FORBIDDEN!
   //                                ^^^^
   // Error ARCH003: Use OrderId instead of Guid

   // ✅ Correct
   public async Task<Order> GetOrder(OrderId orderId)
   ```

3. **Skip Invariants**
   ```csharp
   // ❌ Mutation test FAILS (Stryker catches this)
   public class Order
   {
       public void AddItem(OrderItem item)
       {
           // Missing invariant check - Stryker will mutate this and tests should fail
           Items.Add(item);
       }
   }

   // ✅ Correct (with invariant)
   public Result<Unit> AddItem(OrderItem item)
   {
       if (Status != OrderStatus.Draft)
           return Result.Failure("Cannot modify order after submission");

       Items.Add(item);
       return Result.Success();
   }
   ```

---

## 🎯 Kiro's Value Proposition

### What Kiro DOES (Semantic Understanding)

✅ **Normalize Requirements**
- Deduplicate semantically similar requirements
- Flag vague/conflicting requirements
- Build glossary and ubiquitous language

✅ **Model Domain**
- Extract aggregates, entities, value objects
- Identify bounded contexts
- Map relationships and invariants

✅ **Scaffold Architecture**
- Propose microservice boundaries (from clusters)
- Generate interface definitions (with blood types)
- Create allowed-to-use matrix
- Pre-fill ARCHITECTURE.md skeletons

✅ **Generate Guardrails**
- Export to architecture.yaml
- Provide schema for source generators
- Define analyzer rules
- Configure NUKE pipelines

### What Kiro DOES NOT (Human Decisions)

❌ **Make Architectural Decisions**
- Human reviews and approves cluster→microservice mapping
- Human decides on technology choices (PostgreSQL vs. MongoDB)
- Human determines deployment strategy

❌ **Write Business Logic**
- No "vibe code" in domain layer
- No guessing at business rules
- No implementation of use cases

❌ **Generate Production Code**
- Only scaffolds (templates, interfaces, types)
- Actual implementation by Claude/Cursor within guardrails
- Tests define behavior, AI fills breadth

---

## 📂 Repository Structure with Kiro

```
earlybird-sdd/
├── requirements/
│   ├── raw/
│   │   └── stakeholder-interviews.md      # Input to Kiro
│   ├── normalized/
│   │   └── requirements.normalized.json   # Kiro output
│   └── domain-model/
│       └── domain_model.json              # Kiro output
│
├── WIP/
│   ├── requirements-clustering/
│   │   ├── scripts/
│   │   │   └── cluster_requirements.py    # Uses Kiro output
│   │   └── output/
│   │       ├── clusters.enriched.json     # Your script output
│   │       └── clusters.png
│   ├── architecture/
│   │   ├── architecture.yaml              # Kiro generated
│   │   ├── OrderManagement.ARCHITECTURE.md
│   │   ├── CustomerManagement.ARCHITECTURE.md
│   │   └── ProductCatalog.ARCHITECTURE.md
│   └── guardrails/
│       ├── source-generators/
│       │   ├── TypedIdGenerator.cs
│       │   └── DtoGenerator.cs
│       ├── roslyn-analyzers/
│       │   ├── AllowedToUseAnalyzer.cs
│       │   └── BloodTypeAnalyzer.cs
│       ├── nuke/
│       │   └── Build.cs                   # NUKE pipeline
│       └── mcp-server/
│           └── package.json
│
├── src/
│   ├── OrderManagement/
│   │   ├── Domain/                        # Claude implements
│   │   ├── Application/                   # Claude implements
│   │   └── Infrastructure/                # Claude implements
│   ├── CustomerManagement/
│   └── ProductCatalog/
│
└── tests/
    ├── OrderManagement.Tests/             # Human writes core tests
    └── Integration.Tests/                 # Claude generates variants
```

---

## 🔄 Complete Workflow Example

### Step 1: Kiro Normalizes

```bash
$ kiro normalize requirements/raw/stakeholder-interviews.md \
    --output requirements/normalized/requirements.normalized.json \
    --glossary-output requirements/normalized/glossary.json
```

**Output:** Clean, structured requirements with glossary

### Step 2: Kiro Models Domain

```bash
$ kiro build-domain-model requirements/normalized/requirements.normalized.json \
    --output requirements/domain-model/domain_model.json
```

**Output:** Aggregates, entities, value objects, invariants

### Step 3: Your Script Clusters

```bash
$ cd WIP/requirements-clustering/scripts
$ python cluster_requirements.py \
    --input ../../../requirements/normalized/requirements.normalized.json \
    --domain-model ../../../requirements/domain-model/domain_model.json \
    --output ../output/clusters.enriched.json
```

**Output:** 12 clusters with domain context

### Step 4: Human Reviews Clusters

```bash
# Open visualization
$ open WIP/requirements-clustering/output/clusters.png

# Review JSON
$ cat WIP/requirements-clustering/output/clusters.enriched.json
```

**Decision:** "Cluster 0 + Cluster 11 should merge → CustomerManagement"

### Step 5: Kiro Generates Architecture

```bash
$ kiro interpret-clusters \
    WIP/requirements-clustering/output/clusters.enriched.json \
    requirements/domain-model/domain_model.json \
    --merge "Cluster 0,Cluster 11:CustomerManagement" \
    --output WIP/architecture/architecture.yaml \
    --generate-docs WIP/architecture/
```

**Output:**
- `architecture.yaml` with 8 microservices (after merge)
- 8 `*.ARCHITECTURE.md` files pre-filled

### Step 6: Human Reviews & Approves Architecture

```bash
# Review each ARCHITECTURE.md
# Make adjustments to allowed_to_use matrix
# Approve in architecture.yaml:
#   status: approved
```

### Step 7: Generate Guardrails

```bash
$ cd WIP/guardrails

# Generate source generators
$ kiro generate source-generators \
    ../architecture/architecture.yaml \
    --output source-generators/

# Generate Roslyn analyzers
$ kiro generate analyzers \
    ../architecture/architecture.yaml \
    --output roslyn-analyzers/

# Generate NUKE build
$ kiro generate nuke-build \
    ../architecture/architecture.yaml \
    --output nuke/Build.cs

# Generate MCP server
$ kiro generate mcp-server \
    ../architecture/architecture.yaml \
    --output mcp-server/
```

**Output:** All guardrails ready for use

### Step 8: Claude Implements (Test-First)

```bash
# Human writes core test
$ cat > tests/OrderManagement.Tests/CreateOrderTests.cs
```

```csharp
[Fact]
public void CreateOrder_WithValidData_ShouldSucceed()
{
    // Given
    var customer = Customer.Valid();
    var products = ProductList.WithItems(2);

    // When
    var result = orderService.CreateOrder(customer.Id, products);

    // Then
    result.ShouldBeSuccess();
    result.Value.Should().NotBeEmpty();
}
```

**Claude (via MCP):**

```typescript
// 1. Check architecture
const archCheck = await useMCPTool("earlybird-architecture", "validate-architecture", {
  service: "OrderManagement"
});

// 2. Implement use case
// Claude writes CreateOrderHandler.cs per ARCHITECTURE.md

// 3. Generate test variants
// Claude adds 15 more test cases (edge cases, nulls, etc.)

// 4. Run build
const buildResult = await useMCPTool("earlybird-architecture", "build-service", {
  service: "OrderManagement",
  target: "Test"
});

// 5. Check analyzers
const violations = await useMCPTool("earlybird-architecture", "run-analyzers", {
  service: "OrderManagement"
});

// If violations.count > 0, fix and repeat
```

### Step 9: Mutation Testing

```bash
$ dotnet stryker --project OrderManagement.Tests --mutation-score-threshold 75
```

**If fails:** Claude generates more test cases until threshold met

### Step 10: PR & Human Review

```bash
$ git checkout -b feature/order-management-implementation
$ git add src/OrderManagement tests/OrderManagement.Tests
$ git commit -m "feat: implement OrderManagement use cases"
$ git push origin feature/order-management-implementation

# Open PR → CodeRabbit reviews → Human reviews → Merge
```

---

## 💡 Key Insights

### Kiro Handles Semantic Complexity

**Without Kiro:**
- Manual requirement deduplication (error-prone)
- Vague domain boundaries
- Inconsistent terminology
- Architectural decisions from scratch

**With Kiro:**
- Automatic semantic normalization
- Clear domain model with invariants
- Glossary enforcement across teams
- Architecture scaffolding from requirements

### Guardrails Prevent Architectural Drift

**Without Guardrails:**
- Developers accidentally create circular dependencies
- Primitive obsession (using `Guid` instead of `OrderId`)
- Missing invariant checks (caught only in production)

**With Guardrails:**
- Roslyn analyzers block violations at compile time
- Source generators enforce typed IDs
- Mutation testing validates test quality
- MCP server gives AI deterministic architecture knowledge

### Test-First Ensures AI Implements Correctly

**Without Test-First:**
- AI guesses business logic ("vibe code")
- Hard to verify correctness
- Regression bugs

**With Test-First:**
- Human defines intent in test
- AI implements to make test pass
- Mutation testing ensures tests are rigorous
- Clear acceptance criteria

---

## 🚀 Next Steps

1. **Integrate Kiro into WIP**
   - Add Kiro CLI to `WIP/requirements-clustering/`
   - Document Kiro commands in `CLUSTERING_GUIDE.md`

2. **Create Example Workflow**
   - Run full pipeline with EarlyBird requirements
   - Publish `clusters.enriched.json` and `architecture.yaml`

3. **Build Guardrails**
   - Implement source generators
   - Write Roslyn analyzers
   - Set up NUKE pipeline

4. **MCP Server**
   - Implement architecture validation endpoint
   - Add build/test/analyzer tools
   - Integrate with Claude Code

5. **Documentation**
   - Write tutorial: "From Raw Requirements to Running Code in 5 Steps"
   - Video walkthrough showing Kiro + Claude workflow

---

**Summary:** Kiro enables **semantic requirement engineering** → **type-safe architecture** → **AI-driven implementation** without losing human control over architectural decisions or business logic correctness.
