# REQUIREMENTS ENGINEERING KNOWLEDGE BASE

## AI-Optimized Semantic Model v1.0

@ONTOLOGY_VERSION: 1.0
@DOMAIN: Requirements Engineering
@PURPOSE: Machine-readable knowledge base for AI systems
@ENCODING: Semantic markup with explicit relationships

---

## ENTITY_TYPES

```yaml
entity_types:
  - CONCEPT: Abstract idea or principle
  - METHOD: Technique or approach
  - ARTIFACT: Deliverable or document
  - ROLE: Person or system actor
  - QUALITY_ATTRIBUTE: Measurable characteristic
  - PROBLEM: Challenge or issue
  - SOLUTION: Resolution or answer
  - PATTERN: Reusable approach
  - CRITERION: Evaluation standard
  - PHASE: Stage in process
```

## RELATIONSHIP_TYPES

```yaml
relationships:
  - IS_A: Taxonomy/inheritance (X IS_A Y)
  - PART_OF: Composition (X PART_OF Y)
  - REQUIRES: Dependency (X REQUIRES Y)
  - CONFLICTS_WITH: Incompatibility (X CONFLICTS_WITH Y)
  - ADDRESSES: Solution relationship (X ADDRESSES Y)
  - PRODUCES: Output (X PRODUCES Y)
  - USES: Tool/method usage (X USES Y)
  - MEASURED_BY: Metric relationship (X MEASURED_BY Y)
  - PREVENTS: Negative impact (X PREVENTS Y)
  - CAUSES: Causal relationship (X CAUSES Y)
  - REFINES: Elaboration (X REFINES Y)
  - ALTERNATIVE_TO: Mutual exclusivity option (X ALTERNATIVE_TO Y)
```

---

## CORE_MODEL

### ENTITY[id=RE_LIFECYCLE]

```yaml
type: CONCEPT
name: Requirements Engineering Lifecycle
description: >
  Complete process for discovering, defining, structuring, and maintaining requirements
phases:
  - PHASE[id=DISCOVER]
  - PHASE[id=DEFINE]
  - PHASE[id=STRUCTURE]
  - PHASE[id=MAINTAIN]
relationships:
  - DISCOVER PRECEDES DEFINE
  - DEFINE PRECEDES STRUCTURE
  - STRUCTURE PRECEDES MAINTAIN
  - MAINTAIN LOOPS_TO DISCOVER
```

---

## PHASE[id=DISCOVER]

### ENTITY[id=DISCOVERY_PHASE]

```yaml
type: PHASE
name: Discovery Phase
purpose: Identify and elicit requirements from all sources
activities:
  - SOURCE_IDENTIFICATION
  - STAKEHOLDER_ANALYSIS
  - REQUIREMENT_ELICITATION
outputs:
  - ARTIFACT[id=RAW_REQUIREMENTS_LIST]
  - ARTIFACT[id=STAKEHOLDER_MAP]
  - ARTIFACT[id=CONTEXT_DIAGRAM]
```

### ENTITY[id=SOURCES_PRINCIPLE]

```yaml
type: CONCEPT
name: Three Sources Principle
description: All requirements originate from exactly three source categories
sources:
  - ENTITY[id=SOURCE_TEXTS]
  - ENTITY[id=SOURCE_SYSTEMS]
  - ENTITY[id=SOURCE_PEOPLE]
completeness_rule: >
  IF all_three_sources_analyzed THEN requirements_discovery_complete
validation: >
  FOR_EACH requirement:
    ASSERT EXISTS source IN [TEXTS, SYSTEMS, PEOPLE]
```

### ENTITY[id=SOURCE_TEXTS]

```yaml
type: CONCEPT
name: Text-Based Sources
parent: SOURCES_PRINCIPLE
examples:
  - regulations
  - standards
  - legacy_specifications
  - contracts
  - competitor_documentation
  - industry_best_practices
elicitation_method: ENTITY[id=METHOD_READ]
typical_requirement_types:
  - ENTITY[id=REQ_TYPE_LEGAL]
  - ENTITY[id=REQ_TYPE_COMPLIANCE]
```

### ENTITY[id=SOURCE_SYSTEMS]

```yaml
type: CONCEPT
name: System-Based Sources
parent: SOURCES_PRINCIPLE
examples:
  - existing_software
  - prototypes
  - competitor_products
  - market_offerings
  - similar_systems
elicitation_method: ENTITY[id=METHOD_WATCH]
typical_requirement_types:
  - ENTITY[id=REQ_TYPE_BASIC]
  - ENTITY[id=REQ_TYPE_PERFORMANCE]
```

### ENTITY[id=SOURCE_PEOPLE]

```yaml
type: CONCEPT
name: People-Based Sources (Stakeholders)
parent: SOURCES_PRINCIPLE
examples:
  - end_users
  - customers
  - regulators
  - developers
  - domain_experts
  - business_stakeholders
elicitation_method: ENTITY[id=METHOD_TALK]
typical_requirement_types:
  - ENTITY[id=REQ_TYPE_PERFORMANCE]
  - ENTITY[id=REQ_TYPE_EXCITEMENT]
```

---

### ENTITY[id=KANO_MODEL]

```yaml
type: METHOD
name: Kano Model
purpose: Classify requirements by customer satisfaction impact
classification_dimensions:
  - feature_presence: [absent, present]
  - customer_satisfaction: [dissatisfied, neutral, delighted]
requirement_types:
  - ENTITY[id=REQ_TYPE_BASIC]
  - ENTITY[id=REQ_TYPE_LEGAL]
  - ENTITY[id=REQ_TYPE_PERFORMANCE]
  - ENTITY[id=REQ_TYPE_EXCITEMENT]
  - ENTITY[id=REQ_TYPE_SUPERFLUOUS]
decision_logic: >
  IF customer_expects_implicitly THEN REQ_TYPE_BASIC
  ELIF mandated_by_regulation THEN REQ_TYPE_LEGAL
  ELIF quantifiable_metric THEN REQ_TYPE_PERFORMANCE
  ELIF innovative_unexpected THEN REQ_TYPE_EXCITEMENT
  ELIF unnecessarily_complex THEN REQ_TYPE_SUPERFLUOUS
```

### ENTITY[id=REQ_TYPE_BASIC]

```yaml
type: CONCEPT
name: Basic Requirements
parent: KANO_MODEL
satisfaction_function:
  absent: dissatisfied
  present: neutral
customer_expectation: implicit
elicitation_priority: high
elicitation_method: ENTITY[id=METHOD_WATCH]
techniques:
  - user_observation
  - prototype_testing
  - journey_mapping
  - existing_system_analysis
validation_approach: >
  Observe users WITHOUT asking. Basic requirements are implicit.
discovery_challenge: >
  Customers don't mention these because they assume them.
examples:
  - login_functionality
  - save_button
  - search_feature
  - data_persistence
```

### ENTITY[id=REQ_TYPE_LEGAL]

```yaml
type: CONCEPT
name: Legal/Mandatory Requirements
parent: KANO_MODEL
satisfaction_function:
  absent: legal_violation
  present: compliance
customer_expectation: mandated
elicitation_priority: critical
elicitation_method: ENTITY[id=METHOD_READ]
techniques:
  - regulatory_document_analysis
  - standards_review
  - compliance_checklist
  - legal_consultation
validation_approach: >
  Trace to specific regulation article or standard section.
non_negotiable: true
examples:
  - GDPR_right_to_erasure
  - HIPAA_data_encryption
  - PCI_DSS_card_storage_prohibition
  - SOC2_access_controls
```

### ENTITY[id=REQ_TYPE_PERFORMANCE]

```yaml
type: CONCEPT
name: Performance Requirements
parent: KANO_MODEL
satisfaction_function:
  low_value: dissatisfied
  medium_value: neutral
  high_value: satisfied
customer_expectation: explicit_with_metric
elicitation_priority: high
elicitation_method: ENTITY[id=METHOD_TALK]
techniques:
  - structured_interviews
  - surveys
  - focus_groups
  - stakeholder_workshops
validation_approach: >
  Measurement with specific metric and acceptance threshold.
must_be_quantifiable: true
examples:
  - response_time_under_200ms
  - support_10000_concurrent_users
  - 99.9_percent_uptime
  - process_1000_transactions_per_second
```

### ENTITY[id=REQ_TYPE_EXCITEMENT]

