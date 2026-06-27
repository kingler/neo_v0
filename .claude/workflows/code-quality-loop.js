export const meta = {
  name: 'code-quality-loop',
  description: 'Evaluate, improve, and adversarially verify code quality until it clears a grade gate',
  phases: [
    { title: 'Evaluate', detail: 'parallel finders surface issues per dimension' },
    { title: 'Verify', detail: 'Morpheus adversarially grades each finding' },
    { title: 'Report', detail: 'synthesize confirmed, graded findings' },
  ],
}

// Port of prompts/chains/code_quality_chain.md (evaluate -> improve -> rate -> generate).
// Targets come in via `args`: a path string or array of paths. Defaults to the whole repo.
const targets = Array.isArray(args) ? args : (args ? [args] : ['src/'])

const DIMENSIONS = [
  { key: 'correctness', prompt: 'bugs, logic errors, unhandled edge cases, broken contracts' },
  { key: 'solid',       prompt: 'SOLID violations: god modules, leaky abstractions, fat interfaces' },
  { key: 'yagni-kiss',  prompt: 'unnecessary complexity, speculative/dead code, over-abstraction' },
  { key: 'tests',       prompt: 'missing or weak test coverage on meaningful paths' },
]

const FINDINGS = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'string' },
          issue: { type: 'string' },
          fix: { type: 'string' },
        },
        required: ['file', 'issue', 'fix'],
      },
    },
  },
  required: ['findings'],
}

const VERDICT = {
  type: 'object',
  properties: {
    isReal: { type: 'boolean' },
    grade: { type: 'string', description: 'A-F quality grade for this finding' },
    rationale: { type: 'string' },
  },
  required: ['isReal', 'grade', 'rationale'],
}

const scope = targets.join(', ')

// Pipeline: each dimension is evaluated, then its findings are verified as soon as that
// dimension's evaluation completes — no barrier between evaluate and verify.
const results = await pipeline(
  DIMENSIONS,
  d => agent(
    `Evaluate the code under: ${scope}. Focus ONLY on this dimension: ${d.prompt}. ` +
    `Apply the principles in .claude/rules/principles.md. Cite file:line for each issue.`,
    { label: `evaluate:${d.key}`, phase: 'Evaluate', schema: FINDINGS }
  ),
  (review, d) => parallel((review?.findings || []).map(f => () =>
    agent(
      `Act as Morpheus (.claude/agents/morpheus-validator.md). Adversarially verify this ` +
      `finding and grade it A-F. Default to isReal=false if you cannot confirm it from the ` +
      `actual code. Finding: ${JSON.stringify(f)}`,
      { label: `verify:${f.file}`, phase: 'Verify', schema: VERDICT, agentType: 'morpheus-validator' }
    ).then(v => ({ ...f, dimension: d.key, verdict: v }))
  ))
)

phase('Report')
const confirmed = results
  .flat()
  .filter(Boolean)
  .filter(x => x.verdict?.isReal)

log(`Confirmed ${confirmed.length} real findings across ${DIMENSIONS.length} dimensions.`)

return {
  scope: targets,
  confirmedCount: confirmed.length,
  findings: confirmed,
  // The orchestrator applies fixes for grade-D/F findings, then re-runs to confirm the gate.
}
