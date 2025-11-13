# SOFTWARE ARCHITECTURE STRATEGIES

## CORE ARCHITECTURE COMPETENCIES

A software architect must master four key areas:

1. **The Importance of Architecture** - Understanding what architecture is and why it matters
2. **Architectural Quality** - Recognizing good architecture
3. **Architecture Development** - Methods to create good architectures
4. **Architecture Documentation** - Effectively communicating architecture decisions

**Core Definition:** Architecture = the technical decisions that are hard to change

*"Big design up front is dumb. No design up front is even dumber." - Dave Thomas*

---

## SOFTWARE BLOOD TYPES - FUNDAMENTAL SEPARATION

The most critical architectural principle: separate application logic from technology concerns.

### TYPE A (APPLICATION/BUSINESS)

- Implements **functional requirements** from the business domain
- Should NOT "know" about: OS, web frameworks, databases, UI technologies
- Examples: Order validation, price calculation, business rules
- Color: Purple in diagrams

### TYPE T (TECHNOLOGY/INFRASTRUCTURE)

- Implements **non-functional requirements**
- Handles: databases, web servers, message queues, OS interaction
- Examples: HTTP handlers, database adapters, logging infrastructure
- Color: Blue in diagrams

### TYPE 0 (UNIVERSAL/ETERNAL)

- "Eternal truths of computer science"
- Examples: string manipulation, math libraries, differential equation solvers
- Minimal change expected
- Color: Orange in diagrams

**CRITICAL RULE:** Building blocks must be A OR T, never both!

**Application Core Pattern:**

- Core = A-software only (grows with functional scope)
- Ring = T-software around core (size stays constant)
- Foundation of Clean Architecture and Domain-Driven Design

**Microservices Principle:** Microservices are A-services, not T-services. "Built around business capabilities" (Martin
Fowler)

---

## ARCHITECTURAL QUALITY PRINCIPLES

### 1. COHESION PRINCIPLES

**Single Responsibility Principle (SRP)**

- Each building block does ONE job only
- Can describe in simple sentence without "and" or "or"
- "Responsible to one and only one actor" - Robert C. Martin
- **Test:** If you can't describe it simply, split it

**Separation of Concerns (SOC)**

- Each building block has one concern
- Applies to: components, if-statements, branches, databases, sprints, prompts

**Don't Repeat Yourself (DRY)**

- Each job implemented only once
- "Designs without duplication tend to be easy to change" - Kent Beck

**Cohesion Applied Everywhere:**

- **Code:** Extract till you drop - small functions with one purpose
- **Git Branches:** Use Gitflow - one feature per branch
- **Databases:** Normalize - eliminate redundancy
- **Sprints:** One sprint goal, coherent work
- **Prompts:** Chain prompting - one task per prompt

---

### 2. COUPLING PRINCIPLES

**Low Coupling Goal**

- "Check and minimize dependencies. Each avoided dependency is a victory" - Siedersleben
- "Coupling is what kills all software" - Ian Cooper
- "The bulk of software design is managing dependencies" - Kent Beck

**Ripple Effect Management:**

- Changes propagate along dependencies ("Lawineneffekt")
- Use dependency firewalls to block propagation
- Perform impact analysis before changes

**Good Architecture = Weakly Coupled + Strongly Cohesive**

- Many local dependencies (within components)
- Few non-local dependencies (between components)

---

### 3. ACYCLIC DEPENDENCIES PRINCIPLE (ADP)

**No cycles allowed in architecture!**

Cycles mean components must be:

- Understood together
- Changed together
- Tested together
- Deployed together

**Detection:** Use dependency analysis tools to find and break cycles

---

### 4. COMMON CLOSURE PRINCIPLE (CCP)

**Definition:** "Things that change together should be in the same module"

**Original:** "A change that affects a package affects all the classes in that package" - Robert C. Martin

**Extended:** Typical change request should affect FEW building blocks, not many

**Key Insight:** Put code with same change rate in same building block

---

### 5. COMMON REUSE PRINCIPLE (CRP)

