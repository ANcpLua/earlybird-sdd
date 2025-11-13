# QUICK START: What You Need to Know First

## What Is Requirements Engineering?

**Simple Definition:** Understanding what needs to be built, documenting it clearly, and ensuring everyone agrees before
coding begins.

**Why It Matters:**

- Fixing requirements errors costs **10x more** after design, **100x more** after coding
- 50% of project costs come from fixing requirements defects (Rule of Ten)
- Poor requirements are the #1 cause of project failure

**Core Principle:** Invest time up front to save time and money later.

---

# THE REQUIREMENTS ENGINEERING MODEL

This guide follows a semantic model structured around **4 Phases** and **10 Core Capabilities**:

```
PHASE 1: DISCOVER      → Find requirements (Sources, Stakeholders, Elicitation)
PHASE 2: DEFINE        → Write requirements (Language, Formats, Quality)
PHASE 3: STRUCTURE     → Organize requirements (Dependencies, Stability, Attributes)
PHASE 4: MAINTAIN      → Keep requirements alive (Reviews, Conflicts, Change)
```

Each phase builds on the previous. Master them sequentially.

---

# PHASE 1: DISCOVER - Finding Requirements

## 1.1 The Three Sources Principle

**Every requirement comes from one of three places:**

| Source      | What It Is          | Examples                                                            | How to Find                |
|-------------|---------------------|---------------------------------------------------------------------|----------------------------|
| **TEXTS**   | Written information | Regulations, legacy docs, contracts, standards, competitor specs    | Read & analyze documents   |
| **SYSTEMS** | Existing solutions  | Current software, prototypes, competitor products, market offerings | Observe & reverse-engineer |
| **PEOPLE**  | Stakeholders        | Users, customers, regulators, developers, domain experts            | Interview & workshop       |

**Action:** For every project, create a **Sources Checklist**:

- [ ] What regulations/standards apply?
- [ ] What existing systems are similar?
- [ ] Who are ALL the stakeholders?

---

## 1.2 The Top 10 Problems (and Solutions)

These are the **real-world challenges** you'll face on every project:

