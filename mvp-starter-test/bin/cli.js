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
import { checkPrerequisites } from '../lib/check-prerequisites.js';
import { checkUvAvailable, installUv } from '../lib/setup-speckit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Show complete step-by-step instructions
function showCompleteInstructions(projectDir, projectInfo, usedSpecKit) {
  console.log('\n' + '='.repeat(70));
  console.log(chalk.bold.green('📋 STEP-BY-STEP INSTRUCTIONS'));
  console.log('='.repeat(70));
  
  console.log(chalk.bold.white('\n✅ What Was Created:\n'));
  console.log(chalk.dim('  • Next.js project with Tailwind CSS v4'));
  console.log(chalk.dim('  • Design system with 62+ tokens in app/globals.css'));
  console.log(chalk.dim('  • 5 components: Button, Input, Modal, EmptyState, Placeholder'));
  console.log(chalk.dim('  • Pencil integration files'));
  console.log(chalk.dim('  • Component extraction metadata'));
  if (usedSpecKit) {
    console.log(chalk.dim('  • SpecKit framework (.specify/ folder)'));
  }
  
  console.log(chalk.bold.white('\n📍 Step 1: Navigate to Your Project\n'));
  console.log(chalk.cyan(`   cd ${projectInfo.projectName}`));
  
  console.log(chalk.bold.white('\n📍 Step 2: Open in Cursor\n'));
  console.log(chalk.cyan('   cursor .'));
  
  console.log(chalk.bold.white('\n📍 Step 3: Install Pencil (if not already installed)\n'));
  console.log(chalk.white('   Pencil is required to create the visual design file.\n'));
  console.log(chalk.yellow('   In Cursor:'));
  console.log(chalk.white('   1. Open Settings (⌘,)'));
  console.log(chalk.white('   2. Search for "MCP"'));
  console.log(chalk.white('   3. Click "Add MCP Server" or enable Pencil if it\'s listed'));
  console.log(chalk.dim('\n   If Pencil is already installed, skip this step\n'));
  
  console.log(chalk.bold.white('\n📍 Step 4: Create Pencil Design File\n'));
  console.log(chalk.white('   In Cursor Chat, paste this EXACT command:'));
  console.log(chalk.bgBlue.white('\n   @CREATE-PENCIL-FILE.md please create the Pencil file   \n'));
  console.log(chalk.dim('   This will create a visual design system file with all components'));
  
  if (usedSpecKit) {
    console.log(chalk.bold.white('\n📍 Step 5: Start SpecKit Workflow (Optional but Recommended)\n'));
    console.log(chalk.white('   SpecKit helps you build with a structured spec → plan → implement flow.\n'));
    
    console.log(chalk.yellow('   Step 5a: Create Project Constitution'));
    console.log(chalk.white('   In Cursor Chat, paste:'));
    console.log(chalk.bgBlue.white('\n   /speckit.constitution Create principles focused on design system usage, clean code, and user experience   \n'));
    console.log(chalk.dim('   This creates your project\'s governing principles\n'));
    
    console.log(chalk.yellow('   Step 5b: Define What to Build'));
    console.log(chalk.white('   In Cursor Chat, paste:'));
    console.log(chalk.bgBlue.white('\n   /speckit.specify Build [describe your MVP here, e.g., "a user dashboard with profile editing"]   \n'));
    console.log(chalk.dim('   Be specific about what you want to build\n'));
    
    console.log(chalk.yellow('   Step 5c: Create Technical Plan'));
    console.log(chalk.white('   In Cursor Chat, paste:'));
    console.log(chalk.bgBlue.white('\n   /speckit.plan Use the existing design system components, Next.js, and Tailwind CSS   \n'));
    console.log(chalk.dim('   This creates a detailed implementation plan\n'));
    
    console.log(chalk.yellow('   Step 5d: Generate Tasks'));
    console.log(chalk.white('   In Cursor Chat, paste:'));
    console.log(chalk.bgBlue.white('\n   /speckit.tasks   \n'));
    console.log(chalk.dim('   This breaks down the plan into actionable tasks\n'));
    
    console.log(chalk.yellow('   Step 5e: Implement'));
    console.log(chalk.white('   In Cursor Chat, paste:'));
    console.log(chalk.bgBlue.white('\n   /speckit.implement   \n'));
    console.log(chalk.dim('   This executes all tasks and builds your feature\n'));
  } else {
    console.log(chalk.bold.white('\n📍 Step 5: Start Building Your MVP\n'));
    console.log(chalk.white('   Use Cursor Chat to ask for features:'));
    console.log(chalk.cyan('   "Build a user dashboard using the design system components"'));
    console.log(chalk.dim('   Components available: Button, Input, Modal, EmptyState, Placeholder'));
  }
  
  console.log(chalk.bold.white('\n📍 Final Step: Run Dev Server\n'));
  console.log(chalk.white('   When ready to see your app:'));
  console.log(chalk.cyan('   npm run dev'));
  console.log(chalk.dim('   Opens at http://localhost:3000\n'));
  
  console.log(chalk.bold.yellow('💡 Pro Tips:\n'));
  console.log(chalk.dim('   • All design tokens are in app/globals.css'));
  console.log(chalk.dim('   • Components are in design-system/pencildraw/'));
  console.log(chalk.dim('   • Use @filename.md to reference files in Cursor'));
  if (usedSpecKit) {
    console.log(chalk.dim('   • SpecKit files are in .specify/ folder'));
    console.log(chalk.dim('   • Each SpecKit command creates new files in specs/'));
  }
  
  console.log('\n' + '='.repeat(70) + '\n');
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

    // Check if SpecKit can be installed (requires uv)
    console.log('\n' + chalk.cyan('🔍 Checking for SpecKit compatibility...\n'));
    const uvAvailable = await checkUvAvailable();
    
    let usedSpecKit = false;
    
    if (uvAvailable) {
      // Ask about SpecKit (optional)
      console.log('='.repeat(70));
      console.log(chalk.bold.yellow('⚡ IMPORTANT CHOICE ⚡'));
      console.log('='.repeat(70));
      console.log(chalk.bold.blue('\n📋 SpecKit Setup (Optional)\n'));
      console.log(chalk.white('SpecKit provides spec-driven development workflow'));
      console.log(chalk.white('Recommended for team projects, optional for solo work\n'));
      console.log('='.repeat(70) + '\n');
      
      const { useSpecKit } = await inquirer.prompt([{
        type: 'confirm',
        name: 'useSpecKit',
        message: chalk.bold.yellow('Do you want to use SpecKit?'),
        default: false
      }]);

      if (useSpecKit) {
        console.log('\n' + chalk.bold.cyan('📋 Setting Up SpecKit Framework...\n'));
        try {
          await setupSpecKit(projectDir, projectInfo);
          usedSpecKit = true;
          console.log(chalk.green('✔ SpecKit configured!\n'));
        } catch (error) {
          console.log(chalk.yellow('\n⚠️  SpecKit setup incomplete - continuing without it.'));
          console.log(chalk.dim('   You can set it up manually later if needed.\n'));
          usedSpecKit = false;
        }
      } else {
        console.log(chalk.dim('\nℹ️  Skipping SpecKit - you can add it later if needed\n'));
      }
    } else {
      // uv not available - offer to install it
      console.log('='.repeat(70));
      console.log(chalk.bold.yellow('⚡ SPECKIT REQUIRES UV ⚡'));
      console.log('='.repeat(70));
      console.log(chalk.white('\nSpecKit needs "uv" (Python package manager) which is not installed.\n'));
      console.log(chalk.yellow('Would you like to install uv automatically?\n'));
      console.log(chalk.dim('This will run: curl -LsSf https://astral.sh/uv/install.sh | sh'));
      console.log('='.repeat(70) + '\n');
      
      const { installUvNow } = await inquirer.prompt([{
        type: 'confirm',
        name: 'installUvNow',
        message: 'Install uv now?',
        default: false
      }]);
      
      if (installUvNow) {
        const uvInstalled = await installUv();
        if (uvInstalled) {
          console.log(chalk.green('✓ uv installation complete!'));
          console.log(chalk.yellow('\n⚠️  Important: Restart your terminal to use uv.'));
          console.log(chalk.white('Then run this CLI again to set up SpecKit.\n'));
        }
      } else {
        console.log(chalk.dim('\nℹ️  Skipping uv installation.'));
        console.log(chalk.white('\n   To install uv manually later:'));
        console.log(chalk.cyan('   macOS/Linux: ') + chalk.dim('curl -LsSf https://astral.sh/uv/install.sh | sh'));
        console.log(chalk.cyan('   Windows:     ') + chalk.dim('powershell -c "irm https://astral.sh/uv/install.ps1 | iex"'));
        console.log(chalk.dim('\n   Then restart terminal and run this CLI again.\n'));
      }
      
      usedSpecKit = false;
    }

    // Success message
    console.log('\n' + chalk.green.bold('🎉 Setup Complete! All files created.\n'));

    // Show complete step-by-step instructions BEFORE offering dev server
    await showCompleteInstructions(projectDir, projectInfo, usedSpecKit);

    // Ask if they want to start the dev server now
    console.log('\n' + chalk.bold.cyan('Final Step: Development Server\n'));
    const { startNow } = await inquirer.prompt([{
      type: 'confirm',
      name: 'startNow',
      message: 'Start the dev server now (this will block the terminal)?',
      default: false // Changed to false so users can review instructions first
    }]);

    if (startNow) {
      console.log('\n' + chalk.yellow('⚠️  The dev server will block this terminal.'));
      console.log(chalk.dim('   Press Ctrl+C to stop it when needed.\n'));
      console.log(chalk.cyan('🚀 Starting dev server...\n'));
      
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
              console.log(chalk.bold.yellow('⏸️  Dev server is running. Press Ctrl+C to stop.\n'));
            } catch (error) {
              console.log(chalk.yellow(`⚠️  Could not auto-open browser. Please visit: ${serverUrl}\n`));
              console.log(chalk.bold.yellow('⏸️  Dev server is running. Press Ctrl+C to stop.\n'));
            }
          }, 1000);
        }
      });

      // Keep the process alive while dev server runs
      await devServer;
      
    } else {
      console.log(chalk.dim('\n✓ Setup complete! Follow the instructions above to continue.\n'));
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
