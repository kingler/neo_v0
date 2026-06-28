#!/usr/bin/env bash
# Neo PostToolUse hook — validate config files after they're written/edited.
#
# Registered in .claude/settings.json under hooks.PostToolUse (matcher: Write|Edit).
# Mirrors the legacy validation_workflow ("after /generate_structure run /validate_config"
# using yq + ajv): a generated/edited JSON or YAML config must parse before work continues.
#
# Contract: reads the hook payload as JSON on stdin, validates the touched file, and exits
# 0 when fine (or not applicable). Exits 2 with a message on stderr to feed the problem
# back to Claude when a config is malformed. Never blocks on anything but a parse failure.

set -uo pipefail

# Read the hook payload; extract the edited file path. Without jq we can't, so no-op.
payload="$(cat 2>/dev/null || true)"
command -v jq >/dev/null 2>&1 || exit 0
file="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)"
[ -n "$file" ] && [ -f "$file" ] || exit 0

case "$file" in
  *.json)
    if ! python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$file" 2>/dev/null; then
      echo "neo/validate-config: $file is not valid JSON — fix the syntax before continuing." >&2
      exit 2
    fi
    ;;
  *.yaml|*.yml)
    # Only validate if a YAML parser is available; otherwise skip quietly.
    if python3 -c "import yaml" 2>/dev/null; then
      if ! python3 -c "import yaml,sys; yaml.safe_load(open(sys.argv[1]))" "$file" 2>/dev/null; then
        echo "neo/validate-config: $file is not valid YAML — fix the syntax before continuing." >&2
        exit 2
      fi
    fi
    ;;
  *)
    exit 0
    ;;
esac

exit 0
