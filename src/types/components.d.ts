import { ReactNode } from 'react'

// Atom Types
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
}

export interface TypographyProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption';
}

export interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

// Molecule Types
export interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface CardProps {
  title?: string;
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
}

// Organism Types
export interface FormProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
}

export interface NavigationProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export interface HeaderProps {
  title: string;
  actions?: ReactNode;
}

// Template Types
export interface PageLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

export interface GridSystemProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
} 