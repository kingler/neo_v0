# Design System Generator Template

## Metadata
- **Type**: Design System Documentation
- **Version**: 1.0.0
- **Last Updated**: YYYY-MM-DD
- **Project**: [Project Name]
- **Framework**: [React/Next.js]
- **UI Libraries**: [shadcn-ui/NextUI/Flowbite]

## Design Tokens
### Color System
```json
{
  "colors": {
    "primary": {
      "50": "hsl(var(--primary-50))",
      "100": "hsl(var(--primary-100))",
      "200": "hsl(var(--primary-200))",
      "300": "hsl(var(--primary-300))",
      "400": "hsl(var(--primary-400))",
      "500": "hsl(var(--primary-500))",
      "600": "hsl(var(--primary-600))",
      "700": "hsl(var(--primary-700))",
      "800": "hsl(var(--primary-800))",
      "900": "hsl(var(--primary-900))",
      "950": "hsl(var(--primary-950))"
    },
    "semantic": {
      "success": "hsl(var(--success))",
      "warning": "hsl(var(--warning))",
      "error": "hsl(var(--error))",
      "info": "hsl(var(--info))"
    }
  }
}
```

### Typography
```json
{
  "typography": {
    "fonts": {
      "sans": "var(--font-sans)",
      "mono": "var(--font-mono)",
      "heading": "var(--font-heading)"
    },
    "sizes": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    },
    "weights": {
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
    }
  }
}
```

### Spacing
```json
{
  "spacing": {
    "px": "1px",
    "0": "0",
    "0.5": "0.125rem",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "8": "2rem",
    "10": "2.5rem",
    "12": "3rem",
    "16": "4rem"
  }
}
```

## Component Library Integration
### Library Configuration
```typescript
// tailwind.config.ts
import { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Design tokens extension
    }
  },
  plugins: [require("tailwindcss-animate")]
}

export default config
```

### Component Registry
```markdown
| Component | Library | Version | Status | Documentation |
|-----------|---------|---------|--------|---------------|
| Button    | shadcn  | 1.0.0   | Ready  | [Link]        |
| Input     | shadcn  | 1.0.0   | Ready  | [Link]        |
| Card      | shadcn  | 1.0.0   | Ready  | [Link]        |
```

## Component Templates
### Base Components
#### Button Component
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}
```

#### Input Component
```typescript
interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  size?: 'default' | 'sm' | 'lg'
  error?: boolean
  disabled?: boolean
}
```

### Composite Components
#### Form Field
```typescript
interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}
```

## Icon System
### Icon Library Integration
```typescript
// Icon configuration
import { Icons } from "lucide-react"

export type Icon = keyof typeof Icons
```

### Icon Categories
```markdown
| Category    | Icons | Usage |
|------------|-------|-------|
| Navigation | Menu, ChevronDown, ArrowLeft | Navigation elements |
| Actions    | Plus, Minus, Edit, Delete | Action buttons |
| Status     | Check, X, AlertTriangle | Status indicators |
```

## Pattern Library
### Common Patterns
#### Authentication Form
```typescript
interface AuthFormProps {
  type: 'login' | 'register' | 'reset-password'
  onSubmit: (data: any) => Promise<void>
  loading?: boolean
}
```

#### Data Table
```typescript
interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: boolean
  sorting?: boolean
  filtering?: boolean
}
```

## Style Generation
### CSS Variables
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* Additional variables */
  }
}
```

### Utility Classes
```markdown
| Class | Purpose | Example |
|-------|---------|---------|
| text-primary | Primary text color | <p class="text-primary">Text</p> |
| bg-primary | Primary background | <div class="bg-primary">Content</div> |
| rounded-md | Medium border radius | <div class="rounded-md">Card</div> |
```

## Animation System
### Transition Presets
```typescript
export const transitions = {
  default: "all 0.15s ease",
  fast: "all 0.1s ease",
  slow: "all 0.3s ease",
  bounce: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
}
```

### Animation Patterns
```css
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## Documentation Generation
### Component Documentation
```markdown
# Component Name

## Usage
\`\`\`tsx
import { Component } from "@/components/ui/component"

export default function Example() {
  return <Component>Content</Component>
}
\`\`\`

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
|      |      |         |             |

## Variants
- Default
- Primary
- Secondary
- Outline
```

### Style Guide
#### Writing Style
- Component naming conventions
- Props naming conventions
- Event handler naming
- File structure

#### Code Style
- TypeScript best practices
- Component composition
- State management
- Performance optimization

## Build System
### Package Configuration
```json
{
  "scripts": {
    "build:tokens": "node scripts/build-tokens.js",
    "build:components": "node scripts/build-components.js",
    "build:docs": "node scripts/build-docs.js"
  }
}
```

### Generation Scripts
```typescript
// Token generation
function generateTokens() {
  // Token generation logic
}

// Component generation
function generateComponent(name: string, template: string) {
  // Component generation logic
}
```

## Testing Framework
### Component Tests
```typescript
describe('Button', () => {
  it('renders correctly', () => {
    // Test implementation
  })

  it('handles click events', () => {
    // Test implementation
  })
})
```

### Visual Tests
```typescript
describe('Visual Regression', () => {
  it('matches snapshot', () => {
    // Snapshot test implementation
  })
})
```

## Version Control
### Change Management
```markdown
| Version | Changes | Breaking Changes | Migration Guide |
|---------|---------|-----------------|-----------------|
| 1.0.0   |         |                 |                 |
```

### Release Process
1. Version bump
2. Changelog update
3. Documentation update
4. NPM publish
5. Git tag

## Notes
### Best Practices
- Component composition
- State management
- Performance optimization
- Accessibility guidelines

### Future Improvements
- Planned components
- Token additions
- Pattern expansions
- Tool integrations