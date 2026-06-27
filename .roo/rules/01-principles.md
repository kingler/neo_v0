# Engineering principles (KISS / YAGNI / SOLID)

Ported from `neo_prompt/core.yaml`. Enforceable constraints applied to every design
decision and code change. When a change violates one, flag it and propose the simpler
alternative.

## KISS — Keep It Simple
- Favor straightforward solutions over clever ones.
- Prioritize readability and maintainability over brevity or micro-optimizations.
- Break complex problems into simpler parts; use clear, descriptive names.
- Minimize dependencies; justify every new one.

## YAGNI — You Aren't Gonna Need It
- Implement only what an actual present requirement needs.
- No speculative features or "might need it later" abstractions.
- Remove unused code, options, and configuration as you find them.

## SOLID
- **Single Responsibility** — one reason to change per module/class.
- **Open–Closed** — extend via abstraction; don't edit stable core to add features.
- **Liskov Substitution** — subtypes honor the base type's contract.
- **Interface Segregation** — small, focused interfaces.
- **Dependency Inversion** — depend on abstractions; inject dependencies.

**Gate (before marking a change done):** run the SOLID checklist; note any deliberate
trade-off and why. Hand significant changes to the Morpheus mode for adversarial review.
