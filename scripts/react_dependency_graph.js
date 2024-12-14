// ReactDependencyGraph.js - JavaScript/React codebase analyzer that generates comprehensive knowledge graphs

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const glob = require('glob');

class ReactCodeKnowledgeGraph {
    constructor(directory) {
        this.directory = directory;
        this.graph = {
            nodes: new Map(),
            edges: new Map()
        };
        
        this.stats = {
            filesProcessed: 0,
            totalFiles: 0,
            dirsProcessed: 0,
            totalComponents: 0,
            totalFunctions: 0,
            totalImports: 0,
            totalDependencies: 0,
            totalHooks: 0
        };

        // Directories to ignore during analysis
        this.ignoredDirectories = new Set([
            'node_modules',
            '.git',
            '.idea',
            '.vscode',
            'build',
            'dist',
            'coverage',
            'public'
        ]);

        // Files to ignore during analysis
        this.ignoredFiles = new Set([
            '.gitignore',
            '.env',
            'README.md',
            'package-lock.json',
            'yarn.lock'
        ]);

        this.analyzedFiles = new Set();
        this.dependencies = new Set();
    }

    addNode(id, data) {
        if (!this.graph.nodes.has(id)) {
            this.graph.nodes.set(id, { id, ...data });
        }
    }

    addEdge(source, target, relation) {
        const edgeId = `${source}-${target}`;
        if (!this.graph.edges.has(edgeId)) {
            this.graph.edges.set(edgeId, { source, target, relation });
        }
    }

    async analyzeCodebase() {
        console.log("\nCounting files...");
        
        // Get all JavaScript/TypeScript files
        const files = glob.sync('**/*.{js,jsx,ts,tsx}', {
            cwd: this.directory,
            ignore: Array.from(this.ignoredDirectories).map(dir => `**/${dir}/**`)
        });

        this.stats.totalFiles = files.length;
        console.log(`Found ${this.stats.totalFiles} JavaScript/TypeScript files to process`);
        
        console.log("\nProcessing files...");
        
        for (const file of files) {
            const filePath = path.join(this.directory, file);
            await this._processFile(filePath);
        }

        console.log(`\n\nCompleted processing ${this.stats.filesProcessed} files`);
        
        return this.generateOutput();
    }

    async _processFile(filePath) {
        if (this.analyzedFiles.has(filePath)) return;

        try {
            this.stats.filesProcessed++;
            const relativePath = path.relative(this.directory, filePath);
            process.stdout.write(`\rProcessing file [${this.stats.filesProcessed}/${this.stats.totalFiles}]: ${relativePath}`);

            const content = await fs.promises.readFile(filePath, 'utf-8');
            const fileNode = `File: ${relativePath}`;

            this.analyzedFiles.add(filePath);
            this.addNode(fileNode, { type: 'file', path: relativePath });

            // Parse the file
            const ast = parser.parse(content, {
                sourceType: 'module',
                plugins: ['jsx', 'typescript', 'decorators-legacy']
            });

            // Process the AST
            this._processAST(ast, fileNode);

        } catch (error) {
            console.error(`\nError processing ${filePath}: ${error.message}`);
        }
    }

    _processAST(ast, fileNode) {
        traverse(ast, {
            ImportDeclaration: (path) => {
                this._processImport(path.node, fileNode);
            },
            
            FunctionDeclaration: (path) => {
                this._processFunction(path.node, fileNode);
            },
            
            VariableDeclarator: (path) => {
                if (path.node.init && path.node.init.type === 'ArrowFunctionExpression') {
                    this._processFunction(path.node, fileNode, path.node.id.name);
                }
            },

            CallExpression: (path) => {
                if (path.node.callee.name === 'useEffect' || 
                    path.node.callee.name === 'useState' ||
                    path.node.callee.name === 'useCallback' ||
                    path.node.callee.name === 'useMemo') {
                    this._processHook(path.node, fileNode);
                }
            }
        });
    }

    _processImport(node, fileNode) {
        const source = node.source.value;
        const moduleNode = `Module: ${source}`;

        this.addNode(moduleNode, { type: 'module', name: source });
        this.addEdge(fileNode, moduleNode, 'IMPORTS_MODULE');
        
        this.stats.totalImports++;

        // Process specific imports
        node.specifiers.forEach(specifier => {
            const importedName = specifier.local.name;
            const entityNode = `Entity: ${source}.${importedName}`;
            
            this.addNode(entityNode, { 
                type: 'entity', 
                name: importedName,
                importType: specifier.type 
            });
            
            this.addEdge(fileNode, entityNode, 'IMPORTS_ENTITY');
        });
    }

