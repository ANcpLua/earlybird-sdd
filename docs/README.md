# Software Architecture Course - Exercise Repository

**Foundation:** Empirically-validated software engineering principles (1968-2025)
**Course Structure:** 4 evenings, 21 exercises
**Learning Mode:** Remote-friendly with group and home exercises

## Quick Navigation

| Evening | Focus | Exercises | Supporting Materials |
|---------|-------|-----------|---------------------|
| **[Evening 1](#evening-1-importance-of-architecture)** | Importance of Architecture | 2 exercises | Course introduction |
| **[Evening 2](#evening-2-architectural-quality)** | Interface Design & Quality | 7 exercises | Case Study: EarlyBird |
| **[Evening 3](#evening-3-architecture-development)** | Architecture Development | 5 exercises | Case Studies: Mars, EarlyBird, Dis*Ease |
| **[Evening 4](#evening-4-architecture-documentation)** | Documentation & Synthesis | 2 exercises | Review all prior work |

**Additional Resources:**
- [LEARNING_PATH.md](LEARNING_PATH.md) - Session-by-session breakdown for remote learning
- [Framework_Comparison.md](Framework_Comparison.md) - Better than C4 + arc42 combined

---

## Evening 1: Importance of Architecture

**PDF:** `1_The_Importance_of_Architecture_V702.pdf`
**Theme:** Why architecture matters - decisions with long-term impact

### Exercises

| ExID | Exercise | Type | Page | Description |
|------|----------|------|------|-------------|
| - | What Decisions Are Hard to Change? | Group | 13 | Identify architectural decisions, their influenced non-functional aspects (security, efficiency, changeability), and determine which "-ility" appears most frequently. |
| - | Tools Corner | Optional | - | Present tools for developing/documenting architectures (e.g., Structurizr, C4, arc42). |

---

## Evening 2: Architectural Quality

**PDF:** `1_Architectural_Quality_V701.pdf`
**Theme:** Cohesion, coupling, interface quality, peer review

### Exercises

| ExID | Exercise | Type | Page | File | Description |
|------|----------|------|------|------|-------------|
| **ArchitecturalQuality01** | Quality of Building Blocks | Group | 8 | - | Analyze internal quality (cohesion) of a building block using dependency matrix. |
| **ArchitecturalQuality03** | An A-Interface of EarlyBird | Group | 71 | [ISearchProduct_Interface.md](../EarlyBird/ISearchProduct_Interface.md) | Specify `ISearchProduct` interface for EarlyBird's ProductManager component. |
| **ArchitecturalQuality04** | ISearchProduct Specification | Group | 73 | [ISearchProduct_Review.md](../EarlyBird/ISearchProduct_Review.md) | Extend interface specification checklist and peer-review ArchitecturalQuality03. |
| **ArchitecturalQuality05** | Specification of a 0-Interface | Group | 74 | [IList_Interface.md](IList_Interface.md) | Design and document generic `IList` interface. |
| **ArchitecturalQuality07** | List Interface Specification | Group | 75 | - | Peer-review partner group's `IList` specification from ArchitecturalQuality05. |
| **ArchitecturalQuality08** | Climate Model | Group | 125 | [Climate_Model_Analysis.md](Climate_Model_Analysis.md) | Analyze climate model subsystems dependencies and identify architectural weaknesses. |
| **ArchitecturalQuality09** | Heat Flow Calculator | Self-Check | 83 | - | Identify coupling weaknesses and "Tell Don't Ask" violations. |
| **ArchitecturalQuality10** | Architecture - A Real-Life Story | Group | 124 | [Charts_Products_Case_Study.md](Charts_Products_Case_Study.md) | Analyze Charts/Products architecture evolution and identify violated principles. |

**Case Study Required:** `2_Case Study Early Bird Requirements V150.pdf` (for ArchitecturalQuality03, ArchitecturalQuality04)

---

## Evening 3: Architecture Development

**PDF:** `1_Architecture_Development_V702.pdf`
**Theme:** From requirements to architecture - service-based, domain-driven, AI-assisted

### Exercises

| ExID | Exercise | Type | Page | File | Description |
|------|----------|------|------|------|-------------|
| **MateMate02** | Service-Based Architecture Development | Group | 34 | - | For MateMate chess app: establish subsystems, determine blood types (A/T/0), create allowed-to-use specification. |
| **Mars02** | A Very Small Application Core | Home | 126-128 | [Mars_Application_Core.md](../Mars/Mars_Application_Core.md) | Design 4-component architecture for Mars moons visibility calculator. |
| **EarlyBird12** | A Bigger Application Core | Home | 129 | [EarlyBird_Application_Core.md](../EarlyBird/EarlyBird_Application_Core.md) | Design EarlyBird application core with change impact analysis. |
| **Dis\*Ease01** | Requirements Class-Diagram-Based Architecture | Group | 50 | - | Design DIS*EASE hospital system architecture from domain class diagram (4-6 building blocks). |
| **ArchitectureDevelopment02** | AI Architecture Development (Embedding Approach) | Home | 71 | - | Use vector embeddings to cluster EarlyBird requirements into architecture components. |

**Case Studies Required:**
- `3_Case_Study_Mars_V161.pdf` (for Mars02)
- `2_Case Study Early Bird Requirements V150.pdf` (for EarlyBird12, ArchitectureDevelopment02)

**Supporting Diagrams (EarlyBird):**
- [EarlyBird_Domain_Model.md](../EarlyBird/EarlyBird_Domain_Model.md) - Complete domain model with aggregates and entities
- [EarlyBird_Hexagonal_Architecture.md](../EarlyBird/EarlyBird_Hexagonal_Architecture.md) - Ports & Adapters pattern visualization
- [EarlyBird_Order_Workflow.md](../EarlyBird/EarlyBird_Order_Workflow.md) - Order submission sequence diagrams

---

## Evening 4: Architecture Documentation

**PDF:** `1_Architecture_Documentation_V701.pdf`
**Theme:** Presentation, discussion, synthesis

### Exercises

| ExID | Exercise | Type | Page | Description |
|------|----------|------|------|-------------|
| - | Presentation & Discussion | Group | 2 | Present and discuss architecture documentation from prior exercises (ArchitecturalQuality03-07, MateMate02, Mars02, EarlyBird12). |
| - | Architectural Frameworks | Home | 92 | Design an architectural framework better than existing ones. See [Framework_Comparison.md](Framework_Comparison.md) for example. |

---

## Exercise Categories

### By Type

**Group Exercises (In-Class):** ArchitecturalQuality01, ArchitecturalQuality03, ArchitecturalQuality04, ArchitecturalQuality05, ArchitecturalQuality07, ArchitecturalQuality08, ArchitecturalQuality10, MateMate02, Dis*Ease01

**Home Exercises (Asynchronous):** Mars02, EarlyBird12, ArchitectureDevelopment02, Architectural Frameworks

**Self-Check (Individual):** ArchitecturalQuality09

**Optional:** Tools Corner

### By Skill Focus

| Skill | Exercises |
|-------|-----------|
| **Interface Design** | ArchitecturalQuality03, ArchitecturalQuality04, ArchitecturalQuality05, ArchitecturalQuality07 |
| **Architecture Analysis** | ArchitecturalQuality01, ArchitecturalQuality08, ArchitecturalQuality09, ArchitecturalQuality10 |
| **Architecture Design** | MateMate02, Mars02, EarlyBird12, Dis*Ease01 |
| **AI-Assisted Architecture** | ArchitectureDevelopment02 |
| **Documentation & Tooling** | Architectural Frameworks, Tools Corner |

---

## File Organization

```
SoftwareArchitecture/
├── README.md (this file)
├── LEARNING_PATH.md (remote learning guide)
│
├── Evening 2: Architectural Quality
│   ├── ISearchProduct_Interface.md
│   ├── ISearchProduct_Review.md
│   ├── IList_Interface.md
│   ├── Climate_Model_Analysis.md
│   └── Charts_Products_Case_Study.md
│
├── Evening 3: Architecture Development
│   ├── Mars_Application_Core.md
│   ├── EarlyBird_Application_Core.md
│   └── Supporting Diagrams (EarlyBird)
│       ├── EarlyBird_Domain_Model.md
│       ├── EarlyBird_Hexagonal_Architecture.md
│       └── EarlyBird_Order_Workflow.md
│
└── Evening 4: Architecture Documentation
    └── Framework_Comparison.md
```

---

## Learning Strategies

### For Remote Learners

1. **Read LEARNING_PATH.md** - Session-by-session breakdown
2. **Follow evening sequence** - Each builds on prior knowledge
3. **Do group exercises solo** - Still present to yourself (Feynman technique)
4. **Document AI usage** - If using AI assistants, note prompts and models

### For In-Person Students

1. **Bring digital copies** - Keep exercise solutions accessible for presentations
2. **Peer review seriously** - ArchitecturalQuality04 and ArchitecturalQuality07 are critical learning moments
3. **Participate actively** - Be ready to present any home exercise

### General Tips

- **ArchitecturalQuality03 → ArchitecturalQuality04 → ArchitecturalQuality05 → ArchitecturalQuality07** - This is a mini-course on interface quality
- **Mars02 before EarlyBird12** - Small application core principles apply to large
- **All exercises trace to principles** - Every decision has empirical evidence

---

## Principles Reference

All exercises apply empirically-validated software engineering principles:

| Principle | Applied In |
|-----------|-----------|
| **SRP** - Single Responsibility | All design exercises |
| **OCP** - Open-Closed | ArchitecturalQuality10, EarlyBird12 |
| **DIP** - Dependency Inversion | ArchitecturalQuality10, EarlyBird12 |
| **ISP** - Interface Segregation | ArchitecturalQuality08 |
| **CCP** - Common Closure | ArchitecturalQuality08, ArchitecturalQuality10 |
| **CRP** - Common Reuse | ArchitecturalQuality10 |
| **SDP** - Stable Dependencies | ArchitecturalQuality08, ArchitecturalQuality10 |
| **SAP** - Stable Abstractions | ArchitecturalQuality10 |
| **ADP** - Acyclic Dependencies | Mars02 |
| **Blood Type Separation (A/T/0)** | MateMate02, EarlyBird12 |
| **Tell Don't Ask** | ArchitecturalQuality09 |

---

## Quality Standards

All documentation in this repository follows:

1. **Empirical Evidence:** Every architectural decision cites research or case studies
2. **Professional Diagrams:** GitHub-compatible Mermaid syntax
3. **No Emojis:** Clean, professional markdown
4. **Cognitive Load Optimization:** Information chunking, progressive disclosure
5. **Traceability:** Requirements → Components → Principles → Evidence

See [CLAUDE.md](../CLAUDE.md) for markdown and cognitive psychology guidelines applied to all exercises.

---

**Course Completion:** All 21 exercises
**Total Time Investment:** ~40 hours (4 evenings × 4 hours + ~24 hours homework)
**Prerequisite Knowledge:** Software development experience, basic OOP

**Generated:** November 13, 2025
**Maintained By:** Course instructors and AI teaching assistants
