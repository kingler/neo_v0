declare module '@components/atoms' {
  import { ButtonProps, InputProps, TypographyProps, IconProps } from './components'
  
  export const Button: React.FC<ButtonProps>
  export const Input: React.FC<InputProps>
  export const Typography: React.FC<TypographyProps>
  export const Icon: React.FC<IconProps>
}

declare module '@components/molecules' {
  import { FormFieldProps, SearchBarProps, CardProps } from './components'
  
  export const FormField: React.FC<FormFieldProps>
  export const SearchBar: React.FC<SearchBarProps>
  export const Card: React.FC<CardProps>
}

declare module '@components/organisms' {
  import { FormProps, NavigationProps, HeaderProps } from './components'
  
  export const Form: React.FC<FormProps>
  export const Navigation: React.FC<NavigationProps>
  export const Header: React.FC<HeaderProps>
}

declare module '@components/templates' {
  import { PageLayoutProps, GridSystemProps } from './components'
  
  export const PageLayout: React.FC<PageLayoutProps>
  export const GridSystem: React.FC<GridSystemProps>
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module 'nextra-theme-docs' {
  export interface Config {
    theme: string;
    // Add other config properties as needed
  }

  export function useConfig(): Config;
}

declare module '@/components/atoms/Button' {
  import { ButtonProps } from '../components'
  export const Button: React.FC<ButtonProps>
}

declare module '@/components/atoms/Input' {
  import { InputProps } from '../components'
  export const Input: React.FC<InputProps>
}

declare module '@/components/atoms/Typography' {
  import { TypographyProps } from '../components'
  export const Typography: React.FC<TypographyProps>
}

declare module '@/components/atoms/Icon' {
  import { IconProps } from '../components'
  export const Icon: React.FC<IconProps>
}

declare module '@/components/molecules/FormField' {
  import { FormFieldProps } from '../components'
  export const FormField: React.FC<FormFieldProps>
}

declare module '@/components/molecules/SearchBar' {
  import { SearchBarProps } from '../components'
  export const SearchBar: React.FC<SearchBarProps>
}

declare module '@/components/molecules/Card' {
  import { CardProps } from '../components'
  export const Card: React.FC<CardProps>
}

declare module '@/components/organisms/Form' {
  import { FormProps } from '../components'
  export const Form: React.FC<FormProps>
}

declare module '@/components/organisms/Navigation' {
  import { NavigationProps } from '../components'
  export const Navigation: React.FC<NavigationProps>
}

declare module '@/components/organisms/Header' {
  import { HeaderProps } from '../components'
  export const Header: React.FC<HeaderProps>
}

declare module '@/components/templates/PageLayout' {
  import { PageLayoutProps } from '../components'
  export const PageLayout: React.FC<PageLayoutProps>
}

declare module '@/components/templates/GridSystem' {
  import { GridSystemProps } from '../components'
  export const GridSystem: React.FC<GridSystemProps>
} 