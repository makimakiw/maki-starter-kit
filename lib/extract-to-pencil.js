import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { generatePenFile } from './generate-pen-file.js';
import { checkPencilMCP } from './check-pencil.js';

export async function extractToPencil(projectDir, projectInfo) {
  const spinner = ora('Extracting components to Pencil...').start();
  
  try {
    const { projectName, primaryColor } = projectInfo;
    const pencilFileName = `pencil-designsystem-${projectName}.pen`;
    const pencilFilePath = path.join(projectDir, 'design-system', pencilFileName);
    
    // Extract components and design tokens (always do this)
    const components = await scanComponents(projectDir);
    const tokens = await extractDesignTokens(projectDir);
    
    // Generate Pencil file metadata
    await createPencilMetadata(projectDir, projectInfo, components, tokens);
    
    spinner.succeed(chalk.green('Component extraction complete!'));
    
    console.log(chalk.bold('\n  📊 Extraction Results:'));
    console.log(chalk.cyan('     • Components:   ') + chalk.white.bold(components.length));
    console.log(chalk.cyan('     • Design Tokens:') + chalk.white.bold(tokens.length));
    console.log(chalk.cyan('     • Primary Color:') + chalk.white.bold(primaryColor));
    console.log(chalk.dim(`     • Metadata: design-system/PENCIL-EXTRACTION.md\n`));
    
    // Always generate CREATE-PENCIL-FILE.md (regardless of MCP detection)
    console.log(chalk.bold.cyan('🎨 Generating Pencil instructions...\n'));
    await generatePenFile(projectDir, projectInfo, components, tokens);
    
    // Check if Pencil MCP is available and show appropriate message
    const mcpAvailable = await checkPencilMCP();
    
    if (!mcpAvailable) {
      console.log(chalk.yellow('  ⚠️  Pencil MCP not detected'));
      console.log(chalk.dim('     The CREATE-PENCIL-FILE.md has been created.'));
      console.log(chalk.dim('     After installing Pencil MCP in Cursor, you can use it to'));
      console.log(chalk.dim('     generate the .pen file with your design system.\n'));
    } else {
      console.log(chalk.green('  ✓ Pencil MCP detected'));
      console.log(chalk.dim('     You can now use CREATE-PENCIL-FILE.md to generate'));
      console.log(chalk.dim('     the .pen file with your design system.\n'));
    }
    
    return true;
  } catch (error) {
    spinner.fail('Failed to extract to Pencil');
    console.error(chalk.red('  Error:'), error.message);
    return false;
  }
}

async function scanComponents(projectDir) {
  const componentsDir = path.join(projectDir, 'design-system', 'pencildraw');
  
  const componentFiles = [
    'Button.tsx',
    'Input.tsx',
    'Modal.tsx',
    'EmptyState.tsx',
    'Placeholder.tsx'
  ];
  
  const components = [];
  
  for (const file of componentFiles) {
    const filePath = path.join(componentsDir, file);
    
    if (await fs.pathExists(filePath)) {
      const content = await fs.readFile(filePath, 'utf-8');
      const componentName = path.basename(file, '.tsx');
      
      // Extract component metadata
      components.push({
        name: componentName,
        file: file,
        path: filePath,
        hasVariants: content.includes('variant'),
        hasStates: content.includes('error') || content.includes('disabled'),
        props: extractProps(content)
      });
    }
  }
  
  return components;
}

function extractProps(content) {
  const props = [];
  
  // Simple prop extraction (can be enhanced)
  if (content.includes('variant')) props.push('variant');
  if (content.includes('size')) props.push('size');
  if (content.includes('disabled')) props.push('disabled');
  if (content.includes('error')) props.push('error');
  if (content.includes('label')) props.push('label');
  if (content.includes('placeholder')) props.push('placeholder');
  if (content.includes('onClick')) props.push('onClick');
  if (content.includes('onChange')) props.push('onChange');
  
  return props;
}

async function extractDesignTokens(projectDir) {
  const globalsPath = path.join(projectDir, 'app', 'globals.css');
  const content = await fs.readFile(globalsPath, 'utf-8');
  
  const tokens = [];
  
  // Extract CSS variables
  const varRegex = /--([a-z-]+):\s*([^;]+);/g;
  let match;
  
  while ((match = varRegex.exec(content)) !== null) {
    tokens.push({
      name: match[1],
      value: match[2].trim(),
      category: categorizeToken(match[1])
    });
  }
  
  return tokens;
}