**Principle:** Put frequently reused-together items in one building block

**Benefit:** Splitting reduces impact analysis scope

**Example:** Don't bundle rarely-used utilities with frequently-used core logic

---

### 6. TELL DON'T ASK (TDA)

**Core OOP Principle:** Move behavior close to data

**Bad (Ask):**

```
temperature = sensor.getTemperature()
if temperature > threshold:
    regulator.turnOn()
```

**Good (Tell):**

```
sensor.regulate(threshold, regulator)
```

**Result:** Data doesn't travel through system. Compute at source.

---

## INTERFACE DESIGN PRINCIPLES

### Decoupling Through Interfaces

**Greatest Invention in Computer Science:**

- Split into: interface (what others need) + implementation (hidden)
- Information hiding
- Enables independent evolution

**Change Management Value:**

- New consumer: no provider change needed
- New provider: no consumer change needed
- Firewalls against change propagation

### Interface Quality Criteria

**Not Underspecified:**

- Specify everything needed for cooperation
- Include: syntax, semantics, error handling, performance

**Not Overspecified (Minimal):**

- Need-to-know principle only
- Allow maximum freedom to evolve
- Can be under- AND over-specified simultaneously!

**Most Important:** "Easy to use correctly, hard to use incorrectly" - Scott Meyers

### Interface Changes

**AVOID INTERFACE CHANGES!**

- Trigger big ripple effects
- Backward compatibility is "guiding principle" (Kent Beck)
- No changes to existing promises, only additions
- Common practice in microservices

### Interface Segregation Principle (ISP)

**Prefer several small interfaces over one big interface**

**Advantages:**

1. Independent deployment, smaller deployments
2. Independent access rights per interface
3. Better testability

**Applications:**

- Separate admin from operation interfaces
- Separate test-only interfaces
- Limited Access Principle (LAP): Each client accesses only needed services

### Interface Blood Types

**A-Interface (Good):**

- Uses domain language (promoteToVIP, blacklist)
- Uses business concepts
- Technology-free

**T-Interface (Bad for A-components):**

- Technology-specific (writeToDB2, saveToRedis)
- Couples A to T

**0-Interface (Universal):**

- Technology-free abstractions (persist, save)
- Safe for A-components to depend on

**Rule:** A-components depend on A-interfaces and 0-interfaces, NOT T-interfaces

**Dependency Inversion:** Introduce abstractions to reverse dependencies on concrete implementations

---

## ARCHITECTURE DEVELOPMENT METHODS

### 1. USE CASE DRIVEN DEVELOPMENT

**Primary Use Cases:** Services to external actors (e.g., Transfer Funds)
**Secondary Use Cases:** Services between building blocks (e.g., Identify Card)

**Service Elicitation from Requirements:**

```
Requirement: "Order OK if ≤100 items and no alcohol for minors"
Secondary Services:
  - CheckOrder(Order)
  - ContainsAlcohol(Product)
  - IsAdult(Customer)
```

**Packaging Goal:** Minimize arrows between packages (arrows need interfaces)

---

### 2. DOMAIN DRIVEN DESIGN (DDD)

**Three Core Principles:**

1. Focus on the core domain
2. Collaborate with domain practitioners
3. Speak ubiquitous language within bounded context

**Bounded Contexts:** Linguistically defined boundaries

- "Customer" means different things in Marketing vs. Delivery contexts

**Finding Aggregates via:**

- Existence dependence/compositions
- Global search patterns
- Transactional business rules
- Navigable relationships

**Aggregate Canvas:** Document A-components with: name, description, lifecycle, business rules, services, events

---

### 3. CRUD MATRIX APPROACH

**Steps:**

1. Create matrix: services (rows) × classes (columns)
2. Mark CRUD operations (Create, Read, Update, Delete)
3. Exchange rows/columns to move filled cells near diagonal
4. Define components as diagonal squares
5. Maximize letters inside squares (cohesion), minimize outside (coupling)

**Quality Metric:** Cohesion / Coupling ratio

- Example: 12 intra-component cells / 3 inter-component cells = 4.0 (good)

