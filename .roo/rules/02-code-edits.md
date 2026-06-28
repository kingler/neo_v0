# Code edit conventions & safety

Ported from `neo_prompt/cline_intergration.yaml`. Applies whenever you modify source files.

## Edit format
- Never use `[Previous content remains unchanged]` or similar placeholders in files you write.
- When showing a change, keep 2–3 lines of context so the location is unambiguous.
- Always show the full function/class signature when editing inside one.
- Preserve imports/exports and overall file structure.

## Safety
- Read a file before editing it. If it contradicts how it was described, stop and surface
  the discrepancy rather than overwriting.
- Don't delete code you didn't write or can't account for — explain first.
- Prefer the smallest diff that satisfies the requirement (YAGNI).
- Match the surrounding code's style, naming, and comment density.

## Validation
- After generating project structure or config, validate it (schema/AJV) before continuing.
- Significant changes go through the quality gate (Morpheus) before being considered done.
