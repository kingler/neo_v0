# Neo Harness Modernization Blueprint

> Porting the Neo SDLC Orchestra Leader from a Cline-era prompt-config harness to
> the modern Claude Code (`.claude`) + GitHub (`.github`) plugin architecture, tuned
> for Opus 4.8 / GPT‑5.6 class models.

## 1. Why modernize

Neo `v0` is a remarkably complete SDLC harness, but its intelligence is encoded in a
form the current generation of agentic harnesses cannot natively load:

| Today (Cline-era) | Problem |
|---|---|
| 152 slash commands in `neo_prompt/*.yaml` | Not discoverable by Claude Code; never injected into context |
| ~13 agents as `.xml` interface files | No runtime; purely descriptive prose |
| 7 workflow chains using `${fs.readFileSync(...)}` | Require a bespoke JS pre-processor to assemble |
| 80KB `.cursorrules.md` | Cursor-specific; ignored by Claude Code; too large to be effective as always-on context |
| Chroma vector DB + knowledge-graph scripts | Manual; not exposed to the agent as a tool or resource |
| Deliverable templates scattered across `prompts/chains/components/` | Not wired to any command the agent can invoke |

The modern harness gives us first-class primitives for **every one of these concepts**.
This blueprint maps each Neo primitive to its modern equivalent and ships a working
foundational scaffold under `.claude/` and `.github/`.

## 2. The mapping

| Neo primitive | Source (legacy) | Modern plugin | Lands at |
|---|---|---|---|
| **Identity, principles, project structure** | `neo_prompt/core.yaml`, `structure.yaml` | **Memory** | `.claude/CLAUDE.md` |
| **Behavioral constraints** (KISS/YAGNI/SOLID, edit format) | `.cursorrules.md`, `cline_intergration.yaml` | **Rules** | `.claude/rules/*.md` |
| **Slash commands** (`/init-project`, `/evaluate-code`, …) | `neo_prompt/commands.yaml`, `use_case_commands.yaml` | **Skills** | `.claude/skills/<name>/SKILL.md` |
| **Specialist agents** (Morpheus, product_owner, …) | `prompts/chains/components/agents/interfaces/*.xml` | **Subagents** | `.claude/agents/*.md` |
| **Multi-step chains** (code quality loop, requirements→deploy) | `prompts/chains/*.md` | **Workflows** | `.claude/workflows/*.js` |
| **Vector DB / component & theme retrieval** | `vectordb/`, `scripts/init_vector_db.py` | **MCP** (resources + tools) | `.claude/mcp.json` |
| **Knowledge graph of the codebase** | `scripts/generate_knowledge_graph.js` | **Knowledge** (generated artifact + SessionStart hook) | `.neo/` + `.claude/hooks/` |
| **Auto-run triggers** ("after /generate_structure run /validate_config") | YAML `triggers:` blocks | **Hooks** | `.claude/settings.json` + `.claude/hooks/*.sh` |
| **Deliverable templates** (BRD/PRD/SRS…) | `prompts/chains/components/` | **Skill-bundled resources** | `.claude/skills/requirements-doc/templates/` |
| **CI / validation / config schema checks** | `neo_prompt/ci_cd.yaml`, AJV rules | **GitHub Actions** | `.github/workflows/*.yml` |

### Primitive-by-primitive notes

**Skills** are the workhorse. A Neo "command" was a named prompt that expanded a chain.
A Skill is exactly that — a `SKILL.md` with frontmatter (`name`, `description`) whose body
is the procedure. The `description` is what the model reads to decide *when* to invoke,
so it must be trigger-rich. The 152 commands collapse into a much smaller set of skills
(many legacy commands are parameters of one skill, e.g. `/init-website` / `/init-webapp` /
`/init-mobile` → one `init-project` skill with a project-type argument).

**Subagents** replace the agent `.xml` files. Morpheus (the "ultimate reasoner/validator")
becomes a `code-reviewer`-style subagent invoked for adversarial validation. Specialists
(product_owner, system_architect, …) become subagents the orchestrator spawns for
focused, context-isolated work — which is strictly better than the legacy single-context
role-play because each gets its own window.