---

### 4. EVOLUTIONARY COUPLING REFACTORING

**Measure:** Which components changed together in past?

- Example: Components "ord" and "gos" changed together 96% of time

**Refactoring Strategies:**

- Split building blocks with different change rates
- Merge blocks with strong evolutionary coupling
- Requires good change management system

---

### 5. AI/EMBEDDING APPROACH

**Modern Method:**

1. Feed functional requirement embeddings into vector database
2. Cluster requirements automatically
3. Each cluster → one component
4. LLM generates cluster names

---

## ARCHITECTURE DOCUMENTATION APPROACHES

### The Four Standard Views

1. **Meta View:** Types of parts (class diagram, metamodel)
2. **Structure View:** Parts and connections (component/class diagram)
3. **Behavior View:** Runtime cooperation (sequence/activity diagram)
4. **Network View:** Distribution on network (deployment diagram)

**Metamodel Importance:** "Common vocabulary to describe software architecture" - Simon Brown

- Define: component, system, layer, module consistently

---

### C4 MODEL (Simon Brown)

**Four Levels of Abstraction:**

1. **Context Diagram:** System and its interfaces to external actors
2. **Container Diagram:** Big T-building blocks (web server, database, message queue)
3. **Component Diagram:** Big A-building blocks (business components)
4. **Class Diagram:** Detailed design within components

**Plus:** Communication diagrams for dynamic behavior

**Principle:** Each level zooms into the previous level

---

### arc42 FRAMEWORK

Free template at http://www.arc42.org/

**12 Essential Sections:**

1. **Functional Requirements** - Use cases
2. **Constraints** - Technical, organizational, legal limitations
3. **Business Context** - External interfaces and partners
4. **Solution Strategy** - Key decisions and patterns
5. **Building Block View** - Blackbox/Whitebox decomposition
6. **Runtime View** - Cooperation scenarios
7. **Deployment View** - Infrastructure mapping
8. **Cross-Cutting Concepts** - Recurring patterns (logging, security, error handling)
9. **Architecture Decisions** - ADRs (Architecture Decision Records)
10. **Quality Scenarios** - Test cases including non-functional requirements
11. **Risks** - Technical debt, known issues
12. **Glossary** - Ubiquitous language

**Architecture Decision Records (ADR) Format:**

- Context and problem statement
- Options considered with pros/cons
- Decision made
- Rationale and consequences

---

### Documentation Best Practices (Simon Brown)

- ✅ Consistent notation and positioning
- ✅ Similar abstraction levels within diagram
- ✅ Explain all notation used
- ✅ Use color/shape to complement, not replace labels
- ✅ Favor unidirectional lines with annotations
- ✅ Narrative complements diagram, doesn't just explain it
- ✅ Use icons to supplement text
- ✅ Documentation constantly evolves (not write-once)

---

## ARCHITECTURE EVALUATION METHODS

### Initial Reviews

**1. Checklist-Based Review**

- Verify architectural quality principles (SRP, ADP, CCP, blood types)
- Requires: component diagram with A/T information

**2. Scenario-Based Review**

- Walk through use cases step-by-step
- Verify components can perform use case across interfaces
- Requires: use case diagram/list + component diagram

**3. CRUD Analysis**

- Evaluate ratio: CRUD-cells within components / CRUD-cells between
- Higher ratio = better quality

**4. Reusability Test**

- "What can be sold separately?"
- Example: Chess engine reusable for Go? Puzzle solver?

### Later Reviews - Compliance Checking

**Automated Violation Detection:**

- Script finds allowed-to-use violations
- Resolution: move logic between components
- Requires: documented allowed-to-use specification

---

## COMMUNICATION STYLES

**Key Decisions for Interfaces:**

1. **Wait or continue?** → Synchronous / Asynchronous
2. **Session bundling?** → Stateful / Stateless
3. **Transaction support?** → Transactional / Not transactional
4. **Work per call?** → Fine-grained / Coarse-grained
5. **Location?** → Local / Network

**Coupling Impact:**

