const fs = require('fs').promises;
const path = require('path');

class PromptOptimizer {
    constructor(knowledgeGraphPath) {
        this.knowledgeGraphPath = knowledgeGraphPath;
        this.graph = null;
        this.contextWindow = 4096; // Default context window size
    }

    async initialize() {
        try {
            const graphData = await fs.readFile(this.knowledgeGraphPath, 'utf-8');
            this.graph = JSON.parse(graphData);
        } catch (error) {
            console.error('Error loading knowledge graph:', error);
            throw error;
        }
    }

    async optimizeForCline(userMessage, context = {}) {
        if (!this.graph) {
            await this.initialize();
        }

        // Extract relevant components and dependencies based on the context
        const relevantNodes = this._findRelevantNodes(context);
        
        // Build optimized context
        const optimizedContext = {
            components: relevantNodes.filter(node => node.type === 'component'),
            functions: relevantNodes.filter(node => node.type === 'function'),
            imports: relevantNodes.filter(node => node.type === 'entity'),
            dependencies: Array.from(this._getDependencies(relevantNodes))
        };

        // Format for Cline chat
        const clinePrompt = this._formatForCline(userMessage, optimizedContext);
        
        return {
            prompt: clinePrompt,
            metadata: {
                totalTokens: this._estimateTokens(clinePrompt),
                relevantFiles: this._getRelevantFiles(relevantNodes)
            }
        };
    }

    _formatForCline(userMessage, context) {
        // Format the context and user message for Cline chat
        const contextStr = this._serializeContext(context);
        
        return `
# Project Context
${contextStr}

# User Message
${userMessage}
`;
    }

    _serializeContext(context) {
        const sections = [];

        if (context.components.length > 0) {
            sections.push('## Relevant Components\n' + 
                context.components.map(c => `- ${c.name}`).join('\n'));
        }

        if (context.functions.length > 0) {
            sections.push('## Related Functions\n' + 
                context.functions.map(f => `- ${f.name}`).join('\n'));
        }

        if (context.dependencies.length > 0) {
            sections.push('## Dependencies\n' + 
                context.dependencies.map(d => `- ${d}`).join('\n'));
        }

        return sections.join('\n\n');
    }

    _findRelevantNodes(context) {
        const relevantNodes = new Set();
        
        // Find nodes related to the context
        this.graph.nodes.forEach(node => {
            if (this._isNodeRelevant(node, context)) {
                relevantNodes.add(node);
                // Add connected nodes
                this._addConnectedNodes(node, relevantNodes);
            }
        });

        return Array.from(relevantNodes);
    }

    _isNodeRelevant(node, context) {
        if (!context.scope) return true;

        // Check if node is within the current scope
        if (context.scope.files && node.type === 'file') {
            return context.scope.files.some(file => 
                node.path.includes(file) || file.includes(node.path)
            );
        }

        if (context.scope.components && node.type === 'component') {
            return context.scope.components.includes(node.name);
        }

        if (context.scope.functions && node.type === 'function') {
            return context.scope.functions.includes(node.name);
        }

        return true;
    }

    _addConnectedNodes(node, relevantNodes) {
        this.graph.edges.forEach(edge => {
            if (edge.source === node.id) {
                const targetNode = this.graph.nodes.find(n => n.id === edge.target);
                if (targetNode && !relevantNodes.has(targetNode)) {
                    relevantNodes.add(targetNode);
                    // Recursively add connected nodes up to a certain depth
                    if (relevantNodes.size < 100) { // Limit to prevent excessive expansion
                        this._addConnectedNodes(targetNode, relevantNodes);
                    }
                }
            }
        });
    }

    _getDependencies(nodes) {
        const dependencies = new Set();
        
        nodes.forEach(node => {
            if (node.type === 'module') {
                dependencies.add(node.name);
            }
        });

        return dependencies;
    }

    _getRelevantFiles(nodes) {
        return nodes
            .filter(node => node.type === 'file')
            .map(node => node.path);
    }

    _estimateTokens(text) {
        // Rough estimation: 1 token ≈ 4 characters
        const estimatedTokens = Math.ceil(text.length / 4);
        return {
            estimatedTokens,
            withinLimit: estimatedTokens < this.contextWindow,
            contextWindow: this.contextWindow
        };
    }

    setContextWindow(size) {
        this.contextWindow = size;
    }
}

module.exports = PromptOptimizer; 