```yaml
type: CONCEPT
name: Excitement Requirements (Delighters)
parent: KANO_MODEL
satisfaction_function:
  absent: neutral
  present: delighted
customer_expectation: unexpected
elicitation_priority: medium
elicitation_method: ENTITY[id=METHOD_THINK]
techniques:
  - brainstorming
  - osborn_checklist
  - design_thinking
  - competitive_differentiation_analysis
  - innovation_workshops
validation_approach: >
  Prototype and observe emotional response.
discovery_challenge: >
  Customers don't know to ask. Requires creativity from team.
examples:
  - AI_powered_recommendations
  - voice_control
  - offline_mode
  - dark_mode
  - social_sharing
```

### ENTITY[id=REQ_TYPE_SUPERFLUOUS]

```yaml
type: CONCEPT
name: Superfluous Requirements
parent: KANO_MODEL
satisfaction_function:
  absent: neutral
  present: wasted_resources
customer_expectation: none_or_misguided
elicitation_priority: elimination
elicitation_method: ENTITY[id=METHOD_CHALLENGE]
techniques:
  - five_whys
  - value_stream_analysis
  - cost_benefit_analysis
validation_approach: >
  Challenge necessity. Cannot justify business value.
action: remove_or_simplify
examples:
  - over_engineered_solution
  - premature_optimization
  - gold_plating
  - unnecessary_abstraction
```

---

### ENTITY[id=WRTT_FRAMEWORK]

```yaml
type: METHOD
name: Watch-Read-Think-Talk Framework
purpose: Map elicitation methods to requirement types
methods:
  - ENTITY[id=METHOD_WATCH]
  - ENTITY[id=METHOD_READ]
  - ENTITY[id=METHOD_THINK]
  - ENTITY[id=METHOD_TALK]
mapping:
  - method: WATCH
    best_for: [REQ_TYPE_BASIC]
  - method: READ
    best_for: [REQ_TYPE_LEGAL]
  - method: THINK
    best_for: [REQ_TYPE_EXCITEMENT]
  - method: TALK
    best_for: [REQ_TYPE_PERFORMANCE]
```

### ENTITY[id=METHOD_WATCH]

```yaml
type: METHOD
name: Watch Method
purpose: Discover implicit basic requirements through observation
techniques:
  - user_observation
  - ethnography
  - shadowing
  - prototype_testing
  - ab_testing
  - journey_mapping
  - existing_system_analysis
skill_required: observation
output: implicit_requirements
addresses: PROBLEM[id=HIDDEN_BASIC_REQUIREMENTS]
relationship: METHOD_WATCH ADDRESSES REQ_TYPE_BASIC
```

### ENTITY[id=METHOD_READ]

```yaml
type: METHOD
name: Read Method
purpose: Extract legal and compliance requirements from documents
techniques:
  - regulatory_document_analysis
  - standards_review
  - contract_examination
  - legacy_documentation_analysis
  - competitor_analysis
skill_required: analytical_reading
output: mandatory_requirements
addresses: PROBLEM[id=COMPLIANCE_REQUIREMENTS]
relationship: METHOD_READ ADDRESSES REQ_TYPE_LEGAL
```

### ENTITY[id=METHOD_THINK]

```yaml
type: METHOD
name: Think Method
purpose: Generate innovative excitement requirements through creativity
techniques:
  - brainstorming
  - ENTITY[id=OSBORN_CHECKLIST]
  - design_thinking
  - innovation_workshops
  - competitive_differentiation
  - future_scenario_planning
skill_required: creative_thinking
output: innovative_requirements
addresses: PROBLEM[id=MISSING_DELIGHTERS]
relationship: METHOD_THINK ADDRESSES REQ_TYPE_EXCITEMENT
```

### ENTITY[id=METHOD_TALK]

```yaml
type: METHOD
name: Talk Method
purpose: Elicit performance requirements through structured communication
techniques:
  - structured_interviews
  - surveys
  - focus_groups
  - stakeholder_workshops
  - prioritization_sessions
skill_required: communication
output: quantified_requirements
addresses: PROBLEM[id=UNCLEAR_PERFORMANCE_NEEDS]
relationship: METHOD_TALK ADDRESSES REQ_TYPE_PERFORMANCE
```

### ENTITY[id=METHOD_CHALLENGE]

```yaml
type: METHOD
name: Challenge Method
purpose: Identify and eliminate superfluous requirements
techniques:
  - five_whys
  - value_stream_analysis
  - cost_benefit_analysis
  - simplification_exercise
skill_required: critical_thinking
output: eliminated_waste
addresses: PROBLEM[id=OVER_ENGINEERING]
relationship: METHOD_CHALLENGE ADDRESSES REQ_TYPE_SUPERFLUOUS
```

---

### ENTITY[id=OSBORN_CHECKLIST]

```yaml
type: METHOD
name: Osborn Checklist
parent: METHOD_THINK
purpose: Systematic creativity for excitement requirements
operations:
  - operation: ADD
    prompt: What can we add to the system?
    examples: [AI, voice_control, offline_mode, AR, sensors, GPS, biometrics]
  - operation: REMOVE
    prompt: What can we eliminate?
    examples: [steps, clicks, waiting_time, unnecessary_fields]
  - operation: COMBINE
    prompt: What can we merge?
    examples: [features, workflows, systems, data_sources]
  - operation: SEPARATE
    prompt: What can we split?
    examples: [monolith_to_microservices, roles, environments]
  - operation: SUBSTITUTE
    prompt: What can we replace?
    examples: [typing_with_voice, text_with_visual, manual_with_automated]
  - operation: REVERSE
    prompt: What if we reverse the order?
    examples: [workflow_sequence, data_flow_direction]
  - operation: ENLARGE
    prompt: What if we make it bigger?
    examples: [scale, users, data_volume, geographic_reach]
  - operation: SHRINK
    prompt: What if we make it smaller?
    examples: [lightweight_version, mobile_first, microservice]
  - operation: REARRANGE
    prompt: What if we change the order?
    examples: [navigation_structure, process_sequence]
  - operation: ADAPT
    prompt: What can we copy from elsewhere?
    examples: [competitor_features, patterns_from_other_industries]
application_pattern: >
  FOR_EACH operation IN osborn_checklist:
    APPLY operation TO current_system
    GENERATE new_requirement_ideas
    VALIDATE business_value
    IF valuable THEN add_to_excitement_requirements
```

---

### ENTITY[id=TOP_10_PROBLEMS]

```yaml
type: CONCEPT
name: Top 10 Requirements Engineering Problems
description: Most common challenges in real-world RE practice
problems:
  - PROBLEM[id=PROB_01_FIND_SOURCES]
  - PROBLEM[id=PROB_02_SOURCE_DISAGREEMENT]
  - PROBLEM[id=PROB_03_HIDDEN_REQUIREMENTS]
  - PROBLEM[id=PROB_04_WRONG_CUSTOMER_NEED]
  - PROBLEM[id=PROB_05_PRIORITIZATION]
  - PROBLEM[id=PROB_06_DOCUMENT_STRUCTURE]
  - PROBLEM[id=PROB_07_IMPRECISE_LANGUAGE]
  - PROBLEM[id=PROB_08_WRONG_DIAGRAMS]
  - PROBLEM[id=PROB_09_MISSING_ATTRIBUTES]
  - PROBLEM[id=PROB_10_OUTDATED_REQUIREMENTS]
```

### PROBLEM[id=PROB_01_FIND_SOURCES]

```yaml
type: PROBLEM
name: Cannot Find All Requirement Sources
description: Incomplete source identification leads to missing requirements
solution: ENTITY[id=SOURCES_PRINCIPLE]
prevention_method: >
  APPLY checklist:
    - IDENTIFY texts (regulations, standards, legacy_docs)
    - IDENTIFY systems (existing_software, prototypes, competitors)
    - IDENTIFY people (stakeholders across all roles)
  CREATE ARTIFACT[id=CONTEXT_DIAGRAM]
```

### PROBLEM[id=PROB_02_SOURCE_DISAGREEMENT]

```yaml
type: PROBLEM
name: Requirement Sources Disagree
description: Conflicting requirements from different stakeholders
solution: ENTITY[id=CONFLICT_RESOLUTION_FRAMEWORK]
resolution_strategies:
  - ENTITY[id=RESOLUTION_VOTING]
  - ENTITY[id=RESOLUTION_ESCALATION]
  - ENTITY[id=RESOLUTION_VARIANTS]
  - ENTITY[id=RESOLUTION_VERSIONING]
```

### PROBLEM[id=PROB_03_HIDDEN_REQUIREMENTS]

```yaml
type: PROBLEM
name: Customer Has Requirements But Doesn't Mention Them
description: Basic requirements are implicit and unstated
solution: ENTITY[id=METHOD_WATCH]
root_cause: >
  Basic requirements are assumed by customer.
  Customer expectation: implicit.
detection_approach: >
  OBSERVE customer behavior WITHOUT asking questions.
  PROTOTYPE early and watch reactions.
relationship: PROB_03_HIDDEN_REQUIREMENTS ADDRESSED_BY METHOD_WATCH
```

