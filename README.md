# Neo - SDLC Orchestra Leader

## Overview
Neo is an advanced AI-powered SDLC Orchestra Leader that orchestrates development processes with intelligent context management and code safety features. It uses LLM capabilities and code knowledge graphs to understand and manage your project's context effectively.

## Features

### 🧠 Intelligent Context Management
- Dynamic code knowledge graph generation
- Context-aware code analysis
- LLM-optimized context windows
- Automated context updates
- Vector DB integration for UI components
- Comprehensive template system

### 🛡️ Code Safety
- Scratch pad system for safe code modifications
- Automatic code backup and restoration
- Change validation and diff analysis
- Accidental deletion protection

### 🧪 Test Integration
- Automated test detection and updates
- Test coverage analysis
- Multi-framework support (Jest, Pytest, Mocha)
- Continuous validation

### 📊 Knowledge Graph
- Real-time codebase analysis
- Dependency tracking
- Semantic code understanding
- Token-optimized context

### 📝 Template System
- Comprehensive documentation templates
- Design system templates
- PlantUML diagram integration
- Layout and component templates
- Project management templates
- Market analysis templates

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/neo.git

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your OpenAI API key to .env
```

## Configuration
Neo uses a hierarchical configuration system:
- `neo_core.yaml`: Core system configuration
- `neo_config.yaml`: Feature and environment settings
- `context_management.yaml`: Context management rules
- `neo_v0-2.yaml`: Template and workflow configurations

## Commands Reference

### Top-Level Commands

#### Project Initialization
```bash
/init-project           # Initialize new project
/init-existing-project  # Setup Neo for existing project
/init-context          # Initialize context management
/init-deliverables     # Setup deliverables structure
```

#### Feature Development
```bash
/new-fr                # Create feature request
/feature-init          # Initialize feature development
/feature-dev           # Start feature development
```

#### Context Management
```bash
/generate-knowledge-graph  # Generate code knowledge graph
/optimize-context         # Optimize context for LLM
/update-context          # Update project context and vector DB
```

#### Template Management
```bash
/init-templates          # Initialize template system
/update-templates        # Update template configurations
/sync-templates         # Synchronize templates with workflows
```

#### Code Safety
```bash
/create-scratch          # Create scratch pad for changes
/validate-changes        # Validate code modifications
/restore-code           # Restore removed code
```

### Workflow Chains

#### Requirements Chain
```bash
#requirements-init
  └─ "Load requirements context"
  └─ "Generate knowledge graph"
  └─ "Update specifications"
  └─ "Generate documentation"
```

#### Architecture Chain
```bash
#arch-init
  └─ "Generate knowledge graph"
  └─ "Load architecture context"
  └─ "Update system design"
  └─ "Generate diagrams"
```

#### Development Chain
```bash
#dev-init
  └─ "Generate knowledge graph"
  └─ "Load development context"
  └─ "Update codebase"
  └─ "Generate documentation"
```

#### Testing Chain
```bash
#test-init
  └─ "Generate knowledge graph"
  └─ "Load testing context"
  └─ "Update test suite"
  └─ "Generate reports"
```

## Usage Examples

### 1. Starting a New Project
```bash
/init-project
# Neo will:
# 1. Initialize project structure
# 2. Generate initial knowledge graph
# 3. Setup context management
# 4. Configure test environment
```

### 2. Developing a New Feature
```bash
/new-fr "Feature description"
# Neo will:
# 1. Create feature request document
# 2. Update context with requirements
# 3. Generate implementation plan

/feature-init
# Neo will:
# 1. Create feature branch
# 2. Setup feature structure
# 3. Initialize tests
# 4. Update knowledge graph
```

### 3. Making Safe Code Changes
```bash
/create-scratch
# Neo will:
# 1. Create temporary workspace
# 2. Copy current code state
# 3. Enable change tracking

# Make your changes...

