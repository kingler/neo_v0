const ReactCodeKnowledgeGraph = require('../prompts/optimze_depd_graph.js');
const path = require('path');
const fs = require('fs').promises;

class ProjectKnowledgeGraph {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.outputPath = path.join(projectPath, 'code-knowledge-graph.json');
        this.metadataPath = path.join(projectPath, '.neo', 'knowledge-graph-meta.json');
    }

    async generate() {
        console.log('\nGenerating Code Knowledge Graph');
        console.log('-------------------------------');
        
        try {
            const analyzer = new ReactCodeKnowledgeGraph(this.projectPath);
            await analyzer.analyzeCodebase();
            
            // Save the knowledge graph
            await analyzer.saveToFile(this.outputPath);
            
            // Save metadata
            const metadata = {
                lastUpdated: new Date().toISOString(),
                stats: analyzer.stats,
                graphPath: this.outputPath
            };
            
            await this._saveMetadata(metadata);
            
            console.log('\nCodebase Statistics:');
            console.log('-------------------');
            Object.entries(analyzer.stats).forEach(([key, value]) => {
                console.log(`${key.padEnd(20)}: ${value}`);
            });
            
            return {
                graphPath: this.outputPath,
                metadata
            };
        } catch (error) {
            console.error('Error generating knowledge graph:', error);
            throw error;
        }
    }

    async _saveMetadata(metadata) {
        try {
            // Ensure .neo directory exists
            const neoDir = path.dirname(this.metadataPath);
            await fs.mkdir(neoDir, { recursive: true });
            
            await fs.writeFile(
                this.metadataPath,
                JSON.stringify(metadata, null, 2)
            );
        } catch (error) {
            console.error('Error saving metadata:', error);
            throw error;
        }
    }

    static async getMetadata(projectPath) {
        const metadataPath = path.join(projectPath, '.neo', 'knowledge-graph-meta.json');
        try {
            const data = await fs.readFile(metadataPath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }
}

// If running directly from command line
if (require.main === module) {
    const projectPath = process.argv[2] || process.cwd();
    const generator = new ProjectKnowledgeGraph(projectPath);
    generator.generate()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

module.exports = ProjectKnowledgeGraph; 