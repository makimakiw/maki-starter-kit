import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';

// Check if uv is available (non-throwing)
export async function checkUvAvailable() {
  try {
    await execa('uv', ['--version'], { timeout: 5000 });
    return true;
  } catch (error) {
    return false;
  }
}

// Install uv automatically
export async function installUv() {
  const spinner = ora('Installing uv...').start();
  
  try {
    const platform = process.platform;
    
    if (platform === 'win32') {
      // Windows
      await execa('powershell', [
        '-c',
        'irm https://astral.sh/uv/install.ps1 | iex'
      ], { stdio: 'inherit' });
    } else {
      // macOS/Linux
      await execa('sh', [
        '-c',
        'curl -LsSf https://astral.sh/uv/install.sh | sh'
      ], { stdio: 'inherit' });
    }
    
    spinner.succeed(chalk.green('uv installed successfully'));
    console.log(chalk.yellow('\n⚠️  Important: You need to restart your terminal for uv to be available.'));
    console.log(chalk.white('After restarting, run the CLI again to complete SpecKit setup.\n'));
    return true;
  } catch (error) {
    spinner.fail(chalk.red('Failed to install uv'));
    console.log(chalk.yellow('\nManual installation:'));
    console.log(chalk.cyan('  macOS/Linux: ') + chalk.white('curl -LsSf https://astral.sh/uv/install.sh | sh'));
    console.log(chalk.cyan('  Windows:     ') + chalk.white('powershell -c "irm https://astral.sh/uv/install.ps1 | iex"'));
    console.log(chalk.dim('\nMore info: https://docs.astral.sh/uv/\n'));
    return false;
  }
}

export async function setupSpecKit(projectDir, projectInfo) {
  const spinner = ora('Checking for SpecKit prerequisites...').start();

  try {
    // Check if uv is installed
    spinner.text = 'Checking for uv package manager...';
    let uvPath;
    try {
      const uvResult = await execa('uv', ['--version'], { timeout: 10000 });
      uvPath = 'uv'; // Available in PATH
      spinner.text = `Found uv: ${uvResult.stdout.trim()}`;
    } catch (error) {
      spinner.fail(chalk.red('uv package manager not found'));
      console.log(chalk.yellow('\n⚠️  SpecKit requires uv (Python package manager).'));
      console.log(chalk.white('\nQuick Install:'));
      console.log(chalk.cyan('  macOS/Linux: ') + chalk.white('curl -LsSf https://astral.sh/uv/install.sh | sh'));
      console.log(chalk.cyan('  Windows:     ') + chalk.white('powershell -c "irm https://astral.sh/uv/install.ps1 | iex"'));
      console.log(chalk.dim('\nAfter installing, restart your terminal and run the CLI again.'));
      console.log(chalk.dim('More info: https://docs.astral.sh/uv/\n'));
      throw new Error('uv not installed');
    }

    // Check if specify-cli is already installed
    spinner.text = 'Checking for SpecKit CLI...';
    let specifyPath;
    try {
      await execa('specify', ['--version']);
      specifyPath = 'specify';
      spinner.text = 'SpecKit CLI already installed';
    } catch (error) {
      // Not installed, we'll install it
      spinner.text = 'Installing SpecKit CLI (this may take 1-2 minutes)...';
      try {
        const installResult = await execa(uvPath, [
          'tool',
          'install',
          'specify-cli',
          '--from',
          'git+https://github.com/github/spec-kit.git'
        ], {
          stdio: 'inherit' // Show output so user sees progress
        });
        
        // Try to find where uv installed the tool
        try {
          await execa('specify', ['--version']);
          specifyPath = 'specify';
        } catch (e) {
          // Not in PATH, try common uv tool locations
          const os = process.platform;
          const home = process.env.HOME || process.env.USERPROFILE;
          
          const possiblePaths = [
            path.join(home, '.local', 'bin', 'specify'),
            path.join(home, '.cargo', 'bin', 'specify'),
            path.join(home, 'Library', 'Application Support', 'uv', 'bin', 'specify')
          ];
          
          for (const possiblePath of possiblePaths) {
            if (await fs.pathExists(possiblePath)) {
              specifyPath = possiblePath;
              break;
            }
          }
          
          if (!specifyPath) {
            throw new Error('specify installed but not found in PATH');
          }
        }
        
        spinner.text = 'SpecKit CLI installed successfully';
      } catch (installError) {
        spinner.fail(chalk.red('Failed to install SpecKit CLI'));
        console.log(chalk.yellow('\n⚠️  Could not install SpecKit automatically.'));
        console.log(chalk.white('\nManual installation:'));
        console.log(chalk.cyan('  uv tool install specify-cli --from git+https://github.com/github/spec-kit.git'));
        console.log(chalk.dim('\nAfter installing, you may need to add ~/.local/bin to your PATH'));
        console.log(chalk.dim('Then run: specify init --here --ai cursor-agent\n'));
        throw installError;
      }
    }

    // Initialize SpecKit in the project directory
    spinner.text = 'Initializing SpecKit in project...';
    try {
      const aiAgent = 'cursor-agent'; // Default to Cursor
      
      await execa(specifyPath, [
        'init',
        '--here',
        '--ai', aiAgent,
        '--force'
      ], {
        cwd: projectDir,
        stdio: 'pipe'
      });
      
      spinner.succeed(chalk.green('SpecKit framework installed'));
      
      console.log(chalk.dim('  ✓ Real GitHub SpecKit installed'));
      console.log(chalk.dim('  ✓ .specify/ directory initialized'));

      // Auto-create constitution with project context
      spinner.start('Creating project constitution with design system context...');
      try {
        const { projectName, appName, primaryColor } = projectInfo;
        
        const constitutionPrompt = `Create principles for ${projectName}:
- Always use components from ${appName}/design-system/pencildraw/ (Button, Input, Modal, EmptyState, Placeholder)
- Always use CSS variables from ${appName}/app/globals.css (primary color is ${primaryColor} mapped to --color-primary)
- Never hard-code colors, spacing, or typography values - always use design tokens
- Follow mobile-first design approach with WCAG AA accessibility standards
- Maintain 44px minimum touch target sizes for interactive elements
- Use Next.js App Router patterns and React Server Components by default
- Keep components simple and composable
- The Next.js app is located in the ${appName}/ directory`;

        await execa(specifyPath, [
          'constitution',
          constitutionPrompt
        ], {
          cwd: projectDir,
          stdio: 'pipe'
        });

        spinner.succeed(chalk.green('Project constitution created'));
        console.log(chalk.dim('  ✓ Design system rules configured'));
        console.log(chalk.dim('  ✓ Code standards established'));
        console.log(chalk.dim('  ✓ Ready for spec-driven development'));

      } catch (constitutionError) {
        // Non-fatal - user can create it manually
        spinner.warn(chalk.yellow('Constitution creation skipped'));
        console.log(chalk.dim('  → You can create it manually with: specify constitution'));
      }

    } catch (initError) {
      spinner.fail(chalk.red('Failed to initialize SpecKit'));
      console.log(chalk.yellow('\n⚠️  Could not initialize SpecKit automatically.'));
      console.log(chalk.white('\nManual initialization:'));
      console.log(chalk.cyan(`  cd ${path.basename(projectDir)}`));
      console.log(chalk.cyan('  specify init --here --ai cursor-agent\n'));
      throw initError;
    }

  } catch (error) {
    spinner.fail(chalk.red('Failed to set up SpecKit'));
    throw error;
  }
}