/validate-changes
# Neo will:
# 1. Compare changes with original
# 2. Check for accidental deletions
# 3. Run tests
# 4. Update context
```

## Context Management

### Knowledge Graph Generation
The knowledge graph is a foundational component that provides a comprehensive, structured understanding of the codebase's architecture and dependencies. It is automatically generated and updated during:

#### Key Features
1. **Dependency and Structure Mapping**
   - Analyzes source code (React components, modules, services)
   - Identifies file and functionality relationships
   - Maps architectural dependencies
   - Discovers core modules and interactions

2. **Contextual Metadata**
   - Stores metadata in `.neo/knowledge-graph-meta.json`
   - Tracks last updated timestamps
   - Maintains statistical summaries
   - Records component counts and code metrics
   - Provides historical insight into project evolution

3. **Analysis and Decision Support**
   - Identifies high complexity areas
   - Highlights frequently changing modules
   - Detects SOLID/YAGNI principle violations
   - Enables informed code evaluations
   - Supports targeted refactoring decisions

4. **SDLC Workflow Integration**
   - Powers project onboarding process
   - Informs requirement gathering
   - Guides architectural decisions
   - Supports feature request planning
   - Facilitates bug fix prioritization

The graph is automatically updated during:
- Project initialization
- Feature development
- Code modifications
- Dependency changes
- Context initialization (/init_context)

This ensures every SDLC action is based on an accurate, up-to-date representation of the codebase.

### Codebase Context Specification (CCS)
Neo implements CCS v1.1-RFC for structured codebase context management. The implementation includes:

#### File Structure
```
.context/
├── index.md           # Primary entry point with YAML front matter
├── docs.md           # Extended documentation and guides
├── diagrams/         # Architectural and workflow diagrams
└── images/          # Supporting visual assets
```

#### Key Features
- Markdown-centric documentation
- Hierarchical organization
- Modularity and extensibility
- Agent-friendly linking
- Flexible tool integration

#### Context Management Commands
```bash
/init_context          # Initialize CCS structure
/update_context        # Update context with changes
/validate_context      # Validate context integrity
/index_context         # Index context in vector DB
```

### Context Optimization
Neo automatically optimizes context for LLM interactions by:
- Analyzing code dependencies
- Tracking semantic relationships
- Managing token limits
- Caching frequent patterns
- Integrating with vector DB for UI components
- Enriching prompts with relevant context

### Template System
Neo provides a comprehensive template system that includes:

1. **Documentation Templates**
   - User guides
   - Migration guides
   - Integration plans
   - Backlog reports
   - Market analysis

2. **Design Templates**
   - Wireframes
   - Prototypes
   - Design systems
   - Component specifications
   - Layout structures

3. **Project Management**
   - Epic templates
   - Journey maps
   - Persona definitions
   - OOUX templates
   - Matrix templates

4. **Technical Documentation**
   - PlantUML diagrams
   - Grid systems
   - Component layouts
   - Page structures

All templates are automatically integrated with relevant workflow chains and kept in sync with the project context.

## Component Organization (Atomic Design)

Neo follows the Atomic Design methodology for organizing UI components, providing a scalable and maintainable component architecture:

### 1. Atoms (`src/components/atoms/`)
Fundamental building blocks of the interface:
- `Button`: Core button component
- `Icon`: Icon system
- `Color`: Color token component
- `CopyButton`: Copy functionality
- `ThemeSwitcher`: Theme toggle
- `ModeSwitcher`: Mode selection
- `Callout`: Alert/notification element

### 2. Molecules (`src/components/molecules/`)
Simple combinations of atoms:
- `ColorPalette`: Color selection interface
- `ColorFormatSelector`: Format switching
- `CommandMenu`: Command interface
- `ComponentCard`: Component display
- `ComponentSource`: Source code viewer
- `ThemeCustomizer`: Theme configuration
- `BlockImage`: Image block component

### 3. Organisms (`src/components/organisms/`)
Complex UI components:
- `SiteHeader`: Main header
- `SiteFooter`: Main footer
- `MainNav`: Primary navigation
- `MobileNav`: Mobile navigation
- `DocsNav`: Documentation nav
- `ComponentPreview`: Component demos
- `BlockViewer`: Block visualization
- `ChartDisplay`: Data visualization

### 4. Templates (`src/components/templates/`)
Page-level layouts:
```
DocsLayout/
├── index.tsx
├── Sidebar.tsx
├── Content.tsx
└── Navigation.tsx

