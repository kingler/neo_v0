# Page Structures Template

## Metadata
- **Project**: [Project Name]
- **Version**: 1.0.0
- **Last Updated**: YYYY-MM-DD
- **Author(s)**: [Names]

## Basic Page Layout
### Standard Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <header class="site-header">
        <nav class="main-nav">
            <!-- Navigation content -->
        </nav>
    </header>

    <main class="main-content">
        <div class="container">
            <!-- Page content -->
        </div>
    </main>

    <footer class="site-footer">
        <!-- Footer content -->
    </footer>
</body>
</html>
```

```css
.site-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-background);
}

.main-content {
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
    padding: var(--spacing-4) 0;
}

.site-footer {
    margin-top: auto;
    background: var(--color-background-alt);
}
```

## Page Layouts
### Single Column
```html
<div class="layout-single-column">
    <header class="page-header">
        <h1>Page Title</h1>
    </header>
    
    <article class="content">
        <!-- Content -->
    </article>
    
    <footer class="page-footer">
        <!-- Footer -->
    </footer>
</div>
```

```css
.layout-single-column {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--spacing-4);
}

.page-header {
    margin-bottom: var(--spacing-4);
    text-align: center;
}
```

### Two Column
```html
<div class="layout-two-column">
    <main class="main-column">
        <!-- Main content -->
    </main>
    
    <aside class="sidebar-column">
        <!-- Sidebar content -->
    </aside>
</div>
```

```css
.layout-two-column {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--spacing-4);
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-4);
}

@media (max-width: 768px) {
    .layout-two-column {
        grid-template-columns: 1fr;
    }
}
```

### Three Column
```html
<div class="layout-three-column">
    <aside class="left-sidebar">
        <!-- Left sidebar -->
    </aside>
    
    <main class="main-content">
        <!-- Main content -->
    </main>
    
    <aside class="right-sidebar">
        <!-- Right sidebar -->
    </aside>
</div>
```

```css
.layout-three-column {
    display: grid;
    grid-template-columns: 250px 1fr 250px;
    gap: var(--spacing-4);
    max-width: 1400px;
    margin: 0 auto;
    padding: var(--spacing-4);
}

@media (max-width: 1200px) {
    .layout-three-column {
        grid-template-columns: 200px 1fr;
    }
    .right-sidebar {
        grid-column: 1 / -1;
    }
}

@media (max-width: 768px) {
    .layout-three-column {
        grid-template-columns: 1fr;
    }
}
```

## Special Layouts
### Holy Grail
```html
<div class="layout-holy-grail">
    <header class="holy-grail-header">
        <!-- Header -->
    </header>
    
    <div class="holy-grail-body">
        <main class="holy-grail-content">
            <!-- Main content -->
        </main>
        
        <nav class="holy-grail-nav">
            <!-- Navigation -->
        </nav>
        
        <aside class="holy-grail-aside">
            <!-- Sidebar -->
        </aside>
    </div>
    
    <footer class="holy-grail-footer">
        <!-- Footer -->
    </footer>
</div>
```

```css
.layout-holy-grail {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.holy-grail-body {
    display: flex;
    flex: 1;
}

.holy-grail-content {
    flex: 1;
    padding: var(--spacing-4);
}

.holy-grail-nav {
    order: -1;
    width: 200px;
}

.holy-grail-aside {
    width: 200px;
}

@media (max-width: 768px) {
    .holy-grail-body {
        flex-direction: column;
    }
    
    .holy-grail-nav,
    .holy-grail-aside {
        width: 100%;
    }
}
```

### Dashboard
```html
<div class="layout-dashboard">
    <header class="dashboard-header">
        <!-- Header -->
    </header>
    
    <nav class="dashboard-sidebar">
        <!-- Sidebar navigation -->
    </nav>
    
    <main class="dashboard-main">
        <div class="dashboard-toolbar">
            <!-- Toolbar -->
        </div>
        
        <div class="dashboard-content">
            <!-- Main content -->
        </div>
    </main>
</div>
```

```css
.layout-dashboard {
    display: grid;
    grid-template-areas:
        "sidebar header"
        "sidebar main";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
}

.dashboard-header {
    grid-area: header;
    padding: var(--spacing-3);
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
}

.dashboard-sidebar {
    grid-area: sidebar;
    width: 250px;
    background: var(--color-background-alt);
    border-right: 1px solid var(--color-border);
}

.dashboard-main {
    grid-area: main;
    display: flex;
    flex-direction: column;
}

.dashboard-toolbar {
    padding: var(--spacing-3);
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
}

.dashboard-content {
    flex: 1;
    padding: var(--spacing-4);
    overflow: auto;
}

@media (max-width: 768px) {
    .layout-dashboard {
        grid-template-areas:
            "header"
            "main";
        grid-template-columns: 1fr;
    }
    
    .dashboard-sidebar {
        display: none;
    }
}
```

## Best Practices
1. Page Structure
   - Use semantic HTML5 elements
   - Maintain consistent layout patterns
   - Consider document outline

2. Responsive Design
   - Mobile-first approach
   - Fluid layouts
   - Breakpoint consistency

3. Performance
   - Minimize layout shifts
   - Optimize critical rendering path
   - Lazy load off-screen content

4. Accessibility
   - Logical tab order
   - Skip navigation links
   - Landmark roles

## Version History
```markdown
| Version | Date | Changes | Author |
|---------|------|---------|---------|
| 1.0     |      |         |         |
``` 