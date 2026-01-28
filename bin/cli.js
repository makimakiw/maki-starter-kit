#!/usr/bin/env node

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import { createSpinner } from 'nanospinner';
import { gatherProjectInfo } from '../lib/prompts.js';
import { createNextJsProject, verifyProject } from '../lib/create-project.js';
import { setupDesignSystem } from '../lib/setup-design-system.js';
import { setupSpecKit } from '../lib/setup-speckit.js';
import { setupPencil } from '../lib/setup-pencil.js';
import { extractToPencil } from '../lib/extract-to-pencil.js';
import { checkPrerequisites } from '../lib/check-prerequisites.js';
import { checkUvAvailable, installUv } from '../lib/setup-speckit.js';
import { checkPencilMCP } from '../lib/check-pencil.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ASCII Art Banner
function showWelcomeBanner() {
  console.clear();
  
  const banner = figlet.textSync('MAKI', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });
  
  console.log(gradient.pastel.multiline(banner));
  
  const subtitle = boxen(
    chalk.white.bold('🍣  STARTER KIT  🍣\n\n') +
    chalk.dim('Beautiful Next.js projects in seconds\n') +
    chalk.cyan('Design System • Components • Pencil • SpecKit'),
    {
      padding: 1,
      margin: { top: 1, bottom: 1 },
      borderColor: 'magenta',
      borderStyle: 'round',
      textAlignment: 'center'
    }
  );
  
  console.log(subtitle);
  console.log(chalk.dim.italic('                      v3.0.0 - Let\'s build something amazing!\n'));
}

