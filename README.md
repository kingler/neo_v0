# AIDA System

## Overview
AIDA (AI Development Assistant) is an advanced AI-powered development system that streamlines the software development lifecycle through intelligent automation and coordination. At its core, AIDA utilizes a sophisticated chain-based architecture that orchestrates collaboration between two primary AI agents:

- **Neo (The Orchestrator)**: Manages the development workflow, coordinates system components, and ensures adherence to software development best practices
- **Cline (The Implementer)**: Handles direct code implementation, file operations, and technical execution of development tasks

## Key Features

- **Intelligent Workflow Management**: Automated coordination of development tasks and processes
- **Chain-Based Architecture**: Modular, extensible system design for flexible development workflows
- **Integrated Documentation**: Automated generation and maintenance of project documentation
- **Quality Assurance**: Built-in code quality checks and testing automation
- **Development Automation**: Streamlined implementation of features and components

## System Architecture

### Chain-Based Organization
prompts/
├── chains/              # Core chain implementations
│   ├── components/      # Specialized components
│   │   ├── requirements/       # Requirements gathering
│   │   ├── product_management/ # Business Requirement Document (BRD)
│   │   ├── documentation/      # Product Requirement Document (PRD)
│   │   ├── ui_ux/              # User Experience Design Document (UXDD)
│   │   ├── system/            # System Requirement Document/Specification (SRD/S)
│   │   ├── architecture/      # Design Requirement Document (DRD)
│   │   ├── backend/           # Database Requirement Document (DBRD)
│   │   ├── code_quality/      # Code quality
│   │   ├── orchestration/     # Process orchestration
│   │   ├── testing/           # Testing
│   │   ├── meta/              # Meta information
│   │   └── utilities/         # Utilities
│   └── [chain].md             # Chain implementations

## Core Components

### Neo (Orchestrator)
- Orchestrates development workflows
- Manages system architecture
- Ensures quality standards
- Coordinates documentation
- Handles project planning
- Maintains development context

### Cline (Implementer)
- Executes code implementation
- Performs file operations
- Manages technical execution
- Ensures code quality
- Implements features
- Handles direct system interactions

### UI/UX Tools

#### Screenshot Analyzer
- Purpose: Analyzes UI screenshots to extract component requirements
- Features:
  - UI element detection
  - Color scheme analysis
  - Layout analysis
  - Interactive element mapping
  - Utility file validation
- Commands:
  ```bash
  # Analyze a screenshot and generate components
  #analyze-screenshot <image-path> [options]
  
  Options:
    --output-dir    Output directory for generated files
    --format        Output format (detailed|summary)
    --template      Template type (next|react|vue)
    --check-utils   Check for required utility files
    --gen-utils     Generate missing utility files
  
  # Update components based on new screenshot
  #update-components <image-path> [options]
  
  Options:
    --components    Path to existing components
    --diff         Show component differences
    --apply        Apply recommended changes
    --update-utils Update utility files if needed
  ```

#### Component Generator
- Purpose: Generates React components from analysis results
- Features:
  - Layout component generation
  - Navigation component generation
  - Content component generation
  - Interactive component generation
  - Utility file generation
- Commands:
  ```bash
  # Generate a new component
  #generate-component <name> [options]
  
  Options:
    --type        Component type (layout|navigation|content|interactive)
    --template    Template to use (base|layout|interactive)
    --utils       Generate missing utility files (true|false)
  
  # Update an existing component
  #update-component <name> [options]
  
  Options:
    --template    New template to use
    --merge       Merge with existing code (true|false)
    --utils       Update utility files (true|false)
  ```

#### Required Utilities
The UI/UX tools manage two essential utility files:

1. **lib/utils.ts**
   - Purpose: Common utility functions
   - Features:
     - Class name merging (cn)
     - Tailwind integration
   - Dependencies:
     - clsx
     - tailwind-merge

2. **components/icons.tsx**
   - Purpose: Icon component library
   - Features:
     - Lucide React icons
     - Common icon exports
     - TypeScript types
   - Dependencies:
     - lucide-react

#### Integration Standards
- Consistent import paths (../../../lib/utils, ../design-system/src/components/icons)
- Automatic utility file management
- Component reusability
- Accessibility compliance
- Performance optimization
- Documentation generation

