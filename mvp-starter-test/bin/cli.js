#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { gatherProjectInfo } from '../lib/prompts.js';
import { createNextJsProject, verifyProject } from '../lib/create-project.js';
import { setupDesignSystem } from '../lib/setup-design-system.js';
import { setupSpecKit } from '../lib/setup-speckit.js';
import { setupPencil } from '../lib/setup-pencil.js';
import { extractToPencil } from '../lib/extract-to-pencil.js';
import { checkPrerequisites, showPostInstallHelp } from '../lib/check-prerequisites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Experimental: Try to create .pen file directly using Pencil MCP
async function tryCreatePencilFile(projectDir, projectInfo) {
  try {
    const fs = await import('fs-extra');
    const path = await import('path');
    
    // Read the CREATE-PENCIL-FILE.md that was generated
    const promptFile = path.join(projectDir, 'design-system', 'CREATE-PENCIL-FILE.md');
    
    if (!await fs.pathExists(promptFile)) {
      return false;
    }
    
    console.log(chalk.dim('   Checking for Pencil MCP access...\n'));
    
    // Try to import and use Pencil MCP tools
    // This will likely fail because MCP servers run in Cursor's context
    // But it's worth trying!
    
    // For now, we can't directly call MCP from Node.js CLI
    // The MCP protocol requires Cursor's infrastructure
    
    return false; // Auto-creation not available from CLI
    
  } catch (error) {
    return false;
  }
}

// Auto-start SpecKit workflow in terminal
async function startSpecKitWorkflow(projectDir, projectInfo) {
  try {
    console.log(chalk.cyan('📋 SpecKit is ready to use!\n'));
    console.log(chalk.white('Next Steps for SpecKit:'));
    console.log(chalk.cyan('  1. Open Cursor: ') + chalk.white(`cursor ${projectInfo.projectName}`));
    console.log(chalk.cyan('  2. Start spec workflow: ') + chalk.white('@speckit.specify.md'));
    console.log(chalk.cyan('  3. Follow the prompts to create your specification\n'));
    
    console.log(chalk.dim('💡 Tip: SpecKit files are in .specify/ folder\n'));
    
    // Try to open Cursor automatically
    const open = (await import('open')).default;
    try {
      await open(projectDir, { app: { name: 'cursor' } });
      console.log(chalk.green('✓ Opening project in Cursor...\n'));
    } catch (error) {
      console.log(chalk.dim('   (Manual: open Cursor and navigate to project)\n'));
    }
    
    return true;
  } catch (error) {
    console.log(chalk.yellow('⚠️  Could not auto-start SpecKit'));
    console.log(chalk.dim(`   Error: ${error.message}\n`));
    return false;
  }
}

