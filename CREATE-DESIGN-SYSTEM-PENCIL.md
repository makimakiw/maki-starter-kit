# Create Design System Pencil File

Please create a Pencil (.pen) file with the following design system components and tokens.

**IMPORTANT:** This file includes visual compensation adjustments to match browser rendering:
- Button text: 17px (not 16px) with letter-spacing -0.2 and font-weight 500
- Button heights: 44px (default) and 50px (large)
- Input fields: 44px tall with 16px text
- All values use design tokens with $ prefix

## File Setup

```
filePath: design-system-showcase.pen
```

## Variables (Design Tokens)

Create these variables in the Pencil file:

```javascript
// Colors
$color-primary: #3B82F6
$color-primary-foreground: #FFFFFF
$color-secondary: #D9D9DB
$color-secondary-foreground: #2A2933
$color-background: #FFFFFF
$color-foreground: #2A2933
$color-surface-base: #FFFFFF
$color-surface-elevated: #F5F5F5
$color-text-primary: #2A2933
$color-text-secondary: #616167
$color-text-muted: #939399
$color-border: #C5C5CB
$color-input: #C5C5CB
$color-destructive: #CC3314
$color-destructive-foreground: #FFFFFF
$color-state-success: #A1E5A1
$color-state-error: #FFBFB2

// Spacing
$spacing-1: 4
$spacing-2: 8
$spacing-3: 12
$spacing-4: 16
$spacing-6: 24
$spacing-8: 32
$spacing-12: 48

// Typography
$font-size-xs: 12
$font-size-sm: 14
$font-size-base: 16
$font-size-lg: 18
$font-size-xl: 20
$font-size-2xl: 24

// Radii
$radius-xs: 6
$radius-sm: 12
$radius-m: 24
$radius-pill: 999

// Shadows
$shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
$shadow-md: 0 4px 6px rgba(0,0,0,0.1)
$shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
$shadow-xl: 0 20px 25px rgba(0,0,0,0.1)
```

## Component: Button Primary (Reusable)

Create a reusable component named "Button-Primary":

```javascript
{
  name: "Button-Primary",
  reusable: true,
  type: "frame",
  width: "auto",
  height: 44,
  paddingLeft: $spacing-6,
  paddingRight: $spacing-6,
  backgroundColor: $color-primary,
  borderRadius: $radius-pill,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  itemSpacing: $spacing-2,
  children: [
    {
      type: "text",
      content: "Primary Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: $color-primary-foreground,
      textGrowth: "auto"
    }
  ]
}
```

## Component: Button Secondary (Reusable)

Create a reusable component named "Button-Secondary":

```javascript
{
  name: "Button-Secondary",
  reusable: true,
  type: "frame",
  width: "auto",
  height: 44,
  paddingLeft: $spacing-6,
  paddingRight: $spacing-6,
  backgroundColor: $color-secondary,
  borderRadius: $radius-pill,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Secondary Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: $color-secondary-foreground,
      textGrowth: "auto"
    }
  ]
}
```

## Component: Button Outline (Reusable)

Create a reusable component named "Button-Outline":

```javascript
{
  name: "Button-Outline",
  reusable: true,
  type: "frame",
  width: "auto",
  height: 44,
  paddingLeft: $spacing-6,
  paddingRight: $spacing-6,
  backgroundColor: "transparent",
  borderRadius: $radius-pill,
  strokeWeight: 2,
  stroke: $color-border,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Outline Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: $color-text-primary,
      textGrowth: "auto"
    }
  ]
}
```

## Component: Button Large (Reusable)

Create a reusable component named "Button-Large":

```javascript
{
  name: "Button-Large",
  reusable: true,
  type: "frame",
  width: "auto",
  height: 50,
  paddingLeft: $spacing-8,
  paddingRight: $spacing-8,
  backgroundColor: $color-primary,
  borderRadius: $radius-pill,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Large Button",
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: $color-primary-foreground,
      textGrowth: "auto"
    }
  ]
}
```

## Component: Input Default (Reusable)

Create a reusable component named "Input-Default":

