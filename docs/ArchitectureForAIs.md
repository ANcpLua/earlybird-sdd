# SOFTWARE ARCHITECTURE KNOWLEDGE BASE

## AI-Optimized Semantic Model v1.0

```yaml
@  ONTOLOGY_VERSION: 1.0
  @DOMAIN: Software Architecture
  @PURPOSE: Machine-readable knowledge base for AI reasoning and validation
  @SOURCE: Architecture.md (825 lines)
  @TRANSFORMATION_DATE: 2025-11-13
  @SEMANTIC_MODEL: Entity-Relationship with explicit typing and queryable patterns
```

---

## ENTITY_TYPES

```yaml
entity_types:
  - PRINCIPLE: Fundamental rule or guideline
  - PATTERN: Reusable architectural solution
  - METHOD: Process or technique for architecture development
  - METRIC: Measurable architectural characteristic
  - ARTIFACT: Deliverable or document
  - ANTI_PATTERN: Common architectural mistake
  - QUALITY_ATTRIBUTE: Measurable quality characteristic
  - ARCHITECTURAL_STYLE: Overall system organization approach
  - VIEW: Perspective on architecture documentation
  - DECISION: Architecture choice point
  - CASE_STUDY: Real-world validation example
  - CONCEPT: Abstract architectural idea
  - RULE: Validation or compliance constraint
  - FRAMEWORK: Documentation or development template
  - EVALUATION_METHOD: Architecture assessment technique
```

---

## RELATIONSHIP_TYPES

```yaml
relationship_types:
  - IS_A: Taxonomy/inheritance (X is a type of Y)
  - PART_OF: Composition (X is part of Y)
  - DEPENDS_ON: Dependency (X requires Y)
  - CONFLICTS_WITH: Incompatibility (X contradicts Y)
  - ENABLES: Capability (X makes Y possible)
  - VIOLATES: Principle violation (X breaks Y)
  - MEASURED_BY: Metric relationship (X measured by Y)
  - PREVENTS: Prevention (X stops Y from happening)
  - REQUIRES: Prerequisite (X needs Y to work)
  - IMPLEMENTS: Realization (X realizes Y)
  - REFINES: Elaboration (X adds detail to Y)
  - ADDRESSES: Solution (X solves Y)
  - PRODUCES: Output (X creates Y)
  - USES: Tool/method usage (X employs Y)
  - SERVES: Service relationship (X provides for Y)
  - CONTAINS: Containment (X holds Y)
  - SEPARATES_FROM: Isolation (X kept apart from Y)
  - EVALUATED_BY: Assessment (X checked by Y)
  - DOCUMENTS: Documentation (X describes Y)
  - WRAPS: Encapsulation (X surrounds Y)
  - REPLACES: Substitution (X swaps for Y)
```

---

## CORE_CONCEPTS

### Software Blood Types

```yaml
CONCEPT[id=BLOOD_TYPES_PRINCIPLE]
type: CONCEPT
name: Software Blood Types
description: Fundamental separation of concerns principle
principle: Application logic MUST_BE_SEPARATED_FROM technology concerns
priority: critical
definition: >
  Most critical architectural principle.
  Every building block classified as exactly ONE blood type.
validation_rule: >
  FOR_EACH building_block:
    ASSERT blood_type IN [TYPE_A, TYPE_T, TYPE_O]
    ASSERT NOT (contains_TYPE_A AND contains_TYPE_T)
categories:
  - ENTITY[id=TYPE_A]
  - ENTITY[id=TYPE_T]
  - ENTITY[id=TYPE_O]
foundational_for:
  - CLEAN_ARCHITECTURE
  - DOMAIN_DRIVEN_DESIGN
  - HEXAGONAL_ARCHITECTURE

  ENTITY[id=TYPE_A]
type: CONCEPT
name: Type A (Application/Business)
parent: BLOOD_TYPES_PRINCIPLE
implements: functional_requirements
scope: business_domain
knows_about:
  - domain_concepts
  - business_rules
  - workflows
  - use_cases
does_NOT_know_about:
  - operating_system
  - databases
  - web_frameworks
  - UI_technologies
  - message_queues
  - file_systems
examples:
  - order_validation
  - price_calculation
  - business_rule_enforcement
  - domain_aggregates
  - application_services
color_convention: purple
growth_pattern: grows_with_functional_scope
change_driver: business_requirements
relationship: TYPE_A MUST_NOT_DEPEND_ON TYPE_T_DETAILS

  ENTITY[id=TYPE_T]
type: CONCEPT
name: Type T (Technology/Infrastructure)
parent: BLOOD_TYPES_PRINCIPLE
implements: non_functional_requirements
scope: technical_infrastructure
handles:
  - databases
  - web_servers
  - message_queues
  - OS_interaction
  - network_protocols
  - external_APIs
examples:
  - HTTP_handlers
  - database_adapters
  - logging_infrastructure
  - authentication_middleware
  - message_queue_consumers
color_convention: blue
growth_pattern: size_stays_relatively_constant
change_driver: technology_evolution
relationship: TYPE_T SERVES TYPE_A

  ENTITY[id=TYPE_O]
type: CONCEPT
name: Type O (Universal/Eternal)
parent: BLOOD_TYPES_PRINCIPLE
description: Eternal truths of computer science
scope: universal_algorithms
characteristics:
  - technology_agnostic
  - domain_agnostic
  - minimal_change_expected
examples:
  - string_manipulation
  - math_libraries
  - differential_equation_solvers
  - graph_algorithms
  - encryption_algorithms
color_convention: orange
reusability: maximum
relationship: TYPE_O USED_BY [TYPE_A, TYPE_T]

  PATTERN[id=APPLICATION_CORE_PATTERN]
type: PATTERN
name: Application Core Pattern
category: ARCHITECTURAL_PATTERN
structure:
  core: TYPE_A_ONLY
  ring: TYPE_T_SURROUNDS_CORE
principle: >
  Core contains ONLY A-software.
  Ring contains T-software that interfaces with outside world.
validation: >
  ASSERT core_contains_NO TYPE_T
  ASSERT core_grows_WITH functional_scope
  ASSERT ring_size_STAYS_RELATIVELY_CONSTANT
foundation_of:
  - CLEAN_ARCHITECTURE
  - DOMAIN_DRIVEN_DESIGN
  - HEXAGONAL_ARCHITECTURE
  - ONION_ARCHITECTURE
benefit: Technology independence enables evolution without core changes

  PRINCIPLE[id=MICROSERVICES_BLOOD_TYPE]
type: PRINCIPLE
name: Microservices are A-Services
source: Martin_Fowler
principle: Microservices built around business capabilities
definition: >
  Microservices are TYPE_A services, NOT TYPE_T services.
  Each microservice encapsulates business capability.
validation: >
  IF service_is_microservice
  THEN blood_type MUST_BE TYPE_A
anti_pattern: Technology-focused microservices (database service, logging service)
correct_pattern: Business-capability microservices (order service, customer service)
```

---

## QUALITY_PRINCIPLES

### Cohesion Principles

```yaml
PRINCIPLE[id=SINGLE_RESPONSIBILITY_PRINCIPLE]
type: PRINCIPLE
name: Single Responsibility Principle
aliases: [ SRP ]
category: COHESION_PRINCIPLE
author: Robert_C_Martin
definition: Each building block does ONE job only
detailed_definition: Responsible to one and only one actor
test:
  method: describe_in_simple_sentence
  rule: MUST_NOT_CONTAIN ["and", "or"]
  question: Can you describe it in one simple sentence without 'and' or 'or'?
violation_indicators:
  - multiple_reasons_to_change
  - complex_description_needed
  - mixed_concerns
  - multiple_actors_affected_by_changes
validation_logic: >
  FOR_EACH building_block:
    IF has_multiple_responsibilities
    THEN VIOLATION(SRP)
    RECOMMEND split_into_focused_components
resolution: Split component until each has single responsibility
applies_to:
  - classes
  - components
  - modules
  - microservices

  PRINCIPLE[id=SEPARATION_OF_CONCERNS]
type: PRINCIPLE
name: Separation of Concerns
aliases: [ SOC ]
category: COHESION_PRINCIPLE
definition: Each building block has one concern
scope: universal
applies_to:
  - components
  - if_statements
  - git_branches
  - databases
  - sprints
  - prompts
practical_applications:
  - code: Extract till you drop - small functions with one purpose
  - git: Use Gitflow - one feature per branch
  - databases: Normalize - eliminate redundancy
  - sprints: One sprint goal, coherent work
  - prompts: Chain prompting - one task per prompt
relationship: SEPARATION_OF_CONCERNS GENERALIZES SINGLE_RESPONSIBILITY_PRINCIPLE

  PRINCIPLE[id=DONT_REPEAT_YOURSELF]
type: PRINCIPLE
name: Don't Repeat Yourself
aliases: [ DRY ]
category: COHESION_PRINCIPLE
author: Kent_Beck
definition: Each job implemented only once
quote: "Designs without duplication tend to be easy to change"
violation_detection: >
  IF same_logic_appears_multiple_times
  THEN VIOLATION(DRY)
resolution: Extract common logic to single location
benefit: Changes require modification in only one place
relationship: DRY PREVENTS DUPLICATION_ANTI_PATTERN

  QUALITY_ATTRIBUTE[id=COHESION]
type: QUALITY_ATTRIBUTE
name: Cohesion
definition: Degree to which elements belong together
measurement: Ratio of internal dependencies to total dependencies
interpretation:
  - high_cohesion: Elements strongly related, change together
  - low_cohesion: Elements weakly related, independent changes
goal: Maximize cohesion within building blocks
relationship: HIGH_COHESION SUPPORTS SRP
```

### Coupling Principles

```yaml
PRINCIPLE[id=LOW_COUPLING]
type: PRINCIPLE
name: Low Coupling
category: COUPLING_PRINCIPLE
quotes:
  - "Check and minimize dependencies. Each avoided dependency is a victory" (Siedersleben)
  - "Coupling is what kills all software" (Ian Cooper)
  - "The bulk of software design is managing dependencies" (Kent Beck)
definition: Minimize dependencies between building blocks
goal: Each avoided dependency is a victory
mechanism: RIPPLE_EFFECT_MANAGEMENT
validation: >
  FOR_EACH component:
    COUNT non_local_dependencies
    IF count > threshold THEN flag_for_refactoring
relationship: LOW_COUPLING CONFLICTS_WITH TIGHT_COUPLING_ANTI_PATTERN

  CONCEPT[id=RIPPLE_EFFECT]
type: CONCEPT
name: Ripple Effect
aliases: [ Lawineneffekt, Avalanche Effect ]
description: Changes propagate along dependency paths
mechanism: >
  WHEN change_occurs_in component_A
  AND component_B DEPENDS_ON component_A
  THEN component_B may_require_changes
management_strategies:
  - dependency_firewalls: Interfaces that block propagation
  - impact_analysis: Predict affected components before changes
  - minimize_dependencies: Reduce propagation paths
relationship: RIPPLE_EFFECT PREVENTED_BY DEPENDENCY_FIREWALLS

  QUALITY_ATTRIBUTE[id=GOOD_ARCHITECTURE_DEFINITION]
type: QUALITY_ATTRIBUTE
name: Good Architecture Characteristic
formula: weakly_coupled AND strongly_cohesive
components:
  - many_local_dependencies: Within components
  - few_non_local_dependencies: Between components
measurement: COHESION_COUPLING_RATIO
validation: >
  IF (high_cohesion AND low_coupling)
  THEN good_architecture
  ELSE refactoring_needed
```

### Dependency Management Principles

