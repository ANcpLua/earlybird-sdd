# THE SOFTWARE ENGINEERING BIBLE

## A Unified Framework for Requirements, Architecture, and Modeling

**For:** Senior Requirements Engineers, Software Architects, Model/Data Engineers
**Level:** Senior++ / Professor of Informatics
**Version:** 1.0 (2025)

---

## THE THREE PILLARS OF SOFTWARE ENGINEERING

```
┌─────────────────────────────────────────────────────────────────────────┐
│                  THE SOFTWARE ENGINEERING TRIAD                         │
│                                                                         │
│     REQUIREMENTS              ARCHITECTURE              MODELING        │
│     (What & Why)              (How & Where)         (Representation)    │
│          │                          │                      │            │
│          │    ┌──────────────────────┼──────────────────┐  │            │
│          └────┤  Unified by Principles & Validated by  ├──┘            │
│               │     Empirical Evidence (1968-2025)     │               │
│               └────────────────────────────────────────┘               │
│                                                                         │
│  DISCOVERS            STRUCTURES              EXPRESSES                │
│  • Stakeholder needs  • Building blocks       • Visual abstractions    │
│  • Business value     • Dependencies          • Formal rules           │
│  • Constraints        • Quality attributes    • Validation logic       │
│  • Hidden risks       • Technology choices    • Generatable artifacts  │
└─────────────────────────────────────────────────────────────────────────┘
```

### The Symbiotic Relationship

**Requirements define WHAT the system must do and WHY it matters**

- Kano Model: Basic, Legal, Performance, Excitement, Superfluous
- Top 10 Problems: Source identification, conflict resolution, hidden requirements
- INVEST Criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable
- Natural Language Quality: No nominalization, no passive voice, no universal quantifiers

**Architecture defines HOW to structure and WHERE to deploy**

- Blood Types: A (Application), T (Technology), O (Universal)
- Quality Principles: SRP, Low Coupling, ADP, CCP, CRP
- Interface Design: Segregation, Dependency Inversion, Blood Type Matching
- Documentation: C4 Model, arc42, ADRs

**Modeling provides the LANGUAGE to express both precisely**

- Visual: Diagrams communicate faster than text
- Abstract: Focus on essentials, omit noise
- Formal: Tool-validatable, code-generatable
- Three Audiences: Humans (clarity), Tools (validation), AI (generation)

### The Unified Truth

> **Software engineering excellence emerges from the intersection of these three disciplines.** Requirements without
> architecture are wishes. Architecture without requirements lacks purpose. Both without modeling remain ambiguous. *
*This
bible synthesizes decades of empirical wisdom into actionable frameworks.**

---

## Table of Contents

### PART I: FOUNDATION - UNIVERSAL PRINCIPLES

