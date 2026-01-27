import { execa } from 'execa';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

export async function checkPrerequisites() {
  console.log(chalk.bold.blue('\n🔍 Checking Prerequisites...\n'));
  
  const checks = {
    node: false,
    npm: false,
    cursor: false,
    pencil: false
  };
  
  // Check Node.js
  try {
    const { stdout } = await execa('node', ['--version']);
    const version = stdout.trim();
    const majorVersion = parseInt(version.replace('v', '').split('.')[0]);
    
    if (majorVersion >= 18) {
      checks.node = true;
      console.log(chalk.green('✔ Node.js:'), chalk.white(version), chalk.dim('(required: v18+)'));
    } else {
      console.log(chalk.red('✖ Node.js:'), chalk.white(version), chalk.dim('(required: v18+)'));
      console.log(chalk.yellow('  → Please upgrade Node.js: https://nodejs.org'));
    }
  } catch (error) {
    console.log(chalk.red('✖ Node.js: Not found'));
    console.log(chalk.yellow('  → Install Node.js: https://nodejs.org'));
  }
  
  // Check npm
  try {
    const { stdout } = await execa('npm', ['--version']);
    checks.npm = true;
    console.log(chalk.green('✔ npm:'), chalk.white(stdout.trim()));
  } catch (error) {
    console.log(chalk.red('✖ npm: Not found'));
    console.log(chalk.yellow('  → npm comes with Node.js'));
  }
  
  // Check Cursor (optional check)
  try {
    await execa('which', ['cursor']);
    checks.cursor = true;
    console.log(chalk.green('✔ Cursor:'), chalk.white('Installed'));
  } catch (error) {
    console.log(chalk.yellow('⚠ Cursor:'), chalk.dim('Not in PATH (this is OK)'));
    console.log(chalk.dim('  → If you don\'t have Cursor: https://cursor.com'));
  }
  
  // Check Pencil MCP (optional)
  const mcpPath = path.join(os.homedir(), '.cursor', 'mcp.json');
  if (await fs.pathExists(mcpPath)) {
    try {
      const mcpConfig = await fs.readJson(mcpPath);
      const hasPencil = Object.keys(mcpConfig.mcpServers || {}).some(key => 
        key.toLowerCase().includes('pencil')
      );
      
      if (hasPencil) {
        checks.pencil = true;
        console.log(chalk.green('✔ Pencil MCP:'), chalk.white('Configured'));
      } else {
        console.log(chalk.yellow('⚠ Pencil MCP:'), chalk.dim('Not configured (optional)'));
      }
    } catch (error) {
      console.log(chalk.yellow('⚠ Pencil MCP:'), chalk.dim('Not configured (optional)'));
    }
  } else {
    console.log(chalk.yellow('⚠ Pencil MCP:'), chalk.dim('Not configured (optional)'));
  }
  
  console.log(); // Empty line
  
  // Check if critical requirements are met
  const criticalMet = checks.node && checks.npm;
  
  if (!criticalMet) {
    console.log(chalk.red.bold('❌ Critical requirements not met!\n'));
    console.log(chalk.yellow('Please install the required software:\n'));
    
    if (!checks.node) {
      console.log(chalk.white('  1. Install Node.js v18 or higher'));
      console.log(chalk.dim('     → https://nodejs.org\n'));
    }
    
    if (!checks.npm) {
      console.log(chalk.white('  2. npm should come with Node.js'));
      console.log(chalk.dim('     → Reinstall Node.js if npm is missing\n'));
    }
    
    console.log(chalk.dim('See INSTALLATION.md for detailed setup instructions.\n'));
    
    return false;
  }
  
  // Optional recommendations
  if (!checks.pencil) {
    console.log(chalk.cyan('💡 Optional: Install Pencil Dev for visual design editing'));
    console.log(chalk.dim('   → In Cursor: Cmd+Shift+P → "Install Extension" → Search "Pencil Dev"'));
    console.log(chalk.dim('   → You can skip this and install it later\n'));
  }
  
  console.log(chalk.green.bold('✅ All critical requirements met!\n'));
  
  return true;
}

export async function showPostInstallHelp(projectDir, projectInfo, usedSpecKit) {
  console.log(chalk.bold.blue('\n📚 Next Steps:\n'));
  
  console.log(chalk.white('1. Navigate to your project:'));
  console.log(chalk.cyan(`   cd ${projectInfo.projectName}\n`));
  
  if (usedSpecKit) {
    console.log(chalk.white('2. Review SpecKit setup:'));
    console.log(chalk.cyan('   cat .specify/memory/constitution.md\n'));
    
    console.log(chalk.white('3. Create your first spec:'));
    console.log(chalk.cyan('   # Use @speckit.specify.md in Cursor\n'));
  }
  
  console.log(chalk.white(`${usedSpecKit ? '4' : '2'}. Generate Pencil file (in Cursor):`));
  console.log(chalk.cyan('   @CREATE-PENCIL-FILE.md please create the Pencil file\n'));
  
  console.log(chalk.white(`${usedSpecKit ? '5' : '3'}. Start building!`));
  console.log(chalk.cyan('   # Components are in design-system/pencildraw/'));
  console.log(chalk.cyan('   # Import: import { Button } from "@/design-system/pencildraw"\n'));
  
  console.log(chalk.dim('See design-system/README.md for component documentation.\n'));
}
