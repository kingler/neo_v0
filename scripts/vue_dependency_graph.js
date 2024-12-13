// VueDependencyGraph.js - Vue.js codebase analyzer that generates comprehensive knowledge graphs

const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const glob = require('glob');
const vueCompiler = require('@vue/compiler-sfc');

class VueCodeKnowledgeGraph {
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
            totalComposables: 0,
            totalScriptSetup: 0,
            totalDirectives: 0,
            totalImports: 0,
            totalDependencies: 0,
            totalProps: 0,
            totalEmits: 0,
            totalComputed: 0,
            totalWatchers: 0,
            totalStores: 0
        };

        // Directories to ignore during analysis
        this.ignoredDirectories = new Set([
            'node_modules',
            '.git',
            '.idea',
            '.vscode',
            'dist',
            'public',
            'coverage'
        ]);

        // Files to ignore during analysis
        this.ignoredFiles = new Set([
            '.gitignore',
            '.env',
            'README.md',
            'package-lock.json',
            'yarn.lock',
            'vite.config.js',
            'vite.config.ts'
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
        
        // Get all Vue, JS, and TS files
        const files = glob.sync('**/*.{vue,js,ts}', {
            cwd: this.directory,
            ignore: Array.from(this.ignoredDirectories).map(dir => `**/${dir}/**`)
        });

        this.stats.totalFiles = files.length;
        console.log(`Found ${this.stats.totalFiles} Vue/JavaScript/TypeScript files to process`);
        
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

            if (filePath.endsWith('.vue')) {
                await this._processVueFile(content, fileNode);
            } else {
                await this._processJsFile(content, fileNode);
            }

        } catch (error) {
            console.error(`\nError processing ${filePath}: ${error.message}`);
        }
    }

    async _processVueFile(content, fileNode) {
        const { descriptor } = vueCompiler.parse(content);
        
        // Process <script> block
        if (descriptor.script || descriptor.scriptSetup) {
            const isSetup = !!descriptor.scriptSetup;
            if (isSetup) this.stats.totalScriptSetup++;

            const scriptContent = (descriptor.script || descriptor.scriptSetup).content;
            const ast = parser.parse(scriptContent, {
                sourceType: 'module',
                plugins: ['typescript', 'decorators-legacy']
            });

            this._processVueScript(ast, fileNode, isSetup);
        }

        // Process template for component dependencies
        if (descriptor.template) {
            this._processVueTemplate(descriptor.template.content, fileNode);
        }
    }

    _processVueScript(ast, fileNode, isSetup) {
        traverse(ast, {
            ImportDeclaration: (path) => {
                this._processImport(path.node, fileNode);
            },

            CallExpression: (path) => {
                const callee = path.node.callee;
                if (callee.type === 'Identifier') {
                    // Track composables
                    if (callee.name.startsWith('use')) {
                        this._processComposable(path.node, fileNode);
                    }
                    // Track Pinia stores
                    else if (callee.name === 'defineStore') {
                        this._processStore(path.node, fileNode);
                    }
                }
            },

            ObjectProperty: (path) => {
                const key = path.node.key;
                if (key.type === 'Identifier') {
                    // Track component features
                    switch(key.name) {
                        case 'props':
                            this.stats.totalProps++;
                            break;
                        case 'emits':
                            this.stats.totalEmits++;
                            break;
                        case 'computed':
                            this.stats.totalComputed++;
                            break;
                        case 'watch':
                            this.stats.totalWatchers++;
                            break;
                    }
                }
            }
        });
    }

    _processVueTemplate(template, fileNode) {
        // Simple regex-based component usage detection
        const componentMatches = template.match(/<[A-Z][a-zA-Z0-9-]*|<router-[a-z]+/g) || [];
        componentMatches.forEach(match => {
            const componentName = match.slice(1);
            const componentNode = `Component: ${componentName}`;
            this.addNode(componentNode, { type: 'component', name: componentName });
            this.addEdge(fileNode, componentNode, 'USES_COMPONENT');
            this.stats.totalComponents++;
        });

        // Detect directive usage
        const directiveMatches = template.match(/v-[a-z]+/g) || [];
        directiveMatches.forEach(directive => {
            this.stats.totalDirectives++;
        });
    }

    _processComposable(node, fileNode) {
        const composableName = node.callee.name;
        const composableNode = `Composable: ${composableName}`;
        this.addNode(composableNode, { type: 'composable', name: composableName });
        this.addEdge(fileNode, composableNode, 'USES_COMPOSABLE');
        this.stats.totalComposables++;
    }

    _processStore(node, fileNode) {
        if (node.arguments[0]?.value) {
            const storeName = node.arguments[0].value;
            const storeNode = `Store: ${storeName}`;
            this.addNode(storeNode, { type: 'store', name: storeName });
            this.addEdge(fileNode, storeNode, 'DEFINES_STORE');
            this.stats.totalStores++;
        }
    }

    _processJsFile(content, fileNode) {
        const ast = parser.parse(content, {
            sourceType: 'module',
            plugins: ['typescript', 'decorators-legacy']
        });

        traverse(ast, {
            ImportDeclaration: (path) => {
                this._processImport(path.node, fileNode);
            },
            
            CallExpression: (path) => {
                const callee = path.node.callee;
                if (callee.type === 'Identifier' && callee.name.startsWith('use')) {
                    this._processComposable(path.node, fileNode);
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
}

module.exports = VueCodeKnowledgeGraph;

// Example usage:
if (require.main === module) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('\nVue Code Knowledge Graph Generator');
    console.log('----------------------------------');

    readline.question('Enter the path to the Vue.js codebase directory: ', async (directory) => {
        try {
            console.log('\nAnalyzing codebase...\n');
            
            const analyzer = new VueCodeKnowledgeGraph(directory);
            await analyzer.analyzeCodebase();
            
            const stats = analyzer.stats;
            const outputPath = 'vue-knowledge-graph.json';
            await analyzer.saveToFile(outputPath);

            console.log('\nCodebase Statistics:');
            console.log('-------------------');
            console.log(`Total Files         : ${stats.filesProcessed.toLocaleString()}`);
            console.log(`Total Components    : ${stats.totalComponents.toLocaleString()}`);
            console.log(`Total Composables   : ${stats.totalComposables.toLocaleString()}`);
            console.log(`Total Script Setup  : ${stats.totalScriptSetup.toLocaleString()}`);
            console.log(`Total Props         : ${stats.totalProps.toLocaleString()}`);
            console.log(`Total Emits         : ${stats.totalEmits.toLocaleString()}`);
            console.log(`Total Computed      : ${stats.totalComputed.toLocaleString()}`);
            console.log(`Total Watchers      : ${stats.totalWatchers.toLocaleString()}`);
            console.log(`Total Stores        : ${stats.totalStores.toLocaleString()}`);
            console.log(`Total Directives    : ${stats.totalDirectives.toLocaleString()}`);
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
