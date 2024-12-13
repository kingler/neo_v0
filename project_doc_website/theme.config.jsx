export default {
  logo: <span>SDLC Documentation</span>,
  project: {
    link: 'https://github.com/yourusername/project-name'
  },
  docsRepositoryBase: 'https://github.com/yourusername/project-name/tree/main/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – SDLC Documentation'
    }
  },
  primaryHue: 210,
  navigation: {
    prev: true,
    next: true
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} Your Project Name. All rights reserved.
        </p>
      </div>
    )
  }
} 