# Grid Systems Template

## Metadata
- **Project**: [Project Name]
- **Version**: 1.0.0
- **Last Updated**: YYYY-MM-DD
- **Author(s)**: [Names]

## Grid Configuration
### Base Grid
```css
:root {
  --grid-columns: 12;
  --grid-gap: 1rem;
  --container-width: 1200px;
  --container-padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
  padding: var(--container-padding);
  max-width: var(--container-width);
  margin: 0 auto;
}
```

### Breakpoints
```css
/* Mobile First Approach */
:root {
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
}
```

## Layout Components
### Container
```html
<div class="container">
  <!-- Content -->
</div>
```

```css
.container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--container-padding);
  padding-left: var(--container-padding);
}

@media (min-width: 576px) {
  .container { max-width: 540px; }
}

@media (min-width: 768px) {
  .container { max-width: 720px; }
}

@media (min-width: 992px) {
  .container { max-width: 960px; }
}

@media (min-width: 1200px) {
  .container { max-width: 1140px; }
}

@media (min-width: 1400px) {
  .container { max-width: 1320px; }
}
```

### Grid Row
```html
<div class="row">
  <div class="col">Column</div>
  <div class="col">Column</div>
</div>
```

```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin: calc(-1 * var(--grid-gap));
}
```

### Columns
```html
<div class="col-12 col-md-6 col-lg-4">
  <!-- Content -->
</div>
```

```css
.col {
  flex: 1 0 0%;
  padding: var(--grid-gap);
}

@for $i from 1 through 12 {
  .col-#{$i} {
    flex: 0 0 auto;
    width: percentage($i / 12);
  }
}

@media (min-width: 768px) {
  @for $i from 1 through 12 {
    .col-md-#{$i} {
      flex: 0 0 auto;
      width: percentage($i / 12);
    }
  }
}

@media (min-width: 992px) {
  @for $i from 1 through 12 {
    .col-lg-#{$i} {
      flex: 0 0 auto;
      width: percentage($i / 12);
    }
  }
}
```

## Grid Utilities
### Spacing
```css
:root {
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 1rem;
  --spacing-4: 1.5rem;
  --spacing-5: 3rem;
}

/* Margin utilities */
.m-1 { margin: var(--spacing-1); }
.m-2 { margin: var(--spacing-2); }
.m-3 { margin: var(--spacing-3); }
.m-4 { margin: var(--spacing-4); }
.m-5 { margin: var(--spacing-5); }

/* Padding utilities */
.p-1 { padding: var(--spacing-1); }
.p-2 { padding: var(--spacing-2); }
.p-3 { padding: var(--spacing-3); }
.p-4 { padding: var(--spacing-4); }
.p-5 { padding: var(--spacing-5); }
```

### Alignment
```css
.justify-content-start { justify-content: flex-start; }
.justify-content-center { justify-content: center; }
.justify-content-end { justify-content: flex-end; }
.justify-content-between { justify-content: space-between; }
.justify-content-around { justify-content: space-around; }

.align-items-start { align-items: flex-start; }
.align-items-center { align-items: center; }
.align-items-end { align-items: flex-end; }
```

## Responsive Patterns
### Auto-fit Grid
```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--grid-gap);
}
```

### Masonry Grid
```css
.masonry-grid {
  columns: 3;
  column-gap: var(--grid-gap);
}

@media (max-width: 992px) {
  .masonry-grid { columns: 2; }
}

@media (max-width: 576px) {
  .masonry-grid { columns: 1; }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: var(--grid-gap);
}
```

## Usage Examples
### Basic Layout
```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Content -->
    </div>
    <div class="col-12 col-md-6 col-lg-4">
      <!-- Content -->
    </div>
    <div class="col-12 col-md-12 col-lg-4">
      <!-- Content -->
    </div>
  </div>
</div>
```

### Complex Layout
```html
<div class="container">
  <div class="row">
    <div class="col-12 col-lg-8">
      <!-- Main Content -->
      <div class="row">
        <div class="col-12 col-md-6">
          <!-- Nested Content -->
        </div>
        <div class="col-12 col-md-6">
          <!-- Nested Content -->
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4">
      <!-- Sidebar -->
    </div>
  </div>
</div>
```

## Best Practices
1. Mobile-First Approach
   - Start with mobile layout
   - Add complexity for larger screens
   - Use breakpoints consistently

2. Semantic Structure
   - Use meaningful class names
   - Follow BEM methodology
   - Maintain consistent naming

3. Performance
   - Minimize nesting levels
   - Use CSS Grid for 2D layouts
   - Use Flexbox for 1D layouts

4. Accessibility
   - Maintain proper document flow
   - Use semantic HTML elements
   - Test with screen readers

## Version History
```markdown
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 1.0     |      |         |         |
``` 