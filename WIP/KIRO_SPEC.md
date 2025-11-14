# Kiro: Technical Specification

**Purpose:** Requirements Engineering Tool - Transforms functional requirements into semantic model for architecture derivation

**What Kiro IS:** Semantic requirements processor and clustering engine
**What Kiro IS NOT:** Architecture decision maker, code generator, or implementation tool

---

## 🎯 Core Principle

Kiro sitzt **direkt vor** dem eigentlichen Spec-Driven-Development-Flow. Es macht:

✅ **Requirements Engineering** - Text zu semantischem Modell
✅ **Clustering** - Semantische Gruppen für Architektur-Kandidaten
✅ **Visualization** - Greifbare Landkarte der Requirements

❌ **KEINE Architektur-Entscheidungen** - Mensch entscheidet
❌ **KEIN Code** - Nur Vorschläge, keine Implementierung
❌ **KEINE Magie** - Deterministisch, nachvollziehbar

---

## 📂 Repository Structure

```
project-root/
├── requirements/
│   └── functional.json          # INPUT: Strukturierte Requirements
│
├── out/
│   ├── embeddings.json          # CACHE: Vektorrepräsentation
│   ├── clusters.json            # OUTPUT: Cluster-Zuordnung
│   └── clusters.png             # OUTPUT: 2D-Visualisierung
│
└── architecture/
    ├── ARCHITECTURE.md          # HUMAN: Architektur-Entscheidung
    └── Subsystem_*.md           # HUMAN: Detail-Spezifikationen
```

---

## 📋 Input Format: `requirements/functional.json`

### Structure

```json
{
  "project": "EarlyBird",
  "version": "1.0",
  "glossary": {
    "Customer": {
      "definition": "Individual who places breakfast orders",
      "synonyms": ["User", "Client"]
    },
    "Order": {
      "definition": "Collection of products for delivery"
    }
  },
  "requirements": [
    {
      "id": "REQ-001",
      "text": "The system must guarantee breakfast delivery in less than 25 minutes to all parts of the city",
      "kano_type": "Performance",
      "tags": ["delivery", "performance"],
      "priority": "High"
    },
    {
      "id": "REQ-002",
      "text": "Customer must be able to place orders via phone by providing customer number",
      "kano_type": "Basic",
      "tags": ["ordering", "phone"],
      "priority": "High"
    }
  ]
}
```

### Quality Rules (enforced beim Schreiben)

✅ **Aktive Stimme**
- ✅ "Customer must be able to place orders"
- ❌ "Orders can be placed by customers"

✅ **Explizite IF/ELSE-Bedingungen**
- ✅ "If customer is blacklisted, then order must be rejected"
- ❌ "Orders should be checked somehow"

✅ **Keine always/never-Floskeln**
- ✅ "Order must have at least one item"
- ❌ "Orders always contain products"

✅ **Fachbegriffe im Glossar**
- ✅ "Customer" → definiert im glossary
- ❌ "User" → ohne Glossar-Eintrag

---

## ⚙️ Kiro Workflow

### Command Line Interface

```bash
# Basic clustering with default k=12
dotnet run -- cluster requirements/functional.json

# Custom cluster count
dotnet run -- cluster requirements/functional.json --k 8

# Specify output directory
dotnet run -- cluster requirements/functional.json --k 12 --output out/
```

### Step-by-Step Process

#### **Step 1: Input Validation**

```
Input: requirements/functional.json
```

**What Kiro Does:**
1. Parses JSON structure
2. Validates each requirement against quality rules
3. Checks glossary references
4. Reports violations (does NOT auto-fix)

**Output:**
- ✅ Valid → Proceed to Step 2
- ❌ Invalid → Error report with line numbers, exit

**Example Error:**

```
ERROR: REQ-015 violates quality rules:
  - Passive voice detected: "can be ordered by customers"
  - Missing glossary entry: "delivery guy" (should be "DeliveryClerk")
  - Vague condition: "somehow" in constraint

Fix requirements/functional.json before running Kiro.
```

#### **Step 2: Embedding Generation (Deterministic)**

```
Check: out/embeddings.json exists?
```

**Case A: Cache EXISTS**

```bash
✓ Found embeddings cache: out/embeddings.json
✓ Loading 45 embeddings from cache
✓ No API calls needed
```

**Case B: Cache DOES NOT EXIST**

