# MODELING IN SOFTWARE ENGINEERING

## Essential Guide for Requirements and Design

**Condensed from lecture slides to core modeling principles for practitioners**

---

## THE THREE FUNDAMENTAL MODELING QUESTIONS

Every software professional must answer these questions throughout their career:

### 1. What is a model?

**Definition:** A model is a **visual, abstract, and formal** representation.

- **Visual:** Uses diagrams, shapes, colors, and spatial relationships
- **Abstract:** Omits unnecessary details, focuses on essentials
- **Formal:** Follows defined rules (metamodel) that can be validated

### 2. What is a model good for?

Models serve four critical purposes in software engineering:

1. **Communication** - Easier stakeholder understanding than text
2. **Quality Assurance** - Visual inspection catches errors ("the eye is a good test tool")
3. **Automated Validation** - Tools can check completeness, consistency, and correctness
4. **Code Generation** - Models can generate databases, logic, and interfaces

### 3. What is a good model?

A good model must satisfy three criteria:

1. **Complies with a metamodel** - Has formal structure and rules
2. **Uses standardized notation** - BPMN for processes, UML for structure/behavior
3. **Appropriate detail level** - Not overloaded for humans (focus on essentials), may be detailed for machines

---

## WHY MODELING MATTERS: THE SURVIVAL SKILL

*"Modeling skills are a must if you want to survive in the software industry."*

### You Must Model For:

**1. HUMANS (Stakeholders, Teams)**

- Focus on clarity and understanding
- Hide complexity
- Use standard notation everyone recognizes

**2. CLASSIC GENERATION SOFTWARE**

- Database schema generators
- ORM mapping tools
- Interface generators

**3. AI SYSTEMS (LLMs, Code Generation)**

- Can handle overloaded diagrams
- Understands metainformation
- Generates working code from rich models

**Key Insight:** These three audiences need **different types of models**. Master all three.

---

## ADVANTAGE 1: COMMUNICATION - TEXT VS. MODEL

### The Text Problem

*"After having inserted his or her card, the customer enters the pin and then is authorized by the system. If the pin is
valid, the customer enters an amount which is checked against the available amount..."*

**Problems:**

- Linear reading required
- Hard to see alternatives and parallel flows
- Difficult to spot gaps
- Cognitive overload

### The Model Solution

State machines, sequence diagrams, and flowcharts show:

- ✅ All possible paths at once
- ✅ Parallel operations clearly
- ✅ Decision points visually
- ✅ Missing transitions immediately obvious

**Communication Principle:** A picture is worth a thousand words, but only if everyone speaks the same visual language (
hence: standardized notation).

---

## ADVANTAGE 2: QUALITY ASSURANCE - THE EYE AS TEST TOOL

### Case Study: Kloc Digital Wristwatch

**Requirements:**

- Display time (hour, minute, second)
- Four buttons: LIGHT, UP, MODE, SET
- Four modes: time display, time set, alarm set, alarm activation
- Mode transitions: MODE→time set, SET→alarm set, UP→alarm activation
- Return to time display by pressing same button that entered the mode

**Text Description Problems Found When Modeling:**

1. **Incompleteness:**
    - What happens if you press LIGHT in time set mode?
    - Can you go from time set to alarm set directly?
    - What if alarm triggers while in alarm set mode?

2. **Contradictions:**
    - "Press MODE to enter time set" + "Press same button to exit" = MODE exits time set
    - "Press SET to enter alarm set" + "Press same button to exit" = SET exits alarm set
    - But text says "To return to time display mode from any other mode, you press exactly the same button"
    - **Problem:** From alarm activation mode, text says press UP to enter it and UP to exit it

3. **Ambiguities:**
    - In time set mode: "hour display flashes" - does this happen immediately or after pressing something?
    - "23 will not be increased to 24, but to 0" - what about 24:00 midnight representation?

**Modeling Reveals These Issues:**

- State diagrams force you to specify ALL transitions
- Missing edges = incomplete specification
- Conflicting edges = contradictions
- Visual inspection catches these immediately

**Lesson:** Drawing a state machine diagram would have caught all these errors during design, not during implementation.

