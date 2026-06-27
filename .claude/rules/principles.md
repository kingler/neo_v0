# Rule: Engineering principles (KISS / YAGNI / SOLID)

Ported from `neo_prompt/core.yaml`. These are enforceable constraints, applied to every
design decision and code change. When a change violates one, flag it and propose the
simpler alternative.

## KISS — Keep It Simple
- Favor straightforward solutions over clever ones.
- Prioritize readability and maintainability over brevity or performance micro-wins.
- Break complex problems into simpler parts; use clear, descriptive names.
- Minimize dependencies. Justify every new one.

**Gate:** Can a competent engineer understand this in one read? If not, simplify.

## YAGNI — You Aren't Gonna Need It
- Implement only what is currently required by an actual requirement.
- No speculative features, no "we might need it later" abstractions.
- Remove unused code, options, and configuration as you find them.

**Gate:** Is there a concrete, present need for this code path? If not, drop it.

## SOLID
- **Single Responsibility** — each module/class has one reason to change.
- **Open–Closed** — extend via abstraction; avoid editing stable core code to add features.
- **Liskov Substitution** — subtypes honor their base type's contract.
- **Interface Segregation** — small, focused interfaces; no fat ones clients half-use.
- **Dependency Inversion** — depend on abstractions; inject dependencies.

**Gate (before marking a change done):** run the SOLID checklist; note any deliberate
trade-off and why.

## How Morpheus uses these

The `morpheus-validator` subagent challenges proposed solutions against these gates:
question assumptions, challenge complexity, verify business value, prevent premature
optimization. A change that can't survive that review isn't ready.
