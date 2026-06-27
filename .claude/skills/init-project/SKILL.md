---
name: init-project
description: >-
  Initialize a new project or onboard an existing one into Neo's SDLC orchestration.
  Use when the user wants to start a new project, scaffold a website/webapp/mobile app,
  or set Neo up on an existing codebase. Handles structure creation, knowledge-graph
  generation, context setup, and git init. Ports legacy /init-project,
  /init-existing-project, /init-website, /init-webapp, /init-mobile.
---

# Skill: init-project

Ports the legacy initialization commands from `neo_prompt/use_case_commands.yaml` and the
`/init_project` / `/init_existing_project` flows in `.cursorrules.md`.

## Arguments

- **mode**: `new` (default) or `existing`
- **project-type**: `website` | `webapp` | `mobile` | `library` (new mode only)

Infer these from the request; ask only if genuinely ambiguous.

## Procedure — new project

1. **Confirm scope.** Project type, primary stack, and the one-line goal. Apply YAGNI:
   don't scaffold features nobody asked for.
2. **Create structure** per `neo_prompt/structure.yaml`:
   `docs/`, `src/`, `tests/`, `config/`, `deliverables/`.
3. **Scaffold the stack** (examples):
   - website → static generator + build + content + deploy
   - webapp → frontend framework + API + DB + auth (each only if needed now)
   - mobile → react-native / flutter / native shell
4. **Generate the knowledge graph** — invoke the `knowledge-graph` skill.
5. **Initialize context** — `.context/` (index.md with YAML front matter) + memory note.
6. **Init git** with a sensible `.gitignore` (node_modules, dist, .env, .DS_Store).
7. **Summarize** what was created and the suggested next command (usually requirements).

## Procedure — existing project

1. **Generate the knowledge graph** first (`knowledge-graph` skill) — understand before acting.
2. **Audit**: structure, stack, test coverage, obvious risks. Produce an audit summary.
3. **Backfill docs**: offer to generate a BRD/PRD (`requirements-doc` skill) from inferred intent.
4. **Map to SDLC**: surface gaps as feature requests in `feature_requests/` and bugs in
   `backlog/bug_issues.yaml`.
5. **Validate** any generated config (schema/AJV) before finishing.

## Notes

- Each phase that warrants focused, isolated work can be delegated to a subagent.
- Run the result past `morpheus-validator` if architectural decisions were made.
