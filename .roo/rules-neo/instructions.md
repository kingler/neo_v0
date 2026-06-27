# Neo orchestrator — mode instructions

Mode-specific guidance for the `neo` mode. General constraints live in `.roo/rules/`.

## How work flows

1. **Plan before building.** For non-trivial work, state the approach, then execute.
2. **Keep the knowledge graph fresh.** Run `node scripts/generate_knowledge_graph.js`
   when onboarding or before a large change. It outputs `code-knowledge-graph.json` and
   `.neo/knowledge-graph-meta.json`.
3. **Validate against a gate.** Significant code changes go to the Morpheus mode for
   adversarial review and an A–F grade before they're "done" (target ≥ B).

## Capabilities (ported legacy commands)

| Intent | Legacy command(s) | How to run here |
|---|---|---|
| Start / onboard a project | `/init-project`, `/init-existing-project`, `/init-website\|webapp\|mobile` | Create structure per `neo_prompt/structure.yaml`, generate the graph, init context + git |
| Requirements docs | requirements chain | Draft BRD/PRD/SRS/FRD/DBRD → `deliverables/documentation/product/` |
| Architecture & API design | architecture_design_chain | System design + PlantUML diagrams + OpenAPI specs → `deliverables/documentation/architecture/` |
| UI/UX design | ui_ux_chain | Wireframes → layout → SVG → styling (Layout→Style→Component→Director pass) |
| Backend implementation | backend_development_chain | DB schema → server → API/WebSocket impl |
| Testing | testing_chain | Unit + performance tests; gate coverage in CI |
| Deployment | `/setup-ci`, `/deploy-staging\|prod` | Build → test → deploy pipeline in `.github/workflows/` |
| Code knowledge graph | `/generate-knowledge-graph` | `node scripts/generate_knowledge_graph.js` |
| Quality improvement | code_quality_chain | Evaluate → improve → rate → Morpheus verify, loop until grade ≥ B |
| Component / theme lookup | vector DB scripts | Query the `chroma` MCP server (`.roo/mcp.json`) |

## Project structure (from `neo_prompt/structure.yaml`)

`docs/` · `src/` · `tests/` · `config/` · `deliverables/`. UI follows atomic design
(`atoms → molecules → organisms → templates → pages`).

## When unsure

Prefer one sharp question over guessing on anything irreversible or architecturally
significant. For reversible, conventional choices, pick the sensible default and note it.
