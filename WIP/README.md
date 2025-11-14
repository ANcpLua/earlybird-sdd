# WIP: AI-Driven Requirements Engineering & Microservice Architecture

**Status:** Work in Progress
**Purpose:** Type-safe, spec-driven microservice architecture derived from semantic requirement clustering

---

## 🎯 Vision: From Requirements to Running Code

This approach transforms functional requirements into a production-ready microservice architecture through AI-assisted clustering, formal specifications, and automated guardrails.

### The Four-Phase Approach

```
Requirements (Markdown/JSON)
    ↓ AI Embeddings (all-mpnet-base-v2)
    ↓ Vector Clustering (K-Means/DBSCAN)
Semantic Clusters (Domain Boundaries)
    ↓ Human Naming & Validation
    ↓ ARCHITECTURE.md per Cluster
Formal Specifications (Single Source of Truth)
    ↓ Source Generators (Typed IDs, DTOs)
    ↓ Roslyn Analyzers + MCP Server
Type-Safe Build Pipelines (NUKE)
    ↓ AI Agents (Claude Code + Superpowers)
    ↓ Test-First Development
    ↓ Automated PR Review (CodeRabbit)
Production Code (Human-Reviewed & Merged)
```

---

## 📋 Phase 1: Requirements → Functional Clusters → Architecture Cut

**Input:** Functional requirements in Markdown/JSON
**Tool:** AI Embeddings + Vector Database
**Output:** Domain clusters + subsystem candidates

### How It Works

1. **Embedding Generation**
   - Each requirement converted to 1536-dimensional vector using `sentence-transformers/all-mpnet-base-v2`
   - Captures semantic meaning, not just keywords

2. **Semantic Clustering**
   - K-Means/DBSCAN groups similar requirements
   - Distance metric: cosine similarity
   - Clusters represent cohesive domain boundaries

