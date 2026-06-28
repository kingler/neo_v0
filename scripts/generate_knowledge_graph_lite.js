#!/usr/bin/env node
// Lightweight, dependency-free code knowledge-graph generator.
//
// The original scripts/generate_knowledge_graph.js relies on @babel/parser,
// @babel/traverse and glob — none of which are declared dependencies, so it cannot run
// without an extra install. A SessionStart hook must be self-contained, so this generator
// uses only Node built-ins (fs/path) and a regex import scan. It produces the same
// artifacts: code-knowledge-graph.json (nodes + edges) and .neo/knowledge-graph-meta.json.
//
// For a richer AST-based graph, install the babel deps and run the original generator.

const fs = require('fs');
const path = require('path');

const SOURCE_DIRS = ['src', 'components', 'pages'];
const EXTS = ['.ts', '.tsx', '.js', '.jsx'];
const RESOLVE_EXTS = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx', '/index.js', '/index.jsx'];

// import ... from 'x'  |  export ... from 'x'  |  require('x')  |  import('x')
const IMPORT_RE = /(?:import|export)[^'"]*?from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)|import\(\s*['"]([^'"]+)['"]\s*\)/g;

function walk(dir, out = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
      walk(full, out);
    } else if (EXTS.includes(path.extname(e.name))) {
      out.push(full);
    }
  }
  return out;
}

function extractImports(file) {
  let src;
  try { src = fs.readFileSync(file, 'utf-8'); } catch { return []; }
  const specs = [];
  let m;
  while ((m = IMPORT_RE.exec(src)) !== null) {
    specs.push(m[1] || m[2] || m[3]);
  }
  return specs;
}

// Resolve a relative import spec to an actual file in the set; null if external/unresolved.
function resolveRelative(fromFile, spec, fileSet, root) {
  if (!spec.startsWith('.')) return null; // bare specifier → external
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const ext of RESOLVE_EXTS) {
    const candidate = path.normalize(base + ext);
    const rel = path.relative(root, candidate);
    if (fileSet.has(rel)) return rel;
  }
  return null;
}

function isComponentFile(file) {
  // Heuristic: a .tsx/.jsx file, or one whose basename is PascalCase.
  const ext = path.extname(file);
  const name = path.basename(file, ext);
  return ext === '.tsx' || ext === '.jsx' || /^[A-Z][A-Za-z0-9]*$/.test(name);
}

function main() {
  const root = process.argv[2] || process.cwd();
  const files = SOURCE_DIRS.flatMap(d => walk(path.join(root, d)))
    .map(f => path.relative(root, f));
  const fileSet = new Set(files);

  const nodes = [];
  const edges = [];
  let externalCount = 0;
  let componentCount = 0;

  for (const file of files) {
    const abs = path.join(root, file);
    const imports = extractImports(abs);
    const internal = [];
    const external = [];
    for (const spec of imports) {
      const resolved = resolveRelative(abs, spec, fileSet, root);
      if (resolved) {
        internal.push(resolved);
        edges.push({ from: file, to: resolved });
      } else if (spec.startsWith('.')) {
        external.push(spec); // relative but unresolved (e.g. asset, alias)
      } else {
        external.push(spec); // bare/external package
        externalCount++;
      }
    }
    const isComponent = isComponentFile(file);
    if (isComponent) componentCount++;
    nodes.push({
      id: file,
      type: isComponent ? 'component' : 'module',
      dependencies: internal,
      externalDependencies: [...new Set(external)],
      fanOut: internal.length,
    });
  }

  // fan-in per node (how many internal files import it)
  const fanIn = {};
  for (const e of edges) fanIn[e.to] = (fanIn[e.to] || 0) + 1;
  for (const n of nodes) n.fanIn = fanIn[n.id] || 0;

  const graph = { generatedWith: 'generate_knowledge_graph_lite.js', root, nodes, edges };

  const stats = {
    files: files.length,
    edges: edges.length,
    components: componentCount,
    modules: files.length - componentCount,
    externalImports: externalCount,
    mostDependedOn: [...nodes].sort((a, b) => b.fanIn - a.fanIn).slice(0, 5).map(n => `${n.id} (${n.fanIn})`),
    highestFanOut: [...nodes].sort((a, b) => b.fanOut - a.fanOut).slice(0, 5).map(n => `${n.id} (${n.fanOut})`),
  };

  const outPath = path.join(root, 'code-knowledge-graph.json');
  fs.writeFileSync(outPath, JSON.stringify(graph, null, 2));

  const neoDir = path.join(root, '.neo');
  fs.mkdirSync(neoDir, { recursive: true });
  fs.writeFileSync(
    path.join(neoDir, 'knowledge-graph-meta.json'),
    JSON.stringify({ lastUpdated: new Date().toISOString(), stats, graphPath: outPath }, null, 2)
  );

  console.log('Code knowledge graph (lite) generated:');
  console.log(`  files: ${stats.files}  edges: ${stats.edges}  components: ${stats.components}  external imports: ${stats.externalImports}`);
}

if (require.main === module) main();
module.exports = { walk, extractImports, resolveRelative };
