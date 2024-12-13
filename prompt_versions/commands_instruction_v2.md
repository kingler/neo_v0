# Neo_V0 Command Instructions Guide

## Table of Contents

    1. [Project Initialization](/project-initialization)
    2. [Requirements Phase](/requirements-phase)
    3. [Design Phase](/design-phase)
    4. [Development Phase](/development-phase)
    5. [Testing Phase](/testing-phase)
    6. [Deployment Phase](/deployment-phase)
    7. [Maintenance Phase](/maintenance-phase)

## Project Initialization

    Setting Up a New Project - Initialize a new project
    command:
    ```self-prompt
         /init-project
    ```
    For existing projects:
        What Neo Will Do:
        1. Create project documentation structure
        2. Initialize version control
        3. Generate initial knowledge graph
        4. Setup context management
        5. Configure development environment

## Initial Context Setup

    Initialize context management
    ```self-prompt
    /init-context
    
    # Generate initial knowledge graph
    /generate-knowledge-graph
    ```

## Detailed Prompt Chain Workflows

### Requirements Chain

```self-prompt

/requirements-init
  └─ Load requirements context
     ├─ Template: prompts/chains/components/requirements/requirements_context.md
     └─ Output: .context/requirements_context.json
  
  └─ Generate knowledge graph
     ├─ Input: Project codebase
     ├─ Template: prompts/chains/components/requirements/knowledge_graph_template.md
     └─ Output: code-knowledge-graph.json
  
  └─ Update specifications
     ├─ Input: Requirements context + Knowledge graph
     ├─ Template: prompts/chains/components/requirements/spec_update_template.md
     └─ Output: Updated specifications in docs/specifications/
  
  └─ Generate documentation
     ├─ Template: prompts/chains/components/documentation/docs_template.md
     └─ Output: docs/requirements/
```

Related Workflows

- Business Requirements Chain (`#brd-init`)
- Product Requirements Chain (`#prd-init`)
- Feature Analysis Chain (`#feature-analysis`)

### Architecture Chain

```self-prompt

    #arch-init
      └─ Generate knowledge graph
         ├─ Input: Project codebase
         ├─ Template: prompts/chains/components/architecture/arch_graph_template.md
         └─ Output: architecture-knowledge-graph.json
      
      └─ Load architecture context
         ├─ Template: prompts/chains/components/architecture/arch_context.md
         └─ Output: .context/architecture_context.json
      
      └─ Update system design
         ├─ Input: Architecture context + Knowledge graph
         ├─ Template: prompts/chains/components/architecture/system_design_template.md
         └─ Output: docs/architecture/system_design.md
      
      └─ Generate diagrams
         ├─ Template: prompts/chains/components/architecture/diagram_template.md
         └─ Output: docs/architecture/diagrams/
```

Related Workflows

- System Design Chain (`#system-design`)
- Database Design Chain (`#db-design`)
- API Design Chain (`#api-design`)

Development Chain

    ```self-prompt
    
    #dev-init
      └─ Generate knowledge graph
         ├─ Input: Project codebase
         ├─ Template: prompts/chains/components/development/dev_graph_template.md
         └─ Output: development-knowledge-graph.json
      
      └─ Load development context
         ├─ Template: prompts/chains/components/development/dev_context.md
         ├─ Input: Previous context + Knowledge graph
         └- Output: .context/development_context.json
      
      └─ Update codebase
         ├─ Template: prompts/chains/components/development/code_update_template.md
         ├─ Input: Development context
         └─ Output: Updated source code
      
      └─ Generate documentation
         ├─ Template: prompts/chains/components/documentation/code_docs_template.md
         └─ Output: docs/development/
    ```

Related Workflows

- Code Generation Chain (`#code-gen`)
- Code Review Chain (`#code-review`)
- Code Optimization Chain (`#code-optimize`)

### Testing Chain

```self-prompt
#test-init
  └─ Generate knowledge graph
     ├─ Input: Project codebase
     ├─ Template: prompts/chains/components/testing/test_graph_template.md
     └─ Output: test-knowledge-graph.json
  
  └─ Load testing context
     ├─ Template: prompts/chains/components/testing/test_context.md
     └─ Output: .context/testing_context.json
  
  └─ Update test suite
     ├─ Template: prompts/chains/components/testing/suite_update_template.md
     ├─ Input: Testing context + Knowledge graph
     └─ Output: Updated test files
  
  └─ Generate reports
     ├─ Template: prompts/chains/components/testing/report_template.md
     └─ Output: docs/testing/reports/
```

#### Related Workflows

- Unit Testing Chain (`#unit-test`)
- Integration Testing Chain (`#integration-test`)
- E2E Testing Chain (`#e2e-test`)

### Context Management Chain

```self-prompt
#context-init
  └─ Create context structure
     ├─ Template: prompts/chains/components/context/structure_template.md
     └─ Output: .context/ directory structure
  
  └─ Initialize vector store
     ├─ Template: prompts/chains/components/context/vector_store_template.md
     └─ Output: Initialized vector store
  
  └─ Generate knowledge graph
     ├─ Template: prompts/chains/components/context/graph_template.md
     └─ Output: code-knowledge-graph.json
  
  └─ Setup persistence
     ├─ Template: prompts/chains/components/context/persistence_template.md
     └─ Output: Persistence configuration
```