```yaml
PRINCIPLE[id=ACYCLIC_DEPENDENCIES_PRINCIPLE]
type: PRINCIPLE
name: Acyclic Dependencies Principle
aliases: [ ADP ]
category: DEPENDENCY_PRINCIPLE
rule: NO_CYCLES_ALLOWED in architecture dependency graph
definition: >
  Dependency graph MUST be directed acyclic graph (DAG).
  Cycles create tight coupling.
violation_consequences:
  - components_understood_together: true
  - components_changed_together: true
  - components_tested_together: true
  - components_deployed_together: true
detection_method: >
  APPLY dependency_analysis_tool
  IF cycle_detected THEN flag_violation
resolution_strategies:
  - break_cycle_via_abstraction
  - dependency_inversion
  - split_component
  - remove_dependency
validation: >
  FUNCTION check_adp(dependency_graph):
    cycles = detect_cycles(dependency_graph)
    IF cycles.count > 0
    THEN RETURN VIOLATION(ADP, cycles)
    ELSE RETURN COMPLIANT

  PRINCIPLE[id=COMMON_CLOSURE_PRINCIPLE]
type: PRINCIPLE
name: Common Closure Principle
aliases: [ CCP ]
category: DEPENDENCY_PRINCIPLE
author: Robert_C_Martin
definition: Things that change together should be in the same module
extended_definition: >
  Typical change request should affect FEW building blocks, not many
original_quote: >
  A change that affects a package affects all the classes in that package
key_insight: Put code with same change rate in same building block
validation: >
  FOR_EACH change_request:
    affected_components = analyze_impact(change_request)
    IF affected_components.count > threshold
    THEN VIOLATION(CCP)
    RECOMMEND consolidate_frequently_changing_code
relationship: CCP ADDRESSES CHANGE_MANAGEMENT

  PRINCIPLE[id=COMMON_REUSE_PRINCIPLE]
type: PRINCIPLE
name: Common Reuse Principle
aliases: [ CRP ]
category: DEPENDENCY_PRINCIPLE
author: Robert_C_Martin
definition: Put frequently reused-together items in one building block
benefit: Splitting reduces impact analysis scope
anti_pattern: Bundle rarely-used utilities with frequently-used core logic
validation: >
  FOR_EACH building_block:
    reuse_patterns = analyze_reuse_frequency()
    IF items_reused_separately
    THEN RECOMMEND split_building_block
relationship: CRP ADDRESSES REUSE_MANAGEMENT

  PRINCIPLE[id=STABLE_DEPENDENCIES_PRINCIPLE]
type: PRINCIPLE
name: Stable Dependencies Principle
aliases: [ SDP ]
category: DEPENDENCY_PRINCIPLE
definition: Depend on building blocks with low change rate, not high change rate
prerequisite: Requirements stability classification
validation: >
  FOR_EACH dependency:
    IF source.change_rate > target.change_rate
    THEN VIOLATION(SDP)
    RECOMMEND invert_dependency_or_extract_stable_interface
benefit: Reduces cascading changes

  PRINCIPLE[id=STABLE_ABSTRACTIONS_PRINCIPLE]
type: PRINCIPLE
name: Stable Abstractions Principle
aliases: [ SAP ]
category: DEPENDENCY_PRINCIPLE
definition: Abstract building blocks should have lower change rates than concrete ones
example: "Person" (abstract) changes less than "Patient" (concrete)
validation: >
  IF abstraction_level(component) == high
  THEN EXPECT change_rate(component) == low
relationship: SAP COMPLEMENTS STABLE_DEPENDENCIES_PRINCIPLE

  PRINCIPLE[id=TELL_DONT_ASK]
type: PRINCIPLE
name: Tell Don't Ask
aliases: [ TDA ]
category: OBJECT_ORIENTED_PRINCIPLE
definition: Move behavior close to data
principle: >
  Objects should tell other objects what to do,
  not ask for data and make decisions externally
anti_pattern:
  name: data_traveling
  code_structure: >
    external_object.getData() → process_data → external_object.setResult()
  problem: Data travels through system, logic far from data
correct_pattern:
  name: behavior_encapsulation
  code_structure: >
    external_object.performOperation(params)
  benefit: Compute at source, data stays encapsulated
transformation:
  bad: >
    temperature = sensor.getTemperature()
    IF temperature > threshold THEN regulator.turnOn()
  good: >
    sensor.regulate(threshold, regulator)
  explanation: >
    BAD: Client asks sensor for data, makes decision, tells regulator
    GOOD: Client tells sensor to regulate itself with regulator
violation_detection: >
  IF code_pattern_matches: get() → if → set()
  THEN VIOLATION(TELL_DONT_ASK)
  RECOMMEND move_logic_to_data_owner
relationship: TELL_DONT_ASK SUPPORTS ENCAPSULATION
benefits:
  - reduced_coupling
  - better_encapsulation
  - data_stays_local
  - single_point_of_change
```

---

## INTERFACE_DESIGN

### Core Interface Concepts

```yaml
CONCEPT[id=INTERFACE_ABSTRACTION]
type: CONCEPT
name: Interface as Decoupling Mechanism
description: Greatest invention in computer science
components:
  - interface: What others need to know
  - implementation: Hidden details
principles:
  - information_hiding
  - independent_evolution
change_management_value:
  - new_consumer: No provider change needed
  - new_provider: No consumer change needed
  - firewall: Blocks change propagation
relationship: INTERFACE_ABSTRACTION ENABLES INDEPENDENT_EVOLUTION

  QUALITY_ATTRIBUTE[id=INTERFACE_QUALITY]
type: QUALITY_ATTRIBUTE
name: Interface Quality Criteria
criteria:
  - ENTITY[id=NOT_UNDERSPECIFIED]
  - ENTITY[id=NOT_OVERSPECIFIED]
  - ENTITY[id=EASY_TO_USE_CORRECTLY]

  CRITERION[id=NOT_UNDERSPECIFIED]
type: CRITERION
name: Not Underspecified
definition: Specify everything needed for cooperation
includes:
  - syntax
  - semantics
  - error_handling
  - performance_characteristics
  - preconditions
  - postconditions
validation: >
  IF interface_missing_cooperation_information
  THEN VIOLATION(NOT_UNDERSPECIFIED)

  CRITERION[id=NOT_OVERSPECIFIED]
type: CRITERION
name: Not Overspecified (Minimal)
definition: Need-to-know principle only
goal: Allow maximum freedom to evolve
paradox: Interface can be under-specified AND over-specified simultaneously
validation: >
  IF interface_exposes_unnecessary_details
  THEN VIOLATION(NOT_OVERSPECIFIED)
  RECOMMEND remove_implementation_details

  CRITERION[id=EASY_TO_USE_CORRECTLY]
type: CRITERION
name: Easy to Use Correctly, Hard to Use Incorrectly
author: Scott_Meyers
priority: most_important
definition: >
  Interface design should guide users to correct usage
  and make incorrect usage difficult or impossible
examples:
  - type_safety
  - compile_time_checks
  - sensible_defaults
  - fail_fast_behavior
```

### Interface Change Management

```yaml
PRINCIPLE[id=AVOID_INTERFACE_CHANGES]
type: PRINCIPLE
name: Avoid Interface Changes
category: INTERFACE_PRINCIPLE
priority: critical
rationale: Interface changes trigger big ripple effects
guiding_principle: Backward compatibility (Kent Beck)
rules:
  - no_changes_to_existing_promises: true
  - only_additions_allowed: true
  - common_in_microservices: true
validation: >
  IF interface_change_breaks_existing_clients
  THEN VIOLATION(BACKWARD_COMPATIBILITY)
  RECOMMEND version_interface_or_add_new_methods
relationship: AVOID_INTERFACE_CHANGES PREVENTS RIPPLE_EFFECT
```

### Interface Segregation

```yaml
PRINCIPLE[id=INTERFACE_SEGREGATION_PRINCIPLE]
type: PRINCIPLE
name: Interface Segregation Principle
aliases: [ ISP ]
category: INTERFACE_PRINCIPLE
author: Robert_C_Martin
definition: Prefer several small interfaces over one big interface
advantages:
  - independent_deployment: Smaller deployment units
  - independent_access_rights: Different security per interface
  - better_testability: Test only relevant interfaces
applications:
  - separate_admin_from_operation_interfaces
  - separate_test_only_interfaces
  - limited_access_per_client
related_principle: ENTITY[id=LIMITED_ACCESS_PRINCIPLE]
validation: >
  IF interface_has_many_methods
  AND clients_use_different_subsets
  THEN VIOLATION(ISP)
  RECOMMEND split_interface_by_client_needs

  PRINCIPLE[id=LIMITED_ACCESS_PRINCIPLE]
type: PRINCIPLE
name: Limited Access Principle
aliases: [ LAP ]
definition: Each client accesses only needed services
relationship: LIMITED_ACCESS_PRINCIPLE SPECIALIZES INTERFACE_SEGREGATION_PRINCIPLE
security_benefit: Principle of least privilege
```

### Interface Blood Types

```yaml
CONCEPT[id=A_INTERFACE]
type: CONCEPT
name: A-Interface (Application)
parent: INTERFACE_BLOOD_TYPE
characteristics:
  - uses_domain_language: true
  - uses_business_concepts: true
  - technology_free: true
examples:
  - promoteToVIP()
  - blacklistCustomer()
  - calculateDiscount()
  - processOrder()
quality: good_for_A_components
relationship: A_INTERFACE APPROPRIATE_FOR TYPE_A

  CONCEPT[id=T_INTERFACE]
type: CONCEPT
name: T-Interface (Technology)
parent: INTERFACE_BLOOD_TYPE
characteristics:
  - technology_specific: true
  - couples_to_technology: true
examples:
  - writeToDB2()
  - saveToRedis()
  - sendViaRabbitMQ()
quality: bad_for_A_components
rule: A-components MUST_NOT depend on T-interfaces
relationship: T_INTERFACE APPROPRIATE_FOR TYPE_T

  CONCEPT[id=O_INTERFACE]
type: CONCEPT
name: O-Interface (Universal)
parent: INTERFACE_BLOOD_TYPE
characteristics:
  - technology_free_abstractions: true
  - domain_agnostic: true
examples:
  - persist()
  - save()
  - load()
  - serialize()
quality: safe_for_A_components
relationship: O_INTERFACE SAFE_FOR [TYPE_A, TYPE_T]

  RULE[id=INTERFACE_DEPENDENCY_RULE]
type: RULE
name: Interface Blood Type Dependency Rule
rule: >
  A-components DEPEND_ON [A_INTERFACE, O_INTERFACE]
  A-components MUST_NOT_DEPEND_ON T_INTERFACE
validation: >
  FOR_EACH a_component:
    FOR_EACH dependency IN a_component.dependencies:
      IF dependency IS T_INTERFACE
      THEN VIOLATION(INTERFACE_DEPENDENCY_RULE)
resolution: DEPENDENCY_INVERSION

  PATTERN[id=DEPENDENCY_INVERSION]
type: PATTERN
name: Dependency Inversion
category: INTERFACE_PATTERN
purpose: Reverse dependencies on concrete implementations
mechanism: Introduce abstractions to invert dependency direction
example:
  problem: A-component depends on T-component (database)
  solution: >
    A-component depends on IRepository (O-interface)
    T-component implements IRepository
    Dependency inverted: A → IRepository ← T
relationship: DEPENDENCY_INVERSION IMPLEMENTS INTERFACE_BLOOD_TYPE_RULE
```

---

## ARCHITECTURE_DEVELOPMENT_METHODS

### Use Case Driven Development

```yaml
METHOD[id=USE_CASE_DRIVEN_DEVELOPMENT]
type: METHOD
name: Use Case Driven Development
category: ARCHITECTURE_DEVELOPMENT
purpose: Derive architectural services from use cases
use_case_types:
  - primary_use_cases: Services to external actors
  - secondary_use_cases: Services between building blocks
service_elicitation_process: >
  FUNCTION elicit_services(requirement):
    PARSE requirement INTO business_rules
    FOR_EACH rule:
      EXTRACT services_needed_to_verify(rule)
    RETURN service_list
example:
  requirement: "Order OK if ≤100 items and no alcohol for minors"
  secondary_services:
    - CheckOrder(Order)
    - ContainsAlcohol(Product)
    - IsAdult(Customer)
packaging_goal: Minimize arrows between packages (arrows need interfaces)
produces: ARTIFACT[id=SERVICE_LIST]
relationship: USE_CASE_DRIVEN_DEVELOPMENT PRODUCES COMPONENT_INTERFACES
```

