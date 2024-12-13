import React from 'react'
import { useConfig } from 'docz'
import Mermaid from 'react-mermaid2'

interface ComponentGraphProps {
  component: string
  type: 'atom' | 'molecule' | 'organism' | 'template'
}

export const ComponentGraph: React.FC<ComponentGraphProps> = ({ component, type }) => {
  // Generate Mermaid diagram based on component relationships
  const diagram = `
    graph TD
      ${type === 'molecule' ? 'subgraph Atoms' : ''}
      ${type === 'organism' ? 'subgraph Molecules' : ''}
      ${type === 'template' ? 'subgraph Organisms' : ''}
      
      ${component}[${component}] --> Dependencies
      
      ${type === 'molecule' || type === 'organism' || type === 'template' ? 'end' : ''}
  `

  return (
    <div className="component-graph">
      <Mermaid chart={diagram} />
    </div>
  )
} 