## Testing Framework

### Test Orchestration
The system implements a comprehensive testing framework through the TestOrchestrator class, which manages:
- Test suite execution
- Environment configuration
- Results aggregation and reporting

### Test Types

#### Unit Testing
- **Description**: Component/function level testing
- **Tools**: Jest, Mocha, PyTest
- **Coverage Threshold**: 80%
- **Requirements**: 
  - Isolation
  - Async support
  - Mock/stub compliance

#### Integration Testing
- **Description**: Module interaction testing
- **Tools**: Supertest, TestNG, Cypress
- **Environment**: Staging
- **Features**:
  - Data cleanup
  - Transaction rollback
  - API contract validation

#### System Testing
- **Description**: End-to-end system validation
- **Tools**: Selenium, Cypress, Puppeteer
- **Categories**:
  - Functionality
  - Performance
  - Security
  - Usability

#### Additional Test Types
- **Sanity Testing**: Quick verification of critical paths
- **Smoke Testing**: Basic build verification
- **Regression Testing**: Verification of existing functionality
- **User Acceptance Testing**: Business validation
- **Beta Testing**: Limited user base testing
- **Black Box Testing**: External behavior testing

### Test Execution Workflows

#### Continuous Testing
```yaml
triggers:
  - code_commit
  - pull_request
  - scheduled
stages:
  - unit_tests
  - integration_tests
  - smoke_tests
```

#### Release Testing
```yaml
triggers:
  - release_candidate
  - hotfix
stages:
  - regression_tests
  - system_tests
  - performance_tests
  - security_tests
```

### Quality Gates
```yaml
coverage_thresholds:
  unit_tests: 80%
  integration_tests: 70%
  system_tests: 60%
performance_criteria:
  response_time: "< 500ms"
  throughput: "> 100 rps"
  error_rate: "< 1%"
```

## Development Workflow

1. **Project Initialization**
   - Requirements analysis
   - Architecture planning
   - Environment setup
   - Documentation initialization

2. **Development Process**
   - Feature implementation
   - Code quality checks
   - Documentation updates
   - Testing automation

3. **Quality Assurance**
   - Automated testing
   - Code review
   - Performance analysis
   - Security validation

## Documentation System

### Core Documentation
- **codebaseSummary.md**: System architecture and overview
- **techStack.md**: Technical specifications and stack details
- **currentTask.md**: Active development status
- **projectRoadmap.md**: Development planning and milestones

### Context Management
Each component maintains its context through `.context` files that define:
- Component purpose
- Integration points
- Usage guidelines
- Relationships with other components

### Context Management System

The context management system uses `code-context-llm` to analyze and maintain codebase understanding. Here's how each command works:

#### Command Implementation Details

1. `#analyze-context` (Full Analysis)
```bash
npx code-context-llm \
  --project-path . \
  --output-file .context/codebase_context.md \
  --skip-dirs node_modules,dist,build,.git \
  --skip-files .env,.DS_Store
```

- Performs a complete analysis of the entire codebase
- Generates comprehensive documentation in `.context/codebase_context.md`
- Skips unnecessary directories and sensitive files
- Used for initial setup or major updates

2. `#quick-context` (Fast Analysis)
```bash
npx code-context-llm \
  --project-path . \
  --output-file .context/quick_context.md \
  --skip-dirs node_modules
```

- Faster, lightweight analysis of current directory
- Useful during active development
- Focuses on recent changes
- Less comprehensive but quicker execution

3. `#focused-context` (Directory-Specific)
```bash
npx code-context-llm \
  --project-path {directory} \
  --output-file .context/{directory}_context.md
```

- Analyzes a specific directory or component
- Creates targeted context for particular features
- Useful when working on specific modules

#### Automatic Updates

The system automatically triggers context updates on:
```yaml
triggers:
  - New file creation
  - Significant file changes
  - Directory structure changes
```

#### Context Integration

The generated context files are used in:
```yaml
integration:
  - Include in AI prompts
  - Reference in documentation
  - Use for code analysis
```

#### Context File Structure

