import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

export async function setupPencil(projectDir, projectInfo) {
  const spinner = ora('Setting up Pencil integration...').start();
  
  try {
    // Create design-system directory if it doesn't exist
    const designSystemDir = path.join(projectDir, 'design-system');
    await fs.ensureDir(designSystemDir);
    
    // Create Pencil documentation
    await createPencilDocumentation(projectDir, projectInfo);
    
    // Create Pencil placeholder file
    await createPencilPlaceholder(projectDir, projectInfo);
    
    spinner.succeed('Pencil integration ready!');
    
    console.log(chalk.dim('  ├─ Created design-system/PENCIL-README.md'));
    console.log(chalk.dim('  └─ Ready for component extraction (Chunk 6)\n'));
    
    return true;
  } catch (error) {
    spinner.fail('Failed to set up Pencil');
    throw error;
  }
}

async function createPencilDocumentation(projectDir, projectInfo) {
  const { projectName } = projectInfo;
  const designSystemDir = path.join(projectDir, 'design-system');
  
  const content = `# Pencil Integration Guide

## 🎨 What is Pencil?

Pencil is a design tool that allows you to create and manage your design system visually while keeping it synced with your code. This project is set up to work seamlessly with Pencil through the MCP (Model Context Protocol) connection.

## 📦 Project Setup

Your project includes:
- **Design System Components:** 5 core components (Button, Input, Modal, EmptyState, Placeholder)
- **Design Tokens:** 62+ CSS variables for colors, spacing, typography, etc.
- **Pencil-Ready Structure:** Components are structured for easy extraction to Pencil

## 🔄 Workflow

### Current Status: ✅ Ready for Component Extraction

In **Chunk 6**, all components will be automatically extracted from your React code and exported to a new Pencil file:
\`\`\`
design-system/pencil-designsystem-${projectName}.pen
\`\`\`

This file will contain:
- All 5 components with proper styling
- Design tokens as Pencil variables
- Proper labeling and organization
- Ready for visual editing

## 🛠️ Pencil MCP Setup (In Cursor)

If you haven't set up Pencil MCP in Cursor yet:

1. **Install Pencil Dev Extension:**
   - Open Command Palette (\`Cmd+Shift+P\`)
   - Type: \`Install Extension\`
   - Search for: \`Pencil Dev\` (by High Agency)
   - Or visit: \`cursor:extension/highagency.pencildev\`

2. **MCP Connection:**
   - Pencil MCP should already be configured in your Cursor
   - Check: \`~/.cursor/mcp.json\` for Pencil server configuration
   - If not configured, the extension will guide you

3. **Open Pencil Files:**
   - Once Chunk 6 is complete, simply open the \`.pen\` file in Cursor
   - Pencil will launch automatically
   - You can visually edit components

## 🎯 What's Next?

**Chunk 6: Component Extraction** (Coming Soon)
- Scan all React components in \`design-system/pencildraw/\`
- Extract design tokens from \`app/globals.css\`
- Generate Pencil nodes programmatically
- Create \`pencil-designsystem-${projectName}.pen\`
- Export everything with proper labeling

## 📚 Resources

- **Design System Docs:** \`design-system/README.md\`
- **SpecKit Constitution:** \`.specify/memory/constitution.md\`
- **Component Files:** \`design-system/pencildraw/*.tsx\`
- **Design Tokens:** \`app/globals.css\`

## 🔗 Pencil ↔ Code Sync

Changes flow both ways:

**Code → Pencil:**
- Update components in code
- Run extraction (Chunk 6 feature)
- Components update in Pencil

**Pencil → Code:**
- Edit components visually in Pencil
- Export to code
- Copy generated code to your project

---

*This integration was set up by the MVP Starter CLI (Chunk 5)*
`;

  await fs.writeFile(path.join(designSystemDir, 'PENCIL-README.md'), content, 'utf-8');
}

async function createPencilPlaceholder(projectDir, projectInfo) {
  const { projectName } = projectInfo;
  const designSystemDir = path.join(projectDir, 'design-system');
  
  // Create a placeholder note file (actual .pen file will be created in Chunk 6)
  const placeholderContent = `# Pencil File Placeholder

The actual Pencil file will be generated in **Chunk 6: Component Extraction**.

**Expected file:**
\`design-system/pencil-designsystem-${projectName}.pen\`

**What it will contain:**
- Button component (3 variants)
- Input component (with error states)
- Modal component
- EmptyState component
- Placeholder component (4 aspect ratios)
- All design tokens as Pencil variables

**When it will be created:**
Run the CLI again after Chunk 6 is implemented, or use the extraction script that will be provided.

---

*Note: .pen files are encrypted and can only be created/modified through Pencil MCP tools in Cursor.*
`;

  await fs.writeFile(
    path.join(designSystemDir, 'PENCIL-PLACEHOLDER.md'), 
    placeholderContent, 
    'utf-8'
  );
}
