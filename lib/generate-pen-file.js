import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function generatePenFile(projectDir, projectInfo, components, tokens) {
  const spinner = ora('Creating Pencil generation script...').start();
  
  try {
    const { projectName, appName, primaryColor } = projectInfo;
    const pencilFileName = `pencil-designsystem-${projectName}.pen`;
    
    // Use relative path from workspace root (monorepo root)
    const relativePencilPath = appName 
      ? `${appName}/design-system/${pencilFileName}`
      : `design-system/${pencilFileName}`;
    
    // Ensure design-system directory exists
    const designSystemDir = path.join(projectDir, 'design-system');
    await fs.ensureDir(designSystemDir);
    
    // Create a comprehensive prompt file with visual adjustments
    const promptFilePath = path.join(designSystemDir, 'CREATE-PENCIL-FILE.md');
    const promptContent = createPencilPrompt(projectName, relativePencilPath, primaryColor);
    
    // Write the file with explicit encoding
    await fs.writeFile(promptFilePath, promptContent, { encoding: 'utf-8' });
    
    // Verify the file was created
    const fileExists = await fs.pathExists(promptFilePath);
    if (!fileExists) {
      throw new Error(`File was not created at: ${promptFilePath}`);
    }
    
    spinner.succeed(chalk.green('CREATE-PENCIL-FILE.md created!'));
    
    const referencePathForCursor = appName 
      ? `@${appName}/design-system/CREATE-PENCIL-FILE.md`
      : '@design-system/CREATE-PENCIL-FILE.md';
    
    console.log(chalk.bold('\n  📝 Pencil File Instructions Created'));
    console.log(chalk.cyan(`     • File: ${appName ? appName + '/' : ''}design-system/CREATE-PENCIL-FILE.md`));
    console.log(chalk.cyan(`     • Location: ${promptFilePath}`));
    console.log(chalk.cyan(`     • Reference in Cursor: ${referencePathForCursor}`));
    console.log(chalk.dim('\n     Use this file in Cursor Chat to generate your .pen file'));
    console.log(chalk.dim('     with all components and design tokens.\n'));
    
    return true;
    
  } catch (error) {
    spinner.fail('Failed to create Pencil script');
    console.error(chalk.red('  Error:'), error.message);
    console.error(chalk.red('  Stack:'), error.stack);
    return false;
  }
}

