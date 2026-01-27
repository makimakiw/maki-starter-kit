import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function generatePenFile(projectDir, projectInfo, components, tokens) {
  const spinner = ora('Creating Pencil generation script...').start();
  
  try {
    const { projectName, primaryColor } = projectInfo;
    const pencilFileName = `pencil-designsystem-${projectName}.pen`;
    const pencilFilePath = path.join(projectDir, 'design-system', pencilFileName);
    
    // Generate the Pencil operations script
    const operations = generateComponentOperations(components, primaryColor);
    
    // Create a prompt file that can be used in Cursor
    const promptFilePath = path.join(projectDir, 'design-system', 'CREATE-PENCIL-FILE.md');
    const promptContent = createPencilPrompt(projectName, pencilFilePath, operations, tokens);
    
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

**IMPORTANT:** Execute these commands in order. This is optimized to work on the first try!

---

## Step 1: Create Document

\`\`\`
Use open_document tool:
- filePathOrTemplate: "${pencilFilePath}"
\`\`\`

---

## Step 2: Add Components

\`\`\`
Use batch_design tool:
- filePath: "${pencilFilePath}"
- operations: 
${operations}
\`\`\`

**This creates 5 component cards with labels, props, and badges.**

---

## Step 3: Add Variables

\`\`\`
Use set_variables tool:
- filePath: "${pencilFilePath}"
- variables: Copy this exact JSON structure below
\`\`\`

**IMPORTANT: Variables must have "type" and "value" properties!**

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

## ✅ Success!

You should now have:
- 📁 File: \`design-system/pencil-designsystem-${projectName}.pen\`
- 🎨 5 component placeholders (Button, Input, Modal, EmptyState, Placeholder)
- 🎯 ${Object.keys(tokens).length}+ design tokens as Pencil variables
- 🖼️ Organized canvas layout

**Open the file in Cursor and start editing visually!**
`;
}

// Generate component example with actual UI representation
function generateComponentExample(component, bindingName, primaryColor) {
  const operations = [];
  
  // Component container
  operations.push(`${bindingName}=I(container, {
    type: "frame",
    name: "${component.name}",
    width: "fill_container",
    height: 180,
    fill: "#FFFFFF",
    stroke: "#E5E7EB",
    strokeWidth: 2,
    cornerRadius: 12,
    layout: "horizontal",
    gap: 32,
    padding: 24,
    placeholder: true
  })`);
  
  // Left side: Component info
  operations.push(`${bindingName}Info=I(${bindingName}, {
    type: "frame",
    width: 200,
    height: "fill_container",
    layout: "vertical",
    gap: 12,
    placeholder: true
  })`);
  
  operations.push(`${bindingName}Title=I(${bindingName}Info, {
    type: "text",
    content: "${component.name}",
    fontSize: 20,
    fontWeight: 700,
    fill: "${primaryColor}"
  })`);
  
  const propsText = component.props.length > 0 
    ? component.props.join(', ')
    : 'No props';
    
  operations.push(`${bindingName}Props=I(${bindingName}Info, {
    type: "text",
    content: "Props: ${propsText}",
    fontSize: 13,
    fill: "#6B7280",
    lineHeight: 1.6
  })`);
  
  if (component.hasVariants) {
    operations.push(`${bindingName}Badge=I(${bindingName}Info, {
      type: "frame",
      width: 90,
      height: 28,
      fill: "${primaryColor}",
      cornerRadius: 14,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`${bindingName}BadgeText=I(${bindingName}Badge, {
      type: "text",
      content: "✨ Variants",
      fontSize: 12,
      fontWeight: 600,
      fill: "#FFFFFF"
    })`);
  }
  
  // Right side: Visual example
  operations.push(`${bindingName}Example=I(${bindingName}, {
    type: "frame",
    width: "fill_container",
    height: "fill_container",
    fill: "#F9FAFB",
    cornerRadius: 8,
    layout: "horizontal",
    horizontalAlignment: "center",
    verticalAlignment: "center",
    padding: 16,
    placeholder: true
  })`);
  
  // Add component-specific visuals
  if (component.name === 'Button') {
    // Button example
    operations.push(`${bindingName}Visual=I(${bindingName}Example, {
      type: "frame",
      width: 140,
      height: 44,
      fill: "${primaryColor}",
      cornerRadius: 8,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`${bindingName}VisualText=I(${bindingName}Visual, {
      type: "text",
      content: "Button",
      fontSize: 15,
      fontWeight: 600,
      fill: "#FFFFFF"
    })`);
  } else if (component.name === 'Input') {
    // Input example
    operations.push(`${bindingName}Visual=I(${bindingName}Example, {
      type: "frame",
      width: 240,
      height: 44,
      fill: "#FFFFFF",
      stroke: "#D1D5DB",
      strokeWidth: 1.5,
      cornerRadius: 8,
      layout: "horizontal",
      verticalAlignment: "center",
      padding: 12
    })`);
    
    operations.push(`${bindingName}VisualText=I(${bindingName}Visual, {
      type: "text",
      content: "Enter text...",
      fontSize: 14,
      fill: "#9CA3AF"
    })`);
  } else if (component.name === 'Modal') {
    // Modal example (simplified)
    operations.push(`${bindingName}Visual=I(${bindingName}Example, {
      type: "frame",
      width: 200,
      height: 120,
      fill: "#FFFFFF",
      stroke: "#E5E7EB",
      strokeWidth: 2,
      cornerRadius: 12,
      layout: "vertical",
      gap: 8,
      padding: 16
    })`);
    
    operations.push(`${bindingName}VisualTitle=I(${bindingName}Visual, {
      type: "text",
      content: "Modal Title",
      fontSize: 16,
      fontWeight: 600,
      fill: "#111827"
    })`);
    
    operations.push(`${bindingName}VisualText=I(${bindingName}Visual, {
      type: "text",
      content: "Modal content here",
      fontSize: 13,
      fill: "#6B7280"
    })`);
  } else if (component.name === 'EmptyState') {
    // Empty state icon
    operations.push(`${bindingName}Visual=I(${bindingName}Example, {
      type: "frame",
      width: 100,
      height: 100,
      layout: "vertical",
      gap: 8,
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`${bindingName}VisualIcon=I(${bindingName}Visual, {
      type: "text",
      content: "📭",
      fontSize: 48
    })`);
    
    operations.push(`${bindingName}VisualText=I(${bindingName}Visual, {
      type: "text",
      content: "Empty",
      fontSize: 13,
      fill: "#9CA3AF"
    })`);
  } else if (component.name === 'Placeholder') {
    // Placeholder box
    operations.push(`${bindingName}Visual=I(${bindingName}Example, {
      type: "frame",
      width: 160,
      height: 120,
      fill: "#F3F4F6",
      stroke: "#D1D5DB",
      strokeWidth: 2,
      strokeStyle: "dashed",
      cornerRadius: 8,
      layout: "horizontal",
      horizontalAlignment: "center",
      verticalAlignment: "center"
    })`);
    
    operations.push(`${bindingName}VisualText=I(${bindingName}Visual, {
      type: "text",
      content: "Image",
      fontSize: 14,
      fill: "#9CA3AF"
    })`);
  }
  
  return operations;
}

// Generate operations for component placeholders
function generateComponentOperations(components, primaryColor) {
  const operations = [];
  let yPosition = 100;
  const spacing = 200;
  
  // Create a main container frame
  operations.push(`container=I(document, {
    type: "frame",
    name: "Design System Components",
    x: 100,
    y: 50,
    width: 1200,
    height: ${150 + (components.length * spacing)},
    fill: "#FFFFFF",
    layout: "vertical",
    gap: 24,
    padding: 32,
    placeholder: true
  })`);
  
  // Create title
  operations.push(`title=I(container, {
    type: "text",
    content: "Design System Components",
    fontSize: 24,
    fontWeight: 700,
    fill: "#000000"
  })`);
  
  // Create component examples with better visuals
  components.forEach((component, index) => {
    const bindingName = `comp${index}`;
    const componentOps = generateComponentExample(component, bindingName, primaryColor);
    operations.push(...componentOps);
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