```bash
⚙ Generating embeddings for 45 requirements...
  [1/45] REQ-001 → embedding (1536 dimensions)
  [2/45] REQ-002 → embedding (1536 dimensions)
  ...
  [45/45] REQ-045 → embedding (1536 dimensions)
✓ Saved embeddings to out/embeddings.json
```

**Embedding Model:**
- Configured in project: `all-mpnet-base-v2` (or other agreed model)
- Output: 1536-dimensional vector per requirement
- Format: `double[][]` (array of arrays)

**Cache Format: `out/embeddings.json`**

```json
{
  "model": "all-mpnet-base-v2",
  "dimension": 1536,
  "embeddings": [
    {
      "requirement_id": "REQ-001",
      "vector": [0.123, -0.456, 0.789, ...]
    },
    {
      "requirement_id": "REQ-002",
      "vector": [0.234, -0.567, 0.890, ...]
    }
  ]
}
```

**Key Property: DETERMINISTIC**
- Same input → same output (cache prevents re-computation)
- No hidden randomness
- Reproducible builds

#### **Step 3: K-Means Clustering**

```
Input: embeddings (from cache or generated)
Parameter: k (from --k flag, default 12)
```

**Algorithm:**
- K-Means clustering with cosine distance
- Each requirement → exactly ONE cluster ID
- No orphans, no duplicates
- Output: cluster assignment per requirement

**Configuration:**

```bash
# Default k=12
dotnet run -- cluster requirements/functional.json

# Custom k=8
dotnet run -- cluster requirements/functional.json --k 8

# If no --k: use default (configurable in project)
```

**What Kiro DOES NOT do:**
- ❌ Choose k automatically (human decision)
- ❌ Recommend "optimal" k (no elbow method, silhouette analysis)
- ❌ Merge/split clusters based on "quality"

**Why:** Cluster count is an architectural decision (how many services/subsystems?), not a statistical optimization.

#### **Step 4: Output Generation**

**Output 1: `out/clusters.json`**

Machine-readable cluster assignment:

```json
{
  "project": "EarlyBird",
  "k": 12,
  "clusters": {
    "Cluster 0": ["REQ-017"],
    "Cluster 1": ["REQ-002", "REQ-007", "REQ-010"],
    "Cluster 2": ["REQ-001", "REQ-003", "REQ-013"],
    "Cluster 3": ["REQ-009", "REQ-011", "REQ-038"],
    "Cluster 4": ["REQ-014", "REQ-015", "REQ-016"],
    "Cluster 5": ["REQ-022", "REQ-024", "REQ-025"],
    "Cluster 6": ["REQ-018", "REQ-019", "REQ-020", "REQ-021", "REQ-023"],
    "Cluster 7": ["REQ-028", "REQ-029", "REQ-030"],
    "Cluster 8": ["REQ-031", "REQ-032", "REQ-033"],
    "Cluster 9": ["REQ-034", "REQ-037"],
    "Cluster 10": ["REQ-004", "REQ-005", "REQ-006"],
    "Cluster 11": ["REQ-011"]
  }
}
```

**Format:**
- Simple JSON object
- Cluster ID → Array of requirement IDs
- Tool-friendly (easy to parse by downstream tools)

**Output 2: `out/clusters.png`**

2D visualization using t-SNE dimensionality reduction:

```
1536 dimensions → 2 dimensions (t-SNE)
Each point = one requirement
Color = cluster ID
```

**Visualization Properties:**
- Points close together → semantically similar
- Same color → same cluster
- Helps human understand groupings visually

