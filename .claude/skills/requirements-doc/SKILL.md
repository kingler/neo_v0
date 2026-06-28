---
name: requirements-doc
description: >-
  Generate SDLC requirements deliverables — BRD, PRD, SRS, FRD, DBRD — from a project
  brief or an existing codebase. Use when the user asks for a requirements document, a
  product/business spec, or wants to formalize what a project should do. Ports the legacy
  requirements chain and document_management.yaml templates.
---

# Skill: requirements-doc

Ports `neo_prompt/requirements_gathering_prompt.*`, `documentation_management.yaml`, and
`prompts/chains/components/requirements/`.

## Supported documents

| Doc | Purpose |
|---|---|
| **BRD** | Business Requirements — goals, stakeholders, success metrics |
| **PRD** | Product Requirements — features, user stories, acceptance criteria |
| **SRS** | Software Requirements Spec — functional + non-functional requirements |
| **FRD** | Functional Requirements — detailed behavior per feature |
| **DBRD** | Database Requirements — entities, relationships, constraints |

## Procedure

1. **Gather inputs.** Read the project brief; if onboarding, generate/read the
   knowledge graph first to ground requirements in what exists.
2. **Pick the document(s).** Ask if unclear which deliverable is wanted.
3. **Draft** using the template structure (see `templates/` once populated; until then,
   follow the standard section layout for each doc type).
4. **Apply Morpheus gates** — every requirement must have clear, testable acceptance
   criteria and demonstrable business value (YAGNI: cut speculative requirements).
5. **Write** to `deliverables/documentation/product/<DOC>.md`.
6. **Cross-link** — PRD references BRD goals; SRS traces to PRD features.

## Quality bar

- Each requirement is atomic, testable, and traceable to a business goal.
- No requirement without acceptance criteria.
- Flag conflicts/ambiguities for the user rather than inventing answers.

> Migration note: the legacy BRD/PRD/SRS markdown templates live under
> `prompts/chains/components/requirements/` — copy them into this skill's `templates/`
> directory to bundle them with the skill.
