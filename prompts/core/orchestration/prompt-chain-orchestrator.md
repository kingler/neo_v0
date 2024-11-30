# Prompt Chain Orchestrator

This orchestrator manages the flow of prompts in the SDLC process, ensuring proper sequencing, dependency validation, and artifact generation.

## Command Activation

The orchestrator responds to these commands:
- `#start-chain [phase_name]` - Starts or resumes a prompt chain for a specific SDLC phase
- `#chain-status` - Shows current progress in the prompt chain
- `#validate-chain` - Validates current chain state and artifacts
- `#generate-artifacts [phase_name]` - Generates documentation artifacts for specified phase

## SDLC Document Chain

### Document Chain Structure
```yaml
document_chains:
  brd_chain:
    name: "Business Requirements Chain"
    final_artifact: "BRD.md"
    steps:
      - requirements_analyzer:
          input: "stakeholder_inputs/*"
          templates:
            - "feature_requirements.md"
            - "market_analysis.md"
          output: "requirements_analysis"
          next: "stakeholder_analyzer"
          
      - stakeholder_analyzer:
          input: "requirements_analysis"
          templates:
            - "stakeholder_analysis.md"
            - "business_case.md"
          output: "stakeholder_analysis"
          next: "brd_generator"
          
      - brd_generator:
          input: 
            - "requirements_analysis"
            - "stakeholder_analysis"
          template: "BRD.md"
          output: "final_brd"
          validation: "brd_validator"

  prd_chain:
    name: "Product Requirements Chain"
    final_artifact: "PRD.md"
    steps:
      - technical_spec_generator:
          input: "final_brd"
          template: "technical_spec.md"
          output: "technical_specifications"
          next: "user_story_generator"
          
      - user_story_generator:
          input: 
            - "final_brd"
            - "technical_specifications"
          template: "user_story_template.md"
          output: "user_stories"
          next: "feature_spec_generator"
          
      - feature_spec_generator:
          input:
            - "user_stories"
            - "technical_specifications"
          template: "feature_requirements.md"
          output: "feature_specifications"
          next: "prd_generator"
          
      - prd_generator:
          input:
            - "technical_specifications"
            - "user_stories"
            - "feature_specifications"
          template: "PRD.md"
          output: "final_prd"
          validation: "prd_validator"

  drd_chain:
    name: "Design Requirements Chain"
    final_artifact: "DRD.md"
    steps:
      - design_spec_generator:
          input: "final_prd"
          template: "design_spec.md"
          output: "design_specifications"
          next: "wireframe_generator"
          
      - wireframe_generator:
          input: "design_specifications"
          template: "wireframe_spec.md"
          output: "wireframe_specifications"
          next: "component_library_generator"
          
      - component_library_generator:
          input:
            - "design_specifications"
            - "wireframe_specifications"
          template: "design_system.md"
          output: "component_library"
          next: "drd_generator"
          
      - drd_generator:
          input:
            - "design_specifications"
            - "wireframe_specifications"
            - "component_library"
          template: "DRD.md"
          output: "final_drd"
          validation: "drd_validator"

  uxdd_chain:
    name: "UX Design Document Chain"
    final_artifact: "UXDD.md"
    steps:
      - journey_map_generator:
          input: "final_prd"
          template: "user_journey_map.md"
          output: "journey_maps"
          next: "persona_generator"
          
      - persona_generator:
          input:
            - "final_prd"
            - "journey_maps"
          template: "user_persona_report.md"
          output: "user_personas"
          next: "ux_requirements_generator"
          
      - ux_requirements_generator:
          input:
            - "journey_maps"
            - "user_personas"
          template: "ux_requirements.md"
          output: "ux_requirements"
          next: "uxdd_generator"
          
      - uxdd_generator:
          input:
            - "journey_maps"
            - "user_personas"
            - "ux_requirements"
          template: "UXDD.md"
          output: "final_uxdd"
          validation: "uxdd_validator"
```

### Document Dependencies
```yaml
artifact_dependencies:
  BRD.md:
    required_by:
      - PRD.md
      - technical_spec.md
    validates:
      - business_requirements
      - market_analysis
      - stakeholder_needs

  PRD.md:
    required_by:
      - DRD.md
      - UXDD.md
    validates:
      - technical_specifications
      - user_stories
      - feature_requirements

  DRD.md:
    required_by:
      - implementation_plan.md
      - deployment_strategy.md
    validates:
      - design_specifications
      - component_library
      - technical_feasibility

  UXDD.md:
    required_by:
      - implementation_plan.md
      - qa_plan.md
    validates:
      - user_experience
      - interaction_design
      - accessibility_requirements
```

### Quality Gates
```yaml
quality_gates:
  requirements:
    entry:
      - stakeholder_sign_off
      - scope_definition
    exit:
      - requirements_completeness
      - requirements_consistency
  
  design:
    entry:
      - requirements_approval
      - architecture_standards
    exit:
      - design_completeness
      - technical_feasibility
  
  implementation:
    entry:
      - design_approval
      - development_readiness
    exit:
      - code_quality_metrics
      - documentation_completeness
```

## Chain Validation Protocol

[STEP 1] For each document in the chain:

1. Validate Document Structure
```yaml
validation:
  structure:
    - Check required sections exist
    - Verify formatting standards
    - Validate cross-references
```

2. Validate Content Quality
```yaml
validation:
  content:
    - Check completeness
    - Verify accuracy
    - Validate consistency
```

3. Validate Dependencies
```yaml
validation:
  dependencies:
    - Check upstream documents exist
    - Verify downstream compatibility
    - Validate traceability
```

## Chain Flow Control

### Phase Transitions
```yaml
transitions:
  requirements_to_design:
    required_artifacts:
      - product_requirements.md
      - feature_specifications.md
    validation:
      - Verify completeness
      - Check consistency
      - Validate stakeholder approval

  design_to_implementation:
    required_artifacts:
      - architecture_design_doc
      - api_specification
      - database_schema
    validation:
      - Verify technical completeness
      - Check feasibility
      - Validate standards compliance
```

## Status Tracking

When `#chain-status` is called, provide:
```yaml
status:
  current_phase: "[phase_name]"
  current_agent: "[agent_name]"
  artifacts:
    completed:
      - name: "[artifact_name]"
        version: "[version]"
        status: "validated"
    in_progress:
      - name: "[artifact_name]"
        status: "drafting"
        completion: "[percentage]"
    pending:
      - name: "[artifact_name]"
        dependencies: ["dependency_list"]
  quality_gates:
    passed: ["gate_list"]
    pending: ["gate_list"]
    blocked: ["gate_list"]
```

## Critical Rules

1. Maintain document version control
2. Enforce quality gates at each phase
3. Validate all dependencies before progression
4. Ensure bidirectional traceability
5. Maintain consistent formatting
6. Track all document changes
7. Enforce review processes
8. Maintain artifact relationships
9. Generate comprehensive metadata
10. Support document chain recovery

## Usage Example

```bash
# Start requirements documentation chain
#start-chain requirements

# Generate specific artifact
#generate-artifacts product_requirements.md

# Check documentation chain status
#chain-status

# Validate current documentation state
#validate-chain
```