```javascript
{
  name: "Input-Default",
  reusable: true,
  type: "frame",
  width: 320,
  layoutMode: "vertical",
  itemSpacing: $spacing-2,
  children: [
    {
      type: "text",
      content: "Email",
      fontSize: 15,
      fontWeight: 500,
      fill: $color-text-primary,
      textGrowth: "fixed-width"
    },
    {
      type: "frame",
      width: "fill",
      height: 44,
      backgroundColor: $color-background,
      borderRadius: $radius-sm,
      strokeWeight: 2,
      stroke: $color-input,
      paddingLeft: $spacing-4,
      paddingRight: $spacing-4,
      layoutMode: "horizontal",
      primaryAxisAlignItems: "center",
      children: [
        {
          type: "text",
          content: "Enter your email",
          fontSize: 16,
          fill: $color-text-muted,
          textGrowth: "auto"
        }
      ]
    }
  ]
}
```

## Component: Input Error (Reusable)

Create a reusable component named "Input-Error":

```javascript
{
  name: "Input-Error",
  reusable: true,
  type: "frame",
  width: 320,
  layoutMode: "vertical",
  itemSpacing: $spacing-2,
  children: [
    {
      type: "text",
      content: "Password",
      fontSize: 15,
      fontWeight: 500,
      fill: $color-text-primary,
      textGrowth: "fixed-width"
    },
    {
      type: "frame",
      width: "fill",
      height: 44,
      backgroundColor: $color-background,
      borderRadius: $radius-sm,
      strokeWeight: 2,
      stroke: $color-destructive,
      paddingLeft: $spacing-4,
      paddingRight: $spacing-4,
      layoutMode: "horizontal",
      primaryAxisAlignItems: "center",
      children: [
        {
          type: "text",
          content: "••••••••",
          fontSize: 16,
          fill: $color-text-primary,
          textGrowth: "auto"
        }
      ]
    },
    {
      type: "text",
      content: "This field is required",
      fontSize: 13,
      fill: $color-destructive,
      textGrowth: "fixed-width"
    }
  ]
}
```

## Component: Modal (Reusable)

Create a reusable component named "Modal":

```javascript
{
  name: "Modal",
  reusable: true,
  type: "frame",
  width: 448,
  backgroundColor: $color-surface-base,
  borderRadius: $radius-m,
  padding: $spacing-6,
  effects: [$shadow-xl],
  layoutMode: "vertical",
  itemSpacing: $spacing-4,
  children: [
    {
      type: "text",
      content: "Test Modal",
      fontSize: $font-size-xl,
      fontWeight: 700,
      fill: $color-text-primary,
      textGrowth: "fixed-width"
    },
    {
      type: "text",
      content: "This is a modal dialog. Click outside or press ESC to close.",
      fontSize: $font-size-base,
      fill: $color-text-secondary,
      textGrowth: "fixed-width",
      lineHeight: 1.5
    },
    {
      type: "frame",
      width: "fill",
      layoutMode: "horizontal",
      primaryAxisAlignItems: "end",
      itemSpacing: $spacing-3,
      children: [
        {
          type: "instance",
          componentName: "Button-Outline",
          overrides: { text: "Cancel" }
        },
        {
          type: "instance",
          componentName: "Button-Primary",
          overrides: { text: "Confirm" }
        }
      ]
    }
  ]
}
```

## Component: EmptyState (Reusable)

Create a reusable component named "EmptyState":

```javascript
{
  name: "EmptyState",
  reusable: true,
  type: "frame",
  width: 400,
  padding: $spacing-12,
  layoutMode: "vertical",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  itemSpacing: $spacing-4,
  children: [
    {
      type: "text",
      content: "📭",
      fontSize: 48,
      textGrowth: "auto"
    },
    {
      type: "text",
      content: "No items found",
      fontSize: $font-size-lg,
      fontWeight: 600,
      fill: $color-text-primary,
      textGrowth: "fixed-width"
    },
    {
      type: "text",
      content: "Try adjusting your filters or search terms",
      fontSize: $font-size-base,
      fill: $color-text-secondary,
      textGrowth: "fixed-width",
      textAlign: "center",
      lineHeight: 1.5
    },
    {
      type: "instance",
      componentName: "Button-Primary",
      overrides: { text: "Clear Filters" }
    }
  ]
}
```

## Component: Placeholder (Reusable)

Create 4 placeholder variations:

### Placeholder Square:
```javascript
{
  name: "Placeholder-Square",
  reusable: true,
  type: "frame",
  width: 200,
  height: 200,
  backgroundColor: $color-surface-elevated,
  borderRadius: $radius-m,
  strokeWeight: 2,
  strokeDashArray: [8, 8],
  stroke: $color-border,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Square Image",
      fontSize: $font-size-sm,
      fill: $color-text-muted,
      textGrowth: "auto"
    }
  ]
}
```

### Placeholder Video (16:9):
```javascript
{
  name: "Placeholder-Video",
  reusable: true,
  type: "frame",
  width: 320,
  height: 180,
  backgroundColor: $color-surface-elevated,
  borderRadius: $radius-m,
  strokeWeight: 2,
  strokeDashArray: [8, 8],
  stroke: $color-border,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Video Thumbnail",
      fontSize: $font-size-sm,
      fill: $color-text-muted,
      textGrowth: "auto"
    }
  ]
}
```

### Placeholder Portrait (3:4):
```javascript
{
  name: "Placeholder-Portrait",
  reusable: true,
  type: "frame",
  width: 150,
  height: 200,
  backgroundColor: $color-surface-elevated,
  borderRadius: $radius-m,
  strokeWeight: 2,
  strokeDashArray: [8, 8],
  stroke: $color-border,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Portrait Photo",
      fontSize: $font-size-sm,
      fill: $color-text-muted,
      textGrowth: "auto"
    }
  ]
}
```

### Placeholder Landscape (4:3):
```javascript
{
  name: "Placeholder-Landscape",
  reusable: true,
  type: "frame",
  width: 320,
  height: 240,
  backgroundColor: $color-surface-elevated,
  borderRadius: $radius-m,
  strokeWeight: 2,
  strokeDashArray: [8, 8],
  stroke: $color-border,
  layoutMode: "horizontal",
  primaryAxisAlignItems: "center",
  counterAxisAlignItems: "center",
  children: [
    {
      type: "text",
      content: "Landscape Photo",
      fontSize: $font-size-sm,
      fill: $color-text-muted,
      textGrowth: "auto"
    }
  ]
}
```

## Main Showcase Page

Create the main page layout with all components:

```javascript
{
  name: "Design-System-Showcase",
  type: "frame",
  width: 1200,
  backgroundColor: $color-background,
  padding: $spacing-12,
  layoutMode: "vertical",
  itemSpacing: $spacing-12,
  children: [
    // Header
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-2,
      children: [
        {
          type: "text",
          content: "Design System Components",
          fontSize: 36,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "text",
          content: "Complete design system with 5 components and 62+ design tokens",
          fontSize: $font-size-base,
          fill: $color-text-secondary,
          textGrowth: "fixed-width"
        }
      ]
    },
    
    // Buttons Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Buttons",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            { type: "instance", componentName: "Button-Primary" },
            { type: "instance", componentName: "Button-Secondary" },
            { type: "instance", componentName: "Button-Outline" }
          ]
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            { 
              type: "instance", 
              componentName: "Button-Large",
              overrides: { text: "Large Primary" }
            },
            { 
              type: "instance", 
              componentName: "Button-Large",
              overrides: { 
                text: "Large Secondary",
                backgroundColor: $color-secondary,
                textColor: $color-secondary-foreground
              }
            }
          ]
        }
      ]
    },
    
    // Inputs Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Inputs",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            {
              type: "instance",
              componentName: "Input-Default",
              overrides: { label: "Email", placeholder: "Enter your email" }
            },
            {
              type: "instance",
              componentName: "Input-Default",
              overrides: { label: "Password", placeholder: "••••••••" }
            }
          ]
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            {
              type: "instance",
              componentName: "Input-Error"
            },
            {
              type: "instance",
              componentName: "Input-Default",
              overrides: { 
                label: "With Helper Text", 
                placeholder: "Normal input",
                helperText: "We'll never share your information"
              }
            }
          ]
        }
      ]
    },
    
    // Modal Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Modal",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "instance",
          componentName: "Modal"
        }
      ]
    },
    
    // Empty State Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Empty State",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "frame",
          width: "fill",
          strokeWeight: 2,
          strokeDashArray: [8, 8],
          stroke: $color-border,
          borderRadius: $radius-m,
          children: [
            {
              type: "instance",
              componentName: "EmptyState"
            }
          ]
        }
      ]
    },
    
    // Placeholders Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Placeholders",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            {
              type: "frame",
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "text",
                  content: "Square",
                  fontSize: $font-size-sm,
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                },
                { type: "instance", componentName: "Placeholder-Square" }
              ]
            },
            {
              type: "frame",
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "text",
                  content: "Video",
                  fontSize: $font-size-sm,
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                },
                { type: "instance", componentName: "Placeholder-Video" }
              ]
            }
          ]
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            {
              type: "frame",
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "text",
                  content: "Portrait",
                  fontSize: $font-size-sm,
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                },
                { type: "instance", componentName: "Placeholder-Portrait" }
              ]
            },
            {
              type: "frame",
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "text",
                  content: "Landscape",
                  fontSize: $font-size-sm,
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                },
                { type: "instance", componentName: "Placeholder-Landscape" }
              ]
            }
          ]
        }
      ]
    },
    
    // Design Tokens Section
    {
      type: "frame",
      width: "fill",
      layoutMode: "vertical",
      itemSpacing: $spacing-4,
      children: [
        {
          type: "text",
          content: "Design Tokens",
          fontSize: $font-size-2xl,
          fontWeight: 700,
          fill: $color-text-primary,
          textGrowth: "fixed-width"
        },
        {
          type: "frame",
          width: "fill",
          layoutMode: "horizontal",
          itemSpacing: $spacing-4,
          children: [
            {
              type: "frame",
              width: 150,
              padding: $spacing-4,
              backgroundColor: $color-surface-elevated,
              borderRadius: $radius-m,
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "frame",
                  width: "fill",
                  height: 48,
                  backgroundColor: $color-primary,
                  borderRadius: $radius-xs
                },
                {
                  type: "text",
                  content: "--color-primary",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                }
              ]
            },
            {
              type: "frame",
              width: 150,
              padding: $spacing-4,
              backgroundColor: $color-surface-elevated,
              borderRadius: $radius-m,
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "frame",
                  width: "fill",
                  height: 48,
                  backgroundColor: $color-secondary,
                  borderRadius: $radius-xs
                },
                {
                  type: "text",
                  content: "--color-secondary",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                }
              ]
            },
            {
              type: "frame",
              width: 150,
              padding: $spacing-4,
              backgroundColor: $color-surface-elevated,
              borderRadius: $radius-m,
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "frame",
                  width: "fill",
                  height: 48,
                  backgroundColor: $color-state-success,
                  borderRadius: $radius-xs
                },
                {
                  type: "text",
                  content: "--color-state-success",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                }
              ]
            },
            {
              type: "frame",
              width: 150,
              padding: $spacing-4,
              backgroundColor: $color-surface-elevated,
              borderRadius: $radius-m,
              layoutMode: "vertical",
              itemSpacing: $spacing-2,
              children: [
                {
                  type: "frame",
                  width: "fill",
                  height: 48,
                  backgroundColor: $color-destructive,
                  borderRadius: $radius-xs
                },
                {
                  type: "text",
                  content: "--color-destructive",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fill: $color-text-secondary,
                  textGrowth: "fixed-width"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Instructions for Pencil

1. **Set up variables first** - Create all design tokens as variables
2. **Create reusable components** - Make Button, Input, Modal, EmptyState, Placeholder components with `reusable: true`
3. **Build the showcase page** - Use the main layout structure with all sections
4. **Use variable references** - All colors, spacing, and sizes should reference variables with `$` prefix
5. **Apply visual adjustments** - Use the specified font sizes (17px for buttons, 15px for labels, etc.)
6. **Set proper text growth** - Use "auto" for buttons, "fixed-width" for body text
7. **Add shadows** - Use the defined shadow variables for elevation

## Visual Verification

After generation, compare with browser rendering and adjust:
- Button text should be crisp at 17px with -0.2 letter-spacing
- Button heights should feel balanced (44px and 50px)
- Input fields should have comfortable touch targets (44px)
- All spacing should match the $spacing variables exactly
- Colors should match the CSS variables exactly
- Corner radii should be smooth and consistent

Take screenshots to verify visual accuracy matches the live implementation.