ComponentLayout/
├── index.tsx
├── Preview.tsx
├── Documentation.tsx
└── Examples.tsx

DashboardLayout/
├── index.tsx
├── Header.tsx
├── Sidebar.tsx
└── MainContent.tsx
```

### 5. Pages (`src/components/pages/`)
Complete application screens:
```
Home/
├── index.tsx
├── Hero.tsx
├── Features.tsx
└── Examples.tsx

Documentation/
├── index.tsx
├── ComponentsSection.tsx
└── GuidesSection.tsx

Components/
├── index.tsx
├── ComponentGrid.tsx
└── ComponentDetails.tsx
```

### Usage
Components are imported following the Atomic Design hierarchy:
```typescript
// Importing atoms
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

// Composing molecules
import { CommandMenu } from '@/components/molecules/CommandMenu';

// Using organisms
import { SiteHeader } from '@/components/organisms/SiteHeader';

// Applying templates
import { DocsLayout } from '@/components/templates/DocsLayout';

// Building pages
import { Home } from '@/components/pages/Home';
```

## Security Features

### API Key Management
- Secure environment variable storage
- Encrypted key management
- Access control based on roles

### Code Safety
- Automatic backups every 5 minutes
- 1-day retention of scratch pads
- Diff-based change validation
- Automatic code restoration

## Monitoring

### Metrics Tracked
- Context update frequency
- Test coverage
- Code safety incidents
- Graph generation time
- Query latency

### Alerts
- Console notifications
- Log entries
- Error reporting
- Performance warnings

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

Below are the key areas in the provided prompt and code that relate to leveraging Cline's tool capabilities. These excerpts highlight how Neo and Cline integrate with the code, invoke tools, and maintain context.

1. Script for Knowledge Graph Generation

File: generate_knowledge_graphs.js

Relevant Points:
	•	The script analyzes the existing codebase and produces a knowledge graph (code-knowledge-graph.json) and associated metadata (.neo/knowledge-graph-meta.json).
	•	By updating these artifacts, Neo and Cline can maintain a structured representation of the codebase, which is crucial for context-aware code evaluations and improvements.

Excerpt:

```javascript
const analyzer = new ReactCodeKnowledgeGraph(this.projectPath);
await analyzer.analyzeCodebase();
// Save the knowledge graph
await analyzer.saveToFile(this.outputPath);
// Save metadata
const metadata = {
  lastUpdated: new Date().toISOString(),
  stats: analyzer.stats,
  graphPath: this.outputPath
};
await this._saveMetadata(metadata);
```

Significance:
This ensures Neo and Cline have a current, data-driven understanding of the project's structure. Tools and agents can reference this knowledge graph to inform decisions about code improvements, missing features, or architectural optimizations.

2. Neo and Cline Prompt Configuration

Context from the Provided Prompt:
The prompt describes Neo and Cline, along with their roles and the tools they can use. It defines how each command and workflow step can invoke tools to analyze, validate, or improve code quality.

Key Sections:
	•	Tool Integration Instructions:
The prompt includes a detailed set of rules and instructions on how to call tools (e.g., <execute_command>, <read_file>, <write_to_file>), including their parameters and strict formatting requirements.
	•	Cline as a Skilled Engineer:
Cline is described as a highly skilled software engineer, capable of using tools for file manipulation, searching code, executing commands, and validating code, ensuring that changes are made effectively and aligned with best practices.
	•	Commands and Agents:
The YAML-like configuration defines various agents (e.g., neo_orchestrator_agent, morpheus_validator_agent) and specialized agents (like product_owner, ux_researcher, frontend_developer), each with responsibilities and tools they can invoke. These agents rely on Cline's tooling capabilities to execute tasks like /evaluate_code, /validate_config, /process_audit_findings.

Excerpt:

```yaml
# Example snippet showing tool invocation capabilities
neo_orchestrator_agent:
  name: "Neo"
  role: "SDLC Orchestration Leader"
  tools:
    commands:
      - "/evaluate_code"
      - "/validate_config"
      - "/onboard_existing_project"
      - "/process_audit_findings"
    cline_integration:
      - tool: "cline_execute"
        usage: "Execute commands through CLI"
        permissions: ["all"]
      - tool: "cline_repl"
        usage: "Interactive command execution"
        permissions: ["all"]