### Domain Driven Design

```yaml
METHOD[id=DOMAIN_DRIVEN_DESIGN]
type: METHOD
name: Domain Driven Design
aliases: [ DDD ]
category: ARCHITECTURE_DEVELOPMENT
author: Eric_Evans
core_principles:
  - focus_on_core_domain: true
  - collaborate_with_domain_experts: true
  - speak_ubiquitous_language: true
key_concept: ENTITY[id=BOUNDED_CONTEXT]

  CONCEPT[id=BOUNDED_CONTEXT]
type: CONCEPT
name: Bounded Context
parent: DOMAIN_DRIVEN_DESIGN
definition: Linguistically defined boundaries
principle: >
  Same term has different meanings in different contexts.
  Each context has its own model.
example: >
  "Customer" in Marketing context: demographics, preferences, segments
  "Customer" in Delivery context: address, delivery instructions, contact
validation: >
  IF same_term_used_with_different_meanings
  THEN define_separate_bounded_contexts
relationship: BOUNDED_CONTEXT DEFINES MICROSERVICE_BOUNDARIES

  CONCEPT[id=AGGREGATE]
type: CONCEPT
name: Aggregate
parent: DOMAIN_DRIVEN_DESIGN
definition: Cluster of domain objects treated as single unit
characteristics:
  - aggregate_root: Entry point for all external access
  - consistency_boundary: Transactional boundary
  - business_invariants: Rules enforced at boundary
discovery_methods:
  - existence_dependence: Compositions
  - global_search_patterns: Entity accessed from many places
  - transactional_business_rules: Operations that must be atomic
  - navigable_relationships: Entity always accessed via parent
artifact: ENTITY[id=AGGREGATE_CANVAS]

  ARTIFACT[id=AGGREGATE_CANVAS]
type: ARTIFACT
name: Aggregate Canvas
purpose: Document A-components
sections:
  - name: Aggregate identifier
  - description: Business purpose
  - lifecycle: Creation, modification, deletion rules
  - business_rules: Invariants enforced
  - services: Operations provided
  - events: Domain events published
relationship: AGGREGATE_CANVAS DOCUMENTS AGGREGATE

  METHOD[id=UBIQUITOUS_LANGUAGE]
type: METHOD
name: Ubiquitous Language
parent: DOMAIN_DRIVEN_DESIGN
definition: >
  Naming in A-architecture uses EXACTLY the terminology of requirements
scope: bounded_context
rule: >
  IF term_used_in_requirements
  THEN same_term_used_in_code
anti_pattern: Technical names for business concepts
example:
  bad: CreateEmployee, UpdateEmployee
  good: HireEmployee, PromoteEmployee, TerminateEmployee
relationship: UBIQUITOUS_LANGUAGE ENABLES DOMAIN_ALIGNMENT
```

### CRUD Matrix Approach

```yaml
METHOD[id=CRUD_MATRIX_APPROACH]
type: METHOD
name: CRUD Matrix Approach
category: ARCHITECTURE_DEVELOPMENT
purpose: Discover components via CRUD operations analysis
steps:
  step_1: CREATE matrix WITH rows=services cols=classes
  step_2: MARK operations AS [Create, Read, Update, Delete]
  step_3: EXCHANGE rows_and_columns TO move_filled_cells_near_diagonal
  step_4: DEFINE components AS diagonal_squares
  step_5: MAXIMIZE letters_inside_squares (cohesion)
  step_6: MINIMIZE letters_outside_squares (coupling)
produces: ARTIFACT[id=COMPONENT_STRUCTURE]
quality_metric: METRIC[id=COHESION_COUPLING_RATIO]
example:
  matrix_size: 15_services × 20_classes
  intra_component_cells: 12
  inter_component_cells: 3
  ratio: 4.0
  interpretation: good_architecture
relationship: CRUD_MATRIX_APPROACH MEASURES COHESION_AND_COUPLING

  METRIC[id=COHESION_COUPLING_RATIO]
type: METRIC
name: Cohesion-Coupling Ratio
purpose: Measure architectural quality via CRUD matrix
formula: >
  ratio = intra_component_operations / inter_component_operations
interpretation:
  - ratio > 3.0: good_architecture
  - ratio 1.5-3.0: acceptable_architecture
  - ratio < 1.5: refactoring_needed
computation: >
  FUNCTION compute_ccr(crud_matrix):
    intra = COUNT(cells WHERE cell.source_component == cell.target_component)
    inter = COUNT(cells WHERE cell.source_component != cell.target_component)
    IF inter == 0 THEN RETURN infinity
    RETURN intra / inter
relationship: COHESION_COUPLING_RATIO MEASURED_BY CRUD_MATRIX_APPROACH
```

### Evolutionary Coupling

```yaml
METHOD[id=EVOLUTIONARY_COUPLING_REFACTORING]
type: METHOD
name: Evolutionary Coupling Refactoring
category: ARCHITECTURE_DEVELOPMENT
purpose: Measure which components changed together historically
data_source: Version control system
measurement: >
  FOR_EACH component_pair (A, B):
    total_commits = COUNT commits affecting either A or B
    joint_commits = COUNT commits affecting both A and B
    coupling_percentage = joint_commits / total_commits * 100
interpretation:
  - coupling > 80%: Strong evolutionary coupling, consider merging
  - coupling 40-80%: Moderate coupling, investigate reasons
  - coupling < 40%: Weak coupling, appropriate separation
refactoring_strategies:
  - split_blocks_with_different_change_rates
  - merge_blocks_with_strong_evolutionary_coupling
prerequisite: Good change management system
example:
  components: [ ord, gos ]
  joint_changes: 96%
  decision: Merge into OrderInventory component
relationship: EVOLUTIONARY_COUPLING_REFACTORING VALIDATES CCP_COMPLIANCE
```

### AI/Embedding Approach

```yaml
METHOD[id=AI_EMBEDDING_APPROACH]
type: METHOD
name: AI/Embedding Approach
category: ARCHITECTURE_DEVELOPMENT
purpose: Automatically discover components using machine learning
modern: true
steps:
  step_1: EMBED functional_requirements INTO vector_space
  step_2: STORE embeddings IN vector_database
  step_3: CLUSTER requirements_automatically
  step_4: MAP each_cluster TO one_component
  step_5: GENERATE cluster_names USING LLM
technology:
  - embedding_models: [ OpenAI, BERT, sentence-transformers ]
  - clustering_algorithms: [ K-means, DBSCAN, hierarchical ]
  - vector_databases: [ Pinecone, Weaviate, Milvus ]
benefit: Objective, data-driven component discovery
limitation: Requires large corpus of requirements
relationship: AI_EMBEDDING_APPROACH AUTOMATES COMPONENT_DISCOVERY
```

---

## ARCHITECTURE_DOCUMENTATION

### Standard Views

```yaml
VIEW[id=META_VIEW]
type: VIEW
name: Meta View
purpose: Types of architectural parts
artifacts:
  - class_diagram
  - metamodel
  - type_definitions
importance: >
  "Common vocabulary to describe software architecture" - Simon Brown
defines:
  - component
  - system
  - layer
  - module
  - service
relationship: META_VIEW PROVIDES COMMON_VOCABULARY

  VIEW[id=STRUCTURE_VIEW]
type: VIEW
name: Structure View
purpose: Parts and connections
artifacts:
  - component_diagram
  - class_diagram
  - package_diagram
shows:
  - building_blocks
  - dependencies
  - interfaces
relationship: STRUCTURE_VIEW DOCUMENTS STATIC_ARCHITECTURE

  VIEW[id=BEHAVIOR_VIEW]
type: VIEW
name: Behavior View
purpose: Runtime cooperation
artifacts:
  - sequence_diagram
  - activity_diagram
  - state_diagram
shows:
  - message_flow
  - control_flow
  - state_transitions
relationship: BEHAVIOR_VIEW DOCUMENTS DYNAMIC_ARCHITECTURE

  VIEW[id=NETWORK_VIEW]
type: VIEW
name: Network View
purpose: Distribution on network
artifacts:
  - deployment_diagram
  - infrastructure_diagram
shows:
  - servers
  - networks
  - deployment_units
relationship: NETWORK_VIEW DOCUMENTS PHYSICAL_DEPLOYMENT
```

### C4 Model

```yaml
FRAMEWORK[id=C4_MODEL]
type: FRAMEWORK
name: C4 Model
author: Simon_Brown
purpose: Four levels of architectural abstraction
category: DOCUMENTATION_FRAMEWORK
levels:
  - ENTITY[id=C4_CONTEXT]
  - ENTITY[id=C4_CONTAINER]
  - ENTITY[id=C4_COMPONENT]
  - ENTITY[id=C4_CLASS]
principle: Each level zooms into previous level
additional: Communication diagrams for dynamic behavior
relationship: C4_MODEL PROVIDES HIERARCHICAL_ABSTRACTION

  VIEW[id=C4_CONTEXT]
type: VIEW
name: Context Diagram
parent: C4_MODEL
level: 1
shows:
  - system_boundary
  - external_actors
  - system_interfaces
audience: Everyone (business + technical)
abstraction: highest

  VIEW[id=C4_CONTAINER]
type: VIEW
name: Container Diagram
parent: C4_MODEL
level: 2
shows: Big T-building blocks
examples:
  - web_server
  - database
  - message_queue
  - mobile_app
audience: Technical stakeholders
abstraction: high
relationship: C4_CONTAINER CONTAINS TYPE_T_COMPONENTS

  VIEW[id=C4_COMPONENT]
type: VIEW
name: Component Diagram
parent: C4_MODEL
level: 3
shows: Big A-building blocks
examples:
  - business_components
  - domain_aggregates
  - application_services
audience: Developers + architects
abstraction: medium
relationship: C4_COMPONENT CONTAINS TYPE_A_COMPONENTS

  VIEW[id=C4_CLASS]
type: VIEW
name: Class Diagram
parent: C4_MODEL
level: 4
shows: Detailed design within components
examples:
  - classes
  - interfaces
  - relationships
audience: Developers
abstraction: lowest
```

### arc42 Framework