The context files follow this structure:
```typescript
interface ContextData {
  frontMatter: {
    moduleName: string;
    version: string;
    description: string;
    relatedModules: Array<{ name: string; path: string }>;
    technologies: string[];
    conventions: string[];
    directives: string[];
    diagrams: Array<{ name: string; path: string }>;
    architecture: Record<string, unknown>;
    development: Record<string, unknown>;
    businessRequirements: Record<string, unknown>;
    qualityAssurance: Record<string, unknown>;
    deployment: Record<string, unknown>;
  };
  content: string;
}
```

#### Usage Examples

1. Initial project setup:
```bash
#analyze-context  # Full analysis
```

2. During development:
```bash
#quick-context   # Fast updates while coding
```

3. Working on specific feature:
```bash
#focused-context src/features/auth  # Analyze auth module
```

4. Sync changes across team:
```bash
#sync-context    # Ensure all team members have latest context
```

The context management system helps maintain an up-to-date understanding of the codebase, which improves the quality of AI assistance and documentation generation throughout the development lifecycle.

### Documentation System

#### Essential Documentation Structure
The system maintains a `cline_docs` directory containing essential project documentation:

1. **projectRoadmap.md**
   - High-level goals and features
   - Completion criteria
   - Progress tracking
   - Task history

2. **currentTask.md**
   - Active objectives
   - Task context
   - Dependencies
   - Next steps

3. **techStack.md**
   - Technology choices
   - Framework decisions
   - Infrastructure details
   - Architecture decisions

4. **codebaseSummary.md**
   - Project structure overview
   - Component relationships
   - Data flow
   - Recent changes

#### Documentation Commands

```bash
# Initialize Documentation
#init-docs      # Create and initialize cline_docs directory

# Update Documentation
#update-docs roadmap   # Update project roadmap
#update-docs task     # Update current task
#update-docs tech     # Update tech stack
#update-docs summary  # Update codebase summary
#update-docs all      # Update all documentation

# Synchronize Documentation
#sync-docs      # Sync all documentation with project state
```

#### Documentation Workflows

The system automatically triggers documentation updates on:
```yaml
triggers:
  projectRoadmap:
    - Goal completion
    - New feature addition
    - Progress milestone
  
  currentTask:
    - Task completion
    - Subtask update
    - Context change
  
  techStack:
    - Technology addition
    - Architecture change
    - Version update
  
  codebaseSummary:
    - Structure change
    - New component
    - Major refactor
```

## Quick Commands

```bash
# Project Management
#new-project    # Initialize new project with SDLC setup
#start         # Continue from last sprint task
#onboard       # Scan and parse existing codebase for AI context
#sdlc-init     # Initialize SDLC for new development project

# Documentation Management
#gen-brd       # Generate Business Requirements Document
#gen-prd       # Generate Product Requirements Document
#gen-uxdd      # Generate UX Design Document
#gen-drd       # Generate Development Requirements Document
#update-doc    # Update project documentation with recent changes

# Sprint & Story Management
#new-sprint    # Start new sprint planning
#new-user-story # Generate new user story
#new-fr        # Create new feature request
#update-fr     # Update feature request details

# Context Management
#analyze-context    # Generate/update full codebase context
#quick-context     # Fast context generation for current directory
#focused-context   # Generate context for specific directory
#update-context    # Update project context files
#sync-context      # Synchronize context across agents

# Development Tools
#database-init     # Set up project database
#wireframe-init    # Generate wireframes from requirements
#start-pair-programming  # Initialize AI pair programming session

# Project Tracking
#status        # Monitor project progress with metrics
#git-status    # Check repository status and changes
```

### Command Details

#### Project Setup Commands
- `#new-project`: Initializes new project with full SDLC setup, including:
  - Project scaffold creation
  - Documentation initialization
  - Development environment setup
  - Git repository initialization
  - Context generation

- `#onboard`: Analyzes existing codebase and sets up:
  - Project context
  - SDLC documentation
  - Architecture insights
  - Project tracking

#### Context Management Commands
- `#analyze-context`: Full codebase analysis and context generation
- `#quick-context`: Fast context generation for current work
- `#focused-context`: Targeted context generation for specific directories
- `#update-context`: Updates project context files
- `#sync-context`: Synchronizes context across all agents

