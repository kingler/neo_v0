# Layout Scanner Agent

{
  "designTokens": {
    "dimensions": {
      "viewport": {
        "width": "100vw",
        "height": "100vh"
      },
      "header-height": "64px",
      "sidebar-width": "240px"
    },
    "colors": {
      "surface-low": "#f5f5f5",
      "surface-medium": "#e0e0e0",
      "surface-high": "#cccccc"
    },
    "spacing": {
      "gap-sm": "8px",
      "gap-md": "16px",
      "gap-lg": "24px"
    }
  },
  "layout": {
    "container": {
      "type": "fullscreen",
      "width": "{dimensions.viewport.width}",
      "height": "{dimensions.viewport.height}",
      "x": 0,
      "y": 0,
      "color": "{colors.surface-low}",
      "children": [
        {
          "name": "header",
          "element": "div",
          "width": "100%",
          "height": "{dimensions.header-height}",
          "x": 0,
          "y": 0,
          "color": "{colors.surface-medium}"
        },
        {
          "name": "sidebar",
          "element": "div",
          "width": "{dimensions.sidebar-width}",
          "height": "calc(100% - {dimensions.header-height})",
          "x": 0,
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-high}"
        },
        {
          "name": "main-content",
          "element": "div",
          "width": "calc(100% - {dimensions.sidebar-width})",
          "height": "calc(100% - {dimensions.header-height})",
          "x": "{dimensions.sidebar-width}",
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-low}",
          "children": [
            {
              "name": "content-section",
              "element": "div",
              "width": "100%",
              "height": "auto",
              "x": 0,
              "y": 0,
              "color": "{colors.surface-medium}",
              "notes": "Placeholder area for main content blocks"
            }
          ]
        }
      ]
    }
  }
}

## Style Scanner Agent

    ```json
    
    {
      "designTokens": {
        "dimensions": {
          "viewport": {
            "width": "100vw",
            "height": "100vh"
          },
          "header-height": "64px",
          "sidebar-width": "240px"
        },
        "colors": {
          "brand-primary": "#1A73E8",
          "brand-secondary": "#FF5722",
          "background-default": "#F5F5F5",
          "border-default": "#BDBDBD",
          "error": "#D32F2F",
          "warning": "#FFA000",
          "success": "#388E3C",
          "text-primary": "#333333",
          "text-secondary": "#555555",
          "surface-low": "#f5f5f5",
          "surface-medium": "#e0e0e0",
          "surface-high": "#cccccc"
        },
        "spacing": {
          "gap-sm": "8px",
          "gap-md": "16px",
          "gap-lg": "24px"
        },
        "typography": {
          "fontFamily": "'Inter', sans-serif",
          "fontWeights": {
            "thin": "100",
            "light": "300",
            "normal": "400",
            "medium": "500",
            "semibold": "600",
            "bold": "700",
            "extrabold": "800",
            "black": "900"
          },
          "lineHeights": {
            "normal": "1.5",
            "tight": "1.2",
            "loose": "1.8"
          },
          "fontSizes": {
            "xs": "0.75rem",
            "sm": "0.875rem",
            "base": "1rem",
            "lg": "1.125rem",
            "xl": "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem"
          },
          "headerText": {
            "fontFamily": "{typography.fontFamily}",
            "fontWeight": "{typography.fontWeights.bold}",
            "lineHeight": "{typography.lineHeights.normal}",
            "fontSize": "{typography.fontSizes.3xl}",
            "color": "{colors.brand-primary}"
          },
          "bodyText": {
            "fontFamily": "{typography.fontFamily}",
            "fontWeight": "{typography.fontWeights.normal}",
            "lineHeight": "{typography.lineHeights.normal}",
            "fontSize": "{typography.fontSizes.base}",
            "color": "{colors.text-primary}"
          },
          "sublineText": {
            "fontFamily": "{typography.fontFamily}",
            "fontWeight": "{typography.fontWeights.light}",
            "lineHeight": "{typography.lineHeights.normal}",
            "fontSize": "{typography.fontSizes.sm}",
            "color": "{colors.text-secondary}"
          }
        },
        "shadows": {
          "elevation-1": "0 1px 3px rgba(0,0,0,0.12)",
          "elevation-2": "0 3px 6px rgba(0,0,0,0.16)"
        }
      },
      "layout": {
        "container": {
          "type": "fullscreen",
          "width": "{dimensions.viewport.width}",
          "height": "{dimensions.viewport.height}",
          "x": 0,
          "y": 0,
          "color": "{colors.background-default}",
          "children": [
            {
              "name": "header",
              "element": "div",
              "width": "100%",
              "height": "{dimensions.header-height}",
              "x": 0,
              "y": 0,
              "color": "{colors.surface-medium}",
              "typography": "{typography.headerText}",
              "shadow": "{shadows.elevation-1}"
            },
            {
              "name": "sidebar",
              "element": "div",
              "width": "{dimensions.sidebar-width}",
              "height": "calc(100% - {dimensions.header-height})",
              "x": 0,
              "y": "{dimensions.header-height}",
              "color": "{colors.surface-high}",
              "typography": "{typography.bodyText}",
              "shadow": "{shadows.elevation-1}"
            },
            {
              "name": "main-content",
              "element": "div",
              "width": "calc(100% - {dimensions.sidebar-width})",
              "height": "calc(100% - {dimensions.header-height})",
              "x": "{dimensions.sidebar-width}",
              "y": "{dimensions.header-height}",
              "color": "{colors.surface-low}",
              "typography": "{typography.bodyText}",
              "shadow": "{shadows.elevation-1}",
              "children": [
                {
                  "name": "content-section",
                  "element": "div",
                  "width": "100%",
                  "height": "auto",
                  "x": 0,
                  "y": 0,
                  "color": "{colors.surface-medium}",
                  "typography": "{typography.sublineText}",
                  "notes": "Placeholder area for main content blocks"
                }
              ]
            }
          ]
        }
      }
    }
    ```

