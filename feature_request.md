# Feature Request

- Give Neo llm capability via pip install llm library.
- After writing/generating a new code file with several functions, Neo should scan the codebase context graph, and update the graph to include the newly created code files, functions and dependencies
- When updating and exiting code classes, variables, functions and methods Neo must first create a scratch pad to copy the existing file to, use the knowledge graph to identify context, and use the diff tool too track changes
- After updates are made to an existing code or text file Neo should compare the content to it's scratch pad to identify if exiting working code was removed accidentally. If exiting working code was removed accidentally Neo should display the following message "Oops, I accidentally removed the {{ Function, Variable, Method, or Class model }} code or model. Let me add it back:. Then Neo should insert the code from the scratch pad to the code file in focus.

## Requirements with Testing Step Included

- Enhance Neo’s LLM Capabilities:
- Install the desired LLM library for Neo using pip install [library-name]. For example, pip install openai.
- Update Codebase Context Graph After Generating New Code:
- When Neo generates a new code file containing multiple functions, it should:
- Scan the existing codebase context graph.
- Update the graph to include new code files, functions, and their dependencies.
- Use Scratch Pad for Updating Existing Code:
- Before Neo updates existing classes, variables, functions, or methods, it must:
- Create a scratch pad by copying the current version of the file.
- Utilize the context graph to understand the code’s context.
- Employ a diff tool to track changes made during the update.
- Validate Updates and Restore Accidental Deletions:
- After making updates to an existing code or text file, Neo should:
- Compare the updated file with the scratch pad to detect any accidental removal of working code.
- If such removal is detected, Neo should display the message:
- “Oops, I accidentally removed the [Function/Variable/Method/Class] code. Let me add it back.”
- Neo should then restore the removed code from the scratch pad to the current file.
- Update and Run Tests After Code Changes:
- After updating the code, Neo should:
- Check if a test script exists for the updated code file.
- If a test script exists:
- Update the test script to include the new code changes.
- Run the test script to test the functions in the code file.
- Analyze the test results and report any issues or failures.
- If no test script exists:
- Optionally, suggest creating a new test script to ensure the reliability of the code.

## Graph Knowledge Context

CntxtPY.py - Python codebase analyzer that generates comprehensive knowledge graphs optimized for LLM context windows

