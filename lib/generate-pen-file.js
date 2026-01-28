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
    // If workspace is opened at nice-project/, path should be nice-app/design-system/file.pen
    const relativePencilPath = appName 
      ? `${appName}/design-system/${pencilFileName}`
      : `design-system/${pencilFileName}`;
    
    // Generate the Pencil operations script
    const operations = generateComponentOperations(components, primaryColor);
    
    // Create a prompt file that can be used in Cursor
    const promptFilePath = path.join(projectDir, 'design-system', 'CREATE-PENCIL-FILE.md');
    const promptContent = createPencilPrompt(projectName, relativePencilPath, operations, tokens);
    
    await fs.writeFile(promptFilePath, promptContent, 'utf-8');
    
    spinner.succeed(chalk.green('Pencil generation script created!'));
    
    console.log(chalk.bold('\n  📝 Next Step - Generate .pen File:'));
    console.log(chalk.cyan('\n     1. Open Cursor in this project'));
    console.log(chalk.cyan('     2. Ask Cursor:'));
    console.log(chalk.white.bold('        "@CREATE-PENCIL-FILE.md please create the Pencil file"'));
    console.log(chalk.dim('\n     This will use Pencil MCP to create the actual .pen file'));
    console.log(chalk.dim('     with all your components and design tokens.\n'));
    
    return true;
    
  } catch (error) {
    spinner.fail('Failed to create Pencil script');
    console.error(chalk.red('  Error:'), error.message);
    return false;
  }
}

// Create a prompt file for Cursor to execute
function createPencilPrompt(projectName, pencilFilePath, operations, tokens) {
  const variables = convertTokensToVariables(tokens);
  
  return `# Create Pencil Design System - ${projectName}

Create a beautiful, organized design system file with styled components.

**File Path:** \`${pencilFilePath}\` (relative to workspace root)

**IMPORTANT:** Ensure Cursor workspace is opened at the project root (monorepo folder). The file path is relative to the workspace root.

---

## Step 1: Create Document

Use the \`open_document\` tool with:
- filePathOrTemplate: "${pencilFilePath}"

---

## Step 2: Add Styled Components

Use the \`batch_design\` tool with:
- filePath: "${pencilFilePath}"
- operations:

**IMPORTANT:** These operations create properly styled components with shadows, colors, and realistic examples. Each component section includes:
- A clean white card with subtle shadow
- Component name and props on the left
- Visual example on the right using the actual design system colors

\`\`\`
${operations}
\`\`\`

---

## Step 3: Add Design Tokens

Use the \`set_variables\` tool with:
- filePath: "${pencilFilePath}"
- variables:

\`\`\`json
{${Object.entries(variables).map(([category, categoryVars]) => `
  "${category}": {${Object.entries(categoryVars).map(([name, value]) => `
    "${name}": {
      "type": "string",
      "value": "${value}"
    }`).join(',')}
  }`).join(',')}
}
\`\`\`

---

## ✅ Expected Result

You should see:
- 📋 Title: "Design System Components"
- 🎨 5 beautifully styled component cards (Button with variants, Input field, Modal card, EmptyState with icon, Placeholder box)
- 🎯 Clean horizontal layout with info + example
- 🌈 Components using actual colors from the design system
- ✨ Subtle shadows and proper spacing

**The file should look polished and production-ready!**
`;
}