### PROBLEM[id=PROB_04_WRONG_CUSTOMER_NEED]

```yaml
type: PROBLEM
name: Customer Asks For Wrong Solution
description: Customer specifies solution rather than need
solution: >
  APPLY five_whys to uncover root need.
  PROTOTYPE to validate actual need.
  FOCUS_ON problem not solution in requirements.
example:
  stated: Customer wants red button on page 3
  actual_need: Customer needs faster access to emergency function
  correct_requirement: Emergency function accessible within 2 clicks from any page
technique: >
  ASK "Why do you need that?" 5 times to reach root cause.
```

### PROBLEM[id=PROB_05_PRIORITIZATION]

```yaml
type: PROBLEM
name: Cannot Prioritize Requirements
description: Unclear which requirements to implement first
solution: ENTITY[id=PRIORITIZATION_FRAMEWORK]
methods:
  - ENTITY[id=MOSCOW_METHOD]
  - ENTITY[id=RISK_VALUE_MATRIX]
  - ENTITY[id=KANO_PRIORITIZATION]
```

### PROBLEM[id=PROB_06_DOCUMENT_STRUCTURE]

```yaml
type: PROBLEM
name: Poor Requirements Document Organization
description: Requirements document lacks logical structure
solution: >
  USE standard templates:
    - ARTIFACT[id=VOLERE_TEMPLATE]
    - ARTIFACT[id=USE_CASE_TEMPLATE]
    - ARTIFACT[id=USER_STORY_FORMAT]
organization_principles:
  - group_by_domain_object
  - group_by_use_case
  - group_by_stakeholder
  - maintain_traceability
```

### PROBLEM[id=PROB_07_IMPRECISE_LANGUAGE]

```yaml
type: PROBLEM
name: Natural Language Requirements Are Imprecise
description: Ambiguous wording leads to misinterpretation
solution: ENTITY[id=LANGUAGE_QUALITY_RULES]
common_errors:
  - ENTITY[id=ERROR_NOMINALIZATION]
  - ENTITY[id=ERROR_PASSIVE_VOICE]
  - ENTITY[id=ERROR_UNIVERSAL_QUANTIFIER]
  - ENTITY[id=ERROR_INCOMPLETE_CONDITION]
  - ENTITY[id=ERROR_VAGUE_NOUN]
```

### PROBLEM[id=PROB_08_WRONG_DIAGRAMS]

```yaml
type: PROBLEM
name: Using Wrong Diagram Types
description: Diagram type doesn't match requirement type or audience
solution: ENTITY[id=DIAGRAM_SELECTION_FRAMEWORK]
matching_rules:
  - requirement_type: FUNCTIONAL
    diagram: use_case_diagram, sequence_diagram, activity_diagram
  - requirement_type: DATA
    diagram: entity_relationship_diagram, class_diagram
  - requirement_type: INTERFACE
    diagram: interface_specification, API_documentation
  - requirement_type: NON_FUNCTIONAL
    diagram: deployment_diagram, component_diagram
```

### PROBLEM[id=PROB_09_MISSING_ATTRIBUTES]

```yaml
type: PROBLEM
name: Requirements Missing Key Attributes
description: Requirements lack traceability, priority, or rationale
solution: ENTITY[id=VOLERE_ATTRIBUTES]
minimum_required_attributes:
  - id
  - description
  - type
  - priority
  - source
  - rationale
  - fit_criterion
recommended_attributes:
  - dependencies
  - conflicts
  - verification_method
  - history
```

### PROBLEM[id=PROB_10_OUTDATED_REQUIREMENTS]

```yaml
type: PROBLEM
name: Requirements Become Outdated Over Time
description: Requirements drift from reality as system evolves
solution: >
  IMPLEMENT ENTITY[id=TRACEABILITY_SYSTEM]
  MAINTAIN ENTITY[id=CHANGE_MANAGEMENT_PROCESS]
  CLASSIFY requirements by ENTITY[id=STABILITY]
prevention:
  - maintain_bidirectional_traceability
  - automate_impact_analysis
  - regular_requirements_review
  - version_control_for_requirements
```

---

## PHASE[id=DEFINE]

### ENTITY[id=DEFINITION_PHASE]

```yaml
type: PHASE
name: Definition Phase
purpose: Express requirements clearly and unambiguously
activities:
  - APPLY ENTITY[id=LANGUAGE_QUALITY_RULES]
  - CREATE ENTITY[id=GLOSSARY]
  - VALIDATE against ENTITY[id=INVEST_CRITERIA]
  - SELECT ENTITY[id=DOCUMENTATION_FORMAT]
outputs:
  - ARTIFACT[id=WELL_FORMED_REQUIREMENTS]
  - ARTIFACT[id=PROJECT_GLOSSARY]
```

---

### ENTITY[id=LANGUAGE_QUALITY_RULES]

```yaml
type: CRITERION
name: Natural Language Quality Rules
purpose: Eliminate ambiguity in requirement statements
rules:
  - RULE[id=NO_NOMINALIZATION]
  - RULE[id=USE_ACTIVE_VOICE]
  - RULE[id=BOUND_QUANTIFIERS]
  - RULE[id=COMPLETE_CONDITIONS]
  - RULE[id=SPECIFY_NOUNS]
validation_pattern: >
  FOR_EACH requirement IN requirements_document:
    ASSERT passes_all_quality_rules(requirement)
```

### RULE[id=NO_NOMINALIZATION]

```yaml
type: CRITERION
name: No Nominalization
parent: LANGUAGE_QUALITY_RULES
problem: Using nouns instead of verbs hides actor and action
detection_pattern: >
  REGEX: /(authorization|transmission|validation|processing|execution) (is performed|takes place|occurs)/
correction_pattern: >
  REPLACE nominalization WITH active_verb
  SPECIFY actor AND object
error_indicators:
  - "is performed"
  - "takes place"
  - "occurs"
  - "happens"
  - "execution of"
  - "processing of"
transformation:
  input: "Authorization is performed before access"
  output: "System authorizes user before granting access"
  rule: EXTRACT verb FROM nominalization AND SPECIFY subject
validation: >
  ASSERT requirement CONTAINS active_verb
  ASSERT requirement CONTAINS explicit_subject
```

### RULE[id=USE_ACTIVE_VOICE]

```yaml
type: CRITERION
name: Use Active Voice
parent: LANGUAGE_QUALITY_RULES
problem: Passive voice leaves subject ambiguous
detection_pattern: >
  REGEX: /(is|are|was|were) (transmitted|processed|validated|sent|stored)/
  MISSING: explicit subject performing action
correction_pattern: >
  IDENTIFY subject (who/what performs action)
  RESTRUCTURE: [subject] [verb] [object]
  SPECIFY: what, how, from, to (for verbs like transmit/send)
transformation:
  input: "Data is transmitted to the server"
  ambiguity: [by_whom, via_what_protocol, from_where]
  output: "Sensor transmits GPS data to controller via MQTT every 5 seconds"
  completeness: [subject=sensor, verb=transmit, object=GPS_data, destination=controller, mechanism=MQTT, frequency=5_seconds]
validation: >
  ASSERT requirement HAS explicit_subject
  ASSERT verb IS active_form
  ASSERT process_verbs HAVE [what, how, from, to]
```

### RULE[id=BOUND_QUANTIFIERS]

```yaml
type: CRITERION
name: Bound Universal Quantifiers
parent: LANGUAGE_QUALITY_RULES
problem: "all/every/always/never" are almost always false
detection_pattern: >
  REGEX: /\b(all|every|each|any|always|never|whenever|everywhere|everybody)\b/
correction_pattern: >
  REPLACE universal WITH bounded_specific
  ADD constraints AND exceptions
error_indicator: >
  Universal quantifier WITHOUT explicit bounds
transformation:
  input: "All customers get 10% discount"
  exceptions: [VIP_customers, employees, already_discounted_items]
  output: "Standard customers (non-VIP, non-employee) receive 10% discount on regular-priced items"
real_world_example:
  input: "Whenever customer removes meat patty, reduce price by €1.10"
  exploit: "Order 11 burgers (1 with patty, 10 without) = negative price"
  fix: "For burgers priced €2.00 or more, removing meat patty reduces price by €1.10"
validation: >
  IF requirement CONTAINS universal_quantifier
  THEN ASSERT has_explicit_bounds AND has_documented_exceptions
```

### RULE[id=COMPLETE_CONDITIONS]