```python
import os
import re
import sys
import json
import ast
import networkx as nx
from networkx.readwrite import json_graph
from typing import Dict, List, Set, Any

class PythonCodeKnowledgeGraph:
    def __init__(self, directory: str):
        """Initialize the knowledge graph generator.

        Args:
            directory: Root directory of the Python codebase.
        """
        self.directory = directory
        self.graph = nx.DiGraph()
        self.class_methods: Dict[str, Set[str]] = {}
        self.function_params: Dict[str, List[Dict[str, Any]]] = {}
        self.function_returns: Dict[str, str] = {}
        self.files_processed = 0
        self.total_files = 0
        self.dirs_processed = 0

        # Directories to ignore during analysis.
        self.ignored_directories = set([
            '__pycache__', 'venv', 'env', '.env', '.git', '.idea', '.vscode', 'build', 'dist',
            '.eggs', '.pytest_cache', '.mypy_cache', '.tox', '.cache', '.coverage', 'node_modules',
            'tests', 'docs', 'examples', 'data', 'migrations', 'scripts', 'static', 'media', 'logs',
        ])

        # Files to ignore during analysis.
        self.ignored_files = set([
            '.gitignore',
            '.env',
            'README.md',
            'LICENSE',
            'MANIFEST.in',
            'pyproject.toml',
            'setup.py',
            'setup.cfg',
        ])

        # For processing dependencies
        self.dependencies: Set[str] = set()

        # Counters for statistics
        self.total_classes = 0
        self.total_functions = 0
        self.total_imports = 0
        self.total_dependencies_count = 0
        self.total_modules = 0
        self.total_methods = 0
        self.total_decorators = 0

        # Track analyzed files to prevent circular dependencies.
        self.analyzed_files = set()

    def analyze_codebase(self):
        """Analyze the Python codebase to extract files, imports,
        classes, methods, functions, and their relationships."""
        # First pass to count total files
        print("\nCounting files...")
        for root, dirs, files in os.walk(self.directory):
            # Remove ignored directories from dirs in-place to prevent walking into them
            dirs[:] = [d for d in dirs if d not in self.ignored_directories]

            # Skip if current directory is in ignored directories
            if any(ignored in root.split(os.sep) for ignored in self.ignored_directories):
                continue
            self.total_files += sum(1 for f in files if f not in self.ignored_files and f.endswith(".py"))

        print(f"Found {self.total_files} Python files to process")
        print("\nProcessing files...")

        # Second pass to process files
        for root, dirs, files in os.walk(self.directory):
            # Remove ignored directories from dirs in-place to prevent walking into them
            dirs[:] = [d for d in dirs if d not in self.ignored_directories]

            # Skip if current directory is in ignored directories
            if any(ignored in root.split(os.sep) for ignored in self.ignored_directories):
                continue

            # Display current directory
            rel_path = os.path.relpath(root, self.directory)
            self.dirs_processed += 1
            print(f"\rProcessing directory [{self.dirs_processed}]: {rel_path}", end="")

            for file in files:
                if file in self.ignored_files:
                    continue
                if file.endswith(".py"):
                    file_path = os.path.join(root, file)
                    self._process_file(file_path)
                elif file in ["requirements.txt", "Pipfile", "Pipfile.lock", "setup.py", "pyproject.toml"]:
                    file_path = os.path.join(root, file)
                    self._process_dependency_file(file_path)

        print(f"\n\nCompleted processing {self.files_processed} files across {self.dirs_processed} directories")

    def _process_file(self, file_path: str):
        """Process a Python file to detect imports, classes, methods, functions, and dependencies."""
        if file_path in self.analyzed_files:
            return

        try:
            self.files_processed += 1
            relative_path = os.path.relpath(file_path, self.directory)
            print(f"\rProcessing file [{self.files_processed}/{self.total_files}]: {relative_path}", end="", flush=True)

            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            file_node = f"File: {relative_path}"

            # Add to analyzed files set.
            self.analyzed_files.add(file_path)

            # Add file node if it doesn't exist.
            if not self.graph.has_node(file_node):
                self.graph.add_node(file_node, type="file", path=relative_path)

            # Parse the AST of the file.
            tree = ast.parse(content, filename=relative_path)

            # Process the AST nodes.
            self._process_ast_nodes(tree, file_node)

        except Exception as e:
            print(f"\nError processing {file_path}: {str(e)}", file=sys.stderr)

    def _process_ast_nodes(self, tree: ast.AST, file_node: str):
        """Process the AST nodes to extract imports, classes, functions, and their relationships."""
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                self._process_import(node, file_node)
            elif isinstance(node, ast.ImportFrom):
                self._process_import_from(node, file_node)
            elif isinstance(node, ast.ClassDef):
                self._process_class(node, file_node)
            elif isinstance(node, ast.FunctionDef):
                self._process_function(node, file_node)
            elif isinstance(node, ast.AsyncFunctionDef):
                self._process_function(node, file_node, is_async=True)

    def _process_import(self, node: ast.Import, file_node: str):
        """Process 'import' statements."""
        for alias in node.names:
            module_name = alias.name
            asname = alias.asname or module_name
            module_node = f"Module: {module_name}"

            if not self.graph.has_node(module_node):
                self.graph.add_node(module_node, type="module", name=module_name)
                self.total_modules += 1

            self.graph.add_edge(file_node, module_node, relation="IMPORTS_MODULE")
            self.total_imports += 1

    def _process_import_from(self, node: ast.ImportFrom, file_node: str):
        """Process 'from ... import