// Create comprehensive Pencil prompt with visual adjustments
function createPencilPrompt(projectName, pencilFilePath, primaryColor) {
  return `# Create Design System Pencil File - ${projectName}

**CRITICAL:** This file uses Pencil MCP to create a design system with VARIABLES (not hardcoded values).

## Step 1: Create the Document

Use the \`open_document\` tool:

\`\`\`
Tool: open_document
Parameters:
  filePathOrTemplate: "${pencilFilePath}"
\`\`\`

---

## Step 2: Set Up Variables (MUST DO FIRST!)

**IMPORTANT:** Create ALL variables BEFORE adding any components. This ensures components reference variables, not hardcoded values.

Use the \`set_variables\` tool with these exact variables:

\`\`\`
Tool: set_variables
Parameters:
  filePath: "${pencilFilePath}"
  variables: {
    "colors": {
      "primary": { "type": "color", "value": "${primaryColor}" },
      "primary_foreground": { "type": "color", "value": "#FFFFFF" },
      "secondary": { "type": "color", "value": "#D9D9DB" },
      "secondary_foreground": { "type": "color", "value": "#2A2933" },
      "background": { "type": "color", "value": "#FFFFFF" },
      "text_primary": { "type": "color", "value": "#2A2933" },
      "text_secondary": { "type": "color", "value": "#616167" },
      "text_muted": { "type": "color", "value": "#939399" },
      "border": { "type": "color", "value": "#C5C5CB" },
      "input": { "type": "color", "value": "#C5C5CB" },
      "destructive": { "type": "color", "value": "#CC3314" },
      "destructive_foreground": { "type": "color", "value": "#FFFFFF" },
      "surface_elevated": { "type": "color", "value": "#F5F5F5" },
      "state_success": { "type": "color", "value": "#A1E5A1" },
      "state_error": { "type": "color", "value": "#FFBFB2" }
    },
    "spacing": {
      "1": { "type": "number", "value": 4 },
      "2": { "type": "number", "value": 8 },
      "3": { "type": "number", "value": 12 },
      "4": { "type": "number", "value": 16 },
      "6": { "type": "number", "value": 24 },
      "8": { "type": "number", "value": 32 },
      "12": { "type": "number", "value": 48 }
    },
    "typography": {
      "xs": { "type": "number", "value": 12 },
      "sm": { "type": "number", "value": 14 },
      "base": { "type": "number", "value": 16 },
      "lg": { "type": "number", "value": 18 },
      "xl": { "type": "number", "value": 20 },
      "2xl": { "type": "number", "value": 24 }
    },
    "radii": {
      "xs": { "type": "number", "value": 6 },
      "sm": { "type": "number", "value": 12 },
      "m": { "type": "number", "value": 24 },
      "pill": { "type": "number", "value": 999 }
    }
  }
\`\`\`

**CRITICAL:** After setting variables, all components MUST reference them using $ syntax:
- Colors: \`$colors.primary\`, \`$colors.text_primary\`, etc.
- Spacing: \`$spacing.4\`, \`$spacing.6\`, etc.
- Typography: \`$typography.base\`, \`$typography.lg\`, etc.
- Radii: \`$radii.pill\`, \`$radii.sm\`, etc.

---

## Step 3: Add Components with Variables

**VISUAL ADJUSTMENTS (browser-matching):**
- Button text: 17px (not 16px) with letter-spacing -0.2 and font-weight 500
- Button heights: 44px (default) and 50px (large)
- Input fields: 44px tall with 16px text
- Input labels: 15px, font-weight 500
- Helper text: 13px

Use the \`batch_design\` tool with these operations (components reference variables!):

\`\`\`
Tool: batch_design
Parameters:
  filePath: "${pencilFilePath}"
  operations: |
    // Create title
    title=I("canvas", {
      type: "text",
      name: "Design System Components",
      content: "Design System Components",
      x: 100,
      y: 40,
      fontSize: 32,
      fontWeight: 700,
      fill: "$colors.text_primary"
    })
    
    // Button Primary Component (44px height with 17px text)
    btnPrimary=I("canvas", {
      type: "frame",
      name: "Button Primary",
      x: 100,
      y: 120,
      width: 180,
      height: 44,
      fill: "$colors.primary",
      cornerRadius: "$radii.pill",
      layout: "horizontal",
      gap: "$spacing.2",
      padding: { left: "$spacing.6", right: "$spacing.6" },
      horizontalAlignment: "center",
      verticalAlignment: "center",
      shadow: { x: 0, y: 1, blur: 3, color: "rgba(0,0,0,0.1)" }
    })
    I(btnPrimary, {
      type: "text",
      content: "Primary Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.primary_foreground"
    })
    
    // Button Secondary
    btnSecondary=I("canvas", {
      type: "frame",
      name: "Button Secondary",
      x: 300,
      y: 120,
      width: 180,
      height: 44,
      fill: "$colors.secondary",
      cornerRadius: "$radii.pill",
      layout: "horizontal",
      gap: "$spacing.2",
      padding: { left: "$spacing.6", right: "$spacing.6" },
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(btnSecondary, {
      type: "text",
      content: "Secondary Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.secondary_foreground"
    })
    
    // Button Outline
    btnOutline=I("canvas", {
      type: "frame",
      name: "Button Outline",
      x: 500,
      y: 120,
      width: 160,
      height: 44,
      fill: "transparent",
      cornerRadius: "$radii.pill",
      stroke: "$colors.border",
      strokeWidth: 2,
      layout: "horizontal",
      gap: "$spacing.2",
      padding: { left: "$spacing.6", right: "$spacing.6" },
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(btnOutline, {
      type: "text",
      content: "Outline Button",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.text_primary"
    })
    
    // Button Large (50px height)
    btnLarge=I("canvas", {
      type: "frame",
      name: "Button Large",
      x: 100,
      y: 190,
      width: 200,
      height: 50,
      fill: "$colors.primary",
      cornerRadius: "$radii.pill",
      layout: "horizontal",
      gap: "$spacing.2",
      padding: { left: "$spacing.8", right: "$spacing.8" },
      horizontalAlignment: "center",
      verticalAlignment: "center",
      shadow: { x: 0, y: 1, blur: 3, color: "rgba(0,0,0,0.1)" }
    })
    I(btnLarge, {
      type: "text",
      content: "Large Button",
      fontSize: 18,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.primary_foreground"
    })

    
    // Input Default (44px height, 15px label, 16px input text)
    inputDefault=I("canvas", {
      type: "frame",
      name: "Input Default",
      x: 100,
      y: 280,
      width: 320,
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(inputDefault, {
      type: "text",
      content: "Email",
      fontSize: 15,
      fontWeight: 500,
      fill: "$colors.text_primary"
    })
    inputField=I(inputDefault, {
      type: "frame",
      width: "fill",
      height: 44,
      fill: "$colors.background",
      cornerRadius: "$radii.sm",
      stroke: "$colors.input",
      strokeWidth: 2,
      layout: "horizontal",
      padding: { left: "$spacing.4", right: "$spacing.4" },
      verticalAlignment: "center"
    })
    I(inputField, {
      type: "text",
      content: "Enter your email",
      fontSize: 16,
      fill: "$colors.text_muted"
    })
    
    // Input Error (with helper text)
    inputError=I("canvas", {
      type: "frame",
      name: "Input Error",
      x: 440,
      y: 280,
      width: 320,
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(inputError, {
      type: "text",
      content: "Password",
      fontSize: 15,
      fontWeight: 500,
      fill: "$colors.text_primary"
    })
    inputErrorField=I(inputError, {
      type: "frame",
      width: "fill",
      height: 44,
      fill: "$colors.background",
      cornerRadius: "$radii.sm",
      stroke: "$colors.destructive",
      strokeWidth: 2,
      layout: "horizontal",
      padding: { left: "$spacing.4", right: "$spacing.4" },
      verticalAlignment: "center"
    })
    I(inputErrorField, {
      type: "text",
      content: "••••••••",
      fontSize: 16,
      fill: "$colors.text_primary"
    })
    I(inputError, {
      type: "text",
      content: "This field is required",
      fontSize: 13,
      fill: "$colors.destructive"
    })

    
    // Modal with shadow
    modal=I("canvas", {
      type: "frame",
      name: "Modal",
      x: 100,
      y: 400,
      width: 448,
      fill: "$colors.background",
      cornerRadius: "$radii.m",
      padding: "$spacing.6",
      layout: "vertical",
      gap: "$spacing.4",
      shadow: { x: 0, y: 20, blur: 40, color: "rgba(0,0,0,0.15)" }
    })
    I(modal, {
      type: "text",
      content: "Test Modal",
      fontSize: "$typography.xl",
      fontWeight: 700,
      fill: "$colors.text_primary"
    })
    I(modal, {
      type: "text",
      content: "This is a modal dialog with shadow for depth.",
      fontSize: "$typography.base",
      fill: "$colors.text_secondary",
      lineHeight: 1.5
    })
    modalButtons=I(modal, {
      type: "frame",
      width: "fill",
      layout: "horizontal",
      gap: "$spacing.3",
      horizontalAlignment: "end"
    })
    I(modalButtons, {
      type: "frame",
      width: 100,
      height: 44,
      fill: "transparent",
      cornerRadius: "$radii.pill",
      stroke: "$colors.border",
      strokeWidth: 2,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    }).children=[{
      type: "text",
      content: "Cancel",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.text_primary"
    }]
    I(modalButtons, {
      type: "frame",
      width: 100,
      height: 44,
      fill: "$colors.primary",
      cornerRadius: "$radii.pill",
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    }).children=[{
      type: "text",
      content: "Confirm",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.primary_foreground"
    }]

    
    // EmptyState with emoji
    emptyContainer=I("canvas", {
      type: "frame",
      name: "Empty State Container",
      x: 600,
      y: 400,
      width: 400,
      fill: "transparent",
      stroke: "$colors.border",
      strokeWidth: 2,
      strokeStyle: "dashed",
      cornerRadius: "$radii.m"
    })
    emptyState=I(emptyContainer, {
      type: "frame",
      width: "fill",
      padding: "$spacing.12",
      layout: "vertical",
      gap: "$spacing.4",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(emptyState, {
      type: "text",
      content: "📭",
      fontSize: 48
    })
    I(emptyState, {
      type: "text",
      content: "No items found",
      fontSize: "$typography.lg",
      fontWeight: 600,
      fill: "$colors.text_primary"
    })
    I(emptyState, {
      type: "text",
      content: "Try adjusting your filters",
      fontSize: "$typography.base",
      fill: "$colors.text_secondary",
      lineHeight: 1.5
    })
    emptyBtn=I(emptyState, {
      type: "frame",
      width: 140,
      height: 44,
      fill: "$colors.primary",
      cornerRadius: "$radii.pill",
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(emptyBtn, {
      type: "text",
      content: "Clear Filters",
      fontSize: 17,
      fontWeight: 500,
      letterSpacing: -0.2,
      fill: "$colors.primary_foreground"
    })
    
    // Placeholder Square (dashed border)
    placeholderSquare=I("canvas", {
      type: "frame",
      name: "Placeholder Square",
      x: 100,
      y: 680,
      width: 200,
      height: 200,
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      stroke: "$colors.border",
      strokeWidth: 2,
      strokeStyle: "dashed",
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(placeholderSquare, {
      type: "text",
      content: "Square Image",
      fontSize: "$typography.sm",
      fill: "$colors.text_muted"
    })
    
    // Placeholder Video (16:9, dashed border)
    placeholderVideo=I("canvas", {
      type: "frame",
      name: "Placeholder Video",
      x: 320,
      y: 680,
      width: 320,
      height: 180,
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      stroke: "$colors.border",
      strokeWidth: 2,
      strokeStyle: "dashed",
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })
    I(placeholderVideo, {
      type: "text",
      content: "Video Thumbnail",
      fontSize: "$typography.sm",
      fill: "$colors.text_muted"
    })
    
    // Color Swatches Section
    swatchTitle=I("canvas", {
      type: "text",
      name: "Design Tokens",
      content: "Design Tokens",
      x: 100,
      y: 920,
      fontSize: 24,
      fontWeight: 700,
      fill: "$colors.text_primary"
    })
    
    // Primary color swatch
    swatch1=I("canvas", {
      type: "frame",
      name: "Swatch Primary",
      x: 100,
      y: 970,
      width: 150,
      padding: "$spacing.4",
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(swatch1, {
      type: "frame",
      width: "fill",
      height: 48,
      fill: "$colors.primary",
      cornerRadius: "$radii.xs"
    })
    I(swatch1, {
      type: "text",
      content: "--color-primary",
      fontSize: 11,
      fill: "$colors.text_secondary"
    })
    
    // Secondary color swatch
    swatch2=I("canvas", {
      type: "frame",
      name: "Swatch Secondary",
      x: 270,
      y: 970,
      width: 150,
      padding: "$spacing.4",
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(swatch2, {
      type: "frame",
      width: "fill",
      height: 48,
      fill: "$colors.secondary",
      cornerRadius: "$radii.xs"
    })
    I(swatch2, {
      type: "text",
      content: "--color-secondary",
      fontSize: 11,
      fill: "$colors.text_secondary"
    })
    
    // Success color swatch
    swatch3=I("canvas", {
      type: "frame",
      name: "Swatch Success",
      x: 440,
      y: 970,
      width: 150,
      padding: "$spacing.4",
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(swatch3, {
      type: "frame",
      width: "fill",
      height: 48,
      fill: "$colors.state_success",
      cornerRadius: "$radii.xs"
    })
    I(swatch3, {
      type: "text",
      content: "--color-success",
      fontSize: 11,
      fill: "$colors.text_secondary"
    })
    
    // Destructive color swatch
    swatch4=I("canvas", {
      type: "frame",
      name: "Swatch Destructive",
      x: 610,
      y: 970,
      width: 150,
      padding: "$spacing.4",
      fill: "$colors.surface_elevated",
      cornerRadius: "$radii.m",
      layout: "vertical",
      gap: "$spacing.2"
    })
    I(swatch4, {
      type: "frame",
      width: "fill",
      height: 48,
      fill: "$colors.destructive",
      cornerRadius: "$radii.xs"
    })
    I(swatch4, {
      type: "text",
      content: "--color-destructive",
      fontSize: 11,
      fill: "$colors.text_secondary"
    })
\`\`\`

**CRITICAL NOTES:**
- ALL colors use \`"$colors.primary"\` syntax (with quotes!)
- ALL spacing uses \`"$spacing.4"\` syntax
- ALL typography uses \`"$typography.base"\` syntax
- ALL radii use \`"$radii.pill"\` syntax
- NO hardcoded hex values in components (except shadows)

---

## Expected Result

You should see a professional design system with:
- ✅ **All components using variables** (colors update when you change variables!)
- ✅ **Button text at 17px** with -0.2 letter-spacing, font-weight 500
- ✅ **Button heights at 44px/50px** for visual balance
- ✅ **Input fields at 44px** with 15px labels, 13px helper text
- ✅ **Clean layout** with proper spacing
- ✅ **Professional styling** with shadows and proper radii

**Test variables:** Change \`$colors.primary\` value - all primary buttons should update! 🎨

---

---

## Summary of What Gets Created

- 📝 **Title:** "Design System Components" (32px, bold)
- 🔘 **4 Button variants:** Primary, Secondary, Outline, Large (all using variables!)
- 📝 **2 Input states:** Default and Error (with labels and helper text)
- 🪟 **Modal:** With shadow and button actions
- 📭 **EmptyState:** With emoji, centered, in dashed container
- 🖼️ **2 Placeholders:** Square and Video (with dashed borders)
- 🎨 **4 Color swatches:** Primary, Secondary, Success, Destructive

**KEY:** Everything uses variables (\`"$colors.primary"\` syntax) - NOT hardcoded values!

## Visual Verification Checklist

After generation, **CRITICAL TEST** - verify variables work:

1. **Test variables work:**
   - Change \`$colors.primary\` value (e.g., from ${primaryColor} to #FF0000)
   - **ALL primary buttons and swatches should update!**
   - If they don't update → variables aren't linked properly

2. **Verify visual quality:**
   - ✅ Button text is crisp at 17px with -0.2 letter-spacing
   - ✅ Button heights feel balanced (44px and 50px)
   - ✅ Input fields have comfortable touch targets (44px)
   - ✅ Input labels are 15px, helper text 13px
   - ✅ Colors match the CSS variables
   - ✅ Corner radii are smooth (pill for buttons, 12px for inputs)
   - ✅ Shadows add proper depth (Modal has shadow-xl)
   - ✅ Dashed borders on placeholders and empty state container

3. **Check layout:**
   - ✅ Components are properly positioned
   - ✅ Spacing looks clean
   - ✅ Text is readable
   - ✅ Everything aligned correctly

## Expected Result

- 🎨 **All components using VARIABLES** (test by changing $colors.primary!)
- 🔘 **Professional buttons** at 44px/50px with 17px text
- 📝 **Well-designed inputs** with 15px labels, 44px fields
- 🪟 **Beautiful modal** with shadow-xl
- 📭 **Friendly empty state** with emoji and dashed container
- 🖼️ **Placeholder components** with dashed borders
- 🌈 **Color swatches** showing actual design tokens

**If colors are hardcoded instead of using variables, the generation failed. Re-run and ensure Step 2 (set_variables) completes successfully before Step 3!**
`;
}