```yaml
type: CRITERION
name: Complete Conditional Statements
parent: LANGUAGE_QUALITY_RULES
problem: Specifying IF but not ELSE leaves behavior undefined
detection_pattern: >
  REGEX: /^if\b.*then\b/i
  NOT FOLLOWED BY: else clause
correction_pattern: >
  FOR_EACH conditional:
    SPECIFY if_branch (condition true)
    SPECIFY else_branch (condition false)
    CHECK feature_interactions (multiple conditions)
transformation:
  input: "If balance >= withdrawal amount, allow transaction"
  undefined: behavior when balance < withdrawal
  output: >
    IF balance >= withdrawal_amount THEN allow_transaction
    ELSE reject_transaction AND display "Insufficient funds. Available: {balance}"
feature_interaction_example:
  rule_1: "Handicapped customers get 10% discount"
  rule_2: "Children get 8% discount"
  undefined: handicapped_child discount
  resolution: "Apply maximum applicable discount (no stacking)"
validation: >
  FOR_EACH conditional IN requirement:
    ASSERT has_if_branch
    ASSERT has_else_branch
    ASSERT handles_edge_cases
```

### RULE[id=SPECIFY_NOUNS]

```yaml
type: CRITERION
name: Specify All Nouns with Reference Index
parent: LANGUAGE_QUALITY_RULES
problem: Under-specified nouns create ambiguity
detection_pattern: >
  NOUN without qualifying_attributes
  IMPLICIT universal quantifier
correction_pattern: >
  ADD bounds/qualifiers to each noun
  SPECIFY type, category, constraints
transformation:
  input: "Children get 8% discount"
  ambiguity: [age_range, employee_children, all_flights]
  output: "Children ages 2-12 (excluding employee dependents) receive 8% discount on leisure flights"
  specified: [age_bounds, exclusions, applicable_context]
validation: >
  FOR_EACH noun IN requirement:
    ASSERT has_reference_index OR is_defined_in_glossary
    IF category_noun THEN ASSERT has_bounds
```

---

### ENTITY[id=GLOSSARY]

```yaml
type: ARTIFACT
name: Project Glossary
purpose: Define ubiquitous language for project (Domain-Driven Design)
structure:
  term: canonical_name_for_concept
  description: clear_unambiguous_definition
  synonyms: alternative_names (discourage use)
  homonyms: same_word_different_meaning (flag conflicts)
  subcategories: specific_types_within_category
  relationships: links_to_other_terms
  examples: concrete_instances
  non_examples: what_it_is_NOT
  domain_model_link: reference_to_class_diagram
importance: >
  "Names in software systems are one of the most important things we have to deal with"
  - Martin Fowler
creation_timing: BEFORE writing requirements
maintenance: continuous_throughout_project
validation: >
  ASSERT all_domain_terms_defined
  ASSERT no_conflicting_definitions
  ASSERT stakeholder_agreement_on_definitions
```

---

### ENTITY[id=INVEST_CRITERIA]

```yaml
type: CRITERION
name: INVEST Quality Criteria
purpose: Validate requirement quality and implementability
scope: applies to ALL requirements (not only user stories)
criteria:
  - CRITERION[id=INVEST_I]
  - CRITERION[id=INVEST_N]
  - CRITERION[id=INVEST_V]
  - CRITERION[id=INVEST_E]
  - CRITERION[id=INVEST_S]
  - CRITERION[id=INVEST_T]
validation_pattern: >
  FOR_EACH requirement:
    score = 0
    FOR_EACH criterion IN INVEST:
      score += evaluate(requirement, criterion)  # 0-5 scale
    IF score < 24 THEN flag_for_improvement  # 24/30 = 80% threshold
```

### CRITERION[id=INVEST_I]

```yaml
type: CRITERION
name: Independent
parent: INVEST_CRITERIA
definition: Requirements can be implemented in any order
measurement: >
  CAN_IMPLEMENT(req_A) WITHOUT first_implementing(req_B)
violation_indicator: >
  "Requirement B depends on Requirement A being implemented first"
correction_strategy: >
  DECOUPLE via abstraction_layer OR interface_contract
  DESIGN_BY_CONTRACT: define stable interface both depend on
validation: >
  ASSERT dependency_graph IS acyclic
  ASSERT can_implement_in_any_order
  ASSERT parallel_implementation_possible
```

### CRITERION[id=INVEST_N]

```yaml
type: CRITERION
name: Negotiable
parent: INVEST_CRITERIA
definition: Details can be refined during implementation
measurement: >
  requirement SPECIFIES what_and_why
  requirement DOES_NOT_SPECIFY exact_how (unless constrained)
violation_indicator: >
  Over-specification of implementation details without business justification
balance: >
  ENOUGH_DETAIL for estimation
  NOT_SO_MUCH_DETAIL that implementation_approach_constrained
correction_strategy: >
  SEPARATE business_requirement FROM technical_solution
  SPECIFY outcomes NOT mechanisms (unless mandated)
validation: >
  ASSERT has_clear_goal
  ASSERT has_acceptance_criteria
  ASSERT allows_implementation_flexibility (unless constrained by regulation/architecture)
```

### CRITERION[id=INVEST_V]

```yaml
type: CRITERION
name: Valuable
parent: INVEST_CRITERIA
definition: Delivers clear benefit to stakeholder
measurement: >
  STAKEHOLDER can articulate business_value
  VALUE is measurable OR observable
violation_indicator: >
  Technical jargon without business context
  Cannot answer "Why does customer care?"
correction_strategy: >
  REFRAME: from technical implementation to business outcome
  LINK: to business goal, user need, or regulatory requirement
example_transformation:
  technical: "Re-index table RG308X nightly"
  valuable: "Search results appear <2 seconds enabling faster checkout completion"
validation: >
  ASSERT has_clear_stakeholder_benefit
  ASSERT non_technical_stakeholder_can_understand_value
```

### CRITERION[id=INVEST_E]

```yaml
type: CRITERION
name: Estimable
parent: INVEST_CRITERIA
definition: Team can estimate implementation effort with reasonable accuracy
measurement: >
  TEAM_CONFIDENCE in estimation >= 70%
obstacles:
  - too_vague: lacks_detail_for_scope_assessment
  - unknown_technology: team_has_no_experience
  - missing_dependencies: external_system_behavior_unknown
  - too_large: epic_sized_needs_decomposition
correction_strategy: >
  IF too_vague THEN add_acceptance_criteria_with_specifics
  IF unknown_technology THEN create_spike_story_for_research
  IF missing_dependencies THEN define_interface_contracts
  IF too_large THEN decompose_into_smaller_requirements
validation: >
  ASSERT team_can_estimate_effort
  ASSERT uncertainty_quantified (best/likely/worst case)
```

### CRITERION[id=INVEST_S]

```yaml
type: CRITERION
name: Small
parent: INVEST_CRITERIA
definition: Completable within one iteration (typically 1-2 weeks)
measurement: >
  effort <= sprint_capacity / number_of_requirements_per_sprint
size_categories:
  - tiny: 1_2_story_points, hours_to_1_day
  - small: 3_5_story_points, 1_3_days
  - medium: 8_13_story_points, 4_7_days
  - too_large: 21_plus_story_points, over_1_week
handling_large_requirements: >
  IF requirement IS too_large
  THEN designate_as EPIC
  AND decompose INTO smaller_requirements
validation: >
  ASSERT fits_in_one_sprint
  ASSERT allows_frequent_integration
  ASSERT reduces_risk_via_incremental_delivery
```

### CRITERION[id=INVEST_T]

```yaml
type: CRITERION
name: Testable
parent: INVEST_CRITERIA
definition: Can write objective pass/fail test
measurement: >
  EXISTS test_method WHERE result IN [pass, fail]
  NOT: subjective_judgment
testability_formula: >
  testable = observable_behavior + measurable_criteria + test_method
violation_indicator:
  - "System is fast" (no metric)
  - "UI is user-friendly" (subjective)
  - "Secure storage" (no verification method)
correction_strategy: >
  ADD measurable_criteria with specific_threshold
  SPECIFY verification_method
  PROVIDE example_test_case
example_transformation:
  vague: "System is fast"
  testable: "Search results display in <200ms for 95% of queries under normal load, verified by automated performance test"
validation: >
  ASSERT has_measurable_criteria
  ASSERT has_defined_test_method
  ASSERT test_is_automatable OR has_clear_manual_procedure
```

---

### ENTITY[id=DOCUMENTATION_FORMAT]