// Show complete step-by-step instructions
function showCompleteInstructions(projectDir, appDir, projectInfo, usedSpecKit, hasPencil) {
  const { projectName, appName } = projectInfo;
  
  console.log('\n');
  const headerBox = boxen(
    gradient.pastel('🍣  YOUR PROJECT IS READY!  🍣'),
    {
      padding: 1,
      margin: 1,
      borderColor: 'magenta',
      borderStyle: 'double',
      textAlignment: 'center'
    }
  );
  console.log(headerBox);
  
  console.log(chalk.bold.magenta('\n✨ What MAKI Created For You:\n'));
  console.log(chalk.cyan(`  🏗️  Monorepo structure: `) + chalk.white.bold(projectName + '/'));
  console.log(chalk.cyan(`  📱 Next.js app in `) + chalk.white.bold(appName + '/') + chalk.cyan(' with Tailwind CSS v4'));
  console.log(chalk.cyan(`  🎨 Design system with `) + chalk.white.bold('62+ tokens') + chalk.cyan(` in ${appName}/app/globals.css`));
  console.log(chalk.cyan('  🧩 5 beautiful components: ') + chalk.white('Button, Input, Modal, EmptyState, Placeholder'));
  console.log(chalk.cyan('  ✏️  Pencil integration files'));
  console.log(chalk.cyan('  📊 Component extraction metadata'));
  console.log(chalk.cyan('  🔗 Git initialized at project root'));
  console.log(chalk.cyan('  📦 npm workspaces configured'));
  if (usedSpecKit) {
    console.log(chalk.cyan('  📋 SpecKit framework ') + chalk.white('(.specify/ folder at root)'));
    console.log(chalk.cyan('  📜 Project constitution with design system rules'));
  }
  
  console.log(chalk.bold.magenta('\n🚀 Step 1: Navigate to Your Project\n'));
  console.log('   ' + chalk.bgMagenta.white(` cd ${projectName} `));
  
  console.log(chalk.bold.magenta('\n💻 Step 2: Open in Cursor\n'));
  console.log('   ' + chalk.bgCyan.black(' cursor . '));
  console.log(chalk.dim('   This opens the monorepo root - you\'ll see everything!'));
  
  if (hasPencil) {
    console.log(chalk.bold.magenta('\n✏️  Step 3: Pencil MCP Status\n'));
    console.log(chalk.green.bold('   ✅ Pencil MCP detected and active!\n'));
    
    console.log(chalk.bold.magenta('\n🎨 Step 4: Create Pencil Design File\n'));
    console.log(chalk.white('   In Cursor Chat, paste this magic command:'));
    console.log(chalk.bgMagenta.white(`\n   @${appName}/design-system/CREATE-PENCIL-FILE.md create the Pencil design file   \n`));
    console.log(chalk.dim('   ✨ This creates a visual design system with beautifully styled components!'));
  } else {
    console.log(chalk.bold.magenta('\n✏️  Step 3: Install Pencil MCP\n'));
    console.log(chalk.yellow('   ⚠️  Pencil MCP not detected\n'));
    console.log(chalk.white('   🎨 Pencil is needed to create the visual design file.\n'));
    console.log(chalk.white('   Quick setup in Cursor:'));
    console.log(chalk.cyan('   1️⃣  Open Cursor Settings (⌘,)'));
    console.log(chalk.cyan('   2️⃣  Search for "MCP"'));
    console.log(chalk.cyan('   3️⃣  Click "Add MCP Server" and enable Pencil'));
    console.log(chalk.dim('\n   After installing, restart Cursor 🔄\n'));
    
    console.log(chalk.bold.magenta('\n🎨 Step 4: Create Pencil Design File\n'));
    console.log(chalk.white('   After Pencil is installed, in Cursor Chat paste:'));
    console.log(chalk.bgMagenta.white(`\n   @${appName}/design-system/CREATE-PENCIL-FILE.md create the Pencil design file   \n`));
    console.log(chalk.dim('   ✨ This creates a visual design system with beautifully styled components!'));
  }
  
  if (usedSpecKit) {
    console.log(chalk.bold.magenta('\n📋 Step 5: Use SpecKit Workflow\n'));
    console.log(chalk.white('   🎉 SpecKit is configured with your design system context!\n'));
    console.log(chalk.green('   ✓ Constitution already created with design system rules'));
    console.log(chalk.green('   ✓ Knows about your components and color tokens\n'));
    
    console.log(chalk.white('   🚀 Run these commands in your terminal:\n'));
    
    console.log(chalk.bold.cyan('   Step 5a: Define What to Build'));
    console.log('   ' + chalk.bgCyan.black(' specify specify "Build a user dashboard with profile editing" '));
    console.log(chalk.dim('   Replace the description with what you want to build\n'));
    
    console.log(chalk.bold.cyan('   Step 5b: Create Technical Plan'));
    console.log('   ' + chalk.bgCyan.black(' specify plan '));
    console.log(chalk.dim('   Creates a detailed implementation plan\n'));
    
    console.log(chalk.yellow('   Step 5c: Generate Tasks'));
    console.log(chalk.cyan('   specify tasks\n'));
    console.log(chalk.dim('   Breaks down the plan into actionable tasks\n'));
    
    console.log(chalk.yellow('   Step 5d: Implement'));
    console.log(chalk.cyan('   specify implement\n'));
    console.log(chalk.dim('   Executes all tasks and builds your feature\n'));
    
    console.log(chalk.dim('   💡 View constitution: .specify/memory/constitution.md'));
    console.log(chalk.dim('   💡 Specs are saved in: specs/ folder\n'));
  } else {
    console.log(chalk.bold.white('\n📍 Step 5: Start Building Your MVP\n'));
    console.log(chalk.white('   Use Cursor Chat to ask for features:'));
    console.log(chalk.cyan('   "Build a user dashboard using the design system components"'));
    console.log(chalk.dim('   Components available: Button, Input, Modal, EmptyState, Placeholder'));
  }
  
  console.log(chalk.bold.magenta('\n🚀 Final Step: Run Dev Server\n'));
  console.log(chalk.white('   When ready to see your app in action:'));
  console.log('   ' + chalk.bgMagenta.white(` cd ${appName} `));
  console.log('   ' + chalk.bgCyan.black(' npm run dev '));
  console.log(chalk.dim('   ✨ Opens at http://localhost:3000\n'));
  
  const tipsBox = boxen(
    chalk.bold.yellow('💡 MAKI Pro Tips\n\n') +
    chalk.cyan(`🎨 Design tokens: `) + chalk.white(`${appName}/app/globals.css\n`) +
    chalk.cyan(`🧩 Components: `) + chalk.white(`${appName}/design-system/pencildraw/\n`) +
    chalk.cyan(`📎 Reference files: `) + chalk.white(`Use @filename.md in Cursor\n`) +
    chalk.cyan(`🔗 Git location: `) + chalk.white(`Initialized at project root\n`) +
    (usedSpecKit ? 
      chalk.cyan(`📋 SpecKit: `) + chalk.white(`specify <command> in terminal\n`) +
      chalk.cyan(`📜 Constitution: `) + chalk.white(`.specify/memory/constitution.md\n`) +
      chalk.cyan(`📝 Specs folder: `) + chalk.white(`specs/ at project root`)
      : ''),
    {
      padding: 1,
      margin: { top: 1, bottom: 1 },
      borderColor: 'yellow',
      borderStyle: 'round'
    }
  );
  console.log(tipsBox);
  
  const footer = boxen(
    gradient.pastel('🍣  Built with MAKI-STARTER-KIT  🍣\n\n') +
    chalk.dim('Happy coding! Build something amazing! 🚀'),
    {
      padding: 1,
      margin: 1,
      borderColor: 'magenta',
      borderStyle: 'round',
      textAlignment: 'center'
    }
  );
  console.log(footer);
}

