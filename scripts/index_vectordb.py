#!/usr/bin/env python3
"""Index the Neo component & theme library into a Chroma store for MCP retrieval.

Modern, self-contained replacement for scripts/init_vector_db.py, which:
  - assumed dict-shaped inputs, but library/*.json are LISTS (so .items() threw and the
    store was never populated);
  - required langchain + an OpenAI API key;
  - wrote each collection to its own persist_directory, which the chroma-mcp server
    (one --data-dir holding all collections) cannot serve.

This script uses the chromadb client directly with its default local embedding function
(all-MiniLM-L6-v2 — no API key) and writes BOTH collections into a single data dir so
`chroma-mcp --data-dir <dir>` exposes them as tools. Idempotent (upsert by id).

Usage:
    pip install chromadb
    python3 scripts/index_vectordb.py [--data-dir vectordb/storage]
"""

import argparse
import json
import os
import sys

COMPONENTS_SRC = "library/components/next/shadcn/shadcn.json"
THEMES_SRC = "library/tailwind_var.json"


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def build_component_records(components):
    ids, docs, metas = [], [], []
    for i, c in enumerate(components):
        name = c.get("name", f"component-{i}")
        desc = c.get("description", "")
        docs_blob = json.dumps(c.get("docs", {}))[:4000]
        ids.append(f"component:{name}")
        docs.append(f"Component: {name}\nDescription: {desc}\nDocs: {docs_blob}")
        metas.append({
            "type": "component",
            "name": name,
            "framework": "next.js",
            "theme": "new-york-zinc",
        })
    return ids, docs, metas


def build_theme_records(categories):
    ids, docs, metas = [], [], []
    for i, t in enumerate(categories):
        name = t.get("name", f"category-{i}")
        desc = t.get("description", "")
        variables = json.dumps(t.get("variables", {}))[:6000]
        ids.append(f"theme:{name}")
        docs.append(f"Category: {name}\nDescription: {desc}\nVariables: {variables}")
        metas.append({
            "type": "theme_variables",
            "category": name,
            "framework": "tailwind",
            "theme": "new-york-zinc",
        })
    return ids, docs, metas


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data-dir", default="vectordb/storage",
                        help="Single Chroma data dir the MCP server points at.")
    args = parser.parse_args()

    try:
        import chromadb
    except ImportError:
        sys.exit("chromadb not installed. Run: pip install chromadb")

    for src in (COMPONENTS_SRC, THEMES_SRC):
        if not os.path.isfile(src):
            sys.exit(f"Source data missing: {src}")

    os.makedirs(args.data_dir, exist_ok=True)
    client = chromadb.PersistentClient(path=args.data_dir)

    components = load_json(COMPONENTS_SRC)
    themes = load_json(THEMES_SRC)
    if not isinstance(components, list) or not isinstance(themes, list):
        sys.exit("Expected list-shaped library JSON; got something else.")

    comp_col = client.get_or_create_collection("components")
    theme_col = client.get_or_create_collection("themes")

    cid, cdoc, cmeta = build_component_records(components)
    tid, tdoc, tmeta = build_theme_records(themes)
    comp_col.upsert(ids=cid, documents=cdoc, metadatas=cmeta)
    theme_col.upsert(ids=tid, documents=tdoc, metadatas=tmeta)

    print(f"Indexed {len(cid)} components and {len(tid)} theme categories "
          f"into '{args.data_dir}' (collections: components, themes).")
    print("Point the MCP server at this dir:  chroma-mcp --client-type persistent "
          f"--data-dir ./{args.data_dir}")


if __name__ == "__main__":
    main()
