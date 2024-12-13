# Wireframe Annotations

## Document Control
- **Project**: [Project name]
- **User Story Reference**: [Link to user story]
- **Screen/Component**: [Screen/Component name]
- **Version**: [Version number]
- **Last Updated**: [Date]

## Screen Overview
### Purpose
- **Primary Goal**: [Main purpose]
- **User Need**: [User need being addressed]
- **User Story**: [Related user story]

### Context
```embed:plantuml
@startuml
title Navigation Context
left to right direction

[Previous Screen] --> [Current Screen]: Action
[Current Screen] --> [Next Screen]: Action

note right of [Current Screen]
  Current context in user flow
end note
@enduml
```

## Layout Structure
### Grid System
```embed:svg
{
  "type": "grid_overlay",
  "path": "assets/wireframes/grid_system.svg",
  "title": "Grid System Layout"
}
```

### Responsive Breakpoints
```embed:table
{
  "type": "breakpoints",
  "data": [
    ["Device", "Width", "Layout Changes"],
    ["Mobile", "<768px", "Single column"],
    ["Tablet", "768-1024px", "Two columns"],
    ["Desktop", ">1024px", "Full layout"]
  ]
}
```

## Component Layout
### Header Section
```embed:wireframe
{
  "type": "component",
  "path": "assets/wireframes/header.svg",
  "annotations": [
    {
      "id": "logo",
      "position": {"x": 10, "y": 10},
      "note": "Logo placement - clickable, returns to home"
    },
    {
      "id": "nav",
      "position": {"x": 100, "y": 10},
      "note": "Primary navigation - responsive menu on mobile"
    }
  ]
}
```

### Main Content
```embed:wireframe
{
  "type": "component",
  "path": "assets/wireframes/main_content.svg",
  "annotations": [
    {
      "id": "content_area",
      "position": {"x": 0, "y": 0},
      "note": "Primary content area - dynamic content loading"
    }
  ]
}
```

### Footer Section
```embed:wireframe
{
  "type": "component",
  "path": "assets/wireframes/footer.svg",
  "annotations": [
    {
      "id": "footer_nav",
      "position": {"x": 0, "y": 0},
      "note": "Secondary navigation and legal links"
    }
  ]
}
```

## Interactive Elements
### Navigation Components
```embed:svg
{
  "type": "interaction_flow",
  "path": "assets/wireframes/nav_interactions.svg",
  "title": "Navigation Interaction States"
}
```

### Form Elements
```embed:wireframe
{
  "type": "form_elements",
  "path": "assets/wireframes/form_components.svg",
  "annotations": [
    {
      "id": "input_field",
      "states": ["default", "focus", "error", "disabled"],
      "validation": "Required field validation rules"
    }
  ]
}
```

## State Variations
### Loading States
```embed:wireframe
{
  "type": "loading_states",
  "path": "assets/wireframes/loading.svg",
  "annotations": [
    {
      "id": "skeleton",
      "note": "Skeleton loader animation"
    },
    {
      "id": "spinner",
      "note": "Loading spinner for actions"
    }
  ]
}
```

### Error States
```embed:wireframe
{
  "type": "error_states",
  "path": "assets/wireframes/errors.svg",
  "annotations": [
    {
      "id": "error_message",
      "note": "Error message display pattern"
    },
    {
      "id": "validation_error",
      "note": "Form validation error display"
    }
  ]
}
```

## Interaction Patterns
### Click/Tap Areas
```embed:svg
{
  "type": "interaction_map",
  "path": "assets/wireframes/click_areas.svg",
  "title": "Clickable/Tappable Areas"
}
```

### Gestures
```embed:table
{
  "type": "gestures",
  "data": [
    ["Gesture", "Action", "Component"],
    ["Swipe", "Navigate", "Carousel"],
    ["Pinch", "Zoom", "Image"],
    ["Long Press", "Menu", "List Item"]
  ]
}
```

## Accessibility Considerations
### Semantic Structure
```embed:plantuml
@startuml
title Semantic HTML Structure
package "Page Structure" {
  [header]
  [main]
  [footer]
  
  [header] --> [nav]
  [main] --> [article]
  [article] --> [section]
  [footer] --> [nav]
}
@enduml
```

### Focus Order
```embed:svg
{
  "type": "focus_flow",
  "path": "assets/wireframes/focus_order.svg",
  "title": "Keyboard Focus Order"
}
```

## Content Guidelines
### Typography
```embed:wireframe
{
  "type": "typography",
  "path": "assets/wireframes/typography.svg",
  "annotations": [
    {
      "id": "headings",
      "note": "Heading hierarchy and spacing"
    },
    {
      "id": "body",
      "note": "Body text styles and line height"
    }
  ]
}
```

### Content Blocks
```embed:wireframe
{
  "type": "content_blocks",
  "path": "assets/wireframes/content_blocks.svg",
  "annotations": [
    {
      "id": "block_spacing",
      "note": "Content block spacing and alignment"
    }
  ]
}
```

## Implementation Notes
### Development Guidelines
```embed:code
{
  "type": "html_structure",
  "language": "html",
  "content": "Example semantic structure"
}
```

### Component Dependencies
```embed:plantuml
@startuml
title Component Dependencies
[Parent Component] --> [Child Component 1]
[Parent Component] --> [Child Component 2]
note right of [Child Component 1]
  Props and state management
end note
@enduml
```

## Design System Integration
### Component Library
```embed:svg
{
  "type": "component_library",
  "path": "assets/design_system/components.svg",
  "title": "Design System Components"
}
```

### Design Tokens
```embed:table
{
  "type": "design_tokens",
  "data": [
    ["Token", "Value", "Usage"],
    ["spacing-md", "16px", "Component padding"],
    ["color-primary", "/007AFF", "Interactive elements"],
    ["text-body", "16px/1.5", "Body text"]
  ]
}
```

## Version History
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| [Version] | [Date] | [Changes] | [Author] | 