```

Significance:
This shows how Neo can leverage Cline's integrated tools to run commands, analyze the code, and perform validations. By calling cline_execute or other tools, Neo interacts with the environment to maintain and improve the codebase.

3. Code Quality Improvement and Rating Chain

Context from the Provided Prompt:
The prompt defines a chain (e.g., code_quality_chain) that orchestrates multiple agents (code_evaluation_agent, code_improver_agent, code_rater_agent, code_generator_agent) to continuously evaluate, improve, and rate code quality. Each step can use Cline's capabilities to manipulate files, run linters, or validate configuration files.

Excerpt:

```xml
<step id="1">
  <agent>code_evaluation_agent</agent>
  <input>
    <source>file</source>
  </input>
  <output>
    <type>evaluationReport</type>
    <target>code_improver_agent</target>
  </output>
</step>

<step id="2">
  <agent>code_improver_agent</agent>
  <input>
    <source>code_evaluation_agent.evaluationReport</source>
  </input>
  <output>
    <type>improvementResult</type>
    <target>code_rater_agent</target>
  </output>
</step>
```

Significance:
Here, each agent uses tool-driven processes to analyze the codebase, propose improvements, and then apply those improvements. By continuously looping through these steps until quality gates are met, Cline's tool capabilities are central to refining the codebase.

4. Onboarding Existing Projects

Context from the Provided Prompt:
When onboarding existing projects (/onboard_existing_project command), Neo runs the knowledge graph script, initializes context, analyzes the codebase, and generates an audit report. This triggers a workflow that involves identifying missing capabilities, bug fixes, and feature requests, then integrating those into sprints following the SDLC process.

Excerpt:

```yaml
onboarding:
  "/onboard_existing_project":
    description: "Onboard existing project into SDLC orchestration"
    steps:
      knowledge_graph:
        description: "Generate project knowledge graph"
        command: "python scripts/build_knowledge_graph.py"
        ...
      codebase_analysis:
        description: "Analyze existing codebase"
        commands:
          - "/analyze_code --depth=full"
          - "/evaluate_code --mode=audit"
```

Significance:
This section shows how the generated knowledge graph and code analysis steps feed into the workflow. Using these tools, Neo and Cline gain deep insights into the project's state and can then leverage Cline's capabilities to create or update user stories, feature requests, and bug fixes, aligning them with the SDLC pipeline.

5. Validation and CI/CD Integration

Context from the Provided Prompt:
The prompt specifies how configuration validation (/validate_config) uses tools like yq and ajv to ensure YAML and JSON schema compliance. This helps maintain a consistent and quality-controlled development environment.

Excerpt:

```yaml
validation_workflow:
  triggers:
    - after: "/generate_structure"
      run: "/validate_config"
  ci_cd_integration:
    requirements:
      - tool: "yq"
      - tool: "ajv"
```

Significance:
This demonstrates how tools integrate into CI/CD pipelines for automatic validation, ensuring ongoing codebase consistency and alignment with defined schemas and principles.

Summary

Key Areas Related to Leveraging Cline's Tool Capabilities:
	1.	Knowledge Graph Generation (generate_knowledge_graphs.js):
Provides structured codebase context used by Neo and Cline for informed decision-making.
	2.	Neo and Agents Configuration:
	•	Specifies which commands and tools agents can invoke.
	•	Defines roles and responsibilities aligned with Cline's tool usage.
	3.	Code Quality and Rating Chains:
	•	Shows iterative improvement cycles, each step leveraging tools to analyze, improve, rate, and generate code until thresholds are met.
	4.	Onboarding Existing Projects:
	•	Integrates the knowledge graph and code analysis tools to produce audit reports.
	•	Uses these reports to create feature requests, bug fixes, and user stories, reflecting the synergy between Cline's tooling and Neo's orchestration.
	5.	Validation and CI/CD:
	•	Demonstrates how tools (yq, ajv) are integrated into pipelines for schema validation and quality control.

Collectively, these areas illustrate how the prompt's definitions and configurations rely on Cline's tooling capabilities to maintain codebase context, perform continuous quality improvements, and integrate findings into the SDLC workflow.
