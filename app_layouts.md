# Application Layouts Reference Guide

## Layout Mapping Table

| Layout Pattern | Tailwind CSS Classes | HTML Example | shadcn-ui Component | Atomic Design Level |
|----------------|---------------------|--------------|-------------------|-------------------|
| **Fixed Top Navigation** | `fixed top-0 w-full bg-white shadow-md` | ```<nav class="fixed top-0 w-full bg-white shadow-md">...</nav>``` | NavigationMenu | Organism |
| **Side Navigation** | `fixed left-0 h-full w-64 bg-slate-800` | ```<aside class="fixed left-0 h-full w-64 bg-slate-800">...</aside>``` | Sheet | Organism |
| **Card Grid** | `grid grid-cols-1 md:grid-cols-3 gap-4` | ```<div class="grid grid-cols-1 md:grid-cols-3 gap-4">...</div>``` | Card | Molecule |
| **Dashboard Layout** | `grid grid-cols-12 gap-4` | ```<main class="grid grid-cols-12 gap-4">...</main>``` | - | Template |
| **Data Table** | `w-full divide-y divide-gray-200` | ```<table class="w-full divide-y divide-gray-200">...</table>``` | Table | Organism |
| **Modal Window** | `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center` | ```<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">...</div>``` | Dialog | Molecule |
| **Form Layout** | `flex flex-col space-y-4` | ```<form class="flex flex-col space-y-4">...</form>``` | Form | Organism |
| **Calendar View** | `grid grid-cols-7 gap-px` | ```<div class="grid grid-cols-7 gap-px">...</div>``` | Calendar | Organism |
| **Kanban Board** | `flex overflow-x-auto space-x-4` | ```<div class="flex overflow-x-auto space-x-4">...</div>``` | - | Template |
| **Mobile Navigation** | `fixed bottom-0 w-full md:hidden` | ```<nav class="fixed bottom-0 w-full md:hidden">...</nav>``` | NavigationMenu | Organism |
| **Search Interface** | `relative flex items-center` | ```<div class="relative flex items-center">...</div>``` | Command | Molecule |
| **Filter System** | `flex flex-wrap gap-2` | ```<div class="flex flex-wrap gap-2">...</div>``` | Select | Molecule |
| **Dialog Box** | `rounded-lg shadow-xl p-6 bg-white` | ```<div class="rounded-lg shadow-xl p-6 bg-white">...</div>``` | AlertDialog | Molecule |
| **User Profile** | `flex items-center space-x-4` | ```<div class="flex items-center space-x-4">...</div>``` | Avatar | Molecule |
| **Settings Panel** | `grid grid-cols-1 gap-6 md:grid-cols-2` | ```<div class="grid grid-cols-1 gap-6 md:grid-cols-2">...</div>``` | Tabs | Organism |

## Responsive Patterns

| Breakpoint | Tailwind Class | Usage |
|------------|----------------|--------|
| Mobile | `sm:` | < 640px |
| Tablet | `md:` | ≥ 768px |
| Desktop | `lg:` | ≥ 1024px |
| Large Desktop | `xl:` | ≥ 1280px |

## Common Flex Patterns

```html
<!-- Center Content -->
<div class="flex items-center justify-center">
<!-- Vertical Stack -->
<div class="flex flex-col space-y-4">
<!-- Horizontal Row -->
<div class="flex space-x-4">
```

## Common Grid Patterns

```html
<!-- Basic Grid -->
<div class="grid grid-cols-4 gap-4">
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<!-- Auto-fit Grid -->
<div class="grid grid-cols-auto-fit gap-4">
```

## Accessibility Considerations

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation
- Maintain color contrast ratios
- Support screen readers

## Best Practices

1. Use consistent spacing with Tailwind's spacing scale
2. Implement mobile-first responsive design
3. Leverage shadcn-ui components for consistent UI
4. Follow Atomic Design principles for component organization
5. Maintain accessibility standards throughout