```yaml
FRAMEWORK[id=ARC42]
type: FRAMEWORK
name: arc42
purpose: Architecture documentation template
category: DOCUMENTATION_FRAMEWORK
url: http://www.arc42.org/
cost: free
sections:
  - ENTITY[id=ARC42_SECTION_1]
  - ENTITY[id=ARC42_SECTION_2]
  - ENTITY[id=ARC42_SECTION_3]
  - ENTITY[id=ARC42_SECTION_4]
  - ENTITY[id=ARC42_SECTION_5]
  - ENTITY[id=ARC42_SECTION_6]
  - ENTITY[id=ARC42_SECTION_7]
  - ENTITY[id=ARC42_SECTION_8]
  - ENTITY[id=ARC42_SECTION_9]
  - ENTITY[id=ARC42_SECTION_10]
  - ENTITY[id=ARC42_SECTION_11]
  - ENTITY[id=ARC42_SECTION_12]

  ARTIFACT[id=ARC42_SECTION_1]
type: ARTIFACT
name: Functional Requirements
parent: ARC42
content: Use cases and functional scope
relationship: ARC42_SECTION_1 DOCUMENTS FUNCTIONAL_REQUIREMENTS

  ARTIFACT[id=ARC42_SECTION_2]
type: ARTIFACT
name: Constraints
parent: ARC42
content: Technical, organizational, legal limitations
examples:
  - must_use_existing_database
  - team_size_limited_to_5
  - GDPR_compliance_required

  ARTIFACT[id=ARC42_SECTION_3]
type: ARTIFACT
name: Business Context
parent: ARC42
content: External interfaces and partners
shows: System boundaries and external dependencies

  ARTIFACT[id=ARC42_SECTION_4]
type: ARTIFACT
name: Solution Strategy
parent: ARC42
content: Key decisions and patterns
includes:
  - architectural_style
  - technology_choices
  - key_patterns

  ARTIFACT[id=ARC42_SECTION_5]
type: ARTIFACT
name: Building Block View
parent: ARC42
content: Blackbox/Whitebox decomposition
technique: Hierarchical decomposition with interfaces

  ARTIFACT[id=ARC42_SECTION_6]
type: ARTIFACT
name: Runtime View
parent: ARC42
content: Cooperation scenarios
shows: How components collaborate at runtime

  ARTIFACT[id=ARC42_SECTION_7]
type: ARTIFACT
name: Deployment View
parent: ARC42
content: Infrastructure mapping
shows: Software to hardware mapping

  ARTIFACT[id=ARC42_SECTION_8]
type: ARTIFACT
name: Cross-Cutting Concepts
parent: ARC42
content: Recurring patterns
examples:
  - logging
  - security
  - error_handling
  - transaction_management

  ARTIFACT[id=ARC42_SECTION_9]
type: ARTIFACT
name: Architecture Decisions
parent: ARC42
content: Architecture Decision Records (ADRs)
format: ENTITY[id=ADR_FORMAT]

  ARTIFACT[id=ARC42_SECTION_10]
type: ARTIFACT
name: Quality Scenarios
parent: ARC42
content: Test cases including non-functional requirements
examples:
  - performance_scenarios
  - security_scenarios
  - availability_scenarios

  ARTIFACT[id=ARC42_SECTION_11]
type: ARTIFACT
name: Risks
parent: ARC42
content: Technical debt, known issues
tracks:
  - technical_risks
  - known_bugs
  - architectural_debt

  ARTIFACT[id=ARC42_SECTION_12]
type: ARTIFACT
name: Glossary
parent: ARC42
content: Ubiquitous language
purpose: Define all domain terms consistently
relationship: ARC42_SECTION_12 DOCUMENTS UBIQUITOUS_LANGUAGE

  ARTIFACT[id=ADR_FORMAT]
type: ARTIFACT
name: Architecture Decision Record
aliases: [ ADR ]
parent: ARC42_SECTION_9
structure:
  - context: Problem statement and background
  - options: Alternatives considered with pros/cons
  - decision: Choice made
  - rationale: Why this decision
  - consequences: Implications and follow-up actions
storage: Version control system
immutability: ADRs are immutable records (new ADR supersedes old)
```

### Documentation Best Practices

```yaml
PRINCIPLE[id=DOCUMENTATION_BEST_PRACTICES]
type: PRINCIPLE
name: Documentation Best Practices
author: Simon_Brown
category: DOCUMENTATION
practices:
  - consistent_notation_and_positioning: Use same symbols and layout
  - similar_abstraction_levels: Don't mix high-level and low-level in same diagram
  - explain_all_notation: Legend for all symbols used
  - color_complements_labels: Color enhances, doesn't replace text
  - unidirectional_lines_with_annotations: Show dependency direction and meaning
  - narrative_complements_diagram: Text adds context, doesn't just describe
  - use_icons_to_supplement: Visual aids enhance understanding
  - documentation_constantly_evolves: Living documentation, not write-once
anti_pattern: Write documentation once and never update
relationship: DOCUMENTATION_BEST_PRACTICES ENSURES MAINTAINABILITY
```

---

## ARCHITECTURE_EVALUATION

### Initial Review Methods

```yaml
EVALUATION_METHOD[id=CHECKLIST_BASED_REVIEW]
type: EVALUATION_METHOD
name: Checklist-Based Review
category: ARCHITECTURE_EVALUATION
purpose: Verify architectural quality principles
checklist:
  - SRP_compliance
  - ADP_compliance (no cycles)
  - CCP_compliance (change together, packaged together)
  - blood_type_separation (A vs T)
  - interface_quality
required_artifacts:
  - component_diagram_with_A_T_information
  - dependency_graph
relationship: CHECKLIST_BASED_REVIEW VALIDATES QUALITY_PRINCIPLES

  EVALUATION_METHOD[id=SCENARIO_BASED_REVIEW]
type: EVALUATION_METHOD
name: Scenario-Based Review
category: ARCHITECTURE_EVALUATION
purpose: Walk through use cases step-by-step
process: >
  FOR_EACH use_case:
    trace_execution_across_components
    verify_components_can_perform_operations
    check_interfaces_support_required_data
required_artifacts:
  - use_case_diagram_or_list
  - component_diagram_with_interfaces
validation: >
  IF use_case_cannot_be_completed_with_current_architecture
  THEN ARCHITECTURAL_GAP_FOUND
relationship: SCENARIO_BASED_REVIEW VALIDATES COMPLETENESS

  EVALUATION_METHOD[id=CRUD_ANALYSIS_EVALUATION]
type: EVALUATION_METHOD
name: CRUD Analysis Evaluation
category: ARCHITECTURE_EVALUATION
purpose: Evaluate cohesion/coupling ratio
metric: COHESION_COUPLING_RATIO
interpretation:
  - higher_ratio: better_quality
  - lower_ratio: refactoring_needed
required_artifacts:
  - CRUD_matrix
relationship: CRUD_ANALYSIS_EVALUATION MEASURES COHESION_COUPLING_RATIO

  EVALUATION_METHOD[id=REUSABILITY_TEST]
type: EVALUATION_METHOD
name: Reusability Test
category: ARCHITECTURE_EVALUATION
purpose: Assess component independence and reusability
question: "What can be sold separately?"
examples:
  - chess_engine: Reusable for Go game? Puzzle solver?
  - order_component: Reusable in different e-commerce system?
validation: >
  IF component_has_excessive_dependencies
  THEN low_reusability
  RECOMMEND reduce_coupling
benefit: Identifies overly coupled components
relationship: REUSABILITY_TEST VALIDATES COMPONENT_INDEPENDENCE
```

### Compliance Checking

```yaml
EVALUATION_METHOD[id=AUTOMATED_COMPLIANCE_CHECKING]
type: EVALUATION_METHOD
name: Automated Compliance Checking
category: ARCHITECTURE_EVALUATION
timing: Later reviews (implementation phase)
purpose: Detect allowed-to-use violations automatically
process: >
  FUNCTION check_compliance(codebase, allowed_to_use_spec):
    actual_dependencies = analyze_codebase_dependencies(codebase)
    FOR_EACH dependency IN actual_dependencies:
      IF NOT is_allowed(dependency, allowed_to_use_spec)
      THEN VIOLATION_FOUND(dependency)
resolution: Move logic between components or update specification
prerequisite: Documented allowed-to-use specification
benefit: Prevents architecture erosion
relationship: AUTOMATED_COMPLIANCE_CHECKING ENFORCES ALLOWED_TO_USE_SPECIFICATION
```

---

## COMMUNICATION_STYLES

```yaml
DECISION[id=INTERFACE_COMMUNICATION_STYLE]
type: DECISION
name: Interface Communication Style Decisions
category: INTERFACE_DESIGN
decision_dimensions:
  - ENTITY[id=SYNC_VS_ASYNC]
  - ENTITY[id=STATEFUL_VS_STATELESS]
  - ENTITY[id=TRANSACTIONAL_VS_NOT]
  - ENTITY[id=FINE_VS_COARSE_GRAINED]
  - ENTITY[id=LOCAL_VS_NETWORK]
coupling_impact:
  more_coupled:
    - synchronous
    - stateful
    - transactional
    - fine_grained
    - local
  less_coupled:
    - asynchronous
    - stateless
    - not_transactional
    - coarse_grained
    - network
performance_tip: Use coarse-grained interfaces for network calls

  DECISION[id=SYNC_VS_ASYNC]
type: DECISION
name: Synchronous vs Asynchronous
parent: INTERFACE_COMMUNICATION_STYLE
question: Wait for response or continue?
options:
  synchronous:
    description: Caller waits for response
    coupling: higher
    complexity: lower
    use_case: When immediate response needed
  asynchronous:
    description: Caller continues without waiting
    coupling: lower
    complexity: higher
    use_case: When fire-and-forget acceptable

  DECISION[id=STATEFUL_VS_STATELESS]
type: DECISION
name: Stateful vs Stateless
parent: INTERFACE_COMMUNICATION_STYLE
question: Does service remember previous interactions?
options:
  stateful:
    description: Session bundling, service remembers state
    coupling: higher
    scalability: lower
    use_case: Complex multi-step workflows
  stateless:
    description: Each request independent
    coupling: lower
    scalability: higher
    use_case: RESTful APIs, microservices

  DECISION[id=TRANSACTIONAL_VS_NOT]
type: DECISION
name: Transactional vs Not Transactional
parent: INTERFACE_COMMUNICATION_STYLE
question: Does operation support transactions?
options:
  transactional:
    description: ACID guarantees, rollback support
    coupling: higher
    consistency: strong
    use_case: Financial operations, critical data
  not_transactional:
    description: No transaction guarantees
    coupling: lower
    consistency: eventual
    use_case: Analytics, logging, notifications

  DECISION[id=FINE_VS_COARSE_GRAINED]
type: DECISION
name: Fine-grained vs Coarse-grained
parent: INTERFACE_COMMUNICATION_STYLE
question: How much work per call?
options:
  fine_grained:
    description: Many small operations (getFirstName, getLastName)
    coupling: higher
    network_efficiency: poor (many round trips)
    use_case: Local in-process calls
  coarse_grained:
    description: Few large operations (getCustomerProfile)
    coupling: lower
    network_efficiency: good (fewer round trips)
    use_case: Network calls, microservices

  DECISION[id=LOCAL_VS_NETWORK]
type: DECISION
name: Local vs Network
parent: INTERFACE_COMMUNICATION_STYLE
question: Where is the service located?
options:
  local:
    description: In-process call
    coupling: higher
    latency: microseconds
    failure_mode: exceptions
  network:
    description: Remote call
    coupling: lower
    latency: milliseconds to seconds
    failure_mode: timeouts, network errors
```

---

## ALLOWED_TO_USE_SPECIFICATION

```yaml
CONCEPT[id=ALLOWED_TO_USE_SPECIFICATION]
type: CONCEPT
name: Allowed-To-Use Specification
definition: >
  Information about allowed/forbidden dependencies between components
purpose: Explicit dependency governance
enforcement:
  - ex_ante: Permission requests before coding
  - ex_post: Source code scanning tools
patterns:
  - ENTITY[id=LAYERED_ARCHITECTURE]
  - ENTITY[id=STRICTLY_LAYERED_ARCHITECTURE]
benefits:
  - better_testability: Fewer stubs/drivers needed
  - controlled_dependency_management
  - easier_change_impact_analysis
relationship: ALLOWED_TO_USE_SPECIFICATION GOVERNS DEPENDENCIES

  PATTERN[id=LAYERED_ARCHITECTURE]
type: PATTERN
name: Layered Architecture
parent: ALLOWED_TO_USE_SPECIFICATION
rule: Building block n cannot use lower-numbered blocks
example:
  layer_1: Book
  layer_2: Librarian (can use Book)
  layer_3: BookShelf (can use Book and Librarian)
validation: >
  FOR_EACH component:
    FOR_EACH dependency IN component.dependencies:
      IF dependency.layer_number < component.layer_number
      THEN VIOLATION(LAYERED_ARCHITECTURE)

  PATTERN[id=STRICTLY_LAYERED_ARCHITECTURE]
type: PATTERN
name: Strictly Layered Architecture
parent: ALLOWED_TO_USE_SPECIFICATION
rule: Building block n only uses n-1 (immediate lower layer only)
stricter_than: LAYERED_ARCHITECTURE
benefit: Stronger dependency control, better testability
validation: >
  FOR_EACH component:
    FOR_EACH dependency IN component.dependencies:
      IF dependency.layer_number != (component.layer_number - 1)
      THEN VIOLATION(STRICTLY_LAYERED_ARCHITECTURE)
```

