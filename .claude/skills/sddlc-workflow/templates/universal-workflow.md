# Universal SDDLC Workflow Template

Fill every `{{VARIABLE}}`. Keep the section order. Delete a section only if it
truly does not apply, and note why. The filled result is the workflow prompt.

---

# {{WORKFLOW_NAME}}

**SDDLC phase:** {{PHASE}}
**Pattern:** {{PATTERN}}  <!-- fan-out+synthesize | classify+act | adversarial-verify | generate+filter | tournament | loop-until-done | (composed) -->

## Goal
Build a workflow that {{OBJECTIVE}}.
**Definition of done:** {{SUCCESS_CRITERIA}}.

## Input
Operate over {{INPUT_SOURCE}} ({{INPUT_SHAPE}}).
Treat input as {{TRUST_LEVEL}} <!-- trusted | untrusted-quarantine -->.

## Decomposition
Split the work by {{DECOMPOSITION_KEY}} — spawn **one {{PRODUCER_ROLE}} agent
per {{UNIT_OF_WORK}}**. Each runs in {{ISOLATION}} <!-- its own clean context |
its own git worktree --> so that {{ISOLATION_REASON}}.
Before acting, dedupe against {{ALREADY_TRACKED}} so nothing is processed twice.

## Agent roles
{{ROLE_DEFINITIONS}}
<!-- Enumerate each role: name, single responsibility, tools/permissions. -->
**Separation of duties (required):** the {{PRODUCER_ROLE}} that
{{PRODUCER_ACTION}} MUST be a different agent from the {{VERIFIER_ROLE}} that
{{VERIFIER_ACTION}} — no agent verifies, judges, or scores its own output.
**Privilege boundary:** {{READER_ROLE}} agents may only {{READER_CAPABILITY}}
(classify/summarize); only the trusted {{ACTOR_ROLE}} may {{ACTOR_CAPABILITY}}
(route, reply, write, commit).

## Structured output
Every agent returns {{OUTPUT_SCHEMA}} <!-- the fields each agent must emit -->,
and every finding includes {{TRACEABILITY_FIELD}} <!-- exact source path / line
/ requirement ID / commit --> so every downstream claim links back to its origin.

## Orchestration / control flow
{{CONTROL_FLOW}}
<!-- Describe the sequence precisely, e.g.:
  - Sequential: stage A → stage B → stage C.
  - Concurrent fan-out: run all producer agents in parallel.
  - Barrier: a synthesis step waits for ALL producers before merging.
  - Pipeline: each unit flows producer→verifier independently, no barrier.
  - Bracket: pairwise comparison agents; a deterministic loop holds the order.
  - Loop: keep spawning attempts; only the loop counter stays in context. -->

## Verification
{{VERIFICATION_STRATEGY}}
<!-- e.g. one independent verifier per item; an N-vote adversarial panel that
defaults to "refuted" when uncertain; majority rule to confirm. -->

## Synthesis & output
{{SYNTHESIS_STEP}} <!-- how results merge: barrier merge / top-N filter /
ranked list / verified-only set --> and write the result to
**{{OUTPUT_ARTIFACT}}** in {{OUTPUT_FORMAT}}, with {{OUTPUT_TRACEABILITY}}
(every claim linked to its source).

## Termination
{{TERMINATION_CONDITION}}
<!-- A concrete stop: all producers returned | top-5 selected | bracket settled
| test green | K consecutive empty rounds | token budget exhausted. Never "when
it seems done". -->

## Human-in-the-loop
{{HITL}}
<!-- e.g. "Use AskUserQuestion to build the rubric / acceptance criteria BEFORE
any work starts." Set to "none" if fully autonomous. -->

---

## Variable glossary

| Variable | Meaning | Example |
|---|---|---|
| `WORKFLOW_NAME` | Short imperative title | "Requirements traceability audit" |
| `PHASE` | SDDLC phase | requirements / architecture / testing / security |
| `PATTERN` | Orchestration pattern (or composition) | "fan-out + adversarial-verify" |
| `OBJECTIVE` | What the workflow accomplishes | "verify every acceptance criterion is implemented" |
| `SUCCESS_CRITERIA` | How we know it's done & correct | "every AC mapped to code+test or flagged" |
| `INPUT_SOURCE` | Where inputs live | `./requirements/`, `./src`, a PR diff |
| `INPUT_SHAPE` | Form of input | "one markdown spec per feature" |
| `TRUST_LEVEL` | Trusted vs needs quarantine | untrusted-quarantine |
| `DECOMPOSITION_KEY` | Axis to split work | per feature / per file / per claim / per ticket |
| `UNIT_OF_WORK` | One item an agent owns | "one requirements file" |
| `PRODUCER_ROLE` | Agent that creates the artifact | "extractor", "implementer", "generator" |
| `PRODUCER_ACTION` | What the producer does | "extracts each requirement" |
| `VERIFIER_ROLE` | Agent that checks the artifact | "validator", "judge", "skeptic" |
| `VERIFIER_ACTION` | What the verifier does | "checks it against the code" |
| `READER_ROLE` / `READER_CAPABILITY` | Quarantined reader + allowed ops | "classifier" / "only summarize+label" |
| `ACTOR_ROLE` / `ACTOR_CAPABILITY` | Trusted actor + privileged ops | "router" / "route, reply, commit" |
| `ISOLATION` | Context boundary | "its own clean context" / "its own git worktree" |
| `ISOLATION_REASON` | Why isolation matters here | "files never cross-contaminate" |
| `ALREADY_TRACKED` | Dedup source | "the existing issue tracker" |
| `ROLE_DEFINITIONS` | Full role list w/ responsibilities & tools | — |
| `OUTPUT_SCHEMA` | Fields each agent returns | `{requirement_id, status, evidence, gaps}` |
| `TRACEABILITY_FIELD` | Provenance on each finding | `source_path`, `line`, `commit_sha` |
| `CONTROL_FLOW` | Exact sequential/concurrent structure | see Orchestration notes |
| `VERIFICATION_STRATEGY` | How findings are validated | "3-vote adversarial panel, majority confirms" |
| `SYNTHESIS_STEP` | How results combine | "barrier merge into one memo" |
| `OUTPUT_ARTIFACT` | Final file path | `./.neo/audits/traceability_memo.md` |
| `OUTPUT_FORMAT` | Format of the artifact | markdown / JSON / CSV |
| `OUTPUT_TRACEABILITY` | Linking rule in output | "every claim links to file:line" |
| `TERMINATION_CONDITION` | Concrete stop condition | "all features audited" / "test green" |
| `HITL` | Human checkpoints | "AskUserQuestion to set rubric first" |