1. [Separation of Concerns](#separation-of-concerns)
2. [Locality and Cohesion](#locality-and-cohesion)
3. [Minimize Dependencies](#minimize-dependencies)
4. [Abstraction and Information Hiding](#abstraction-and-information-hiding)
5. [Stability Classification](#stability-classification)
6. [Iterative Refinement](#iterative-refinement)
7. [Fail Fast](#fail-fast)
8. [Optimize for Change](#optimize-for-change)

### PART II: CROSS-DOMAIN INTEGRATION

9. [Requirements Stability ↔ Architectural Patterns](#requirements-stability-architectural-patterns)
10. [INVEST ↔ Independent Deployability](#invest-independent-deployability)
11. [Traceability ↔ Impact Analysis ↔ Modeling](#traceability-impact-analysis-modeling)
12. [Language Quality ↔ Interface Design](#language-quality-interface-design)
13. [Kano Types ↔ Blood Types ↔ Metamodels](#kano-types-blood-types-metamodels)

### PART III: KNOWLEDGE GRAPH

14. [Navigation by Problem Type](#navigation-by-problem-type)
15. [Navigation by Role](#navigation-by-role)
16. [Navigation by Career Stage](#navigation-by-career-stage)

### PART IV: DEEP DIVES (Three Levels of Depth)

17. [Dependency Inversion Principle](#dependency-inversion-principle)
18. [The Kano Model](#the-kano-model)
19. [State Machine Modeling](#state-machine-modeling)
20. [Acyclic Dependencies Principle](#acyclic-dependencies-principle)
21. [Tell Don't Ask](#tell-dont-ask)
22. [INVEST Criteria](#invest-criteria)

### PART V: DECISION FRAMEWORKS

23. [Choose Requirements Documentation Format](#choose-requirements-documentation-format)
24. [Choose Architectural Style](#choose-architectural-style)
25. [Choose Modeling Approach](#choose-modeling-approach)
26. [Component Discovery Method Selection](#component-discovery-method-selection)

### PART VI: META-PRINCIPLES

27. [What Makes a Principle "Good"](#what-makes-a-principle-good)
28. [The Ultimate Principle: Optimize for Change](#the-ultimate-principle)
29. [Measuring Success](#measuring-success)

### APPENDICES

- [A: Glossary of Terms](#appendix-a-glossary)
- [B: Decision Trees Consolidated](#appendix-b-decision-trees)
- [C: Metrics Catalog](#appendix-c-metrics-catalog)
- [D: Tool Landscape](#appendix-d-tool-landscape)
- [E: Further Reading by Level](#appendix-e-further-reading)
- [F: Historical Primary Sources](#appendix-f-historical-sources)

---

# PART I: FOUNDATION - UNIVERSAL PRINCIPLES

## Separation of Concerns {#separation-of-concerns}

### Origin and Theoretical Foundation

**Edsger W. Dijkstra (1974)** - "On the role of scientific thought"

*"Let me try to explain to you, what to my taste is characteristic for all intelligent thinking. It is, that one is
willing to study in depth an aspect of one's subject matter in isolation for the sake of its own consistency, all the
time knowing that one is occupying oneself only with one of the aspects."*

This principle predates software engineering, originating in mathematics and physics. It represents humanity's
fundamental cognitive limitation: **we cannot reason effectively about multiple intertwined concerns simultaneously.**

### Manifestations Across Domains

#### In Requirements Engineering

**Kano Model Separation (1984):**

- **Basic Requirements** ≠ **Performance Requirements** ≠ **Legal Requirements**
- Each type has different elicitation methods (WATCH ≠ TALK ≠ READ)
- Each type has different stakeholders
- Each type has different change frequencies

**Example:**

```
System: E-commerce Platform

BASIC (Must-Have):
  - Customer can add products to cart
  - Customer can checkout
  → Elicitation: WATCH (observe current manual process)

PERFORMANCE (Measurable):
  - Checkout completes in <3 seconds
  - System handles 10,000 concurrent users
  → Elicitation: TALK (interview business analysts, measure current)

LEGAL (Mandated):
  - GDPR compliance (data deletion within 30 days)
  - PCI-DSS for payment processing
  → Elicitation: READ (regulations, standards)
```

**Why Separation Matters in RE:**

- Basic requirements change with business model evolution (medium frequency)
- Performance requirements change with scale (low to high frequency)
- Legal requirements change with jurisdiction and regulations (low frequency)

**Mixing them = impossible to prioritize, estimate, or validate correctly.**

#### In Software Architecture

**Blood Types Principle:**

- **TYPE A (Application/Business)** ≠ **TYPE T (Technology/Infrastructure)**
- Each type has different change drivers
- Each type has different lifespans
- Each type requires different expertise

**Example:**

```
Application: EarlyBird Breakfast Delivery

TYPE A (Business Logic):
  - Order validation rules
  - Price calculation
  - Customer blacklisting logic
  - Route optimization algorithms
  → Changes when: Business rules evolve

TYPE T (Technology):
  - Web interface
  - SMS gateway integration
  - PostgreSQL database adapter
  - Stripe payment integration
  → Changes when: Technology evolves or scales

TYPE O (Universal):
  - String manipulation
  - Date/time calculations
  - Graph algorithms
  → Changes when: Never (timeless)
```

**The Critical Rule:**

```
IF Component_Contains(TYPE_A AND TYPE_T)
THEN Architecture_Violation = TRUE
  BECAUSE change_in_T propagates_to A
  COST = 10x maintenance_overhead
```

**Case Study - EarlyBird Evolution:**

- Original: Phone-based ordering
- Evolution: Web + SMS ordering
- **Result:** Only T-components changed. A-components (Order, Product, Customer) unchanged.
- **Savings:** 80% of codebase stable during technology migration

#### In Modeling

**MVC Separation (1979 - Trygve Reenskaug):**

- **Model** (data/domain) ≠ **View** (presentation) ≠ **Controller** (behavior)

**UML Diagram Type Separation:**

- **Structure diagrams** (class, component) ≠ **Behavior diagrams** (sequence, state machine)
- Don't mix structure and behavior in same diagram
- Cognitive overload: "Is this showing WHAT exists or HOW it interacts?"

**Three-Audience Separation:**

1. **Humans:** Need clarity, focus, standard notation
   ```
   [Customer] ──places──> [Order] ──contains──> [OrderItem]
   Simple, clear, understandable
   ```

2. **Tools:** Need completeness, formality, validation rules
   ```
   Customer {
     id: String {primaryKey, pattern="[0-9]{7}"}
     name: String {required, maxLength=255}
     email: Email {unique}
     validate(): ValidationResult
   }
   Complete, validatable, generatable
   ```

3. **AI:** Need context, examples, metainformation
   ```
   Customer {
     id: String {primaryKey, pattern="[0-9]{7}", example="0001234"}
     name: String {required, maxLength=255, example="John Smith"}
     email: Email {unique, example="john@example.com"}
     // Business rule: Email required for order confirmation
     validate(): ValidationResult
   }
   Rich context for intelligent generation
   ```

### Why Separation of Concerns Matters

#### 1. Cognitive Load Reduction

**Humans can hold 7±2 items in working memory** (Miller's Law, 1956)

Mixed concerns:

```
Function ProcessOrder(order):
  // Business logic mixed with database and UI
  customerName = GetCustomerNameFromDatabase(order.customerId)
  if customerName == null:
    ShowErrorDialog("Customer not found")
    LogToDatabase("ERROR", "Invalid customer")
    return false

  if order.total > customer.creditLimit:
    SendEmail(customerEmail, "Credit limit exceeded")
    UpdateDatabaseStatus(order.id, "REJECTED")
    ShowNotification("Order rejected")
    return false

  // ... 200 more lines mixing 5 different concerns
```

**Cognitive load: ~40 concepts simultaneously**

Separated concerns:

```
// Pure business logic
Function ValidateOrder(order, customer) -> ValidationResult:
  if order.total > customer.creditLimit:
    return ValidationResult.Failure("Credit limit exceeded")
  return ValidationResult.Success()

// Orchestration layer (separate file)
result = ValidateOrder(order, customer)
if result.failed:
  notifier.NotifyCustomer(customer, result.reason)
  repository.MarkRejected(order)
  ui.ShowError(result.reason)
```

**Cognitive load per function: ~5-7 concepts**

#### 2. Independent Evolution

**Empirical Evidence: NASA Software Engineering Handbook**

> "Architectural separation reduces change propagation by 64% (Mockus et al., 2000)"

**Real Example - MateMate Chess:**

- Software 1.0: Handcrafted evaluation function
- Software 2.0: Stockfish neural network
- **Architecture:** `IPositionEvaluator` interface separates concern
- **Result:** Swap evaluation without touching move generation, UI, game rules

**Without separation:**

```
Function CalculateMove():
  // Evaluation logic hardcoded
  score = material_value * 1.0 + position_value * 0.5 + king_safety * 0.3
  // Now need neural network → ENTIRE FUNCTION REWRITTEN
```

**With separation:**

```
Interface IPositionEvaluator:
  EvaluatePosition(board) -> score

Class TraditionalEvaluator implements IPositionEvaluator:
  EvaluatePosition(board):
    return material * 1.0 + position * 0.5 + king_safety * 0.3

Class NeuralEvaluator implements IPositionEvaluator:
  EvaluatePosition(board):
    return neuralNetwork.Predict(board)

// Client code unchanged
engine = ChessEngine(evaluator: NeuralEvaluator())
```

**Change cost: 95% reduction**

#### 3. Testing Simplification

**Without separation:**

```
Test ValidateOrder():
  // Need: mock database, mock email service, mock UI, mock logger
  // Test setup: 50 lines
  // Test fragility: breaks when any infrastructure changes
```

**With separation:**

```
Test ValidateOrder():
  // Need: just business logic inputs
  order = Order(total=1000)
  customer = Customer(creditLimit=500)
  result = ValidateOrder(order, customer)
  Assert(result.failed)
  Assert(result.reason == "Credit limit exceeded")
  // Test setup: 4 lines
  // Test fragility: zero (no infrastructure dependencies)
```

#### 4. Cost Impact - The Rule of Ten

**Cost to fix defect when concerns are mixed:**

| Phase Discovered | Cost Multiplier | Reason                                           |
|------------------|-----------------|--------------------------------------------------|
| Requirements     | 1x ($100)       | Catch during elicitation                         |
| Design           | 10x ($1,000)    | Redesign needed                                  |
| Implementation   | 100x ($10,000)  | Code rewrite needed                              |
| Production       | 10,000x ($1M)   | Bug in production, mixed concerns make fix risky |

**When business logic is entangled with database/UI/networking:**

- Simple business rule change → must touch 5 files across 3 layers
- Risk of regression → requires full regression testing
- Time to deploy → weeks instead of hours

**When business logic is separated:**

- Simple business rule change → touch 1 file in business layer
- Risk of regression → minimal (infrastructure unchanged)
- Time to deploy → hours with feature flags

### How to Apply Separation of Concerns

#### Step 1: Identify Concerns

**Requirements Phase:**

```
List all requirement types:
FOR_EACH requirement:
  Classify as: Basic | Performance | Legal | Excitement | Superfluous
  Assign elicitation method: WATCH | READ | TALK | THINK
  Track separately in requirements repository
```

**Architecture Phase:**

```
List all building blocks:
FOR_EACH block:
  Classify as: TYPE_A | TYPE_T | TYPE_O
  IF contains_multiple_types:
    SPLIT into separate blocks
  Validate: block.blood_type IN {A, T, O} AND NOT mixed
```

**Modeling Phase:**

```
FOR_EACH diagram:
  Identify primary concern: Structure | Behavior | Deployment
  Remove elements not related to primary concern
  Create separate diagram for other concerns
  Link diagrams with navigation
```

#### Step 2: Define Clean Boundaries

**Interfaces (Architecture):**

```yaml
# Bad: Leaky abstraction
Interface IOrderService:
  SaveOrderToDatabase(order, connectionString) # leaks database concern
  SendOrderConfirmationViaSmtp(order, smtpConfig) # leaks email concern

# Good: Clean separation
Interface IOrderService:
  PlaceOrder(order) -> OrderResult # pure business operation

# Infrastructure concerns handled separately
Interface IOrderRepository:
  Save(order)

Interface INotificationService:
  NotifyCustomer(customer, message)
```

**Requirements Documentation:**

```
# Bad: Mixed concerns
"The system shall display the customer name from the database in the web UI
with Arial 12pt font and validate that the email address is stored in the
customer table while ensuring GDPR compliance"

# Good: Separated concerns
BASIC: System shall display customer name
PERFORMANCE: Display shall render within 100ms
LEGAL: System shall comply with GDPR Article 17 (right to erasure)
UI_PREFERENCE: Font shall be Arial 12pt (separate from functional requirements)
```

#### Step 3: Enforce with Tools

**Architecture Testing:**

```csharp
[Test]
public void TypeAComponentsShouldNotDependOnTypeT()
{
    var architecture = ArchitectureLoader.LoadFrom(Assembly.GetExecutingAssembly());

    var typeAComponents = architecture.GetLayer("Domain");
    var typeTComponents = architecture.GetLayer("Infrastructure");

    var violations = typeAComponents
        .Should()
        .NotDependOnAny(typeTComponents)
        .GetViolations();

    Assert.That(violations, Is.Empty,
        $"TYPE_A depends on TYPE_T: {string.Join(", ", violations)}");
}
```

**Requirements Validation:**

```python
def validate_requirements_separation(requirements):
    for req in requirements:
        if not req.has_kano_classification():
            raise ValidationError(f"{req.id}: Missing Kano classification")

        if req.mixes_multiple_types():
            raise ValidationError(f"{req.id}: Mixes Basic + Performance + Legal")

        if req.kano_type == "BASIC" and req.contains_metrics():
            raise ValidationError(f"{req.id}: Basic requirements shouldn't contain numbers")
```

#### Step 4: Measure

**Cohesion-Coupling Ratio (Architecture):**

```
CCR = Intra-Component Operations / Inter-Component Operations

Good: CCR > 3.0 (operations mostly within components)
Poor: CCR < 1.5 (operations mostly between components)
```

**Requirements Separation Score:**

```
Separation_Score = Pure_Requirements / Total_Requirements

Pure_Requirement = has_single_Kano_type AND has_clear_acceptance_criteria
Good: Score > 0.8
Poor: Score < 0.5
```

### Anti-Patterns and Common Violations

#### Anti-Pattern 1: The God Class

**Problem:**

```java
public class OrderManager {
    // Business logic
    public boolean ValidateOrder(Order order) { ... }

    // Database access
    public void SaveToDatabase(Order order, Connection conn) { ... }

    // Email sending
    public void SendConfirmation(Order order, SmtpConfig smtp) { ... }

    // UI rendering
    public void RenderOrderPage(Order order, HttpResponse response) { ... }

    // Logging
    public void LogOrder(Order order, Logger log) { ... }
}
```

**5 concerns mixed in 1 class**

**Consequence:**

- Every concern change → class changes
- Change rate: 10x other classes
- Testing: requires mocking 4 infrastructure dependencies
- Reusability: zero (cannot extract business logic)

**Solution: Extract Each Concern**

```java
// TYPE_A: Pure business logic
public class OrderValidator {
    public ValidationResult Validate(Order order, Customer customer) {
        if (order.Total > customer.CreditLimit)
            return ValidationResult.Failure("Credit exceeded");
        return ValidationResult.Success();
    }
}

// TYPE_T: Infrastructure adapters
public class OrderRepository implements IOrderRepository {
    public void Save(Order order) { /* database logic */ }
}

public class EmailNotifier implements INotificationService {
    public void Notify(Customer customer, String message) { /* email logic */ }
}

// TYPE_T: Orchestration (thin layer)
public class OrderController {
    private OrderValidator validator;
    private IOrderRepository repository;
    private INotificationService notifier;

    public ActionResult PlaceOrder(Order order, Customer customer) {
        var result = validator.Validate(order, customer);
        if (result.Success) {
            repository.Save(order);
            notifier.Notify(customer, "Order confirmed");
            return Ok();
        }
        return BadRequest(result.Reason);
    }
}
```

**Result:**

- Each class has 1 reason to change
- Each class independently testable
- Business logic reusable in different contexts

#### Anti-Pattern 2: Mixed Requirements Types

**Problem:**

```
REQ-042: "The system shall authenticate users via OAuth2 using JSON Web Tokens
stored in Redis cache with 15-minute expiration, displaying login page in
Arial 12pt font, while ensuring GDPR Article 6 compliance for data processing"
```

**Analysis:**

- Basic: User authentication required
- Performance: 15-minute token expiration (performance trade-off)
- Legal: GDPR compliance
- Technology: OAuth2, JWT, Redis (should not be in requirements!)
- UI: Font choice (separate concern)

**Consequence:**

- Cannot estimate (mixed technical and business)
- Cannot test (what's the acceptance criterion?)
- Cannot change technology without rewriting requirement
- Cannot negotiate (mixed mandatory with preferences)

**Solution: Separate Requirements**

```
REQ-042-BASIC: System shall authenticate users before granting access
  Kano: BASIC
  Method: WATCH
  Acceptance: User cannot access protected resources without authentication

REQ-042-LEGAL: System shall process authentication data per GDPR Article 6
  Kano: LEGAL
  Method: READ
  Acceptance: Data processing agreement documented, user consent obtained

REQ-042-PERF: Authentication token shall expire within 30 minutes for security
  Kano: PERFORMANCE
  Method: TALK (with security team)
  Acceptance: Token lifetime configurable, default 15 minutes

DESIGN-042: System design shall use OAuth2 with JWT tokens
  Type: DESIGN_DECISION (not requirement)
  ADR: ADR-023-oauth2-jwt-selection.md
  Rationale: Industry standard, interoperable, stateless
```

#### Anti-Pattern 3: Business Logic in UI

**Vienna Transit Case Study:**

**Problem:**

- Display board interface bundled destination data + promotional messages
- Apps parsing destinations suddenly showed "Save the Climate" as train destination
- Production failure in public transit system

**Root Cause: Concern Mixing**

```
Interface IDisplayBoard:
  GetContent() -> List[String]  // returns mix of destinations and ads
```

**Apps assumed all strings were destinations (violation of concern separation)**

**Solution: Interface Segregation**

```
Interface IDestinationProvider:
  GetDestinations() -> List[Destination]  // operational data only

Interface IPublicMessageProvider:
  GetMessages() -> List[Message]  // promotional data only

// Display boards use both
// Apps use only IDestinationProvider
```

**Lesson:** **Mix different data types in one interface → clients cannot opt out → unexpected failures**

### Historical Context and Evolution

**Timeline:**

- **1968:** NATO Software Engineering Conference - "Software Crisis" identified
    - Recognizes complexity management as core challenge

- **1972:** David Parnas - "On the Criteria to be Used in Decomposing Systems into Modules"
    - **Primary contribution:** Decompose by "secrets" (information hiding)
    - Each module hides a design decision
    - Separation enables independent evolution

- **1974:** Edsger Dijkstra - "On the role of scientific thought"
    - Formalizes "Separation of Concerns" term
    - Establishes as fundamental cognitive principle

- **1979:** Trygve Reenskaug - MVC Pattern
    - Separates Model-View-Controller
    - Enables UI evolution without business logic changes

- **1984:** Noriaki Kano - Kano Model
    - Classifies requirements by satisfaction type
    - Enables separate elicitation methods

- **1994:** Gang of Four - Design Patterns
    - Strategy, Adapter, Bridge patterns all implement concern separation

- **2003:** Eric Evans - Domain-Driven Design
    - Separates Domain Layer from Infrastructure
    - Bounded Contexts separate linguistic concerns

- **2012:** Robert C. Martin - Clean Architecture
    - Formalizes TYPE_A / TYPE_T separation as "Dependency Rule"
    - Inner circles (business) independent of outer circles (technology)

### Relationship to Other Principles

**Separation of Concerns ENABLES:**

- **Single Responsibility Principle (SRP):** Each component one concern
- **Open-Closed Principle (OCP):** Extend without modifying (concerns isolated)
- **Interface Segregation (ISP):** Separate interfaces for separate concerns

**Separation of Concerns REQUIRES:**

- **Abstraction:** Define clear boundaries between concerns
- **Dependency Inversion:** Concerns depend on abstractions, not concretions

**Separation of Concerns CONFLICTS WITH:**

- **YAGNI (You Aren't Gonna Need It):** If concerns not yet separated, don't separate prematurely
- **Trade-off:** Early separation → upfront cost; Late separation → refactoring cost

### Empirical Evidence

#### Study 1: Mockus et al. (2000)

**"Separating Business Logic Reduces Propagation of Changes by 64%"**

- Dataset: 5 large systems (200K-500K LOC)
- Measurement: Change propagation analysis
- Finding: Components with separated concerns had 2.8x fewer cascading changes
- Conclusion: Separation reduces maintenance cost by ~60%

#### Study 2: NASA Software Engineering Handbook

**"Information Hiding Required for Level A (Critical) Software"**

- Requirement: All safety-critical modules must hide design decisions
- Rationale: Reduces coupling, limits change propagation
- Result: 10x reduction in certification effort

#### Study 3: Bjorna Kalaja (2024)

**"Good Software Architecture Reduces Energy Consumption"**

- Finding: Well-separated architectures use 23% less energy
- Mechanism: Reduced coupling → less data transfer → less computation
- Environmental impact: Good architecture → sustainable software

### Further Reading

**Primary Sources:**

- Dijkstra, E. W. (1974). "On the role of scientific thought"
- Parnas, D. L. (1972). "On the Criteria to be Used in Decomposing Systems into Modules". *Communications of the ACM*
  15 (12)
- Martin, R. C. (2012). "Clean Architecture: A Craftsman's Guide to Software Structure and Design"

**Case Studies:**

- [EarlyBird: A/T Separation Enables Technology Migration](#earlybird-case-study)
- [Vienna Transit: ISP Violation Causes Production Failure](#vienna-transit-case-study)
- [MateMate: Interface Enables Algorithm Evolution](#matemate-case-study)

---

## Locality and Cohesion {#locality-and-cohesion}

### The Principle

**Locality:** Related elements should be physically close
**Cohesion:** Elements within a unit should be strongly related

> "Things that change together should be packaged together" - Robert C. Martin (Common Closure Principle)