#### Documentation Commands
- `#gen-<doc-type>`: Generates various documentation types:
  - BRD (Business Requirements Document)
  - PRD (Product Requirements Document)
  - UXDD (UX Design Document)
  - DRD (Development Requirements Document)
- `#update-doc`: Refreshes all project documentation

#### Feature & Story Commands
- `#new-user-story`: Creates new user stories with:
  - Story template
  - Acceptance criteria
  - Implementation notes
  - Estimation details

- `#new-fr`/`#update-fr`: Manages feature requests with:
  - Requirement collection
  - Documentation updates
  - Team review process
  - Context synchronization

#### Development Tools
- `#database-init`: Database setup with:
  - Requirements analysis
  - Technology selection
  - Setup scripts generation
  - Configuration management

- `#wireframe-init`: Wireframe generation including:
  - User story analysis
  - Design specification review
  - Initial wireframe creation
  - Stakeholder review process

- `#start-pair-programming`: AI pair programming session with:
  - Context loading
  - Task management
  - Real-time assistance
  - Progress tracking

## Setup and Usage

1. **Installation**
   ```bash
   git clone [repository-url]
   npm install
   ```

2. **Configuration**
   - Set up environment variables
   - Configure system preferences
   - Initialize development environment
   - Configure test environments

3. **Development**
   - Follow chain-based architecture
   - Maintain context documentation
   - Adhere to system workflows
   - Write and maintain tests

## Contributing

1. **Development Guidelines**
   - Follow chain-based structure
   - Update context files
   - Maintain documentation
   - Ensure test coverage

2. **Quality Standards**
   - Write clean, maintainable code
   - Follow project conventions
   - Include appropriate tests
   - Update relevant documentation
   - Meet coverage thresholds

## License
MIT License - see LICENSE file for details

## Design System Management

### Component Library Structure
The system implements an atomic design pattern with the following hierarchy:

```
src/
  components/
    atoms/
      - Button
      - Input
      - Label
      - Checkbox
      - RadioGroup
      - Select
      - Switch
      - Textarea
    molecules/
      - FormField
      - SearchBar
      - NavigationItem
      - Card
      - Dialog
      - Dropdown
    organisms/
      - Form
      - NavigationBar
      - CardList
      - Table
      - Tabs
    templates/
      - PageLayout
      - SectionTemplate
      - GridLayout
```

### Component Generation Workflow
- **Project Setup**
  - Vite + Vue initialization
  - ShadCN UI configuration with New York theme
  - Tailwind CSS integration
  - Dependency management
- **Component Extraction**
  - User story analysis
  - Wireframe parsing
  - Automated component generation
- **Theme Configuration**
  - New York theme setup
  - Zinc color scheme
  - Design token generation

## Project Organization

### File Structure Management
The system provides automated organization of project files into semantic folders:

- **docs/** - Documentation files
  - guides/ - User and development guides
  - api/ - API documentation
  - specs/ - Specifications
- **config/** - Configuration files
  - env/ - Environment configurations
  - tools/ - Tool configurations
  - build/ - Build configurations
- **scripts/** - Script files
  - build/ - Build scripts
  - deploy/ - Deployment scripts
  - utils/ - Utility scripts
- **assets/** - Asset files
  - images/ - Image files
  - icons/ - Icon files
  - media/ - Media files

### Documentation System

#### Essential Documentation
The system maintains core documentation files:

1. **projectRoadmap.md**
   ```markdown
   # Project Roadmap
   
   ## Goals
   - [ ] Goal 1
   - [ ] Goal 2
   
   ## Features
   - [ ] Feature 1
   - [ ] Feature 2
   
   ## Completion Criteria
   - Criterion 1
   - Criterion 2
   ```

2. **currentTask.md**
   ```markdown
   # Current Task
   
   ## Objective
   {task_description}
   
   ## Context
   - Related roadmap item: {roadmap_reference}
   - Dependencies: {dependencies}
   ```

3. **techStack.md**
   ```markdown
   # Technology Stack
   
   ## Frontend
   - Framework: {framework}
   - UI Library: {ui_library}
   
   ## Backend
   - Runtime: {runtime}
   - Database: {database}
   ```

#### Documentation Commands
```bash
# Initialize Documentation
#init-docs      # Create and initialize documentation structure

# Update Documentation
#update-docs <doc-type>   # Update specific documentation (roadmap|task|tech|summary|all)

# Synchronize Documentation
#sync-docs      # Sync all documentation with current project state
```

## Context Management

### Monitoring Services
- **Performance Metrics**
  - Query response time
  - System latency
  - Resource usage
- **Context Metrics**
  - Context size
  - Query latency
  - Update frequency
  - Cache hit rate
- **Analytics**
  - Usage patterns
  - Query patterns
  - Access frequency

### Operations Services
```bash
# Initialize Context
#init-context   # Setup project context and monitoring

# Update Context
#update-context # Sync context with current state
```

## Command System

### Global Command Flags
```bash
# Format Flags
--format=<text|json|yaml|md>   # Output format
--output=<filename>            # Output file
--filter=<category|type|agent> # Filter results

# Template Flags
--template-type=<BRD|PRD|UXDD> # Template type
--template-path=<path>         # Custom template location

# Documentation Flags
--doc-format=<md|txt|html>     # Documentation format
--include-examples=<true|false> # Include examples

# Execution Flags
--dry-run=<true|false>         # Simulate execution
--verbose=<true|false>         # Detailed output
--silent=<true|false>          # Suppress output
```

## Documentation Portal

### Neo Project Site
The system includes a documentation portal that provides a centralized view of all SDLC documentation:

```bash
# Initialize Documentation Portal
npm run init-docs-portal

# Structure
neo_project_site/
├── src/
│   ├── pages/
│   │   ├── requirements/        # Requirements documentation
│   │   │   ├── business/       # BRD and related docs
│   │   │   ├── product/        # PRD and related docs
│   │   │   └── technical/      # SRD and related docs
│   │   │
│   │   ├── design/             # Design documentation
│   │   │   ├── ux/            # UXDD and wireframes
│   │   │   ├── system/        # Design system
│   │   │   └── components/    # Component library
│   │   │
│   │   ├── architecture/       # Architecture documentation
│   │   │   ├── technical/     # Technical architecture
│   │   │   ├── database/      # Database design
│   │   │   └── api/          # API documentation
│   │   │
│   │   └── development/        # Development documentation
│   │       ├── guides/        # Development guides
│   │       ├── standards/     # Coding standards
│   │       └── workflows/     # Development workflows
│   │
│   ├── components/            # Shared components
│   │   ├── Navigation/       # Navigation components
│   │   ├── DocViewer/       # Documentation viewer
│   │   └── DesignSystem/    # Design system components
│   │
│   └── utils/                # Utility functions
│       ├── mdx/             # MDX processing
│       ├── search/          # Search functionality
│       └── navigation/      # Navigation utilities
```

### Design System View
The design system section provides a comprehensive view of:

1. **Atomic Design Structure**
   - Atoms: Basic UI components
   - Molecules: Component combinations
   - Organisms: Complex components
   - Templates: Page layouts
   - Pages: Full implementations

2. **User Story Mapping**
   ```
   Component Categories:
   ├── User Interaction
   │   ├── Forms
   │   ├── Navigation
   │   └── Actions
   │
   ├── Data Display
   │   ├── Lists
   │   ├── Tables
   │   └── Charts
   │
   └── Layout
       ├── Containers
       ├── Grids
       └── Cards
   ```

### Features
- **Interactive Documentation**: MDX-powered interactive documentation
- **Live Component Preview**: Real-time component visualization
- **Search Functionality**: Full-text search across all documentation
- **Version Control**: Documentation version tracking
- **Auto-Generation**: Automatic updates from SDLC processes
- **Design System Integration**: Live design system documentation
- **API Documentation**: Interactive API documentation
- **User Story Mapping**: Visual user story organization

### Usage
```bash
# Install dependencies
npm install

# Start documentation portal
npm run docs:dev

# Build for production
npm run docs:build

# Deploy documentation
npm run docs:deploy
```

### Integration
The documentation portal automatically integrates with:
- Generated SDLC documentation
- Design system components
- API specifications
- User story mapping
- Development workflows