```yaml
type: CONCEPT
name: Requirements Documentation Formats
purpose: Match format to project context
formats:
  - FORMAT[id=USER_STORY]
  - FORMAT[id=ACCEPTANCE_CRITERIA]
  - FORMAT[id=GHERKIN_BDD]
  - FORMAT[id=USE_CASE]
  - FORMAT[id=VOLERE_SNOW_CARD]
selection_criteria:
  - project_methodology: [agile, waterfall, hybrid]
  - formality_level: [low, medium, high]
  - automation_need: [yes, no]
  - complexity: [simple, medium, complex]
  - regulatory_requirement: [yes, no]
decision_logic: >
  IF agile AND simple THEN USER_STORY
  IF agile AND automation THEN GHERKIN_BDD
  IF complex_workflow THEN USE_CASE
  IF regulated_industry THEN VOLERE_SNOW_CARD
  IF qa_handoff THEN ACCEPTANCE_CRITERIA
```

### FORMAT[id=USER_STORY]

```yaml
type: ARTIFACT
name: User Story
parent: DOCUMENTATION_FORMAT
structure: >
  As a [ROLE],
  I want [FEATURE]
  So that [BENEFIT]

  Acceptance Criteria:
  - [testable_condition_1]
  - [testable_condition_2]
  - [testable_condition_3]
best_for:
  - agile_teams
  - product_development
  - customer_focused_features
advantages:
  - simple
  - conversational
  - focuses_on_value
disadvantages:
  - can_be_vague
  - lacks_technical_detail
  - difficult_for_complex_systems
when_to_use: >
  project_methodology == AGILE AND
  stakeholder_involvement == HIGH AND
  requirements_volatility == MEDIUM_TO_HIGH
```

### FORMAT[id=GHERKIN_BDD]

```yaml
type: ARTIFACT
name: Gherkin Behavior-Driven Development
parent: DOCUMENTATION_FORMAT
structure: >
  Scenario: [descriptive_name]

  GIVEN [initial_context]
  WHEN [event_occurs]
  THEN [expected_outcome]
  AND [additional_outcomes]
  BUT [constraints_or_exceptions]
best_for:
  - automated_testing
  - behavior_specifications
  - collaboration_with_qa
advantages:
  - executable_specifications
  - bridges_business_technical_gap
  - prevents_misunderstanding
disadvantages:
  - verbose
  - requires_tooling (cucumber, specflow)
  - learning_curve
when_to_use: >
  automated_testing_required == TRUE AND
  bdd_framework_available == TRUE
tools:
  - cucumber
  - specflow
  - behave
  - jbehave
```

### FORMAT[id=USE_CASE]

```yaml
type: ARTIFACT
name: Use Case
parent: DOCUMENTATION_FORMAT
structure: >
  USE_CASE: [name]
  ACTOR: [primary_user]
  PRECONDITIONS: [what_must_be_true_before]
  TRIGGER: [what_starts_this]

  MAIN_SUCCESS_SCENARIO:
    1. [step_1]
    2. [step_2]
    ...

  EXTENSIONS:
    2a. [alternative_at_step_2]
    3b. [error_at_step_3]
    *a. [can_happen_at_any_step]

  POSTCONDITIONS: [what_is_true_after]
best_for:
  - complex_workflows
  - formal_documentation
  - contractual_requirements
advantages:
  - comprehensive
  - handles_exceptions
  - good_for_training
disadvantages:
  - verbose
  - time_consuming
  - can_become_outdated_quickly
when_to_use: >
  complexity == HIGH AND
  formality_required == HIGH AND
  workflow_has_many_exception_paths == TRUE
```

### FORMAT[id=VOLERE_SNOW_CARD]

```yaml
type: ARTIFACT
name: Volere Snow Card
parent: DOCUMENTATION_FORMAT
structure:
  id: unique_identifier
  description: requirement_statement
  type: [functional, non_functional]
  rationale: why_needed
  fit_criterion: how_to_test
  priority: [must, should, could, wont]
  source: who_requested
  dependencies: related_requirements
  conflicts: contradictory_requirements
  verification_method: test_approach
  history: change_log
best_for:
  - regulated_industries
  - long_term_systems
  - contractual_projects
  - maintenance_heavy_systems
advantages:
  - comprehensive
  - traceable
  - excellent_for_maintenance
  - audit_ready
disadvantages:
  - heavy_overhead
  - requires_discipline
  - can_slow_agile_teams
when_to_use: >
  regulated_industry == TRUE OR
  system_lifetime > 10_years OR
  audit_requirement == TRUE
```

---

### ENTITY[id=RULE_OF_TEN]

```yaml
type: CONCEPT
name: Rule of Ten
description: Defect fix cost multiplies 10x each project phase
cost_multipliers:
  - phase: requirements
    discovered_in: requirements
    multiplier: 1x
    typical_cost: 100
  - phase: requirements
    discovered_in: design
    multiplier: 10x
    typical_cost: 1000
  - phase: requirements
    discovered_in: implementation
    multiplier: 100x
    typical_cost: 10000
  - phase: requirements
    discovered_in: testing
    multiplier: 1000x
    typical_cost: 100000
  - phase: requirements
    discovered_in: production
    multiplier: 10000x
    typical_cost: 1000000
principle: >
  Cost_to_fix(defect) = base_cost * 10^(phases_delayed)
key_insight: >
  "Fixing requirements defects causes HALF of total project cost"
implication: >
  INVEST 20-30% project time in requirements quality.
  This is NOT overhead. This is insurance.
prevention: >
  DETECT defects early via:
    - peer_review
    - prototype_validation
    - stakeholder_review
    - automated_quality_checks
```

---

## PHASE[id=STRUCTURE]

### ENTITY[id=STRUCTURE_PHASE]

```yaml
type: PHASE
name: Structure Phase
purpose: Organize requirements for maintainability and traceability
activities:
  - CLASSIFY by ENTITY[id=STABILITY]
  - ESTABLISH ENTITY[id=TRACEABILITY]
  - ASSIGN ENTITY[id=ATTRIBUTES]
  - IDENTIFY ENTITY[id=DEPENDENCIES]
outputs:
  - ARTIFACT[id=TRACEABILITY_MATRIX]
  - ARTIFACT[id=DEPENDENCY_GRAPH]
  - ARTIFACT[id=PRIORITIZED_BACKLOG]
```

---

### ENTITY[id=STABILITY]

```yaml
type: CONCEPT
name: Requirements Stability Classification
purpose: Identify change frequency to inform architecture
classification:
  - STABLE: rarely_or_never_changes
  - UNSTABLE: changes_frequently
decision_logic: >
  IF core_business_rule OR physical_law OR fundamental_process
  THEN STABLE
  ELIF UI_preference OR integration OR vendor_specific OR regulation
  THEN UNSTABLE
examples_by_domain:
  ecommerce:
    stable: [order_total_equals_sum_of_line_items, charge_before_shipping]
    unstable: [integrate_with_stripe, support_apple_pay, show_product_reviews]
  healthcare:
    stable: [doctor_prescribes_before_pharmacy_dispenses, log_medication_administration]
    unstable: [interface_with_epic_emr, generate_pdf_reports, support_biometric_login]
  banking:
    stable: [debit_decreases_balance, transaction_requires_authorization]
    unstable: [comply_with_psd2, integrate_with_plaid, support_cryptocurrency]
architecture_strategy:
  principle: "Separate axes of change" (Uncle Bob Martin)
  stable_depends_on_unstable: VIOLATION
  unstable_depends_on_stable: CORRECT
  patterns:
    - PATTERN[id=STRATEGY_PATTERN]
    - PATTERN[id=PLUGIN_ARCHITECTURE]
    - PATTERN[id=HEXAGONAL_ARCHITECTURE]
```

### PATTERN[id=STRATEGY_PATTERN]

```yaml
type: PATTERN
name: Strategy Pattern for Instability
parent: STABILITY
purpose: Encapsulate volatile algorithms behind stable interface
structure: >
  STABLE_INTERFACE:
    + operation()
  UNSTABLE_IMPLEMENTATIONS:
    - Implementation_A
    - Implementation_B
    - Implementation_C

  Client depends on STABLE_INTERFACE
  Implementations can change WITHOUT affecting client
example:
  interface: IPaymentProcessor
  methods: [processPayment, refundPayment]
  implementations: [StripeProcessor, PayPalProcessor, CryptoProcessor]
  benefit: Can add/remove payment providers without changing core system
```

### PATTERN[id=PLUGIN_ARCHITECTURE]

```yaml
type: PATTERN
name: Plugin Architecture for Instability
parent: STABILITY
purpose: Stable core with unstable plugins
structure: >
  STABLE_CORE:
    - domain_logic
    - business_rules
  UNSTABLE_PLUGINS:
    - plugin_A
    - plugin_B
    - plugin_C

  Plugins depend on core
  Core does NOT depend on plugins
benefit: >
  Plugins can be added, removed, updated independently
  Core remains stable across plugin changes
```

