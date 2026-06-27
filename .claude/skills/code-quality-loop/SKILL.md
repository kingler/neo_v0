---
name: code-quality-loop
description: >-
  Run the iterative code-quality improvement loop — evaluate, improve, rate, and
  adversarially verify a target until it clears a quality grade. Use when the user asks
  to improve/harden/clean up code, raise quality, or "make this production-ready". Ports
  the legacy code_quality_chain (evaluate → improve → rate → generate).
---

# Skill: code-quality-loop

Ports `prompts/chains/code_quality_chain.md` (Code Evaluation → Improver → Rater →
Generator). The legacy chain looped until a quality threshold was met; that loop now runs
as a deterministic Workflow with an adversarial verify gate.

## How to run

For a focused, single-file or small change, run the loop inline:

1. **Evaluate** — read the target; list concrete issues (correctness, SOLID/KISS/YAGNI,
   tests, perf) with `file:line`.
2. **Improve** — apply the smallest fixes that resolve real issues (respect `code-edits.md`).
3. **Rate** — grade A–F against the principles in `rules/principles.md`.
4. **Verify** — hand the diff to the `morpheus-validator` subagent for an independent grade.
5. **Loop** — if the grade is below **B** (or Morpheus rejects), repeat from step 1, up to
   a sane max (default 3 iterations). Report if it can't clear the bar and why.

## For larger scope — use the Workflow

When the target spans many files, run the orchestrated version, which fans out finders in
parallel and verifies each finding adversarially:

```
.claude/workflows/code-quality-loop.js
```

Invoke it via the Workflow tool (requires explicit opt-in for multi-agent orchestration).
It accepts the target path(s) as `args` and returns confirmed, graded findings.

## Gate

A change is "done" only when it clears grade ≥ B **and** survives Morpheus validation.
Never lower the bar silently — if you stop early, say so.
