---
name: sddlc-workflow
description: >-
  Generate multi-agent orchestration workflows for any phase of the software
  design & development lifecycle (SDDLC). Use when the user wants to "build a
  workflow", "orchestrate agents", "fan out subagents", or run a multi-step
  SDDLC process (requirements, architecture, design, implementation, code
  review, testing, security, release, docs) as a sequence of sequential and
  concurrent agents. Produces a ready-to-run workflow prompt from a universal
  template with variables, and can optionally execute it via the Workflow tool.
---

# SDDLC Multi-Agent Workflow Generator

This skill turns a plain-English request into a precise, runnable **multi-agent
workflow** for a software design & development lifecycle (SDDLC) task. It does
this by (1) picking an **orchestration pattern**, (2) filling a **universal
template** with the variables for the user's situation, and (3) optionally
executing the result with the `Workflow` tool.

The output is a workflow prompt in the same shape as the canonical examples in
`examples/canonical-workflows.md` — a structured spec that decomposes work
across agents, isolates contexts, enforces producer/verifier separation, emits
structured + traceable output, and terminates on a clear condition.

## When to use

Invoke when the request implies orchestrating **more than one agent** over an
SDDLC artifact or process. Triggers: "build/create a workflow", "fan out", "one
agent per X", "spawn subagents", "have a separate agent verify", "loop until",
"tournament/rank", "triage and route", "synthesize", "due diligence".

If the task is a single-shot edit or question, do **not** use this skill —
just do the work.

## How to run it (procedure)

1. **Identify the SDDLC phase.** Map the request to a phase using
   `references/sddlc-phases.md` (requirements, architecture/design, UX/UI,
   implementation, code review, testing/QA, security, release/CI-CD, docs,
   maintenance). The phase determines the default agent roles and artifacts.

2. **Pick the orchestration pattern.** Match the request to one of the six
   patterns in `references/patterns.md`:
   - **fan-out + synthesize** — independent work per unit, then a barrier merge.
   - **classify + act** — quarantined classifiers route to trusted actors.
   - **adversarial verification** — producer agent ≠ verifier agent, per claim.
   - **generate + filter** — generator brainstorms, separate judge scores/culls.
   - **tournament** — pairwise comparison bracket, then re-check the top seeds.
   - **loop until done** — keep spawning attempts until a condition is met.
   Patterns compose; a real workflow is often "fan-out → adversarial verify →
   synthesize". When unsure, default to fan-out + synthesize.

3. **Gather the variables.** Fill every `{{VARIABLE}}` in
   `templates/universal-workflow.md`. If a variable that changes the structure
   is unknown — the input location, the decomposition key, the rubric, the
   termination condition, or the output artifact path — ask the user with
   `AskUserQuestion` **before** generating. Do not invent a rubric or a stop
   condition; those are the user's to set. Sensible defaults (isolation = clean
   context, output schema = structured JSON with source paths) can be assumed
   and stated.

4. **Enforce the non-negotiable invariants** (see below). These are what make a
   workflow trustworthy rather than a fan-out of rubber stamps.

5. **Emit the filled template** as the workflow prompt. Then ask whether to
   **execute** it now via the `Workflow` tool (translate each template section
   into `agent()` / `parallel()` / `pipeline()` calls) or hand it back as a
   prompt the user can run later.

## Non-negotiable invariants

These hold for every generated workflow regardless of pattern:

- **Context isolation.** Each fan-out agent runs in its own clean context (or a
  git worktree when agents mutate files in parallel) so inputs never
  cross-contaminate and parallel edits never collide.
- **Producer ≠ verifier.** The agent that produces an artifact (a claim, an
  idea, a ranking, a fix) is never the agent that verifies/judges/scores it.
  No agent grades its own work.
- **Least privilege / quarantine.** Agents that read untrusted input (tickets,
  emails, web pages, third-party files) may only classify and summarize — never
  take outward actions. A separate trusted agent performs routing, replies,
  writes, or commits.
- **Traceability.** Every finding carries its exact provenance — source file
  path, line, requirement ID, or commit — so claims in the final artifact link
  back to where they came from.
- **Structured returns.** Subagents return validated structured output (a
  schema), not prose, so downstream steps and the synthesis barrier can consume
  them deterministically.
- **Explicit termination.** Loops state their stop condition (a count, a
  green test, a dry round, a budget) — never "until it feels done".
- **Right concurrency primitive.** Use a **barrier** (wait-for-all) only when a
  step genuinely needs every prior result at once (merge, dedup, zero-check);
  otherwise use a **pipeline** so each item flows through stages without waiting
  on its siblings.

## Reference files

- `templates/universal-workflow.md` — the master template + variable glossary.
- `references/patterns.md` — the six orchestration patterns, when to use each,
  and the variable presets that specialize the universal template to each.
- `references/sddlc-phases.md` — phase → agent roles → typical artifacts.
- `examples/canonical-workflows.md` — worked examples in the target output shape.

## Output contract

A generated workflow always contains, in order: **Goal → Input → Decomposition
→ Agent roles (with producer/verifier separation called out) → Structured
output schema → Orchestration/control-flow → Verification → Synthesis & output
artifact → Termination → Human-in-the-loop**. Omit a section only when it
genuinely does not apply, and say so.
