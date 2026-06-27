---
name: testing
description: >-
  Generate and run tests — unit tests across frameworks and performance tests — and
  validate coverage. Use when the user asks to write tests, add coverage, set up a test
  suite, or do performance testing. Ports the legacy testing_chain.
---

# Skill: testing

Ports `prompts/chains/testing_chain.md` and `neo_prompt/testing.yaml`.

## Components

1. **Unit test generator** — comprehensive unit tests for components/functions. Detect the
   framework from the repo (Jest, Pytest, Mocha, Vitest) rather than assuming.
2. **Performance testing** — perf test docs + scripts that validate the app meets its
   performance requirements.

## Workflow

Generate unit tests → create performance tests → execute suites → analyze results →
maintain test docs.

## Standards

- **Unit:** test isolation, clear cases, comprehensive coverage of meaningful paths and
  edges, maintainable.
- Cover the behavior, not the implementation detail. A test that can't fail is noise (YAGNI).

## Success criteria

Complete coverage of meaningful paths · performance validated · suites runnable in CI ·
clear, maintained test docs. Wire suites into `.github/workflows/` so they gate PRs.

## Gate

A change isn't done until its tests pass and `morpheus-validator` confirms the coverage is
real — not just green for the happy path.