**Workflows** replace the `${fs.readFileSync}` chains. The legacy code-quality chain
(evaluate → improve → rate → regenerate until threshold) is a *loop with a quality gate* —
a perfect fit for a deterministic Workflow script that fans out finders, runs an
adversarial Morpheus verify pass, and loops until the grade clears. See
`.claude/workflows/code-quality-loop.js`.

**MCP** is how the Chroma vector DB stops being a dead artifact. Expose `vectordb/` through
a `chroma` MCP server so component/theme retrieval ("a primary button with an icon") is a
*tool call*, not a manual script. Knowledge-graph JSON is exposed as an MCP **resource**.

**Memory vs Rules vs Knowledge** — keep them distinct:
- *Memory* (`CLAUDE.md`): durable identity + how this repo works. Always in context. Keep it tight.
- *Rules*: enforceable constraints, referenced on demand, not bloating every turn.
- *Knowledge*: generated, queryable facts about the *current* codebase (the graph), refreshed by a hook.

**Hooks** turn Neo's implicit "trigger" YAML into real automation the harness executes
(not the model): a `SessionStart` hook ensures the knowledge graph is fresh; a
`PostToolUse` hook can re-validate config after edits.

## 3. What this PR ships (foundational scaffold)

```
.claude/
  CLAUDE.md                      # Memory: Neo identity, principles, repo map
  settings.json                  # Config: permissions + hook registration
  mcp.json                       # MCP: Chroma vectordb + knowledge-graph resource
  README.md                      # Index of the harness
  rules/
    principles.md                # KISS / YAGNI / SOLID enforcement
    code-edits.md                # Edit format & safety conventions
  agents/
    morpheus-validator.md        # Adversarial reasoner/validator subagent
  skills/
    init-project/SKILL.md        # /init-project (+ existing-project) port
    requirements-doc/SKILL.md     # BRD/PRD/SRS generation
    knowledge-graph/SKILL.md     # generate + query the code knowledge graph
    code-quality-loop/SKILL.md   # entry point to the quality workflow
  hooks/
    session-start.sh             # knowledge-graph freshness check
  workflows/
    code-quality-loop.js         # evaluate→improve→rate→verify loop
.roomodes                        # Roo custom modes: neo + morpheus
.roo/
  README.md                      # index + cross-harness mapping
  mcp.json                       # MCP: Chroma vectordb
  rules/                         # always-on workspace rules (principles, code-edits)
  rules-neo/                     # orchestrator mode instructions + command mapping
  rules-morpheus/                # validator mode instructions
.github/
  pull_request_template.md
  workflows/
    harness-validate.yml         # lint skills/rules/settings/.roomodes structure
    claude-code-review.yml       # optional Claude review on PRs
docs/
  HARNESS_MODERNIZATION.md       # this document
```

### Multi-harness parity

The same SDLC harness is expressed for three tools so the project works regardless of
which agent a contributor runs:

| Concept | `.claude/` (Claude Code) | `.roo/` (Roo Code) | `.github/` (CI) |
|---|---|---|---|
| Identity / memory | `CLAUDE.md` | mode `roleDefinition` + `rules/` | — |
| Rules | `rules/*.md` | `rules/*.md` | enforced in review workflow |
| Agents | `agents/*.md` subagents | `.roomodes` + `rules-<slug>/` | — |
| Skills / commands | `skills/*/SKILL.md` | command map in `rules-neo/` | — |
| MCP | `mcp.json` | `mcp.json` | — |
| Workflows | `workflows/*.js` | orchestrated by `neo` mode | — |
| Hooks | `hooks/` + `settings.json` | (no equivalent — manual) | Actions on PR/push |

`.roo` has no SessionStart-hook equivalent, so the knowledge-graph refresh that
`.claude/hooks/session-start.sh` automates is run manually by the `neo` mode. That is the
only capability that does not port 1:1.

These are **representative, working examples** — not an exhaustive port of all 152
commands. They establish the patterns and conventions so the remaining commands can be
ported mechanically. Section 5 is the backlog.

## 4. Design decisions