- More coupled: synchronous, stateful, transactional, fine-grained, local
- Less coupled: asynchronous, stateless, not transactional, coarse-grained, network

**Performance Tip:** Use coarse-grained interfaces for network calls

---

## ALLOWED-TO-USE SPECIFICATION

**Definition:** Information about allowed/forbidden dependencies between components

**Enforcement:**

- Ex ante: Permission requests before coding
- Ex post: Source code scanning tools

**Common Patterns:**

**Layered Architecture:**

- Building block n cannot use lower-numbered blocks
- Example: Book(1), Librarian(2), BookShelf(3)

**Strictly Layered:**

- Building block n only uses n-1

**Benefits:**

- Better testability (fewer stubs/drivers needed)
- Controlled dependency management
- Easier change impact analysis

---

## KEY ANTI-PATTERNS TO AVOID

1. **Mixing A and T:** A-component knowing about databases, web frameworks
2. **A-person receiving T-messages:** Error codes instead of user-friendly messages
3. **CRUD language in A-software:** "Create Employee" instead of "Hire Employee"
4. **Cyclic dependencies:** Components tightly bound together
5. **Conway's Law inversion:** Let orgchart determine architecture (should be opposite!)
6. **Underspecified interfaces:** Missing necessary cooperation information
7. **Overspecified interfaces:** Too much detail, prevents evolution

---

## ADDITIONAL CRITICAL PRINCIPLES

### Stable Dependencies Principle (SDP)

Better to depend on low-change-rate building blocks than high-change-rate ones
**Requires:** Requirements stability classification

### Stable Abstractions Principle (SAP)

Abstract building blocks should have lower change rates than concrete ones
**Example:** "Person" changes less than "Patient"

### Separate Normal from Exception Processing

Don't mix normal behavior and exception handling in same code paths
**Use cases:** Include (normal) vs. Extend (exceptional)

### Balance Principles

- **Interface-Implementation Imbalance:** Interface much smaller/simpler than implementation
- **Building Block Balance:** Avoid one big block + many small blocks

### Ubiquitous Language

Naming in A-architecture uses EXACTLY the terminology of the requirements
**Foundation:** Domain-Driven Design

### Environmental Impact

Good software architectures need less energy (Research: Bjorna Kalaja, 2024)

---

## COMMAND QUERY SEPARATION PATTERNS

### CQS (Command Query Separation) - Method Level

Each method either:

- Reads attributes and returns value, OR
- Changes state and returns nothing

**Never both!**

### CQRS (Command Query Responsibility Segregation) - Building Block Level

Separate building blocks for:

- Commands (write operations)
- Queries (read operations)

**Benefits:** Independent scaling, optimization, and security models

---

## CASE STUDIES WITH ARCHITECTURAL LESSONS

### EarlyBird: Breakfast Delivery System

**Business Context:**
A food delivery company guaranteeing breakfast delivery in <25 minutes. Customers order prepackaged or custom
breakfasts (croissants, coffee, eggs, etc.). Orders are placed, packed, delivered, and paid for.

**Evolution Challenge:**
Originally phone-based ordering with manual text processing for labels/invoices and spreadsheets for route optimization.
Now moving to web-based automation with SMS ordering capability.

**Key Architectural Lessons:**

1. **A-Software vs T-Software Separation**
    - **A-Components:** Order, Product, Customer, Invoice, Itinerary (business logic)
    - **T-Components:** Web interface, SMS gateway, payment system integration, printer management
    - **Why it matters:** When changing from phone to web to SMS, A-components stay stable. Only T-components change.

2. **Interface Segregation in Practice**
    - **ISearchProduct interface:** Search by characteristics (calories, price) - used by both web UI and phone system
    - **Separate interfaces for:** OrderPlacement, ProductCatalog, CustomerAuthentication, PaymentIntegration
    - **Lesson:** Multiple small interfaces allow independent evolution of ordering channels

