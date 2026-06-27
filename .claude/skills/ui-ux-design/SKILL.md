---
name: ui-ux-design
description: >-
  Run the UI/UX design process — wireframes, detailed layouts, SVG wireframes, and
  high-fidelity styling — from a UX sitemap or feature brief. Use when the user asks to
  design screens, generate wireframes, lay out a UI, or style an interface. Ports the
  legacy ui_ux_chain and ui_conventions_guide.
---

# Skill: ui-ux-design

Ports `prompts/chains/ui_ux_chain.md` and `prompts/chains/ui_conventions_guide.md`.

## Components

1. **Wireframe generation** — low-fidelity wireframes for each view in the UX sitemap.
2. **Layout design** — component positioning, hierarchy, responsive breakpoints.
3. **SVG wireframes** — clean, well-organized SVG following design principles.
4. **UI styling** — transform low-fi wireframes into high-fidelity designs with consistent
   tokens (pull components/themes from the Chroma MCP server, `.claude/mcp.json`).

## Workflow

Wireframes → detailed layouts → SVG → styling → maintained design docs. For the
multi-agent interpretation pass (Layout → Style → Component → Design Director), use the
Workflow `.claude/workflows/ui-design-pipeline.js`.

## Standards (from ui_conventions_guide)

- Consistent spacing, clear hierarchy, responsive breakpoints.
- Atomic design: `atoms → molecules → organisms → templates → pages` (matches `src/components/`).
- Accessibility compliance and responsive design are success criteria, not extras.

## Output

Design artifacts under `deliverables/design/`; reusable components into `library/`.