async function main() {
  try {
    // Show welcome banner
    showWelcomeBanner();
    
    // Check prerequisites before starting
    const spinner = createSpinner('Checking prerequisites...').start();
    await new Promise(resolve => setTimeout(resolve, 800)); // Brief pause for effect
    const prereqsMet = await checkPrerequisites();
    
    if (!prereqsMet) {
      spinner.error({ text: 'Missing required software' });
      console.log(chalk.red('\n❌ Please install required software before continuing.\n'));
      console.log(chalk.dim('See INSTALLATION.md for detailed instructions.\n'));
      process.exit(1);
    }
    
    spinner.success({ text: 'All prerequisites met!' });
    
    // Gather all project info through prompts (including project name)
    console.log('\n' + chalk.bold.magenta('🎯 Let\'s configure your project!\n'));
    const projectInfo = await gatherProjectInfo();

    // Display summary
    console.log('\n');
    const summaryBox = boxen(
      chalk.magenta.bold('🎉 Configuration Complete!\n\n') +
      chalk.cyan('Project Details:\n') +
      chalk.dim('  🏗️  Project:     ') + chalk.white(projectInfo.projectName) + '\n' +
      chalk.dim('  📱 App:         ') + chalk.white(projectInfo.appName) + '\n' +
      chalk.dim('  🎨 Color:       ') + chalk.white(projectInfo.primaryColor) + '\n' +
      chalk.dim('  🌙 Dark Mode:   ') + chalk.white(projectInfo.darkMode ? 'Yes' : 'No') +
      (projectInfo.categoryColors ? '\n' + chalk.dim('  📂 Categories:  ') + chalk.white('Yes') : ''),
      {
        padding: 1,
        borderColor: 'cyan',
        borderStyle: 'round'
      }
    );
    console.log(summaryBox);

    console.log('\n' + chalk.bold.magenta('🍣 Let\'s cook up your project!\n'));

    // Create the monorepo structure with Next.js project
    const { projectDir, appDir } = await createNextJsProject(projectInfo);

    // Verify project was created successfully
    await verifyProject(appDir);

    // Set up design system (in app directory)
    console.log('\n' + chalk.bold.cyan('🎨 Setting Up Design System...\n'));
    await setupDesignSystem(appDir, projectInfo);

    // Set up Pencil (in app directory)
    console.log('\n' + chalk.bold.cyan('🎨 Setting Up Pencil Integration...\n'));
    await setupPencil(appDir, projectInfo);

    // Extract components to Pencil (in app directory)
    console.log('\n' + chalk.bold.cyan('📤 Extracting Components to Pencil...\n'));
    await extractToPencil(appDir, projectInfo);

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
    const successSpinner = createSpinner('Finalizing your project...').start();
    await new Promise(resolve => setTimeout(resolve, 1000));
    successSpinner.success({ text: chalk.bold('🎉 Setup Complete!') });

    // Check if Pencil MCP is installed
    const hasPencil = await checkPencilMCP();

    // Show complete step-by-step instructions BEFORE offering dev server
    await showCompleteInstructions(projectDir, appDir, projectInfo, usedSpecKit, hasPencil);

    // Ask if they want to start the dev server now
    const startPromptBox = boxen(
      chalk.bold.cyan('🚀 Ready to launch?\n\n') +
      chalk.white('Start the dev server now?\n') +
      chalk.dim('(This will block the terminal - press Ctrl+C to stop)'),
      {
        padding: 1,
        borderColor: 'cyan',
        borderStyle: 'round'
      }
    );
    console.log('\n' + startPromptBox);
    
    const { startNow } = await inquirer.prompt([{
      type: 'confirm',
      name: 'startNow',
      message: '🚀',
      default: false
    }]);

    if (startNow) {
      const launchSpinner = createSpinner('🚀 Launching dev server...').start();
      await new Promise(resolve => setTimeout(resolve, 800));
      launchSpinner.success({ text: 'Server starting!' });
      
      console.log('\n' + chalk.yellow('⚠️  The dev server will block this terminal.'));
      console.log(chalk.dim('   Press Ctrl+C to stop it when needed.\n'));
      
      const { execa } = await import('execa');
      const open = (await import('open')).default;
      
      // Run npm run dev in the app directory (not project root)
      const devServer = execa('npm', ['run', 'dev'], {
        cwd: appDir,
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
              console.log(chalk.green.bold(`\n✨ Browser opened to ${serverUrl}\n`));
              console.log(gradient.pastel('🍣  Your MAKI project is live!  🍣\n'));
              console.log(chalk.yellow('⏸️  Dev server running. Press Ctrl+C to stop.\n'));
            } catch (error) {
              console.log(chalk.yellow(`\n⚠️  Could not auto-open browser. Please visit: ${serverUrl}\n`));
              console.log(gradient.pastel('🍣  Your MAKI project is live!  🍣\n'));
              console.log(chalk.yellow('⏸️  Dev server running. Press Ctrl+C to stop.\n'));
            }
          }, 1000);
        }
      });

      // Keep the process alive while dev server runs
      await devServer;
      
    } else {
      const byeBox = boxen(
        gradient.pastel('✨ All set! ✨\n\n') +
        chalk.white('Follow the instructions above to continue.\n') +
        chalk.dim('Happy coding with MAKI! 🍣'),
        {
          padding: 1,
          margin: 1,
          borderColor: 'green',
          borderStyle: 'round',
          textAlignment: 'center'
        }
      );
      console.log(byeBox);
    }

  } catch (error) {
    console.log('\n');
    const errorBox = boxen(
      chalk.red.bold('❌ Oops! Something went wrong\n\n') +
      chalk.white(error.message) +
      (error.stderr ? '\n\n' + chalk.dim(error.stderr) : ''),
      {
        padding: 1,
        borderColor: 'red',
        borderStyle: 'round'
      }
    );
    console.log(errorBox);
    console.log(chalk.dim('\nPlease check the error above and try again.\n'));
    process.exit(1);
  }
}

main();