### PATTERN[id=HEXAGONAL_ARCHITECTURE]

```yaml
type: PATTERN
name: Hexagonal Architecture (Ports & Adapters)
parent: STABILITY
purpose: Isolate stable domain from unstable infrastructure
structure: >
  CENTER (STABLE):
    - domain_model
    - business_logic
  PORTS (INTERFACES):
    - input_ports
    - output_ports
  ADAPTERS (UNSTABLE):
    - database_adapter (MySQL, PostgreSQL, MongoDB)
    - api_adapter (REST, GraphQL, gRPC)
    - message_adapter (RabbitMQ, Kafka, SQS)
principle: >
  Domain depends on PORTS (interfaces)
  Adapters depend on PORTS
  Adapters can swap WITHOUT domain changes
benefit: >
  Infrastructure changes isolated from business logic
  Easy to test (mock adapters)
  Technology decisions deferred
```

---

### ENTITY[id=TRACEABILITY]

```yaml
type: CONCEPT
name: Requirements Traceability
purpose: Track requirements through entire lifecycle
types:
  - TRACE[id=PRE_RS_TRACE]
  - TRACE[id=POST_RS_TRACE]
  - TRACE[id=INTER_REQ_TRACE]
benefits:
  - coverage_analysis
  - impact_analysis
  - compliance_validation
  - change_management
implementation_methods:
  - text_references
  - trace_matrix (spreadsheet)
  - trace_graph (visualization)
  - requirements_management_tool (DOORS, Jama, Azure_DevOps)
```

### TRACE[id=PRE_RS_TRACE]

```yaml
type: CONCEPT
name: Pre-RS Traceability (Backward)
parent: TRACEABILITY
direction: requirements ← sources
purpose: >
  Link each requirement back to its originating source
traced_to:
  - stakeholder
  - regulation
  - standard
  - existing_system
  - document
benefits:
  - validate_necessity ("Who asked for this?")
  - source_change_impact ("Regulation updated → which requirements affected?")
  - audit_compliance ("Show traceability to regulation")
structure: >
  REQUIREMENT[id=REQ_042]:
    description: "Delete user data within 30 days of request"
    sources:
      - GDPR_Article_17 (Right to Erasure)
      - stakeholder: Chief_Legal_Officer
      - date: 2024-01-15
      - rationale: "Legal compliance, avoid €20M fine"
```

### TRACE[id=POST_RS_TRACE]

```yaml
type: CONCEPT
name: Post-RS Traceability (Forward)
parent: TRACEABILITY
direction: requirements → design → code → tests
purpose: >
  Link each requirement to its implementation
traced_to:
  - design_element
  - source_code_file
  - function_or_class
  - test_case
benefits:
  - coverage_analysis ("Is every requirement implemented?")
  - implementation_impact ("Requirement changes → what code affected?")
  - test_coverage ("Is every requirement tested?")
structure: >
  REQUIREMENT[id=REQ_042]:
    description: "Delete user data within 30 days"
    design: DataDeletionService_class
    code: src/services/DataDeletionService.java:deleteUserData()
    tests: DataDeletionServiceTest.java:testDeleteWithin30Days()
    verification: passed_automated_test + manual_audit
```

### TRACE[id=INTER_REQ_TRACE]

```yaml
type: CONCEPT
name: Inter-Requirement Traceability
parent: TRACEABILITY
direction: requirement ↔ requirement
purpose: >
  Document relationships between requirements
relationship_types:
  - CONFLICT: contradictory_requirements
  - REFINEMENT: one_elaborates_another
  - PREREQUISITE: ordering_dependency
  - ALTERNATIVE: mutually_exclusive_options
benefits:
  - conflict_detection
  - impact_propagation_analysis
  - dependency_management
structure: >
  REQUIREMENT[id=REQ_010]: "User can log in"
    REQUIRES: REQ_011 "User has account"

  REQUIREMENT[id=REQ_011]: "User has account"
    REQUIRES: REQ_012 "User can register"

  REQUIREMENT[id=REQ_012]: "User can register"
    CONFLICTS_WITH: REQ_013 "Only admin can create accounts"
visualization: dependency_graph (nodes=requirements, edges=relationships)
```

---

### ENTITY[id=ATTRIBUTES]

```yaml
type: CONCEPT
name: Requirements Attributes
purpose: Metadata for requirement management
minimum_attributes:
  - id: unique_identifier
  - description: requirement_statement
  - type: [functional, non_functional]
  - priority: importance_level
  - source: origin
  - fit_criterion: verification_method
volere_comprehensive_attributes:
  - id
  - description
  - type
  - rationale
  - source
  - fit_criterion
  - priority
  - dependencies
  - conflicts
  - verification_method
  - history
  - related_use_cases
usage: >
  EVERY requirement MUST have minimum_attributes
  CRITICAL requirements SHOULD have comprehensive_attributes
```

---

### ENTITY[id=PRIORITIZATION_FRAMEWORK]

```yaml
type: METHOD
name: Requirements Prioritization
purpose: Determine implementation order
methods:
  - METHOD[id=MOSCOW_METHOD]
  - METHOD[id=RISK_VALUE_MATRIX]
  - METHOD[id=KANO_PRIORITIZATION]
selection: >
  USE moscow FOR simple_projects
  USE risk_value_matrix FOR complex_tradeoffs
  USE kano_prioritization FOR customer_satisfaction_focus
```

### METHOD[id=MOSCOW_METHOD]

```yaml
type: METHOD
name: MoSCoW Prioritization
parent: PRIORITIZATION_FRAMEWORK
categories:
  - M: MUST_have (non-negotiable, system_fails_without)
  - S: SHOULD_have (important_but_not_vital)
  - C: COULD_have (nice_to_have_if_time_budget_allows)
  - W: WONT_have (explicitly_out_of_scope_this_release)
decision_logic: >
  IF legal_requirement OR system_fails_without
  THEN MUST
  ELIF high_business_value AND achievable
  THEN SHOULD
  ELIF nice_to_have AND low_cost
  THEN COULD
  ELSE WONT
```

### METHOD[id=RISK_VALUE_MATRIX]

```yaml
type: METHOD
name: Risk-Value Prioritization Matrix
parent: PRIORITIZATION_FRAMEWORK
dimensions:
  - value: [low, high]
  - risk: [low, high]
quadrants:
  - high_value_low_risk: priority_1 (quick_wins, do_first)
  - high_value_high_risk: priority_2 (manage_carefully, highest_importance_but_needs_mitigation)
  - low_value_low_risk: priority_3 (do_if_time)
  - low_value_high_risk: priority_4 (skip)
decision_logic: >
  priority = RANK_BY(value DESC, risk ASC)
```

### METHOD[id=KANO_PRIORITIZATION]

```yaml
type: METHOD
name: Kano-Based Prioritization
parent: PRIORITIZATION_FRAMEWORK
priority_order:
  1: LEGAL (must deliver, non-negotiable)
  2: BASIC (must deliver, customer_expects)
  3: PERFORMANCE (high_impact_metrics first)
  4: EXCITEMENT (1-2 delighters if budget_allows)
  5: SUPERFLUOUS (eliminate)
alignment: >
  Prioritization aligns with ENTITY[id=KANO_MODEL] requirement_types
```

---

## PHASE[id=MAINTAIN]

### ENTITY[id=MAINTENANCE_PHASE]

```yaml
type: PHASE
name: Maintenance Phase
purpose: Keep requirements accurate and current over time
activities:
  - CONDUCT reviews
  - RESOLVE conflicts
  - MANAGE changes
  - UPDATE traceability
outputs:
  - ARTIFACT[id=REVIEW_FINDINGS]
  - ARTIFACT[id=CHANGE_LOG]
  - ARTIFACT[id=UPDATED_REQUIREMENTS]
```

---

### ENTITY[id=REVIEW_PSYCHOLOGY]

```yaml
type: CONCEPT
name: Requirements Review Psychology
purpose: Conduct reviews as service, not policing
principles:
  - service_mindset: helping_achieve_shared_goal
  - collaborative_language: partner_not_police
  - focus_on_artifact: not_person
  - reference_standards: not_personal_opinion
language_reframing:
  confrontational: "You wrote this wrong"
  collaborative: "I interpreted this as X. Is that what you meant?"

  confrontational: "This requirement is unclear"
  collaborative: "Could we add an example to clarify?"

  confrontational: "Fix these 10 errors"
  collaborative: "I found opportunities to strengthen this"
role_naming:
  avoid: "reviewee"
  use: "review partner"
review_checklist:
  - INVEST_criteria
  - language_quality_rules
  - completeness (rationale, fit_criterion, dependencies)
  - traceability
```

---