1. **Collapse, don't transliterate.** 152 commands → ~20 skills. Group by intent; push
   variants to arguments. A skill the model never picks is dead weight.
2. **Keep `CLAUDE.md` small.** It is injected every turn. Identity + principles pointer +
   repo map only. The 80KB of `.cursorrules.md` does *not* belong here — it becomes
   on-demand Rules and Skill bodies.
3. **Each specialist gets its own context.** Subagents, not in-context role labels.
4. **Quality gates are loops, not prose.** The "repeat until grade ≥ B" logic moves into a
   Workflow with a real counter and an adversarial verify stage.
5. **The vector DB becomes a tool.** No more "run this Python script first."
6. **Legacy configs stay as the source of truth** during migration. The scaffold references
   them; nothing is deleted until parity is proven.

## 5. Migration backlog

Done in this PR:

- [x] Port the core SDLC chains to skills: `architecture`, `ui-ux-design`, `backend-dev`,
  `testing`, `deployment` (alongside `init-project`, `requirements-doc`, `knowledge-graph`,
  `code-quality-loop`).
- [x] Port the design chain (Layout → Style → Component → Design Director) as the
  `ui-design-pipeline.js` Workflow.
- [x] Convert all 10 specialist `agents/interfaces/*.xml` to `.claude/agents/*.md` subagents
  (product-owner, ux-researcher, ux-designer, ui-designer, system-architect,
  frontend-developer, backend-developer, database-developer, system-admin, test-engineer),
  each mirrored as a Roo mode in `.roomodes`.

- [x] Add a `PostToolUse` hook (`validate-config.sh`) that validates JSON/YAML configs after
  Write/Edit — ports the legacy `validation_workflow` (yq/ajv) trigger.
- [x] Add a `security-review` CI gate (`.github/workflows/security-review.yml`) mirroring the
  `security_scan` stage in `ci_cd.yaml`: dependency scan (fail on critical), secret scan.
- [x] Make the Knowledge layer actually work: the legacy `generate_knowledge_graph.js` needs
  `@babel/parser`/`@babel/traverse`/`glob` (undeclared, uninstalled) and always failed in the
  SessionStart hook. Added a dependency-free `scripts/generate_knowledge_graph_lite.js` (Node
  built-ins only) producing the same artifacts; the hook now uses it and the graph regenerates
  successfully. Generated artifacts are gitignored.

- [x] Port the init variants (`init-frontend`/`init-backend`/`init-mobile` + `react-native`/
  `flutter`/`ios`/`android`) as a single consolidated `init-stack` skill with a layer argument
  (collapse-don't-transliterate).

- [x] Make the Chroma MCP integration real: the legacy `init_vector_db.py` assumed dict inputs
  (the `library/*.json` files are lists), needed langchain + an OpenAI key, and wrote
  per-collection dirs the MCP server can't serve — so all three stores held 0 embeddings. Added
  `scripts/index_vectordb.py` (chromadb + local embeddings, no key) that indexes 38 components +
  9 theme categories into the single `vectordb/storage` dir the server points at; fixed
  `mcp.json` and documented setup. (Live connection still needs `pip install chromadb` + a
  session restart — config/procedure verified, runtime not.)

Remaining:
- [ ] Replace remaining `${fs.readFileSync}` chains with Workflow scripts or skill-bundled resources.
- [ ] Remediate the pre-existing legacy-tree npm vulnerabilities (9 critical / 66 high as of this
  PR, all in `webpack-dev-server`/`ws`/etc.) via `npm audit fix`, then flip the `security-review`
  dependency-scan from advisory to blocking (remove `continue-on-error`).
- [ ] Retire `.cursorrules.md` once Skills + Rules reach parity (keep a thin Cursor shim if needed).

## 6. How to verify the scaffold

```bash
# Skills are discoverable
ls .claude/skills/*/SKILL.md

# Settings parse
python3 -c "import json;json.load(open('.claude/settings.json'))"
python3 -c "import json;json.load(open('.claude/mcp.json'))"

# In a Claude Code session, the skills appear and the SessionStart hook runs
```