---

## ADVANTAGE 3: AUTOMATED QUALITY CHECKS

### Case Study: Logistics Robotics State Machine

Given a state machine model, automated tools can detect:

**1. Unreachable States**

- State Q has no incoming transitions → dead code
- Tool: graph reachability analysis

**2. Non-Determinism**

- From state R, two transitions labeled 'a' go to different states
- Robot receives 'a' → which state should it enter?
- Tool: duplicate transition detection

**3. Incomplete Coverage**

- State Y has transitions for events 'b' and 'd', but system can receive events 'a', 'b', 'c', 'd'
- What happens if 'a' or 'c' arrives while in state Y?
- Tool: coverage analysis against event alphabet

**4. Dead-End States**

- State X has no outgoing transitions except self-loops
- Once entered, system can never leave (unless that's intended)
- Tool: sink state detection

**5. Inconsistent Naming**

- Event 'a' in one part of diagram, event 'A' in another
- Same event or different?
- Tool: naming consistency check

**Manual vs. Automated:**

- **Humans catch:** Logic errors, business rule violations, usability issues
- **Tools catch:** Structural errors, completeness, consistency, naming

**Best Practice:** Human review + automated checks = comprehensive quality assurance

---

## ADVANTAGE 4: GENERATION FROM MODELS

### Database Generation from Class Diagrams

**Model:**

```
[Customer]──1:N──[Order]──1:N──[OrderItem]──N:1──[Product]
   |
   attributes:
   - customerNumber (PK)
   - name
   - address
```

**Generated SQL:**

```sql
CREATE TABLE Customer (
    customerNumber INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE Order (
    orderNumber INT PRIMARY KEY,
    customerNumber INT FOREIGN KEY REFERENCES Customer,
    orderDate DATE
);
```

**Benefits:**

- No manual SQL errors
- Referential integrity guaranteed
- Database matches design exactly

---

### Logic Generation from State Machines

**Model:** Logistics robot state machine with states {K, L, Q, R, S, T, U, V, W, X, Y, Z} and events {a, b, c, d, e}

**Generated Code:**

```csharp
public enum State { K, L, Q, R, S, T, U, V, W, X, Y, Z }
public enum Event { A, B, C, D, E }

public class RobotStateMachine
{
    private State currentState = State.K;

    public void ProcessEvent(Event e)
    {
        currentState = Transition(currentState, e);
    }

    private State Transition(State from, Event e)
    {
        return (from, e) switch
        {
            (State.K, Event.A) => State.L,
            (State.L, Event.A) => State.Q,
            _ => throw new InvalidTransitionException()
        };
    }
}
```

**Benefits:**

- No forgotten transitions
- All states and events covered
- Compiler enforces completeness

---

### AI-Driven Generation Example

**Model with Metainformation:**

```
[Start] → [AskName: "What is your name?" order=1]
       → [Greeting: "Hello {name}!" condition="name.length > 0"]
       → [Decision: age >= 18]
           ├─ Yes → [AdultPath]
           └─ No  → [MinorPath: hideApology=true]
```

**AI-Generated Running System:**

- Understands metainformation (`order=1` → asks name first)
- Incorporates textual requirements (uses actual name in greeting)
- Implements decision logic correctly (age check)
- Respects display hints (`hideApology=true` → no sorry screen shown)

**The Future:** AI can generate entire applications from rich behavioral models

---

## MODEL QUALITY: THE METAMODEL REQUIREMENT

### What is a Metamodel?

**Model** describes your system (e.g., "Order has customer")
**Metamodel** describes your modeling language (e.g., "Classes can have associations")

**Example:**

| Level              | Example                                                           |
|--------------------|-------------------------------------------------------------------|
| **M2 (Metamodel)** | "A class diagram contains classes, attributes, associations"      |
| **M1 (Model)**     | "Order class has orderNumber attribute, associated with Customer" |
| **M0 (Instance)**  | "Order #12345 for customer #789"                                  |

### Why Metamodels Matter

**Without Standardized Metamodel:**

```
[Cloud shape] ──dotted line──> [Rectangle]
                    ↓
            [Purple circle]
```

**Questions:**

- What does cloud shape mean? Class? Component? Actor?
- Dotted line vs. solid line?
- Why purple circle? What's the semantic difference from blue rectangle?
- Symbols on arrows - what do they represent?

**Result:** Everyone interprets differently → communication fails

**With Standardized Metamodel (UML):**

- Rectangle with 3 sections = Class
- Solid line with arrow = Association/Inheritance (specified by arrowhead type)
- Dotted line with arrow = Dependency
- Numbers on associations = Multiplicity

**Result:** Everyone interprets identically → communication succeeds

---

## STANDARDIZED MODELING LANGUAGES

### UML (Unified Modeling Language)

**Purpose:** Model structure and behavior of software systems

**Key Diagram Types:**

**Structure Diagrams:**

- **Class Diagram:** Classes, attributes, methods, relationships
- **Component Diagram:** Software components and dependencies
- **Deployment Diagram:** Hardware nodes and software distribution
- **Package Diagram:** Code organization and dependencies

**Behavior Diagrams:**

- **Use Case Diagram:** System functionality from user perspective
- **Sequence Diagram:** Object interactions over time
- **State Machine Diagram:** Object states and transitions
- **Activity Diagram:** Workflows and algorithms

**When to Use UML:**

- Designing software architecture
- Modeling object-oriented systems
- Documenting APIs and interfaces
- Communicating technical designs

---

### BPMN (Business Process Model and Notation)

**Purpose:** Model business processes and workflows

**Key Elements:**

- **Events:** Start, intermediate, end
- **Activities:** Tasks, sub-processes
- **Gateways:** Exclusive (XOR), parallel (AND), inclusive (OR)
- **Flows:** Sequence flow, message flow

**When to Use BPMN:**

- Modeling business processes
- Process automation requirements
- Workflow specifications
- Communication with business stakeholders

**UML vs. BPMN:**

- **UML:** How software is structured and behaves internally
- **BPMN:** How business processes flow across systems and people

**Best Practice:** Use both. BPMN for requirements context, UML for solution design.

---

## MANAGING DIAGRAM COMPLEXITY

### The Overload Problem

**For Humans:**

- Too many elements → cognitive overload
- Can't see the forest for the trees
- Focus gets lost

**For Machines (AI/Tools):**

- Can process thousands of elements
- Can validate complex rule interactions
- No cognitive limits

### Strategies for Human-Readable Diagrams

**1. Hierarchical Decomposition**

- Top-level: 5-9 major components (Miller's Law)
- Each component: drill-down diagram with details
- Navigation: package diagrams, hyperlinks

**2. View Filtering**

- Show only relevant relationships for current question
- Example: "How does Order interact with Payment?" → filter out Product details

**3. Abstraction Levels**

- Context level: system boundary and external interfaces
- Logical level: internal components
- Physical level: implementation details

**4. Color and Visual Encoding**

- Use color to categorize, not as primary information
- Bad: "Red means important" (what if printed in black/white?)
- Good: "Red highlights A-components" (but also marked with «A» stereotype)

**5. Consistent Layout**

- Similar diagrams use similar positioning
- Dependencies flow in one direction (e.g., left-to-right)
- Minimize line crossings

### Strategies for Machine-Readable Diagrams

**Can Include:**

- Full attribute lists
- Complete method signatures
- All constraints and invariants
- Metainformation (generation hints, tool directives)
- Cross-references to requirements

**Example: Full Class Specification for Code Generation**

```
Customer {
    + customerNumber: String {id, required, pattern="[0-9]{7}"}
    + name: String {required, maxLength=255}
    + email: Email {unique, pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"}
    + address: Address {embedded}
    + registrationDate: Date {default=now(), immutable}
    + status: CustomerStatus {default=ACTIVE}

    + validate(): ValidationResult
    + blacklist(reason: String): void {audit, requires="ADMIN"}
    + calculateLifetimeValue(): Money {cached}
}
```

**This would overwhelm humans but is perfect for code generators**

---

## MODELING IN THE DEVELOPMENT PROCESS

### When to Model

**Requirements Phase:**

- Use case diagrams (what system must do)
- Activity diagrams (business processes)
- Domain class diagrams (business concepts)
- State machines (business rules)

**Design Phase:**

- Component diagrams (architecture)
- Sequence diagrams (interactions)
- Detailed class diagrams (implementation)
- Deployment diagrams (infrastructure)

**Implementation Phase:**

- Generate code from models
- Keep models synchronized with code
- Use reverse engineering tools

**Maintenance Phase:**

- Update models as system evolves
- Models document current state
- Use for impact analysis before changes

### Keeping Models Alive Over Decades

**The Problem:**

- Models created, code generated
- Code evolves, models become outdated
- Models abandoned, documentation becomes fiction

**Solutions:**

**1. Single Source of Truth**

- **Model-Driven:** Code generated from model → model is source
- **Code-First:** Model generated from code → code is source
- **Never:** Independent model and code (guaranteed divergence)

**2. Bidirectional Synchronization**

- Tools keep model ↔ code synchronized
- Changes in code update model automatically
- Changes in model regenerate code

**3. Model Integration into CI/CD**

- Model validation in build pipeline
- Model-code consistency checks
- Automated model updates from code

**4. Living Documentation**

- Generate documentation from models
- Documentation always current
- Integrated into developer workflow

**Anti-Pattern:** Creating models for documentation that nobody maintains

**Best Practice:** Make models executable or auto-generated. If not executable/generated, don't create them.

---

## CASE STUDY INSIGHTS

### Mars: Pure Generation

**Context:** NASA Mars mission calculating moon visibility overlap

**Model:** State-based calculation of time interval intersections

**Generation:**

- Algorithm generated from formal specification
- No manual coding
- Provably correct (model was validated)

**Key Lesson:** Safety-critical systems benefit most from generation - no human coding errors

---

### Kloc: Visual QA

**Context:** Digital wristwatch with four buttons and four modes

**Incomplete Text Specification:**

- Missing transition specifications
- Contradictory button behavior
- Ambiguous mode switching

**State Diagram Reveals:**

- 16 possible button-press scenarios (4 modes × 4 buttons)
- Text specified only 12
- 4 scenarios undefined → system behavior unpredictable

**Key Lesson:** State machines force completeness. If you can't draw the transition, you haven't specified it.

---

### Logistics Robotics: Automated Checks

**Context:** Warehouse robot navigation state machine

**Tool Findings:**

- State Q unreachable (dead code)
- Non-deterministic transitions from state R
- Missing event handlers in state Y

**Manual Review Would Miss:**

- Non-determinism (subtle, requires tracing all paths)
- Unreachable states (requires global analysis)

**Key Lesson:** Automated checks catch structural errors humans miss. Combine both for best results.

---

## MODELING FOR AI: THE NEW FRONTIER

### Why AI Changes Modeling

**Traditional Approach:**

- Human writes requirements (text)
- Human creates model (diagram)
- Tool generates code (rigid templates)

**AI-Enhanced Approach:**

- Human writes requirements (text + diagrams)
- AI creates enriched model (interprets intent)
- AI generates working system (flexible, context-aware)

### What AI Understands in Models

**1. Metainformation**

- `order=1` → sequence constraints
- `required=true` → validation logic
- `default=value` → initialization

**2. Textual Requirements Embedded in Diagrams**

- Natural language annotations
- Condition expressions
- User instructions

**3. Implicit Relationships**

- "Customer places Order" implies Customer must exist before Order
- "Order contains Products" implies many-to-many with join table

**4. Domain Patterns**

- Recognizes standard patterns (Repository, Factory, etc.)
- Applies best practices automatically

### Best Practices for AI-Readable Models

**1. Be Explicit**

- Add textual annotations explaining non-obvious logic
- Include examples of expected behavior
- Specify edge cases

**2. Use Rich Notation**

- OCL constraints
- State machine guards
- Preconditions/postconditions

**3. Provide Context**

- Domain glossary
- Similar examples
- Reference to requirements

**4. Iterate with AI**

- Generate → review → refine model → regenerate
- AI learns from corrections

---

## PRACTICAL RECOMMENDATIONS

### 1. Choose the Right Diagram for the Job

| Need to Show           | Use This Diagram        |
|------------------------|-------------------------|
| What system must do    | Use Case Diagram        |
| Business process flow  | BPMN / Activity Diagram |
| Object lifecycle       | State Machine Diagram   |
| Component interactions | Sequence Diagram        |
| System structure       | Class/Component Diagram |
| Physical deployment    | Deployment Diagram      |

### 2. Model at the Right Level

**Context Questions:**

- Who is the audience? (technical team vs. business stakeholders)
- What's the purpose? (communication vs. generation vs. documentation)
- How long will this be maintained? (prototype vs. production)

**Adjust detail level accordingly**

### 3. Validate Early and Often

**Human Review:**

- Walk through scenarios
- Check completeness
- Verify business rules

**Automated Checks:**

- Syntax validation
- Consistency checking
- Coverage analysis

### 4. Integrate Modeling into Workflow

**Don't:**

- Create models in isolation
- Model without purpose
- Abandon models after initial creation

**Do:**

- Model during design discussions
- Use models to drive code
- Keep models synchronized with reality

### 5. Learn Standard Notations

**Minimum Viable Knowledge:**

- UML class diagrams (structure)
- UML sequence diagrams (interaction)
- UML state machines (behavior)
- BPMN process diagrams (business processes)

**Advanced:**

- Component diagrams (architecture)
- Deployment diagrams (infrastructure)
- Activity diagrams (algorithms)

### 6. Use Tools Effectively

**Essential Tool Features:**

- Standards compliance (UML 2.5, BPMN 2.0)
- Code generation
- Reverse engineering
- Model validation
- Team collaboration

**Popular Tools:**

- Enterprise Architect
- Sparx Systems
- Visual Paradigm
- PlantUML (text-based)
- Mermaid (text-based, for docs)

---

## SUMMARY: THE MODELING MINDSET

### Core Principles

1. **Abstraction:** Show only what matters for current purpose
2. **Formalism:** Follow defined rules for tool support
3. **Standardization:** Use BPMN/UML so others understand
4. **Validation:** Models exist to find errors early
5. **Generation:** Models should drive code, not just document

### Success Criteria

**A model is successful if:**

- ✅ Stakeholders understand it without explanation
- ✅ It reveals problems in requirements
- ✅ Tools can validate it automatically
- ✅ It generates correct code/configuration
- ✅ It stays synchronized with reality

**A model has failed if:**

- ❌ Nobody looks at it after creation
- ❌ It contains outdated information
- ❌ It requires lengthy text explanation
- ❌ It uses non-standard notation
- ❌ It exists "because process says so"

### The Three-Audience Strategy

Master modeling for:

1. **Humans** - Clear, focused, standardized diagrams
2. **Tools** - Formal, complete, validatable models
3. **AI** - Rich, annotated, context-aware specifications

**Future-Proof Skill:** As AI takes over coding, modeling becomes THE core engineering skill. AI generates code from
models. Your value = creating good models.

---

## FURTHER READING

**Standards:**

- **UML 2.5 Specification** - OMG official standard
- **BPMN 2.0 Specification** - OMG official standard

**Essential Books:**

- **Martin Fowler:** UML Distilled (pragmatic guide)
- **Grady Booch et al.:** Object-Oriented Analysis and Design with Applications
- **Bruce Douglass:** Real-Time UML (embedded systems)
- **Stephen Mellor & Marc Balcer:** Executable UML

**Online Resources:**

- **PlantUML Documentation** - Text-to-diagram tool
- **UML Diagrams** (uml-diagrams.org) - Interactive examples
- **BPMN.io** - Process modeling in browser

**AI and Modeling:**

- **Wrigley McKay:** AI-driven model generation research
- **Ravi Sethi:** Software Engineering: Basic Principles (2022)

---

**End of Modeling in Software Engineering Guide**

*This guide condenses modeling lecture content into practical strategies. Models are not documentation overhead - they
are executable specifications. Master modeling for humans, tools, and AI. Your career depends on it.*
