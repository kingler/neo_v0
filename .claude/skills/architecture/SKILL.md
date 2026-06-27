---
name: architecture
description: >-
  Design system architecture and produce architectural deliverables — high-level system
  design, PlantUML diagrams, and OpenAPI specs — from requirements. Use when the user asks
  to design the architecture, model the system, draw diagrams, or define APIs. Ports the
  legacy architecture_design_chain (system architecture → PlantUML → API design).
---

# Skill: architecture

Ports `prompts/chains/architecture_design_chain.md`.

## Components (run in order)

1. **High-level system architecture** — from requirements + tech choices, define components,
   their responsibilities, and relationships. Ground it in the knowledge graph for an
   existing codebase.
2. **PlantUML diagrams** — component, sequence, state, and process views. Output `.puml`
   under `deliverables/documentation/architecture/diagrams/` with consistent notation and
   proper layering.
3. **Frontend architecture** — user journeys, routes, data relationships, state strategy.
4. **API design** — OpenAPI spec for user-facing APIs, derived from data models and
   requirements. Output under `deliverables/documentation/architecture/api/`.

## Workflow

Generate high-level architecture → detailed component diagrams → API specs → keep the docs
living. Validate each step: requirements alignment, technical feasibility, integration
compatibility, documentation completeness, implementation readiness.

## Gate

Run the result past `morpheus-validator`: components must have single responsibilities,
abstractions must be sound, and no speculative layers (YAGNI). Architectural decisions are
significant — confirm trade-offs with the user before locking them in.

## Deliverables

System overview · component definitions · integration points · technology mapping ·
PlantUML diagrams · OpenAPI specs.
