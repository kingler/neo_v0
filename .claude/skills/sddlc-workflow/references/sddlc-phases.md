# SDDLC Phases → Agent Roles → Artifacts

Map a request to a phase, then use the default roles and artifacts as the
starting values for the universal template. Roles align with Neo's specialized
agents (see `neo_prompt/agents.yaml`); reuse those names where they fit.

| Phase | Default producer roles | Default verifier/judge | Typical input | Typical output artifact | Pattern that usually fits |
|---|---|---|---|---|---|
| **Requirements** | requirements analyst, product owner | Morpheus (challenge assumptions, value, AC clarity) | `./requirements/`, BRD/PRD | requirements spec, traceability matrix | fan-out + synthesize; adversarial-verify |
| **Architecture** | system architect | reviewer vs SOLID/YAGNI/KISS | design docs, ADRs | architecture decision records, diagrams | generate + filter; tournament (option ranking) |
| **System/UX/UI design** | UX designer, UI designer | design-critique agent | wireframes, design system | design specs, component map | generate + filter; fan-out |
| **Implementation** | code generator / implementer | code rater, code improver | feature spec, `./src` | code + change summary | fan-out (per module) in worktrees; loop-until-done |
| **Code review** | reviewer per dimension (bugs/perf/security) | adversarial skeptic panel | PR diff | review findings (verified-only) | adversarial-verify; fan-out |
| **Testing / QA** | test author, test runner | coverage/flake analyst | test suite, `./test` | test report, coverage gaps | fan-out; loop-until-done (flaky hunt) |
| **Security** | threat-model agent, scanner | exploit-verifier (refute findings) | code, deps, config | security findings, severity-ranked | adversarial-verify; fan-out |
| **Release / CI-CD** | pipeline agent | gate/checker | CI config, changelog | release notes, go/no-go | classify + act; fan-out |
| **Documentation** | doc generator | fact-checker vs codebase | `./docs`, code | docs, API reference | adversarial-verify; generate + filter |
| **Maintenance / triage** | classifier (quarantined) | — | issues, support inbox, logs | routed/triaged queue | classify + act (+ /loop) |

## Default role assignments (separation of duties)

- **Producer roles** create artifacts: analyst, architect, designer,
  implementer, generator, test author, doc generator.
- **Verifier/judge roles** must be *distinct* agents: Morpheus (final reasoner),
  code rater, reviewer, skeptic panel, fact-checker, coverage analyst.
- **Trusted actor** (the only one allowed outward actions — commit, route,
  reply, write to shared paths): keep this a single, separate agent in
  classify+act workflows.

## Default artifact locations
Write outputs under a workflow-scoped directory so runs don't clobber each
other, e.g. `./.neo/<phase>/<workflow-name>/<artifact>`. Confirm the path with
the user if they haven't specified one (it's structure-changing).

## Phase → invariant emphasis
- Requirements/Docs: **traceability** (every claim → source) matters most.
- Implementation/Maintenance: **isolation** (worktrees, quarantine) matters most.
- Review/Security/Testing: **producer ≠ verifier** and **adversarial voting**
  matter most — findings must survive an independent skeptic.