**What Kiro DOES NOT do:**
- ❌ Choose visualization method automatically
- ❌ Provide alternative visualizations (PCA, UMAP)
- ❌ Interpret clusters (that's human job)

**Why:** Visualization method is a display preference, not semantic decision.

---

## 🏗️ Architecture Phase (HUMAN DECISION)

After Kiro generates `out/clusters.json` and `out/clusters.png`, the **human architect** reviews and makes decisions.

### Review Process

1. **Open `out/clusters.png`**
   - Visual inspection: Do clusters make semantic sense?
   - Are requirements grouped logically?

2. **Read `out/clusters.json`**
   - Review requirement IDs per cluster
   - Check for split concepts (should be one cluster)
   - Check for merged concepts (should be separate)

3. **Make Decisions**
   - Name each cluster (e.g., "Order Management")
   - Merge clusters if needed (e.g., Cluster 0 + Cluster 11 → Customer Management)
   - Split clusters if needed (manual re-run with different k)
   - Define subsystem boundaries

### Output: `architecture/ARCHITECTURE.md`

```markdown
# EarlyBird Architecture

**Based on:** Kiro clustering (k=12, merged to 8 subsystems)
**Date:** 2025-01-15
**Status:** Approved

---

## Subsystems

### 1. Customer Management

**Clusters:** Cluster 0, Cluster 11 (merged)
**Requirements:** REQ-017, REQ-011, REQ-009, REQ-038
**Responsibilities:**
- Manage customer data and addresses
- Validate customer numbers (Luhn checksum)
- Blacklist management

**Provides:**
- `ICustomerValidator` (A-Type)

**Consumes:**
- None (no external dependencies)

**Rationale for Merge:**
Cluster 0 (addresses) and Cluster 11 (authentication) both deal with
customer identity and lifecycle. Combining them reduces coupling.

---

### 2. Order Management

**Clusters:** Cluster 1, Cluster 4 (merged)
**Requirements:** REQ-002, REQ-007, REQ-010, REQ-014, REQ-015, REQ-016
**Responsibilities:**
- Handle order placement (phone, web, SMS)
- Manage order lifecycle
- Blueprint save/load

**Provides:**
- `IOrderService` (A-Type)

**Consumes:**
- `CustomerManagement.ICustomerValidator`
- `ProductCatalog.IProductCatalog`

---

[... continue for all 8 subsystems ...]

---

## Allowed-to-Use Matrix

| From ↓ To →       | Customer | Order | Product | Delivery |
|-------------------|----------|-------|---------|----------|
| Customer          | -        | ❌    | ❌      | ❌       |
| Order             | ✅       | -     | ✅      | ❌       |
| Product           | ❌       | ❌    | -       | ❌       |
| Delivery          | ✅       | ✅    | ❌      | -        |

**Legend:**
- ✅ Allowed dependency
- ❌ Forbidden dependency
- `-` Self-reference

---

## Design Decisions

### Why merge Cluster 0 and Cluster 11?

**Decision:** Combine address management and customer authentication into
single "Customer Management" subsystem.

**Alternatives Considered:**
1. Keep separate (more microservices)
2. Merge into Order Management (rejected: wrong responsibility)

**Rationale:**
- Both deal with customer identity
- Reduces cross-service calls
- Simpler deployment

### Why 8 subsystems instead of 12?

**Decision:** Merge 12 Kiro clusters into 8 logical subsystems.

**Rationale:**
- 12 clusters too granular (operational overhead)
- 5 merges based on shared bounded context
- Maintains clear boundaries

---

**Sign-off:**
- [X] Architect: Alexander Nachtmann (2025-01-15)
- [ ] Team Lead (pending review)
- [ ] Security Review (pending)
```

### Optional: `architecture/Subsystem_OrderManagement.md`

```markdown
# Order Management - Detailed Specification

**Cluster IDs:** 1, 4
**Requirements:** REQ-002, REQ-007, REQ-010, REQ-014, REQ-015, REQ-016

---

## Requirements Detail

### REQ-002
> Customer must be able to place orders via phone by providing customer number

**Implication:**
- Phone interface adapter (T-Type)
- Customer number validation (uses CustomerManagement.ICustomerValidator)

### REQ-014
> Customers must be able to use a previous order as blueprint for a new order

**Implication:**
- Blueprint aggregate in domain model
- Repository for blueprint storage

---

## Domain Model

### Aggregates

**Order** (Root)
- OrderId (typed ID)
- CustomerId
- Status: Draft | Confirmed | InProgress | Delivered | Cancelled
- Items: List<OrderItem>

**Blueprint** (Root)
- BlueprintId (typed ID)
- CustomerId
- OriginalOrderId
- Items: List<BlueprintItem> (snapshot)

---

## Interfaces

### Provided: IOrderService (A-Type)

```csharp
public interface IOrderService
{
    Task<Result<OrderId>> CreateOrder(CreateOrderCommand command);
    Task<Result<Unit>> CancelOrder(OrderId orderId);
}
```

### Consumed

- `CustomerManagement.ICustomerValidator`
- `ProductCatalog.IProductCatalog`

---

[... detailed specs ...]
```

---

## 🔧 Downstream Tools (After Architecture Decision)

Once `architecture/ARCHITECTURE.md` is approved, downstream tools use Kiro's outputs:

### 1. Source Generators

**Input:**
- `requirements/functional.json` (domain terms)
- `architecture/ARCHITECTURE.md` (subsystem boundaries)

**Output:**
```csharp
// Auto-generated typed IDs
namespace EarlyBird.OrderManagement.Domain;

[GeneratedTypedId]
public readonly record struct OrderId(Guid Value);

[GeneratedTypedId]
public readonly record struct CustomerId(Guid Value);
```

### 2. Roslyn Analyzers

**Input:**
- `architecture/ARCHITECTURE.md` (allowed-to-use matrix)

**Output:**
```csharp
// Enforces architectural constraints at compile time
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class AllowedToUseAnalyzer : DiagnosticAnalyzer
{
    // Error ARCH001: OrderManagement cannot reference DeliveryManagement
}
```

### 3. NUKE Build Pipelines

**Input:**
- `architecture/ARCHITECTURE.md` (subsystem list, dependencies)

**Output:**
```csharp
// Auto-generated build targets
Target BuildCustomerManagement => _ => _
    .Executes(() => DotNetBuild(CustomerManagement));

Target BuildOrderManagement => _ => _
    .DependsOn(BuildCustomerManagement)  // From allowed-to-use
    .Executes(() => DotNetBuild(OrderManagement));
```

### 4. MCP Server

**Input:**
- `architecture/ARCHITECTURE.md` (subsystem specs)

**Output:**
```json
{
  "tools": [
    {
      "name": "validate-architecture",
      "description": "Check code against architecture.md rules"
    },
    {
      "name": "build-subsystem",
      "description": "Build specific subsystem with NUKE"
    }
  ]
}
```

---

## 🎯 What Kiro Provides to Downstream Tools

| Artifact | Format | Content | Consumers |
|----------|--------|---------|-----------|
| `functional.json` | JSON | Clean, validated requirements | Source generators, docs |
| `embeddings.json` | JSON | 1536-dim vectors | (cache only, rarely used directly) |
| `clusters.json` | JSON | Requirement → Cluster mapping | Visualizers, reports |
| `clusters.png` | PNG | 2D visualization | Human review |
| `ARCHITECTURE.md` | Markdown | **Human decisions** | All downstream tools |

**Key Insight:** Downstream tools do NOT read Kiro's clustering directly. They read the **human-approved architecture**.

---

## 🚫 What Kiro Does NOT Do

### ❌ No Architecture Decisions

**Kiro does NOT:**
- Decide how many microservices
- Name subsystems
- Define allowed-to-use relationships
- Choose technology stack

**Human architect does:**
- Reviews clusters
- Makes merge/split decisions
- Names subsystems
- Defines dependencies
- Documents rationale in `ARCHITECTURE.md`

### ❌ No Code Generation

**Kiro does NOT:**
- Generate C# code
- Create interfaces
- Write business logic
- Produce DTOs or commands

**Downstream tools do:**
- Source generators create typed IDs
- Analyzers enforce rules
- NUKE builds pipelines
- Claude/Cursor implements logic

### ❌ No Magic Interpretation

**Kiro does NOT:**
- "Understand" business domain
- Suggest optimal cluster count
- Recommend architecture patterns
- Auto-merge clusters based on "quality"

**Why:** These are human expertise and architectural judgment, not statistical optimization.

---

## 🔄 Complete Workflow Example

### Step 1: Write Requirements

```bash
$ cat requirements/functional.json
```

```json
{
  "requirements": [
    {"id": "REQ-001", "text": "System must deliver breakfast in <25 min"},
    {"id": "REQ-002", "text": "Customer must place orders via phone"},
    ...
  ]
}
```

**Quality Check:**
- ✅ Active voice
- ✅ Explicit conditions
- ✅ Glossary terms defined
- ✅ No vague language

### Step 2: Run Kiro

```bash
$ dotnet run -- cluster requirements/functional.json --k 12

⚙ Validating requirements...
✓ All 45 requirements pass quality rules

⚙ Checking embeddings cache...
✓ Found out/embeddings.json (skipping API calls)

⚙ Clustering 45 requirements into 12 clusters...
✓ Cluster 0: 1 requirement
✓ Cluster 1: 3 requirements
✓ Cluster 2: 4 requirements
...
✓ Cluster 11: 1 requirement

💾 Writing out/clusters.json
📈 Generating out/clusters.png

✅ Done! Review outputs:
  - out/clusters.json (machine-readable)
  - out/clusters.png (visualization)

Next steps:
  1. Review clusters visually (clusters.png)
  2. Review requirement groupings (clusters.json)
  3. Make architecture decisions (architecture/ARCHITECTURE.md)
```

### Step 3: Human Reviews

```bash
$ open out/clusters.png
```

**Architect thinks:**
- "Cluster 0 and Cluster 11 should merge (both customer-related)"
- "Cluster 1 and Cluster 4 should merge (both order-related)"
- "Cluster 6 is too big, maybe split? But let's start with 12→8 merge"

### Step 4: Human Documents Architecture

```bash
$ vim architecture/ARCHITECTURE.md
```

```markdown
# EarlyBird Architecture

## Subsystems

### 1. Customer Management
**Clusters:** 0, 11 (merged)
**Rationale:** Both handle customer identity

### 2. Order Management
**Clusters:** 1, 4 (merged)
**Rationale:** Order lifecycle + blueprints

...

## Allowed-to-Use Matrix
...

**Sign-off:** ✅ Approved by Alexander Nachtmann
```

### Step 5: Generate Guardrails

```bash
# Generate typed IDs
$ dotnet run --project tools/SourceGenerators

# Generate analyzers
$ dotnet run --project tools/AnalyzerGenerator

# Generate NUKE build
$ dotnet run --project tools/NukeGenerator
```

**Output:**
- Source generators: Typed IDs, DTOs
- Analyzers: Architectural constraint checks
- NUKE: Build pipeline with dependencies

### Step 6: Claude Implements

Claude Code uses MCP server to:

1. **Check architecture constraints**
   ```typescript
   const valid = await useMCPTool("validate-architecture", {
     service: "OrderManagement"
   });
   ```

2. **Implement use cases** (within guardrails)
   ```csharp
   // Claude writes this, analyzers prevent violations
   public class CreateOrderHandler : IRequestHandler<CreateOrderCommand>
   {
       private readonly ICustomerValidator _validator;  // ✅ Allowed
       // private readonly IDeliveryService _delivery;  // ❌ Forbidden (analyzer error)
   }
   ```

3. **Run tests and build**
   ```typescript
   await useMCPTool("build-subsystem", {
     service: "OrderManagement",
     target: "Test"
   });
   ```

---

## 📊 Summary: Kiro's Precise Role

| Phase | Kiro Role | Human Role | Output |
|-------|-----------|------------|--------|
| **Requirements** | Validate quality rules | Write functional.json | ✅ Valid requirements |
| **Embeddings** | Generate/cache vectors | Configure model | embeddings.json (cache) |
| **Clustering** | K-Means (k from CLI) | Choose k value | clusters.json + clusters.png |
| **Architecture** | ❌ No role | Review, merge, name, decide | ARCHITECTURE.md |
| **Guardrails** | ❌ No role | ❌ No role (generators read ARCHITECTURE.md) | Source generators, analyzers, NUKE |
| **Implementation** | ❌ No role | ❌ No role (Claude reads ARCHITECTURE.md + guardrails) | Production code |

**Key Principle:** Kiro stops after clustering. Everything else is human architectural decisions or downstream tool automation.

---

## 🎓 Course Alignment

From Dr. Martin Hasitschka's "Architecture Development":

> "Deciding on the main parts of the software and their usage relationships"

**Kiro provides:** Semantic clusters (potential "main parts")
**Human decides:** Actual parts and usage relationships (ARCHITECTURE.md)

> "Classes that change together should be packaged together" (CCP)

**Kiro provides:** Semantically similar requirements clustered
**Human validates:** Do these actually change together? (architectural judgment)

> "If we don't put CheckOrder, IsAdult and ContainsAlcohol into the same component, we get cross-component calls"

**Kiro provides:** Requirements mentioning these concepts clustered together
**Human decides:** Should they be same component? (documented in ARCHITECTURE.md)

---

**Conclusion:** Kiro ist ein **Werkzeug für Requirements Engineering**, kein Architektur-Autopilot. Es macht aus Text ein semantisches Modell und schlägt fachliche Schnitte vor. Die eigentliche Architektur-Arbeit – Namen geben, Grenzen ziehen, Abhängigkeiten festlegen – bleibt bewusst menschlich und wird transparent im Repository dokumentiert.
