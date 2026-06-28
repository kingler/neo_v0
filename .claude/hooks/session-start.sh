#!/usr/bin/env bash
# Neo SessionStart hook — keep the code knowledge graph fresh.
#
# Registered in .claude/settings.json under hooks.SessionStart. Mirrors the legacy
# "auto-update knowledge graph on init/context" behavior from neo_prompt/context_management.yaml.
# The harness runs this; it should be fast and side-effect-light. Never block the session.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

GRAPH="code-knowledge-graph.json"
# Prefer the dependency-free lite generator (works without node_modules). Fall back to the
# babel-based generator only if its deps are installed.
GEN="scripts/generate_knowledge_graph_lite.js"
if [ ! -f "$GEN" ] && [ -f "scripts/generate_knowledge_graph.js" ]; then
  GEN="scripts/generate_knowledge_graph.js"
fi

# Nothing to do if no generator is present.
[ -f "$GEN" ] || { echo "neo: knowledge-graph generator not found, skipping"; exit 0; }

needs_refresh=0
if [ ! -f "$GRAPH" ]; then
  needs_refresh=1
else
  # Refresh if any tracked source file is newer than the graph.
  newest_src="$(find src components pages -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' \) -newer "$GRAPH" -print -quit 2>/dev/null || true)"
  [ -n "$newest_src" ] && needs_refresh=1
fi

if [ "$needs_refresh" -eq 1 ]; then
  echo "neo: knowledge graph stale — regenerating..."
  if command -v node >/dev/null 2>&1; then
    node "$GEN" >/dev/null 2>&1 && echo "neo: knowledge graph refreshed" || echo "neo: graph refresh failed (non-fatal)"
  else
    echo "neo: node not available, skipping graph refresh"
  fi
else
  echo "neo: knowledge graph is current"
fi

exit 0
