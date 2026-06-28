---
name: knowledge-graph
description: >-
  Generate, refresh, or query the code knowledge graph — the structured map of this
  codebase's modules, dependencies, and complexity hot-spots. Use when onboarding a
  project, before a large change, when the user asks about architecture/dependencies,
  or when the graph is stale. Ports legacy /generate-knowledge-graph and the
  scripts/generate_knowledge_graph.js pipeline.
---

# Skill: knowledge-graph

Ports `scripts/generate_knowledge_graph.js` (+ the per-language analyzers
`react_dependency_graph.js`, `vue_dependency_graph.js`, `python_dependency_graph.py`).

## Generate / refresh

```bash
# Default: dependency-free, works without node_modules (Node built-ins only).
node scripts/generate_knowledge_graph_lite.js

# Richer AST-based graph — requires @babel/parser, @babel/traverse, glob installed.
node scripts/generate_knowledge_graph.js
```

Both output the same artifacts:
- `code-knowledge-graph.json` — nodes (files/modules) + edges (dependencies), with
  `fanIn`/`fanOut` per node and `externalDependencies`.
- `.neo/knowledge-graph-meta.json` — `lastUpdated`, stats, most-depended-on / highest-fan-out.

The `SessionStart` hook (`.claude/hooks/session-start.sh`) auto-refreshes (via the lite
generator) when the graph is older than the newest source file. For non-JS stacks use the
matching analyzer (`vue_dependency_graph.js`, `python_dependency_graph.py`).

## Query

Read `code-knowledge-graph.json` to answer:
- **Dependency questions** — what imports X / what X depends on.
- **Complexity hot-spots** — high fan-in/fan-out modules; refactor candidates.
- **Change-impact** — what a proposed edit could ripple into.
- **SOLID/YAGNI smells** — god modules, unused exports.

For semantic component/theme lookups (not structure), prefer the Chroma MCP server
(`.claude/mcp.json`) over the graph.

## When to use vs. just reading files

Use the graph for **whole-codebase structure** questions. For a specific file, read it
directly. Don't regenerate the graph for trivial changes — it's for orientation and
impact analysis.