3. **Domain-Driven Design Aggregates**
    - **Order Aggregate:** Order (root) → OrderItems → Products, with business rules:
        - "Order total = sum of all OrderItem values"
        - "No alcohol orders for minors (5 min violation acceptable)"
    - **Customer Aggregate:** Customer (root) → Address, Password, OrderHistory
    - **Lesson:** Aggregates enforce business rules at boundaries, protecting invariants

4. **External System Integration**
    - Payment system receives interface records: `{customerNumber, orderNumber, amountInEuros, expectedDate}`
    - **Anti-coupling pattern:** EarlyBird doesn't know HOW payment processes, just sends expected payment records
    - **Lesson:** Use coarse-grained interfaces with minimal data for external integrations

5. **Evolution Without Breaking**
    - Original: phone ordering → labels printed manually
    - Future: web/SMS ordering → automated label generation
    - **Architecture allows:** Both systems run simultaneously during transition
    - **Lesson:** Good architecture enables gradual migration, not big-bang rewrites

**Practical Takeaway:**
When phone clerks are eliminated, only T-layer changes. A-layer (Order, Product, Customer logic) remains unchanged. This
is the power of blood type separation.

---

### Mars: Moon Visibility Calculator

**Business Context:**
NASA Mars mission measuring gravitational wave interference. Measurements only work when both moons (Deimos and Phobos)
are simultaneously visible. Must calculate time-overlap of two time intervals to decide if powering up measurement
equipment is worth the energy cost.

**Technical Challenge:**
Mars day = 88,775 Earth seconds. Simplified to 25 Mars-hours × 100 Mars-minutes. Intervals can wrap around midnight (
e.g., [24:44, 7:50] means rise at 24:44, set at 7:50 next day).

**Key Architectural Lessons:**

1. **Pure Application Core Example**
    - **Input:** Two Mars-intervals: D[13:91, 23:05], P[22:05, 24:45]
    - **Output:** Integer (overlap in Mars-minutes) → 100 minutes
    - **A-Software:** Interval calculation logic (completely technology-free)
    - **T-Software:** Minimal - just interface to NASA's experiment coordination system

2. **Separation of Core Logic from Interface**
    - **On Mars:** No GUI, called directly by NASA experiment software (production T-interface)
    - **On Earth:** Needs HCI for testing (test T-interface)
    - **Architecture:** Core calculation component has ZERO knowledge of how it's invoked
    - **Lesson:** Same A-component works in production (automated) and testing (manual) without modification

3. **Software Blood Type 0 (Universal Truth)**
    - Time interval overlap calculation is universal mathematics
    - Works on Earth, Mars, or any planet
    - No business context, no technology context
    - **Lesson:** Identify Type-0 components - they're infinitely reusable

4. **Twilight Rule: Edge Case Handling**
    - Requirement: "If intervals touch at one point, return 1 minute, not 0"
    - Example: D[12:32, 17:06], P[17:06, 19:78] → 1 minute overlap
    - **Lesson:** Edge cases are A-requirements, must be in A-layer specifications

5. **Testability Through Interface Design**
    - Same function signature for production and test interfaces
    - Test interface adds HCI wrapper around core calculation
    - Production interface adds NASA system adapter around core calculation
    - **Lesson:** Design A-core with clean interface, wrap with different T-adapters

**Practical Takeaway:**
Mars demonstrates the ultimate goal: application core so pure it works anywhere with any interface. Four cohesive
A-components calculate overlap. Zero knowledge of NASA systems, GUIs, or even Earth vs. Mars context.

---

### MateMate: Chess Application Evolution

**Business Context:**
Chess software playing against humans, calculating optimal moves by evaluating positions and thinking ahead.

**Key Architectural Lessons:**

1. **Service Elicitation from Requirements**
    - Identified 20 secondary services from chess rules:
        - **Core:** `CalculateOptimalMove()`, `EvaluatePosition()`, `DetectCheckmate()`
        - **Input:** `ScreenPositionToSquare()`, `ParseMove()`
        - **Output:** `DrawPiece()`, `HighlightSquare()`
    - **Lesson:** Use case analysis reveals secondary services that become component interfaces