### ENTITY[id=CONFLICT_RESOLUTION_FRAMEWORK]

```yaml
type: METHOD
name: Conflict Resolution Framework
purpose: Systematic approach to resolving requirement disagreements
strategies:
  - STRATEGY[id=RESOLUTION_VOTING]
  - STRATEGY[id=RESOLUTION_ESCALATION]
  - STRATEGY[id=RESOLUTION_VARIANTS]
  - STRATEGY[id=RESOLUTION_VERSIONING]
decision_tree: >
  IF stakeholders_are_equals
  THEN RESOLUTION_VOTING
  ELIF clear_authority_exists
  THEN RESOLUTION_ESCALATION
  ELIF can_support_both
  THEN RESOLUTION_VARIANTS
  ELIF can_deliver_over_time
  THEN RESOLUTION_VERSIONING
  ELSE RESOLUTION_ESCALATION (forced_decision)
```

### STRATEGY[id=RESOLUTION_VOTING]

```yaml
type: METHOD
name: Voting Resolution
parent: CONFLICT_RESOLUTION_FRAMEWORK
when_to_use: >
  multiple_stakeholders WITH equal_power AND
  no_clear_right_answer AND
  need_group_buy_in
methods:
  - simple_majority: over_50_percent_wins
  - weighted_voting: stakeholder_power × vote
  - dot_voting: each_person_distributes_N_dots_across_options
process:
  1: present_all_options_clearly
  2: conduct_vote
  3: document_result_and_rationale
  4: communicate_decision
pros: [fair, inclusive, builds_consensus]
cons: [may_not_reflect_true_priorities, can_be_political]
```

### STRATEGY[id=RESOLUTION_ESCALATION]

```yaml
type: METHOD
name: Escalation Resolution
parent: CONFLICT_RESOLUTION_FRAMEWORK
when_to_use: >
  deadlock BETWEEN stakeholders OR
  strategic_decision_needed OR
  conflicting_requirements WITH no_compromise
process:
  1: document_both_positions_clearly
  2: present_pros_cons_of_each
  3: escalate_to_decision_authority (product_owner, executive, steering_committee)
  4: document_decision_and_rationale
  5: communicate_back_to_stakeholders
authority_hierarchy: [team, product_owner, executive, steering_committee]
pros: [clear_decision, moves_forward]
cons: [may_bypass_important_perspectives, can_feel_authoritarian]
```

### STRATEGY[id=RESOLUTION_VARIANTS]

```yaml
type: METHOD
name: Variants Resolution
parent: CONFLICT_RESOLUTION_FRAMEWORK
when_to_use: >
  multiple_valid_approaches_exist AND
  different_segments_have_different_needs AND
  cost_of_multiple_options IS acceptable
approaches:
  - product_variants: different_SKUs_or_editions (basic, pro, enterprise)
  - configuration_flags: feature_toggles
  - personalization: user_preferences
  - localization: regional_differences
pros: [satisfies_everyone, increases_flexibility]
cons: [complexity, higher_cost, more_testing]
```

### STRATEGY[id=RESOLUTION_VERSIONING]

```yaml
type: METHOD
name: Version Management Resolution
parent: CONFLICT_RESOLUTION_FRAMEWORK
when_to_use: >
  requirements_valid BUT cant_all_deliver_now OR
  time_based_resolution OR
  mvp_to_enhancement_progression
approaches:
  - releases: v1.0 (core), v2.0 (enhancements), v3.0 (advanced)
  - sprints: sprint_1 (must), sprint_2 (should), sprint_3 (could)
  - roadmap: Q1 (launch), Q2 (optimize), Q3 (innovate)
pros: [everyone_gets_features_eventually, manages_scope]
cons: [requires_discipline, early_stakeholders_may_feel_deprioritized]
```

---

### ENTITY[id=PROMPT_ENGINEERING]

```yaml
type: METHOD
name: Prompt Engineering for Requirements
purpose: Leverage AI for requirements generation, analysis, validation
techniques:
  - TECHNIQUE[id=N_SHOT_LEARNING]
  - TECHNIQUE[id=STRUCTURED_IO]
  - TECHNIQUE[id=PROMPT_COHESION]
  - TECHNIQUE[id=SELF_CRITIQUE]
  - TECHNIQUE[id=SYSTEM_PROMPT_OVERRIDE]
modern_context: >
  AI assists with:
    - requirements_generation
    - quality_analysis
    - test_case_generation
    - traceability_analysis
    - improvement_suggestions
```

### TECHNIQUE[id=N_SHOT_LEARNING]

```yaml
type: METHOD
name: N-Shot Learning (Few-Shot Prompts)
parent: PROMPT_ENGINEERING
principle: Provide examples of desired output pattern
comparison:
  zero_shot_quality: 20_percent
  few_shot_quality: 100_percent (5x improvement)
pattern: >
  PROVIDE 2-5 examples of well_formed_requirements
  SHOW desired style, format, level_of_detail
  THEN ask AI to generate similar
template: >
  "Here are examples of well-written requirements:

   1. [example_1_with_all_desired_attributes]
   2. [example_2_with_all_desired_attributes]
   3. [example_3_with_all_desired_attributes]

   Each has: [attribute_1], [attribute_2], [attribute_3]

   Now generate [N] requirements for [feature] in the same style."
```

### TECHNIQUE[id=STRUCTURED_IO]

```yaml
type: METHOD
name: Structured Input/Output
parent: PROMPT_ENGINEERING
principle: Specify exact structure for AI output
problem: vague_prompts_produce_vague_results
solution: explicit_structure_specification
template: >
  "Generate [N] requirements for [feature].

   CONTEXT:
   - [context_item_1]
   - [context_item_2]

   OUTPUT FORMAT:
   For each requirement:
   - ID: REQ-XXX
   - Description: [active_voice, specific, measurable]
   - Type: [Functional/Non-Functional]
   - Priority: [Must/Should/Could]
   - Fit Criterion: [how_to_test]

   Generate [N] requirements covering: [scope]"
benefit: structured_actionable_output INSTEAD_OF generic_prose
```

### TECHNIQUE[id=PROMPT_COHESION]

```yaml
type: METHOD
name: Prompt Cohesion (Single Responsibility)
parent: PROMPT_ENGINEERING
principle: One prompt, one task. Chain for complexity.
anti_pattern: >
  "Analyze requirements, suggest improvements, generate tests,
   create traceability matrix, and prioritize them"
correct_pattern: >
  STEP_1: "Analyze these requirements for quality issues: [list_issues]"
  [AI provides analysis]

  STEP_2: "For the top 3 issues, suggest specific rewrites: [criteria]"
  [AI provides rewrites]

  STEP_3: "For improved requirements, generate test scenarios..."
  [AI provides tests]
benefit: higher_quality_per_step, easier_validation, clearer_reasoning
```

### TECHNIQUE[id=SELF_CRITIQUE]

```yaml
type: METHOD
name: Self-Critique and Self-Evaluation
parent: PROMPT_ENGINEERING
principle: Have AI review its own output before returning
template: >
  "Generate [N] requirements for [feature].

   After generating, self-review each against INVEST criteria:
   - Independent: Rate 1-5, explain
   - Negotiable: Rate 1-5, explain
   - Valuable: Rate 1-5, explain
   - Estimable: Rate 1-5, explain
   - Small: Rate 1-5, explain
   - Testable: Rate 1-5, explain

   Any requirement scoring <4: revise and regenerate.

   Return only final revised requirements with scores."
benefit: built_in_quality_control, fewer_iterations
```

### TECHNIQUE[id=SYSTEM_PROMPT_OVERRIDE]

```yaml
type: METHOD
name: System Prompt Override
parent: PROMPT_ENGINEERING
problem: >
  LLMs have hidden system_prompts that influence behavior
  (e.g., "Be concise, polite, refuse harmful requests")
  This can make output too generic or overly cautious
solution: Override with domain-specific system prompt
template: >
  "You are an expert requirements engineer with 20 years experience
   in [domain] systems.

   Your role: Write precise, unambiguous, testable requirements
   following [standard] standards.

   Be specific about implementation details.
   Use active voice, concrete verbs, measurable criteria.

   Do NOT: Use vague language, passive voice, universal quantifiers,
   or undefined conditions. Do NOT hedge with 'consider' or 'perhaps'.

   [Your actual prompt follows...]"
benefit: more_authoritative_specific_useful_output
```

---

## CROSS_CUTTING_CONCERNS

### ENTITY[id=NASA_METHODOLOGY]

