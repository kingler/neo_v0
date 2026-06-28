# Orchestration Patterns

Six base patterns. Each entry gives: when to reach for it, the control flow,
and the variable presets that specialize `templates/universal-workflow.md`.
Patterns compose — most real SDDLC workflows chain two or three.

---

## 1. Fan-out + synthesize
**Use when** independent units can be processed in parallel and you need a
single merged deliverable. (Due-diligence, codebase audit, multi-module
analysis, requirements coverage.)

**Control flow:** spawn one producer per unit concurrently → **barrier** waits
for all → one synthesis agent merges into the output artifact.

**Presets:**
- `PATTERN` = fan-out + synthesize
- `ISOLATION` = its own clean context · `ISOLATION_REASON` = files never cross-contaminate
- `CONTROL_FLOW` = concurrent fan-out, then a barrier synthesis step that waits for all producers
- `SYNTHESIS_STEP` = barrier merge; `OUTPUT_TRACEABILITY` = every claim links to its source path
- Barrier is justified here: synthesis needs every result at once.

## 2. Classify + act
**Use when** a stream of incoming items must be triaged and routed, and some
input is untrusted. (Support inbox, bug triage, incoming-issue routing, log
triage.)

**Control flow:** quarantined classifier reads + labels each item (no actions),
dedupes against what's tracked → handoff → separate **trusted** actor routes /
replies / files. Pair with `/loop` to keep clearing the queue.

**Presets:**
- `TRUST_LEVEL` = untrusted-quarantine
- `READER_ROLE`/`READER_CAPABILITY` = classifier / only classify + summarize, never act
- `ACTOR_ROLE`/`ACTOR_CAPABILITY` = router / route, reply, file — the only privileged agent
- `ALREADY_TRACKED` = the issue tracker / existing tickets
- `TERMINATION_CONDITION` = queue empty (or looped continuously via /loop)

## 3. Adversarial verification
**Use when** claims/artifacts must be checked by something other than their
author before shipping. (Spec-vs-code, doc fact-check, PR claim verification,
acceptance-criteria validation.)

**Control flow:** one extractor pulls each claim into its own item → for each
claim, spawn a separate verifier that checks it against ground truth. Verifier
≠ extractor. Return the list of claims that FAILED with the exact reason.

**Presets:**
- `PRODUCER_ROLE` = extractor; `VERIFIER_ROLE` = verifier (distinct agent, required)
- `VERIFICATION_STRATEGY` = each claim checked against {{GROUND_TRUTH}}; flag any that don't hold
- `OUTPUT_SCHEMA` = `{claim, verdict, reason, source}`; output = only the failures + why

## 4. Generate + filter
**Use when** you want breadth then a quality cut, and the judge must not grade
its own ideas. (Naming/options brainstorm, design-alternative generation, test-
case generation, API-shape options.)

**Control flow:** one generator produces many options → a separate judge scores
all against a rubric, dedupes near-duplicates, returns top-N with one-line
reasons.

**Presets:**
- `PRODUCER_ROLE` = generator; `VERIFIER_ROLE` = judge (distinct)
- `HITL` = AskUserQuestion to build the scoring rubric before generation if not given
- `TERMINATION_CONDITION` = top-N selected; `OUTPUT_SCHEMA` = `{option, score, one_line_reason}`

## 5. Tournament
**Use when** ranking is more reliable via pairwise comparison than cold
scoring. (Résumé/candidate ranking, design-option ranking, prioritizing a
backlog, choosing among refactors.)

**Control flow:** a deterministic loop holds the bracket (only running order
stays in context); each head-to-head match is its own comparison agent. After
the bracket settles, fresh agents double-check the top seeds against the rubric
and flag anyone ranked too high.

**Presets:**
- `HITL` = use AskUserQuestion to build the rubric before any comparing starts
- `CONTROL_FLOW` = pairwise comparison agents under a deterministic bracket loop
- `VERIFICATION_STRATEGY` = fresh agents re-check the top-K against the same rubric

## 6. Loop until done
**Use when** the number of attempts is unknown and you stop on a condition, not
a count. (Hunt a flaky test, converge a fix, search for a repro, harden until
no findings.)

**Control flow:** keep forming theories / attempts, each tested in its own
isolated worktree; loop with no fixed pass count until the condition is met.

**Presets:**
- `ISOLATION` = its own git worktree (parallel attempts mutate files)
- `TERMINATION_CONDITION` = the concrete win (e.g. "one theory reproduces the failure, the fix lands, and the test is green") — never a guess
- Beware infinite loops: also bound by a token budget or max rounds as a backstop.

---

## Composition guide
Chain patterns by feeding one's output into the next:
- **fan-out → adversarial-verify → synthesize**: audit each module, verify each
  finding with an independent skeptic, merge survivors into one report.
- **generate → tournament → verify**: brainstorm options, rank pairwise, re-check the winner.
- **classify → fan-out → act**: triage, process each class in parallel, hand to a trusted actor.

When composing, restate the invariants at each boundary (isolation, producer ≠
verifier, traceability carries through).