2. **Software 1.0 → Software 2.0 Evolution**
    - **Version 1.0:** Traditional evaluation function (handcrafted heuristics: material, position, king safety)
    - **Version 2.0:** Stockfish neural network (learned evaluation)
    - **Architecture win:** Evaluation component has `IPositionEvaluator` interface
    - **Result:** Swap implementations without touching move generation, UI, or game rules
    - **Lesson:** Unstable requirements (evaluation algorithm) hidden behind stable interface

3. **SE4 Method: Service → Subsystem → Evaluation**
    - **Step 1:** Elicit services from requirements (20 services identified)
    - **Step 2:** Package services into cohesive subsystems (Move Generation, Position Evaluation, UI, Game State)
    - **Step 3:** Evaluate architecture (walk through use cases, check CRUD matrix)
    - **Lesson:** Systematic method prevents ad-hoc design

4. **Reusability Test: What Can Be Sold Separately?**
    - Chess engine (position evaluation, move generation) → Reusable for chess puzzle solver
    - Game history tracking → NOT reusable for puzzles (no game to track)
    - **Decision:** Separate ChessEngine from GameHistory components
    - **Lesson:** Reusability analysis drives component boundaries

**Practical Takeaway:**
When AlphaZero beats Stockfish, it's just swapping one IPositionEvaluator implementation for another. UI, rules, move
generation unchanged. This is CCP + ISP in action.

---

### Industry Anti-Pattern: Charts Component Duplication

**What Happened:**

1. **Common Core** contained financial calculations needed by Product1 and Product2
2. **Chart functionality** (bar chart, pie chart) added for Product1 → created Charts component
3. Product2 needs charts → **Charts sources COPIED** into Charts2 component
4. Charts2 massively enhanced → **iChart2 interface changed** (new mandatory attributes)
5. **Problem:** Product1 can't use new charts without rewriting to new interface

**Architectural Principles Violated:**