#### Related Workflows

- Context Update Chain (`#context-update`)
- Context Optimization Chain (`#context-optimize`)
- Context Cleanup Chain (`#context-cleanup`)

## Template Structure

### Core Templates Location

```
prompts/
└─ chains/
   └─ components/
      ├─ requirements/
      ├─ architecture/
      ├─ development/
      ├─ testing/
      ├─ context/
      └─ documentation/
```

### Template Format

Each template follows this structure:

```markdown
# Template Name
## Purpose
[Template purpose description]

## Input Parameters
- parameter1: [description]
- parameter2: [description]

## Output Format
[Expected output format]

## Workflow Steps
1. [Step 1]
2. [Step 2]
...

## Example Usage
[Usage example]
```

## Context Management

### Knowledge Graph Updates

The knowledge graph is automatically updated during:

1. New file creation
2. Significant code changes
3. Dependency updates
4. Structure changes

### Context Optimization

Context is optimized based on:

1. Token usage
2. Relevance scoring
3. Access patterns
4. Update frequency

## Best Practices

### Context Management
1. **Regular Updates**
   - Update knowledge graph after significant changes
   - Optimize context before large changes
   - Maintain clean context structure

2. **Code Safety**
   - Always use scratch pad for major changes
   - Validate changes before committing
   - Keep backups of critical code

3. **Documentation**
   - Keep documentation in sync with code
   - Update requirements as needed
   - Maintain clear feature requests

### Workflow Integration
1. **Project Setup**
   ```self-prompt
   /init-project
   /init-context
   /generate-knowledge-graph
   ```

2. **Feature Development**
   ```self-prompt
   /new-fr "Feature description"
   /feature-init
   /create-scratch
   # Make changes
   /validate-changes
   /update-context
   ```

3. **Testing and Deployment**
   ```self-prompt
   /run-tests
   /check-coverage
   /pre-deploy-check
   /deploy-staging
   ```

## Common Workflows

### 1. Starting a New Project

```self-prompt
    Step 1: Initialize project
    /init-project
    
    Step 2: Setup requirements
    /gen-brd
    /gen-prd
    
    Step 3: Setup architecture
    /arch-init
    
    Step 4: Initialize development
    /feature-init
```

### 2. Adding a New Feature

   Step 1: Create feature request
        /new-fr "Feature description"
   Step 2: Initialize feature development
        /feature-init
   Step 3: Create safe workspace
        /create-scratch
   Step 4: Validate and commit
        /validate-changes
        /update-context

### 3. Maintaining Code Quality

The code quality maintenance workflow in Neo_V0 is a critical component that ensures the codebase remains maintainable, efficient, and well-documented. This workflow combines automated analysis, optimization, and documentation updates through Neo's knowledge graph and context management systems.

#### Technical Implementation

The workflow operates through several interconnected systems:

1. **Coverage Analysis Engine**
   - Integrates with multiple testing frameworks (Jest, Pytest, Mocha)
   - Maintains historical coverage metrics
   - Identifies uncovered code paths through AST analysis
   - Generates actionable coverage reports

2. **Static Analysis Pipeline**
   - Performs deep code structure analysis
   - Identifies code smells and anti-patterns
   - Analyzes cyclomatic complexity
   - Tracks technical debt metrics
   - Integrates with knowledge graph for context-aware analysis

3. **Optimization System**
   - Uses knowledge graph to identify optimization opportunities
   - Performs token-level code analysis
   - Suggests structural improvements based on usage patterns
   - Maintains performance metrics history

4. **Documentation Synchronization**
   - Automatically detects documentation drift
   - Updates technical documentation based on code changes
   - Maintains API documentation consistency
   - Generates updated architecture diagrams

#### Workflow Steps

```self-prompt
# Step 1: Check current state
/check-coverage
/analyze-code

# Step 2: Optimize
/optimize-code
/optimize-graph

# Step 3: Update documentation
/update-docs
```

## Troubleshooting

### Common Issues and Solutions

1. **Context Sync Issues**
   ```self-prompt
   Reset context
   /init-context --reset
   
   Regenerate knowledge graph
   /generate-knowledge-graph --force
   ```

2. **Code Safety Issues**
   ```self-prompt
   Restore from scratch pad
   /restore-code --last-backup
   
   Force validate changes
   /validate-changes --strict
   ```

3. **Test Failures**
   ```self-prompt
   Detailed test report
   /run-tests --verbose
   
   Update test suite
   /update-tests --fix
   ```

## Tips for Success

1. **Regular Context Updates**
   - Update knowledge graph after significant changes
   - Keep context optimized for better performance
   - Regularly clean up unused context

2. **Safe Code Changes**
   - Always use scratch pad for major changes
   - Validate changes before committing
   - Keep backups of critical code

3. **Documentation Maintenance**
   - Keep documentation in sync with code
   - Update requirements as needed
   - Maintain clear feature requests

4. **Testing Best Practices**
   - Write tests for new features
   - Maintain high coverage
   - Regular test suite updates