---

## COMMAND_QUERY_SEPARATION

```yaml
PATTERN[id=COMMAND_QUERY_SEPARATION]
type: PATTERN
name: Command Query Separation
aliases: [ CQS ]
category: METHOD_DESIGN
scope: Method level
author: Bertrand_Meyer
rule: Each method either reads OR writes, NEVER both
types:
  query:
    definition: Reads attributes and returns value
    side_effects: none
    return_value: required
  command:
    definition: Changes state
    side_effects: modifies_state
    return_value: void
violation: Method that both reads and modifies state
benefit: Predictable behavior, easier reasoning
relationship: COMMAND_QUERY_SEPARATION ENABLES PREDICTABILITY

  PATTERN[id=COMMAND_QUERY_RESPONSIBILITY_SEGREGATION]
type: PATTERN
name: Command Query Responsibility Segregation
aliases: [ CQRS ]
category: ARCHITECTURAL_PATTERN
scope: Building block level
extends: COMMAND_QUERY_SEPARATION
rule: Separate building blocks for commands and queries
types:
  command_side:
    responsibility: Write operations
    optimization: Transactional consistency
    model: Write model
  query_side:
    responsibility: Read operations
    optimization: Read performance, caching
    model: Read model (may be denormalized)
benefits:
  - independent_scaling: Scale reads and writes separately
  - independent_optimization: Different databases for different needs
  - independent_security: Different access controls
use_cases:
  - high_read_write_ratio_difference
  - complex_reporting_requirements
  - event_sourcing_architectures
relationship: CQRS EXTENDS CQS TO ARCHITECTURAL_LEVEL
```

---

## ANTI_PATTERNS

```yaml
ANTI_PATTERN[id=MIXING_A_AND_T]
type: ANTI_PATTERN
name: Mixing A and T Blood Types
description: A-component knowing about databases, web frameworks
violation: BLOOD_TYPES_PRINCIPLE
example: Order class with SQL queries embedded
consequence: Cannot change technology without changing business logic
resolution: Extract T-concerns to separate T-component

  ANTI_PATTERN[id=A_PERSON_RECEIVING_T_MESSAGES]
type: ANTI_PATTERN
name: A-Person Receiving T-Messages
description: Error codes instead of user-friendly messages
violation: BLOOD_TYPES_PRINCIPLE
example: User sees "HTTP 500" instead of "Order failed - insufficient inventory"
consequence: Poor user experience
resolution: Translate T-messages to A-messages at boundary

  ANTI_PATTERN[id=CRUD_LANGUAGE_IN_A_SOFTWARE]
type: ANTI_PATTERN
name: CRUD Language in A-Software
description: Using technical CRUD terms instead of domain language
violation: UBIQUITOUS_LANGUAGE
examples:
  bad: "CreateEmployee"
  good: "HireEmployee"
  bad: "UpdateEmployee"
  good: "PromoteEmployee"
consequence: Business logic obscured by technical terminology
resolution: Use domain verbs, not CRUD verbs

  ANTI_PATTERN[id=CYCLIC_DEPENDENCIES]
type: ANTI_PATTERN
name: Cyclic Dependencies
description: Components tightly bound together via circular dependencies
violation: ACYCLIC_DEPENDENCIES_PRINCIPLE
consequence:
  - components_understood_together
  - components_changed_together
  - components_tested_together
  - components_deployed_together
detection: Dependency analysis tools
resolution:
  - break_cycle_via_abstraction
  - dependency_inversion
  - split_component

  ANTI_PATTERN[id=CONWAYS_LAW_INVERSION]
type: ANTI_PATTERN
name: Conway's Law Inversion
description: Let organizational chart determine architecture
principle_violated: Architecture should drive organization, not vice versa
quote: >
  "Organizations which design systems are constrained to produce designs
  which are copies of the communication structures of these organizations"
  - Melvin Conway
proper_approach: Design architecture for business needs, then organize teams
consequence: Suboptimal architecture based on org structure
resolution: Inverse Conway Maneuver - reorganize teams to match desired architecture

  ANTI_PATTERN[id=UNDERSPECIFIED_INTERFACES]
type: ANTI_PATTERN
name: Underspecified Interfaces
description: Missing necessary cooperation information
violation: NOT_UNDERSPECIFIED
examples:
  - missing_error_handling_specification
  - missing_performance_requirements
  - undefined_preconditions
consequence: Integration failures, misunderstandings
resolution: Specify syntax, semantics, error handling, performance

  ANTI_PATTERN[id=OVERSPECIFIED_INTERFACES]
type: ANTI_PATTERN
name: Overspecified Interfaces
description: Too much detail, prevents evolution
violation: NOT_OVERSPECIFIED
examples:
  - exposing_internal_data_structures
  - specifying_implementation_details
consequence: Cannot evolve implementation without breaking interface
resolution: Specify only what clients need to know

  ANTI_PATTERN[id=CODE_DUPLICATION]
type: ANTI_PATTERN
name: Code Duplication Instead of Shared Components
description: Copying code instead of sharing components
violation: DRY_PRINCIPLE
example: Charts component copied to Charts2, then diverged
consequence:
  - technical_debt_accumulation
  - coordination_overhead_across_copies
  - breaking_changes_abandon_old_clients
resolution: Shared interface with multiple implementations
relationship: CODE_DUPLICATION CREATES TECHNICAL_DEBT
```

---

## CASE_STUDIES

### EarlyBird Case Study

```yaml
CASE_STUDY[id=EARLYBIRD]
type: CASE_STUDY
name: EarlyBird Breakfast Delivery System
domain: Food delivery
business_context: >
  Breakfast delivery company guaranteeing <25 minute delivery.
  Customers order prepackaged or custom breakfasts.
evolution_challenge: >
  Originally phone-based with manual text processing.
  Moving to web-based automation with SMS capability.
architectural_lessons:
  - ENTITY[id=EARLYBIRD_LESSON_1]
  - ENTITY[id=EARLYBIRD_LESSON_2]
  - ENTITY[id=EARLYBIRD_LESSON_3]
  - ENTITY[id=EARLYBIRD_LESSON_4]
  - ENTITY[id=EARLYBIRD_LESSON_5]
practical_takeaway: >
  When phone clerks eliminated, only T-layer changes.
  A-layer (Order, Product, Customer logic) unchanged.
  This is the power of blood type separation.

  LESSON[id=EARLYBIRD_LESSON_1]
type: LESSON
name: A-Software vs T-Software Separation
parent: EARLYBIRD
principle: BLOOD_TYPES_PRINCIPLE
a_components:
  - Order
  - Product
  - Customer
  - Invoice
  - Itinerary
t_components:
  - Web_interface
  - SMS_gateway
  - Payment_system_integration
  - Printer_management
why_it_matters: >
  When changing from phone to web to SMS,
  A-components stay stable. Only T-components change.

  LESSON[id=EARLYBIRD_LESSON_2]
type: LESSON
name: Interface Segregation in Practice
parent: EARLYBIRD
principle: INTERFACE_SEGREGATION_PRINCIPLE
interfaces:
  - ISearchProduct: Search by characteristics (calories, price)
  - IOrderPlacement: Submit orders
  - IProductCatalog: Browse products
  - ICustomerAuthentication: Login/register
  - IPaymentIntegration: Process payments
lesson: Multiple small interfaces allow independent evolution of ordering channels

  LESSON[id=EARLYBIRD_LESSON_3]
type: LESSON
name: Domain-Driven Design Aggregates
parent: EARLYBIRD
principle: DOMAIN_DRIVEN_DESIGN
aggregates:
  order_aggregate:
    root: Order
    entities: [ OrderItem, Product ]
    business_rules:
      - "Order total = sum of all OrderItem values"
      - "No alcohol orders for minors (5 min violation acceptable)"
  customer_aggregate:
    root: Customer
    entities: [ Address, Password, OrderHistory ]
lesson: Aggregates enforce business rules at boundaries, protecting invariants

  LESSON[id=EARLYBIRD_LESSON_4]
type: LESSON
name: External System Integration
parent: EARLYBIRD
principle: LOW_COUPLING
integration_approach: >
  Payment system receives interface records:
  {customerNumber, orderNumber, amountInEuros, expectedDate}
anti_coupling_pattern: >
  EarlyBird doesn't know HOW payment processes,
  just sends expected payment records
lesson: Use coarse-grained interfaces with minimal data for external integrations

  LESSON[id=EARLYBIRD_LESSON_5]
type: LESSON
name: Evolution Without Breaking
parent: EARLYBIRD
principle: BACKWARD_COMPATIBILITY
evolution:
  original: Phone ordering → labels printed manually
  future: Web/SMS ordering → automated label generation
architecture_allows: Both systems run simultaneously during transition
lesson: Good architecture enables gradual migration, not big-bang rewrites
```

### Mars Case Study

```yaml
CASE_STUDY[id=MARS]
type: CASE_STUDY
name: Mars Moon Visibility Calculator
domain: Space exploration
business_context: >
  NASA Mars mission measuring gravitational wave interference.
  Measurements only work when both moons (Deimos and Phobos) simultaneously visible.
  Calculate time-overlap to decide if powering equipment worth energy cost.
technical_challenge: >
  Mars day = 88,775 Earth seconds (simplified to 25 Mars-hours × 100 Mars-minutes).
  Intervals can wrap around midnight (e.g., [24:44, 7:50]).
architectural_lessons:
  - ENTITY[id=MARS_LESSON_1]
  - ENTITY[id=MARS_LESSON_2]
  - ENTITY[id=MARS_LESSON_3]
  - ENTITY[id=MARS_LESSON_4]
  - ENTITY[id=MARS_LESSON_5]
practical_takeaway: >
  Mars demonstrates ultimate goal: application core so pure
  it works anywhere with any interface. Four cohesive A-components
  calculate overlap. Zero knowledge of NASA systems, GUIs, or Earth vs Mars context.

  LESSON[id=MARS_LESSON_1]
type: LESSON
name: Pure Application Core Example
parent: MARS
principle: BLOOD_TYPES_PRINCIPLE
input: Two Mars-intervals [D[13:91, 23:05], P[22:05, 24:45]]
output: Integer overlap in Mars-minutes (100 minutes)
a_software: Interval calculation logic (completely technology-free)
t_software: Minimal - just interface to NASA experiment coordination system
lesson: Pure A-core has zero technology dependencies

  LESSON[id=MARS_LESSON_2]
type: LESSON
name: Separation of Core Logic from Interface
parent: MARS
principle: APPLICATION_CORE_PATTERN
production_interface: Called directly by NASA experiment software (no GUI)
test_interface: HCI for testing
architecture: Core calculation component has ZERO knowledge of how it's invoked
lesson: >
  Same A-component works in production (automated) and
  testing (manual) without modification

  LESSON[id=MARS_LESSON_3]
type: LESSON
name: Software Blood Type O (Universal Truth)
parent: MARS
blood_type: TYPE_O
characteristic: Time interval overlap calculation is universal mathematics
works_on: [ Earth, Mars, any_planet ]
no_context: [ business_context, technology_context ]
lesson: Identify Type-O components - they're infinitely reusable

  LESSON[id=MARS_LESSON_4]
type: LESSON
name: Twilight Rule - Edge Case Handling
parent: MARS
requirement: "If intervals touch at one point, return 1 minute, not 0"
example: D[12:32, 17:06], P[17:06, 19:78] → 1 minute overlap
lesson: Edge cases are A-requirements, must be in A-layer specifications

  LESSON[id=MARS_LESSON_5]
type: LESSON
name: Testability Through Interface Design
parent: MARS
principle: INTERFACE_ABSTRACTION
approach:
  - Same function signature for production and test interfaces
  - Test interface adds HCI wrapper around core calculation
  - Production interface adds NASA system adapter around core calculation
lesson: Design A-core with clean interface, wrap with different T-adapters
```