## UI Element Scanner Agent

{
  "designTokens": {
    "dimensions": {
      "viewport": {
        "width": "100vw",
        "height": "100vh"
      },
      "header-height": "64px",
      "sidebar-width": "240px"
    },
    "colors": {
      "brand-primary": "#1A73E8",
      "brand-secondary": "#FF5722",
      "background-default": "#F5F5F5",
      "border-default": "#BDBDBD",
      "error": "#D32F2F",
      "warning": "#FFA000",
      "success": "#388E3C",
      "text-primary": "#333333",
      "text-secondary": "#555555",
      "surface-low": "#f5f5f5",
      "surface-medium": "#e0e0e0",
      "surface-high": "#cccccc"
    },
    "spacing": {
      "gap-sm": "8px",
      "gap-md": "16px",
      "gap-lg": "24px"
    },
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontWeights": {
        "thin": "100",
        "light": "300",
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700",
        "extrabold": "800",
        "black": "900"
      },
      "lineHeights": {
        "normal": "1.5",
        "tight": "1.2",
        "loose": "1.8"
      },
      "fontSizes": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem"
      },
      "headerText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.bold}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.3xl}",
        "color": "{colors.brand-primary}"
      },
      "bodyText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.normal}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.base}",
        "color": "{colors.text-primary}"
      },
      "sublineText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.light}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.sm}",
        "color": "{colors.text-secondary}"
      }
    },
    "shadows": {
      "elevation-1": "0 1px 3px rgba(0,0,0,0.12)",
      "elevation-2": "0 3px 6px rgba(0,0,0,0.16)"
    }
  },
  "layout": {
    "container": {
      "type": "fullscreen",
      "width": "{dimensions.viewport.width}",
      "height": "{dimensions.viewport.height}",
      "x": 0,
      "y": 0,
      "color": "{colors.background-default}",
      "children": [
        {
          "name": "header",
          "component": "NavigationMenu",
          "width": "100%",
          "height": "{dimensions.header-height}",
          "x": 0,
          "y": 0,
          "color": "{colors.surface-medium}",
          "typography": "{typography.headerText}",
          "shadow": "{shadows.elevation-1}",
          "props": {
            "items": [
              {
                "type": "link",
                "label": "Home",
                "href": "/",
                "component": "Button"
              },
              {
                "type": "link",
                "label": "Profile",
                "href": "/profile",
                "component": "Button"
              },
              {
                "type": "menu",
                "label": "More",
                "component": "DropdownMenu",
                "menuItems": [
                  { "label": "Settings", "href": "/settings" },
                  { "label": "Help", "href": "/help" }
                ]
              }
            ]
          }
        },
        {
          "name": "sidebar",
          "component": "NavigationMenu",
          "width": "{dimensions.sidebar-width}",
          "height": "calc(100% - {dimensions.header-height})",
          "x": 0,
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-high}",
          "typography": "{typography.bodyText}",
          "shadow": "{shadows.elevation-1}",
          "props": {
            "orientation": "vertical",
            "items": [
              {
                "type": "link",
                "label": "Dashboard",
                "href": "/dashboard",
                "component": "Button"
              },
              {
                "type": "link",
                "label": "Reports",
                "href": "/reports",
                "component": "Button"
              },
              {
                "type": "menu",
                "label": "Settings",
                "component": "Accordion",
                "items": [
                  { "label": "General", "href": "/settings/general" },
                  { "label": "Security", "href": "/settings/security" }
                ]
              }
            ]
          }
        },
        {
          "name": "main-content",
          "element": "div",
          "width": "calc(100% - {dimensions.sidebar-width})",
          "height": "calc(100% - {dimensions.header-height})",
          "x": "{dimensions.sidebar-width}",
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-low}",
          "typography": "{typography.bodyText}",
          "shadow": "{shadows.elevation-1}",
          "children": [
            {
              "name": "content-section",
              "component": "Card",
              "width": "100%",
              "height": "auto",
              "x": 0,
              "y": 0,
              "color": "{colors.surface-medium}",
              "typography": "{typography.sublineText}",
              "notes": "Placeholder area for main content blocks",
              "children": [
                {
                  "name": "search-area",
                  "component": "Input",
                  "props": {
                    "placeholder": "Search...",
                    "type": "text"
                  }
                },
                {
                  "name": "content-table",
                  "component": "Table",
                  "props": {
                    "headers": ["Name", "Status", "Actions"],
                    "rows": [
                      { "Name": "Item A", "Status": "Active", "Actions": "Edit/Delete" },
                      { "Name": "Item B", "Status": "Pending", "Actions": "Edit/Delete" }
                    ]
                  }
                },
                {
                  "name": "filters",
                  "component": "RadioGroup",
                  "props": {
                    "name": "statusFilter",
                    "options": [
                      { "value": "all", "label": "All" },
                      { "value": "active", "label": "Active" },
                      { "value": "pending", "label": "Pending" }
                    ]
                  }
                },
                {
                  "name": "modal-trigger",
                  "component": "Button",
                  "props": {
                    "label": "Open Modal",
                    "variant": "default"
                  },
                  "children": [
                    {
                      "name": "modal-dialog",
                      "component": "Dialog",
                      "props": {
                        "title": "Confirm Action",
                        "description": "Are you sure you want to proceed?",
                        "open": false,
                        "actions": [
                          { "label": "Cancel", "component": "Button", "variant": "secondary" },
                          { "label": "Confirm", "component": "Button", "variant": "primary" }
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

## Design Director Agent

{
  "meta": {
    "role": "DesignDirectorAgent",
    "iterations": 3,
    "originalScreenshotReference": "screenshot_url_or_id",
    "grade": "A-", 
    "notes": "The final JSON closely matches the screenshot with minimal discrepancies in font sizes on header text. Adjusted and corrected in iteration 2."
  },
  "designTokens": {
    "dimensions": {
      "viewport": { "width": "100vw", "height": "100vh" },
      "header-height": "64px",
      "sidebar-width": "240px"
    },
    "colors": {
      "brand-primary": "#1A73E8",
      "brand-secondary": "#FF5722",
      "background-default": "#F5F5F5",
      "border-default": "#BDBDBD",
      "error": "#D32F2F",
      "warning": "#FFA000",
      "success": "#388E3C",
      "text-primary": "#333333",
      "text-secondary": "#555555",
      "surface-low": "#f5f5f5",
      "surface-medium": "#e0e0e0",
      "surface-high": "#cccccc"
    },
    "spacing": {
      "gap-sm": "8px",
      "gap-md": "16px",
      "gap-lg": "24px"
    },
    "typography": {
      "fontFamily": "'Inter', sans-serif",
      "fontWeights": {
        "thin": "100",
        "light": "300",
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700",
        "extrabold": "800",
        "black": "900"
      },
      "lineHeights": {
        "normal": "1.5",
        "tight": "1.2",
        "loose": "1.8"
      },
      "fontSizes": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem"
      },
      "headerText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.bold}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.3xl}",
        "color": "{colors.brand-primary}"
      },
      "bodyText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.normal}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.base}",
        "color": "{colors.text-primary}"
      },
      "sublineText": {
        "fontFamily": "{typography.fontFamily}",
        "fontWeight": "{typography.fontWeights.light}",
        "lineHeight": "{typography.lineHeights.normal}",
        "fontSize": "{typography.fontSizes.sm}",
        "color": "{colors.text-secondary}"
      }
    },
    "shadows": {
      "elevation-1": "0 1px 3px rgba(0,0,0,0.12)",
      "elevation-2": "0 3px 6px rgba(0,0,0,0.16)"
    }
  },
  "layout": {
    "container": {
      "type": "fullscreen",
      "width": "{dimensions.viewport.width}",
      "height": "{dimensions.viewport.height}",
      "x": 0,
      "y": 0,
      "color": "{colors.background-default}",
      "children": [
        {
          "name": "header",
          "component": "NavigationMenu",
          "width": "100%",
          "height": "{dimensions.header-height}",
          "x": 0,
          "y": 0,
          "color": "{colors.surface-medium}",
          "typography": "{typography.headerText}",
          "shadow": "{shadows.elevation-1}",
          "props": {
            "items": [
              {
                "type": "link",
                "label": "Home",
                "href": "/",
                "component": "Button"
              },
              {
                "type": "link",
                "label": "Profile",
                "href": "/profile",
                "component": "Button"
              },
              {
                "type": "menu",
                "label": "More",
                "component": "DropdownMenu",
                "menuItems": [
                  { "label": "Settings", "href": "/settings" },
                  { "label": "Help", "href": "/help" }
                ]
              }
            ]
          }
        },
        {
          "name": "sidebar",
          "component": "NavigationMenu",
          "width": "{dimensions.sidebar-width}",
          "height": "calc(100% - {dimensions.header-height})",
          "x": 0,
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-high}",
          "typography": "{typography.bodyText}",
          "shadow": "{shadows.elevation-1}",
          "props": {
            "orientation": "vertical",
            "items": [
              {
                "type": "link",
                "label": "Dashboard",
                "href": "/dashboard",
                "component": "Button"
              },
              {
                "type": "link",
                "label": "Reports",
                "href": "/reports",
                "component": "Button"
              },
              {
                "type": "menu",
                "label": "Settings",
                "component": "Accordion",
                "items": [
                  { "label": "General", "href": "/settings/general" },
                  { "label": "Security", "href": "/settings/security" }
                ]
              }
            ]
          }
        },
        {
          "name": "main-content",
          "element": "div",
          "width": "calc(100% - {dimensions.sidebar-width})",
          "height": "calc(100% - {dimensions.header-height})",
          "x": "{dimensions.sidebar-width}",
          "y": "{dimensions.header-height}",
          "color": "{colors.surface-low}",
          "typography": "{typography.bodyText}",
          "shadow": "{shadows.elevation-1}",
          "children": [
            {
              "name": "content-section",
              "component": "Card",
              "width": "100%",
              "height": "auto",
              "x": 0,
              "y": 0,
              "color": "{colors.surface-medium}",
              "typography": "{typography.sublineText}",
              "notes": "Main content blocks",
              "children": [
                {
                  "name": "search-area",
                  "component": "Input",
                  "props": {
                    "placeholder": "Search...",
                    "type": "text"
                  }
                },
                {
                  "name": "content-table",
                  "component": "Table",
                  "props": {
                    "headers": ["Name", "Status", "Actions"],
                    "rows": [
                      { "Name": "Item A", "Status": "Active", "Actions": "Edit/Delete" },
                      { "Name": "Item B", "Status": "Pending", "Actions": "Edit/Delete" }
                    ]
                  }
                },
                {
                  "name": "filters",
                  "component": "RadioGroup",
                  "props": {
                    "name": "statusFilter",
                    "options": [
                      { "value": "all", "label": "All" },
                      { "value": "active", "label": "Active" },
                      { "value": "pending", "label": "Pending" }
                    ]
                  }
                },
                {
                  "name": "modal-trigger",
                  "component": "Button",
                  "props": {
                    "label": "Open Modal",
                    "variant": "default"
                  },
                  "children": [
                    {
                      "name": "modal-dialog",
                      "component": "Dialog",
                      "props": {
                        "title": "Confirm Action",
                        "description": "Are you sure you want to proceed?",
                        "open": false,
                        "actions": [
                          {
                            "label": "Cancel",
                            "component": "Button",
                            "variant": "secondary"
                          },
                          {
                            "label": "Confirm",
                            "component": "Button",
                            "variant": "primary"
                          }
                        ]
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  "revisionLogs": [
    {
      "iteration": 1,
      "agent": "DesignDirectorAgent",
      "feedback": "Header font size mismatches screenshot. Increase to 3xl.",
      "changesRequested": ["{typography.headerText.fontSize} from 2xl to 3xl"]
    },
    {
      "iteration": 2,
      "agent": "UIElementScannerAgent",
      "feedback": "Updated button labels to match screenshot’s text exactly.",
      "changesMade": ["Profile -> 'User Profile'", "More -> 'More Options'"]
    },
    {
      "iteration": 3,
      "agent": "DesignDirectorAgent",
      "feedback": "Color contrast in sidebar acceptable now. Finalizing JSON.",
      "changesAccepted": true
    }
  ]
}