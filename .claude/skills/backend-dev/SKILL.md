---
name: backend-dev
description: >-
  Implement the backend — database schema, server, and APIs — from an architecture/API
  spec. Use when the user asks to build the backend, generate a server, create a database
  schema, or implement API endpoints. Ports the legacy backend_development_chain.
---

# Skill: backend-dev

Ports `prompts/chains/backend_development_chain.md`.

## Components

1. **Database generator** — schema + seed data from app requirements (legacy default:
   PostgreSQL). Schema design, validation, query optimization, migrations.
2. **Backend generator** — production-ready server (legacy default: Express) with DB
   operations, auth, and real-time features.
3. **API implementation** — REST endpoints + WebSocket events per the OpenAPI/AsyncAPI
   spec produced by the `architecture` skill.

## Workflow

DB schema + seed → server implementation → APIs + real-time → auth & security → monitoring
& logging.

## Standards

- **Server:** clean architecture, error handling, auth, request validation, response formatting.
- **Database:** schema design, data validation, query optimization, migrations, seed data.
- **API:** REST best practices, WebSocket patterns, error handling, rate limiting, docs.

## Gate

Significant backend changes go through the `code-quality-loop` and `morpheus-validator`.
Integrates with the architecture, code-quality, testing, and documentation skills.

> Stack note: PostgreSQL/Express are the legacy defaults — confirm the actual target stack
> against the project before scaffolding (KISS/YAGNI: don't add real-time or auth nobody asked for).