async function main() {
  try {
    // Check prerequisites before starting
    const prereqsMet = await checkPrerequisites();
    
    if (!prereqsMet) {
      console.log(chalk.red('\n❌ Please install required software before continuing.\n'));
      console.log(chalk.dim('See INSTALLATION.md for detailed instructions.\n'));
      process.exit(1);
    }
    
    // Gather all project info through prompts (including project name)
    const projectInfo = await gatherProjectInfo();

    // Display summary
    console.log('\n' + chalk.green.bold('✅ Configuration complete!\n'));
    console.log(chalk.cyan('Project Details:'));
    console.log(chalk.dim('  • Name:        ') + chalk.white(projectInfo.projectName));
    console.log(chalk.dim('  • Color:       ') + chalk.white(projectInfo.primaryColor));
    console.log(chalk.dim('  • Dark Mode:   ') + chalk.white(projectInfo.darkMode ? 'Yes' : 'No'));
    
    if (projectInfo.categoryColors) {
      console.log(chalk.dim('  • Categories:  ') + chalk.white('Yes'));
    }

    console.log('\n' + chalk.bold.cyan('📦 Creating Next.js Project...\n'));

    // Create the Next.js project
    const projectDir = await createNextJsProject(projectInfo);

    // Verify project was created successfully
    await verifyProject(projectDir);

    // Set up design system
    console.log('\n' + chalk.bold.cyan('🎨 Setting Up Design System...\n'));
    await setupDesignSystem(projectDir, projectInfo);

    // Set up Pencil
    console.log('\n' + chalk.bold.cyan('🎨 Setting Up Pencil Integration...\n'));
    await setupPencil(projectDir, projectInfo);

    // Extract components to Pencil
    console.log('\n' + chalk.bold.cyan('📤 Extracting Components to Pencil...\n'));
    await extractToPencil(projectDir, projectInfo);

    console.log(chalk.dim('[DEBUG] Extraction completed, moving to next step...\n'));

    // Try to auto-create .pen file using Pencil MCP
    console.log('\n' + chalk.bold.magenta('🎨 Attempting to Auto-Generate .pen File...\n'));
    try {
      const pencilCreated = await tryCreatePencilFile(projectDir, projectInfo);
      if (!pencilCreated) {
        console.log(chalk.yellow('⚠️  Auto-generation not available (requires Cursor context)'));
        console.log(chalk.dim('   → See PENCIL-LIMITATION.md for technical details'));
        console.log(chalk.cyan('   → Use in Cursor: @CREATE-PENCIL-FILE.md\n'));
      }
    } catch (error) {
      console.log(chalk.yellow('⚠️  Auto-generation not available'));
      console.log(chalk.cyan('   → Use in Cursor: @CREATE-PENCIL-FILE.md\n'));
    }

    console.log(chalk.dim('[DEBUG] About to show SpecKit prompt...\n'));

    // Ask about SpecKit (optional) - VERY VISIBLE
    console.log('\n' + '='.repeat(70));
    console.log(chalk.bold.yellow('⚡ IMPORTANT CHOICE ⚡'));
    console.log('='.repeat(70));
    console.log(chalk.bold.blue('\n📋 SpecKit Setup (Optional)\n'));
    console.log(chalk.white('SpecKit provides spec-driven development workflow'));
    console.log(chalk.white('Recommended for team projects, optional for solo work\n'));
    console.log('='.repeat(70) + '\n');
    
    console.log(chalk.dim('[DEBUG] Calling inquirer.prompt for SpecKit...\n'));
    
    const { useSpecKit } = await inquirer.prompt([{
      type: 'confirm',
      name: 'useSpecKit',
      message: chalk.bold.yellow('Do you want to use SpecKit?'),
      default: false
    }]);
    
    console.log(chalk.dim(`[DEBUG] SpecKit choice: ${useSpecKit}\n`));

    let usedSpecKit = false;
    if (useSpecKit) {
      console.log('\n' + chalk.bold.cyan('📋 Setting Up SpecKit Framework...\n'));
      await setupSpecKit(projectDir, projectInfo);
      usedSpecKit = true;
      console.log(chalk.green('✔ SpecKit configured!\n'));
      console.log(chalk.yellow('⚡ SpecKit will auto-start after dev server launches\n'));
    } else {
      console.log(chalk.dim('\nℹ️  Skipping SpecKit - you can add it later if needed\n'));
    }

    // Success message
    console.log('\n' + chalk.green.bold('🎉 Success! Your project is ready.\n'));

    // Show contextual next steps BEFORE starting server
    await showPostInstallHelp(projectDir, projectInfo, usedSpecKit);

    // Ask if they want to start the dev server now
    const { startNow } = await inquirer.prompt([{
      type: 'confirm',
      name: 'startNow',
      message: 'Start the dev server now?',
      default: true
    }]);

    if (startNow) {
      console.log('\n' + chalk.cyan('🚀 Starting dev server...\n'));
      
      const { execa } = await import('execa');
      const open = (await import('open')).default;
      
      // Run npm run dev in the project directory
      const devServer = execa('npm', ['run', 'dev'], {
        cwd: projectDir,
        stdio: ['inherit', 'pipe', 'inherit']
      });

      let browserOpened = false;
      let serverUrl = 'http://localhost:3000'; // Default

      // Watch stdout for "Ready" message and auto-open browser
      devServer.stdout.on('data', async (data) => {
        const output = data.toString();
        
        // Show the output to user
        process.stdout.write(output);
        
        // Extract URL from Next.js output (handles both port 3000 and alternate ports)
        const urlMatch = output.match(/Local:\s+(https?:\/\/localhost:\d+)/);
        if (urlMatch) {
          serverUrl = urlMatch[1];
        }
        
        // When server is ready and we haven't opened browser yet
        if (!browserOpened && (output.includes('Ready in') || output.includes('started server'))) {
          console.log(chalk.green('\n🌐 Opening browser...\n'));
          
          // Wait a moment for server to be fully ready
          setTimeout(async () => {
            try {
              await open(serverUrl);
              browserOpened = true;
              console.log(chalk.green(`✓ Browser opened to ${serverUrl}\n`));
              
              // Auto-start SpecKit workflow if user chose it
              if (usedSpecKit) {
                console.log(chalk.bold.magenta('\n🚀 Auto-Starting SpecKit Workflow...\n'));
                await startSpecKitWorkflow(projectDir, projectInfo);
              }
              
              console.log(chalk.bold.yellow('\n⏸️  Dev server is running. Press Ctrl+C to stop.\n'));
            } catch (error) {
              console.log(chalk.yellow(`⚠️  Could not auto-open browser. Please visit: ${serverUrl}\n`));
              
              // Still try to start SpecKit even if browser fails
              if (usedSpecKit) {
                console.log(chalk.bold.magenta('\n🚀 Auto-Starting SpecKit Workflow...\n'));
                await startSpecKitWorkflow(projectDir, projectInfo);
              }
              
              console.log(chalk.bold.yellow('\n⏸️  Dev server is running. Press Ctrl+C to stop.\n'));
            }
          }, 1000);
        }
      });

      // Keep the process alive while dev server runs
      await devServer;
      
    } else {
      console.log(chalk.cyan('\nNext steps:\n'));
      console.log(chalk.white('  1. ') + chalk.dim(`cd ${projectInfo.projectName}`));
      console.log(chalk.white('  2. ') + chalk.dim('npm run dev'));
      console.log(chalk.white('  3. ') + chalk.dim('Open http://localhost:3000\n'));
    }

  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    if (error.stderr) {
      console.error(chalk.dim(error.stderr));
    }
    process.exit(1);
  }
}

main();
