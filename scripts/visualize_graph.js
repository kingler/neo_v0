const React = require('react');
const ReactDOM = require('react-dom');
const ReactFlow = require('reactflow');
const dagre = require('dagre');

// Node types with their corresponding colors
const NODE_TYPES = {
  file: '#E6F3FF',        // Light blue
  class: '#E6FFE6',       // Light green
  function: '#FFE6E6',    // Light red
  method: '#FFE6F3',      // Light pink
  module: '#F3E6FF',      // Light purple
  component: '#FFF3E6',   // Light orange
  composable: '#E6FFF3',  // Light cyan
  store: '#FFE6FF',       // Light magenta
  entity: '#FFFFE6',      // Light yellow
  dependency: '#E6E6E6',  // Light gray
  decorator: '#FFE6B3',   // Light gold
};

class DependencyGraphVisualizer {
  constructor(data, container) {
    this.data = data;
    this.container = container;
    this.nodes = [];
    this.edges = [];
  }

  // Convert graph data to React Flow format
  transformData() {
    const nodes = this.data.nodes.map(node => ({
      id: node.id,
      data: { 
        label: node.name || node.id.split(': ')[1],
        type: node.type
      },
      position: { x: 0, y: 0 }, // Initial position, will be calculated by dagre
      style: {
        background: NODE_TYPES[node.type] || '#ffffff',
        padding: 10,
        borderRadius: 5,
        border: '1px solid #ccc',
        width: 180,
      }
    }));

    const edges = this.data.edges.map(edge => ({
      id: `${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      label: edge.relation,
      type: 'smoothstep',
      animated: edge.relation.includes('IMPORTS'),
      style: { stroke: '#888' }
    }));

    return { nodes, edges };
  }

  // Layout the graph using dagre
  layoutGraph(nodes, edges) {
    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 70, ranksep: 100 });
    g.setDefaultEdgeLabel(() => ({}));

    // Add nodes to dagre
    nodes.forEach(node => {
      g.setNode(node.id, { width: 180, height: 40 });
    });

    // Add edges to dagre
    edges.forEach(edge => {
      g.setEdge(edge.source, edge.target);
    });

    // Calculate layout
    dagre.layout(g);

    // Apply layout to nodes
    return nodes.map(node => {
      const nodeWithPosition = g.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - 90, // Center node by subtracting half the width
          y: nodeWithPosition.y - 20  // Center node by subtracting half the height
        }
      };
    });
  }

  // Create the React Flow component
  createFlowComponent() {
    const { nodes: initialNodes, edges } = this.transformData();
    const nodes = this.layoutGraph(initialNodes, edges);

    const Flow = () => {
      const [selectedNode, setSelectedNode] = React.useState(null);

      const onNodeClick = (event, node) => {
        setSelectedNode(node);
      };

      return (
        <div style={{ width: '100%', height: '100vh' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            fitView
            attributionPosition="bottom-right"
          >
            <ReactFlow.Controls />
            <ReactFlow.Background />
            <ReactFlow.MiniMap />
            {selectedNode && (
              <div
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 10,
                  background: 'white',
                  padding: 10,
                  borderRadius: 5,
                  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                }}
              >
                <h3>Node Details</h3>
                <pre>{JSON.stringify(selectedNode.data, null, 2)}</pre>
              </div>
            )}
          </ReactFlow>
        </div>
      );
    };

    return Flow;
  }

  // Render the visualization
  render() {
    const Flow = this.createFlowComponent();
    ReactDOM.render(
      <Flow />,
      this.container
    );
  }
}

// Export the visualizer
module.exports = DependencyGraphVisualizer;

// Example usage if running directly
if (require.main === module) {
  const express = require('express');
  const app = express();
  const port = 3000;

  app.get('/', (req, res) => {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dependency Graph Visualization</title>
          <style>
            body { margin: 0; }
            #root { width: 100vw; height: 100vh; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `;
    res.send(html);
  });

  app.listen(port, () => {
    console.log(`Visualization server running at http://localhost:${port}`);
  });
} 