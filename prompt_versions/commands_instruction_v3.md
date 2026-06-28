
# Neo_V0 Command Instructions Guide

Detailed Prompt Chain Workflows

## Project Initialization

**`/init-project`**
When a user enters the `/init-project` command, the system executes a series of predefined workflows and tasks to initialize a new project. Here's a breakdown of what happens based on the provided configuration:

1. **Command Execution**:
   - The `/init-project` command is recognized as a self-prompt command, which means it is executed internally within the system's prompt chain.

2. **Workflow Execution**:
   - The command triggers the `project_initialization` workflow, which involves several steps:
     - **Prompt for Project Type**: The system may ask the user to specify the type of project they want to initialize (e.g., webapp, website, native mobile app).
     - **Setup Selected Template**: Based on the user's choice, the system sets up the project using a predefined template. This includes creating the necessary directory structure and files.
     - **Initialize cline_docs**: The system initializes the documentation structure for the project.
     - **Configure Development Environment**: The system configures the development environment, which may include setting up version control, installing dependencies, and configuring build tools.

3. **Sub-Commands and Related Workflows**:
   - **Context Initialization**:
     - `/init-context`: Initialize context management.
     - `/generate-knowledge-graph`: Generate initial knowledge graph.
   - **Requirements Setup**:
     - `/requirements-init`: Load requirements context and generate knowledge graph.
   - **Architecture Setup**:
     - `/arch-init`: Generate architecture knowledge graph and update system design.
   - **Development Setup**:
     - `/dev-init`: Load development context and update codebase.
   - **Testing Setup**:
     - `/test-init`: Load testing context and update test suite.

4. **Project Types and Templates**:
   - The system supports different project types, each with its own template and setup instructions. For example:
     - **Webapp**: Uses a template like "shadcn/nextjs" and sets up a Next.js application with specific configurations.
     - **Website**: Sets up a static site generator or similar structure.
     - **Native Mobile App**: Configures a mobile app project with frameworks like React Native or Flutter.

5. **Version Control and Documentation**:
   - The system may initialize version control (e.g., Git) and set up initial documentation files to help manage the project from the start.

6. **Additional Configuration**:
   - Depending on the project type, additional configurations such as setting up a deployment pipeline, initializing a database, or configuring a build system may be performed.

Overall, the `/init-project` command automates the initial setup of a new project, ensuring that all necessary components and configurations are in place to start development efficiently.

## Setting Up a New Project - Initialize a new project

      command: /init-project
       ```self-prompt
      /init-project - blank project
         └─ Create project structure
            ├─ Command: /create-project-structure 
            |   └─ Terminal command: ["`npx create-next-app@latest {app-name} --tailwind && npx shadcn@latest init -d`" or "`npm create vite@latest my-vue-app && npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p && npx shadcn@latest init`" ]
            └─ Output: new project project root directory
         └─ Generate initial knowledge graph
            ├─ Command: /generate-knowledge-graph
            |   └─ Terminal command: 
            |      └─ If python project run:`python scripts/python_dependency_graph.py`, 
            |      └─ If reactjs project run:`node scripts/react_dependency_graph.js`", 
            |      └─ If vue project run:`node scripts/vue_dependency_graph.js`" 
            ├─ Input: Project codebase
            └─ Output: initial-knowledge-graph.json
         └─ Setup context management
            ├─ Command: /setup-context
               └─ Terminal command: `` 
            └─ Output: .context/
         └─ Configure development environment
            ├─ Command: /configure-env
               └─ Terminal command: `touch .env .env.example && chmod 600 .env && echo '# Supabase Configuration\nSUPABASE_URL=your_supabase_project_url\nSUPABASE_ANON_KEY=your_supabase_anon_key\nSUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key\n\n# Anthropic API Configuration\nANTHROPIC_API_KEY=your_anthropic_api_key\n\n# OpenAI API Configuration\nOPENAI_API_KEY=your_openai_api_key\n\n# Environment Configuration\nNODE_ENV=development' > .env && echo '# Supabase Configuration\nSUPABASE_URL=\nSUPABASE_ANON_KEY=\nSUPABASE_SERVICE_ROLE_KEY=\n\n# Anthropic API Configuration\nANTHROPIC_API_KEY=\n\n# OpenAI API Configuration\nOPENAI_API_KEY=\n\n# Environment Configuration\nNODE_ENV=development' > .env.example && echo '# Environment Variables\n.env\n.env.local\n.env.*.local\n\n# Keep example file\n!.env.example' > .gitignore`                
            └─ Output: .env
         └─ Initialize version control
            ├─ Command: /init-version-control
            |   └─ Terminal command: `git init && git add . && git commit -m "initial commit" && git push`
            └─ Output: .git/
       ```
---
      command: /existing-projects
      If onboarding existing projects do the following:
      ```self-prompt
      /init-context
          └─ Create context structure
             ├─ Template: prompts/core/context/structure_template.md
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

   What Neo Will Do:
      1. Create project documentation structure
      2. Initialize version control
      3. Generate initial knowledge graph
      4. Setup context management
      5. Configure development environment

   Related Workflows:
      - Business Requirements Chain (`/brd-init`)
      - Product Requirements Chain (`/prd-init`)
      - Feature Analysis Chain (`/feature-analysis`)

## Architecture Chain

    Command:
        **/arch-init**

    ```bash
    /arch-init
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

## Requirements Chain

    **/requirements-init**

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
