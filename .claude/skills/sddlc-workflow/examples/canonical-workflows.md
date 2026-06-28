# Canonical Workflow Examples

The target output shape. The first six are the base patterns (lightly
normalized). The last two show the universal template filled in for SDDLC
tasks — that's what this skill produces.

---

## A. Fan-out + synthesize (due diligence)
Build a workflow that does due diligence on the data room in `./data_room` by
spawning **one subagent per folder**, each in its own clean context so the files
never cross-contaminate. Every agent returns a structured summary with the exact
source path for each finding. Then run a **barrier synthesis** step that waits
for all of them to finish and merges their outputs into one due-diligence memo at
`./focus/due_diligence_memo.md`, where every claim links back to the file it
came from.

## B. Classify + act (support triage)
Build a workflow that triages the support inbox in `./support_tickets` by
spawning a **classifier** agent that reads each ticket and routes it to a bug /
refund / lead / spam handler, deduping against what's already tracked before any
handler acts. **Quarantine** the reading agents so the ones touching untrusted
ticket text can only classify and summarize — never take action — and hand
everything off to a separate **trusted** agent that does the actual routing and
replies. Pair it with `/loop` so it keeps clearing the queue as new tickets land.

## C. Adversarial verification (claim check)
Create a workflow to go through the blog-post draft in `./draft.md` and verify
every factual and technical claim before shipping. One agent **extracts** each
claim into its own item; then for every claim spin off a **separate** agent that
checks it against the real source in `./codebase` and flags any claim that
doesn't hold up. The verifier MUST be a different agent from the extractor, so
it isn't rubber-stamping its own work. Return the list of claims that failed and
the exact reason each one failed.

## D. Generate + filter (titles)
Create a workflow to brainstorm 40 blog titles / headline angles for the topic
in `./topic.md` with one **generator** agent, then hand them all to a separate
**judge** agent that scores every option against a rubric for hook strength,
clarity, and curiosity, dedupes near-identical phrasing, and returns only the
top five with a one-line reason each. Generator and judge must be different
agents so the judge isn't grading its own ideas.

## E. Tournament (ranking)
Create a workflow to rank every résumé in `./resumes` for the backend-engineer
role by running a **tournament of pairwise comparisons** against a rubric
instead of scoring each one cold. Each head-to-head match is its own comparison
agent and a deterministic loop holds the bracket so only the running order stays
in context. Once the bracket settles, spin off fresh agents to double-check the
top 10 against the same rubric and flag anyone ranked higher than they should
be. First, use a question tool to build the rubric before any comparing starts.

## F. Loop until done (flaky test)
Build a workflow that hunts down a flaky test in `./test` that fails maybe 1 in
50 runs: keep forming theories about the cause and adversarially testing each
one in its own isolated worktree, looping and spawning new attempts with **no
fixed pass count** until the loop condition is met — one theory reproduces the
failure, fixes it, and makes the test pass clean. Do not stop until one theory
works and the test is green.

---

## G. Worked SDDLC example — Requirements traceability audit
*(fan-out + adversarial-verify + synthesize)*

**Goal.** Build a workflow that verifies every acceptance criterion in
`./requirements/` is implemented in `./src` and covered by a test — done when
every AC is mapped to code + test or explicitly flagged as a gap.

**Decomposition.** Spawn **one analyst agent per requirements file**, each in
its own clean context so specs don't cross-contaminate. Each extracts its ACs
with `{requirement_id, text, source_path, line}`.

**Agent roles.** Analyst (extracts ACs) → for each AC, a **separate verifier**
searches `./src` and `./test` for implementing code and covering tests. The
verifier MUST differ from the analyst. A trusted **synthesizer** owns the final
write.

**Orchestration.** Concurrent fan-out over files; each AC flows analyst→verifier
as a **pipeline** (no barrier — an AC's verification doesn't wait on its
siblings). A final **barrier** collects all verdicts before synthesis.

**Verification.** Each "implemented" verdict is confirmed by a 2nd skeptic that
defaults to "unmet" unless it can point to the exact `file:line` of evidence.

**Synthesis & output.** Merge into a traceability matrix at
`./.neo/requirements/traceability_matrix.md` — every row links AC → code → test
or shows the gap.

**Termination.** All requirements files audited and every AC has a verdict.

**Human-in-the-loop.** None; criteria come from the spec.

## H. Worked SDDLC example — Architecture option selection
*(generate + filter + tournament)*

**Goal.** Choose an architecture for the feature in `./feature_requests/X.md`.
Done when a single recommended option ships with rationale and runner-up notes.

**Human-in-the-loop (first).** Use `AskUserQuestion` to build the scoring rubric
(e.g. simplicity, scalability, team familiarity, cost) before any work.

**Decomposition / roles.** One **generator** drafts 6 candidate architectures
(each with diagram sketch + tradeoffs). A separate **judge panel** runs a
pairwise **tournament** under a deterministic bracket loop; each match is its
own comparison agent scoring against the rubric. Generator ≠ judges.

**Verification.** After the bracket settles, fresh **reviewer** agents re-check
the top 2 against SOLID/YAGNI/KISS (per Morpheus's mandate) and flag overrating.

**Synthesis & output.** Write the recommended ADR to
`./.neo/architecture/ADR-<feature>.md`, with the runner-up and why it lost.

**Termination.** Bracket settled and top option re-verified.
