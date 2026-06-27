export const meta = {
  name: 'ui-design-pipeline',
  description: 'Interpret a UI brief through Layout -> Style -> Component agents, graded by a Design Director',
  phases: [
    { title: 'Layout', detail: 'structure & positioning per view' },
    { title: 'Style', detail: 'apply tokens & visual hierarchy' },
    { title: 'Component', detail: 'map to concrete components' },
    { title: 'Review', detail: 'Design Director grades; rework if below bar' },
  ],
}

// Port of the /init_ui_interpretation_chain from .cursorrules.md:
// Layout Agent -> Style Agent -> Component Agent -> Design Director (rework if grade < B).
// `args`: array of view names (from the UX sitemap), or a single brief string.
const views = Array.isArray(args) ? args : (args ? [args] : ['main'])

const DESIGN = {
  type: 'object',
  properties: {
    view: { type: 'string' },
    layout: { type: 'string', description: 'structure, regions, positioning, breakpoints' },
    style: { type: 'string', description: 'tokens, color, type scale, spacing, hierarchy' },
    components: {
      type: 'array',
      items: { type: 'string', description: 'concrete component (atomic-design level) used' },
    },
  },
  required: ['view', 'layout', 'style', 'components'],
}

const VERDICT = {
  type: 'object',
  properties: {
    grade: { type: 'string', description: 'A-F design quality grade' },
    pass: { type: 'boolean' },
    issues: { type: 'array', items: { type: 'string' } },
  },
  required: ['grade', 'pass'],
}

// Each view flows Layout -> Style -> Component -> Director independently (no barrier).
const results = await pipeline(
  views,
  view => agent(
    `LAYOUT AGENT. For the view "${view}", define structure: regions, component positioning, ` +
    `hierarchy, and responsive breakpoints. Follow prompts/chains/ui_conventions_guide.md.`,
    { label: `layout:${view}`, phase: 'Layout' }
  ),
  (layout, view) => agent(
    `STYLE AGENT. Apply visual styling to this layout for "${view}": design tokens, color, ` +
    `type scale, spacing, visual hierarchy. Prefer tokens from library/tailwind_var.json. ` +
    `Layout:\n${layout}`,
    { label: `style:${view}`, phase: 'Style' }
  ),
  (style, view) => agent(
    `COMPONENT AGENT. Map the styled "${view}" design to concrete components following atomic ` +
    `design (atoms -> molecules -> organisms -> templates). Reuse existing components from ` +
    `src/components/ and library/ where possible. Styled design:\n${style}`,
    { label: `component:${view}`, phase: 'Component', schema: DESIGN }
  ),
  (design, view) => agent(
    `DESIGN DIRECTOR. Grade this "${view}" design A-F on consistency, hierarchy, ` +
    `responsiveness, accessibility, and component reuse. pass=false if grade is below B. ` +
    `Design:\n${JSON.stringify(design)}`,
    { label: `review:${view}`, phase: 'Review', schema: VERDICT, agentType: 'morpheus-validator' }
  ).then(verdict => ({ view, design, verdict }))
)

phase('Review')
const passed = results.filter(Boolean).filter(r => r.verdict?.pass)
const reworkNeeded = results.filter(Boolean).filter(r => !r.verdict?.pass)

log(`${passed.length}/${results.filter(Boolean).length} views cleared grade B. ` +
    `${reworkNeeded.length} need rework.`)

return {
  views,
  passed: passed.map(r => ({ view: r.view, grade: r.verdict.grade })),
  rework: reworkNeeded.map(r => ({ view: r.view, grade: r.verdict?.grade, issues: r.verdict?.issues })),
  designs: results.filter(Boolean),
  // The orchestrator reworks below-B views (re-run from Layout) before finalizing.
}
