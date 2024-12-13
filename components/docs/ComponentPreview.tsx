import React from 'react'
import styled from '@emotion/styled'

interface ComponentPreviewProps {
  type: 'atom' | 'molecule' | 'organism' | 'template'
  children: React.ReactNode
}

const PreviewWrapper = styled.div<{ type: string }>`
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 2rem;
  margin: 1rem 0;
  background: ${({ type }) => {
    switch (type) {
      case 'atom':
        return 'var(--atom-bg, #f0f9ff)'
      case 'molecule':
        return 'var(--molecule-bg, #f0fdf4)'
      case 'organism':
        return 'var(--organism-bg, #fdf4ff)'
      case 'template':
        return 'var(--template-bg, #fff7ed)'
      default:
        return 'transparent'
    }
  }};
`

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  type,
  children
}) => {
  return (
    <PreviewWrapper type={type}>
      {children}
    </PreviewWrapper>
  )
} 