    _processFunction(node, fileNode, name = null) {
        const functionName = name || node.id?.name;
        if (!functionName) return;

        const isComponent = functionName[0] === functionName[0].toUpperCase();
        const type = isComponent ? 'component' : 'function';
        
        const functionNode = `${type}: ${functionName} (${fileNode})`;
        
        this.addNode(functionNode, {
            type,
            name: functionName,
            params: node.params.map(param => param.name)
        });
        
        this.addEdge(fileNode, functionNode, `DEFINES_${type.toUpperCase()}`);
        
        if (isComponent) {
            this.stats.totalComponents++;
        } else {
            this.stats.totalFunctions++;
        }
    }

    _processHook(node, fileNode) {
        const hookName = node.callee.name;
        const hookNode = `Hook: ${hookName} (${fileNode})`;
        
        this.addNode(hookNode, {
            type: 'hook',
            name: hookName
        });
        
        this.addEdge(fileNode, hookNode, 'USES_HOOK');
        this.stats.totalHooks++;
    }

    generateOutput() {
        const output = {
            nodes: Array.from(this.graph.nodes.values()),
            edges: Array.from(this.graph.edges.values()),
            statistics: this.stats
        };

        return output;
    }

    async saveToFile(outputPath) {
        const output = this.generateOutput();
        await fs.promises.writeFile(
            outputPath,
            JSON.stringify(output, null, 2)
        );
        console.log(`\nKnowledge graph saved to ${outputPath}`);
    }

    async visualizeGraph() {
        try {
            const DependencyGraphVisualizer = require('./visualize_graph');
            const express = require('express');
            const app = express();
            const port = 3000;

            // Convert graph data to format expected by visualizer
            const graphData = {
                nodes: Array.from(this.graph.nodes.values()),
                edges: Array.from(this.graph.edges.values())
            };

            // Serve static files
            app.use(express.static('dist'));

            // Serve graph data
            app.get('/data', (req, res) => {
                res.json(graphData);
            });

            // Start server
            app.listen(port, () => {
                console.log(`\nVisualization server running at http://localhost:${port}`);
                console.log("Press Ctrl+C to stop the server when done.");
            });

        } catch (error) {
            console.error('Error starting visualization:', error.message);
            console.log("Please ensure you have run 'npm install' and 'npm run build'");
        }
    }
}

module.exports = ReactCodeKnowledgeGraph;

// Example usage:
if (require.main === module) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\nReact Code Knowledge Graph Generator');
    console.log('------------------------------------');

    readline.question('Enter the path to the React codebase directory: ', async (directory) => {
        try {
            console.log('\nAnalyzing codebase...\n');
            
            const analyzer = new ReactCodeKnowledgeGraph(directory);
            await analyzer.analyzeCodebase();
            
            const stats = analyzer.stats;
            const outputPath = 'react-knowledge-graph.json';
            await analyzer.saveToFile(outputPath);

            console.log('\nCodebase Statistics:');
            console.log('-------------------');
            console.log(`Total Files         : ${stats.filesProcessed.toLocaleString()}`);
            console.log(`Total Components    : ${stats.totalComponents.toLocaleString()}`);
            console.log(`Total Functions     : ${stats.totalFunctions.toLocaleString()}`);
            console.log(`Total Hooks         : ${stats.totalHooks.toLocaleString()}`);
            console.log(`Total Imports       : ${stats.totalImports.toLocaleString()}`);
            console.log(`Total Dependencies  : ${stats.totalDependencies.toLocaleString()}`);

            readline.question('\nWould you like to visualize the graph? (yes/no): ', async (answer) => {
                if (answer.toLowerCase() === 'yes') {
                    console.log('\nGenerating visualization...');
                    // Here you could add visualization logic using a library like vis.js or d3.js
                    console.log('Visualization feature coming soon!');
                }
                console.log('\nDone.');
                readline.close();
            });
        } catch (error) {
            console.error('Error:', error);
            readline.close();
        }
    });
}
