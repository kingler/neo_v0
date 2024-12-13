import React from 'react'
import { useConfig } from 'docz'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  .docz-atomic-preview {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 2rem;
    margin: 1rem 0;
    
    &[data-type="atom"] {
      background: var(--atom-bg, #f0f9ff);
    }
    
    &[data-type="molecule"] {
      background: var(--molecule-bg, #f0fdf4);
    }
    
    &[data-type="organism"] {
      background: var(--organism-bg, #fdf4ff);
    }
    
    &[data-type="template"] {
      background: var(--template-bg, #fff7ed);
    }
  }
`

export const Layout = ({ children }) => {
  const config = useConfig()
  
  return (
    <Wrapper>
      <Global
        styles={{
          ':root': {
            '--primary': config.themeConfig.colors.primary,
            '--secondary': config.themeConfig.colors.secondary,
            '--background': config.themeConfig.colors.background,
            '--foreground': config.themeConfig.colors.text,
          }
        }}
      />
      {children}
    </Wrapper>
  )
} 