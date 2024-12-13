# Neo_V0 Command Instructions Guide

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