function categorizeToken(tokenName) {
  if (tokenName.startsWith('color')) return 'color';
  if (tokenName.startsWith('spacing')) return 'spacing';
  if (tokenName.startsWith('radius')) return 'radius';
  if (tokenName.startsWith('font')) return 'typography';
  if (tokenName.startsWith('shadow')) return 'shadow';
  return 'other';
}

async function createPencilMetadata(projectDir, projectInfo, components, tokens) {
  const { projectName, primaryColor } = projectInfo;
  const metadataPath = path.join(projectDir, 'design-system', 'PENCIL-EXTRACTION.json');
  
  const metadata = {
    projectName,
    extractedAt: new Date().toISOString(),
    pencilFile: `pencil-designsystem-${projectName}.pen`,
    components: components.map(c => ({
      name: c.name,
      file: c.file,
      variants: c.hasVariants,
      states: c.hasStates,
      props: c.props
    })),
    tokens: tokens.map(t => ({
      name: t.name,
      value: t.value,
      category: t.category
    })),
    stats: {
      totalComponents: components.length,
      totalTokens: tokens.length,
      primaryColor: primaryColor
    }
  };
  
  await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  
  // Also create a human-readable summary
  const summaryPath = path.join(projectDir, 'design-system', 'PENCIL-EXTRACTION.md');
  const summary = `# Pencil Extraction Summary

**Project:** ${projectName}  
**Extracted:** ${new Date().toLocaleString()}  
**Pencil File:** \`pencil-designsystem-${projectName}.pen\`

## Components Extracted (${components.length})

${components.map(c => `### ${c.name}
- **File:** \`${c.file}\`
- **Variants:** ${c.hasVariants ? 'Yes' : 'No'}
- **States:** ${c.hasStates ? 'Yes' : 'No'}
- **Props:** ${c.props.join(', ') || 'None'}
`).join('\n')}

## Design Tokens (${tokens.length})

${Object.entries(groupBy(tokens, 'category')).map(([category, categoryTokens]) => `### ${capitalize(category)} (${categoryTokens.length})
${categoryTokens.slice(0, 5).map(t => `- \`--${t.name}\`: ${t.value}`).join('\n')}
${categoryTokens.length > 5 ? `- ...and ${categoryTokens.length - 5} more\n` : ''}`).join('\n')}

## Usage

### Opening in Pencil
1. Open Cursor
2. Navigate to \`design-system/pencil-designsystem-${projectName}.pen\`
3. Pencil will launch automatically
4. Edit components visually

### Syncing Changes

**Pencil → Code:**
- Edit in Pencil
- Export to code
- Copy to your project

**Code → Pencil:**
- Update components in code
- Re-run extraction:
  \`\`\`bash
  npm run extract-to-pencil
  \`\`\`

## Next Steps

1. ✅ Components extracted successfully
2. 📝 Review component structure in Pencil
3. 🎨 Customize designs visually
4. 🔄 Export back to code when ready

---

*Generated by MVP Starter CLI (Chunk 6)*
`;
  
  await fs.writeFile(summaryPath, summary);
}

async function createPencilPlaceholder(projectDir, projectInfo) {
  const { projectName } = projectInfo;
  const placeholderPath = path.join(projectDir, 'design-system', 'PENCIL-MANUAL-EXTRACTION.md');
  
  const content = `# Manual Pencil Extraction Required

Automatic extraction requires Pencil MCP to be configured in Cursor.

## Setup Pencil MCP

1. **Install Pencil Dev Extension:**
   - Open Cursor Command Palette (\`Cmd+Shift+P\`)
   - Search for: \`Install Extension\`
   - Install: \`Pencil Dev\` by High Agency
   - Or visit: \`cursor:extension/highagency.pencildev\`

2. **Verify MCP Connection:**
   - Check \`~/.cursor/mcp.json\` for Pencil server
   - Restart Cursor if needed

3. **Re-run Extraction:**
   After setup, run:
   \`\`\`bash
   cd ${projectName}
   npm run extract-to-pencil
   \`\`\`

## Manual Alternative

If you prefer manual extraction:

1. Create a new Pencil file in Cursor
2. Use the Pencil tools to recreate components:
   - Button (3 variants)
   - Input (with error states)
   - Modal
   - EmptyState
   - Placeholder (4 aspect ratios)
3. Copy styling from \`app/globals.css\`
4. Save as \`pencil-designsystem-${projectName}.pen\`

---

*For automatic extraction, ensure Pencil MCP is configured.*
`;
  
  await fs.writeFile(placeholderPath, content);
}

// Helper functions
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const group = item[key];
    if (!result[group]) result[group] = [];
    result[group].push(item);
    return result;
  }, {});
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
