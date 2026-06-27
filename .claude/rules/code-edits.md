# Rule: Code edit conventions & safety

Ported from `neo_prompt/cline_intergration.yaml` (`cline_instructions`) and the code-safety
section of the README. Applies whenever you modify source files.

## Edit format
- **Never** use `[Previous content remains unchanged]` or similar placeholders in a file
  you actually write. Edits must produce real, complete code.
- When showing a change in chat, you may elide with `// ...` but keep 2–3 lines of context
  around the change so the location is unambiguous.
- Always show the full function/class signature when editing inside one.
- Preserve imports/exports and overall file structure.

## Safety
- Read a file before editing it. If what you find contradicts how it was described, stop
  and surface the discrepancy rather than overwriting.
- Don't delete or overwrite code you didn't write or can't account for — explain first.
- Prefer the smallest diff that satisfies the requirement (see YAGNI in `principles.md`).
- Match the surrounding code's style, naming, and comment density.

## Validation
- After generating project structure or config, validate it (schema/AJV where applicable)
  before continuing — this mirrors the legacy `validation_workflow` trigger.
- Significant changes go through the code-quality loop and Morpheus validation before
  being considered complete.