### MateMate Case Study

```yaml
CASE_STUDY[id=MATEMATE]
type: CASE_STUDY
name: MateMate Chess Application Evolution
domain: Game software
business_context: >
  Chess software playing against humans,
  calculating optimal moves by evaluating positions and thinking ahead.
architectural_lessons:
  - ENTITY[id=MATEMATE_LESSON_1]
  - ENTITY[id=MATEMATE_LESSON_2]
  - ENTITY[id=MATEMATE_LESSON_3]
  - ENTITY[id=MATEMATE_LESSON_4]
practical_takeaway: >
  When AlphaZero beats Stockfish, it's just swapping one
  IPositionEvaluator implementation for another.
  UI, rules, move generation unchanged. This is CCP + ISP in action.

  LESSON[id=MATEMATE_LESSON_1]
type: LESSON
name: Service Elicitation from Requirements
parent: MATEMATE
method: USE_CASE_DRIVEN_DEVELOPMENT
services_identified: 20
core_services:
  - CalculateOptimalMove()
  - EvaluatePosition()
  - DetectCheckmate()
input_services:
  - ScreenPositionToSquare()
  - ParseMove()
output_services:
  - DrawPiece()
  - HighlightSquare()
lesson: Use case analysis reveals secondary services that become component interfaces

  LESSON[id=MATEMATE_LESSON_2]
type: LESSON
name: Software 1.0 → Software 2.0 Evolution
parent: MATEMATE
principle: STABLE_DEPENDENCIES_PRINCIPLE
version_1_0: Traditional evaluation function (handcrafted heuristics)
version_2_0: Stockfish neural network (learned evaluation)
architecture_win: >
  Evaluation component has IPositionEvaluator interface.
  Swap implementations without touching move generation, UI, or game rules.
lesson: Unstable requirements (algorithm) hidden behind stable interface

  LESSON[id=MATEMATE_LESSON_3]
type: LESSON
name: SE4 Method - Service → Subsystem → Evaluation
parent: MATEMATE
method: USE_CASE_DRIVEN_DEVELOPMENT
steps:
  step_1: Elicit services from requirements (20 services identified)
  step_2: Package services into cohesive subsystems
  step_3: Evaluate architecture (walk through use cases, check CRUD matrix)
subsystems:
  - Move_Generation
  - Position_Evaluation
  - UI
  - Game_State
lesson: Systematic method prevents ad-hoc design

  LESSON[id=MATEMATE_LESSON_4]
type: LESSON
name: Reusability Test - What Can Be Sold Separately
parent: MATEMATE
evaluation_method: REUSABILITY_TEST
reusable:
  - Chess_engine: For chess puzzle solver
  - Position_evaluation: For different chess variants
not_reusable:
  - Game_history_tracking: Not needed for puzzles
decision: Separate ChessEngine from GameHistory components
lesson: Reusability analysis drives component boundaries
```

### Industry Anti-Pattern: Charts Component Duplication

```yaml
CASE_STUDY[id=CHARTS_DUPLICATION]
type: CASE_STUDY
name: Charts Component Duplication
category: ANTI_PATTERN
domain: Enterprise software
what_happened:
  step_1: Common Core contained financial calculations for Product1 and Product2
  step_2: Chart functionality (bar, pie) added for Product1 → Charts component created
  step_3: Product2 needs charts → Charts sources COPIED to Charts2 component
  step_4: Charts2 massively enhanced → iChart2 interface changed (new mandatory attributes)
  step_5: Product1 cannot use new charts without rewriting to new interface
principles_violated:
  - DRY_PRINCIPLE: Chart logic duplicated instead of shared
  - COMMON_REUSE_PRINCIPLE: Chart features used together weren't packaged together
  - INTERFACE_SEGREGATION_PRINCIPLE: One big interface forced breaking changes
  - BACKWARD_COMPATIBILITY: Breaking old interface instead of extending
correct_approach:
  step_1: Shared IChartRenderer interface with basic operations
  step_2: Two implementations - BasicCharts (Product1), AdvancedCharts (Product2)
  step_3: Both products use same interface → either implementation works
  step_4: New features extend interface with optional methods, don't break existing
lesson: >
  Copying code instead of sharing components is technical debt.
  Eventually forces coordination across copies or abandons old clients.
relationship: CHARTS_DUPLICATION DEMONSTRATES CODE_DUPLICATION_ANTI_PATTERN
```

### Vienna Transit Case Study

```yaml
CASE_STUDY[id=VIENNA_TRANSIT_ISP_VIOLATION]
type: CASE_STUDY
name: Vienna Transit Boards ISP Violation
category: ANTI_PATTERN
domain: Public transportation
what_happened: >
  Vienna's public transit destination boards showed "Save the Climate" messages
  mixed with actual destinations. Apps parsing destination data suddenly showed
  "Save the Climate" as a train destination.
root_cause: >
  Display interface bundled:
  - Destination information (operational data)
  - Climate awareness messages (promotional data)
principle_violated: INTERFACE_SEGREGATION_PRINCIPLE
isp_violation_details:
  - Apps needed destination data only
  - Forced to receive promotional messages through same interface
  - No way to filter different data types
solution:
  - IDestinationProvider: Provides only destination/arrival data
  - IPublicMessageProvider: Provides promotional messages
  - Display boards use both; apps use only IDestinationProvider
lesson: >
  Mix different concerns in one interface → clients can't opt out
  of irrelevant data → unexpected failures when data format changes
relationship: VIENNA_TRANSIT_ISP_VIOLATION DEMONSTRATES ISP_VIOLATION_CONSEQUENCES
```

### Evolutionary Coupling: Components Changing Together 96%

```yaml
CASE_STUDY[id=EVOLUTIONARY_COUPLING_96_PERCENT]
type: CASE_STUDY
name: Components Changing Together 96%
category: REFACTORING_DECISION
domain: Enterprise software
observation: >
  Components "ord" (Orders) and "gos" (GoodsOnShelf)
  changed together in 96% of commits over 2 years.
analysis:
  - Originally designed as separate components
  - Reality: Every order change required inventory update
  - Reality: Every inventory update required order status change
  - High evolutionary coupling despite architectural separation
refactoring_decision: Merge into OrderInventory component
rationale:
  - CCP violated: Changing together but not packaged together
  - High coordination overhead between teams
  - Integration bugs from interface changes
lesson: >
  Architecture should follow empirical change patterns.
  Version control reveals coupling that design documents hide.
relationship: EVOLUTIONARY_COUPLING_96_PERCENT VALIDATES CCP_IMPORTANCE
method_used: EVOLUTIONARY_COUPLING_REFACTORING
```

### Allowed-to-Use Violations in Production

```yaml
CASE_STUDY[id=ALLOWED_TO_USE_VIOLATION]
type: CASE_STUDY
name: Allowed-to-Use Violations in Production
category: COMPLIANCE_FAILURE
domain: Enterprise software
automated_scan_found: >
  OrderExecution component using CustomerManagement component
  Violates architecture rule: "OrderExecution → ProductCatalog only"
specific_violation: >
  SOG subcomponent in OrderExecution using
  SON subcomponent in CustomerManagement
why_it_happened:
  - Developer needed customer credit check during order processing
  - Instead of requesting CustomerManagement expose ICreditCheck interface
  - Directly called internal CustomerManagement methods
  - Result: Hidden dependency, bypassed architectural governance
resolution: >
  Move CreditCheck logic from CustomerManagement to SharedServices component
  that both OrderExecution and CustomerManagement can legally use
lesson: >
  Without automated architecture compliance checking, violations accumulate.
  Technical debt grows invisible until system becomes unmaintainable.
relationship: ALLOWED_TO_USE_VIOLATION DEMONSTRATES ARCHITECTURE_EROSION
prevention: AUTOMATED_COMPLIANCE_CHECKING
```

---

## ADDITIONAL_PRINCIPLES

```yaml
PRINCIPLE[id=SEPARATE_NORMAL_FROM_EXCEPTION]
type: PRINCIPLE
name: Separate Normal from Exception Processing
definition: Don't mix normal behavior and exception handling in same code paths
use_cases:
  - include: Normal flow
  - extend: Exceptional cases
benefit: Clearer code, easier to understand main flow
relationship: SEPARATE_NORMAL_FROM_EXCEPTION SUPPORTS SEPARATION_OF_CONCERNS

  PRINCIPLE[id=INTERFACE_IMPLEMENTATION_IMBALANCE]
type: PRINCIPLE
name: Interface-Implementation Imbalance
definition: Interface much smaller/simpler than implementation
goal: Hide complexity behind simple interface
anti_pattern: Interface exposing all implementation details
benefit: Implementation can evolve without interface changes

  PRINCIPLE[id=BUILDING_BLOCK_BALANCE]
type: PRINCIPLE
name: Building Block Balance
definition: Avoid one big block + many small blocks
goal: Similar-sized building blocks
anti_pattern: God component with satellite helpers
benefit: More maintainable, better load distribution

  PRINCIPLE[id=ENVIRONMENTAL_IMPACT]
type: PRINCIPLE
name: Environmental Impact of Architecture
source: Research by Bjorna Kalaja (2024)
finding: Good software architectures need less energy
mechanism:
  - Better algorithms reduce computation
  - Reduced coupling reduces data transfer
  - Efficient caching reduces repeated work
relationship: GOOD_ARCHITECTURE REDUCES ENVIRONMENTAL_IMPACT
```

---

## QUERY_PATTERNS

```yaml
PATTERN[id=FIND_PRINCIPLE_FOR_PROBLEM]
type: QUERY_PATTERN
name: Find Principle Addressing Problem
query: "What principle addresses [problem]?"
logic: >
  MATCH (problem)-[ADDRESSED_BY]-(principle)
  RETURN principle
examples:
  - input: "How to reduce coupling?"
    output: [ LOW_COUPLING, DEPENDENCY_INVERSION, INTERFACE_SEGREGATION ]
  - input: "How to improve cohesion?"
    output: [ SRP, COMMON_CLOSURE_PRINCIPLE, COMMON_REUSE_PRINCIPLE ]
  - input: "How to prevent circular dependencies?"
    output: [ ACYCLIC_DEPENDENCIES_PRINCIPLE, DEPENDENCY_INVERSION ]

  PATTERN[id=FIND_METHOD_FOR_ARCHITECTURE_DEVELOPMENT]
type: QUERY_PATTERN
name: Find Method for Architecture Development
query: "What method for [architecture_development_goal]?"
logic: >
  MATCH (goal)-[ACHIEVED_BY]-(method)
  WHERE method.type == METHOD
  RETURN method
examples:
  - input: "How to discover components?"
    output: [ USE_CASE_DRIVEN_DEVELOPMENT, DOMAIN_DRIVEN_DESIGN, CRUD_MATRIX_APPROACH, AI_EMBEDDING_APPROACH ]
  - input: "How to measure architecture quality?"
    output: [ CRUD_MATRIX_APPROACH, EVOLUTIONARY_COUPLING_REFACTORING ]
  - input: "How to identify aggregates?"
    output: [ DOMAIN_DRIVEN_DESIGN ]

  PATTERN[id=FIND_ANTI_PATTERN_FROM_SYMPTOM]
type: QUERY_PATTERN
name: Find Anti-Pattern from Symptom
query: "What anti-pattern causes [symptom]?"
logic: >
  MATCH (symptom)-[CAUSED_BY]-(anti_pattern)
  WHERE anti_pattern.type == ANTI_PATTERN
  RETURN anti_pattern
examples:
  - input: "Components change together frequently"
    output: [ CYCLIC_DEPENDENCIES, CCP_VIOLATION ]
  - input: "Cannot change technology without changing business logic"
    output: [ MIXING_A_AND_T ]
  - input: "Breaking changes affect all clients"
    output: [ OVERSPECIFIED_INTERFACES, ISP_VIOLATION ]

  PATTERN[id=FIND_DOCUMENTATION_FRAMEWORK]
type: QUERY_PATTERN
name: Find Documentation Framework for Purpose
query: "What framework for [documentation_purpose]?"
logic: >
  MATCH (purpose)-[DOCUMENTED_BY]-(framework)
  WHERE framework.type == FRAMEWORK
  RETURN framework
examples:
  - input: "How to document architecture decisions?"
    output: [ ARC42 (Section 9: ADRs) ]
  - input: "How to create hierarchical views?"
    output: [ C4_MODEL ]
  - input: "What template for comprehensive documentation?"
    output: [ ARC42 ]

  PATTERN[id=FIND_EVALUATION_METHOD]
type: QUERY_PATTERN
name: Find Evaluation Method for Architecture
query: "How to evaluate [architecture_quality]?"
logic: >
  MATCH (quality)-[EVALUATED_BY]-(method)
  WHERE method.type == EVALUATION_METHOD
  RETURN method
examples:
  - input: "How to check principles compliance?"
    output: [ CHECKLIST_BASED_REVIEW ]
  - input: "How to verify use case support?"
    output: [ SCENARIO_BASED_REVIEW ]
  - input: "How to measure cohesion/coupling?"
    output: [ CRUD_ANALYSIS_EVALUATION ]
  - input: "How to detect architecture violations?"
    output: [ AUTOMATED_COMPLIANCE_CHECKING ]

  PATTERN[id=FIND_CASE_STUDY_DEMONSTRATING_PRINCIPLE]
type: QUERY_PATTERN
name: Find Case Study Demonstrating Principle
query: "What case study demonstrates [principle]?"
logic: >
  MATCH (principle)-[DEMONSTRATED_BY]-(case_study)
  WHERE case_study.type == CASE_STUDY
  RETURN case_study
examples:
  - input: "Show example of A/T separation"
    output: [ EARLYBIRD, MARS ]
  - input: "Show example of ISP violation"
    output: [ VIENNA_TRANSIT_ISP_VIOLATION ]
  - input: "Show example of CCP validation"
    output: [ EVOLUTIONARY_COUPLING_96_PERCENT ]
  - input: "Show example of interface evolution"
    output: [ MATEMATE ]
```