// Generate clean component showcase with proper styling
function generateComponentExample(component, yPos, primaryColor) {
  const operations = [];
  const bindingName = component.name.toLowerCase();
  
  // Section container with proper spacing
  operations.push(`${bindingName}Section=I("canvas", {
    type: "frame",
    name: "${component.name} Section",
    x: 100,
    y: ${yPos},
    width: 1100,
    height: 160,
    fill: "#FFFFFF",
    stroke: "#E5E7EB",
    strokeWidth: 1,
    cornerRadius: 16,
    layout: "horizontal",
    gap: 48,
    padding: 32,
    shadow: { x: 0, y: 2, blur: 8, color: "rgba(0,0,0,0.04)" }
  })`);
  
  // Left: Component info
  operations.push(`${bindingName}Info=I(${bindingName}Section, {
    type: "frame",
    width: 220,
    height: "fill_container",
    layout: "vertical",
    gap: 8,
    verticalAlignment: "center"
  })`);
  
  operations.push(`${bindingName}Title=I(${bindingName}Info, {
    type: "text",
    content: "${component.name}",
    fontSize: 22,
    fontWeight: 700,
    fill: "${primaryColor}"
  })`);
  
  const propsText = component.props && component.props.length > 0 
    ? component.props.slice(0, 3).join(', ')
    : 'variant, size, disabled';
    
  operations.push(`${bindingName}Props=I(${bindingName}Info, {
    type: "text",
    content: "Props: ${propsText}",
    fontSize: 13,
    fill: "#6B7280",
    lineHeight: 1.5
  })`);
  
  // Right: Visual examples
  operations.push(`${bindingName}Examples=I(${bindingName}Section, {
    type: "frame",
    width: "fill_container",
    height: "fill_container",
    fill: "#F9FAFB",
    cornerRadius: 12,
    layout: "horizontal",
    gap: 16,
    padding: 24,
    horizontalAlignment: "center",
    verticalAlignment: "center"
  })`);
  
  // Component-specific examples
  if (component.name === 'Button') {
    // Primary button
    operations.push(`${bindingName}Primary=I(${bindingName}Examples, {
      type: "frame",
      width: 140,
      height: 48,
      fill: "${primaryColor}",
      cornerRadius: 999,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center",
      shadow: { x: 0, y: 1, blur: 3, color: "rgba(0,0,0,0.1)" }
    })`);
    
    operations.push(`I(${bindingName}Primary, {
      type: "text",
      content: "Primary",
      fontSize: 16,
      fontWeight: 600,
      fill: "#FFFFFF"
    })`);
    
    // Secondary button
    operations.push(`${bindingName}Secondary=I(${bindingName}Examples, {
      type: "frame",
      width: 140,
      height: 48,
      fill: "#D9D9DB",
      cornerRadius: 999,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`I(${bindingName}Secondary, {
      type: "text",
      content: "Secondary",
      fontSize: 16,
      fontWeight: 600,
      fill: "#2A2933"
    })`);
    
  } else if (component.name === 'Input') {
    operations.push(`${bindingName}Field=I(${bindingName}Examples, {
      type: "frame",
      width: 320,
      height: 48,
      fill: "#FFFFFF",
      stroke: "#C5C5CB",
      strokeWidth: 2,
      cornerRadius: 12,
      layout: "horizontal",
      verticalAlignment: "center",
      padding: { left: 16, right: 16 }
    })`);
    
    operations.push(`I(${bindingName}Field, {
      type: "text",
      content: "Enter your email...",
      fontSize: 16,
      fill: "#939399"
    })`);
    
  } else if (component.name === 'Modal') {
    operations.push(`${bindingName}Card=I(${bindingName}Examples, {
      type: "frame",
      width: 280,
      height: 100,
      fill: "#FFFFFF",
      stroke: "#E5E7EB",
      strokeWidth: 1,
      cornerRadius: 24,
      layout: "vertical",
      gap: 12,
      padding: 20,
      shadow: { x: 0, y: 10, blur: 25, color: "rgba(0,0,0,0.1)" }
    })`);
    
    operations.push(`I(${bindingName}Card, {
      type: "text",
      content: "Modal Title",
      fontSize: 18,
      fontWeight: 700,
      fill: "#2A2933"
    })`);
    
    operations.push(`I(${bindingName}Card, {
      type: "text",
      content: "This is a modal dialog with content",
      fontSize: 14,
      fill: "#616167",
      lineHeight: 1.5
    })`);
    
  } else if (component.name === 'EmptyState') {
    operations.push(`${bindingName}Container=I(${bindingName}Examples, {
      type: "frame",
      width: 200,
      height: 96,
      layout: "vertical",
      gap: 12,
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`I(${bindingName}Container, {
      type: "text",
      content: "📭",
      fontSize: 48
    })`);
    
    operations.push(`I(${bindingName}Container, {
      type: "text",
      content: "No items found",
      fontSize: 15,
      fontWeight: 600,
      fill: "#2A2933"
    })`);
    
  } else if (component.name === 'Placeholder') {
    operations.push(`${bindingName}Box=I(${bindingName}Examples, {
      type: "frame",
      width: 200,
      height: 96,
      fill: "#F5F5F5",
      stroke: "#C5C5CB",
      strokeWidth: 2,
      strokeStyle: "dashed",
      cornerRadius: 12,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`I(${bindingName}Box, {
      type: "text",
      content: "Image Placeholder",
      fontSize: 14,
      fill: "#939399"
    })`);
  }
  
  return operations;
}

// Generate operations for component showcase
function generateComponentOperations(components, primaryColor) {
  const operations = [];
  let yPosition = 100;
  const spacing = 200;
  
  // Create title
  operations.push(`title=I("canvas", {
    type: "text",
    content: "Design System Components",
    x: 100,
    y: 40,
    fontSize: 32,
    fontWeight: 700,
    fill: "#2A2933"
  })`);
  
  // Create each component showcase
  components.forEach((component, index) => {
    const componentOps = generateComponentExample(component, yPosition, primaryColor);
    operations.push(...componentOps);
    yPosition += spacing;
  });
  
  return operations.join('\n');
}

// Convert design tokens to Pencil variables
function convertTokensToVariables(tokens) {
  const variables = {
    colors: {},
    spacing: {},
    typography: {},
    other: {}
  };
  
  tokens.forEach(token => {
    const category = token.category || 'other';
    const name = token.name.replace(/-/g, '_'); // Convert kebab-case to snake_case
    
    if (variables[category]) {
      variables[category][name] = token.value;
    } else {
      variables.other[name] = token.value;
    }
  });
  
  return variables;
}
