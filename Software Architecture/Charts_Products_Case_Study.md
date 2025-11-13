# Exercise 1: Charts/Products Architecture Analysis

## Situation

Product1 originally used a Common Core containing both chart functionality and financial domain logic. When Product2 was
developed, it needed enhanced chart capabilities, so the chart component was copied and modified (creating Charts2 and
iChart2), while still sharing the financial domain logic. This resulted in duplicate chart code and a Common Core with
mixed responsibilities.

---

## Violated Principles

### 1. SRP (Single Responsibility Principle)

**Definition:** A component should have only one reason to change.

**Violations:**

- Common Core contains both financial domain logic AND chart functionality - two unrelated responsibilities
- Changes to chart requirements force changes in the same component as financial calculations
- Violates cohesion: unrelated concerns packaged together

---

### 2. CCP (Common Closure Principle)

**Definition:** Classes that change together should be packaged together.

**Violations:**

- Charts and Charts2 were created from the same source but packaged separately
- Both change when chart requirements evolve, but changes must be duplicated
- Bug fixes in chart logic don't automatically propagate between the two copies
- High maintenance cost: every chart update requires touching two components

---

### 3. CRP (Common Reuse Principle)

**Definition:** Don't force clients to depend on things they don't use.

**Violations:**

- Product1 uses only Charts, not Charts2, but both may be in the Common Core
- Product2 uses only Charts2, not Charts, creating dead dependencies
- Deployment packages include unused code
- Increases coupling without benefit

---

### 4. OCP (Open-Closed Principle)

**Definition:** Software should be open for extension, closed for modification.

**Violations:**

- Common Core was directly modified to add chart functionality instead of extended
- Charts2 created by copying and modifying iChart instead of extending the abstraction
- Adding Product2 features required changing existing code rather than adding new modules

---

### 5. DIP (Dependency Inversion Principle)

**Definition:** High-level modules should depend on abstractions, not concretions.

**Violations:**

- A-Core1 depends directly on the concrete Charts implementation
- A-Core2 depends directly on the concrete Charts2 implementation
- No stable interface layer between application cores and chart implementations
- Cannot swap chart implementations without changing application code

---

### 6. SDP (Stable Dependencies Principle)

**Definition:** Depend in the direction of stability.

**Violations:**

- A-Core2 immediately depends on newly created Charts2 (unstable, changing rapidly)
- Stable application logic becomes unstable due to dependency on volatile chart enhancements
- Charts2 annotated as "massively enhanced" suggests high change rate

---

### 7. SAP (Stable Abstractions Principle)

**Definition:** Stable packages should be abstract.

**Violations:**

- iChart interface was forked into iChart2 when it should have been stable
- Interface changes indicate the abstraction was wrong or incomplete
- Copying interfaces propagates instability to all implementors

---

## Recommended Fixes

1. **Extract stable interface:** `IChartRenderer` that both Products depend on
2. **Separate implementations:** BasicChartRenderer (Product1), EnhancedChartRenderer (Product2)
3. **Separate domains:** Move financial logic to separate component, independent of charts
4. **Dependency inversion:** A-Cores depend on `IChartRenderer`, implementations are pluggable

**Result:** Products share financial domain, use different chart implementations via common interface, can evolve
independently.
