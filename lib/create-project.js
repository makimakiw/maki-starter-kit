import { execa } from 'execa';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

export async function createNextJsProject(projectInfo) {
  const { projectName, appName } = projectInfo;
  const projectDir = path.resolve(process.cwd(), projectName);
  const appDir = path.join(projectDir, appName);

  // Clean up if directory already exists
  if (await fs.pathExists(projectDir)) {
    console.log(chalk.yellow(`\n⚠️  Directory "${projectName}" already exists. Removing it...\n`));
    await fs.remove(projectDir);
  }

  console.log(chalk.cyan.bold('\n📦 Creating Monorepo Structure...\n'));
  console.log(chalk.dim('This will take 1-2 minutes (installing dependencies)...\n'));

  try {
    // Create parent directory
    await fs.ensureDir(projectDir);
    console.log(chalk.dim(`  ✓ Created parent folder: ${projectName}/\n`));

    // Create Next.js project inside parent directory
    await execa('npx', [
      'create-next-app@latest',
      appName,
      '--typescript',
      '--tailwind',
      '--app',
      '--no-src-dir',
      '--import-alias', '@/*',
      '--eslint',
      '--no-turbopack',
      '--no-experimental-react-compiler',
      '--use-npm'
    ], {
      stdio: 'inherit', // Show all output
      cwd: projectDir // Run inside parent directory
    });

    console.log(chalk.green('\n✔ Next.js app created!\n'));

    // Remove git files from Next.js app
    const appGitDir = path.join(appDir, '.git');
    if (await fs.pathExists(appGitDir)) {
      await fs.remove(appGitDir);
      console.log(chalk.dim(`  ✓ Removed .git from ${appName}/\n`));
    }

    // Initialize git at project root
    await execa('git', ['init'], { cwd: projectDir });
    console.log(chalk.dim('  ✓ Initialized git at project root\n'));

    // Create root package.json with workspace config
    const rootPackageJson = {
      name: projectName,
      version: '1.0.0',
      private: true,
      workspaces: [appName]
    };
    await fs.writeJSON(path.join(projectDir, 'package.json'), rootPackageJson, { spaces: 2 });
    console.log(chalk.dim('  ✓ Created root package.json with workspaces\n'));

    // Create root .gitignore if needed
    const rootGitignore = `# Dependencies
node_modules/

# IDE
.vscode/
.idea/
.cursor/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
`;
    await fs.writeFile(path.join(projectDir, '.gitignore'), rootGitignore);
    console.log(chalk.dim('  ✓ Created root .gitignore\n'));

    // Show what was created
    console.log(chalk.dim('  Created monorepo structure:'));
    console.log(chalk.dim(`    ${projectName}/`));
    console.log(chalk.dim('    ├── .git/'));
    console.log(chalk.dim('    ├── .gitignore'));
    console.log(chalk.dim('    ├── package.json (workspace config)'));
    console.log(chalk.dim(`    └── ${appName}/`));
    console.log(chalk.dim('        ├── app/'));
    console.log(chalk.dim('        ├── public/'));
    console.log(chalk.dim('        ├── package.json'));
    console.log(chalk.dim('        ├── tsconfig.json'));
    console.log(chalk.dim('        └── postcss.config.mjs'));

    return { projectDir, appDir };

  } catch (error) {
    console.log(chalk.red('\n✖ Failed to create project\n'));
    
    // Provide helpful error message
    console.log(chalk.yellow('💡 Try these fixes:\n'));
    console.log(chalk.dim('  1. Run: npm cache clean --force'));
    console.log(chalk.dim('  2. Check your internet connection'));
    console.log(chalk.dim('  3. Try again\n'));
    
    throw error;
  }
}

export async function verifyProject(appDir) {
  console.log(chalk.cyan('\n🔍 Verifying project setup...\n'));

  try {
    // Check for essential files in the Next.js app directory
    const essentialFiles = [
      'package.json',
      'tsconfig.json',
      'postcss.config.mjs',
      'app/layout.tsx',
      'app/page.tsx'
    ];

    for (const file of essentialFiles) {
      const filePath = path.join(appDir, file);
      if (!(await fs.pathExists(filePath))) {
        throw new Error(`Missing essential file: ${file}`);
      }
    }

    console.log(chalk.green('✔ Project verified successfully!\n'));
    return true;

  } catch (error) {
    console.log(chalk.red('✖ Project verification failed\n'));
    throw error;
  }
}