---

## DECISION_FRAMEWORKS

```yaml
DECISION[id=CHOOSE_ARCHITECTURE_STYLE]
type: DECISION
name: Select Architectural Style
input_factors:
  - system_scale: [ small, medium, large ]
  - change_frequency: [ low, medium, high ]
  - team_distribution: [ colocated, distributed ]
  - deployment_flexibility_needed: boolean
  - independent_scaling_needed: boolean
decision_logic: >
  IF system_scale == small AND team_distribution == colocated
  THEN STYLE_MONOLITH

  ELIF change_frequency == high
    AND deployment_flexibility_needed
    AND independent_scaling_needed
  THEN STYLE_MICROSERVICES

  ELIF system_scale == large
    AND team_distribution == distributed
  THEN STYLE_MICROSERVICES

  ELIF need_separate_read_write_optimization
  THEN STYLE_CQRS

  ELSE STYLE_MODULAR_MONOLITH
outputs:
  - STYLE_MONOLITH
  - STYLE_MODULAR_MONOLITH
  - STYLE_MICROSERVICES
  - STYLE_CQRS

  DECISION[id=CHOOSE_DOCUMENTATION_LEVEL]
type: DECISION
name: Choose Documentation Detail Level
input_factors:
  - team_size: [ 1-5, 6-20, 20+ ]
  - system_complexity: [ low, medium, high ]
  - team_experience: [ junior, mixed, senior ]
  - regulatory_requirements: boolean
decision_logic: >
  IF regulatory_requirements == true
  THEN COMPREHENSIVE_DOCUMENTATION (arc42 full template)

  ELIF system_complexity == high OR team_size > 20
  THEN COMPREHENSIVE_DOCUMENTATION

  ELIF team_experience == junior OR team_size > 5
  THEN MODERATE_DOCUMENTATION (C4 + key ADRs)

  ELSE MINIMAL_DOCUMENTATION (C4 Context + Container + key decisions)

  DECISION[id=CHOOSE_COMPONENT_DISCOVERY_METHOD]
type: DECISION
name: Choose Component Discovery Method
input_factors:
  - requirements_maturity: [ unclear, evolving, stable ]
  - domain_expertise: [ low, medium, high ]
  - team_size: [ small, medium, large ]
  - time_available: [ tight, moderate, ample ]
decision_logic: >
  IF domain_expertise == high AND requirements_maturity == stable
  THEN DOMAIN_DRIVEN_DESIGN

  ELIF requirements_maturity == stable
  THEN USE_CASE_DRIVEN_DEVELOPMENT OR CRUD_MATRIX_APPROACH

  ELIF requirements_maturity == unclear
  THEN DOMAIN_DRIVEN_DESIGN (discovery oriented)

  ELIF time_available == tight AND requirements_count > 100
  THEN AI_EMBEDDING_APPROACH

  ELSE USE_CASE_DRIVEN_DEVELOPMENT (most universally applicable)
```

---

## SEMANTIC_GRAPH

```yaml
RELATIONSHIPS_SUMMARY:
  # Blood Types
  TYPE_A SEPARATES_FROM TYPE_T
  TYPE_T SERVES TYPE_A
  TYPE_O USED_BY [TYPE_A, TYPE_T]
  APPLICATION_CORE_PATTERN CONTAINS TYPE_A_ONLY
  TECHNICAL_RING WRAPS APPLICATION_CORE_PATTERN
  MICROSERVICES MUST_BE TYPE_A

  # Quality Principles
  SRP IS_A COHESION_PRINCIPLE
  SOC GENERALIZES SRP
  DRY IS_A COHESION_PRINCIPLE
  LOW_COUPLING IS_A COUPLING_PRINCIPLE
  RIPPLE_EFFECT PREVENTED_BY [LOW_COUPLING, DEPENDENCY_FIREWALLS]
  GOOD_ARCHITECTURE REQUIRES [HIGH_COHESION, LOW_COUPLING]

  # Dependency Principles
  ADP PREVENTS CYCLIC_DEPENDENCIES
  CCP ADDRESSES CHANGE_MANAGEMENT
  CRP ADDRESSES REUSE_MANAGEMENT
  SDP REQUIRES REQUIREMENTS_STABILITY_CLASSIFICATION
  SAP COMPLEMENTS SDP
  TDA SUPPORTS ENCAPSULATION

  # Interface Principles
  INTERFACE_ABSTRACTION ENABLES INDEPENDENT_EVOLUTION
  ISP PREVENTS UNNECESSARY_CLIENT_DEPENDENCIES
  LAP SPECIALIZES ISP
  A_INTERFACE APPROPRIATE_FOR TYPE_A
  T_INTERFACE APPROPRIATE_FOR TYPE_T
  O_INTERFACE SAFE_FOR [TYPE_A, TYPE_T]
  DEPENDENCY_INVERSION IMPLEMENTS INTERFACE_BLOOD_TYPE_RULE
  AVOID_INTERFACE_CHANGES PREVENTS RIPPLE_EFFECT

  # Development Methods
  USE_CASE_DRIVEN_DEVELOPMENT PRODUCES SERVICE_LIST
  DOMAIN_DRIVEN_DESIGN PRODUCES AGGREGATES
  BOUNDED_CONTEXT DEFINES MICROSERVICE_BOUNDARIES
  UBIQUITOUS_LANGUAGE ENABLES DOMAIN_ALIGNMENT
  AGGREGATE_CANVAS DOCUMENTS AGGREGATE
  CRUD_MATRIX_APPROACH MEASURES COHESION_COUPLING_RATIO
  EVOLUTIONARY_COUPLING_REFACTORING VALIDATES CCP_COMPLIANCE
  AI_EMBEDDING_APPROACH AUTOMATES COMPONENT_DISCOVERY

  # Documentation
  C4_MODEL PROVIDES [C4_CONTEXT, C4_CONTAINER, C4_COMPONENT, C4_CLASS]
  C4_CONTAINER CONTAINS TYPE_T_COMPONENTS
  C4_COMPONENT CONTAINS TYPE_A_COMPONENTS
  ARC42 PROVIDES 12_SECTION_TEMPLATE
  ARC42_SECTION_9 CONTAINS ADR_FORMAT
  ARC42_SECTION_12 DOCUMENTS UBIQUITOUS_LANGUAGE
  META_VIEW PROVIDES COMMON_VOCABULARY
  STRUCTURE_VIEW DOCUMENTS STATIC_ARCHITECTURE
  BEHAVIOR_VIEW DOCUMENTS DYNAMIC_ARCHITECTURE
  NETWORK_VIEW DOCUMENTS PHYSICAL_DEPLOYMENT

  # Evaluation
  CHECKLIST_BASED_REVIEW VALIDATES QUALITY_PRINCIPLES
  SCENARIO_BASED_REVIEW VALIDATES COMPLETENESS
  CRUD_ANALYSIS_EVALUATION MEASURES COHESION_COUPLING_RATIO
  REUSABILITY_TEST VALIDATES COMPONENT_INDEPENDENCE
  AUTOMATED_COMPLIANCE_CHECKING ENFORCES ALLOWED_TO_USE_SPECIFICATION

  # Communication
  INTERFACE_COMMUNICATION_STYLE INCLUDES [SYNC_VS_ASYNC, STATEFUL_VS_STATELESS, TRANSACTIONAL_VS_NOT, FINE_VS_COARSE_GRAINED, LOCAL_VS_NETWORK]

  # Patterns
  LAYERED_ARCHITECTURE IS_A ALLOWED_TO_USE_PATTERN
  STRICTLY_LAYERED_ARCHITECTURE STRICTER_THAN LAYERED_ARCHITECTURE
  CQS ENABLES PREDICTABILITY
  CQRS EXTENDS CQS

  # Anti-Patterns
  MIXING_A_AND_T VIOLATES BLOOD_TYPES_PRINCIPLE
  A_PERSON_RECEIVING_T_MESSAGES VIOLATES BLOOD_TYPES_PRINCIPLE
  CRUD_LANGUAGE_IN_A_SOFTWARE VIOLATES UBIQUITOUS_LANGUAGE
  CYCLIC_DEPENDENCIES VIOLATES ADP
  CONWAYS_LAW_INVERSION CAUSES SUBOPTIMAL_ARCHITECTURE
  UNDERSPECIFIED_INTERFACES VIOLATES NOT_UNDERSPECIFIED
  OVERSPECIFIED_INTERFACES VIOLATES NOT_OVERSPECIFIED
  CODE_DUPLICATION VIOLATES DRY_PRINCIPLE
  CODE_DUPLICATION CREATES TECHNICAL_DEBT

  # Case Studies
  EARLYBIRD DEMONSTRATES [BLOOD_TYPES_PRINCIPLE, ISP, DDD, LOW_COUPLING, BACKWARD_COMPATIBILITY]
  MARS DEMONSTRATES [BLOOD_TYPES_PRINCIPLE, APPLICATION_CORE_PATTERN, TYPE_O, INTERFACE_ABSTRACTION]
  MATEMATE DEMONSTRATES [USE_CASE_DRIVEN_DEVELOPMENT, SDP, REUSABILITY_TEST]
  CHARTS_DUPLICATION DEMONSTRATES CODE_DUPLICATION_ANTI_PATTERN
  VIENNA_TRANSIT_ISP_VIOLATION DEMONSTRATES ISP_VIOLATION_CONSEQUENCES
  EVOLUTIONARY_COUPLING_96_PERCENT VALIDATES CCP_IMPORTANCE
  ALLOWED_TO_USE_VIOLATION DEMONSTRATES ARCHITECTURE_EROSION

  # Additional
  GOOD_ARCHITECTURE REDUCES ENVIRONMENTAL_IMPACT
  DOCUMENTATION_BEST_PRACTICES ENSURES MAINTAINABILITY
```

