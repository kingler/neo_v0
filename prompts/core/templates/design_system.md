# Design System Documentation

## Document Control
- **Project**: [Project name]
- **Version**: [Version number]
- **Last Updated**: [Date]
- **Status**: [Draft/Review/Approved]

## Design System Overview
### System Architecture
```embed:plantuml
@startuml
package "Atomic Design System" {
  package "Atoms" {
    [Button]
    [Input]
    [Icon]
  }
  
  package "Molecules" {
    [Form Field]
    [Search Bar]
    [Navigation Item]
  }
  
  package "Organisms" {
    [Form]
    [Navigation Bar]
    [Card List]
  }
  
  package "Templates" {
    [Page Layout]
    [Section Template]
  }
  
  package "Pages" {
    [Home Page]
    [Detail Page]
  }
  
  Atoms --> Molecules
  Molecules --> Organisms
  Organisms --> Templates
  Templates --> Pages
}
@enduml
```

## Design Tokens
### Color System
```embed:svg
{
  "type": "color_palette",
  "path": "assets/design_system/colors.svg",
  "title": "Color Palette"
}
```

```typescript
// Color Token Definitions
export const colors = {
  primary: {
    50: "hsl(var(--primary-50))",
    100: "hsl(var(--primary-100))",
    // ... other shades
  },
  // ... other color categories
}
```

### Typography System
```embed:svg
{
  "type": "typography_scale",
  "path": "assets/design_system/typography.svg",
  "title": "Typography Scale"
}
```

```typescript
// Typography Token Definitions
export const typography = {
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    // ... other sizes
  },
  fontWeights: {
    normal: "400",
    medium: "500",
    bold: "700"
  },
  lineHeights: {
    tight: "1.25",
    normal: "1.5",
    loose: "1.75"
  }
}
```

### Spacing System
```embed:svg
{
  "type": "spacing_scale",
  "path": "assets/design_system/spacing.svg",
  "title": "Spacing Scale"
}
```

```typescript
// Spacing Token Definitions
export const spacing = {
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  // ... other spacing values
}
```

## Atomic Components
### Atoms
#### Button Component
```embed:code
{
  "type": "component",
  "language": "tsx",
  "content": "
    import { Button } from '@/components/ui/button'
    
    // Shadcn UI Integration
    const Button = React.forwardRef<
      HTMLButtonElement,
      React.ButtonHTMLAttributes<HTMLButtonElement>
    >(({ className, ...props }, ref) => {
      return (
        <button
          className={cn(
            'inline-flex items-center justify-center rounded-md text-sm font-medium',
            'transition-colors focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
      )
    })
  "
}
```

```embed:wireframe
{
  "type": "component_states",
  "path": "assets/design_system/button_states.svg",
  "annotations": [
    {
      "id": "default",
      "note": "Default state styling"
    },
    {
      "id": "hover",
      "note": "Hover state interaction"
    }
  ]
}
```

#### Input Component
[Similar structure for other atomic components...]

### Molecules
#### Form Field Component
```embed:code
{
  "type": "component",
  "language": "tsx",
  "content": "
    import { Input } from '@/components/ui/input'
    import { Label } from '@/components/ui/label'
    
    export function FormField({ label, ...props }) {
      return (
        <div className='space-y-2'>
          <Label>{label}</Label>
          <Input {...props} />
        </div>
      )
    }
  "
}
```

[Similar structure for other molecular components...]

### Organisms
#### Form Component
```embed:plantuml
@startuml
package "Form Organism" {
  [FormField Molecule] --> [Label Atom]
  [FormField Molecule] --> [Input Atom]
  [Form Organism] --> [FormField Molecule]
  [Form Organism] --> [Button Atom]
}
@enduml
```

[Similar structure for other organisms...]

## Layout System
### Grid System
```embed:svg
{
  "type": "grid_system",
  "path": "assets/design_system/grid.svg",
  "title": "Grid System"
}
```

### Responsive Breakpoints
```typescript
// Breakpoint Definitions
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
}
```

## Component Integration
### Shadcn UI Integration
```embed:code
{
  "type": "configuration",
  "language": "ts",
  "content": "
    // components.json
    {
      'style': 'default',
      'rsc': true,
      'tailwind': {
        'config': 'tailwind.config.js',
        'css': 'app/globals.css',
        'baseColor': 'slate',
        'cssVariables': true
      }
    }
  "
}
```

### Theme Configuration
```typescript
// Theme Configuration
export const theme = {
  extend: {
    colors: {
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))"
      },
      // ... other theme extensions
    }
  }
}
```

## Usage Guidelines
### Component Usage
```embed:table
{
  "type": "component_usage",
  "data": [
    ["Component", "Context", "Variants", "Notes"],
    ["Button", "CTAs, Forms", "primary, secondary, ghost", "Use primary for main actions"],
    ["Input", "Forms, Search", "text, number, date", "Include proper validation"]
  ]
}
```

### Accessibility Guidelines
```embed:checklist
{
  "type": "accessibility",
  "items": [
    "Use semantic HTML elements",
    "Maintain color contrast ratios",
    "Support keyboard navigation",
    "Provide ARIA labels"
  ]
}
```

## Implementation Examples
### Template Examples
```embed:wireframe
{
  "type": "template",
  "path": "assets/design_system/template_examples.svg",
  "title": "Template Implementation Examples"
}
```

### Page Examples
```embed:wireframe
{
  "type": "page",
  "path": "assets/design_system/page_examples.svg",
  "title": "Page Implementation Examples"
}
```

## Version Control
### Component Versioning
```embed:table
{
  "type": "versioning",
  "data": [
    ["Component", "Version", "Changes", "Breaking"],
    ["Button", "1.1.0", "Added variant", false],
    ["Input", "2.0.0", "New API", true]
  ]
}
```

## Documentation
### Component Documentation
```embed:code
{
  "type": "documentation",
  "language": "mdx",
  "content": "
    # Button Component
    
    ## Usage
    ```tsx
    <Button variant='primary'>Click me</Button>
    ```
    
    ## Props
    | Prop | Type | Default | Description |
    |------|------|---------|-------------|
    | variant | string | 'primary' | Button style variant |
  "
}
```

## Change Log
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| [Version] | [Date] | [Changes] | [Author] | 