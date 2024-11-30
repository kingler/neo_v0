# Neo Prompt Chain

This chain manages the Neo prompt process through a series of specialized agents that work together to load and execute the linked YAML files in the 'neo_prompt/' directory.

## Chain Components

1-Agent Contexts
`${fs.readFileSync('neo_prompt/agent_contexts.yaml', 'utf8')}`

2 Agents:
`${fs.readFileSync('neo_prompt/agents.yaml', 'utf8')}`

3 CI/CD:
`${fs.readFileSync('neo_prompt/ci_cd.yaml', 'utf8')}`

4-Commands
`${fs.readFileSync('neo_prompt/commands.yaml', 'utf8')}`

5-pContext Flow Management

`${fs.readFileSync('neo_prompt/context_flow_management.yaml', 'utf8')}`

6 Context Management
`${fs.readFileSync('neo_prompt/context_management.yaml', 'utf8')}`

7 Core
`${fs.readFileSync('neo_prompt/core.yaml', 'utf8')}`

8 Documentation
`${fs.readFileSync('neo_prompt/documentation.yaml', 'utf8')}`

9 Efficiency
`${fs.readFileSync('neo_prompt/efficiency.yaml', 'utf8')}`

10 Git
`${fs.readFileSync('neo_prompt/git.yaml', 'utf8')}`

11 Monitoring Management
`${fs.readFileSync('neo_prompt/monitoring_management.yaml', 'utf8')}`

12 Operations Management
`${fs.readFileSync('neo_prompt/operations_management.yaml', 'utf8')}`

13 Project Organization
`${fs.readFileSync('neo_prompt/project_organization.yaml', 'utf8')}`

14 Security
`${fs.readFileSync('neo_prompt/security.yaml', 'utf8')}`

15 Security Management
`${fs.readFileSync('neo_prompt/security_management.yaml', 'utf8')}`

16 Structure
`${fs.readFileSync('neo_prompt/structure.yaml', 'utf8')}`

17 System Context
`${fs.readFileSync('neo_prompt/system_context.yaml', 'utf8')}`

18 Testing
`${fs.readFileSync('neo_prompt/testing.yaml', 'utf8')}`

19 Use Case Commands
`${fs.readFileSync('neo_prompt/use_case_commands.yaml', 'utf8')}`

20 Workflow Contexts
`${fs.readFileSync('neo_prompt/workflow_contexts.yaml', 'utf8')}`

## Chain Workflow

1. Load agent contexts
2. Load agents
3. Load CI/CD configuration
4. Load commands
5. Load context flow management configuration
6. Load context management configuration
7. Load core configuration
8. Load documentation configuration
9. Load efficiency configuration
10. Load Git configuration
11. Load monitoring management configuration
12. Load operations management configuration
13. Load project organization configuration
14. Load security configuration
15. Load security management configuration
16. Load structure configuration
17. Load system context configuration
18. Load testing configuration
19. Load use case commands configuration
20. Load workflow contexts configuration

## Usage

Use the following commands to interact with the chain:

- #load-agent-contexts - Load agent contexts
- #load-agents - Load agents
- #load-ci-cd - Load CI/CD configuration
- #load-commands - Load commands
- #load-context-flow-management - Load context flow management configuration
- #load-context-management - Load context management configuration
- #load-core - Load core configuration
- #load-documentation - Load documentation configuration
- #load-efficiency - Load efficiency configuration
- #load-git - Load Git configuration
- #load-monitoring-management - Load monitoring management configuration
- #load-operations-management - Load operations management configuration
- #load-project-organization - Load project organization configuration
- #load-security - Load security configuration
- #load-security-management - Load security management configuration
- #load-structure - Load structure configuration
- #load-system-context - Load system context configuration
- #load-testing - Load testing configuration
- #load-use-case-commands - Load use case commands configuration
- #load-workflow-contexts - Load workflow contexts configuration
