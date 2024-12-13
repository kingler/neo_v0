# Component Layouts Template

## Metadata
- **Project**: [Project Name]
- **Version**: 1.0.0
- **Last Updated**: YYYY-MM-DD
- **Author(s)**: [Names]

## Basic Components
### Card
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Title</h3>
  </div>
  <div class="card-body">
    <p class="card-text">Content</p>
  </div>
  <div class="card-footer">
    <button class="btn">Action</button>
  </div>
</div>
```

```css
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  background: var(--color-background);
}

.card-header,
.card-body,
.card-footer {
  padding: var(--spacing-3);
}

.card-header {
  border-bottom: 1px solid var(--color-border);
}

.card-footer {
  border-top: 1px solid var(--color-border);
  margin-top: auto;
}
```

### Form Group
```html
<div class="form-group">
  <label class="form-label" for="input">Label</label>
  <input class="form-input" id="input" type="text">
  <span class="form-help">Helper text</span>
</div>
```

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-3);
}

.form-label {
  font-weight: 500;
}

.form-input {
  padding: var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.form-help {
  font-size: 0.875em;
  color: var(--color-text-muted);
}
```

## Navigation Components
### Navbar
```html
<nav class="navbar">
  <div class="navbar-brand">Logo</div>
  <ul class="navbar-nav">
    <li class="nav-item">
      <a class="nav-link" href="#">Link</a>
    </li>
  </ul>
  <div class="navbar-actions">
    <button class="btn">Action</button>
  </div>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  background: var(--color-background);
  box-shadow: var(--shadow-sm);
}

.navbar-nav {
  display: flex;
  gap: var(--spacing-3);
  margin: 0 auto;
  list-style: none;
}

.navbar-actions {
  margin-left: auto;
}
```

### Sidebar
```html
<aside class="sidebar">
  <div class="sidebar-header">Header</div>
  <nav class="sidebar-nav">
    <ul class="nav-list">
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
    </ul>
  </nav>
  <div class="sidebar-footer">Footer</div>
</aside>
```

```css
.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background: var(--color-background);
  border-right: 1px solid var(--color-border);
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-3);
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  list-style: none;
}
```

## Content Components
### Media Object
```html
<div class="media">
  <div class="media-image">
    <img src="image.jpg" alt="Media">
  </div>
  <div class="media-content">
    <h4 class="media-title">Title</h4>
    <p class="media-text">Content</p>
  </div>
</div>
```

```css
.media {
  display: flex;
  gap: var(--spacing-3);
  align-items: start;
}

.media-image {
  flex-shrink: 0;
}

.media-content {
  flex: 1;
  min-width: 0;
}
```

### List Group
```html
<ul class="list-group">
  <li class="list-item">
    <div class="list-content">
      <h4 class="list-title">Title</h4>
      <p class="list-text">Content</p>
    </div>
    <div class="list-actions">
      <button class="btn">Action</button>
    </div>
  </li>
</ul>
```

```css
.list-group {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.list-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-3);
  border-bottom: 1px solid var(--color-border);
}

.list-content {
  flex: 1;
  min-width: 0;
}

.list-actions {
  margin-left: var(--spacing-3);
}
```

## Modal Components
### Modal Dialog
```html
<div class="modal">
  <div class="modal-dialog">
    <div class="modal-header">
      <h3 class="modal-title">Title</h3>
      <button class="modal-close">×</button>
    </div>
    <div class="modal-body">Content</div>
    <div class="modal-footer">
      <button class="btn">Action</button>
    </div>
  </div>
</div>
```

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  background: var(--color-background);
  border-radius: var(--border-radius);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--spacing-3);
}
```

## Layout Patterns
### Split View
```html
<div class="split-view">
  <div class="split-primary">Primary Content</div>
  <div class="split-secondary">Secondary Content</div>
</div>
```

```css
.split-view {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--spacing-3);
  height: 100%;
}

@media (max-width: 768px) {
  .split-view {
    grid-template-columns: 1fr;
  }
}
```

### Dashboard Grid
```html
<div class="dashboard-grid">
  <div class="dashboard-item">Widget</div>
  <div class="dashboard-item">Widget</div>
  <div class="dashboard-item">Widget</div>
</div>
```

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-3);
  padding: var(--spacing-3);
}

.dashboard-item {
  background: var(--color-background);
  border-radius: var(--border-radius);
  padding: var(--spacing-3);
}
```

## Best Practices
1. Component Structure
   - Use semantic HTML
   - Keep components modular
   - Follow consistent naming

2. Responsive Design
   - Use flexible layouts
   - Test on all breakpoints
   - Consider mobile interactions

3. Accessibility
   - Include ARIA labels
   - Ensure keyboard navigation
   - Maintain focus management

4. Performance
   - Minimize DOM nesting
   - Use CSS Grid/Flexbox
   - Optimize reflows/repaints

## Version History
```markdown
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 1.0     |      |         |         |