| #  | Problem                                         | Solution Strategy                                              |
|----|-------------------------------------------------|----------------------------------------------------------------|
| 1  | **Can't find all requirement sources**          | Use Sources Checklist (Texts/Systems/People) + Context Diagram |
| 2  | **Sources disagree**                            | Apply Conflict Resolution Framework (page XX)                  |
| 3  | **Hidden requirements** (customer doesn't tell) | Use Kano Model + Watch/Think methods                           |
| 4  | **Customer wants wrong thing**                  | Prototype early, validate with observation                     |
| 5  | **Can't prioritize**                            | Use MoSCoW + Kano classification                               |
| 6  | **Poor document structure**                     | Follow Volere or Use Case templates                            |
| 7  | **Imprecise natural language**                  | Apply 5 Language Rules (page XX)                               |
| 8  | **Wrong diagrams**                              | Match diagram to requirement type (page XX)                    |
| 9  | **Missing attributes/relationships**            | Use Volere Snow Cards framework                                |
| 10 | **Requirements become outdated**                | Implement traceability + change management                     |

**Key Insight:** Most problems aren't technical—they're about **finding the right people** and **asking the right
questions**.

---

## 1.3 Kano Model: The Requirement Classification System

**Purpose:** Not all requirements are equal. Classify to know how to find them.

### The 5 Requirement Types

```
Customer Satisfaction
        ↑
Delight |     ╱ Excitement (Delighters)
        |    ╱
Neutral |___╱_____________ Performance
        |  ╱
        | ╱ Basic (Must-Haves)
Dissatisfaction ←———————————→ Feature Present
```

| Type            | Definition                 | Customer Impact                        | How to Find   | Method                               |
|-----------------|----------------------------|----------------------------------------|---------------|--------------------------------------|
| **BASIC**       | Assumed essentials         | Absent = anger<br>Present = expected   | **WATCH**     | Observe current processes, prototype |
| **LEGAL**       | Mandated by law/regulation | Required regardless of want            | **READ**      | Document analysis, compliance review |
| **PERFORMANCE** | Quantifiable metrics       | Linear satisfaction                    | **TALK**      | Interviews, surveys, workshops       |
| **EXCITEMENT**  | Unexpected innovations     | Absent = no issue<br>Present = delight | **THINK**     | Creativity methods, brainstorming    |
| **SUPERFLUOUS** | Unnecessarily complex      | Waste of resources                     | **CHALLENGE** | Ask "Why?" 5 times                   |

**Decision Framework:**

```
START: What type is this requirement?
  │
  ├─ Customer expects but doesn't mention? → BASIC (Watch them)
  ├─ Required by regulation? → LEGAL (Read the regulation)
  ├─ Has a number/metric? → PERFORMANCE (Talk specifics)
  ├─ Novel/innovative? → EXCITEMENT (Think creatively)
  └─ Overly complex? → SUPERFLUOUS (Challenge it)
```

---

## 1.4 Elicitation Methods: Watch, Read, Think, Talk

**The WRTT Framework** - Four skills for finding requirements:

### WATCH (For Basic Requirements)

**When:** Discovering implicit expectations
**Techniques:**

- User observation (shadowing, ethnography)
- Prototype testing (watch reactions)
- A/B testing (observe behavior)
- Journey mapping (visualize experience)
- Existing system analysis

**Example:** Watch nurses use current patient record system. Notice they write critical notes on sticky notes because
system is too slow. **Discovered requirement:** "Critical notes must save in < 1 second"

---

### READ (For Legal Requirements)

**When:** Compliance, standards, contracts
**Techniques:**

- Regulatory document analysis (GDPR, HIPAA, SOC2)
- Standards review (ISO, IEEE, industry specs)
- Contract examination (SLAs, obligations)
- Legacy documentation (understand current state)
- Competitor analysis (market expectations)

**Example:** Read GDPR Article 17. **Discovered requirement:** "Users can delete all personal data within 30 days of
request"

---

### THINK (For Excitement Requirements)

**When:** Innovation, competitive advantage, delighters
**Techniques:**

- **Osborn Checklist** (adapt/modify/combine/eliminate)
    - What if we add AI?
    - What if users control it by voice?
    - What if it works offline?
    - What if it integrates with [popular tool]?
- Brainstorming sessions
- Design thinking workshops
- Competitive differentiation analysis
- Future scenario planning

**Osborn Checklist for Software:**

```
Can we... ADD: AI, voice, AR, sensors, GPS, offline mode?
Can we... ELIMINATE: steps, clicks, waiting time?
Can we... COMBINE: with social media, with existing tools?
Can we... REVERSE: the workflow, the interface?
Can we... SUBSTITUTE: inputs (voice for typing), outputs (visual for text)?
```

---

### TALK (For Performance Requirements)

**When:** Quantifying needs, understanding priorities
**Techniques:**

- Structured interviews (prepare questions)
- Surveys (quantitative data)
- Focus groups (group dynamics)
- Stakeholder workshops (collaborative)
- Requirements prioritization sessions

**Interview Framework:**

```
1. CONTEXT: "Walk me through your typical day..."
2. PROBLEMS: "What frustrates you most about..."
3. GOALS: "What would success look like..."
4. QUANTIFY: "How fast does it need to be..."
5. PRIORITIES: "If you could only have 3 features..."
```

---

## 1.5 Stakeholder Analysis

**Context Diagram:** Visual map of system and all external entities.

**Stakeholder Categories:**

- **Primary Users:** People who directly use the system daily
- **Secondary Users:** People who use it occasionally
- **Customers:** People who pay for it (may differ from users)
- **Regulators:** People who enforce rules about it
- **Developers:** People who build and maintain it
- **Domain Experts:** People who understand the business
- **Affected Parties:** People impacted indirectly

**Stakeholder Matrix:**

| Stakeholder               | Interest Level | Power Level            | Engagement Strategy |
|---------------------------|----------------|------------------------|---------------------|
| High Power, High Interest | MANAGE CLOSELY | Key decision makers    |
| High Power, Low Interest  | KEEP SATISFIED | Executive updates only |
| Low Power, High Interest  | KEEP INFORMED  | Regular communication  |
| Low Power, Low Interest   | MONITOR        | Minimal engagement     |

---

# PHASE 2: DEFINE - Writing Clear Requirements

## 2.1 The 5 Language Errors That Ruin Requirements

### Error #1: NOMINALIZATION (Using Nouns Instead of Verbs)

**What It Is:** Turning actions into nouns, hiding the actor and action.

**Why It's Bad:** Creates ambiguity about WHO does WHAT.

| ❌ WRONG (Nominalization)     | ✅ RIGHT (Active Verb)                 |
|------------------------------|---------------------------------------|
| "Authorization is performed" | "System authorizes the employee"      |
| "Data transmission occurs"   | "Sensor transmits data to controller" |
| "A validation takes place"   | "System validates user credentials"   |

**Rule:** If you see "is performed," "takes place," "occurs," rewrite with an active verb.

---

### Error #2: PASSIVE VOICE (Incomplete Process Words)

**What It Is:** Sentence structure that hides the subject.

**Why It's Bad:** Verbs like "send," "transmit," "process" need: WHAT, HOW, FROM, TO.

| ❌ WRONG (Passive)      | ❓ Ambiguity                    | ✅ RIGHT (Active + Complete)                                                 |
|------------------------|--------------------------------|-----------------------------------------------------------------------------|
| "Data is transmitted"  | By whom? To whom? How?         | "Plane transmits GPS data to tower via TCP every 5 seconds"                 |
| "Payment is processed" | By system or external? Method? | "System processes payment via Stripe API using saved card token"            |
| "Error is logged"      | Where? Format? Who sees?       | "System logs errors to CloudWatch with timestamp, user ID, and stack trace" |

**Rule:** Always use active voice. Specify all parameters.

---

### Error #3: UNIVERSAL QUANTIFIERS (all, every, each, any, always, never)

**What It Is:** Absolutes that are almost always wrong in reality.

**Why It's Bad:** Reality has exceptions, but "all/every" hides them.

**Real Example: McDonald's Bug**

```
Requirement: "Whenever customer removes meat patty, reduce price by €1.10"
Cheapest burger: €1.00
Attack: Order 11 burgers (10 without patty) = €1.00 - €11.00 = -€10.00 (FREE!)
Fix: "For burgers priced €2.00+, removing meat patty reduces price by €1.10"
```

**Common Mistakes:**

| ❌ Too Broad                        | ⚠️ Hidden Exceptions                        | ✅ Specific + Bounded                                                     |
|------------------------------------|---------------------------------------------|--------------------------------------------------------------------------|
| "Report lists ALL airplanes"       | Decommissioned? Sold? Leased? Under repair? | "Report lists all active commercial aircraft in current fleet"           |
| "EVERY customer gets 10% discount" | VIPs? Employees? Already discounted items?  | "Standard customers (non-VIP, non-employee) get 10% on full-price items" |
| "System ALWAYS saves data"         | Offline? Validation fails? Disk full?       | "System saves valid data when online; queues for retry if offline"       |

**Rule:** Challenge every "all/every/never/always." Add bounds and exceptions.

---

### Error #4: INCOMPLETE CONDITIONS (Missing ELSE)

**What It Is:** Specifying IF but not ELSE.

**Why It's Bad:** System behavior undefined for negative case.

**Examples:**

| ❌ Incomplete                          | ❓ What if FALSE?                     | ✅ Complete with ELSE                                                                                                     |
|---------------------------------------|--------------------------------------|--------------------------------------------------------------------------------------------------------------------------|
| "IF tickets < capacity, issue ticket" | Capacity reached? Exceeded?          | "IF tickets < capacity: issue<br>IF tickets = capacity: waitlist<br>IF tickets > capacity: reject + suggest next flight" |
| "IF balance > withdrawal, allow"      | Insufficient balance? Exactly equal? | "IF balance ≥ withdrawal: allow<br>ELSE: reject with 'Insufficient funds' message"                                       |

**Feature Interaction:** Two rules, unclear combination

```
Rule 1: "Handicapped customers get 10% discount"
Rule 2: "Children get 8% discount"
Question: What does handicapped child get? 10%? 8%? 18%? Higher of two?
```

**Rule:** Specify ALL branches. Test for feature interactions.

---

### Error #5: NOUNS WITHOUT REFERENCE INDEX (Under-Specified)

**What It Is:** Using categories without defining boundaries.

**Why It's Bad:** Implicit "all" creates ambiguity.

| ❌ Vague Noun                  | ❓ Which Ones?                             | ✅ Specific with Bounds                                                         |
|-------------------------------|-------------------------------------------|--------------------------------------------------------------------------------|
| "Children get 8% discount"    | What age? Employee children? All flights? | "Children ages 2-12 (excluding employee dependents) get 8% on leisure flights" |
| "Customers can cancel orders" | Before shipment? After? Partial?          | "Customers can cancel unshipped orders up to 2 hours before dispatch"          |
| "Sensitive data is encrypted" | What counts as sensitive?                 | "PII (name, email, SSN, payment info) encrypted with AES-256"                  |

**Rule:** Every noun needs bounds. Use glossary to define categories.

---

## 2.2 The Glossary: Your Project's Dictionary

**Purpose:** Create a **ubiquitous language** (Domain-Driven Design) that everyone uses consistently.

"Names in software systems are one of the most important things we have to deal with." — Martin Fowler

### Glossary Template

| Field             | Purpose                      | Example                                                                           |
|-------------------|------------------------------|-----------------------------------------------------------------------------------|
| **Term**          | Canonical name               | "PII"                                                                             |
| **Description**   | Clear definition             | "Personally Identifiable Information: data that identifies a specific individual" |
| **Synonyms**      | Alternatives (discourage)    | "Personal Data, Private Info"                                                     |
| **Homonyms**      | Same word, different meaning | "PII" also means "Payment Interconnection Network" in banking                     |
| **Subcategories** | Specific types               | "Direct PII (SSN, name), Indirect PII (IP address, device ID)"                    |
| **Relationships** | Links to other terms         | "Subset of 'Sensitive Data', governed by 'Data Protection Policy'"                |
| **Examples**      | Concrete instances           | "Name, email, SSN, biometric data, location history"                              |
| **Non-Examples**  | What it's NOT                | "Anonymized aggregate statistics, public company data"                            |

### When Glossary Prevents Disasters

**Scenario:** "All sensitive personal data must be encrypted in transit and at rest"

**Without Glossary:**

- Developer interprets "sensitive" as SSN/credit cards only
- Product Manager thinks it includes email addresses
- Legal thinks it includes all user behavior data
- Result: Compliance violation, re-implementation, 3-month delay

**With Glossary:**

```
SENSITIVE PERSONAL DATA
- Definition: Data requiring encryption per GDPR Article 9
- Includes: SSN, credit cards, health records, biometrics, location history,
  IP addresses, email addresses, passwords (hashed), session tokens
- Excludes: Anonymized analytics, public profile info user chose to share
- Encryption Standard: AES-256-GCM for at-rest, TLS 1.3 for in-transit
- Key Management: AWS KMS with automatic rotation every 90 days
```

**Rule:** Build glossary BEFORE writing requirements. Update continuously.

---

## 2.3 INVEST Criteria: Quality Framework

**Purpose:** Six criteria that make requirements implementable.

**Applies to:** ALL requirements (not just user stories, despite the name origin).

### The INVEST Model

```
 I - INDEPENDENT    Can implement in any order
 N - NEGOTIABLE     Details worked out later
 V - VALUABLE       Clear benefit to customer
 E - ESTIMABLE      Can estimate effort
 S - SMALL          Fits in one sprint/cycle
 T - TESTABLE       Can verify it works
```

### Detailed Breakdown

#### I - INDEPENDENT

**What:** Requirements don't depend on each other's implementation order.

**Why:** Enables flexible scheduling, parallel work, incremental delivery.

| ❌ DEPENDENT                                                                                     | ✅ INDEPENDENT                                                                                                                                             |
|-------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Req 1: "Save customer data"<br>Req 2: "Display saved customer data"<br>(Req 2 depends on Req 1) | Req 1: "Create Customer entity with save/load interface"<br>Req 2: "Display Customer data via standard interface"<br>(Both use shared interface contract) |

**How to Fix:** Use abstraction layers (interfaces), design by contract, decouple via events/APIs.

---

#### N - NEGOTIABLE

**What:** High-level enough that implementation details can be discussed.

**Why:** Allows developers to find best solution, adapt to constraints.

| ❌ OVER-SPECIFIED                                                                     | ✅ NEGOTIABLE                                                                  |
|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| "Use PostgreSQL database with JSONB column type and GiST indexes for product search" | "Search products by name/category with <200ms response time for 10k products" |
| "Hash passwords with bcrypt cost=12"                                                 | "Hash passwords securely per OWASP guidelines"                                |

**Balance:** Enough detail to estimate, not so much it constrains unnecessarily.

---

#### V - VALUABLE

**What:** Clear, measurable value to end user or business.

**Why:** Prevents building things nobody needs.

| ❌ TECHNICAL JARGON              | ❓ VALUE?           | ✅ BUSINESS VALUE                                                     |
|---------------------------------|--------------------|----------------------------------------------------------------------|
| "Re-index table RG308X nightly" | Why? Who benefits? | "Search results appear <2 seconds so users complete checkout faster" |
| "Implement Redis caching layer" | For what purpose?  | "Reduce API response time 80% to handle Black Friday traffic"        |

**Test:** Can a non-technical stakeholder understand the benefit? If no, rewrite.

---

#### E - ESTIMABLE

**What:** Team can estimate effort with reasonable accuracy.

**Why:** Enables planning, prioritization, commitment.

**Obstacles to Estimation:**

1. **Too vague:** "Improve performance" → How much? Where?
2. **Unknown technology:** Team has no experience
3. **Missing dependencies:** External system behavior unknown
4. **Too large:** Epic-sized, needs decomposition

**Fix:**

- Add acceptance criteria with numbers
- Spike stories for unknowns
- Define external contracts
- Break into smaller pieces

---

#### S - SMALL

**What:** Completable in one iteration (usually 1-2 weeks).

**Why:** Enables frequent integration, reduces risk, maintains momentum.

**Size Guidelines:**

| Story Points | Size          | Duration       | Example                                          |
|--------------|---------------|----------------|--------------------------------------------------|
| 1-2          | Tiny          | Hours to 1 day | "Add field to form"                              |
| 3-5          | Small         | 1-3 days       | "User can reset password via email"              |
| 8-13         | Medium        | 4-7 days       | "Implement order workflow with notifications"    |
| 21+          | **Too Large** | **>1 week**    | **"Build admin dashboard" → SPLIT INTO SMALLER** |

**Epic:** Story too large to estimate → becomes **container** for multiple smaller stories.

---

#### T - TESTABLE

**What:** Can write objective pass/fail test.

**Why:** Verifies requirement met, prevents "done but not really" syndrome.

| ❌ NOT TESTABLE            | ✅ TESTABLE                                                             |
|---------------------------|------------------------------------------------------------------------|
| "System is fast"          | "Search results appear in <200ms for 95% of queries under normal load" |
| "UI is user-friendly"     | "90% of users complete checkout without help in usability test"        |
| "Secure password storage" | "Passwords hashed with bcrypt cost≥10, verified by penetration test"   |

**Formula:**

```
TESTABLE = Observable Behavior + Measurable Criteria + Test Method

Example: "User receives confirmation email" + "within 60 seconds" + "verified by automated test"
```

---

## 2.4 Documentation Formats: Choose the Right One

**Different projects need different formats.** Match format to context.

### Format Decision Matrix

| Format                  | Best For                                | Complexity | Agility | Formality |
|-------------------------|-----------------------------------------|------------|---------|-----------|
| **User Stories**        | Agile teams, product development        | Low        | High    | Low       |
| **Acceptance Criteria** | Sprint planning, QA handoff             | Low        | High    | Low       |
| **Gherkin/BDD**         | Automated testing, behavior specs       | Medium     | High    | Medium    |
| **Use Cases**           | Complex workflows, formal docs          | High       | Low     | High      |
| **Volere Snow Cards**   | Regulated industries, long-term systems | High       | Low     | High      |

---

### Format 1: USER STORIES

**Structure:**

```
As a [ROLE],
I want [FEATURE]
So that [BENEFIT]

Acceptance Criteria:
- [Testable condition 1]
- [Testable condition 2]
- [Testable condition 3]
```

**Example:**

```
As a customer,
I want to save my shipping address
So that I can check out faster on future purchases

Acceptance Criteria:
- Can save up to 3 addresses
- Addresses persist across sessions
- Can set one as default
- Can edit/delete saved addresses
- Works on mobile and desktop
```

**When to Use:** Agile teams, product backlogs, customer-focused features
**Pros:** Simple, conversational, focuses on value
**Cons:** Can be vague, lacks technical detail, hard for complex systems

---

### Format 2: ACCEPTANCE CRITERIA

**Structure:** Bullet list of specific, testable conditions

**Example:**

```
FEATURE: Password Reset

✓ User receives reset email within 60 seconds
✓ Email contains unique token valid for 24 hours
✓ Token expires after one use
✓ User cannot reuse last 5 passwords
✓ New password must be 8+ chars with uppercase, lowercase, number, symbol
✓ User automatically logged in after successful reset
✓ Failed reset attempts logged for security audit
```

**When to Use:** Defining "done," QA test planning, sprint review
**Pros:** Clear, concrete, testable, easy to verify
**Cons:** Doesn't explain "why," can be long for complex features

---

### Format 3: GHERKIN (Behavior-Driven Development)

**Structure:**

```
GIVEN [initial context/state]
WHEN [event/action occurs]
THEN [expected outcome]
AND [additional outcomes]
BUT [constraints/exceptions]
```

**Example:**

```
Scenario: User withdraws amount exceeding balance

GIVEN user has account with balance of $100
WHEN user attempts to withdraw $150
THEN system rejects the transaction
AND displays "Insufficient funds. Available: $100"
AND logs rejection for fraud detection
BUT allows partial withdrawal up to $100 if user confirms
```

**Advanced: Scenario Outline (Data-Driven)**

```
Scenario Outline: Discount calculation

GIVEN customer is <customer_type>
AND order total is <amount>
WHEN applying discounts
THEN final price is <final_amount>

Examples:
| customer_type | amount | final_amount |
| Regular       | 100    | 100          |
| VIP           | 100    | 90           | (10% discount)
| Employee      | 100    | 80           | (20% discount)
```

**When to Use:** Automated testing (Cucumber, SpecFlow), behavior specs, collaboration with QA
**Pros:** Executable specs, bridges business/technical, prevents misunderstanding
**Cons:** Verbose, requires tooling, learning curve

---

### Format 4: USE CASES (Structured Scenarios)

**Structure:**

```
USE CASE: [Name]
ACTOR: [Primary user]
PRECONDITIONS: [What must be true before]
TRIGGER: [What starts this]

MAIN SUCCESS SCENARIO:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
  ...

EXTENSIONS (Exceptions):
  2a. [Alternative at step 2]
  3b. [Error at step 3]
  *a. [Can happen at any step]

POSTCONDITIONS: [What is true after]
```

**Example:**

```
USE CASE: Process Customer Order
ACTOR: Customer
PRECONDITIONS: Customer logged in, cart has items, payment method saved
TRIGGER: Customer clicks "Place Order" button

MAIN SUCCESS SCENARIO:
  1. System displays order summary (items, prices, shipping, total)
  2. Customer reviews and confirms order
  3. System charges payment method
  4. System decrements inventory for each item
  5. System creates shipment record
  6. System sends confirmation email to customer
  7. System displays "Order Placed" message with order number

EXTENSIONS:
  3a. Payment declined:
    3a1. System displays error message
    3a2. System returns to payment screen
    3a3. Use case continues at step 1

  4a. Item out of stock:
    4a1. System removes out-of-stock items from order
    4a2. System recalculates total
    4a3. System asks customer to confirm modified order
    4a4. Use case continues at step 2

  *a. System error:
    *a1. System logs error with context
    *a2. System displays "Try again" message
    *a3. Use case aborts

POSTCONDITIONS:
  Success: Order created, inventory updated, customer charged, email sent
  Failure: No changes to inventory or charges
```

**When to Use:** Complex workflows, formal documentation, contractual requirements
**Pros:** Comprehensive, handles exceptions, good for training
**Cons:** Verbose, time-consuming, can become outdated quickly

---

### Format 5: VOLERE SNOW CARDS (Comprehensive Attributes)

**Structure:** Comprehensive requirement cards with full metadata

**Template:**

```
┌─────────────────────────────────────────────────────────┐
│ ID: REQ-001                                             │
│ Type: Functional                          Priority: Must│
├─────────────────────────────────────────────────────────┤
│ DESCRIPTION:                                            │
│ The system shall process credit card payments via       │
│ Stripe API with PCI-DSS compliance                      │
├─────────────────────────────────────────────────────────┤
│ RATIONALE (Why):                                        │
│ Enables e-commerce revenue, required for launch         │
├─────────────────────────────────────────────────────────┤
│ FIT CRITERION (How to test):                            │
│ - Successful payment for valid card in <3 seconds      │
│ - Failed payment with clear error message               │
│ - Passes PCI-DSS audit                                  │
├─────────────────────────────────────────────────────────┤
│ SOURCE: Product Owner + CFO requirement                 │
│ DEPENDENCIES: REQ-015 (Secure Customer Data Storage)   │
│ CONFLICTS: None                                         │
│ RELATED USE CASES: UC-003 (Checkout Flow)              │
│ VERIFICATION METHOD: Automated test + Manual audit      │
│ HISTORY: Created 2024-01-15, Refined 2024-02-03        │
└─────────────────────────────────────────────────────────┘
```

**When to Use:** Regulated industries (medical, aerospace, finance), long-term systems, contractual projects
**Pros:** Comprehensive, traceable, excellent for maintenance, audit-ready
**Cons:** Heavy overhead, requires discipline, can slow agile teams

---

## 2.5 The Rule of Ten: Why Requirements Quality Matters

**Concept:** Cost to fix defects increases **10x** at each project phase.

### Cost Multiplication Table

| Phase Defect Introduced | Phase Discovered | Cost Multiplier | Real Cost Example |
|-------------------------|------------------|-----------------|-------------------|
| **Requirements**        | Requirements     | 1x              | $100              |
| **Requirements**        | Design           | 10x             | $1,000            |
| **Requirements**        | Implementation   | 100x            | $10,000           |
| **Requirements**        | Testing          | 1,000x          | $100,000          |
| **Requirements**        | Production       | 10,000x         | $1,000,000        |

### Why the Explosion?

**At Requirements Phase:**

- Change = update document
- Affected: 1 person, 30 minutes
- Cost: $100

**At Implementation Phase:**

- Change = update document + redesign + recode + retest
- Affected: 5 people, 40 hours
- Ripple effects through system
- Cost: $10,000

**In Production:**

- Change = emergency patch + rollback plan + customer notification + data migration + regression testing + documentation
  update
- Affected: entire team, 400+ hours
- Business impact: lost revenue, damaged reputation
- Cost: $1,000,000+

### Key Insight

**"Fixing requirements defects causes HALF of your project's cost."**

**Implication:** Investing in requirements quality saves massive money later.

**Action:** Allocate 20-30% of project time to requirements. It's not overhead—it's insurance.

---

# PHASE 3: STRUCTURE - Organizing Requirements

## 3.1 Requirements Stability: Stable vs. Unstable

**Purpose:** Not all requirements change at the same rate. Design architecture accordingly.

### Classification

| Characteristic       | Stable Requirements                                       | Unstable Requirements                                       |
|----------------------|-----------------------------------------------------------|-------------------------------------------------------------|
| **Change frequency** | Rarely or never                                           | Frequently                                                  |
| **Examples**         | Core business rules, physical laws, fundamental processes | UI preferences, integrations, vendor specifics, regulations |
| **Typical sources**  | Domain logic, industry standards                          | Technology choices, partners, user preferences              |
| **Impact of change** | Major (core system)                                       | Localized (if properly isolated)                            |

### Examples by Domain

**E-Commerce:**

- **Stable:** "Order total = sum of line items," "Charge customer before shipping"
- **Unstable:** "Integrate with Stripe," "Show reviews on product page," "Support Apple Pay"

**Healthcare:**

- **Stable:** "Doctor must prescribe before pharmacy dispenses," "Log all medication administration"
- **Unstable:** "Interface with Epic EMR system," "Generate PDF reports," "Support biometric login"

**Banking:**

- **Stable:** "Debit = decrease balance," "Transaction requires authorization"
- **Unstable:** "Comply with PSD2," "Integrate with Plaid," "Support cryptocurrency"

### Architecture Strategy for Instability

**Problem:** If stable and unstable requirements mixed, changes to unstable parts break stable core.

**Solution:** **Separate axes of change** (Uncle Bob Martin)

#### Pattern 1: STRATEGY PATTERN

Encapsulate volatile algorithms behind interface.

```
STABLE INTERFACE:           UNSTABLE IMPLEMENTATIONS:
IPaymentProcessor           StripePaymentProcessor
  + ProcessPayment()         PayPalPaymentProcessor
  + RefundPayment()          CryptoPaymentProcessor
                             (Add new without changing interface)
```

#### Pattern 2: PLUGIN ARCHITECTURE

Core system stable, plugins unstable.

```
STABLE CORE                 UNSTABLE PLUGINS
Application Core        ←   Stripe Plugin
  + Domain logic       ←   Email Plugin
  + Business rules      ←   Analytics Plugin
                        ←   (Plugins can change/add/remove)
```

#### Pattern 3: HEXAGONAL/PORTS & ADAPTERS

Stable domain logic, unstable infrastructure.

```
        STABLE DOMAIN CORE
    ┌─────────────────────┐
    │  Business Logic     │
    │  Domain Model       │
    └─────────────────────┘
    Ports (Interfaces)
    ↓         ↓         ↓
ADAPTERS (UNSTABLE):
Database  Web API  Message Queue
MySQL     REST     RabbitMQ
→ Easy to swap ←
```

**Key Principle:** Unstable depends on stable, never reverse.

---

## 3.2 Dependency Management & Traceability

**Purpose:** Track how requirements relate to sources, each other, and implementation.

### The Three Types of Traceability

```
SOURCES ←─────────── REQUIREMENTS ─────────→ IMPLEMENTATION
        Pre-RS Trace              Post-RS Trace

              ↕
      Inter-Requirement
       Dependencies
```

---

### 1. PRE-RS TRACEABILITY (Backward)

**Links:** Requirements ← Sources (stakeholders, documents, regulations, existing systems)

**Purpose:**

- Validate necessity ("Who asked for this? Why?")
- Impact analysis when source changes (regulation updated → which requirements affected?)
- Audit compliance ("Show me how you traced to the regulation")

**Example:**

```
REQ-042: "Delete user data within 30 days of request"
  ← SOURCE: GDPR Article 17 (Right to Erasure)
  ← STAKEHOLDER: Chief Legal Officer
  ← DATE: 2024-01-15
  ← RATIONALE: Legal compliance, avoid €20M fine
```

**Tool:** Traceability matrix (spreadsheet or specialized tool like DOORS/Jama)

---

### 2. POST-RS TRACEABILITY (Forward)

**Links:** Requirements → Design → Code → Tests

**Purpose:**

- Coverage analysis ("Is every requirement implemented?")
- Impact analysis when requirement changes ("What code needs updating?")
- Test coverage ("Is every requirement tested?")

**Example:**

```
REQ-042: "Delete user data within 30 days"
  → DESIGN: DataDeletionService class
  → CODE: src/services/DataDeletionService.java:deleteUserData()
  → TESTS: DataDeletionServiceTest.java:testDeleteWithin30Days()
  → VERIFICATION: Passed automated test + manual audit
```

**Tool:** Code comments, test names, requirements management integration

---

### 3. INTER-REQUIREMENT DEPENDENCIES

**Links:** Requirement ↔ Requirement

**Types:**

| Dependency Type  | Description                 | Example                                                       |
|------------------|-----------------------------|---------------------------------------------------------------|
| **CONFLICT**     | Contradictory requirements  | "Free shipping" vs. "Cover shipping costs via fees"           |
| **REFINEMENT**   | One elaborates another      | "Secure login" → "Use OAuth 2.0" → "Support Google/Microsoft" |
| **PREREQUISITE** | One must exist before other | "User account" before "Save preferences"                      |
| **ALTERNATIVE**  | Mutually exclusive options  | "Dark mode" XOR "Auto theme based on time"                    |

**Example Network:**

```
REQ-010: "User can log in"
  ↓ REQUIRES
REQ-011: "User has account"
  ↓ REQUIRES
REQ-012: "User can register"
  ← CONFLICTS WITH
REQ-013: "Only admin can create accounts"
```

**Visualization:** Dependency graph (nodes = requirements, edges = relationships)

---

### Traceability Implementation Methods

| Method                           | Tool                      | Pros                       | Cons                            |
|----------------------------------|---------------------------|----------------------------|---------------------------------|
| **Text references**              | Document hyperlinks       | Simple, no special tools   | Breaks easily, hard to maintain |
| **Trace matrix**                 | Excel/Google Sheets       | Visual, easy to understand | Doesn't scale, manual updates   |
| **Trace graph**                  | Visio, Draw.io            | Shows complexity visually  | Static, needs redrawing         |
| **Requirements management tool** | DOORS, Jama, Azure DevOps | Automatic, bidirectional   | Expensive, learning curve       |
| **Code annotations**             | Source code comments      | Co-located with code       | Only for post-RS, scattered     |

**Recommendation:**

- **Small projects (<50 requirements):** Spreadsheet matrix
- **Medium projects (50-500):** Azure DevOps or Jira
- **Large/regulated (500+):** IBM DOORS or Jama Connect

---

## 3.3 Requirements Attributes: Beyond the Basics

**Purpose:** Metadata that helps manage requirements over their lifecycle.

### Volere Comprehensive Attribute Set

| Attribute               | Purpose                          | Example                                            |
|-------------------------|----------------------------------|----------------------------------------------------|
| **ID**                  | Unique identifier                | REQ-042                                            |
| **Description**         | What is required                 | "Delete user data within 30 days of request"       |
| **Type**                | Functional/Non-functional        | Functional                                         |
| **Rationale**           | Why it's needed                  | "GDPR Article 17 compliance"                       |
| **Source**              | Who requested                    | "Chief Legal Officer"                              |
| **Fit Criterion**       | How to verify                    | "Data deleted and verified gone in database audit" |
| **Priority**            | Must/Should/Could/Won't (MoSCoW) | Must                                               |
| **Dependencies**        | Related requirements             | "Depends on REQ-038 (User authentication)"         |
| **Conflicts**           | Contradictory requirements       | "None"                                             |
| **History**             | Change log                       | "Created 2024-01-15, approved 2024-01-20"          |
| **Verification Method** | How to test                      | "Automated test + compliance audit"                |
| **Related Use Cases**   | Which scenarios                  | "UC-07 (Delete Account)"                           |

### Priority Systems

#### MoSCoW Method

- **M** - Must have (non-negotiable, system fails without)
- **S** - Should have (important but not vital)
- **C** - Could have (nice to have if time/budget)
- **W** - Won't have (explicitly out of scope for this release)

#### Kano-Based Priority (Aligns with requirement types)

- **Basic:** Must deliver (baseline expectations)
- **Performance:** Prioritize high-impact metrics
- **Excitement:** Deliver 1-2 delighters if budget allows
- **Legal:** Must deliver (non-negotiable)

#### Risk-Value Matrix

```
        │ High Value
        │ High Risk
   HIGH │ ╔════════╗  ╔════════╗
        │ ║Schedule║  ║Priority║
  RISK  │ ║Carefully║  ║ Highest║
        │ ╚════════╝  ╚════════╝
        │─────────────┼──────────
        │ ╔════════╗  ╔════════╗
   LOW  │ ║  Skip  ║  ║  Quick ║
        │ ║  This  ║  ║  Wins  ║
        │ ╚════════╝  ╚════════╝
        └─────────────┬──────────→
         LOW    VALUE   HIGH
```

**Decision:**

- High Value, Low Risk = Do first (quick wins)
- High Value, High Risk = Do carefully (highest priority but needs mitigation)
- Low Value, Low Risk = Do if time
- Low Value, High Risk = Skip

---

# PHASE 4: MAINTAIN - Keeping Requirements Alive

## 4.1 Requirements Review Psychology

**Problem:** Reviews feel like policing, creating defensiveness and conflict.

**Solution:** Shift mindset from "police" to "partner."

### Language Reframing

| ❌ Confrontational             | ✅ Collaborative                                    |
|-------------------------------|----------------------------------------------------|
| "You wrote this wrong"        | "I interpreted this as... Is that what you meant?" |
| "This requirement is unclear" | "Could we add an example to make this clearer?"    |
| Call them "reviewee"          | Call them "review partner"                         |
| "Fix these 10 errors"         | "I found some opportunities to strengthen this"    |
| Focus on person               | Focus on requirement quality                       |

### Review Principles

1. **Service Mindset:** You're helping achieve a shared goal, not judging.
2. **Ask Questions:** "How would we test this?" vs. "This isn't testable."
3. **Provide Examples:** Show what good looks like, don't just criticize.
4. **Acknowledge Quality:** Start with what's good, then improve areas.
5. **Reference Standards:** "INVEST criteria suggest..." vs. "I think..."

### Review Checklist

Use this during reviews:

```
□ INVEST Criteria:
  □ Independent? Can implement in any order?
  □ Negotiable? Room for implementation flexibility?
  □ Valuable? Clear benefit stated?
  □ Estimable? Enough detail to estimate?
  □ Small? Fits in one sprint?
  □ Testable? Can write pass/fail test?

□ Natural Language Quality:
  □ Active voice (no passive)?
  □ No nominalizations (use verbs)?
  □ No universal quantifiers without bounds?
  □ All conditions specified (if/else complete)?
  □ All nouns have reference indices?

□ Completeness:
  □ Rationale (why) provided?
  □ Fit criterion (how to test) clear?
  □ Dependencies identified?
  □ Source traced?
  □ Priority assigned?

□ Traceability:
  □ Source documented?
  □ Use cases linked?
  □ Design elements identified?
```

---

## 4.2 Conflict Resolution Framework

**Reality:** Stakeholders disagree. You need systematic ways to resolve.

### The 4 Resolution Strategies

#### 1. VOTING (Democratic)

**When to Use:**

- Multiple stakeholders with equal power
- Decision doesn't have clear "right" answer
- Need buy-in from group

**Methods:**

- **Simple majority:** >50% wins
- **Weighted voting:** Stakeholder power × vote = weight
- **Dot voting:** Each person gets N dots to distribute across options

**Example:**

```
DECISION: Which 5 features for MVP?
STAKEHOLDERS: 6 product managers
METHOD: Each gets 5 dots to allocate

Results:
Feature A: ●●●●●●● (7 dots) → INCLUDE
Feature B: ●●●●●● (6 dots) → INCLUDE
Feature C: ●●●●● (5 dots) → INCLUDE
Feature D: ●●● (3 dots) → INCLUDE
Feature E: ●● (2 dots) → DEFER
Feature F: ● (1 dot) → DEFER
```

**Pros:** Fair, inclusive, builds consensus
**Cons:** May not reflect true priorities, can be political

---

#### 2. ESCALATION (Authority)

**When to Use:**

- Deadlock between stakeholders
- Strategic decision needed
- Conflicting requirements with no compromise

**Process:**

1. Document both positions clearly
2. Present pros/cons of each
3. Escalate to decision authority (product owner, exec, steering committee)
4. Document decision and rationale
5. Communicate back to stakeholders

**Example:**

```
CONFLICT: "Free shipping" (Marketing) vs. "Cover costs" (Finance)
POSITIONS:
  Marketing: Free shipping increases conversion 25%, competitors offer it
  Finance: Free shipping costs $2M/year, unsustainable

ESCALATION TO: CEO
DECISION: Free shipping for orders >$50 only
RATIONALE: Balances conversion boost with cost control, increases average order value

DOCUMENTED: ADR-007 (Architecture Decision Record)
```

**Pros:** Clear decision, moves forward
**Cons:** May bypass important perspectives, can feel authoritarian

---

#### 3. VARIANTS (Configuration)

**When to Use:**

- Multiple valid approaches exist
- Different customer segments have different needs
- Cost of supporting multiple options is acceptable

**Approaches:**

- **Product variants:** Different SKUs/editions (Basic/Pro/Enterprise)
- **Configuration flags:** Feature flags/toggles
- **Personalization:** User preferences
- **Localization:** Regional differences

**Example:**

```
CONFLICT: Dashboard layout preference differs by role
RESOLUTION: Configurable dashboard

Implementation:
- Admin sees: User management, system health, revenue
- Sales sees: Leads, pipeline, quotas
- Support sees: Tickets, SLA status, customer satisfaction
Each role gets customized default, can further personalize
```

**Pros:** Satisfies everyone, increases flexibility
**Cons:** Complexity, higher cost, more testing

---

#### 4. VERSION MANAGEMENT (Phasing)

**When to Use:**

- Requirements valid but can't all be delivered now
- Time-based resolution (priorities change over time)
- MVP → enhancement progression

**Approaches:**

- **Releases:** V1.0 (core), V2.0 (enhancements), V3.0 (advanced)
- **Sprints:** Sprint 1 (must), Sprint 2 (should), Sprint 3 (could)
- **Roadmap:** Q1 (launch), Q2 (optimize), Q3 (innovate)

**Example:**

```
CONFLICT: 20 features requested, budget for 8

RESOLUTION: 3-phase roadmap

PHASE 1 (MVP - Q1):
  - Core: User registration, login, basic search (must-haves)
  - Goal: Launch, validate market fit

PHASE 2 (Growth - Q2):
  - Enhanced: Advanced search, saved filters, notifications
  - Goal: Improve retention

PHASE 3 (Innovation - Q3):
  - Delighters: AI recommendations, social sharing
  - Goal: Competitive differentiation
```

**Pros:** Everyone gets their features eventually, manages scope
**Cons:** Requires discipline, early stakeholders may feel deprioritized

---

### Conflict Resolution Decision Tree

```
START: Requirements conflict detected
  │
  ├─ Are stakeholders equals? ─YES→ VOTING
  │                              │
  │                              NO
  │                              ↓
  ├─ Is there a clear authority? ─YES→ ESCALATION
  │                                 │
  │                                 NO
  │                                 ↓
  ├─ Can we support both? ─YES→ VARIANTS (if cost acceptable)
  │                          │
  │                          NO
  │                          ↓
  └─ Can we deliver over time? ─YES→ VERSION MANAGEMENT
                                 │
                                 NO
                                 ↓
                           ESCALATION (must decide)
```

---

## 4.3 Prompt Engineering for Requirements (AI Era)

**Modern Reality:** AI assists with requirements generation, analysis, and validation.

### Prompt Engineering Principles

#### 1. N-SHOT LEARNING (Few-Shot Prompts)

**Concept:** Provide examples of what you want. AI learns the pattern.

**Zero-Shot (Weak):**

```
Write a requirement for password reset.
```

**Few-Shot (Strong):**

```
Here are examples of well-written requirements:

1. "The system shall authenticate users via OAuth 2.0 within 2 seconds of credential submission."
2. "The system shall hash passwords using bcrypt with minimum cost factor 12 before database storage."
3. "The system shall log failed login attempts with timestamp, IP address, and username to CloudWatch."

Each has: active voice, specific technology, measurable criteria, implementation detail.

Now write a requirement for password reset in the same style.
```

**Result Quality:** 5x better with examples.

**Rule:** Always provide 2-5 examples when asking AI to generate requirements.

---

#### 2. STRUCTURED INPUT/OUTPUT

**Problem:** Vague prompts get vague results.

**Solution:** Specify exact structure you want.

**Bad Prompt:**

```
What are the requirements for a login system?
```

**Good Prompt:**

```
Generate functional requirements for a login system.

CONTEXT:
- B2B SaaS application for healthcare
- 10,000 concurrent users expected
- HIPAA compliance required
- Integration with Okta SSO

OUTPUT FORMAT:
For each requirement provide:
- ID (REQ-XXX)
- Description (active voice, specific)
- Type (Functional/Non-Functional)
- Priority (Must/Should/Could)
- Fit Criterion (how to test)

Generate 5-7 requirements covering:
- Authentication methods
- Session management
- Security
- Error handling
```

**Result:** Structured, actionable output instead of generic prose.

---

#### 3. PROMPT COHESION (Single Responsibility)

**Problem:** Asking AI to do too much at once reduces quality.

**Bad (Too Many Tasks):**

```
Analyze these requirements for quality issues, suggest improvements,
generate test cases, create a traceability matrix, and prioritize them.
```

**Good (Step by Step):**

```
STEP 1: Analyze these requirements. For each, identify:
- Nominalization (using nouns instead of verbs)
- Passive voice
- Universal quantifiers (all/every/always)
- Incomplete conditions (missing else)
- Vague nouns without bounds

[AI provides analysis]

STEP 2: For the top 3 issues found, suggest specific rewrites using:
- Active voice
- Concrete verbs
- Bounded quantifiers
- Complete if/else conditions

[AI provides rewrites]

STEP 3: For the improved requirements, generate Gherkin test scenarios...
```

**Rule:** One prompt = one job. Chain prompts for complex workflows.

---

#### 4. SELF-CRITIQUE & SELF-EVAL

**Technique:** Have AI review its own output before returning.

**Prompt:**

```
Generate 5 requirements for payment processing.

After generating, self-review each against INVEST criteria:
- Independent: Rate 1-5 and explain
- Negotiable: Rate 1-5 and explain
- Valuable: Rate 1-5 and explain
- Estimable: Rate 1-5 and explain
- Small: Rate 1-5 and explain
- Testable: Rate 1-5 and explain

Any requirement scoring <4 on any criterion: revise and regenerate.

Return only final revised requirements with scores.
```

**Result:** Built-in quality control, fewer iterations.

---

#### 5. SYSTEM PROMPT AWARENESS

**Reality:** LLMs have hidden "system prompts" that influence behavior.

**Example System Prompt (Typical):**

```
You are a helpful assistant. Be concise, accurate, and polite.
Refuse harmful requests. Admit when uncertain.
```

**Implication:** AI may be overly cautious, give generic answers, avoid specifics.

**Override Technique:**

```
You are an expert requirements engineer with 20 years experience
in safety-critical systems (aerospace, medical devices).

Your role: Write precise, unambiguous, testable requirements following
DO-178C and IEC 62304 standards. Be specific about implementation details.
Use active voice, concrete verbs, measurable criteria.

Do NOT: Use vague language, passive voice, universal quantifiers, or
leave conditions undefined. Do NOT hedge with "consider" or "should perhaps."

[Your actual prompt follows...]
```

**Result:** More authoritative, specific, useful output.

---

### Prompt Library for Requirements Work

Build a library of proven prompts:

**1. Requirement Generation:**

```
Generate [N] [type] requirements for [feature] in [domain].
Context: [user count], [compliance needs], [tech stack]
Style: Active voice, measurable, testable
Format: [chosen format from page XX]
Examples: [provide 2-3]
```

**2. Requirement Analysis:**

```
Analyze these requirements for common quality issues:
- Nominalization, passive voice, universal quantifiers,
  incomplete conditions, vague nouns
Output: Table with [Requirement ID | Issue Type | Severity | Suggestion]
```

**3. Test Case Generation:**

```
For requirement [REQ-ID]: [description]
Generate Gherkin scenarios covering:
- Happy path (main success scenario)
- Edge cases (boundary conditions)
- Error cases (invalid inputs, system failures)
Format: GIVEN-WHEN-THEN-BUT
```

**4. Requirement Improvement:**

```
Improve this requirement using INVEST criteria:
Original: [paste requirement]
Problems: [paste analysis from step 2]
Output: Revised requirement + rationale for changes
```

**5. Traceability Analysis:**

```
Given these requirements: [list]
And these stakeholder requests: [list]
Identify:
- Which requests map to which requirements
- Which requests have no requirements (gaps)
- Which requirements have no request (gold plating?)
Output: Traceability matrix
```

---

# QUICK REFERENCE SECTION

## Cheat Sheet: Common Situations

| Situation                     | What to Do                                                                                   | Reference   |
|-------------------------------|----------------------------------------------------------------------------------------------|-------------|
| **Starting new project**      | 1. Identify sources (texts/systems/people)<br>2. Build glossary<br>3. Create context diagram | Page XX, XX |
| **Stakeholders disagree**     | Use conflict resolution framework (voting/escalation/variants/versioning)                    | Page XX     |
| **Vague requirement**         | Apply 5 language rules, add fit criterion, provide example                                   | Page XX     |
| **Too many requirements**     | Prioritize with MoSCoW + Risk-Value matrix                                                   | Page XX     |
| **Can't estimate**            | Check INVEST-Estimable: clarify, add detail, or spike                                        | Page XX     |
| **Requirements changing**     | Check stability classification, refactor architecture if unstable core exposed               | Page XX     |
| **Lost traceability**         | Rebuild matrix: sources→requirements→design→code→tests                                       | Page XX     |
| **Poor review feedback**      | Reframe with service mindset, reference standards not opinions                               | Page XX     |
| **Using AI for requirements** | Use few-shot prompts with structure, self-critique                                           | Page XX     |

---

## Decision Trees

### "How Should I Document This Requirement?"

```
START
  │
  ├─ Is this Agile project? ─YES→ User Story + Acceptance Criteria
  │                           │
  │                           NO
  │                           ↓
  ├─ Do you need BDD/automation? ─YES→ Gherkin
  │                                 │
  │                                 NO
  │                                 ↓
  ├─ Is this complex workflow? ─YES→ Use Case
  │                               │
  │                               NO
  │                               ↓
  └─ Is this regulated/long-term? ─YES→ Volere Snow Card
                                    │
                                    NO → User Story (simplest)
```

---

### "How Should I Elicit This Requirement?"

```
START: What type of requirement?
  │
  ├─ BASIC (implicit) ────→ WATCH: Observe users, prototype
  ├─ LEGAL (mandated) ────→ READ: Analyze regulations, standards
  ├─ PERFORMANCE (metric) ─→ TALK: Interview, survey, workshop
  ├─ EXCITEMENT (novel) ──→ THINK: Brainstorm, Osborn checklist
  └─ SUPERFLUOUS (overengineered) → CHALLENGE: Ask "Why?" 5 times
```

---

### "How Should I Resolve This Conflict?"

```
CONFLICT DETECTED
  │
  ├─ Equal stakeholders? ─YES→ VOTING
  │                        │
  │                        NO
  │                        ↓
  ├─ Clear authority exists? ─YES→ ESCALATION
  │                            │
  │                            NO
  │                            ↓
  ├─ Can support both? ─YES→ VARIANTS
  │                       │
  │                       NO
  │                       ↓
  └─ Can deliver later? ─YES→ VERSION MANAGEMENT
                          │
                          NO → ESCALATION (forced)
```

---

## One-Page Summary: The Entire Model

```
┌─────────────────────────────────────────────────────────────────┐
│                  REQUIREMENTS ENGINEERING MODEL                  │
└─────────────────────────────────────────────────────────────────┘

PHASE 1: DISCOVER
├─ 3 Sources: Texts, Systems, People
├─ Kano: Basic/Legal/Performance/Excitement/Superfluous
├─ WRTT: Watch, Read, Think, Talk
└─ Stakeholder Analysis: Context diagram + power/interest matrix

PHASE 2: DEFINE
├─ 5 Language Rules: No nominalization, active voice, no "all/every",
│  complete conditions, specify all nouns
├─ Glossary: Build before requirements, maintain continuously
├─ INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable
├─ Formats: User Stories, Acceptance Criteria, Gherkin, Use Cases, Volere
└─ Rule of Ten: Fix defects early (1x→10x→100x→1000x→10000x cost growth)

PHASE 3: STRUCTURE
├─ Stability: Classify stable vs. unstable, design architecture
├─ Traceability: Pre-RS (←sources), Post-RS (→implementation),
│  Inter-requirement (↔dependencies)
├─ Attributes: ID, type, priority, rationale, fit criterion, source,
│  conflicts, history
└─ Prioritization: MoSCoW + Risk-Value matrix

PHASE 4: MAINTAIN
├─ Review Psychology: Service mindset, collaborative language, focus on
│  quality not person
├─ Conflict Resolution: Voting, Escalation, Variants, Version Management
├─ Change Management: Impact analysis via traceability, validate through
│  dependency graph
└─ AI/Prompt Engineering: Few-shot, structured I/O, prompt cohesion,
   self-critique, system prompt awareness

═══════════════════════════════════════════════════════════════════
KEY PRINCIPLE: Invest in requirements quality to save 10-100x cost later
═══════════════════════════════════════════════════════════════════
```

---

## Glossary of Terms

**Acceptance Criteria:** Specific, testable conditions that define "done" for a requirement.

**Acyclic:** No circular dependencies (A→B→C→A is cycle to avoid).

**Active Voice:** Sentence structure with clear subject performing action ("System validates user" not "User is
validated").

**BDD (Behavior-Driven Development):** Requirements as executable specifications using Gherkin.

**Context Diagram:** Visual showing system boundary and external entities.

**Fit Criterion:** Measurable test that proves requirement is met.

**Gherkin:** Structured language (GIVEN-WHEN-THEN) for behavior specs.

**INVEST:** Quality criteria acronym (Independent, Negotiable, Valuable, Estimable, Small, Testable).

**Kano Model:** Classification of requirements by impact on customer satisfaction.

**MoSCoW:** Prioritization method (Must, Should, Could, Won't).

**Nominalization:** Turning verb into noun ("authorization" instead of "authorize").

**Osborn Checklist:** Creativity technique for generating new ideas by transforming existing.

**Passive Voice:** Sentence structure hiding the subject ("Data is transmitted" - by whom?).

**Post-RS Traceability:** Forward links from requirements to implementation.

**Pre-RS Traceability:** Backward links from requirements to sources.

**Reference Index:** Bounds/qualifiers on nouns (not "customers" but "active paid customers").

**Rule of Ten:** Defect fix cost multiplies 10x each phase (requirements→design→code→test→production).

**Stability:** How often requirement changes (stable=rarely, unstable=frequently).

**Traceability:** Ability to track requirements through their lifecycle.

**Ubiquitous Language:** Consistent terminology across project (Domain-Driven Design).

**Universal Quantifier:** Words like all/every/always/never (usually wrong).

**Use Case:** Structured scenario showing actor, steps, outcomes.

**Volere:** Comprehensive requirements framework with extensive attributes (Snow Cards).

**WRTT:** Four elicitation skills (Watch, Read, Think, Talk).

---

# APPENDICES

## A. NASA Systems Engineering Handbook Highlights

**Key Principles:**

- Requirements flowdown: Stakeholder → System → Subsystem → Component
- "Shall" statements: Mandatory requirements use "shall," not "should" or "may"
- Verification methods: Test, Analysis, Inspection, Demonstration (TAID)
- Requirements baseline: Formal approval before design starts

**NASA Traceability Standard:**

- Every requirement traces to stakeholder need
- Every requirement has verification method
- Changes require formal review board

**Reference:** NASA Systems Engineering Handbook (NASA/SP-2016-6105)

---

## B. ISO 25010 Quality Characteristics (Replaces ISO 9126)

**8 Quality Characteristics for Non-Functional Requirements:**

1. **Functional Suitability:** Completeness, correctness, appropriateness
2. **Performance Efficiency:** Time behavior, resource utilization, capacity
3. **Compatibility:** Co-existence, interoperability
4. **Usability:** Learnability, operability, accessibility, user error protection
5. **Reliability:** Maturity, availability, fault tolerance, recoverability
6. **Security:** Confidentiality, integrity, non-repudiation, accountability, authenticity
7. **Maintainability:** Modularity, reusability, analyzability, modifiability, testability
8. **Portability:** Adaptability, installability, replaceability

**Use:** Categorize non-functional requirements by quality characteristic.

---

## C. Osborn Checklist Adapted for Software

**Original (1953):** Creativity checklist for product innovation

**Adapted for IT Systems (2024):**

| Action         | Questions for Software   | Examples                                                      |
|----------------|--------------------------|---------------------------------------------------------------|
| **ADD**        | What can we add?         | AI, voice control, offline mode, AR, sensors, GPS, biometrics |
| **REMOVE**     | What can we eliminate?   | Steps, clicks, waiting time, unnecessary fields               |
| **COMBINE**    | What can we merge?       | Features, workflows, systems, data sources                    |
| **SEPARATE**   | What can we split?       | Monolith→microservices, roles, environments                   |
| **SUBSTITUTE** | What can we replace?     | Input method (voice for typing), technology stack             |
| **REVERSE**    | What if backwards?       | Workflow order, data flow direction                           |
| **ENLARGE**    | What if bigger?          | Scale, users, data volume, geographic reach                   |
| **SHRINK**     | What if smaller?         | Lightweight version, mobile-first, microservice               |
| **REARRANGE**  | What if different order? | Navigation structure, process sequence                        |
| **ADAPT**      | What if we copy?         | Competitor features, patterns from other industries           |

**Use:** Run through checklist during brainstorming for excitement requirements.

---

## D. Recommended Reading & Standards

**Books:**

- *Software Requirements* by Karl Wiegers & Joy Beatty (3rd Edition)
- *Mastering the Requirements Process* by Suzanne & James Robertson (Volere)
- *User Story Mapping* by Jeff Patton
- *Domain-Driven Design* by Eric Evans
- *The Cucumber Book* by Matt Wynne & Aslak Hellesøy (Gherkin/BDD)

**Standards:**

- ISO/IEC/IEEE 29148:2018 - Systems and software engineering—Life cycle processes—Requirements engineering
- ISO/IEC 25010:2011 - Systems and software Quality Requirements and Evaluation (SQuaRE)
- IEEE 830-1998 - Recommended Practice for Software Requirements Specifications (older but foundational)
- NASA/SP-2016-6105 - NASA Systems Engineering Handbook

**Certifications:**

- IREB (International Requirements Engineering Board) - Certified Professional for Requirements Engineering
- PMI-PBA (Project Management Institute - Professional in Business Analysis)

**Online Resources:**

- IREB Glossary: https://www.ireb.org/en/
- Volere Template: https://www.volere.org/
- NASA Handbook: https://www.nasa.gov/seh/

---

## E. Quick Wins: 5 Things to Do Monday Morning

1. **Create a Glossary Template**
    - Open spreadsheet/doc
    - Add columns: Term, Description, Synonyms, Examples, Non-Examples
    - Add first 5 terms from your current project
    - Share with team

2. **Audit One Requirement for INVEST**
    - Pick your most important requirement
    - Score it 1-5 on each INVEST criterion
    - Rewrite anything scoring <4
    - Use as template for others

3. **Identify Your Unstable Requirements**
    - List all requirements
    - Mark stable (rarely changes) vs. unstable (often changes)
    - Check: Are unstable requirements isolated in architecture?
    - If no, flag for refactoring

4. **Build a Sources Checklist**
    - List: What regulations apply?
    - List: What existing systems are similar?
    - List: Who are all stakeholders?
    - Schedule interviews with gaps

5. **Start Traceability Matrix**
    - Spreadsheet with columns: Requirement ID | Description | Source | Stakeholder | Design Element | Test Case
    - Fill in top 10 requirements
    - Expand weekly

**Result:** In one morning, you'll have 5 practices that prevent 80% of common requirements problems.
