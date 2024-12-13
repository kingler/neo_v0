export default {
  title: 'Project Design System',
  description: 'Atomic Design System Documentation',
  base: '/docs/',
  ignore: ['README.md', 'CHANGELOG.md'],
  typescript: true,
  
  // Theme configuration
  themeConfig: {
    colors: {
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      background: 'hsl(var(--background))',
      text: 'hsl(var(--foreground))',
    },
    styles: {
      root: {
        fontFamily: 'system-ui, sans-serif',
      }
    }
  },

  // Custom menu structure for Atomic Design System
  menu: [
    'Getting Started',
    {
      name: 'Design Tokens',
      menu: ['Colors', 'Typography', 'Spacing', 'Shadows']
    },
    {
      name: 'Atoms',
      menu: ['Buttons', 'Inputs', 'Typography', 'Icons']
    },
    {
      name: 'Molecules',
      menu: ['Form Fields', 'Search Bars', 'Cards']
    },
    {
      name: 'Organisms',
      menu: ['Forms', 'Navigation', 'Headers']
    },
    {
      name: 'Templates',
      menu: ['Page Layouts', 'Grid Systems']
    },
    {
      name: 'Pages',
      menu: ['Example Pages']
    }
  ],

  // Plugins
  plugins: [
    'docz-plugin-css',
    'docz-plugin-netlify'
  ]
} 