1. **DRY (Don't Repeat Yourself):** Chart logic duplicated instead of shared
2. **CRP (Common Reuse Principle):** Chart features used together weren't packaged together from start
3. **ISP (Interface Segregation):** One big interface forced breaking changes on all clients
4. **Downward Compatibility:** Breaking old interface instead of extending it

**What Should Have Been Done:**

1. **Shared IChartRenderer interface** with basic operations
2. **Two implementations:** BasicCharts (for Product1), AdvancedCharts (for Product2)
3. **Both products use same interface** → either implementation works
4. **New features:** Extend interface with new optional methods, don't break existing ones

**Lesson:** Copying code instead of sharing components is technical debt. Eventually forces coordination across copies
or abandons old clients.

---

### Vienna Transit Boards: ISP Violation

**What Happened:**
Vienna's public transit destination boards showed "Save the Climate" messages mixed with actual destinations. Apps
parsing destination data suddenly showed "Save the Climate" as a train destination.

**Root Cause:**
Display interface bundled:

- Destination information (operational data)
- Climate awareness messages (promotional data)

**ISP Violation:**

- Apps needed destination data only
- Forced to receive promotional messages through same interface
- No way to filter different data types

**Solution:**

- **IDestinationProvider:** Provides only destination/arrival data
- **IPublicMessageProvider:** Provides promotional messages
- Display boards use both; apps use only IDestinationProvider

**Lesson:** Mix different concerns in one interface → clients can't opt out of irrelevant data → unexpected failures
when data format changes

---

### Evolutionary Coupling: Components Changing Together 96%

**Observation:**
Components "ord" (Orders) and "gos" (GoodsOnShelf) changed together in 96% of commits over 2 years.

**Analysis:**

- Originally designed as separate components
- Reality: Every order change required inventory update
- Every inventory update required order status change
- **High evolutionary coupling** despite architectural separation

**Refactoring Decision:**
**Merge into OrderInventory component** because:

- CCP violated: changing together but not packaged together
- High coordination overhead between teams
- Integration bugs from interface changes

**Lesson:** Architecture should follow empirical change patterns. Version control reveals coupling that design documents
hide.

---

### Allowed-to-Use Violations in Production

**Automated Scan Found:**

- OrderExecution component using CustomerManagement component
- Violates architecture rule: "OrderExecution → ProductCatalog only"
- Specific violation: SOG subcomponent in OrderExecution using SON subcomponent in CustomerManagement

**Why It Happened:**

- Developer needed customer credit check during order processing
- Instead of requesting CustomerManagement expose ICreditCheck interface to OrderExecution
- Directly called internal CustomerManagement methods
- **Result:** Hidden dependency, bypassed architectural governance

**Resolution:**
Move `CreditCheck` logic from CustomerManagement to SharedServices component that both OrderExecution and
CustomerManagement can legally use.

**Lesson:** Without automated architecture compliance checking, violations accumulate. Technical debt grows invisible
until system becomes unmaintainable.

---

## WHAT THESE CASE STUDIES TEACH

**From EarlyBird:** A/T separation enables technology migration without touching business logic

**From Mars:** Pure application cores work anywhere with any interface

**From MateMate:** Unstable algorithms behind stable interfaces enable evolution

**From Vienna Transit:** ISP violations cause production failures in unexpected places

**From Evolutionary Coupling:** Design intent ≠ change reality. Measure actual coupling, refactor accordingly.

**From Compliance Violations:** Architecture erosion is invisible without automated governance

---

## PRACTICAL RECOMMENDATIONS FOR ARCHITECTS

1. **Always Separate A and T**
    - First question: Is this A-software or T-software?
    - Never mix in same component

2. **Design for Change**
    - Use CCP: things that change together belong together
    - Use CRP: things reused together belong together
    - Classify requirements by stability

3. **Minimize Dependencies**
    - Each avoided dependency is a victory
    - Use dependency inversion for A→T dependencies
    - Keep allowed-to-use specification

4. **Document Multiple Views**
    - Context, Container, Component, Class (C4)
    - Structure, Behavior, Network views
    - Use consistent notation

5. **Review Systematically**
    - Checklist-based (principles)
    - Scenario-based (use cases)
    - CRUD analysis (cohesion/coupling ratio)
    - Automated compliance checking

6. **Use Ubiquitous Language**
    - A-interfaces use domain terms only
    - Avoid CRUD language in business layer
    - Maintain glossary with requirements team

7. **Embrace Modern Methods**
    - AI/embeddings for component clustering
    - Evolutionary coupling analysis
    - Automated architecture validation

8. **Record Decisions**
    - Use ADRs (Architecture Decision Records)
    - Document options, decision, rationale
    - Maintain in version control

9. **Focus on the Core**
    - Application core (A) grows with features
    - Technical ring (T) stays relatively constant
    - Most architecture courses wrongly focus on T

10. **Think Long-Term**
    - Architecture = framework for change (Tom DeMarco)
    - Maintenance = 75% of software cost
    - Good architecture → high changeability → low maintenance → long life

---

## TIMELESS WISDOM

*"The rules of software architecture are universal and changeless. They have been the same since Alan Turing wrote the
first code in 1946."* - Robert C. Martin

*"On the Criteria to be Used in Decomposing Systems into Modules" (David Parnas, 1972) - still relevant today*

*"Architecture = the technical decisions that are hard to change"*

*"The code doesn't tell the whole story."* - Simon Brown

---

## FURTHER READING

**Essential Books:**

- **Eric Evans:** Domain-Driven Design (2003)
- **Robert C. Martin:** Clean Architecture
- **Simon Brown:** Software Architecture for Developers
- **Vaughn Vernon:** Implementing Domain-Driven Design
- **John Ousterhout:** A Philosophy of Software Design
- **Johannes Siedersleben:** Moderne Software-Architektur
- **Nicolai Josuttis:** SOA in Practice

**Key Articles:**

- Martin Fowler: Microservices (martinfowler.com/articles/microservices.html)
- Cesare Pautasso et al.: Microservices in Practice (IEEE Software 2017)

**Frameworks & Templates:**

- arc42.org - Free architecture documentation template
- C4 Model - c4model.com
- iSAQB - International Software Architecture Qualification Board

---
