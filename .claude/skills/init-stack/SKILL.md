---
name: init-stack
description: >-
  Initialize a specific layer or platform of an app — frontend, backend, or mobile — with a
  chosen framework and its standard structure. Use when the user asks to set up/scaffold the
  frontend, backend, API, or a mobile app (React Native, Flutter, iOS, Android). Ports the
  legacy /init-frontend, /init-backend, /init-mobile, /init-react-native, /init-flutter,
  /init-ios, /init-android commands.
---

# Skill: init-stack

Ports the layer/platform initializers from `neo_prompt/use_case_commands.yaml`. This is the
focused, per-layer counterpart to the whole-project `init-project` skill — use it to add or
scaffold a single layer.

## Arguments

- **layer**: `frontend` | `backend` | `mobile`
- **framework**: the choice within that layer (see below)

Infer both from the request; ask only if genuinely ambiguous. Apply YAGNI — scaffold only
the pieces the project needs now (don't add auth/state libs nobody asked for).

## Frontend (`/init-frontend`)
Framework options: **React · Vue · Angular**. Standard setup:
- Component structure (atomic design: `atoms → molecules → organisms → templates → pages`)
- State management
- Routing system

Delegate the implementation to the `frontend-developer` subagent.

## Backend (`/init-backend`)
Framework options: **Node.js/Express · Python/Django · Java/Spring**. Standard setup:
- API structure
- Database models
- Authentication system

Delegate to the `backend-developer` (and `database-developer` for the data layer) subagents.

## Mobile (`/init-mobile`)
Workflow: setup mobile framework → configure native modules → initialize state management →
setup build pipeline. Platform options:
- **React Native** — RN config, native modules, navigation
- **Flutter** — Flutter config, widget structure, state management
- **iOS** (native) · **Android** (native)

## After scaffolding

1. **Validate** generated config (the `validate-config.sh` PostToolUse hook checks JSON/YAML).
2. **Refresh the knowledge graph** (`knowledge-graph` skill) so the new layer is mapped.
3. **Gate** significant code through `code-quality-loop` + `morpheus-validator`.
