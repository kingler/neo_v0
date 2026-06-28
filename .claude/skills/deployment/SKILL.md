---
name: deployment
description: >-
  Set up CI/CD and deploy — build/test/deploy pipeline, staging and production releases.
  Use when the user asks to set up CI, configure a pipeline, deploy to staging/prod, or
  add release automation. Ports the legacy /setup-ci, /deploy-staging, /deploy-prod
  commands and the CI/CD pipeline_stages config.
---

# Skill: deployment

Ports the deployment commands in `neo_prompt/use_case_commands.yaml` and the
`pipeline_stages` in `neo_prompt/development_management.yaml`.

## Pipeline stages (from development_management.yaml)

1. **Build** — checkout → install deps → build → generate artifacts.
   Triggers: push to main, pull request, version tag.
2. **Test** — unit → integration → E2E → performance.
   Requirements: all tests pass, coverage thresholds met.
3. **Deploy** — staging first, then production behind a gate.

## Procedure

1. **Author the pipeline** as `.github/workflows/` jobs (build → test → deploy), gated on
   the test requirements above. Reuse the `testing` skill's suites.
2. **Staging** (`/deploy-staging`) — deploy on merge to main; smoke-test.
3. **Production** (`/deploy-prod`) — promote a passing staging build; require approval.
4. **Rollback** — keep the previous release recoverable (see `git.yaml` backup pattern:
   backup branch / last working commit).

## Standards & safety

- Secrets via repo/environment secrets — never hardcoded (mirror the secret-gated pattern
  in `.github/workflows/claude-code-review.yml`).
- A deploy is outward-facing and hard to reverse: confirm target and approval before prod.
- No deploy on red CI. The gate is not optional.
