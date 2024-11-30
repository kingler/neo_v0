# UI Conventions and Standards Guide

## 1. Navigation Patterns

### Global Navigation
- **Primary Navigation**
  - Maximum 7±2 main items
  - Clear active states
  - Position: Top or left
  - Height: 50-64px (top), Width: 240-320px (side)

### Mobile Navigation
- **Bottom Navigation**
  - 3-5 primary actions
  - Icon + Label format
  - Active state indication
  - Height: 56-64px

- **Hamburger Menu**
  - Click target: 44x44px minimum
  - Slide direction: Left-to-right
  - Animation duration: 200-300ms
  - Semi-transparent overlay (rgba(0,0,0,0.5))

### Breadcrumbs
- Maximum depth: 3-4 levels
- Separator: "/" or ">"
- Current page: Non-clickable
- Truncation: Middle ellipsis (...)

## 2. Layout Standards

### Spacing System
```css
/* Base unit: 8px */
--space-xxs: 4px;   /* 0.5x */
--space-xs: 8px;    /* 1x */
--space-sm: 16px;   /* 2x */
--space-md: 24px;   /* 3x */
--space-lg: 32px;   /* 4x */
--space-xl: 48px;   /* 6x */
--space-xxl: 64px;  /* 8x */
```

### Content Width
- **Maximum widths:**
  - Content: 680-720px
  - Container: 1200-1440px
  - Full width: 100%

### Visual Hierarchy
1. **Z-Index Scale**
```css
--z-below: -1;
--z-normal: 0;
--z-dropdown: 1000;
--z-sticky: 1200;
--z-overlay: 1300;
--z-modal: 1400;
--z-popover: 1500;
--z-tooltip: 1600;
```

## 3. Typography Conventions

### Type Scale
```css
--font-xs: 12px;
--font-sm: 14px;
--font-base: 16px;
--font-lg: 18px;
--font-xl: 20px;
--font-2xl: 24px;
--font-3xl: 30px;
--font-4xl: 36px;
```

### Line Heights
- Headers: 1.2-1.3
- Body text: 1.5-1.6
- Small text: 1.4
- Button text: 1.2

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

## 4. Interactive Elements

### Buttons
- **Minimum sizes**
  - Desktop: 32px height
  - Mobile: 44px height
  - Width: Content + 32px padding

- **States**
  ```css
  /* Color shifts */
  Default: base
  Hover: -10% brightness
  Active: -15% brightness
  Disabled: 40% opacity
  ```

- **Types**
  1. Primary: Filled background
  2. Secondary: Outlined
  3. Tertiary: Text-only
  4. Destructive: Red/danger variants

### Forms
- **Input Fields**
  - Height: 40-44px
  - Padding: 12-16px horizontal
  - Border radius: 4-8px
  - Label position: Above

- **Error States**
  - Red border (#dc3545)
  - Error message below
  - Icon indication
  - Immediate validation

### Links
- Underline on hover
- Color contrast: 4.5:1 minimum
- External link indicators
- Visited state distinction

## 5. Component Patterns

### Cards
- Padding: 16-24px
- Border radius: 8-12px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Image aspect ratio: 16:9 or 4:3

### Modals
- **Dimensions**
  - Width: 400-600px
  - Max height: 90vh
  - Padding: 24px
  
- **Structure**
  ```
  - Header (56-64px)
  - Content (flexible)
  - Footer (64-72px)
  ```

### Tables
- Header: Bold, background color
- Row height: 48-56px
- Alternating row colors
- Responsive strategies:
  - Horizontal scroll
  - Card layout
  - Column priority

## 6. Feedback & States

### Loading States
1. **Skeleton Screens**
   - Matching content layout
   - Animation: Pulse or Wave
   - Duration: 1-2 seconds
   - Color: Light gray (#f0f0f0)

2. **Spinners**
   - Size: 16-24px
   - Duration: 0.8-1.2 seconds
   - Color: Brand or neutral

### Notifications
- **Toast/Snackbar**
  - Duration: 3-5 seconds
  - Position: Top or bottom
  - Max width: 400px
  - Stack order: Bottom-up

- **Types**
  ```css
  Success: #28a745
  Error: #dc3545
  Warning: #ffc107
  Info: #17a2b8
  ```

## 7. Motion & Animation

### Duration Guidelines
```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 400ms;
```

### Easing Functions
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 8. Responsive Breakpoints

### Standard Breakpoints
```css
--mobile: 320px;
--tablet: 768px;
--laptop: 1024px;
--desktop: 1440px;
```

### Touch Targets
- Minimum size: 44x44px
- Spacing: 8px minimum
- Interactive area padding

## 9. Color Conventions

### Functional Colors
```css
--color-primary: #0066cc;
--color-success: #28a745;
--color-warning: #ffc107;
--color-danger: #dc3545;
--color-info: #17a2b8;
```

### Neutral Scale
```css
--color-gray-100: #f8f9fa;
--color-gray-200: #e9ecef;
--color-gray-300: #dee2e6;
--color-gray-400: #ced4da;
--color-gray-500: #adb5bd;
--color-gray-600: #6c757d;
--color-gray-700: #495057;
--color-gray-800: #343a40;
--color-gray-900: #212529;
```

## 10. Accessibility Standards

### Focus States
- Visible outline
- Color contrast: 3:1 minimum
- Never remove focus indicators
- Tab order logic

### Color Usage
- Text contrast: 4.5:1 minimum
- Important actions: 7:1 ratio
- Don't rely on color alone
- Support color blindness

### Interaction Support
- Keyboard navigation
- Screen reader support
- Focus management
- ARIA landmarks

## 11. Empty States

### Content Guidelines
- Friendly illustration
- Clear message
- Action button
- Helpful suggestions

### Layout
- Centered in container
- 40-50% viewport height
- Adequate whitespace
- Responsive scaling

## 12. Error Handling

### Error Messages
- Clear language
- Actionable solutions
- Consistent placement
- Visual indicators

### Validation
- Immediate feedback
- Clear requirements
- Error prevention
- Recovery options