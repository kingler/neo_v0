# `.roo/` — Neo harness for Roo Code

Mirrors the `.claude/` harness using Roo Code's native primitives. Same SDLC concepts
(identity, principles, agents, MCP), expressed as custom modes and rule directories.
See `docs/HARNESS_MODERNIZATION.md` for the full blueprint.

## Layout

| Path | Roo primitive | What it is |
|---|---|---|
| `../.roomodes` | **Custom modes** | `neo` (orchestrator) + `morpheus` (validator) |
| `rules/` | **Workspace rules** | always-on constraints (principles, code-edits) |
| `rules-neo/` | **Mode rules** | Neo orchestrator instructions + command mapping |
| `rules-morpheus/` | **Mode rules** | Morpheus validator instructions |
| `mcp.json` | **MCP** | Chroma vector-DB server (component/theme retrieval) |

## Cross-harness mapping

| Concept | `.claude/` | `.roo/` |
|---|---|---|
| Identity / memory | `CLAUDE.md` | `rules/` + mode `roleDefinition` |
| Rules | `rules/*.md` | `rules/*.md` |
| Agents / subagents | `agents/*.md` | modes in `.roomodes` + `rules-<slug>/` |
| Skills | `skills/*/SKILL.md` | command mapping in `rules-neo/instructions.md` |
| MCP | `mcp.json` | `mcp.json` |
| Workflows | `workflows/*.js` | orchestrated by the `neo` mode |
| Hooks | `hooks/` + `settings.json` | (Roo has no hook equivalent — run graph refresh manually) |

> Roo has no SessionStart-hook equivalent, so the knowledge-graph refresh that
> `.claude/hooks/session-start.sh` automates is invoked manually by the `neo` mode
> (`node scripts/generate_knowledge_graph.js`). This is the one capability that does not
> port 1:1.

## Status

Foundational scaffold. Legacy configs in `neo_prompt/` remain the source of truth; the
remaining commands and chains are tracked in the migration backlog (blueprint §5).
