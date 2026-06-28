# `.claude/` — Neo modern harness

This directory ports the Neo SDLC harness from its Cline-era prompt configs
(`neo_prompt/*.yaml`, `.cursorrules.md`, `prompts/chains/`) to the native Claude Code
plugin architecture. See `docs/HARNESS_MODERNIZATION.md` for the full blueprint and the
legacy → modern mapping.

## Layout

| Path | Plugin type | What it is |
|---|---|---|
| `CLAUDE.md` | **Memory** | Neo identity, principles, repo map — injected every turn |
| `settings.json` | **Config / Hooks** | permissions + hook registration |
| `mcp.json` | **MCP** | Chroma vector-DB server (component/theme retrieval) |
| `rules/` | **Rules** | enforceable constraints (KISS/YAGNI/SOLID, edit format) |
| `skills/` | **Skills** | invokable SDLC procedures (ported slash commands) |
| `agents/` | **Subagents** | specialist agents (Morpheus + 10 SDLC roles) |
| `workflows/` | **Workflows** | deterministic multi-agent chains (code-quality, ui-design) |
| `hooks/` | **Hooks** | `session-start.sh` (graph freshness) · `validate-config.sh` (PostToolUse JSON/YAML validation) |

## Skills shipped

- `init-project` — new project / existing-project onboarding
- `init-stack` — initialize a layer/platform (frontend / backend / mobile + framework)
- `requirements-doc` — BRD / PRD / SRS / FRD / DBRD generation
- `architecture` — system design, PlantUML diagrams, OpenAPI specs
- `ui-ux-design` — wireframes → layout → SVG → high-fidelity styling
- `backend-dev` — database schema, server, API implementation
- `testing` — unit + performance tests, coverage validation
- `deployment` — CI/CD pipeline, staging/prod release
- `knowledge-graph` — generate / refresh / query the code knowledge graph
- `code-quality-loop` — iterative evaluate → improve → verify quality gate

## Workflows shipped

- `code-quality-loop.js` — parallel evaluate per dimension → adversarial verify gate
- `ui-design-pipeline.js` — Layout → Style → Component → Design Director (per view)

## Subagents shipped

The orchestrator delegates role-focused work to specialists (each ported from
`prompts/chains/components/agents/interfaces/*.xml`):

- `morpheus-validator` — adversarial reasoner / quality gate
- `product-owner` · `ux-researcher` · `ux-designer` · `ui-designer`
- `system-architect` · `frontend-developer` · `backend-developer` · `database-developer`
- `system-admin` · `test-engineer`

Each specialist is mirrored as a Roo mode in `../.roomodes`.

## Vector search (Chroma MCP) setup

The `chroma` MCP server (`mcp.json`) exposes the component/theme library as retrieval tools.
The store under `vectordb/` ships **empty** (the legacy `init_vector_db.py` assumed
dict-shaped inputs but the `library/*.json` files are lists, and required an OpenAI key, so
it never populated). To stand it up:

```bash
pip install chromadb            # local all-MiniLM embeddings — no API key
python3 scripts/index_vectordb.py   # indexes 38 components + 9 theme categories
# chroma-mcp then serves ./vectordb/storage; restart the session to connect.
```

`scripts/index_vectordb.py` writes both collections (`components`, `themes`) into the single
`vectordb/storage` data dir the MCP server points at. Once connected, the `ui-designer` /
`ui-ux-design` skills query it for reuse before designing new components.

## Status

This is a **foundational scaffold** — representative examples that establish the
conventions. The remaining ~140 legacy commands and the design/testing/deployment chains
are tracked in the migration backlog (Section 5 of the blueprint). Legacy configs remain
the source of truth until parity is proven; nothing has been deleted.