```yaml
type: METHOD
name: NASA Systems Engineering Approach
source: NASA/SP-2016-6105 Systems Engineering Handbook
key_principles:
  - requirements_flowdown: stakeholder → system → subsystem → component
  - shall_statements: mandatory_requirements use "shall" NOT "should" or "may"
  - verification_methods: Test, Analysis, Inspection, Demonstration (TAID)
  - requirements_baseline: formal_approval before design_starts
traceability_standard:
  - every_requirement traces_to stakeholder_need
  - every_requirement has verification_method
  - changes require formal_review_board
reference: "https://www.nasa.gov/seh/"
```

### ENTITY[id=ISO_25010]

```yaml
type: STANDARD
name: ISO 25010 Software Quality Model
replaces: ISO_9126
purpose: Classification system for non-functional requirements
quality_characteristics:
  - functional_suitability: [completeness, correctness, appropriateness]
  - performance_efficiency: [time_behavior, resource_utilization, capacity]
  - compatibility: [co_existence, interoperability]
  - usability: [learnability, operability, accessibility, user_error_protection]
  - reliability: [maturity, availability, fault_tolerance, recoverability]
  - security: [confidentiality, integrity, non_repudiation, accountability, authenticity]
  - maintainability: [modularity, reusability, analyzability, modifiability, testability]
  - portability: [adaptability, installability, replaceability]
usage: >
  Categorize non_functional_requirements by quality_characteristic
  Ensures comprehensive coverage of quality attributes
```

---

## SEMANTIC_GRAPH

### RELATIONSHIPS_SUMMARY

```yaml
# Core process flow
DISCOVER PRECEDES DEFINE
DEFINE PRECEDES STRUCTURE
STRUCTURE PRECEDES MAINTAIN
MAINTAIN LOOPS_TO DISCOVER

# Source to requirement type
SOURCE_TEXTS PRODUCES REQ_TYPE_LEGAL
SOURCE_SYSTEMS PRODUCES REQ_TYPE_BASIC
SOURCE_PEOPLE PRODUCES REQ_TYPE_PERFORMANCE, REQ_TYPE_EXCITEMENT

# Method to requirement type
METHOD_WATCH ADDRESSES REQ_TYPE_BASIC
METHOD_READ ADDRESSES REQ_TYPE_LEGAL
METHOD_THINK ADDRESSES REQ_TYPE_EXCITEMENT
METHOD_TALK ADDRESSES REQ_TYPE_PERFORMANCE
METHOD_CHALLENGE ADDRESSES REQ_TYPE_SUPERFLUOUS

# Quality criteria
INVEST_CRITERIA VALIDATES all_requirements
LANGUAGE_QUALITY_RULES VALIDATES requirement_text
VOLERE_ATTRIBUTES ENRICHES requirements

# Traceability
PRE_RS_TRACE LINKS requirements TO sources
POST_RS_TRACE LINKS requirements TO implementation
INTER_REQ_TRACE LINKS requirements TO requirements

# Stability and architecture
UNSTABLE_REQUIREMENTS REQUIRE STRATEGY_PATTERN OR PLUGIN_ARCHITECTURE OR HEXAGONAL_ARCHITECTURE
STABLE_REQUIREMENTS FORM domain_core

# Conflict resolution
CONFLICT TRIGGERS CONFLICT_RESOLUTION_FRAMEWORK
CONFLICT_RESOLUTION_FRAMEWORK USES [VOTING, ESCALATION, VARIANTS, VERSIONING]

# Documentation
DOCUMENTATION_FORMAT SELECTED_BY [project_methodology, formality, complexity]
USER_STORY BEST_FOR agile_projects
GHERKIN_BDD BEST_FOR automated_testing
USE_CASE BEST_FOR complex_workflows
VOLERE_SNOW_CARD BEST_FOR regulated_industries

# AI integration
PROMPT_ENGINEERING ASSISTS_WITH [generation, analysis, validation]
N_SHOT_LEARNING IMPROVES prompt_quality
STRUCTURED_IO ENSURES actionable_output
```

---

## QUERY_PATTERNS

### PATTERN[id=FIND_METHOD_FOR_REQUIREMENT_TYPE]

```yaml
query: "What elicitation method for [requirement_type]?"
logic: >
  MATCH (requirement_type)-[ADDRESSES_BY]-(method)
  RETURN method
example:
  input: "What method for basic requirements?"
  output: METHOD_WATCH (observation, prototyping)
```

### PATTERN[id=FIND_PROBLEM_SOLUTION]

```yaml
query: "How to solve [problem]?"
logic: >
  MATCH (problem)-[SOLVED_BY]-(solution)
  RETURN solution
example:
  input: "How to solve hidden requirements?"
  output: METHOD_WATCH, KANO_MODEL classification
```

### PATTERN[id=VALIDATE_REQUIREMENT]

```yaml
query: "Is this requirement well-formed?"
logic: >
  CHECK requirement AGAINST:
    - INVEST_CRITERIA
    - LANGUAGE_QUALITY_RULES
    - HAS required_attributes
  RETURN [pass/fail, issues, suggestions]
```

### PATTERN[id=SELECT_DOCUMENTATION_FORMAT]

```yaml
query: "What format for [project_context]?"
logic: >
  EVALUATE:
    - project_methodology
    - formality_requirement
    - complexity
    - automation_need
  MATCH context TO format_selection_criteria
  RETURN recommended_format
example:
  input: "Agile project, automated testing needed"
  output: GHERKIN_BDD
```

### PATTERN[id=RESOLVE_CONFLICT]

```yaml
query: "How to resolve conflict between stakeholders?"
logic: >
  EVALUATE:
    - stakeholder_power_equality
    - authority_availability
    - support_multiple_options_feasibility
    - time_phasing_possibility
  FOLLOW CONFLICT_RESOLUTION_FRAMEWORK decision_tree
  RETURN recommended_strategy
```

---

## MACHINE_LEARNING_FEATURES

### ENTITY[id=REQUIREMENT_QUALITY_CLASSIFIER]

```yaml
type: ML_MODEL
purpose: Classify requirement quality automatically
input_features:
  - has_nominalization: boolean
  - uses_active_voice: boolean
  - has_universal_quantifiers: boolean
  - conditions_complete: boolean
  - nouns_specified: boolean
  - invest_i_score: float[0,1]
  - invest_n_score: float[0,1]
  - invest_v_score: float[0,1]
  - invest_e_score: float[0,1]
  - invest_s_score: float[0,1]
  - invest_t_score: float[0,1]
output: quality_score: float[0,1]
training_data: >
  LABELED examples of good/bad requirements from this knowledge base
```

### ENTITY[id=REQUIREMENT_TYPE_CLASSIFIER]

```yaml
type: ML_MODEL
purpose: Automatically classify requirements by Kano type
input_features:
  - contains_quantifiable_metric: boolean
  - mandated_by_regulation: boolean
  - customer_expectation: [implicit, explicit, innovative]
  - requirement_text_embedding: vector
output: requirement_type: [BASIC, LEGAL, PERFORMANCE, EXCITEMENT, SUPERFLUOUS]
training_data: >
  LABELED examples from this knowledge base
```

### ENTITY[id=TRACEABILITY_LINK_PREDICTOR]

```yaml
type: ML_MODEL
purpose: Suggest traceability links automatically
input_features:
  - requirement_text_embedding: vector
  - source_document_embedding: vector
  - design_element_embedding: vector
  - cosine_similarity: float
output: link_probability: float[0,1]
application: >
  FOR_EACH requirement:
    FOR_EACH potential_source:
      IF link_probability > threshold
      THEN suggest_traceability_link
```

---

## VERSION_CONTROL

```yaml
ontology_version: 1.0
last_updated: 2024
schema_changes:
  - initial_release: complete_RE_knowledge_base
future_extensions:
  - add_case_studies_with_outcomes
  - add_antipatterns
  - expand_domain_specific_variations
  - add_metrics_and_measurements
```

---

## END_OF_KNOWLEDGE_BASE

@VALIDATION_RULES

- All ENTITY references must resolve
- All relationships must have both ends defined
- All examples must be concrete and verifiable
- All decision logic must be deterministic
- All patterns must be reusable

@USAGE_INSTRUCTIONS_FOR_AI
This knowledge base is structured for:

1. RETRIEVAL: Search by entity ID or relationship
2. REASONING: Follow relationships to infer connections
3. GENERATION: Use patterns and examples to create new requirements
4. VALIDATION: Apply criteria to check requirement quality
5. CLASSIFICATION: Determine requirement types and appropriate methods

@PARSING_HINTS

- ENTITY[id=X]: Primary concept or artifact
- RELATIONSHIP: X → Y, X ← Y, X ↔ Y
- LOGIC: IF-THEN-ELSE with explicit conditions
- EXAMPLES: Concrete instances for training
- VALIDATION: Rules for automated checking
