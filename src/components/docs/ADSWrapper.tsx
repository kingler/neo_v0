import React, { ReactNode } from 'react'
import { useConfig } from 'nextra-theme-docs'

// Import our Atomic Design System components
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { Typography } from '@/components/atoms/Typography'
import { Icon } from '@/components/atoms/Icon'

import { FormField } from '@/components/molecules/FormField'
import { SearchBar } from '@/components/molecules/SearchBar'
import { Card } from '@/components/molecules/Card'

import { Form } from '@/components/organisms/Form'
import { Navigation } from '@/components/organisms/Navigation'
import { Header } from '@/components/organisms/Header'

import { PageLayout } from '@/components/templates/PageLayout'
import { GridSystem } from '@/components/templates/GridSystem'

// Create a map of components by their atomic level
const atomicComponents = {
  // Atoms
  Button,
  Input,
  Typography,
  Icon,
  
  // Molecules
  FormField,
  SearchBar,
  Card,
  
  // Organisms
  Form,
  Navigation,
  Header,
  
  // Templates
  PageLayout,
  GridSystem
}

interface ADSWrapperProps {
  children: ReactNode;
}

export const ADSWrapper: React.FC<ADSWrapperProps> = ({ children }) => {
  const { theme } = useConfig()

  return (
    <div className="ads-wrapper" data-theme={theme}>
      {children}
    </div>
  )
} 