---

## VALIDATION_RULES

```yaml
VALIDATION_RULES:

  RULE[id=VALIDATE_BLOOD_TYPE_SEPARATION]
  rule: >
    FOR_EACH building_block:
      ASSERT blood_type IN [TYPE_A, TYPE_T, TYPE_O]
      ASSERT NOT (contains_TYPE_A AND contains_TYPE_T)
  violation: MIXING_A_AND_T

  RULE[id=VALIDATE_NO_CYCLES]
  rule: >
    dependency_graph = build_dependency_graph()
    cycles = detect_cycles(dependency_graph)
    ASSERT cycles.count == 0
  violation: CYCLIC_DEPENDENCIES

  RULE[id=VALIDATE_SRP]
  rule: >
    FOR_EACH component:
      responsibilities = count_responsibilities(component)
      ASSERT responsibilities == 1
  violation: SRP_VIOLATION

  RULE[id=VALIDATE_INTERFACE_BLOOD_TYPES]
  rule: >
    FOR_EACH a_component:
      FOR_EACH dependency IN a_component.dependencies:
        IF dependency IS_INTERFACE
        THEN ASSERT dependency.blood_type IN [TYPE_A, TYPE_O]
  violation: A_COMPONENT_DEPENDS_ON_T_INTERFACE

  RULE[id=VALIDATE_ALLOWED_TO_USE]
  rule: >
    FOR_EACH dependency IN actual_dependencies:
      ASSERT is_allowed(dependency, allowed_to_use_spec)
  violation: ALLOWED_TO_USE_VIOLATION

  RULE[id=VALIDATE_COHESION_COUPLING_RATIO]
  rule: >
    ratio = compute_cohesion_coupling_ratio(crud_matrix)
    ASSERT ratio >= 1.5
    WARN IF ratio < 3.0
  violation: LOW_QUALITY_ARCHITECTURE

  RULE[id=VALIDATE_BACKWARD_COMPATIBILITY]
  rule: >
    FOR_EACH interface_change:
      old_operations = get_operations(interface.previous_version)
      new_operations = get_operations(interface.current_version)
      ASSERT old_operations IS_SUBSET_OF new_operations
  violation: BREAKING_INTERFACE_CHANGE

  RULE[id=VALIDATE_ISP]
  rule: >
    FOR_EACH interface:
      clients = get_clients(interface)
      FOR_EACH client IN clients:
        used_methods = client.methods_called_from(interface)
        ASSERT used_methods.count / interface.methods.count > 0.5
  violation: INTERFACE_SEGREGATION_VIOLATION

  RULE[id=VALIDATE_CQS]
  rule: >
    FOR_EACH method:
      has_side_effects = method.modifies_state
      has_return_value = method.return_type != void
      ASSERT NOT (has_side_effects AND has_return_value)
  violation: COMMAND_QUERY_SEPARATION_VIOLATION

  RULE[id=VALIDATE_UBIQUITOUS_LANGUAGE]
  rule: >
    domain_terms = extract_terms_from(requirements)
    code_terms = extract_terms_from(a_components)
    FOR_EACH term IN domain_terms:
      ASSERT term IN code_terms OR has_synonym(term, code_terms)
  violation: UBIQUITOUS_LANGUAGE_VIOLATION
```

---

## ML_FEATURES

```yaml
ENTITY[id=ARCHITECTURE_QUALITY_CLASSIFIER]
type: ML_MODEL
purpose: Automatically assess architecture quality
input_features:
  - srp_compliance: float[0,1]
  - coupling_ratio: float
  - cyclic_dependencies: boolean
  - a_t_separation: float[0,1]
  - interface_quality: float[0,1]
  - documentation_completeness: float[0,1]
  - cohesion_coupling_ratio: float
  - evolutionary_coupling_scores: vector
output:
  quality_score: float[0,1]
  risk_level: [ low, medium, high ]
  refactoring_priority: [ none, low, medium, high, critical ]
training_data: >
  LABELED examples from case studies in knowledge base
  FEATURES extracted from real codebases
  LABELS from expert architect assessments

  ENTITY[id=PATTERN_RECOMMENDER]
type: ML_MODEL
purpose: Suggest architectural patterns for given problem
input_features:
  - problem_description_embedding: vector
  - quality_requirements: [ changeability, performance, security, scalability, maintainability ]
  - constraints: [ team_size, deployment_model, technology_stack ]
  - system_scale: [ small, medium, large ]
  - change_frequency: [ low, medium, high ]
output:
  ranked_patterns: List[PATTERN]
  rationale: Explanation for each recommendation
training_data: >
  Problem-pattern pairs from knowledge base
  Case studies with successful pattern applications
  Anti-patterns with failure scenarios

  ENTITY[id=COMPONENT_DISCOVERY_ASSISTANT]
type: ML_MODEL
purpose: Automatically discover components from requirements
input_features:
  - requirement_embeddings: vector_database
  - existing_architecture: graph
  - domain_terminology: dictionary
output:
  component_clusters: List[ComponentCluster]
  component_names: List[String]
  interfaces_suggested: List[Interface]
method: AI_EMBEDDING_APPROACH
technology:
  - embedding_model: sentence_transformers
  - clustering: DBSCAN
  - naming: LLM_based_generation

  ENTITY[id=ARCHITECTURE_VIOLATION_DETECTOR]
type: ML_MODEL
purpose: Detect architecture principle violations from code
input_features:
  - dependency_graph: graph
  - component_blood_types: dictionary
  - interface_definitions: list
  - code_metrics: vector
output:
  violations: List[Violation]
  severity: [ low, medium, high, critical ]
  suggested_fixes: List[Refactoring]
validates:
  - BLOOD_TYPES_PRINCIPLE
  - ACYCLIC_DEPENDENCIES_PRINCIPLE
  - INTERFACE_SEGREGATION_PRINCIPLE
  - ALLOWED_TO_USE_SPECIFICATION
```

---

## TIMELESS_WISDOM

```yaml
QUOTES:
  - author: Robert_C_Martin
    quote: >
      The rules of software architecture are universal and changeless.
      They have been the same since Alan Turing wrote the first code in 1946.

  - author: David_Parnas
    publication: "On the Criteria to be Used in Decomposing Systems into Modules (1972)"
    relevance: Still relevant today, foundational paper

  - author: Definition
    quote: "Architecture = the technical decisions that are hard to change"

  - author: Simon_Brown
    quote: "The code doesn't tell the whole story."

  - author: Dave_Thomas
    quote: "Big design up front is dumb. No design up front is even dumber."

  - author: Johannes_Siedersleben
    quote: "Check and minimize dependencies. Each avoided dependency is a victory."

  - author: Ian_Cooper
    quote: "Coupling is what kills all software."

  - author: Kent_Beck
    quote: "The bulk of software design is managing dependencies."

  - author: Kent_Beck
    quote: "Designs without duplication tend to be easy to change."

  - author: Scott_Meyers
    quote: "Easy to use correctly, hard to use incorrectly."

  - author: Melvin_Conway
    quote: >
      Organizations which design systems are constrained to produce designs
      which are copies of the communication structures of these organizations.

  - author: Tom_DeMarco
    quote: "Architecture = framework for change"

  - author: Martin_Fowler
    quote: "Microservices built around business capabilities"
```

---

## FURTHER_READING

```yaml
ESSENTIAL_BOOKS:
  - author: Eric_Evans
    title: Domain-Driven Design
    year: 2003
    focus: [ DDD, BOUNDED_CONTEXT, AGGREGATE, UBIQUITOUS_LANGUAGE ]

  - author: Robert_C_Martin
    title: Clean Architecture
    focus: [ BLOOD_TYPES, DEPENDENCY_PRINCIPLES, SOLID ]

  - author: Simon_Brown
    title: Software Architecture for Developers
    focus: [ C4_MODEL, DOCUMENTATION, COMMUNICATION ]

  - author: Vaughn_Vernon
    title: Implementing Domain-Driven Design
    focus: [ DDD_IMPLEMENTATION, AGGREGATES, BOUNDED_CONTEXTS ]

  - author: John_Ousterhout
    title: A Philosophy of Software Design
    focus: [ COMPLEXITY_MANAGEMENT, INTERFACE_DESIGN ]

  - author: Johannes_Siedersleben
    title: Moderne Software-Architektur
    focus: [ BLOOD_TYPES, DEPENDENCY_MANAGEMENT ]

  - author: Nicolai_Josuttis
    title: SOA in Practice
    focus: [ SERVICE_ORIENTED_ARCHITECTURE, INTEGRATION ]

KEY_ARTICLES:
  - author: Martin_Fowler
    title: Microservices
    url: martinfowler.com/articles/microservices.html
    focus: MICROSERVICES_PATTERN

  - authors: [ Cesare_Pautasso, et_al ]
    title: Microservices in Practice
    publication: IEEE Software 2017
    focus: MICROSERVICES_PRACTICAL_EXPERIENCE

FRAMEWORKS_AND_TEMPLATES:
  - name: arc42
    url: http://www.arc42.org/
    type: DOCUMENTATION_TEMPLATE
    cost: free

  - name: C4_Model
    url: c4model.com
    type: DOCUMENTATION_FRAMEWORK
    cost: free

  - name: iSAQB
    description: International Software Architecture Qualification Board
    type: CERTIFICATION
```

---

## METADATA

```yaml
transformation_notes:
  - All narrative prose transformed to structured entities
  - All relationships explicitly defined
  - All principles include validation logic
  - All methods include computational steps
  - All case studies structured as lessons with principles
  - Query patterns enable graph traversal
  - Decision frameworks enable automated recommendations
  - ML features enable quality prediction and pattern recommendation
  - Validation rules enable automated compliance checking

usage_examples:
  architecture_validation: >
    LOAD knowledge_base
    FOR_EACH component IN architecture:
      CHECK VALIDATE_BLOOD_TYPE_SEPARATION
      CHECK VALIDATE_SRP
      CHECK VALIDATE_INTERFACE_BLOOD_TYPES
    CHECK VALIDATE_NO_CYCLES ON dependency_graph
    COMPUTE COHESION_COUPLING_RATIO
    REPORT violations + quality_score

  pattern_recommendation: >
    GIVEN problem_description
    EMBED problem_description INTO vector
    QUERY PATTERN_RECOMMENDER WITH [vector, quality_requirements, constraints]
    RETURN ranked_patterns WITH rationale

  component_discovery: >
    GIVEN requirements_list
    APPLY AI_EMBEDDING_APPROACH:
      EMBED requirements
      CLUSTER embeddings
      GENERATE component_names
    VALIDATE WITH USE_CASE_DRIVEN_DEVELOPMENT
    EVALUATE WITH CRUD_MATRIX_APPROACH

  learning_from_case_studies: >
    QUERY "Show examples of TYPE_A/TYPE_T separation"
    RETURNS [EARLYBIRD, MARS]
    FOR_EACH case_study:
      EXTRACT lessons
      APPLY lessons TO current_architecture
      VALIDATE compliance

completeness_metrics:
  total_entities: 150+
  total_relationships: 200+
  principles_documented: 25+
  patterns_documented: 15+
  methods_documented: 7
  case_studies: 7
  anti_patterns: 8
  query_patterns: 6
  decision_frameworks: 3
  validation_rules: 10
  ml_models: 4

version: 1.0
last_updated: 2025-11-13
source_lines: 825
output_lines: ~2500
compression_ratio: human_narrative → machine_queryable_knowledge
```

---

**END OF SOFTWARE ARCHITECTURE KNOWLEDGE BASE**

*This AI-optimized semantic knowledge base enables: automated architecture validation, pattern recommendation, component
discovery, quality assessment, and learning from structured case studies. Use for: AI-powered architecture tools,
automated compliance checking, architecture training systems, and decision support.*