3. **Architecture Derivation**
   - Each cluster → one microservice/subsystem candidate
   - Human names clusters (e.g., "Order Management", "Product Catalog")
   - Write `ARCHITECTURE.md` per cluster defining:
     - Components
     - Boundaries (what's in/out)
     - Responsibilities
     - Interfaces (A-Type, T-Type, O-Type)

**Key Insight:** Architecture emerges from requirements, not "whiteboard from zero"

---

## 🔧 Phase 2: Architecture as Spec & Guardrails

**Input:** `ARCHITECTURE.md` files
**Output:** Type-safe code generators + build rules + analyzers

### What Gets Generated

1. **Source Generators**
   - Typed IDs (e.g., `OrderId`, `CustomerId` instead of `int`)
   - DTOs with validation
   - Mapster-based mapping code

2. **Build Pipelines**
   - NUKE for type-safe builds (https://nuke.build)
   - Compile-time checks for architectural violations

3. **Roslyn Analyzers**
   - Custom rules based on `ARCHITECTURE.md`
   - Examples:
     - "OrderManagement may not reference DeliveryManagement directly"
     - "All domain entities must have typed IDs"
     - "Cross-cluster calls must go through defined interfaces"

4. **MCP Server**
   - AI tools (Claude Code) call deterministically:
     - Start builds
     - Run analyzers
     - Query architecture rules
   - No vague prompts – formalized skills

**Result:** Architecture IS the spec. Agents can't violate it.

---

## 🤖 Phase 3: Code-Generating AI Agents + PR Gates

**Input:** Spec + Requirements
**Output:** Parallel agent implementation with automated review

### Workflow

1. **Agent Dispatch**
   - Multiple Claude Code agents
   - Each works on separate cluster/subsystem
   - Uses generators + analyzers as guardrails

2. **Parallel Development**
   - Agent 1: Order Management
   - Agent 2: Product Catalog
   - Agent 3: Delivery Logistics
   - No shared state conflicts (bounded contexts)

3. **PR Pipeline**
   ```
   Agent Code
     ↓ Automated Review (CodeRabbit)
     ↓ Analyzer Checks
     ↓ Test Coverage Gates
     ↓ Mutation Score Gates
   Human Review & Merge
   ```

**Role Shift:** From "vibe-coder" to architect, reviewer, gatekeeper

---

## 🧪 Phase 4: Tests > Code (Test-First Development)

**Philosophy:** AI is strong in breadth (variants, edge cases), weak in intention (what's actually wanted)

### Workflow

1. **Core Tests First**
   - Human writes tests defining business intent
   - Example:
     ```csharp
     [Fact]
     public void Order_MustReject_AlcoholForMinors()
     {
         var customer = Customer.Minor(age: 17);
         var product = Product.Alcohol("Beer");

         var result = OrderValidator.Validate(customer, product);

         result.ShouldBeFailed("Alcohol prohibited for minors");
     }
     ```

2. **AI Generates Variants**
   - Edge cases: age 17.9 years, multiple products, etc.
   - Permutations: different product types, customer states

3. **Testing Arsenal**
   - **Mutation Testing (Stryker):** Ensures tests actually catch bugs
   - **Chaos Engineering (Simmy):** Fault injection for resilience
   - **Snapshot Tests (Verify):** Readable, living documentation

4. **Quality Gates**
   - Only code passing:
     - All tests
     - Analyzer rules
     - MCP checks
     - Coverage thresholds (e.g., 80%)
     - Mutation score thresholds (e.g., 75%)
   - ...can proceed to PR/main branch

---

## 📂 Directory Structure

```
WIP/
├── README.md                              # This file
├── requirements-clustering/
│   ├── scripts/
│   │   ├── cluster_requirements.py        # Python clustering implementation
│   │   ├── requirements.env.example       # API key template
│   │   └── requirements.txt               # Python dependencies
│   ├── docs/
│   │   ├── CLUSTERING_GUIDE.md           # How to run clustering
│   │   ├── ARCHITECTURE_TEMPLATE.md      # Template for cluster docs
│   │   └── METHODOLOGY.md                # Detailed methodology
│   ├── examples/
│   │   ├── earlybird-requirements.json   # Sample requirements
│   │   ├── clusters.json                 # Clustering results
│   │   └── architecture-diagrams.puml    # PlantUML diagrams
│   └── output/
│       ├── embeddings.txt                # Cached embeddings
│       └── clusters.png                  # Visualization
├── architecture-specs/
│   └── [Future: ARCHITECTURE.md files per cluster]
├── source-generators/
│   └── [Future: C# source generators]
├── roslyn-analyzers/
│   └── [Future: Custom Roslyn analyzers]
└── mcp-server/
    └── [Future: MCP server for AI tools]
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- OpenAI API key
- Pinecone API key (optional, for vector storage)

### Run Clustering

```bash
cd WIP/requirements-clustering/scripts
pip install -r requirements.txt
cp requirements.env.example .env
# Edit .env with your API keys
python cluster_requirements.py
```

**Output:**
- `output/clusters.json` - Requirements grouped by cluster
- `output/clusters.png` - 2D t-SNE visualization
- `output/embeddings.txt` - Cached embeddings (reusable)

### Next Steps

1. Review clusters - do they make semantic sense?
2. Name each cluster (e.g., "Order Management")
3. Write `ARCHITECTURE.md` for each cluster
4. Define interfaces between clusters
5. Set up source generators + analyzers

---

## 📚 Key Concepts

### Blood Types (Interface Classification)

From Dr. Martin Hasitschka's course:

- **A-Type:** Application/Business logic interfaces (change with business requirements)
- **T-Type:** Technology interfaces (change with tech stack: HTTP, SQL, etc.)
- **O-Type:** Universal/Eternal interfaces (math, algorithms, data structures)

### Hexagonal Architecture (Ports & Adapters)

```
┌─────────────────────────────────────┐
│     UI Layer (Adapters - T-Type)    │
│  HTTP Controllers │ SignalR Hubs    │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Application Layer (Use Cases)     │
│  CreateOrder │ CancelOrder          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Domain Layer (A-Type)              │
│  Order aggregate │ Customer entity   │
│  Business rules & invariants         │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Infrastructure (Adapters - T-Type) │
│  SQL Repository │ Message Bus        │
└─────────────────────────────────────┘
```

### Microservice Principles

From the course materials:

**Definition:** System consists of components with:
- Own address space
- Own database
- Possibly own programming language
- HTTP-based communication

**Benefits:**
- Update parts without updating whole application
- Scale independently
- Technology diversity

**Challenges:**
- Distributed system complexity
- Data consistency (eventual consistency)
- Network latency & failures

---

## 🔗 References

### Tools & Frameworks

- **Embeddings:** [sentence-transformers/all-mpnet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)
- **Build System:** [NUKE](https://nuke.build)
- **Analyzers:** [Philips Roslyn Analyzers](https://github.com/philips-software/roslyn-analyzers)
- **AI Workflow:** [Superpowers for Claude](https://blog.fsck.com/2025/10/09/superpowers/)
- **Code Review:** [CodeRabbit](https://www.coderabbit.ai)

### Course Materials

- Architecture Development (Dr. Martin Hasitschka)
- Service-Based Architecture Development
- Domain-Driven Design (Eric Evans)
- Clean Architecture (Robert C. Martin)
- Hexagonal Architecture (Alistair Cockburn)

### Example Implementation

- [ML_RequirementEmbeddingClusterer](https://github.com/JosipDomazetDev/ML_RequirementEmbeddingClusterer) by Josip Domazet

---

## 💡 Why This Approach Works

**Traditional Problem:**
- Vague requirements → vague architecture
- Whiteboard sessions start from zero
- Unclear domain boundaries
- Architecture drift over time

**This Solution:**
- **Data-Driven:** Clustering reveals natural domain boundaries
- **Traceable:** Requirements → Clusters → Components (clear lineage)
- **Enforceable:** Analyzers prevent architectural violations
- **Scalable:** Agents work in parallel on bounded contexts
- **Quality-Focused:** Tests define intent, AI fills breadth

**Human Role:**
- Provides context & business knowledge
- Designs architecture boundaries
- Writes tests capturing intent
- Reviews & merges AI-generated code
- Maintains guardrails (specs, analyzers)

**AI Role:**
- Clusters requirements semantically
- Generates boilerplate & variants
- Explores edge cases
- Implements within guardrails

---

## 📈 Success Metrics

- **Cluster Cohesion:** High intra-cluster similarity (requirements belong together)
- **Cluster Separation:** Low inter-cluster coupling (clear boundaries)
- **Test Coverage:** >80% line coverage, >75% mutation score
- **Analyzer Violations:** Zero architectural rule violations
- **PR Review Time:** Reduced by automated gates
- **Development Speed:** Parallel agent work on independent clusters

---

**Next:** See `requirements-clustering/docs/CLUSTERING_GUIDE.md` for step-by-step instructions.
